import { useEffect, useState } from 'react';
import FormInput from '../../../../components/FormInput';
import SelectOption from '../../../../components/selectOption';
import Base from '../../../../utils/base';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalSubmit from '../../checkAssignment/modalSubmit';

export default function SubmitAssignment({selected_lesson, selected_assignment, offline_student_arr, searchStudent, student_search_value, assignment_type_selected, subject_id}){
	var base = new Base()

    const [rule_id, set_rule_id] = useState('')
    const [rule, set_rule] = useState('')
    const [rule_detail_arr, set_rule_detail_arr] = useState([])
    const [rule_selected, set_rule_selected] = useState('')
    const [teacher_notes, set_teacher_notes] = useState('')

    const [is_modal_btn_disable, set_is_modal_btn_disable] = useState(false)
    const [grade_skill_arr, set_grade_skill_arr] = useState([])
    const [numerical_score, set_numerical_score] = useState('')

    const [assignment_status_data, set_assignment_status_data] = useState('')

    const [radio_project_selected, set_radio_project_selected] = useState('revision')

    const [selected_student, set_selected_student] = useState('')

    async function confirmActivity(index){
        set_rule_id(selected_assignment.assessment_rule.id)
        get_grade_skill()
        set_selected_student(offline_student_arr[index].user.id)
        base.$('#modalSubmit').modal('show')
    }

    useEffect(async ()=>{
        if(rule_id !== ''){
            get_rule()
        }
    }, [rule_id])

    async function get_grade_skill(){
        var url = '/skill/category?subject_id=' + subject_id + '&task_agreement_id=' + selected_assignment.id
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
        var method = 'post'
        if(assignment_type_selected === 'quiz'){
            url = '/assessment/assignment'
            data_upload = {
                assignment_agreement : {id : selected_assignment.id},
                comment : teacher_notes,
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
        else  if(assignment_type_selected === 'ungraded'){
            url = '/assessment/assignment'
            data_upload = {
                assignment_agreement : {id : selected_assignment.id},
            }
        }
        else if(assignment_type_selected === 'discussion'){
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
                // class_student : {id : class_student_id},
                task_agreement : {id : selected_assignment.id},
                comment : teacher_notes,
                arr_skill : arr_skill
            }
        }
        else if(assignment_type_selected === 'upload'){
            url = '/assessment/assignment'
            var status = (radio_project_selected === 'revision' ? 'need_correction' : 'done')
            data_upload = {
                assignment_agreement : {id : selected_assignment.id},
                status : status,
                comment : teacher_notes,
            }
        }

        data_upload.user_id = selected_student

        console.log(JSON.stringify(data_upload))

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

    function changeRadioProject(value){
        set_radio_project_selected(value)
    }

	return(
		<>
			<div className='row'>
                <div className='col-12'>
                    <div className="card rounded shadow-sm">
                        <div className={"card-body p-0"}>
                            <div className={'row m-0'}>
                                <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                <div className='col-12 p-3 py-4 mb-3'>
                                    <div className='row m-0'>
                                        <div className='col-12'>
                                            <div className='row m-0'>
                                                <div className='col-12 col-lg p-0'>
                                                    <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Edit Assignment</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 mt-5'>
                                            <div className='row'>
                                                <div className='col'>
                                                    <FormInput 
                                                        title={'Lesson'}
                                                        value={selected_lesson.lesson.name}
                                                        error_data={''}
                                                        type={''}
                                                        input_type={'text'}
                                                        readOnly={true}
                                                    />
                                                </div>
                                                <div className='col'>
                                                    <FormInput 
                                                        title={'Grade'}
                                                        value={selected_lesson.grade.name}
                                                        error_data={''}
                                                        type={''}
                                                        input_type={'text'}
                                                        readOnly={true}
                                                    />
                                                </div>
                                                <div className='col'>
                                                    <FormInput 
                                                        title={'Subject'}
                                                        value={selected_lesson.subject.name}
                                                        error_data={''}
                                                        type={''}
                                                        input_type={'text'}
                                                        readOnly={true}
                                                    />
                                                </div>
                                                <div className='col'>
                                                    <FormInput 
                                                        title={'Grading System'}
                                                        value={selected_assignment.assessment_rule.name}
                                                        error_data={''}
                                                        type={''}
                                                        input_type={'text'}
                                                        readOnly={true}
                                                    />
                                                </div>
                                                <div className='col-12 mt-3'>
                                                    <FormInput 
                                                        title={'Judul ' + (selected_assignment.type === 'task' ? 'Task' : 'Assignment')}
                                                        value={selected_assignment.name}
                                                        error_data={''}
                                                        type={''}
                                                        input_type={'text'}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>

                <div className='col-12 mt-4'>
                    <div className="card rounded shadow-sm">
                        <div className={"card-body p-0"}>
                            <div className={'row m-0'}>
                                <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                <div className='col-12 p-3 py-4 mb-3'>
                                    <div className='row m-0'>
                                        <div className='col-12'>
                                            <div className='row m-0'>
                                                <div className='col-12 col-lg p-0'>
                                                    <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Student List</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 mt-5'>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="input-group border rounded">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text bg-white border-0 bg-transparent pr-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                                                        </div>
                                                        <input type="text" className="form-control border-0 bg-transparent" placeholder="Search" aria-describedby="basic-addon1" value={student_search_value} onChange={(e)=>searchStudent(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className='col-auto d-flex align-items-center'>
                                                    <p className='m-0' style={{color : 'black'}}><i className="bi bi-sort-up"></i> Sort</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 mt-5'>
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                        <td className='td-fit-content' style={{fontFamily : 'InterBold', color : '#6B7280'}}>PP</td>
                                                        <td style={{fontFamily : 'InterBold', color : '#6B7280'}}>Student Name</td>
                                                        <td style={{fontFamily : 'InterBold', color : '#6B7280'}}>L/P</td>
                                                        <td className='td-fit-content' style={{fontFamily : 'InterBold', color : '#6B7280'}}>Status Activity</td>
                                                        <td style={{fontFamily : 'InterBold', color : '#6B7280'}}>Last Updated</td>
                                                        <td style={{fontFamily : 'InterBold', color : '#6B7280'}}></td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        offline_student_arr.map((data, index)=>(
                                                            <tr key={index}>
                                                                <td className='td-fit-content align-middle'>
                                                                    <img src={data.user.image_display} className={'d-none d-lg-inline-block mr-3'} style={{height : '3rem', width : '3rem', aspectRatio : 1, borderRadius : '3rem'}} />
                                                                </td>
                                                                <td className='align-middle'>
                                                                    <p className='m-0 d-lg-inline-block text-capitalize'>{data.user.name}</p>
                                                                </td>
                                                                <td className='td-fit-content align-middle'>
                                                                    <p className='m-0 d-lg-inline-block text-capitalize'>{(data.user.gender == 1 ? 'L' : 'P')}</p>
                                                                </td>
                                                                <td className='td-fit-content align-middle'>
                                                                    {
                                                                        selected_assignment.type === 'task' ?
                                                                        <p className='m-0 d-lg-inline-block text-capitalize'>{(data.last_submitted != null ? 'Done' : '-')}</p>
                                                                        :
                                                                        <p className='m-0 d-lg-inline-block text-capitalize'>{(data.last_submitted != null ? data.last_submitted.assessment_status.name : '-')}</p>
                                                                    }
                                                                </td>
                                                                <td className='align-middle'>
                                                                    <p className='m-0 d-lg-inline-block text-capitalize'>{(data.last_submitted != null ? base.moment(data.last_submitted.updated_at).format('DD MMM YYYY') : '-')}</p>
                                                                </td>
                                                                <td className='td-fit-content align-middle'>
                                                                    <button className='btn btn-primary shadows-sm rounded' onClick={()=>confirmActivity(index)}>Confirm</button>
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
                </div>

                <ModalSubmit
                    assignment_type={assignment_type_selected}
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
		</>
	)
}