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

    const [radio_project_selected, set_radio_project_selected] = useState('revision')

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
        if(baseFile !== ''){
            if(assignment_type === 'discussion'){
                get_grade_skill()
            }
            base.$('#modalSubmit').modal('show')
            // postPDF()
        }
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

                if(data.assessment_status.data === 'done'){
                    var skill_category = data.arr_skill_category
                    var notes = ''
                    for(var x in skill_category){
                        var skill = skill_category[x].arr_skill
                        for(var y in skill){
                            skill[y].score = skill[y].grade_skill.score
                        }
                    }
                    notes = skill_category[0].arr_skill[0].grade_skill.comment
                    set_grade_skill_arr(skill_category)
                    set_teacher_notes(notes)
                }

                data.assignment_score = '-'
                
                if(data.type === 'assignment'){
                    set_grade(data.assignment_agreement.assignment_group.grade.name)
                    set_subject_id(data.assignment_agreement.assignment_group.subject.id)
                    set_assignment_agreement_id(data.assignment_agreement.id)
                    set_assignment_type(data.assignment_agreement.assignment_type.data)
                    // set_assignment_type('discussion')

                    if(data.assignment_agreement.assignment_type.data === 'discussion'){
                        data.assignment_score = 'Graded'
                    }
                    else{
                        if(data.assessment_rule_detail != null)
                            data.assignment_score = data.assessment_rule_detail.name
    
                        if(data.score != null){
                            data.assignment_score = data.score
                        }
                    }


    
    
                    set_assignment_info_arr([
                        {title : 'Student Name', value : data.user.name}, {title : 'Grade', value : data.assignment_agreement.assignment_group.grade.name},
                        {title : 'Subject', value : data.assignment_agreement.assignment_group.subject.name}, {title : 'Lesson', value : data.assignment_agreement.assignment_group.lesson.name},
                        {title : 'Assignment Title', value : data.assignment_agreement.name}, {title : 'Date Submitted', value : submitted_date_format}, ,
                    ])
    
                    set_rule_id(data.assignment_agreement.assessment_rule_id)
                }
                else {
                    console.log(data)
                    set_assignment_info_arr([
                        {title : 'Student Name', value : data.user.name}, {title : 'Grade', value : data.task.project.grade.name},
                        {title : 'Subject', value : data.task.project.subject.name},
                        {title : 'Project Title', value : data.task.title + ' - ' + data.task.project.name}, {title : 'Date Submitted', value : submitted_date_format}, ,
                    ])

                    if(data.task.type === 'presentation'){
                        set_assignment_type('discussion')
                    }
                    else {
                        set_assignment_type('upload')
                    }

                    if(data.assessment_status.data === 'done'){
                        data.assignment_score = 'Graded'
                    }
                }

                set_assignment_grade(data.assignment_score)

                set_student_submission(data.description)

                
                if(data.file_submitted.length > 0){
                    var file = data.file_submitted[0].file_name
    
                    if(data.file_name != null){
                        file = data.file_name
                    }
                    WebViewer({
                        path : '/lib', initialDoc : base.url_photo('assignment/submitted', file),
                    }, viewerDiv.current).then((instance) => {
                        const {docViewer} = instance
                        const annotManager = docViewer.getAnnotationManager();

                        // if(data.assessment_status.data != 'done'){
                        //     instance.UI.setHeaderItems(header => {
                        //         header.push({
                        //           type: 'actionButton',
                        //           img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
                        //           onClick: async () => {
                        //             const doc = docViewer.getDocument()
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
        window.history.back()
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

    async function submitGrading(){
        set_is_modal_btn_disable(true)
        var url = ''
        var data_upload = {}
        var method = 'put'
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

            if(rule === 'Numerical'){
                data_upload.score = numerical_score
            }
            else{
                if(rule_selected !== ''){
                    data_upload.assessment_rule_detail = {id : rule_selected}
                }
            }
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
            var status = (radio_project_selected === 'revision' ? 'need_correction' : 'done')
            data_upload = {
                id : assignment_submitted_id,
                status : status,
                comment : teacher_notes,
            }
        }

        var response = await base.request(url, method, data_upload)
        if(response != null){
            if(response.status == 'success'){
                window.location.href = '/check-assignment'
            }
        }
        set_is_modal_btn_disable(false)
    }

    function changeScore(index, index_skill, val){
        var data_index = grade_skill_arr[index]
        var skill_data = data_index.arr_skill
        skill_data[index_skill].score = val

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
        base.$('#modalSubmit').modal('show')
    }

    function viewGradeSkill(){
        base.$('#modalSubmit').modal('show')
    }

    function changeRadioProject(value){
        set_radio_project_selected(value)
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
                                <p className='m-0 text-primary'>Assignment Status</p>
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

            {
                assignment_type === 'undgraded' ?
                <div className='col-12 mt-5 text-center'>
                    <div className="card rounded shadow-sm">
                        <div className={"card-body p-5"}>
                            <div className='row'>
                                <div className='col-12'>
                                    <img src={base.img_study_2} style={{height : '20rem'}} />
                                </div>
                                <div className='col-12 pb-2'>
                                    <button className='btn btn-primary rounded px-5 py-2 shadow-sm' onClick={()=>submitGrading()}>Confirm Submission</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>
                    <div className={'col-12 mt-5 ' + (total_file > 0 ? 'd-block' : 'd-none')}>
                        <div className='weviewer' style={{height : '100vh'}} ref={viewerDiv}></div>
                    </div>
                </>
            }

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
            />
            
        </div>
    )
}