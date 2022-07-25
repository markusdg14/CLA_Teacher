import { useEffect, useState } from 'react';
import FormInput from '../../../../components/FormInput';
import SelectOption from '../../../../components/selectOption';
import Base from '../../../../utils/base';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditAssignment({saveAssignment, selected_lesson, selected_assignment, changeInput, assignment_image_data}){
	var base = new Base()

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
                                                <div className='col-12 col-lg'>
                                                    <FormInput 
                                                        title={'Lesson'}
                                                        changeInput={(value)=>console.log(value)}
                                                        value={selected_lesson.lesson.name}
                                                        error_data={''}
                                                        type={''}
                                                        input_type={'text'}
                                                        readOnly={true}
                                                    />
                                                </div>
                                                <div className='col-12 col-lg mt-3 mt-lg-0'>
                                                    <FormInput 
                                                        title={'Grade'}
                                                        changeInput={(value)=>console.log(value)}
                                                        value={selected_lesson.grade.name}
                                                        error_data={''}
                                                        type={''}
                                                        input_type={'text'}
                                                        readOnly={true}
                                                    />
                                                </div>
                                                <div className='col-12 col-lg mt-3 mt-lg-0'>
                                                    <FormInput 
                                                        title={'Subject'}
                                                        changeInput={(value)=>console.log(value)}
                                                        value={selected_lesson.subject.name}
                                                        error_data={''}
                                                        type={''}
                                                        input_type={'text'}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 mt-3'>
                                            <div className='row'>
                                                {
                                                    selected_assignment.type === 'assignment' &&
                                                    <div className='col-12 col-lg'>
                                                        <FormInput 
                                                            title={'Type of Assignment'}
                                                            changeInput={(value)=>console.log(value)}
                                                            value={selected_assignment.assignment_type.name}
                                                            error_data={''}
                                                            type={''}
                                                            input_type={'text'}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                }
                                                <div className={(selected_assignment.type === 'assignment' ? 'col-12 col-lg' : 'col-12 col-lg-4')}>
                                                    <FormInput 
                                                        title={'Grading System'}
                                                        changeInput={(value)=>console.log(value)}
                                                        value={selected_assignment.assessment_rule.name}
                                                        error_data={''}
                                                        type={''}
                                                        input_type={'text'}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-12 mt-3'>
                                            <FormInput 
                                                title={'Judul ' + (selected_assignment.type === 'task' ? 'Task' : 'Assignment')}
                                                changeInput={(value)=>changeInput(value, 'name')}
                                                value={selected_assignment.name}
                                                error_data={''}
                                                type={''}
                                                input_type={'text'}
                                                readOnly={false}
                                            />
                                        </div>
                                        {/* {
                                            selected_assignment.type === 'task' &&
                                            <div className='col-12 mt-3'>
                                                <FormInput 
                                                    title={'Nama Project'}
                                                    changeInput={(value)=>changeInput(value, 'name')}
                                                    value={selected_assignment.project.name}
                                                    error_data={''}
                                                    type={''}
                                                    input_type={'text'}
                                                    readOnly={false}
                                                />
                                            </div>
                                        } */}
                                        <div className='col-12 mt-3'>
                                            <label className='text-primary'>{selected_assignment.type === 'task' ? 'Meeting At' : 'Deadline Date'}</label>
                                            <DatePicker
                                                selected={(selected_assignment.deadline_date == null ? new Date() : new Date(selected_assignment.deadline_date))}
                                                onChange={date => changeInput(date, 'deadline_date')}
                                                minDate={new Date()}
                                                timeFormat="HH:mm"
                                                dateFormat="dd MMMM yyyy"
                                            />
                                        </div>
                                        <div className='col-12 mt-3'>
                                            <label className='text-primary'>{selected_assignment.type === 'task' ? 'Detail Task' : 'Detail Assignment'}</label>
                                            <textarea className="form-control rounded mt-0 mt-lg-2" rows={5} onChange={(e)=>changeInput(e.target.value, 'description')} style={{resize : 'none', border : '1px solid #EAEAEA'}} value={selected_assignment.description} placeholder=""></textarea>
                                        </div>

                                        <div className='col-12 mt-3'>
                                            <label className='text-primary'>Image</label>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <img src={assignment_image_data.image_display} style={{height : '7.5rem', width : '7.5rem'}} />
                                                </div>
                                                <div className='col-12 mt-3'>
                                                    <input type="file" name="photo" accept="image/*" id="file_input" className="d-none" onChange={(event)=>changeInput(event, 'image')} />
                                                    <button className='btn btn-sm btn-outline-primary rounded shadow-sm px-4' onClick={()=>base.$('#file_input').trigger('click')}>Choose File</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-12 mt-4'>
                                            <button className='btn btn-primary rounded shadow-sm px-5' onClick={()=>saveAssignment()}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
		</>
	)
}