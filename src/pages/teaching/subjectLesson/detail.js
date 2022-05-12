import { useEffect, useState, useMemo } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import Select from 'react-select'
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import ModalConfirm from './components/confirmModal';
import LessonList from './components/lessonList';
import EditAssignment from './components/editAssignment';

export default function SubjectLessonDetail(){
    var base = new Base()

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : ''}})
    const [data_arr, set_data_arr] = useState([])
    
    const [grade_arr, set_grade_arr] = useState([])
    const [grade_selected, set_grade_selected] = useState('')

    const [academic_year_arr, set_academic_year_arr] = useState([])
    const [academic_year_selected, set_academic_year_selected] = useState('')

    const [subject_arr, set_subject_arr] = useState([])
    const [header, set_header] = useState('')

    const [selected_lesson_index, set_selected_lesson_index] = useState('')

    const [viewType, set_viewType] = useState('lesson_list')
    const [selected_assignment, set_selected_assignment] = useState({})
    const [selected_lesson, set_selected_lesson] = useState({})
    const [img_data_base, set_img_data_base] = useState('')

    const [assignment_image_data, set_assignment_image_data] = useState({
        image_display : base.img_no_image,
        image : '',
        original_rotation : 0,
        type : ''
    })

    const [is_disable_btn_modal, set_is_disable_btn_modal] = useState(false)

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])
    
    useEffect(async ()=>{
        if(user_data.id !== ''){
            get_data()
        }
    }, [user_data])


    async function get_data(){
        var url = '/assignment/group?subject_id=' + query.get('subject_id') + '&grade_id=' + query.get('grade_id') + '&academic_year_id=' + query.get('academic_year_id')
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                set_header(response.assignment_group.grade.name + ' ' + response.assignment_group.subject.name)

                for(var x in data){
                    var data_agreement = data[x].arr_assignment_agreement
                    data[x].is_confirm = true

                    for(var y in data_agreement){
                        data_agreement[y].icon = 'bi bi-puzzle-fill'
                        if(data_agreement[y].type === 'assignment'){
                            data_agreement[y].icon = (data_agreement[y].assignment_type.data === 'quiz' ? 'bi bi-puzzle-fill' : data_agreement[y].assignment_type.data === 'discussion' ? 'bi bi-easel-fill' : data_agreement[y].assignment_type.data === 'ungraded' ? 'bi bi-book-half' : '')
                        }
                        else{
                            data_agreement[y].deadline_date = data_agreement[y].meeting_at
                        }
                    }
                    
                    if(data[x].confirmed_user == null){
                        data[x].is_confirm = false
                    }
                }
                set_data_arr(data)
            }
        }
    }


    function backBtn(){
        if(viewType === 'lesson_list'){
            window.location.href = '/subject-lesson'
        }
        else {
            window.scrollTo(0,0)
            set_viewType('lesson_list') 
        }
    }

    function changeFilter(val, type){
        var filter = JSON.parse(val)
        set_grade_selected(filter)
    }

    function applyFilter(){
        console.log(grade_selected)
    }

    async function confirmLesson(type='view', index=0){
        if(type === 'view'){
            set_selected_lesson_index(index)
            base.$('#modalConfirm').modal('show')
        }
        else if(type === 'modal'){
            var url = '/assignment/agreement/confirm'

            var data_post = {
                id : data_arr[selected_lesson_index].id,
            }

            set_is_disable_btn_modal(true)

            var response = await base.request(url, 'put', data_post)
            if(response != null){
                if(response.status == 'success'){
                    window.location.reload()
                }
            }
        }
    }

    function changeView(type, index=0, index_assignment=0){
        set_viewType(type)
        if(type === 'edit_assignment'){
            data_arr[index].arr_assignment_agreement[index_assignment].image_display = base.img_no_image
            if(data_arr[index].arr_assignment_agreement[index_assignment].file_name != null){
                data_arr[index].arr_assignment_agreement[index_assignment].image_display = base.url_photo('assignment', data_arr[index].arr_assignment_agreement[index_assignment].file_name)
            }

            if(data_arr[index].arr_assignment_agreement[index_assignment].type === 'task'){
                data_arr[index].arr_assignment_agreement[index_assignment].name = data_arr[index].arr_assignment_agreement[index_assignment].title
                data_arr[index].arr_assignment_agreement[index_assignment].deadline_date = data_arr[index].arr_assignment_agreement[index_assignment].meeting_at
                data_arr[index].arr_assignment_agreement[index_assignment].assessment_rule = data_arr[index].arr_assignment_agreement[index_assignment].project_agreement.assessment_rule
            }


            set_selected_lesson(data_arr[index])
            set_selected_assignment(data_arr[index].arr_assignment_agreement[index_assignment])

            base.update_object(assignment_image_data, set_assignment_image_data, data_arr[index].arr_assignment_agreement[index_assignment].image_display, 'image_display')

        }
        window.scrollTo(0,0)
    }

    function getImgBase(file, callback){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    async function changeInput(value, type){
        if(type !== 'image'){
            base.update_object(selected_assignment, set_selected_assignment, value, type)
        }
        else {
            await getImgBase(value.target.files[0], (result)=>{
                set_img_data_base(result)
            })
    
            var img_data = assignment_image_data
            img_data.image_display = URL.createObjectURL(value.target.files[0])
            img_data.type = 'new'

            base.update_object(assignment_image_data, set_assignment_image_data, img_data.image_display, 'image_display')
        }
    }

    async function saveAssignment(){
        var type = selected_assignment.type
        var url = '/' + type + '/agreement'

        var image = assignment_image_data
        image.image = img_data_base

        var data_post = {
            id : selected_assignment.id,
            description : selected_assignment.description,
            image : image,
        }

        if(type === 'assignment'){
            data_post.name = selected_assignment.name
            data_post.deadline_date = base.moment(selected_assignment.deadline_date).format('YYYY-MM-DD')
        }
        else {
            data_post.title = selected_assignment.name
            data_post.meeting_at = base.moment(selected_assignment.deadline_date).format('YYYY-MM-DD')
        }

        var response = await base.request(url, 'put', data_post)
        if(response != null){
            if(response.status == 'success'){
                window.location.reload()
            }
        }
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Subject & Lesson Plan'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='row'>
                    <div className='col d-flex align-items-center'>
                        <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                            <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                        </div>
                    </div>
                    {
                        viewType === 'lesson_list' &&
                        <div className='col-auto text-right d-flex align-items-center justify-content-center mt-3 mt-lg-0'>
                            <div className='bg-white rounded shadow-sm px-4 py-3'>
                                <p className='m-0'>Academy Year / {header}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {
                viewType === 'lesson_list' &&
                <>
                    {/* <div className='col-12 mt-5'>
                        <div className="card rounded shadow-sm">
                            <div className={"card-body p-0"}>
                                <div className={'row m-0'}>
                                    <div className='col-12 p-3 pt-4'>
                                        <div className='row m-0'>
                                            <div className='col'>
                                                <label>Grade</label>
                                                <Select
                                                    name='grade_selected'
                                                    value={1}
                                                    options={grade_arr}
                                                    onChange={(val)=>changeFilter(JSON.stringify(val), 'grade')}
                                                />
                                            </div>
                                            <div className='col'>
                                                <label>Academic Year</label>
                                                <Select
                                                    name='academic_year_selected'
                                                    value={academic_year_selected}
                                                    options={academic_year_arr}
                                                />
                                            </div>
                                            <div className='col'>
                                                <label>Subject</label>
                                                <Select
                                                    name='subject_selected'
                                                    value={subject_selected}
                                                    options={subject_arr}
                                                />
                                            </div>
                                            <div className='col d-flex align-items-end'>
                                                <button className='btn btn-primary rounded w-100' onClick={()=>applyFilter()}>Filter</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div> */}

                    <div className='col-12 mt-4 text-right'>
                        <button className='btn btn-outline-primary rounded px-5'>Student View</button>
                    </div>
                </>
            }

            <div className='col-12 mt-5'>
            {
                viewType === 'lesson_list' ?
                <LessonList data_arr={data_arr} confirmLesson={(index)=>confirmLesson('view', index)} changeView={(index, index_assignment)=>changeView('edit_assignment', index, index_assignment)} />
                :
                <EditAssignment selected_lesson={selected_lesson} selected_assignment={selected_assignment} changeInput={(value, type)=>changeInput(value, type)} assignment_image_data={assignment_image_data} saveAssignment={()=>saveAssignment()} />
            }
            </div>

            <ModalConfirm confirmLesson={()=>confirmLesson('modal')} is_disable_btn_modal={is_disable_btn_modal} />
            
        </div>
    )
}