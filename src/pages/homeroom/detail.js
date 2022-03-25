import { useEffect, useState, useRef, useMemo } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import Header from '../../components/header';

import HomeList from '../../components/homeList';
import LessonBadge from '../../components/lessonBadge';
import CustomBadge from '../../components/customBadge';
import CardSubject from '../../components/cardSubject';
import HomeroomDashboard from './components/dashboard';
import HomeroomReportGrade from './components/reportGrade';
import HomeroomReportSkill from './components/reportSkill';
import HomeroomListStudent from './components/listStudent';


export default function HomeroomDetail(){
    var base = new Base()

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : '', name : ''}})
    const [header_title, set_header_title] = useState('')
    const [header_menu_arr, set_header_menu_arr] = useState([
        {id : 'dashboard', title : 'Dashboard', is_selected : true},
        {id : 'list_student', title : 'List Student', is_selected : false},
        {id : 'report_card_grade', title : 'Report Card Grade', is_selected : false},
        {id : 'report_card_skill', title : 'Report Card Skill', is_selected : false},
        {id : 'attendance_reward', title : 'Attendance & Reward', is_selected : false},
        {id : 'habit_tracker', title : 'Habit Tracker / Talents', is_selected : false},
    ])
    const [header_selected, set_header_selected] = useState('dashboard')
    const [rank_student_arr, set_rank_student_arr] = useState([])
    const [todo_list_arr, set_todo_list_arr] = useState([])
    const [schedule_lesson_day_arr, set_schedule_lesson_day_arr] = useState([])
    const [schedule_lesson_time_arr, set_schedule_lesson_time_arr] = useState([])
    const [schedule_arr, set_schedule_arr] = useState([])

    const [school_subject_arr, set_school_subject_arr] = useState([])
    const [school_subject_arr_temp, set_school_subject_arr_temp] = useState([])

    const [search, set_search] = useState('')

    const [report_grade_data_arr, set_report_grade_data_arr] = useState([])

    const [grade_subject_arr, set_grade_subject_arr] = useState([])
    const [grade_student_arr, set_grade_student_arr] = useState([])
    const [grade_book_dtl_arr, set_grade_book_dtl_arr] = useState([])

    const [student_arr, set_student_arr] = useState([])
    const [student_arr_temp, set_student_arr_temp] = useState([])
    const [skill_student_selected, set_skill_student_selected] = useState('')
    const [skill_student_name_selected, set_skill_student_name_selected] = useState('')
    const [skill_subject_arr, set_skill_subject_arr] = useState([])
    const [skill_ctg_arr, set_skill_ctg_arr] = useState([])
    const [skill_list_arr, set_skill_list_arr] = useState([])
    const [skill_project_arr, set_skill_project_arr] = useState([])
    const [skill_grade_arr, set_skill_grade_arr] = useState([])

    const [legend_arr, set_legend_arr] = useState([])

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(async ()=>{
        if(user_data.id !== ''){
            // get_data()
        }
    }, [user_data])

    useEffect(async ()=>{
        if(header_selected !== 'report_card_skill'){
            get_data()
        }
        else {
            get_legend()
        }
    }, [header_selected])

    async function get_data(){
        var url = '/class/'
        if(header_selected === 'dashboard' || header_selected === 'list_student'){
            url += 'homeroom'
        }
        else if(header_selected === 'report_card_grade'){
            url += 'report-card'
        }
        else if(header_selected === 'report_card_skill'){
            url += 'grade-skill'
        }

        // /assessment/range?id=

        url += '?id=' + query.get('id')

        if(header_selected === 'report_card_skill'){
            url += '&user_id=' + skill_student_selected
        }

        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data

                if(header_selected === 'dashboard'){
                    set_header_title(data.grade.name + ' ' + data.name)
                    var grade_rank = data.arr_grade_rank
                    for(var x in grade_rank){
                        grade_rank[x].class_student.user.image_display = base.img_no_profile
                        if(grade_rank[x].class_student.user.file_name != null){
                            grade_rank[x].class_student.user.image_display = base.url_photo('user', grade_rank[x].class_student.user.file_name)
                        }
                    }
                    set_rank_student_arr(grade_rank)
                    
                    var student_data = data.student
                    var student_arr = []
                    for(var x in student_data){
                        student_arr.push(student_data[x].user)
                    }
                    set_student_arr(student_arr)
                    set_student_arr_temp(student_arr)

                    set_schedule_lesson_day_arr(data.arr_day)
                    set_schedule_lesson_time_arr(data.arr_time)

                    var arr_schedule = []
                    var data_schedule_arr = data.arr_schedule
                    for(let day of data.arr_day){
                        for(let time of data.arr_time){
                            var time_moment = base.moment(time.id, 'HH:mm')
                            if(arr_schedule[day.id] == null)
                                arr_schedule[day.id] = []
                            if(arr_schedule[day.id][time.name] == null)
                                arr_schedule[day.id][time.name] = {}

                            for(var x in data_schedule_arr){
                                if(data_schedule_arr[x][time.id] != null){
                                    var start_time = base.moment(data_schedule_arr[x][time.id].start_time).format('HH:mm')
                                    start_time = base.moment(start_time, 'HH:mm')
                                    var end_time = base.moment(data_schedule_arr[x][time.id].end_time).format('HH:mm')
                                    end_time = base.moment(end_time, 'HH:mm')
                                    if(data_schedule_arr[x][time.id].day == day.id && time_moment.isSameOrAfter(start_time) && time_moment.isBefore(end_time)){
                                        arr_schedule[day.id][time.name] = data_schedule_arr[x][time.id]
                                        break
                                    }
                                }
                            }
                        }
                    }

                    set_schedule_arr(arr_schedule)

                    var assign_teacher = data.arr_assign_teacher
                    var arr_school_subject = []
                    for(var x in assign_teacher){
                        var data_subject = assign_teacher[x].subject
                        data_subject.teacher  = assign_teacher[x].teacher_assigned_str
                        arr_school_subject.push(data_subject)
                    }
                    set_school_subject_arr(arr_school_subject)
                    set_school_subject_arr_temp(arr_school_subject)
                }
                else if(header_selected === 'report_card_grade'){
                    var subject_data_arr = data.arr_subject
                    for(var x in subject_data_arr){
                        subject_data_arr[x].is_show = false
                    }
                    subject_data_arr[0].is_show = true
                    set_grade_subject_arr(subject_data_arr)
                    set_grade_student_arr(data.arr_class_student)
                    set_grade_book_dtl_arr(data.arr_grade_book_detail)
                }
                else if(header_selected === 'report_card_skill'){
                    set_skill_project_arr(data.arr_project.data)
                    set_skill_list_arr(data.arr_skill)
                    set_skill_ctg_arr(data.arr_skill_category)

                    for(var x in data.arr_subject){
                        data.arr_subject[x].is_show = false
                    }
                    data.arr_subject[0].is_show = true
                    set_skill_subject_arr(data.arr_subject)
                    set_skill_grade_arr(data.arr_grade_skill)
                }
            }
        }
    }

    async function get_legend(){
        var url = '/assessment/range'

        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                set_legend_arr(data)
            }
        }
    }

    function changeMenu(index){
        set_search('')
        set_skill_student_selected('')
        set_skill_grade_arr([])
        set_skill_student_selected('')
        set_skill_subject_arr([])
        set_skill_ctg_arr([])
        set_skill_list_arr([])
        set_skill_project_arr([])
        set_skill_grade_arr([])

        var data_index = header_menu_arr[index]
        var initSelected = data_index.is_selected
        for(var x in header_menu_arr){
            header_menu_arr[x].is_selected = false
        }
        header_menu_arr[index].is_selected = true
        base.update_array(header_menu_arr, set_header_menu_arr, data_index, index)

        if(header_menu_arr[index].is_selected){
            set_header_selected(header_menu_arr[index].id)
        }
    }

    function backBtn(){
        window.history.back()
    }

    function changeSearch(val, type){
        set_search(val)
        if(type === 'subject'){
            set_school_subject_arr([])
            var arr_temp = JSON.parse(JSON.stringify(school_subject_arr_temp))
            var data = arr_temp.filter((obj) => {
                return(JSON.stringify(obj).toLowerCase().includes(val.toLowerCase()))
            })
            set_school_subject_arr(data)
        }
        else if(type === 'student'){
            set_student_arr([])
            var arr_temp = JSON.parse(JSON.stringify(student_arr_temp))
            var data = arr_temp.filter((obj) => {
                return(JSON.stringify(obj).toLowerCase().includes(val.toLowerCase()))
            })
            set_student_arr(data)
        }

    }

    function toggleSubject(index){
        var data_index = grade_subject_arr[index]
        var initShow = data_index.is_show
        for(var x in grade_subject_arr){
            grade_subject_arr[x].is_show = false
        }
        grade_subject_arr[index].is_show = !initShow

        base.update_array(grade_subject_arr, set_grade_subject_arr, data_index, index)
    }

    function changeStudent(value){
        set_skill_student_selected(value)
    }

    function filterStudent(){
        if(skill_student_selected !== ''){
            for(var x in student_arr){
                if(student_arr[x].id === skill_student_selected){
                    set_skill_student_name_selected(student_arr[x].name)
                }
            }
            get_data()
        }
    }

    function toggleReportSkill(index){
        var data_index = skill_subject_arr[index]
        var initShow = data_index.is_show
        for(var x in skill_subject_arr){
            skill_subject_arr[x].is_show = false
        }
        skill_subject_arr[index].is_show = !initShow
        base.update_array(skill_subject_arr, set_skill_subject_arr, data_index, index)
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Homeroom'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='row'>
                    <div className='col-auto'>
                        <div className='bg-white shadow-sm rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                            <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                        </div>
                    </div>
                    <div className='col-auto'>
                        <div className='bg-white shadow-sm rounded h-100 d-flex align-items-center px-4'>
                            <h5 className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{header_title}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <div className='col-12 py-5 px-4'>
                                <div className='row m-0'>
                                    {
                                        header_menu_arr.map((data, index)=>(
                                            <div className='col-auto p-0 mr-2' key={index}>
                                                <div className={(data.is_selected ? 'bg-primary' : '') + ' p-2 px-3'} style={{borderRadius : '1.5rem', cursor : 'pointer'}} onClick={()=>changeMenu(index)}>
                                                    <p className={'m-0' + (data.is_selected ? ' text-white' : '')}>{data.title}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className='col-12 mt-5'>
                {
                    header_selected === 'dashboard' ? 
                    <>
                        <HomeroomDashboard 
                            rank_student_arr={rank_student_arr}
                            schedule_lesson_day_arr={schedule_lesson_day_arr}
                            schedule_lesson_time_arr={schedule_lesson_time_arr}
                            schedule_arr={schedule_arr} school_subject_arr={school_subject_arr}
                            search={search}
                            changeSearch={(value)=>changeSearch(value, 'subject')}
                        />
                    </>
                    : header_selected === 'list_student' ?
                    <>
                    <HomeroomListStudent student_arr={student_arr} search={search} changeSearch={(value)=>changeSearch(value, 'student')} />
                    </>
                    : header_selected === 'report_card_grade' ?
                    <>
                    <HomeroomReportGrade grade_subject_arr={grade_subject_arr} grade_student_arr={grade_student_arr} grade_book_dtl_arr={grade_book_dtl_arr} toggleSubject={(index)=>toggleSubject(index)} />
                    </>
                    : header_selected === 'report_card_skill' ?
                    <>
                    <HomeroomReportSkill
                        skill_student_arr={student_arr}
                        skill_student_selected={skill_student_selected}
                        skill_student_name_selected={skill_student_name_selected}
                        changeStudent={(value)=>changeStudent(value)}
                        filterBtn={()=>filterStudent()}
                        skill_subject_arr={skill_subject_arr}
                        skill_ctg_arr={skill_ctg_arr}
                        skill_list_arr={skill_list_arr}
                        skill_project_arr={skill_project_arr}
                        skill_grade_arr={skill_grade_arr}
                        legend_arr={legend_arr}
                        toggleReportSkill={(index)=>toggleReportSkill(index)}
                    />
                    </>
                    :
                    <>

                    </>
                }
            </div>

        </div>
    )
}