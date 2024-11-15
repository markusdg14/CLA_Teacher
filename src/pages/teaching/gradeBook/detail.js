import { useEffect, useState, useMemo } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import Select from 'react-select'
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import ReportGrade from './reportGrade';
import ReportSkill from './reportSkill';
import ModalSubmit from '../checkAssignment/modalSubmit';
import ModalEditScore from './modalEditScore';
import LoadingData from '../../../components/loading';

import 'summernote'

export default function GradeBookDetail(){
    var base = new Base()

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_term : {id : ''}})
    const [header_menu_arr, set_header_menu_arr] = useState([
        {id : 'report_card_grade', title : 'Report Card Grade', is_selected : true},
        {id : 'report_card_skill', title : 'Report Card Skill', is_selected : false},
    ])
    const [header_selected, set_header_selected] = useState('report_card_grade')

    const [term_arr, set_term_arr] = useState([])
    const [term_selected, set_term_selected] = useState('')

    const [data_arr, set_data_arr] = useState([])

    const [lesson_arr, set_lesson_arr] = useState([])
    const [class_student, set_class_student] = useState([])
    const [assignment_agreement, set_assignment_agreement] = useState([])
    const [grade_book_arr, set_grade_book_arr] = useState({})

    const [student_arr, set_student_arr] = useState([])
    const [student_arr_temp, set_student_arr_temp] = useState([])
    const [skill_student_selected, set_skill_student_selected] = useState('')
    const [skill_student_name_selected, set_skill_student_name_selected] = useState('')
    const [skill_ctg_arr, set_skill_ctg_arr] = useState([])
    const [skill_list_arr, set_skill_list_arr] = useState([])
    const [skill_assignment, set_skill_assignment] = useState([])
    const [skill_grade_arr, set_skill_grade_arr] = useState([])
    const [skill_grade_book_arr, set_skill_grade_book_arr] = useState([])

    const [legend_arr, set_legend_arr] = useState([])

    const [edit_score_selected, set_edit_score_selected] = useState({id : '', score : '', comment : '', activity_type : ''})
    const [activity_assessment_rule_selected, set_activity_assessment_rule_selected] = useState('')
    const [activity_rule_selected, set_activity_rule_selected] = useState('')
    const [is_modal_btn_disable, set_is_modal_btn_disable] = useState(false)
    const [grade_skill_arr, set_grade_skill_arr] = useState([])
    const [rule, set_rule] = useState([])
    const [numerical_score, set_numerical_score] = useState('')
    const [assignment_status_data, set_assignment_status_data] = useState('')
    const [teacher_notes, set_teacher_notes] = useState('')
    const [rule_detail_arr, set_rule_detail_arr] = useState([])
    const [radio_project_selected, set_radio_project_selected] = useState('major_revision')
    const [class_student_id, set_class_student_id] = useState('')
    const [is_student_online_selected, set_is_student_online_selected] = useState(false)

    const [grade_skill_avg, set_grade_skill_avg] = useState(0)
    const [grade_skill_total_score, set_grade_skill_total_score] = useState(0)

    const [is_loading_data, set_is_loading_data] = useState(true)

    const [edit_type, set_edit_type] = useState('')

    const [grade_book_selected, set_grade_book_selected] = useState({id : '', comment : ''})

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)

        base.$('#modalSubmit').on('hidden.bs.modal', function (event) {
            set_edit_score_selected({id : '', score : '', comment : '', activity_type : ''})
        })

        if(query.get('tab') != null){
            for(var x in header_menu_arr){
                header_menu_arr[x].is_selected = false
                if(header_menu_arr[x].id === query.get('tab')){
                    header_menu_arr[x].is_selected = true
                    break
                }
            }
            set_header_selected(query.get('tab'))
        }
        if(query.get('student_id') != null){
            set_skill_student_selected(query.get('student_id'))
        }

        if(query.get('term_id') != null){
            set_term_selected(query.get('term_id'))
        }

        base.$('#modalEditNotes').on('hidden.bs.modal', function (event) {
            set_grade_book_selected({id : '', comment : ''})
            base.$('#summernote').summernote('destroy');
        })


    }, [])

    useEffect(()=>{
        if(user_data.id !== ''){
            get_term()
            set_term_selected(user_data.current_term.id)
        }
    }, [user_data])

    async function get_term(){
        var url = '/term'

        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                set_term_arr(data)
            }
        }
    }

    useEffect(()=>{
        if(header_selected === 'report_card_skill'){
            get_legend()
        }
        get_term()
    }, [header_selected])

    useEffect(()=>{
        if(term_selected !== ''){
            get_student()
            if(header_selected === 'report_card_skill'){
                if(skill_student_selected !== ''){
                    // get_data()
                    filterStudent()
                }
            }
            else if(header_selected === 'report_card_grade'){
                get_data()
            }
        }
    }, [term_selected, skill_student_selected, header_selected])

    async function get_student(){
        var url = '/grade/book/report-card?subject_id=' + query.get('subject_id') + '&grade_id=' + query.get('grade_id') + '&term_id=' + term_selected
        var response = await base.request(url)

        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                
                var class_student = data.arr_class_student
                var arr_student = []
                for(var x in class_student){
                    arr_student.push(class_student[x].user)
                }
                
                set_student_arr(arr_student)
            }
        }
    }

    async function get_data(){
        var url = ''
        if(header_selected === 'report_card_grade'){
            url = '/grade/book/report-card?subject_id=' + query.get('subject_id') + '&grade_id=' + query.get('grade_id') + '&term_id=' + term_selected
        }
        else if(header_selected === 'report_card_skill'){
            url = '/grade/book/report-card/skill?subject_id=' + query.get('subject_id') + '&grade_id=' + query.get('grade_id') + '&term_id=' + term_selected + '&user_id=' + skill_student_selected
        }
        var response = await base.request(url)

        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                
                if(header_selected === 'report_card_grade'){
                    set_class_student(data.arr_class_student)
                    set_assignment_agreement(data.arr_assignment_agreement.data)
                    set_grade_book_arr(data.arr_grade_book_detail)
                    
                    var class_student = data.arr_class_student
                    var arr_student = []
                    for(var x in class_student){
                        arr_student.push(class_student[x].user)
                    }
                    
                    set_student_arr(arr_student)
                }
                else {
                    set_skill_assignment(data.arr_assignment.data)
                    set_skill_list_arr(data.arr_skill)
                    set_skill_ctg_arr(data.arr_skill_category)
                    set_skill_grade_arr(data.arr_grade_skill)

                    var assignment = data.arr_assignment.data
                    var grade_book_skill = data.arr_grade_book_skill
                    // for(var x in assignment){
                    //     grade_book_skill[assignment[x].id].total_score = (grade_book_skill[assignment[x].id].average / 5) * 100

                    //     grade_book_skill[assignment[x].id].total_score = parseFloat(grade_book_skill[assignment[x].id].total_score).toFixed(2)
                    // }
                    set_skill_grade_book_arr(grade_book_skill)
                }

                setTimeout(() => {
                    set_is_loading_data(false)
                }, 1000);
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

    function changeStudent(value){
        set_skill_student_selected(value)
    }

    function filterStudent(){
        set_is_loading_data(true)
        if(skill_student_selected !== ''){
            for(var x in student_arr){
                if(student_arr[x].id === skill_student_selected){
                    set_skill_student_name_selected(student_arr[x].name)
                }
            }
            get_data()

            var url = '/grade-book/detail?subject_id=' + query.get('subject_id') + '&grade_id=' + query.get('grade_id') + '&tab=' + header_selected + '&student_id=' + skill_student_selected

            if(term_selected != ''){
                url += '&term_id=' + term_selected
            }

            window.history.pushState({}, null, url)
        }
    }

    function changeMenu(index){
        var data_index = header_menu_arr[index]
        var initSelected = data_index.is_selected
        for(var x in header_menu_arr){
            header_menu_arr[x].is_selected = false
        }
        header_menu_arr[index].is_selected = true
        base.update_array(header_menu_arr, set_header_menu_arr, data_index, index)

        if(header_menu_arr[index].is_selected){
            set_header_selected(header_menu_arr[index].id)
            window.history.pushState({}, null, '/grade-book/detail?subject_id=' + query.get('subject_id') + '&grade_id=' + query.get('grade_id') + '&tab=' + header_menu_arr[index].id)
        }
    }

    function backBtn(){
        window.location.replace('/grade-book')
    }

    function changeTerm(val){
        set_term_selected(val)
        window.history.pushState({}, null, '/grade-book/detail?subject_id=' + query.get('subject_id') + '&grade_id=' + query.get('grade_id') + '&tab=' + header_selected + '&student_id=' + skill_student_selected + '&term_id=' + val)
    }

    useEffect(async ()=>{
        if(edit_score_selected.id != ''){
            get_rule()
            get_rule()
            set_grade_skill_avg(0)
            set_grade_skill_total_score(0)

            if(edit_score_selected === 'discussion'){
                get_grade_skill()
            }
            base.$('#modalSubmit').modal('show')
        }
    }, [edit_score_selected])

    async function editScore(index, index_agreement){
        var data = grade_book_arr[class_student[index].id][assignment_agreement[index_agreement].id]
        data.activity_type = 'quiz'

        set_activity_assessment_rule_selected(assignment_agreement[index_agreement].assessment_rule_id)
        set_numerical_score(data.score)

        set_class_student_id(class_student[index].id)
        
        set_is_student_online_selected(class_student[index].is_online)
        set_edit_score_selected(data)
        
    }

    async function get_grade_skill(){
        var url = '/skill/category?id=&subject_id=' + query.get('subject_id') + '&assignment_submitted_id=' + edit_score_selected.id + '&grade_id=' + query.get('grade_id')
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

        if(edit_score_selected.activity_type === 'quiz'){
            url = '/assessment/assignment'
            data_upload = {
                id : edit_score_selected.id,
                comment : teacher_notes,
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
        else  if(edit_score_selected.activity_type === 'ungraded'){
            url = '/assessment/assignment'
            data_upload = {
                id : edit_score_selected.id,
            }
        }
        else if(edit_score_selected.activity_type === 'discussion'){
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
                assignment_submitted : {id : edit_score_selected.id},
                comment : teacher_notes,
                arr_skill : arr_skill
            }
            method = 'post'
        }
        else if(edit_score_selected.activity_type === 'upload'){
            url = '/assessment/assignment'
            
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

            data_upload = {
                id : edit_score_selected,
                status : status,
                comment : teacher_notes,
            }
        }

        if(flag){
            var response = await base.request(url, method, data_upload)
            if(response != null){
                if(response.status == 'success'){
                    window.location.reload()
                }
            }
        }

        set_is_modal_btn_disable(false)
    }

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
                    total_score += parseFloat(arr_skill[y].score)
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

    const [grade_skill_selected, set_grade_skill_selected] = useState({id : '', score : '', project_skill : {skill : {name : '', skill_category : {name : ''}}}})

    useEffect(async ()=>{
        if(grade_skill_selected.id != ''){
            if(edit_type === 'score'){
                base.$('#modalEditScore').modal('show')
            }
        }
        if(grade_book_selected.id != ''){
            if(edit_type === 'notes'){
                const summernote = base.$('#summernote')
                summernote.summernote({
                    height : 200,
                    callbacks: {
                        onChange: function(contents, $editable) {
                          changeNotes(contents)
                        }
                    }
                })
                base.$('#modalEditNotes').modal('show')
            }
        }
    }, [grade_skill_selected, edit_type, grade_book_selected])

    function editSkillScore(index_category, index_list, index_assignment){
        var data_grade_skill = skill_grade_arr[skill_ctg_arr[index_category].id][skill_list_arr[index_list].id][skill_assignment[index_assignment].id]

        set_edit_type('score')
        set_grade_skill_selected(data_grade_skill)
    }

    function changeGradeSkillScore(value){
        var score = ''
        if(parseInt(value) <= 5 && parseInt(value) >= 1){
            score = value
        }
        else{
            score = ''
        }
        base.update_object(grade_skill_selected, set_grade_skill_selected, score, 'score')
    }

    function changeNotes(value){
        base.update_object(grade_book_selected, set_grade_book_selected, value, 'comment')
    }

    async function submitGradeSkillNew(){
        if(grade_skill_selected.score != ''){
            var url = '/grade/skill'
    
            var response = await base.request(url, 'put', grade_skill_selected)
            if(response != null){
                if(response.status == 'success'){
                    window.location.reload()
                }
            }
        }
    }

    async function submitNotesNew(){
        if(grade_book_selected.comment != ''){
            var url = '/grade/skill/notes'
            grade_book_selected.notes = grade_book_selected.comment    
            var response = await base.request(url, 'put', grade_book_selected)
            if(response != null){
                if(response.status == 'success'){
                    window.location.reload()
                }
            }
        }
    }

    async function editNotes(index_assignment){
        set_edit_type('notes')
        set_grade_book_selected(skill_grade_book_arr[skill_assignment[index_assignment].id].grade_book)
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Grade Book'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                    <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
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
                    header_selected === 'report_card_grade' ?
                    <>
                    <div className='row'>
                        {
                            is_loading_data ?
                            <LoadingData />
                            :
                            <div className='col-12'>
                                <ReportGrade
                                    class_student={class_student}
                                    assignment_agreement={assignment_agreement}
                                    grade_book_arr={grade_book_arr}
                                    term_arr={term_arr}
                                    term_selected={term_selected}
                                    changeTerm={(val)=>changeTerm(val)}
                                    editScore={(index, index_agreement)=>editScore(index, index_agreement)}
                                />
                            </div>
                        }
                    </div>
                    </>
                    :
                    <>
                    <ReportSkill
                        student_arr={student_arr}
                        student_arr_temp={student_arr_temp}
                        skill_student_selected={skill_student_selected}
                        skill_student_name_selected={skill_student_name_selected}
                        skill_ctg_arr={skill_ctg_arr}
                        skill_list_arr={skill_list_arr}
                        skill_assignment={skill_assignment}
                        skill_grade_arr={skill_grade_arr}
                        legend_arr={legend_arr}
                        changeStudent={(val)=>changeStudent(val)}
                        filterBtn={()=>filterStudent()}
                        term_arr={term_arr}
                        term_selected={term_selected}
                        changeTerm={(val)=>changeTerm(val)}
                        skill_grade_book_arr={skill_grade_book_arr}
                        editSkillScore={(index_category, index_list, index_assignment)=>editSkillScore(index_category, index_list, index_assignment)}
                        is_loading_data={is_loading_data}
                        editNotes={(index_assignment)=>editNotes(index_assignment)}
                    />
                    </>
                }
            </div>


            <ModalSubmit
                assignment_type={edit_score_selected.activity_type}
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

            <ModalEditScore grade_skill_selected={grade_skill_selected} changeGradeSkillScore={(value)=>changeGradeSkillScore(value)} submitGradeSkillNew={()=>submitGradeSkillNew()} submitNotesNew={()=>submitNotesNew()} grade_book_selected={grade_book_selected} changeNotes={(value)=>changeNotes(value)} />
            
        </div>
    )
}