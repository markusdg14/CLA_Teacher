import { useEffect, useState, useMemo } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import CardSubject from '../../../components/cardSubject';
import NoData from '../../../components/NoData'
import ActiveUnactiveData from '../../../components/activeUnactiveData';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';

import Select from 'react-select'
import ModalConfirm from './components/confirmModal';
import ModalSubmit from '../checkAssignment/modalSubmit';
import NotAssigned from '../../../components/NotAssigned';
import LoadingData from '../../../components/loading';
import ModalSubmitAll from './components/modalSubmitAll';

export default function SubjectLesson(){
    var base = new Base()

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : '', name : ''}})

    const [filter_grade_arr, set_filter_grade_arr] = useState([])
    const [filter_grade_selected, set_filter_grade_selected] = useState('')
    const [filter_class_selected, set_filter_class_selected] = useState('')

    const [filter_subject_arr, set_filter_subject_arr] = useState([])
    const [filter_subject_selected, set_filter_subject_selected] = useState([])
    const [filter_lesson_arr, set_filter_lesson_arr] = useState([])
    const [filter_lesson_selected, set_filter_lesson_selected] = useState([])

    const [data_arr, set_data_arr] = useState([])

    const [activity_type_selected, set_activity_type_selected] = useState('')
    const [activity_assessment_rule_selected, set_activity_assessment_rule_selected] = useState('')
    const [activity_rule_selected, set_activity_rule_selected] = useState('')
    const [is_modal_btn_disable, set_is_modal_btn_disable] = useState(false)
    const [grade_skill_arr, set_grade_skill_arr] = useState([])
    const [rule, set_rule] = useState([])
    const [numerical_score, set_numerical_score] = useState('')
    const [assignment_status_data, set_assignment_status_data] = useState('')
    const [teacher_notes, set_teacher_notes] = useState('')
    const [assignment_submitted_id, set_assignment_submitted_id] = useState('')
    const [activity_subject_selected, set_activity_subject_selected] = useState('')
    const [rule_detail_arr, set_rule_detail_arr] = useState([])
    const [radio_project_selected, set_radio_project_selected] = useState('major_revision')
    const [class_student_id, set_class_student_id] = useState('')

    const [selected_academic_year, set_selected_academic_year] = useState('')

    const [is_student_online_selected, set_is_student_online_selected] = useState(false)

    const [is_loading, set_is_loading] = useState(true)
    const [is_loading_filter, set_is_loading_filter] = useState(true)
    const [is_loading_data, set_is_loading_data] = useState(false)

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
        set_selected_academic_year(check_user.user_data.current_academic_year.id)

        base.$('#modalSubmit').on('hidden.bs.modal', function (event) {
            set_activity_type_selected('')
            set_teacher_notes('')
            set_activity_assessment_rule_selected('')
        })
    }, [])

    useEffect(async ()=>{
        if(user_data.id !== ''){
            if(selected_academic_year !== ''){
                await get_filter_data_arr('grade')
                await get_filter_data_arr('lesson')
    
                if(query.get('grade_id') != null){
                    await set_filter_grade_selected(query.get('grade_id'))
                }
                if(query.get('class_id') != null){
                    await set_filter_class_selected(query.get('class_id'))
                }
                set_is_loading(false)
            }
        }
    }, [user_data, selected_academic_year])

    useEffect(async ()=>{
        if(filter_grade_selected != ''){
            get_filter_data_arr('subject', filter_grade_selected)
        }
    }, [filter_grade_selected])

    useEffect(async ()=>{
        if(query.get('grade_id') != null){
            if(data_arr.length === 0){
                set_is_loading_data(true)
                set_data_arr([])
                filterBtn()
            }
        }
    }, [filter_grade_selected, filter_class_selected, filter_subject_selected, filter_lesson_selected])

    async function get_filter_data_arr(type, id=''){
        var url = ''
        if(type === 'grade'){
            url = '/academic-year/class?academic_year_id=' + selected_academic_year
            // url = '/class/homeroom?type=current_academic_year'
        }
        else if(type === 'subject'){
            url = '/subject?grade_id=' + id + '&class_id=' + filter_class_selected
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
                    for(var x in data1){
                        data1[x].name = data1[x].grade.name + ' ' + data1[x].name
                    }
                    
                    set_filter_grade_arr(data1)
                }
                else if(type === 'subject'){
                    var subject_arr = data.data
                    
                    for(var x in subject_arr){
                        subject_arr[x].label = subject_arr[x].name
                        subject_arr[x].value = subject_arr[x].id
                    }

                    var filter_url = []
                    if(query.get('subject_selected') != null){
                        filter_url = query.get('subject_selected').split(',')
                        var query_data = []

                        for(var x in filter_url){
                            for(var y in subject_arr){
                                if(subject_arr[y].id === filter_url[x]){
                                    query_data.push(subject_arr[y])
                                }
                            }
                            set_filter_subject_selected(query_data)
                        }
                    }

                    set_filter_subject_arr(subject_arr)
                }
                else if(type === 'lesson'){
                    for(var x in data){
                        data[x].label = data[x].name
                        data[x].value = data[x].id
                    }

                    var filter_url_lesson = []
                    if(query.get('lesson_selected') != null){
                        filter_url_lesson = query.get('lesson_selected').split(',')
                        var query_data = []

                        for(var x in filter_url_lesson){
                            for(var y in data){
                                if(data[y].id === filter_url_lesson[x]){
                                    query_data.push(data[y])
                                }
                            }
                            set_filter_lesson_selected(query_data)
                        }
                    }
                    set_filter_lesson_arr(data)
                }
            }
        }
    }

    async function changeFilter(index, type, value=''){
        if(type === 'grade'){
            set_filter_grade_selected(filter_grade_arr[index].grade.id)
            set_filter_class_selected(filter_grade_arr[index].id)
            set_filter_subject_selected([])
            set_filter_lesson_selected([])
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
            set_is_loading_filter(true)
            var subject_id = []
            var subject_name_selected = ''
            var subject_selected_id = ''

            for(var x in filter_subject_selected){
                subject_id.push(filter_subject_selected[x].id)
                subject_name_selected += filter_subject_selected[x].name + (parseInt(x) === filter_subject_selected.length-1 ? '' : ', ')
                subject_selected_id += filter_subject_selected[x].id + (parseInt(x) === filter_subject_selected.length-1 ? '' : ',')
            }
    
            set_subject_selected(subject_name_selected)
    
            var lesson_id = []
            var lesson_selected_id = ''
            for(var x in filter_lesson_selected){
                lesson_id.push(filter_lesson_selected[x].id)
                lesson_selected_id += filter_lesson_selected[x].id + (parseInt(x) === filter_lesson_selected.length-1 ? '' : ',')
            }

            window.history.pushState({}, null, '/subject-lesson?grade_id=' + filter_grade_selected + '&class_id=' + filter_class_selected + '&subject_selected=' + subject_selected_id + '&lesson_selected=' + lesson_selected_id)
    
            var url = '/assignment/group?arr_subject_id=' + JSON.stringify(subject_id)
                + '&arr_lesson_id=' + JSON.stringify(lesson_id) + '&grade_id=' + filter_grade_selected + '&class_id=' + filter_class_selected + '&type=current_academic_year'
            var response = await base.request(url)
            if(response != null){
                if(response.status == 'success'){
                    var data = response.data.data
                    for(var x in data){
                        for(var y in data[x].arr_assignment_agreement){
                            data[x].arr_assignment_agreement[y].icon = 'bi bi-puzzle-fill'
                            data[x].arr_assignment_agreement[y].activity_name = ''
                            if(data[x].arr_assignment_agreement[y].data_type === 'assignment'){
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
                                            {title : 'MJ', bg_color : '#CF91FF', status : 'need_much_correction', is_checked : (status_activity === 'need_much_correction' ? true : false)},
                                        ]
                                    },
                                    {
                                        title : 'bottom', data_arr : [
                                            {title : 'MN', bg_color : '#F2994A', status : 'need_correction',  is_checked : (status_activity === 'need_correction' ? true : false)},
                                            {title : 'S', bg_color : '#0085FF', status : 'on_checking',  is_checked : (status_activity === 'on_checking' ? true : false)},
                                            {title : 'HS', bg_color : '#FC5A5A', status : 'blocked',  is_checked : (status_activity === 'blocked' ? true : false)},
                                        ]
                                    },
                                ]
                            }
                        }
                    }

                    for(var x in data){
                        for(var y in data[x].arr_assignment_agreement){
                            data[x].arr_assignment_agreement[y].is_done = true
                            var class_student = data[x].arr_assignment_agreement[y].arr_class_student
                            for(var z in class_student){
                                if(class_student[z].last_assignment_submitted == null){
                                    data[x].arr_assignment_agreement[y].is_done = false
                                    break
                                }
                                else{
                                    if(class_student[z].last_assignment_submitted.assessment_status.data !== 'done'){
                                        data[x].arr_assignment_agreement[y].is_done = false
                                        break
                                    }
                                }
                            }
                        }
                    }

                    set_data_arr(data)
                    set_is_loading_filter(false)

                    setTimeout(() => {
                        set_is_loading_data(false)
                    }, 750);
                }
            }
        }

    }

    const [is_disable_btn_modal, set_is_disable_btn_modal] = useState(false)
    const [lesson_selected, set_lesson_selected] = useState(null)
    const [index_lesson_selected, set_index_lesson_selected] = useState('')
    const [selected_agreement_id, set_selected_agreement_id] = useState('')
    const [selected_student_id, set_selected_student_id] = useState('')
    const [status_activity_selected, set_status_activity_selected] = useState('')

    useEffect(async ()=>{
        if(lesson_selected != null){
            base.$('#modalConfirm').modal('show')
        }
    }, [lesson_selected, index_lesson_selected])

    async function confirmLesson(btn_from, index=0){
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
        var data = data_arr[index].arr_assignment_agreement[index_assignment]
        window.location.href='/subject-lesson/edit-activity?id=' + data.id + '&type=' + data.data_type
    }

    useEffect(async()=>{
        if(activity_type_selected !== ''){
            if(activity_assessment_rule_selected !== ''){
                get_grade_skill()
                get_rule()
                set_grade_skill_avg(0)
                set_grade_skill_total_score(0)
                base.$('#modalSubmit').modal('show')
            }
        }
        else{
            base.$('#modalSubmit').modal('hide')
        }
    }, [activity_type_selected, activity_assessment_rule_selected])

    async function get_rule(){
        var url = '/assessment/rule?id=' + activity_assessment_rule_selected
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                set_rule(data.name)
                set_rule_detail_arr(data.detail)
            }
        }
    }

    async function get_grade_skill(){
        var url = '/skill/category?id=&subject_id=' + activity_subject_selected + '&assignment_submitted_id=' + assignment_submitted_id
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data

                for(var x in data){
                    var arr_skill = data[x].arr_skill
                    for(var y in arr_skill){
                        arr_skill[y].score = ''
                    }
                }
                set_grade_skill_arr(data)
            }
        }
    }

    async function changeStatus(index, index_assignment, index_class_student, index_status, index_arr_status){
        var data_index = data_arr[index]
        var status_selected = data_index.arr_assignment_agreement[index_assignment].arr_class_student[index_class_student].status_activity_arr[index_status].data_arr[index_arr_status]
        var status = status_selected.status
        var assignment_agreement = data_arr[index].arr_assignment_agreement[index_assignment]
        var class_student = assignment_agreement.arr_class_student[index_class_student]
        set_is_student_online_selected(class_student.is_online)
        if(data_index.arr_assignment_agreement[index_assignment].arr_class_student[index_class_student].last_assignment_submitted != null){
            
            var last_submitted = data_index.arr_assignment_agreement[index_assignment].arr_class_student[index_class_student].last_assignment_submitted
            
            if(last_submitted.assessment_status.data !== 'done'){
                
                if(status === 'done'){
                    set_activity_subject_selected(data_index.subject.id)
                    set_class_student_id(class_student.id)
                    if(class_student.last_assignment_submitted != null){
                        set_assignment_submitted_id(class_student.last_assignment_submitted.id)
                        set_assignment_status_data(class_student.last_assignment_submitted.assessment_status.data)
                    }
                    if(assignment_agreement.data_type === 'assignment'){
                        set_activity_type_selected(assignment_agreement.assignment_type.data)
                        set_activity_assessment_rule_selected(assignment_agreement.assessment_rule_id)
                    }
                    else if(assignment_agreement.data_type === 'task'){
                        set_activity_type_selected((assignment_agreement.type === 'presentation' ? 'discussion' : 'upload'))
                        set_activity_assessment_rule_selected(assignment_agreement.project_agreement.assessment_rule_id)
                    }
                    set_status_activity_selected(status)
                }
                else{
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
        else{
            if(status === 'done'){
                set_activity_subject_selected(data_index.subject.id)
                set_class_student_id(class_student.id)
                set_selected_student_id(class_student.user_id)
                // if(class_student.last_assignment_submitted != null){
                //     set_assignment_submitted_id(class_student.last_assignment_submitted.id)
                //     set_assignment_status_data(class_student.last_assignment_submitted.assessment_status.data)
                // }
                set_selected_agreement_id(assignment_agreement.id)
                if(assignment_agreement.data_type === 'assignment'){
                    set_activity_type_selected(assignment_agreement.assignment_type.data)
                    set_activity_assessment_rule_selected(assignment_agreement.assessment_rule_id)
                }
                else if(assignment_agreement.data_type === 'task'){
                    set_activity_type_selected((assignment_agreement.type === 'presentation' ? 'discussion' : 'upload'))
                    set_activity_assessment_rule_selected(assignment_agreement.project_agreement.assessment_rule_id)
                }
            }
            else{
                var url = '/assessment/assignment'
                var data_upload = {
                    status : status,
                }

                if(assignment_agreement.data_type === 'task'){
                    data_upload.task_agreement = {id : assignment_agreement.id}
                }
                else{
                    data_upload.assignment_agreement = {id : assignment_agreement.id}
                }

                data_upload.user_id = class_student.user_id
        
                var response = await base.request(url, 'post', data_upload)
                if(response != null){
                    if(response.status == 'success'){
                        // window.location.reload()
                        filterBtn()
                        base.$('#modalSubmit').modal('hide')
                    }
                }
            }
        }
    }

    async function changeInputModal(val, type){
        if(type === 'grade'){
            set_activity_rule_selected(val)
        }
        if(type === 'notes'){
            set_teacher_notes(val)
        }
    }

    async function submitGrading(){
        set_is_modal_btn_disable(true)
        var url = ''
        var data_upload = {}
        var method = 'put'
        var flag = 1

        if(activity_type_selected === 'quiz'){
            url = '/assessment/assignment'
            data_upload = {
                id : assignment_submitted_id,
                comment : teacher_notes,
            }

            if(assignment_submitted_id !== ''){
                data_upload.id = assignment_submitted_id
            }
            else{
                method = 'post'
                data_upload.assignment_agreement = {id : selected_agreement_id}
                data_upload.user_id = selected_student_id
            }

            var status = ''

            if(!is_student_online_selected){
                status = 'done'
            }
            else{
                if(radio_project_selected === 'major_revision'){
                    status = 'need_much_correction'
                }
                else if(radio_project_selected === 'minor_revision'){
                    status = 'need_correction'
                }
                else{
                    status = 'done'
                }
            }

            if(status_activity_selected !== ''){
                status = status_activity_selected
            }


            data_upload.status = status

            if(rule === 'Numerical'){
                data_upload.score = numerical_score
            }
            else{
                if(activity_rule_selected !== ''){
                    data_upload.assessment_rule_detail = {id : activity_rule_selected}
                }
            }
        }
        else  if(activity_type_selected === 'ungraded'){
            url = '/assessment/assignment'
            data_upload = {}
            if(assignment_submitted_id !== ''){
                data_upload.id = assignment_submitted_id
            }
            else{
                method = 'post'
                data_upload.assignment_agreement = {id : selected_agreement_id}
                data_upload.user_id = selected_student_id
            }
        }
        else if(activity_type_selected === 'discussion'){
            var arr_skill = []
            for(var x in grade_skill_arr){
                var skill_data = grade_skill_arr[x].arr_skill
                for(var y in skill_data){
                    arr_skill.push({
                        skill : {id : skill_data[y].id},
                        score : skill_data[y].score
                    })
                }
            }

            for(var x in arr_skill){
                if(arr_skill[x].score === ''){
                    flag = 0
                    break
                }
            }

            if(teacher_notes === ''){
                flag = 0
            }

            url = '/grade/skill'
            data_upload = {
                class_student : {id : class_student_id},
                comment : teacher_notes,
                arr_skill : arr_skill
            }

            if(assignment_submitted_id !== ''){
                data_upload.assignment_submitted = {id : assignment_submitted_id}
            }
            else{
                data_upload.task_agreement = {id : selected_agreement_id}
            }
            
            method = 'post'
        }
        else if(activity_type_selected === 'upload'){
            url = '/assessment/assignment'
            
            var status = status_activity_selected

            if(!is_student_online_selected){
                status = 'done'
            }
            else{
                if(radio_project_selected === 'major_revision'){
                    status = 'need_much_correction'
                }
                else if(radio_project_selected === 'minor_revision'){
                    status = 'need_correction'
                }
                else{
                    status = 'done'
                }
            }

            if(status_activity_selected !== ''){
                status = status_activity_selected
            }

            data_upload = {
                status : status,
                comment : teacher_notes,
            }

            if(assignment_submitted_id !== ''){
                data_upload.id = assignment_submitted_id
            }
            else{
                method = 'post'
                data_upload.assignment_agreement = {id : selected_agreement_id}
                data_upload.user_id = selected_student_id
            }
        }

        if(flag){
            var response = await base.request(url, method, data_upload)
            if(response != null){
                if(response.status == 'success'){
                    filterBtn()
                    base.$('#modalSubmit').modal('hide')
                }
            }
        }

        set_is_modal_btn_disable(false)
    }

    const [grade_skill_avg, set_grade_skill_avg] = useState(0)
    const [grade_skill_total_score, set_grade_skill_total_score] = useState(0)

    function changeScore(index, index_skill, val){
        var data_index = grade_skill_arr[index]
        var skill_data = data_index.arr_skill

        if(parseInt(val) <= 5 && parseInt(val) >= 1){
            skill_data[index_skill].score = val
        }
        else{
            skill_data[index_skill].score = ''
        }

        var avg = 0
        var total_score = 0
        var total_data = 0
        for(var x in grade_skill_arr){
            var arr_skill = grade_skill_arr[x].arr_skill
            for(var y in arr_skill){
                if(arr_skill[y].score !== ''){
                    total_score += parseInt(arr_skill[y].score)
                }
            }
            total_data += arr_skill.length
        }
        
        avg = total_score / total_data
        set_grade_skill_avg(parseFloat(avg).toFixed(2))
        set_grade_skill_total_score((parseFloat(avg) / 5) * 100)
        base.update_array(grade_skill_arr, set_grade_skill_arr, data_index, index)
    }

    function changeNumerical(value){
        var indexValue = value.length - 1
        var score = numerical_score
        if(value.charCodeAt(indexValue) >= 48 && value.charCodeAt(indexValue) <= 57){
            score = value
        }
        else if((indexValue < 0)){
            score = ''
        }
        if(parseInt(value) > 100){
            score = 100
        }
        set_numerical_score(score)
    }

    function changeRadioProject(value){
        set_radio_project_selected(value)
    }

    const [allSubmit_activity_selected, set_allSubmit_activity_selected] = useState({id : '', arr_class_student : []})
    const [disable_all_btn, set_disable_all_btn] = useState(false)

    function doneAll(index, index_assignment){
        set_allSubmit_activity_selected(data_arr[index].arr_assignment_agreement[index_assignment])
        base.$('#modalSubmitAll').modal('show')
    }

    async function okAll(){
        set_disable_all_btn(true)
        var url = '/assessment/assignment'
        var data_upload = {}
        var method = 'post'
        var flag = 1

        var class_student = allSubmit_activity_selected.arr_class_student
        
        for(var x in class_student){
            if(class_student[x].last_assignment_submitted != null){
                method = 'put'
                data_upload.id = class_student[x].last_assignment_submitted.id
            }
            else{
                method = 'post'
                data_upload.assignment_agreement = {id : allSubmit_activity_selected.id}
                data_upload.user_id = class_student[x].user_id
            }
            data_upload.status = 'done'
            
            var response = await base.request(url, method, data_upload)
            if(response != null){
                if(response.status == 'success'){
                    if(x == class_student.length-1){
                        filterBtn()
                        set_disable_all_btn(false)
                        base.$('#modalSubmitAll').modal('hide')
                        base.$('#modalSubmit').modal('hide')
                    }
                }
                else{
                    set_disable_all_btn(false)
                }
            }
            else{
                set_disable_all_btn(false)
            }
        }
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Subject & Lesson Plan'} user_data={user_data} />
            </div>
            

            <div className='col-12 mt-5 pt-4'>
                {
                    filter_grade_arr.length > 0 ?
                        <div className='row mx-0 mx-lg-3'>
                            <div className='col-12 bg-white rounded p-3'>
                                <div className='row'>
                                    <div className='col-12 col-lg'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <p className='m-0' style={{color : 'black'}}>Grade</p>
                                            </div>
                                            <div className='col-12 mt-1'>
                                            <div className='row'>
                                                {
                                                    filter_grade_arr.map((data, index)=>(
                                                        <div className='col-12 col-lg-6 mb-2' key={index}>
                                                            <div class="custom-control custom-radio">
                                                                <input type="radio" id={"grade_radio" + index} name="customRadio" class="custom-control-input" onChange={(e)=>changeFilter(index, 'grade')} checked={filter_class_selected === data.id} />
                                                                <label class="custom-control-label" htmlFor={"grade_radio" + index}>{data.name}</label>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='col-12 col-lg mt-2 mt-lg-0'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <p className='m-0' style={{color : 'black'}}>Subject</p>
                                            </div>
                                            <div className='col-12 mt-1'>
                                                <Select options={filter_subject_arr} value={filter_subject_selected} isMulti={true} onChange={(value)=>changeFilter(0, 'subject', value)} isOptionDisabled={()=>filter_subject_selected.length >= 2} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12 col-lg mt-2 mt-lg-0'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <p className='m-0' style={{color : 'black'}}>Lesson</p>
                                            </div>
                                            <div className='col-12 mt-1'>
                                                <Select options={filter_lesson_arr} value={filter_lesson_selected} isMulti={true} onChange={(value)=>changeFilter(0, 'lesson', value)} isOptionDisabled={()=>filter_lesson_selected.length >= 4} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12 col-lg-auto'>
                                        <button type='button' className='btn btn-primary rounded shadow-sm px-4 mt-4 w-100' onClick={()=>filterBtn()}>Filter</button>
                                    </div>
                                </div>
                            </div>

                            {
                                is_loading_data ? 
                                <>
                                <LoadingData />
                                </>
                                :
                                <>
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

                                    {
                                        data_arr.length > 0 ?
                                        <div className='col-12 mt-5 px-0 px-lg-3'>
                                            <div className='row'>
                                                {
                                                    data_arr.map((data, index)=>(
                                                        <div className={'col-12 col-lg-6 mb-3' + (index % 2 === 0 ? ' pl-3 pl-lg-0' : ' pr-3 pr-lg-0')} key={index}>
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
                                                                                            <div className='col-auto d-flex align-items-center pr-2'>
                                                                                                <h6 className='m-0'><i className={(data_assignment.icon) + " text-primary"} style={{fontSize : 18}}></i></h6>
                                                                                            </div>
                                                                                            <div className='col px-0 d-flex align-items-center'>
                                                                                                <h6 className='m-0'>{data_assignment.activity_name}</h6>
                                                                                            </div>
                                                                                            {
                                                                                                data_assignment.assignment_type != null &&
                                                                                                <>
                                                                                                    {
                                                                                                        data_assignment.assignment_type.data === 'ungraded' &&
                                                                                                        <>
                                                                                                        {
                                                                                                            !data_assignment.is_done ?
                                                                                                            <div className='col d-flex align-items-center p-0'>
                                                                                                                <button className='btn btn-sm btn-outline-primary rounded py-2' onClick={()=>doneAll(index, index_assignment)}>Ok All</button>
                                                                                                            </div>
                                                                                                            : <></>
                                                                                                        }
                                                                                                        </>
                                                                                                    }
                                                                                                </>
                                                                                            }
                                                                                            <div className='col pl-0'>
                                                                                                <div className='row'>
                                                                                                    <div className='col pr-2'>
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
                                                                                                                                                <div className='col-auto' style={{cursor : 'pointer'}} onClick={()=>changeStatus(index, index_assignment, index_class_student, index_status, index_arr_status)}>
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
                                        :
                                        <>
                                            {
                                                !is_loading_filter &&
                                                <div className='col-12 pt-5' style={{marginTop : '5rem'}}>
                                                    <NotAssigned />
                                                </div>
                                            }
                                        </>
                                    }
                                </>
                            }

                        </div>
                    :
                    <>
                        {
                            !is_loading &&
                            <div className='row'>
                                <div className='col-12 mt-5 pt-4'>
                                    <NotAssigned />
                                </div>
                            </div>
                        }
                    </>
                }
            </div>

            <ModalConfirm confirmLesson={()=>confirmLesson('modal')} is_disable_btn_modal={is_disable_btn_modal} />

            <ModalSubmit
                assignment_type={activity_type_selected}
                rule_detail_arr={rule_detail_arr}
                rule_selected={activity_rule_selected}
                changeInput={(val, type)=>changeInputModal(val, type)}
                submitGrading={()=>submitGrading()}
                is_modal_btn_disable={is_modal_btn_disable}
                grade_skill_arr={grade_skill_arr}
                changeScore={(index, index_skill, val)=>changeScore(index, index_skill, val)}
                rule={rule}
                numerical_score={numerical_score}
                changeNumerical={(value)=>changeNumerical(value)}
                assignment_status_data={assignment_status_data}
                teacher_notes={teacher_notes}
                set_radio_project={(value)=>changeRadioProject(value)}
                viewFrom={'subject-lesson'}
                is_student_online={is_student_online_selected}
                grade_skill_avg={grade_skill_avg}
                grade_skill_total_score={grade_skill_total_score}
            />
            
            <ModalSubmitAll okAll={()=>okAll()} disable_all_btn={disable_all_btn} />
        </div>
    )
}