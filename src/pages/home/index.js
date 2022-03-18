import { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/header';

import HomeList from '../../components/homeList';
import LessonBadge from '../../components/lessonBadge';
import CustomBadge from '../../components/customBadge';


export default function HomeIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : '', name : ''}})

    const [class_arr, set_class_arr] = useState([])
    const [selected_class, set_selected_class] = useState('')

    const [tracker_btn_arr] = useState([
        {icon : 'fas fa-chevron-circle-left', type : 'prev', margin : 'mr-2'},
        {icon : 'fas fa-chevron-circle-right', type : 'next', margin : 'ml-2'},
    ])

    const [student_arr, set_student_arr] = useState([])

    const [subject_arr, set_subject_arr] = useState([])

    const [day_arr, set_day_arr] = useState([])

    const [submitted_data_arr, set_submitted_data_arr] = useState([])

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(()=>{
        if(user_data.id !== ''){
            get_grade()
        }
    }, [user_data])

    useEffect(()=>{
        if(selected_class !== ''){
            get_data()
        }
    }, [selected_class])

    async function get_grade(){
        var url = '/academic-year/class'
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                for(var x in data){
                    data[x].title = data[x].grade.name + ' ' + data[x].name
                    data[x].is_selected = false
                    data[0].is_selected = true
                }
                set_selected_class(data[0].id)
                set_class_arr(data)
            }
        }
    }

    async function get_data(){
        var url = '/class/student-tracker?id=' + selected_class
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data

                var lessonDate_arr = []
                for(let lessonSchedule of data.arr_lesson_schedule){
                    var day_name = base.moment(lessonSchedule.date).format('DD dddd')
                    lessonDate_arr.push({id : lessonSchedule.id, day_name : day_name, lesson : lessonSchedule.lesson.name})
                }

                set_day_arr(lessonDate_arr)

                var student_arr = [], count_student = 0
                for(let student of data.arr_student){
                    student.is_show = (count_student == 0 ? true : false)
                    student_arr.push({id : student.id, name : student.name, is_show : student.is_show})
                    count_student++
                }
                set_student_arr(student_arr)

                var subject_data_arr = []
                for(let subject of data.arr_subject){
                    subject_data_arr.push({id : subject.id, name : subject.name})
                }
                set_subject_arr(subject_data_arr)

                var submitted_arr = []
                var assignment_submitted = data.arr_assignment_submitted
                for(var x in assignment_submitted){
                    submitted_arr[x] = {}
                    var submitted = assignment_submitted[x]
                    for(var y in submitted){
                        submitted_arr[x][y] = {}
                        var lesson = submitted[y]
                        for(var z in lesson){
                            console.log(lesson[z])
                            if(lesson[z] != null){
                                lesson[z].assessment_status.badge_type = (lesson[z].assessment_status.data === 'done' ? 'success' : lesson[z].assessment_status.data === 'on_checking' ? 'warning' : lesson[z].assessment_status.data === 'need_correction' ? 'info' : '')
                            }
                            submitted_arr[x][y][z] = lesson[z]
                        }
                    }
                }
                set_submitted_data_arr(submitted_arr)
            }
        }
    }

    function chooseGrade(index){
        var data_index = class_arr[index]
        var initSelected = data_index.is_selected
        for(var x in class_arr){
            class_arr[x].is_selected = false
        }
        class_arr[index].is_selected = true
        if(class_arr[index].is_selected)
            set_selected_class(class_arr[index].id)

        base.update_array(class_arr, set_class_arr, data_index, index)
    }

    function trackerBtn(type){

    }

    function toggle_table(index){
        var data_index = student_arr[index]
        var initShow = data_index.is_show
        for(var x in student_arr){
            student_arr[x].is_show = false
        }
        student_arr[index].is_show = !initShow
        base.update_array(student_arr, set_student_arr, data_index, index)
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Teacher Tracker'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='row'>
                    {
                        class_arr.map((data, index)=>(
                            <div className='col-auto' key={index}>
                                <div className={'gradePicker' + (data.is_selected ? ' selected' : '')} onClick={()=>chooseGrade(index)}>
                                    <p className='m-0'>{data.title}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <div className='col-12 p-3'>
                                <div className='row m-0'>
                                    <div className='col-12 col-lg d-flex align-items-center'>
                                        <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Tracker for each Student ({user_data.current_academic_year.name})</h5>
                                    </div>
                                    {/* <div className='col-12 col-lg-auto'>
                                        <div className='row m-0 mr-0'>
                                            {
                                                tracker_btn_arr.map((data, index)=>(
                                                    <div className={'col-auto p-0 ' + data.margin}>
                                                        <h4 className='m-0' style={{cursor : 'pointer'}} onClick={()=>trackerBtn(data.type)}><i className={data.icon + " text-primary"}></i></h4>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 p-3 pt-4'>
                                <div className="table-responsive">
                                    <table className="table w-100">
                                        <thead>
                                            <tr>
                                                <th className='border-0 align-middle' style={{color : '#8A92A6', width : '6rem'}}>
                                                    <h5 className='text-primary m-0'>{base.moment().format('MMMM')}</h5>
                                                </th>
                                                {
                                                    day_arr.map((data, index)=>(
                                                        <th className='border-0 px-0 text-center' style={{color : '#8A92A6', width : '6rem'}} key={index}>
                                                            <p className='m-0'>{data.day_name}</p>
                                                            <p className='mb-0 text-secondary' style={{fontSize : '.75rem'}}>{data.lesson}</p>
                                                        </th>
                                                    ))
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                student_arr.map((data, index)=>(
                                                    <tr key={index}>
                                                        <td className='px-0' colSpan={day_arr.length + 1}>
                                                            <div className='p-2 d-flex align-items-center' onClick={()=>toggle_table(index)} style={{height : '3rem', backgroundColor : '#EBEFE2', cursor : 'pointer', color : '9FA2B4'}}>
                                                                {data.name}
                                                                <i className={"ml-3 fas fa-chevron-" + (data.is_show ? 'up' : 'down')}></i>
                                                            </div>

                                                            {
                                                                data.is_show &&
                                                                <table className="w-100">
                                                                    {
                                                                        subject_arr.map((dataSubject, indexSubject)=>(
                                                                            <tr key={indexSubject}>
                                                                                <td className='text-primary' style={{width : '6rem'}}><i class="bi bi-circle-fill mr-2"></i> {dataSubject.name}</td> 
                                                                                {
                                                                                    day_arr.map((dataSubmitted, indexSubmitted)=>(
                                                                                        <td className='text-center px-0' style={{width : '6rem'}} key={indexSubmitted}>
                                                                                            <div className="">
                                                                                                {
                                                                                                    submitted_data_arr[data.id] != null &&
                                                                                                    <>
                                                                                                        {
                                                                                                            submitted_data_arr[data.id][dataSubject.id][dataSubmitted.id] != null &&
                                                                                                            <span className={"badge badge-pill p-2 px-3 rounded badge-" + (submitted_data_arr[data.id][dataSubject.id][dataSubmitted.id].assessment_status.badge_type)}>{submitted_data_arr[data.id][dataSubject.id][dataSubmitted.id].assessment_status.name}</span>
                                                                                                        }
                                                                                                    </>
                                                                                                }
                                                                                            </div>
                                                                                        </td>
                                                                                    ))
                                                                                }
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </table>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>

        </div>
    )
}

function BadgeTable({title, type}){
    const bgColor = (type === 'success' ? '#CEF2CE' : type === 'warning' ? '#FFF2CA' : '')
    const textColor = (type === 'success' ? '#44A244' : type === 'warning' ? '#E6BA34' : '')
    return (
        <div className='h-100 px-2'>
            <div className='m-0 p-2 px-3' style={{backgroundColor : bgColor, borderRadius : '1rem'}}>
                <p className='m-0 font-weight-bold text-center' style={{color : textColor, fontSize : '.75rem', lineHeight : '1rem'}}>{title}</p>
            </div>
        </div>
    )
}