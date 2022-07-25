import { useEffect, useState, useMemo, useRef } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import Select from 'react-select'
import SelectOption from '../../../components/selectOption';
import WebViewer from '@pdftron/webviewer'
import ModalSubmit from './modalSubmit';

export default function CheckAssignmentDetail(){
    var base = new Base()
    const viewerDiv = useRef(null)

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : ''}})
    const [assignment_submitted_id, set_assignment_submitted_id] = useState('')
    const [assignment_type, set_assignment_type] = useState('')

    const [activity_type, set_activity_type] = useState('')

    const [assignment_info_arr, set_assignment_info_arr] = useState([])
    const [student_data, set_student_data] = useState({id : '', name : '', image_display : base.img_no_profile})
    const [assignment_status, set_assignment_status] = useState('')
    const [assignment_status_data, set_assignment_status_data] = useState('')
    const [assignment_grade, set_assignment_grade] = useState('')
    const [grade, set_grade] = useState('')
    const [rule_id, set_rule_id] = useState('')
    const [rule, set_rule] = useState('')
    const [rule_detail_arr, set_rule_detail_arr] = useState([])
    const [rule_selected, set_rule_selected] = useState('')
    const [teacher_notes, set_teacher_notes] = useState('')

    const [grade_arr, set_grade_arr] = useState([])
    const [grade_selected, set_grade_selected] = useState('')

    const [subject_arr, set_subject_arr] = useState([])
    const [subject_selected, set_subject_selected] = useState('')

    const [list_check_assignment_arr, set_list_check_assignment_arr] = useState([])

    const [is_loading_list, set_is_loading_list] = useState(false)
    const [is_filter, set_is_filter] = useState(false)

    const [baseFile, set_baseFile] = useState('')
    
    const [is_modal_btn_disable, set_is_modal_btn_disable] = useState(false)
    const [grade_skill_arr, set_grade_skill_arr] = useState([])

    const [assignment_agreement_id, set_assignment_agreement_id] = useState('')
    const [subject_id, set_subject_id] = useState('')
    const [class_student_id, set_class_student_id] = useState('')
    const [project_id, set_project_id] = useState('')

    const [total_file, set_total_file] = useState(0)

    const [numerical_score, set_numerical_score] = useState('')

    const [student_submission, set_student_submission] = useState('')

    const [radio_project_selected, set_radio_project_selected] = useState('major_revision')

    const [pdf_blob, set_pdf_blob] = useState(null)

    const [is_student_online, set_is_student_online] = useState(false)

    const [grade_skill_avg, set_grade_skill_avg] = useState(0)
    const [grade_skill_total_score, set_grade_skill_total_score] = useState(0)
    const [chat_id, set_chat_id] = useState('')

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(async ()=>{
        if(user_data.id !== ''){
            get_data()
            get_filter_data_arr('grade')
        }
    }, [user_data])

    useEffect(async ()=>{
        if(grade_selected != ''){
            get_filter_data_arr('subject', grade_selected)
        }
    }, [grade_selected])

    useEffect(async ()=>{
        // console.log('123change')
        // if(baseFile !== ''){
        //     get_grade_skill()
        //     if(assignment_type === 'discussion'){
        //         get_grade_skill()
        //     }
        //     base.$('#modalSubmit').modal('show')
        // }
    }, [baseFile])

    useEffect(async ()=>{
        if(rule_id !== ''){
            get_rule()
        }
    }, [rule_id])

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

                set_assignment_submitted_id(data.id)
                set_student_data(data.user)

                set_class_student_id(data.class_student.id)

                set_assignment_status(data.assessment_status.name)
                set_assignment_status_data(data.assessment_status.data)

                set_is_student_online(data.user.current_class_student.is_online)

                data.assignment_score = '-'

                var activity_type1 = 'assignment'

                var avg = 0
                var total_score = 0
                var total_data = 0
                
                if(data.assignment_agreement != null){
                    set_grade(data.assignment_agreement.assignment_group.grade.name)
                    set_subject_id(data.assignment_agreement.assignment_group.subject.id)
                    set_subject_selected(data.assignment_agreement.assignment_group.subject.id)
                    set_grade_selected(data.assignment_agreement.assignment_group.grade.id)
                    set_assignment_agreement_id(data.assignment_agreement.id)
                    set_assignment_type(data.assignment_agreement.assignment_type.data)
                    // set_assignment_type('discussion')

                    if(data.assignment_agreement.assignment_type.data === 'discussion'){
                        data.assignment_score = 'Graded'
                        if(data.assessment_status.data === 'done'){
                            var skill_category = data.arr_skill_category
                            var notes = ''
                            for(var x in skill_category){
                                var skill = skill_category[x].arr_skill
                                for(var y in skill){
                                    skill[y].score = skill[y].grade_skill.score
                                    total_score += parseInt(skill[y].grade_skill.score)
                                }
                                total_data += skill.length
                            }
                            notes = skill_category[0].arr_skill[0].grade_skill.comment
                            set_grade_skill_arr(skill_category)
                            set_teacher_notes(notes)

                            avg = total_score / total_data
                            set_grade_skill_avg(parseFloat(avg).toFixed(2))
                            set_grade_skill_total_score((parseFloat(avg) / 5) * 100)

                            console.log(skill_category)
                        }
                    }
                    else{
                        if(data.assessment_rule_detail != null)
                            data.assignment_score = data.assessment_rule_detail.name
    
                        if(data.score != null){
                            data.assignment_score = 'N/A'
                        }
                    }

                    set_assignment_info_arr([
                        {title : 'Student Name', value : data.user.name}, {title : 'Grade', value : data.assignment_agreement.assignment_group.grade.name},
                        {title : 'Subject', value : data.assignment_agreement.assignment_group.subject.name}, {title : 'Lesson', value : data.assignment_agreement.assignment_group.lesson.name},
                        {title : 'Activity Title', value : data.assignment_agreement.name}, {title : 'Date Submitted', value : submitted_date_format}, ,
                    ])
    
                    set_rule_id(data.assignment_agreement.assessment_rule_id)
                }
                else if(data.task_agreement != null){
                    activity_type1 = 'task'
                    set_assignment_info_arr([
                        {title : 'Student Name', value : data.user.name}, {title : 'Grade', value : data.task_agreement.project_agreement.grade.name},
                        {title : 'Subject', value : data.task_agreement.project_agreement.subject.name},
                        {title : 'Project Title', value : data.task_agreement.title + ' - ' + data.task_agreement.project_agreement.name}, {title : 'Date Submitted', value : submitted_date_format}, ,
                    ])

                    set_subject_id(data.task_agreement.project_agreement.subject.id)
                    set_subject_selected(data.task_agreement.project_agreement.subject.id)
                    set_grade_selected(data.task_agreement.project_agreement.grade.id)

                    if(data.task_agreement.type === 'presentation'){
                        set_assignment_type('discussion')
                        if(data.assessment_status.data === 'done'){
                            var skill_category = data.arr_skill_category
                            var notes = ''
                            console.log(skill_category)
                            for(var x in skill_category){
                                var skill = skill_category[x].arr_skill
                                for(var y in skill){
                                    skill[y].score = skill[y].grade_skill.score
                                    total_score += parseInt(skill[y].grade_skill.score)
                                }
                                total_data += skill.length
                            }
                            notes = skill_category[0].arr_skill[0].grade_skill.comment
                            set_grade_skill_arr(skill_category)
                            set_teacher_notes(notes)

                            avg = total_score / total_data
                            set_grade_skill_avg(parseFloat(avg).toFixed(2))
                            set_grade_skill_total_score((parseFloat(avg) / 5) * 100)

                        }
                    }
                    else {
                        set_assignment_type('upload')
                    }

                    if(data.assessment_status.data === 'done'){
                        data.assignment_score = 'Graded'
                    }
                }

                get_list()

                set_activity_type(activity_type1)

                set_assignment_grade(data.assignment_score)

                set_student_submission(data.description)
                set_chat_id(data.chat.id)

                
                if(data.file_submitted.length > 0){
                    var file = data.file_submitted[0].file_name
    
                    if(data.file_name != null){
                        file = data.file_name
                    }
                    WebViewer({
                        path : '/lib', initialDoc : base.url_photo('assignment/submitted', file),
                    }, viewerDiv.current).then((instance) => {
                        const {documentViewer} = instance.Core
                        const annotManager = documentViewer.getAnnotationManager();

                        documentViewer.addEventListener('documentLoaded', async ()=>{
                            const doc = documentViewer.getDocument()
                            const xfdfString = await annotManager.exportAnnotations()
                            const options = { xfdfString };
                            const data = await doc.getFileData(options);
                            const arr = new Uint8Array(data);
                            const blob = new Blob([arr], { type: 'application/pdf' });

                            // set_pdf_blob(blob)
                            await getBaseData(blob, (result)=>{
                                set_baseFile(result)
                            })
                        })

                        documentViewer.addEventListener('mouseLeave', async ()=>{
                            const doc = documentViewer.getDocument()
                            const xfdfString = await annotManager.exportAnnotations()
                            const options = { xfdfString };
                            const data = await doc.getFileData(options);
                            const arr = new Uint8Array(data);
                            const blob = new Blob([arr], { type: 'application/pdf' });

                            // set_pdf_blob(blob)
                            await getBaseData(blob, (result)=>{
                                set_baseFile(result)
                            })
                        })


                        // if(data.assessment_status.data != 'done'){
                        //     instance.UI.setHeaderItems(header => {
                        //         header.push({
                        //           type: 'actionButton',
                        //           img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
                        //           onClick: async () => {
                        //             const doc = documentViewer.getDocument()
                        //             const xfdfString = await annotManager.exportAnnotations();
                        //             const options = { xfdfString };
                        //             const data = await doc.getFileData(options);
                        //             const arr = new Uint8Array(data);
                        //             const blob = new Blob([arr], { type: 'application/pdf' });
    
                        //             await getBaseData(blob, (result)=>{
                        //                 set_baseFile(result)
                        //             })
                        //           }
                        //         });
                        //     })
                        // }
                    })
                }

                set_total_file(data.file_submitted.length)
            }
        }
    }

    async function get_grade_skill(){
        var url = '/skill/category?id=&subject_id=' + subject_id + '&assignment_submitted_id=' + assignment_submitted_id
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
        var url = '/assessment/rule?id=' + rule_id
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                set_rule(data.name)
                set_rule_detail_arr(data.detail)
            }
        }
    }

    function getBaseData(file, callback){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    function backBtn(){
        window.location.href = '/check-activity'
    }

    function filterBtn(){
        get_list()
    }

    async function get_filter_data_arr(type, id=''){
        var url = ''
        if(type === 'grade'){
            url = '/class/homeroom?type=current_academic_year'
        }
        else{
            url = '/subject?grade_id=' + id
        }
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                if(type === 'grade'){
                    var data1 = data.data
                    for(var x in data1){
                        data1[x].name = data1[x].grade_name + '' + data1[x].name
                    }
                    set_grade_arr(data1)
                }
                else if(type === 'subject'){
                    set_subject_arr(data.data)
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
            console.log(val)
            var grade = grade_arr
            var grade_id = ''
            for(var x in grade){
                if(grade[x].id === val){
                    grade_id = grade[x].grade.id
                }
            }
            set_grade_selected(grade_id)
        }
        else if(type === 'subject'){
            set_subject_selected(val)
        }
    }

    function viewDetail(index){
        window.location.href = '/check-assignment/detail?id=' + list_check_assignment_arr[index].id
    }
    
    function changeInputModal(val, type){
        if(type === 'grade'){
            set_rule_selected(val)
        }
        if(type === 'notes'){
            set_teacher_notes(val)
        }
    }

    async function get_basePdf(){
        await getBaseData(pdf_blob, (result)=>{
            set_baseFile(result)
        })
    }

    async function submitGrading(){
        set_is_modal_btn_disable(true)
        var url = ''
        var data_upload = {}
        var method = 'put'

        var flag = 1
        
        if(assignment_type === 'quiz'){
            url = '/assessment/assignment'
            data_upload = {
                id : assignment_submitted_id,
                comment : teacher_notes,
                file : {
                    file : baseFile,
                    file_name : assignment_submitted_id + '.pdf'
                }
            }

            var status = ''

            if(!is_student_online){
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
                if(numerical_score === ''){
                    flag = 0
                }
            }
            else{
                if(rule_selected !== ''){
                    data_upload.assessment_rule_detail = {id : rule_selected}
                }
                else{
                    flag = 0
                }
            }

            console.log(data_upload)
        }
        else  if(assignment_type === 'ungraded'){
            url = '/assessment/assignment'
            data_upload = {
                id : assignment_submitted_id,
            }
        }
        else if(assignment_type === 'discussion'){
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
                assignment_submitted : {id : assignment_submitted_id},
                comment : teacher_notes,
                arr_skill : arr_skill
            }
            method = 'post'
        }
        else if(assignment_type === 'upload'){
            url = '/assessment/assignment'
            
            var status = ''

            if(!is_student_online){
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
                id : assignment_submitted_id,
                status : status,
                comment : teacher_notes,
                file : {
                    file : baseFile,
                    file_name : assignment_submitted_id + '.pdf'
                }
            }
        }

        if(flag){
            var response = await base.request(url, method, data_upload)
            if(response != null){
                if(response.status == 'success'){
                    window.location.href = '/check-activity'
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

    function modalSubmit(){
        get_grade_skill()
        set_grade_skill_avg(0)
        set_grade_skill_total_score(0)
        base.$('#modalSubmit').modal('show')
    }

    function viewGradeSkill(){
        // get_grade_skill()
        base.$('#modalSubmit').modal('show')
    }

    function changeRadioProject(value){
        set_radio_project_selected(value)
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Check Activity'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                    <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                </div>
            </div>

            <div className='col-12 mt-5'>
                <div className='row m-0'>
                    <div className='col-12 col-lg-3'>
                        <div className='h-100 row p-0 pr-0 pr-lg-4'>
                            <div className='col-12 p-4 bg-white rounded shadow-sm mb-2'>
                                <p className='m-0 text-primary'>Score Grade</p>
                                
                                {
                                    assignment_type !== 'discussion' ?
                                    <h4 className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{assignment_grade === '' ? '-' : assignment_grade}</h4>
                                    :
                                    <p className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{assignment_grade === '' ? '-' : assignment_grade}</p>
                                }

                                {
                                    assignment_status_data === 'done' && assignment_type === 'discussion' &&
                                    <button className='btn btn-primary rounded shadow-sm mt-2' onClick={()=>viewGradeSkill()}>View More</button>
                                }

                            </div>
                            <div className='col-12 p-4 bg-white rounded shadow-sm mt-2'>
                                <p className='m-0 text-primary'>Activity Status</p>
                                <p className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{assignment_status}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg-9 bg-white rounded shadow-sm p-4 d-flex align-items-center mt-3 mt-lg-0'>
                        <div className='row'>
                            <div className='col-12 pr-5 d-block d-lg-none mb-3'>
                                <img src={student_data.image_display} style={{height : '7rem', width : '7rem', aspectRatio : 1, borderRadius : '7rem'}} />
                            </div>
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
                            <div className='col-auto pr-5 d-none d-lg-block'>
                                <img src={student_data.image_display} style={{height : '7rem', width : '7rem', aspectRatio : 1, borderRadius : '7rem'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-12 mt-3 text-right'>
                {/* <button className='btn btn-primary shadow-sm rounded px-5 py-2' onClick={()=>modalSubmit()}>Chat with student</button> */}
                <a href={'/check-activity/chat?id=' + query.get('id') + '&chat_id=' + chat_id + '&type=' + activity_type} className='btn btn-sm btn-primary py-2 px-3 rounded'>Chat with Student
                    {/* <span className='position-absolute' style={{top : '-.5rem', right : '.75rem'}}><i className="fas fa-circle" style={{color : '#FF6262'}}></i></span> */}
                </a>
            </div>

            {
                assignment_type === 'ungraded' ?
                <>
                    <div className='col-12 mt-5 text-center'>
                        <div className="card rounded shadow-sm">
                            <div className={"card-body p-5"}>
                                <div className='row'>
                                    <div className='col-12'>
                                        <img src={base.img_study_2} style={{height : '20rem'}} />
                                    </div>
                                    {
                                        assignment_status_data !== 'done' &&
                                        <div className='col-12 pb-2'>
                                            <button className='btn btn-primary rounded px-5 py-2 shadow-sm' onClick={()=>modalSubmit()}>Confirm Submission</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={'col-12 mt-5 ' + (total_file > 0 ? 'd-block' : 'd-none')}>
                        <div className='weviewer' style={{height : '100vh'}} ref={viewerDiv}></div>
                    </div>
                    {
                        student_submission !== '' &&
                        <>
                            <div className='col-12 mt-5'>
                                <div className="card rounded shadow-sm">
                                    <div className={"card-body p-3 pt-4"}>
                                        <div className='row m-0'>
                                            <div className='col-12 pb-3'>
                                                <p className='m-0' style={{fontFamily : 'InterBold', fontSize : '1.25rem'}}>Student Submission</p>
                                                <div className='p-2 p-lg-3 border rounded mt-3'>
                                                    <p className='m-0'>{student_submission != null ? student_submission : '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {
                        assignment_status_data !== 'done' &&
                        <div className='col-12 mt-3 text-right'>
                            <button className='btn btn-primary shadow-sm rounded px-5 py-2' onClick={()=>modalSubmit()}>Grade</button>
                        </div>
                    }
                </>
            }

            <div className='col-12 mt-5' style={{borderTop : '1px solid #999999'}}>
                <div className='row'>
                    <div className='col-12 pt-4 pt-lg-5'>
                        <div className="card rounded shadow-sm">
                            <div className={"card-body p-0"}>
                                <div className={'row m-0'}>
                                    <div className='col-12 p-3 pt-4'>
                                        <div className='row m-0'>
                                            <div className='col-12 col-lg'>
                                                <label>Grade</label>
                                                <SelectOption data_arr={grade_arr} selected={grade_selected} title={'Grade'} changeInput={(value)=>changeFilter(value, 'grade')} />
                                            </div>
                                            <div className='col-12 col-lg mt-2 mt-lg-0'>
                                                <label>Subject</label>
                                                <SelectOption data_arr={subject_arr} selected={subject_selected} title={'Subject'} changeInput={(value)=>changeFilter(value, 'subject')} />
                                            </div>
                                            <div className='col d-flex align-items-end mt-3 mt-lg-0'>
                                                <button className='btn btn-primary rounded w-100' onClick={()=>filterBtn()}>Filter</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    {
                        list_check_assignment_arr.length > 0 &&
                        <div className='col-12 mt-3'>
                            <div className="card rounded shadow-sm">
                                <div className={"card-body p-0"}>
                                    <div className={'row m-0'}>
                                        <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                        <div className='col-12 p-3 py-4'>
                                            <div className='row m-0'>
                                                <div className='col-12 mb-3'>
                                                    <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>List Check Activity</h5>
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
                                                                                                    {
                                                                                                        data.assignment_agreement != null ?
                                                                                                        <p className='m-0'>{data.assignment_agreement.name} | {data.assignment_agreement.assignment_group.subject.name} | {data.assignment_agreement.assignment_group.lesson.name}</p>
                                                                                                        :
                                                                                                        data.task_agreement != null ?
                                                                                                        <p className='m-0'>{data.task_agreement.title} | {data.task_agreement.project_agreement.subject.name}</p>
                                                                                                        : <></>
                                                                                                    }
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
                    }
                </div>
            </div>


            <ModalSubmit
                assignment_type={assignment_type}
                rule_detail_arr={rule_detail_arr}
                rule_selected={rule_selected}
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
                viewFrom={'check-assignment'}
                is_student_online={is_student_online}
                grade_skill_avg={grade_skill_avg}
                grade_skill_total_score={grade_skill_total_score}
            />
            
        </div>
    )
}