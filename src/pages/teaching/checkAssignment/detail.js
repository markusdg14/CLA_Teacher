import { useEffect, useState, useMemo } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import Select from 'react-select'
import SelectOption from '../../../components/selectOption';

export default function CheckAssignmentDetail(){
    var base = new Base()

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : ''}})

    const [assignment_info_arr, set_assignment_info_arr] = useState([])
    const [student_data, set_student_data] = useState({id : '', name : '', image_display : base.img_no_profile})
    const [assignment_status, set_assignment_status] = useState('')
    const [grade, set_grade] = useState('')

    const [grade_arr, set_grade_arr] = useState([])
    const [grade_selected, set_grade_selected] = useState('')

    const [subject_arr, set_subject_arr] = useState([])
    const [subject_selected, set_subject_selected] = useState('')

    const [list_check_assignment_arr, set_list_check_assignment_arr] = useState([])

    const [is_loading_list, set_is_loading_list] = useState(false)
    const [is_filter, set_is_filter] = useState(false)

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(async ()=>{
        if(user_data.id !== ''){
            get_data()
            get_filter_data_arr('grade')
            get_filter_data_arr('subject')
        }
    }, [user_data])

    async function get_data(){
        var url = '/assessment/assignment?id=' + query.get('id')
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data

                var submitted_date_format = base.moment(data.created_at).format('DD/MM') + ' Pk. ' + base.moment(data.created_at).format('HH:mm')
                data.user.image_display = base.img_no_profile
                if(data.user.file_name != null){
                    data.user.image_display = base.url_photo('user', data.user.file_name)
                }

                set_student_data(data.user)
                set_assignment_status(data.assessment_status.name)
                set_grade(data.assignment_agreement.assignment_group.grade.name)

                set_assignment_info_arr([
                    {title : 'Student Name', value : data.user.name}, {title : 'Grade', value : data.assignment_agreement.assignment_group.grade.name},
                    {title : 'Subject', value : data.assignment_agreement.assignment_group.subject.name}, {title : 'Lesson', value : data.assignment_agreement.assignment_group.lesson.name},
                    {title : 'Assignment Title', value : data.assignment_agreement.name}, {title : 'Date Submitted', value : submitted_date_format}, ,
                ])
            }
        }
    }

    function backBtn(){
        window.history.back()
    }

    function filterBtn(){
        get_list()
    }

    async function get_filter_data_arr(type){
        var url = '/' + type + '/all'
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                if(type === 'grade'){
                    set_grade_arr(data)
                }
                else if(type === 'subject'){
                    set_subject_arr(data)
                }
            }
        }
    }

    async function get_list(){
        set_is_loading_list(true)
        var url = '/assessment/assignment?assessment_status=on_checking&grade_id=' + grade_selected + '&subject_id=' + subject_selected + '&not_id=' + query.get('id')
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                set_is_loading_list(false)
                for(var x in data){
                    data[x].user.image_display = base.img_no_profile
                    if(data[x].user.file_name != null){
                        data[x].user.image_display = base.url_photo('user', data[x].user.file_name)
                    }
                    data[x].submitted_date_format = base.moment(data[x].created_at).format('DD/MM HH:mm')
                }
                
                set_list_check_assignment_arr(data)
                set_is_filter(true)
            }
        }
    }

    function changeFilter(val, type){
        if(type === 'grade'){
            set_grade_selected(val)
        }
        else if(type === 'subject'){
            set_subject_selected(val)
        }
    }

    function viewDetail(index){
        window.location.href = '/check-assignment/detail?id=' + list_check_assignment_arr[index].id
    }


    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Check Assignment'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                    <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                </div>
            </div>

            <div className='col-12 mt-5'>
                <div className='row m-0'>
                    <div className='col-12 col-lg-auto'>
                        <div className='h-100 row p-0 pr-0 pr-lg-4'>
                            <div className='col-12 p-4 bg-white rounded shadow-sm mb-2'>
                                <p className='m-0 text-primary'>Score Grade</p>
                                <p className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{'-'}</p>
                            </div>
                            <div className='col-12 p-4 bg-white rounded shadow-sm mt-2'>
                                <p className='m-0 text-primary'>Assignment Status</p>
                                <p className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{assignment_status}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col bg-white rounded shadow-sm p-4 d-flex align-items-center mt-3 mt-lg-0'>
                        <div className='row'>
                            <div className='col'>
                                <div className='row'>
                                {
                                    assignment_info_arr.map((data, index)=>(
                                        <div className='col-6 mb-4' key={index}>
                                            <p className='m-0'>{data.title}</p>
                                            <p className='m-0 text-secondary'>{data.value}</p>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                            <div className='col-auto pr-5'>
                                <img src={student_data.image_display} style={{height : '7rem', width : '7rem', aspectRatio : 1, borderRadius : '7rem'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <div className='col-12 p-3 pt-4'>
                                <div className='row m-0'>
                                    <div className='col'>
                                        <label>Grade</label>
                                        <SelectOption data_arr={grade_arr} selected={grade_selected} title={'Grade'} changeInput={(value)=>changeFilter(value, 'grade')} />
                                    </div>
                                    <div className='col'>
                                        <label>Subject</label>
                                        <SelectOption data_arr={subject_arr} selected={subject_selected} title={'Subject'} changeInput={(value)=>changeFilter(value, 'subject')} />
                                    </div>
                                    <div className='col d-flex align-items-end'>
                                        <button className='btn btn-primary rounded w-100' onClick={()=>filterBtn()}>Filter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className='col-12 mt-3'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 p-3 pt-4 pb-5'>
                                <div className='row m-0'>
                                    <div className='col-12 mb-3'>
                                        <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>List Check Assignment</h5>
                                    </div>

                                    <div className='col-12 p-0'>
                                        <div className='row'>

                                            {
                                                is_loading_list ?
                                                <div className='col-12 text-center'>
                                                    <h4>Loading...</h4>
                                                </div>
                                                :
                                                <>
                                                    {
                                                        is_filter &&
                                                        <>
                                                            {
                                                                list_check_assignment_arr.length > 0 ?
                                                                <>
                                                                {
                                                                    list_check_assignment_arr.map((data, index)=>(
                                                                        <div className={'col-6 p-3 list_check_assignment' + (index % 2 === 0 ? ' border-right' : '')} onClick={()=>viewDetail(index)}>
                                                                            <div className='row m-0'>
                                                                                <div className='col-auto d-flex align-items-center'>
                                                                                    <img src={data.user.image_display} style={{height : '4rem', width : '4rem', aspectRatio : 1, borderRadius : '4rem'}} />
                                                                                </div>
                                                                                <div className='col-auto d-flex align-items-center'>
                                                                                    <div>
                                                                                        <p className='m-0 text-primary' style={{fontFamily : 'InterBold'}}>{data.user.name}</p>
                                                                                        <p className='m-0'>{data.assignment_agreement.name} | {data.assignment_agreement.assignment_group.subject.name} | {data.assignment_agreement.assignment_group.lesson.name}</p>
                                                                                    </div>
                                                                                </div>

                                                                                <div className='col d-flex align-items-center justify-content-end mt-3 mt-lg-0'>
                                                                                    <p className='m-0'>{base.moment(data.created_at).format('DD/MM HH:mm')}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                                </>
                                                                :
                                                                <div className='col-12 text-center'>
                                                                    <h4>No Data</h4>
                                                                </div>
                                                            }
                                                        </>
                                                    }
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}