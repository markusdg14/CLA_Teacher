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
import HomeroomAttendanceReward from './components/attendanceReward';
import HomeroomHabitChallengeTalent from './components/habitChallenge_talents';
import HomeroomStudentHabitDetail from './components/studentDetailHabit';
import HomeroomStudentHabitOnGoing from './components/onGoingHabit';
import AttendanceRewardModal from './components/AttendanceRewardModal';


export default function HomeroomDetail(){
    var base = new Base()

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    const [view_type, set_view_type] = useState('view')
    const [detail_type, set_detail_type] = useState('')

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : '', name : ''}})
    const [header_title, set_header_title] = useState('')
    const [header_menu_arr, set_header_menu_arr] = useState([
        {id : 'dashboard', title : 'Dashboard', is_selected : (query.get('tab') == null || query.get('tab') === '' || query.get('tab') == 'dashboard' ? true : false)},
        {id : 'list_student', title : 'List Student', is_selected : (query.get('tab') != null ? (query.get('tab') == 'list_student' ? true : false) : false)},
        {id : 'report_card_grade', title : 'Report Card Grade', is_selected : (query.get('tab') != null ? (query.get('tab') == 'report_card_grade' ? true : false) : false)},
        {id : 'report_card_skill', title : 'Report Card Skill', is_selected : (query.get('tab') != null ? (query.get('tab') == 'report_card_skill' ? true : false) : false)},
        {id : 'attendance-reward', title : 'Attendance & Reward', is_selected : (query.get('tab') != null ? (query.get('tab') == 'attendance-reward' ? true : false) : false)},
        {id : 'habit_tracker', title : 'Habit Challenge / Talents', is_selected : (query.get('tab') != null ? (query.get('tab') == 'habit_tracker' ? true : false) : false)},
    ])
    const [header_selected, set_header_selected] = useState('')
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
    const [skill_grade_book_arr, set_skill_grade_book_arr] = useState([])

    const [legend_arr, set_legend_arr] = useState([])

    const [term_arr, set_term_arr] = useState([])
    const [term_selected, set_term_selected] = useState('')

    const [reward_arr, set_reward_arr] = useState([])
    const [date_arr, set_date_arr] = useState([])
    const [attendance_reward_month, set_attendance_reward_month] = useState([])
    const [class_student_arr, set_class_student_arr] = useState([])
    const [arr_point, set_arr_point] = useState({})

    const [attendance_reward_nav_btn] = useState([
        {icon : 'fas fa-chevron-circle-left', type : 'prev', margin : 'mr-2'},
        {icon : 'fas fa-chevron-circle-right', type : 'next', margin : 'ml-2'},
    ])
    const [attendance_reward_offset, set_attendance_reward_offset] = useState(0)
    const [is_prev_offset, set_is_prev_offset] = useState(true)
    const [is_next_offset, set_is_next_offset] = useState(true)

    const [to_be_confirm_habit_arr, set_to_be_confirm_habit_arr] = useState([])
    const [habit_student_selected, set_habit_student_selected] = useState({id : '', name : '', talent_balance : 0, talent_rate : {rate : 0}, image_display : '', class_student_id : ''})
    const [accomplished_habit_arr, set_accomplished_habit_arr] = useState([])
    const [talents_transaction_arr, set_talents_transaction_arr] = useState([])
    const [search_habit, set_search_habit] = useState('')
    const [search_transaction, set_search_transaction] = useState('')

    const [on_goingHabit_arr, set_on_goingHabit_arr] = useState([])

    const [attendance_reward_student_selected, set_attendance_reward_student_selected] = useState('')
    const [attendance_score_arr] = useState([{id : 0, name : 0}, {id : 1, name : 1}, {id : 'P', name : 'P'}])
    const [reward_score_arr] = useState([{id : 0, name : 0}, {id : 1, name : 1}])
    const [reward_score, set_reward_score] = useState([])

    const [attendance_date, set_attendance_date] = useState('')
    const [attendance_all_one, set_attendance_all_one] = useState(false)

    const [attendance_start_date, set_attendance_start_date] = useState('')
    const [attendance_end_date, set_attendance_end_date] = useState('')
    const [attendance_class_student, set_attendance_class_student] = useState('')
    const [attendance_date_arr, set_attendance_date_arr] = useState([])
    const [attendance_point_data, set_attendance_point_data] = useState(null)
    const [attendance_reward_arr, set_attendance_reward_arr] = useState([])
    const [point_transaction_arr, set_point_transaction_arr] = useState([])

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)

        var tab_selected = query.get('tab')
        if(tab_selected != null){
            set_header_selected(tab_selected)
        }
        else{
            set_header_selected('dashboard')
        }

        base.$('#attendanceRewardModal').on('hidden.bs.modal', function () {
            set_attendance_class_student('')
            set_attendance_start_date('')
            set_attendance_date('')
            set_attendance_end_date('')
            // set_attendance_reward_student_selected('')
            set_attendance_date_arr([])
            set_attendance_point_data(null)
            set_attendance_reward_arr([])
        })
    }, [])

    useEffect(async ()=>{
        if(user_data.id !== ''){
            // get_data()
        }
    }, [user_data])

    useEffect(async ()=>{
        set_term_selected('')
        get_data()
        if(header_selected === 'report_card_skill'){
            get_legend()
        }
        else if(header_selected === 'attendance-reward'){
            get_term()
        }
        if(header_selected === 'report_card_grade'){
            get_term()
        }

    }, [header_selected])

    useEffect(async ()=>{
        if(term_selected !== '')
            get_data()
    }, [term_selected])

    useEffect(async ()=>{
        get_data()
    }, [attendance_reward_offset])

    useEffect(async ()=>{
        if(detail_type === 'student_habit'){
            get_detail()
        }
        else if(detail_type === 'habit_on_going'){
            get_on_going_habit()
        }
    }, [detail_type, search_habit])

    useEffect(async ()=>{
        if(habit_student_selected.id !== ''){
            get_habit_transaction()
        }
    }, [habit_student_selected])

    async function get_student(){
        var url = '/class/homeroom?id=' + query.get('id')
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                var student_data = data.student
                var student_arr = []
                for(var x in student_data){
                    student_data[x].user.image_display = base.img_no_profile
                    student_data[x].user.class_student_id = student_data[x].id
                    if(student_data[x].user.file_name != null){
                        student_data[x].user.image_display = base.url_photo('user', student_data[x].user.file_name)
                    }
                    student_arr.push(student_data[x].user)
                }

                set_student_arr(student_arr)
                set_student_arr_temp(student_arr)
            }
        }
    }

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
        else if(header_selected === 'attendance-reward'){
            url += 'attendance-reward'
        }
        else if(header_selected === 'habit_tracker'){
            url = '/habit/tracker?class_id=' + query.get('id') + '&type=need_confirm'
        }

        if(header_selected !== 'habit_tracker'){
            url += '?id=' + query.get('id')
        }

        if(header_selected === 'report_card_skill'){
            url += '&user_id=' + skill_student_selected
        }
        else if(header_selected === 'attendance-reward'){
            url += '&term_id=' + term_selected + '&counter=' + attendance_reward_offset
        }
        else if(header_selected === 'report_card_grade'){
            url += '&term_id=' + term_selected
        }

        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                

                
                if(header_selected === ''){
                    set_header_title(data.grade_name + ' ' + data.name)
                }
                else if(header_selected === 'dashboard'){
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
                        student_data[x].user.image_display = base.img_no_profile
                        student_data[x].user.class_student_id = student_data[x].id
                        if(student_data[x].user.file_name != null){
                            student_data[x].user.image_display = base.url_photo('user', student_data[x].user.file_name)
                        }
                        student_arr.push(student_data[x].user)
                    }
                    set_student_arr(student_arr)
                    set_student_arr_temp(student_arr)

                    set_schedule_lesson_day_arr(data.arr_day)
                    set_schedule_lesson_time_arr(data.arr_time)

                    var arr_schedule = []
                    var data_schedule_arr = data.arr_schedule
                    set_schedule_arr(data_schedule_arr)

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
                    set_skill_grade_book_arr(data.arr_grade_book_skill)
                }
                else if(header_selected === 'attendance-reward'){
                    var data_student = data.arr_class_student
                    for(var x in data_student){
                        
                        data_student[x].is_show = false
                        if(attendance_reward_student_selected !== ''){
                            if(attendance_reward_student_selected === data_student[x].user_id){
                                data_student[x].is_show = true
                            }
                        }
                    }

                    if(attendance_reward_student_selected === ''){
                        data_student[0].is_show = true
                    }

                    var arr_reward = data.arr_reward
                    for(var x in arr_reward){
                        arr_reward[x].score = ''
                    }
                    set_reward_score(arr_reward)

                    set_reward_arr(data.arr_reward)
                    set_date_arr(data.arr_lesson_schedule.arr)
                    set_attendance_reward_month(base.moment(data.arr_date.arr[0]).format('MMMM'))
                    set_class_student_arr(data_student)
                    set_arr_point(data.arr_point)

                    set_is_prev_offset(data.arr_lesson_schedule.previous_page)
                    set_is_next_offset(data.arr_lesson_schedule.next_page)
                }
                else if(header_selected === 'habit_tracker'){
                    set_to_be_confirm_habit_arr(data.data)
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

    async function get_term(){
        var url = '/term'

        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                set_term_arr(data)
                set_term_selected(data[0].id)
            }
        }
    }

    function changeTerm(val){
        set_attendance_reward_offset(0)
        set_term_selected(val)
    }

    function changeMenu(index){
        set_search('')
        set_skill_student_selected('')
        set_skill_grade_arr([])
        set_skill_student_name_selected('')
        set_skill_subject_arr([])
        set_skill_ctg_arr([])
        set_skill_list_arr([])
        set_skill_project_arr([])
        set_skill_grade_arr([])
        set_attendance_reward_offset(0)
        set_reward_arr([])
        set_date_arr([])
        set_attendance_reward_month([])
        set_class_student_arr([])
        set_arr_point({})
        set_term_selected('')
        set_view_type('view')
        set_detail_type('')
        set_habit_student_selected({id : '', name : '', talent_balance : 0, talent_rate : {rate : 0}, image_display : '', class_student_id : ''})

        var data_index = header_menu_arr[index]
        var initSelected = data_index.is_selected
        for(var x in header_menu_arr){
            header_menu_arr[x].is_selected = false
        }
        header_menu_arr[index].is_selected = true
        base.update_array(header_menu_arr, set_header_menu_arr, data_index, index)

        if(header_menu_arr[index].is_selected){
            set_header_selected(header_menu_arr[index].id)
            window.history.pushState({}, null, '/homeroom/detail?id=' + query.get('id') + '&tab=' + header_menu_arr[index].id)
        }
    }

    function backBtn(){
        if(view_type === 'view'){
            window.history.back()
        }
        else if(view_type === 'detail'){
            if(detail_type === 'student_habit'){
                set_view_type('view')
                set_detail_type('')
                set_habit_student_selected({id : '', name : '', talent_balance : 0, talent_rate : {rate : 0}, image_display : '', class_student_id : ''})
            }
            else if(detail_type === 'habit_on_going'){
                set_view_type('detail')
                set_detail_type('student_habit')
            }
        }
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
        else if(type === 'student_habit'){
            set_search_habit(val)
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

    function toggleStudent(index){
        var data_index = class_student_arr[index]
        var initShow = data_index.is_show
        for(var x in class_student_arr){
            class_student_arr[x].is_show = false
        }
        class_student_arr[index].is_show = !initShow

        base.update_array(class_student_arr, set_class_student_arr, data_index, index)
    }

    function changeOffset(type){
        if(type === 'prev'){
            if(is_prev_offset){
                set_attendance_reward_offset(attendance_reward_offset - 1)
            }
        }
        else if(type === 'next'){
            if(is_next_offset){
                set_attendance_reward_offset(attendance_reward_offset + 1)
            }
        }
    }

    function viewDetailHabit(index){
        set_view_type('detail')
        set_detail_type('student_habit')
        var data = student_arr[index]
        set_habit_student_selected(data)
        window.scrollTo(0,0)
    }

    async function get_detail(){
        var url = ''
        if(detail_type === 'student_habit'){
            url = '/habit/tracker?class_id=' + query.get('id') + '&type=accomplished&search=' + search_habit
        }

        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data

                if(detail_type === 'student_habit'){
                    set_accomplished_habit_arr(data.data)
                }
            }
        }
    }

    async function get_habit_transaction(){
        var url = '/talent/transaction?class_student_id=' + habit_student_selected.class_student_id
        
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                set_talents_transaction_arr(data.data)
            }
        }
    }

    function viewOnGoingHabit(){
        set_search_habit('')
        set_view_type('detail')
        set_detail_type('habit_on_going')
        window.scrollTo(0,0)
    }

    async function get_on_going_habit(){
        var url = '/habit/tracker?class_id=' + query.get('id') + '&type=to_be_completed&search=&class_student_id=' + habit_student_selected.class_student_id
        
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data

                for (var x in data){
                    var start_date = base.moment(data[x].start_date)
                    var end_date = base.moment(data[x].end_date)
                    data[x].duration_day = end_date.diff(start_date, 'days')

                    var arr = []
                    var arr_temp = []
                    var counter = 0
                    while(start_date.isSameOrBefore(end_date)){
                        var flag = false
                        if(counter == 0){
                            arr_temp = []
                        }

                        for(let history of data[x].history){
                            var history_date = base.moment(history.done_at)
                            if(start_date.isSame(history_date, 'date')){
                                flag = true
                                break
                            }
                        }

                        arr_temp.push({
                            date : base.moment(start_date).format('DD'),
                            is_done : flag
                        })
                        start_date.add(1, 'd')
                        counter++
                        if(counter >= 10 || start_date.isSame(end_date)){
                            arr.push(arr_temp)
                            counter = 0
                        }
                    }

                    data[x].day_arr = arr

                    data[x].is_show = true
                }

                set_on_goingHabit_arr(data)
            }
        }
    }

    async function toggleHabitOnGoing(index){
        var data_index = on_goingHabit_arr[index]
        var initShow = data_index.is_show
        for(var x in on_goingHabit_arr){
            on_goingHabit_arr[x].is_show = false
        }
        on_goingHabit_arr[index].is_show = !initShow

        base.update_array(on_goingHabit_arr, set_on_goingHabit_arr, data_index, index)
    }

    async function addAttendanceReward(){
        set_attendance_reward_student_selected('')
        get_student()
        base.$('#attendanceRewardModal').modal('show')
    }

    useEffect(()=>{
        if(attendance_class_student !== ''){
            if(attendance_date != ''){
                get_point_transaction()
            }
        }
    }, [attendance_date, attendance_class_student])

    async function changeAttendance(value, type, index=0){
        if(type === 'student'){
            for(var x in class_student_arr){
                if(class_student_arr[x].user_id === value){
                    set_attendance_class_student(class_student_arr[x].id)
                    break
                }
            }
            set_attendance_reward_student_selected(value)
        }
        else if(type === 'reward'){
            var data_index = reward_score[index]
            reward_score[index].score = value

            var attendance_all_one = true
            for(var x in reward_score){
                if(reward_score[x].name !== 'Spiritual Growth'){
                    if(reward_score[x].score !== '1') {
                        attendance_all_one = false
                        break
                    }
                }
            }

            set_attendance_all_one(attendance_all_one)
            base.update_array(reward_score, set_reward_score, data_index, index)

        }
        else if(type === 'date'){
            var start_date = base.moment(value).startOf('isoWeek').format('YYYY-MM-DD')
            var end_date = base.moment(value).startOf('isoWeek').add(4, 'd').format('YYYY-MM-DD')
            set_attendance_start_date(start_date)
            set_attendance_end_date(end_date)
            set_attendance_date(new Date(value))
        }
    }

    async function get_point_transaction(){
        var url = '/point/transaction/student?class_student_id=' + attendance_class_student + '&date=' + base.moment(attendance_date).format('YYYY-MM-DD')
        
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                set_attendance_date_arr(data.arr_date)
                set_attendance_reward_arr(data.arr_reward)
                set_attendance_point_data(data.arr_point_transaction)
            }
        }
    }

    async function changeRadioAttendance(index_score, index_date, index_reward){
        var data_score = reward_score_arr
        if(reward_arr[index_reward].name === 'Attendance'){
            data_score = attendance_score_arr
        }

        var attendance_point_selected = attendance_point_data[attendance_date_arr[index_date]][attendance_reward_arr[index_reward].id]

        var score = data_score[index_score].id

        if(attendance_point_selected != null){
            if(attendance_point_selected.id == null){
                if(attendance_point_selected.amount === data_score[index_score].id){
                    score = '-'
                }
            }
            attendance_point_selected.amount = score
        }
        else{
            attendance_point_data[attendance_date_arr[index_date]][attendance_reward_arr[index_reward].id] = {}
            attendance_point_data[attendance_date_arr[index_date]][attendance_reward_arr[index_reward].id].amount = score
        }

        base.update_object(attendance_point_data, set_attendance_point_data, score, attendance_point_data[attendance_date_arr[index_date]][attendance_reward_arr[index_reward].id].amount)
    }

    async function postReward(){
        var data_post = {
            class_student : {id : attendance_class_student},
        }

        var arr_attendance_reward = []
        for(var x in attendance_date_arr){
            var data = {}
            data.date = attendance_date_arr[x]
            var arr = []
            for(var y in attendance_reward_arr){
                var data_reward = attendance_point_data[attendance_date_arr[x]][attendance_reward_arr[y].id]
                if(data_reward != null){
                    if(data_reward.amount != '-'){
                        data_reward.reward = {id : attendance_reward_arr[y].id}
                        arr.push(data_reward)
                    }
                }
            }
            data.arr = arr
            arr_attendance_reward.push(data)
        }
        data_post.arr_attendance_reward = arr_attendance_reward
        var url = '/point/transaction'
        
        var response = await base.request(url, 'put', data_post)
        if(response != null){
            if(response.status == 'success'){
                base.$('#attendanceRewardModal').modal('hide')
                // set_attendance_class_student('')
                // set_attendance_start_date('')
                // set_attendance_date('')
                // set_attendance_end_date('')
                // set_attendance_reward_student_selected('')
                // set_attendance_date_arr([])
                // set_attendance_point_data(null)
                // set_attendance_reward_arr([])
                get_data()
            }
        }
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
                            <div className='col-12 py-4 px-3 py-lg-5 px-lg-4'>
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

            {
                view_type === 'view' ?
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
                        <HomeroomReportGrade
                            grade_subject_arr={grade_subject_arr}
                            grade_student_arr={grade_student_arr}
                            grade_book_dtl_arr={grade_book_dtl_arr}
                            toggleSubject={(index)=>toggleSubject(index)}
                            term_arr={term_arr} term_selected={term_selected}
                            changeTerm={(val)=>changeTerm(val)}
                        />
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
                            skill_grade_book_arr={skill_grade_book_arr}
                        />
                        </>
                        : header_selected === 'attendance-reward' ?
                        <>
                            <HomeroomAttendanceReward
                                term_arr={term_arr}
                                term_selected={term_selected}
                                changeTerm={(val)=>changeTerm(val)}
                                reward_arr={reward_arr}
                                date_arr={date_arr}
                                attendance_reward_month={attendance_reward_month}
                                class_student_arr={class_student_arr}
                                arr_point={arr_point}
                                toggleStudent={(indexStudent)=>toggleStudent(indexStudent)}
                                attendance_reward_nav_btn={attendance_reward_nav_btn}
                                changeOffset={(type)=>changeOffset(type)}
                                addAttendanceReward={()=>addAttendanceReward()}
                            />
                        </>
                        : header_selected === 'habit_tracker' ?
                        <>
                            <HomeroomHabitChallengeTalent 
                                search={search}
                                changeSearch={(value)=>changeSearch(value, 'habit')}
                                student_arr={student_arr}
                                to_be_confirm_habit_arr={to_be_confirm_habit_arr}
                                viewDetailHabit={(index)=>viewDetailHabit(index)}
                                // confirmHabit={(type, index=0)=>confirmHabit(type, index)}
                                // modal_habit_redeem_btn_disable={modal_habit_redeem_btn_disable}
                            />
                        </>
                        :
                        <></>
                    }
                </div>
                : view_type === 'detail' ?
                <div className='col-12 mt-5'>
                    {
                        detail_type === 'student_habit' ?
                        <>
                            <HomeroomStudentHabitDetail
                                habit_student_selected={habit_student_selected}
                                search={search_habit}
                                changeSearch={(value)=>changeSearch(value, 'student_habit')}
                                accomplished_habit_arr={accomplished_habit_arr}
                                talents_transaction_arr={talents_transaction_arr}
                                viewOnGoing={()=>viewOnGoingHabit()}
                            />
                        </>
                        : detail_type === 'habit_on_going' ?
                        <>
                            <HomeroomStudentHabitOnGoing
                                habit_student_selected={habit_student_selected}
                                on_goingHabit_arr={on_goingHabit_arr}
                                toggleHabitOnGoing={(index)=>toggleHabitOnGoing(index)}
                            />
                        </>
                        : <></>
                    }
                </div>
                : <></>
            }

            <AttendanceRewardModal
                student_arr={student_arr}
                attendance_reward_student_selected={attendance_reward_student_selected}
                attendance_reward_arr={attendance_reward_arr}
                attendance_score_arr={attendance_score_arr}
                reward_score_arr={reward_score_arr}
                changeAttendance={(value, type, index)=>changeAttendance(value, type, index)}
                postReward={()=>postReward()}
                attendance_all_one={attendance_all_one}
                attendance_date={attendance_date}
                attendance_date_arr={attendance_date_arr}
                point_transaction_arr={point_transaction_arr}
                attendance_point_data={attendance_point_data}
                changeRadio={(index_score, index_date, index_reward)=>changeRadioAttendance(index_score, index_date, index_reward)}
            />

        </div>
    )
}