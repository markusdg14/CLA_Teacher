import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import CardSubject from '../../../components/cardSubject';
import NoData from '../../../components/NoData'
import ActiveUnactiveData from '../../../components/activeUnactiveData';

import Select from 'react-select'
import ModalConfirm from './components/confirmModal';

export default function SubjectLesson(){
    var base = new Base()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})

    const [filter_grade_arr, set_filter_grade_arr] = useState([])
    const [filter_grade_selected, set_filter_grade_selected] = useState('')
    const [filter_subject_arr, set_filter_subject_arr] = useState([])
    const [filter_subject_selected, set_filter_subject_selected] = useState([])
    const [filter_lesson_arr, set_filter_lesson_arr] = useState([])
    const [filter_lesson_selected, set_filter_lesson_selected] = useState([])

    const [data_arr, set_data_arr] = useState([])

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(async ()=>{
        if(user_data.id !== ''){
            get_filter_data_arr('grade')
            get_filter_data_arr('lesson')
            // get_data('current')
            // get_data('past')
        }
    }, [user_data])

    useEffect(async ()=>{
        if(filter_grade_selected != ''){
            get_filter_data_arr('subject', filter_grade_selected)
        }
    }, [filter_grade_selected])

    async function get_filter_data_arr(type, id=''){
        var url = ''
        if(type === 'grade'){
            url = '/grade'
        }
        else if(type === 'subject'){
            url = '/subject?grade_id=' + id
        }
        else if(type === 'lesson'){
            url = '/lesson/all'
        }
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                if(type === 'grade'){
                    var data1 = data.data
                    
                    set_filter_grade_arr(data1)
                }
                else if(type === 'subject'){
                    var subject_arr = data.data
                    for(var x in subject_arr){
                        subject_arr[x].label = subject_arr[x].name
                        subject_arr[x].value = subject_arr[x].id
                    }
                    set_filter_subject_arr(subject_arr)
                }
                else if(type === 'lesson'){
                    for(var x in data){
                        data[x].label = data[x].name
                        data[x].value = data[x].id
                    }
                    set_filter_lesson_arr(data)
                }
            }
        }
    }

    async function changeFilter(index, type, value=''){
        if(type === 'grade'){
            set_filter_grade_selected(filter_grade_arr[index].id)
        }
        else if(type === 'subject'){
            set_filter_subject_selected(value)
        }
        else if(type === 'lesson'){
            set_filter_lesson_selected(value)
        }
    }

    const [subject_selected, set_subject_selected] = useState('')

    async function filterBtn(){
        var flag = 1
        if(filter_grade_selected === ''){
            flag = 0
        }
        if(filter_subject_selected.length === 0){
            flag = 0
        }
        if(filter_lesson_selected.length === 0){
            flag = 0
        }

        if(flag){
            var subject_id = []
            var subject_name_selected = ''
            for(var x in filter_subject_selected){
                subject_id.push(filter_subject_selected[x].id)
                subject_name_selected += filter_subject_selected[x].name + (parseInt(x) === filter_subject_selected.length-1 ? '' : ', ')
            }
    
            set_subject_selected(subject_name_selected)
    
            var lesson_id = []
            for(var x in filter_lesson_selected){
                lesson_id.push(filter_lesson_selected[x].id)
            }
    
            var url = '/assignment/group?type=' + '&arr_subject_id=' + JSON.stringify(subject_id)
                + '&arr_lesson_id=' + JSON.stringify(lesson_id) + '&grade_id=' + filter_grade_selected + '&type=current_academic_year'
            var response = await base.request(url)
            if(response != null){
                if(response.status == 'success'){
                    var data = response.data.data
                    for(var x in data){
                        for(var y in data[x].arr_assignment_agreement){
                            data[x].arr_assignment_agreement[y].icon = 'bi bi-puzzle-fill'
                            data[x].arr_assignment_agreement[y].activity_name = ''
                            if(data[x].arr_assignment_agreement[y].type === 'assignment'){
                                data[x].arr_assignment_agreement[y].icon = (data[x].arr_assignment_agreement[y].assignment_type.data === 'quiz' ? 'bi bi-puzzle-fill' : data[x].arr_assignment_agreement[y].assignment_type.data === 'discussion' ? 'bi bi-easel-fill' : data[x].arr_assignment_agreement[y].assignment_type.data === 'ungraded' ? 'bi bi-book-half' : '')
    
                                data[x].arr_assignment_agreement[y].activity_name = data[x].arr_assignment_agreement[y].name
                            }
                            else{
                                data[x].arr_assignment_agreement[y].activity_name = data[x].arr_assignment_agreement[y].title
                                data[x].arr_assignment_agreement[y].deadline_date = data[x].arr_assignment_agreement[y].meeting_at
                            }
    
                            var class_student = data[x].arr_assignment_agreement[y].arr_class_student
                            for(var z in class_student){
                                var status_activity = ''
    
                                if(class_student[z].last_assignment_submitted != null){
                                    status_activity = class_student[z].last_assignment_submitted.assessment_status.data
                                }
    
                                class_student[z].status_activity_arr = [
                                    {
                                        title : 'top', data_arr : [
                                            {title : 'NO', bg_color : '#999999', status : '', is_checked : (status_activity === '' ? true : false)},
                                            {title : 'OK', bg_color : '#60B158', status : 'done', is_checked : (status_activity === 'done' ? true : false)},
                                            {title : 'CW', bg_color : '#CF91FF', status : 'need_much_correction', is_checked : (status_activity === 'need_much_correction' ? true : false)},
                                        ]
                                    },
                                    {
                                        title : 'bottom', data_arr : [
                                            {title : 'CS', bg_color : '#F2994A', status : 'need_correction',  is_checked : (status_activity === 'need_correction' ? true : false)},
                                            {title : 'SK', bg_color : '#0085FF', status : 'on_checking',  is_checked : (status_activity === 'on_checking' ? true : false)},
                                            {title : 'HS', bg_color : '#FC5A5A', status : 'blocked',  is_checked : (status_activity === 'blocked' ? true : false)},
                                        ]
                                    },
                                ]
                            }
                        }
                    }
    
                    set_data_arr(data)
                }
            }
        }

    }

    const [is_disable_btn_modal, set_is_disable_btn_modal] = useState(false)
    const [lesson_selected, set_lesson_selected] = useState(null)
    const [index_lesson_selected, set_index_lesson_selected] = useState('')

    useEffect(async ()=>{
        if(lesson_selected != null){
            base.$('#modalConfirm').modal('show')
        }
    }, [lesson_selected, index_lesson_selected])

    async function confirmLesson(btn_from, index=0){
        console.log(btn_from)
        if(btn_from === 'list'){
            set_index_lesson_selected(index)
            set_lesson_selected(data_arr[index])
        }
        else if(btn_from === 'modal'){
            var url = '/assignment/agreement/confirm'

            var data_post = {
                id : lesson_selected.id,
            }

            set_is_disable_btn_modal(true)

            var response = await base.request(url, 'put', data_post)
            if(response != null){
                if(response.status == 'success'){
                    var data_index = data_arr[index_lesson_selected]
                    data_index.confirmed_user = user_data
                    base.update_array(data_arr, set_data_arr, data_index, index_lesson_selected)
                    base.$('#modalConfirm').modal('hide')
                }
            }
        }
    }

    async function editActivity(index, index_assignment){
        console.log(data_arr[index].arr_assignment_agreement[index_assignment])
        var data = data_arr[index].arr_assignment_agreement[index_assignment]
        window.location.href='/subject-lesson/edit-activity?id=' + data.id + '&type=' + data.type
    }
    
    async function changeStatus(index, index_assignment, index_class_student, index_status, index_arr_status){
        var data_index = data_arr[index]
        if(data_index.arr_assignment_agreement[index_assignment].arr_class_student[index_class_student].last_assignment_submitted != null){
            
            var status_selected = data_index.arr_assignment_agreement[index_assignment].arr_class_student[index_class_student].status_activity_arr[index_status].data_arr[index_arr_status]
            var status = status_selected.status
            var last_submitted = data_index.arr_assignment_agreement[index_assignment].arr_class_student[index_class_student].last_assignment_submitted
            
            if(status != ''){
                var url = '/assessment/assignment'
                var data_upload = {
                    id : last_submitted.id,
                    status : status,
                }
        
                var response = await base.request(url, 'put', data_upload)
                if(response != null){
                    if(response.status == 'success'){
                        filterBtn()
                    }
                }
            }

        }

    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Subject & Lesson Plan'} user_data={user_data} />
            </div>
            
            <>
            <div className='col-12 mt-5 bg-white rounded p-3'>
                <div className='row'>
                    <div className='col'>
                        <div className='row'>
                            <div className='col-12'>
                                <p className='m-0' style={{color : 'black'}}>Grade</p>
                            </div>
                            <div className='col-12 mt-3'>
                            <div className='row'>
                                {
                                    filter_grade_arr.map((data, index)=>(
                                        <div className='col-12 col-lg-6 mb-2' key={index}>
                                            <div class="custom-control custom-radio">
                                                <input type="radio" id={"grade_radio" + index} name="customRadio" class="custom-control-input" onChange={(e)=>changeFilter(index, 'grade')} />
                                                <label class="custom-control-label" htmlFor={"grade_radio" + index}>{data.name}</label>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='col'>
                        <div className='row'>
                            <div className='col-12'>
                                <p className='m-0' style={{color : 'black'}}>Subject</p>
                            </div>
                            <div className='col-12 mt-3'>
                                <Select options={filter_subject_arr} value={filter_subject_selected} isMulti={true} onChange={(value)=>changeFilter(0, 'subject', value)} isOptionDisabled={()=>filter_subject_selected.length >= 2} />
                            </div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='row'>
                            <div className='col-12'>
                                <p className='m-0' style={{color : 'black'}}>Lesson</p>
                            </div>
                            <div className='col-12 mt-3'>
                                <Select options={filter_lesson_arr} value={filter_lesson_selected} isMulti={true} onChange={(value)=>changeFilter(0, 'lesson', value)} isOptionDisabled={()=>filter_lesson_selected.length >= 2} />
                            </div>
                        </div>
                    </div>

                    <div className='col-auto'>
                        <button type='button' className='btn btn-primary rounded shadow-sm px-4 mt-4' onClick={()=>filterBtn()}>Filter</button>
                    </div>
                </div>
            </div>

            {
                subject_selected !== '' &&
                <div className='col-12 mt-5 px-3'>
                    <div className='row'>
                        <div className='col-auto bg-white rounded p-3 px-5'>
                            <p className='m-0' style={{fontFamily : 'InterBold'}}>{subject_selected}</p>
                        </div>
                    </div>
                </div>
            }

            <div className='col-12 mt-5'>
                <div className='row'>
                    {
                        data_arr.map((data, index)=>(
                            <div className={'col-6 mb-3' + (index % 2 === 0 ? ' pl-0' : ' pr-0')} key={index}>
                                <div className='row m-0'>
                                    <div className='col-12 rounded p-3 subject_lesson_list title'>
                                        <div className='row'>
                                            <div className='col'>
                                                <h5 className='m-0 text-primary'>{data.lesson.name}</h5>
                                            </div>
                                            <div className='col d-flex align-items-center justify-content-end'>
                                                <div className='row'>
                                                    <div className='col d-flex align-items-center'>
                                                        <p className='m-0' style={{fontSize : '.75rem'}}>Confirmed by {(data.confirmed_user != null ? data.confirmed_user.name : '-')}</p>
                                                    </div>

                                                    {
                                                        data.confirmed_user == null &&
                                                        <div className='col-auto'>
                                                            <button className='btn btn-sm btn-primary shadow-sm rounded px-3' onClick={()=>confirmLesson('list', index)}>Confirm</button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12 rounded mt-1 subject_lesson_list detail shadow-sm'>
                                        <div className='row'>
                                        {
                                            data.arr_assignment_agreement.map((data_assignment, index_assignment)=>(
                                                <div className='col-12' style={{borderBottom : '1px solid #eaeaea'}} key={index_assignment}>
                                                    <div className='row'>
                                                        <div className='col-12 p-3' style={{borderBottom : '1px solid #eaeaea'}}>
                                                            <div className='row'>
                                                                <div className='col-auto d-flex align-items-center'>
                                                                    <h6 className='m-0'><i className={(data_assignment.icon) + " text-primary"} style={{fontSize : 18}}></i></h6>
                                                                </div>
                                                                <div className='col pl-0 d-flex align-items-center'>
                                                                    <h6 className='m-0'>{data_assignment.activity_name}</h6>
                                                                </div>
                                                                <div className='col'>
                                                                    <div className='row'>
                                                                        <div className='col'>
                                                                            <div>
                                                                                <p className='m-0 text-right' style={{fontFamily : 'InterBold', fontSize : '.75rem'}}>Terkumpul {data_assignment.total_submitted}/{data_assignment.total_student} Student</p>
                                                                                <p className='m-0 text-right' style={{fontSize : '.7rem'}}>DUE : {data_assignment.deadline_date != null ? base.moment(data_assignment.deadline_date).format('DD/MM/YYYY HH:mm') : '-'}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-auto pl-0 d-flex align-items-center'>
                                                                            <h5 className='m-0' style={{cursor : 'pointer'}}><i className="bi bi-pencil-square" style={{color : '#0085FF'}} onClick={()=>editActivity(index, index_assignment)}></i></h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-12 px-3 py-0' style={{backgroundColor : '#D9D9D91A'}}>
                                                            <div className='row m-0'>
                                                                {
                                                                    data_assignment.arr_class_student.map((data_class_student, index_class_student)=>(
                                                                        <div className='col-12 px-0 py-3' style={{borderBottom : '1px solid #EAEAEA'}} key={index_class_student}>
                                                                            <div className='row m-0'>
                                                                                <div className='col p-0'>
                                                                                    <div>
                                                                                        <p className='m-0' style={{fontSize : '.9rem', fontFamily : 'InterBold'}}>{data_class_student.user.name}</p>
                                                                                        <p className='m-0' style={{fontSize : '.7rem', lineHeight : 1}}>{data_class_student.class_model.grade.name + ' ' + data_class_student.class_model.name}</p>
                                                                                        <p className='m-0' style={{fontSize : '.7rem'}}>{data_class_student.is_online ? 'Online' : 'Offline'}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col'>
                                                                                    <div className='row'>
                                                                                        {
                                                                                            data_class_student.status_activity_arr.map((data_status, index_status)=>(
                                                                                                <>
                                                                                                    {
                                                                                                        data_status.data_arr.map((data_arr_status, index_arr_status)=>(
                                                                                                            <div className={'col-4 pr-0 pl-2' + (index_status == 0 ? ' mb-1' : '')} key={index_arr_status}>
                                                                                                                <div className='row m-0'>
                                                                                                                    <div className='col-auto' style={{cursor : (data_class_student.last_assignment_submitted != null ? 'pointer' : 'default')}} onClick={()=>changeStatus(index, index_assignment, index_class_student, index_status, index_arr_status)}>
                                                                                                                        <div className='row'>
                                                                                                                            <div className='col-auto p-0 d-flex align-items-center'>
                                                                                                                                <p className='m-0' style={{fontSize : '.7rem'}}>
                                                                                                                                    {
                                                                                                                                        data_arr_status.is_checked ?
                                                                                                                                        <i class="bi bi-record-circle-fill"></i>
                                                                                                                                        :
                                                                                                                                        <i class="bi bi-circle"></i>
                                                                                                                                    }
                                                                                                                                </p>
                                                                                                                            </div>
                                                                                                                            <div className='col pl-1 pr-0 d-flex align-items-center'>
                                                                                                                                <div className='rounded px-2 text-center' style={{backgroundColor : data_arr_status.bg_color}}>
                                                                                                                                    <p className='m-0 text-white' style={{fontSize : '.7rem'}}>{data_arr_status.title}</p>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        ))
                                                                                                    }
                                                                                                </>
                                                                                            ))
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col p-0 d-flex align-items-center justify-content-end'>
                                                                                    <div>
                                                                                        <p className='m-0 text-right' style={{fontSize : '.75rem'}}>Last Updated at</p>
                                                                                        <p className='m-0 text-right' style={{fontSize : '.75rem'}}>{(data_class_student.last_assignment_submitted != null ? base.moment(data_class_student.last_assignment_submitted.updated_at).format('DD/MM/YYYY HH:mm') : '-')}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <ModalConfirm confirmLesson={()=>confirmLesson('modal')} is_disable_btn_modal={is_disable_btn_modal} />
            </>
        </div>
    )
}