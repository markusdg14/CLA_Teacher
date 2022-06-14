import { useEffect, useState, useMemo } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import Select from 'react-select'
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import ModalConfirm from './components/confirmModal';
import LessonList from './components/lessonList';
import EditAssignment from './components/editAssignment';
import SelectOption from '../../../components/selectOption';
import SubmitAssignment from './components/submitAssignment';

export default function SubjectLessonEdit(){
    var base = new Base()

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : ''}})
    
    const [selected_assignment, set_selected_assignment] = useState({assessment_rule : {id : '', name : ''}})
    const [selected_lesson, set_selected_lesson] = useState({lesson : {id : '', name : ''}, grade : {id : '', name : ''}, subject : {id : '', name : ''}})
    const [img_data_base, set_img_data_base] = useState('')

    const [assignment_image_data, set_assignment_image_data] = useState({
        image_display : base.img_no_image,
        image : '',
        original_rotation : 0,
        type : ''
    })

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
        var url = '/' + query.get('type') + '/agreement?id=' + query.get('id')
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                data.image_display = base.img_no_image

                if(data.file_name != null){
                    data.image_display = base.url_photo('assignment', data.file_name)
                }

                if(query.get('type') === 'task'){
                    data.name = data.title
                    data.deadline_date = data.meeting_at
                    data.assessment_rule = data.project_agreement.assessment_rule

                    data.project_agreement.lesson = data.lesson

                    set_selected_lesson(data.project_agreement)
                }
                else if(query.get('type') === 'assignment'){
                    set_selected_lesson(data.assignment_group)
                }

                set_selected_assignment(data)
            }
        }
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
        var type = query.get('type')
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
            data_post.deadline_date = (selected_assignment.deadline_date == null ? base.moment().format('YYYY-MM-DD') : base.moment(selected_assignment.deadline_date).format('YYYY-MM-DD'))
        }
        else {
            data_post.title = selected_assignment.name
            data_post.meeting_at = (selected_assignment.deadline_date == null ? base.moment().format('YYYY-MM-DD') : base.moment(selected_assignment.deadline_date).format('YYYY-MM-DD'))
        }

        var response = await base.request(url, 'put', data_post)
        if(response != null){
            if(response.status == 'success'){
                window.location.reload()
            }
        }
    }

    function backBtn(){
        window.history.back()
        // window.location.href = '/subject-lesson'
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
                </div>
            </div>

            <div className='col-12 mt-4'>
                <EditAssignment selected_lesson={selected_lesson} selected_assignment={selected_assignment} changeInput={(value, type)=>changeInput(value, type)} assignment_image_data={assignment_image_data} saveAssignment={()=>saveAssignment()} />
            </div>

        </div>
    )
}