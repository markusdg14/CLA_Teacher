import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';

export default function ModalSubmit({rule_detail_arr, rule_selected, changeInput, submitGrading, notes, is_modal_btn_disable, assignment_type, grade_skill_arr, changeScore, rule, numerical_score, changeNumerical, assignment_status_data, teacher_notes, set_radio_project, viewFrom, is_student_online, grade_skill_avg, grade_skill_total_score}){
	var base = new Base()

	const [modal_radio_arr, set_modal_radio_arr] = useState([
		{id : 'major_revision', title : 'Make student do a Major Revision', is_checked : (is_student_online ? true : false), is_show : is_student_online},
		{id : 'minor_revision', title : 'Make student do a Minor Revision', is_checked : false, is_show : is_student_online},
		{id : 'grade', title : 'Grade Assignment', is_checked : (!is_student_online ? true : false), is_show : true}
	])
	const [radio_selected, set_radio_selected] = useState((is_student_online ? 'major_revision' : 'grade'))

	const [radio_project_arr, set_radio_project_arr] = useState([
		{id : 'major_revision', title : 'Major Revision', is_checked : (is_student_online ? true : false), is_show : is_student_online},
		{id : 'minor_revision', title : 'Minor Revision', is_checked : false, is_show : is_student_online},
		{id : 'confirm', title : 'Confirm Submission', is_checked : (!is_student_online ? true : false), is_show : true}
	])
	const [radio_project_selected, set_radio_project_selected] = useState('major_revision')

	function changeRadio(index, radio_type='assignment'){
		if(radio_type === 'assignment'){
			var data_index = modal_radio_arr[index]
			var initChecked = data_index.is_checked
			for(var x in modal_radio_arr){
				modal_radio_arr[x].is_checked = false
			}
			modal_radio_arr[index].is_checked = !initChecked
	
			base.update_array(modal_radio_arr, set_modal_radio_arr, data_index, index)
			if(modal_radio_arr[index].is_checked){
				set_radio_selected(modal_radio_arr[index].id)
			}

			set_radio_project(modal_radio_arr[index].id)
		}
		else{
			var data_index = radio_project_arr[index]
			var initChecked = data_index.is_checked
			for(var x in radio_project_arr){
				radio_project_arr[x].is_checked = false
			}
			radio_project_arr[index].is_checked = !initChecked

			base.update_array(radio_project_arr, set_radio_project_arr, data_index, index)
			if(radio_project_arr[index].is_checked){
				set_radio_project_selected(radio_project_arr[index].id)
				set_radio_project(radio_project_arr[index].id)
			}
		}
	}

	return(
		<>
			<div className="modal fade" id="modalSubmit" tabIndex="-1" aria-labelledby="modalSubmitLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg">
					<div className="modal-content rounded border-0 shadow-sm">
						<div className="modal-body p-0">
							<div className={'row m-0'}>
								<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
								<div className='col-12 p-3 pt-4 pb-5'>
									<div className='row m-0'>
										<div className='col-12 mb-3'>
											{
												assignment_status_data === 'done' ?
												<h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Grade Skill</h5>
												:
												<h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>{assignment_type === 'quiz' ? 'Grading Assignment' : assignment_type === 'discussion' ? 'Input Grade Skill' : assignment_type === 'upload' ? 'Grading Task' : assignment_type === 'ungraded' ? 'Confirming Student Submission' : ''}</h5>
											}
										</div>

										<div className='col-12 mb-3'>
											{
												assignment_type === 'discussion' &&
												<>
													<p className='m-0'>5 : Advanced</p>
													<p className='m-0'>4 : Accomplished</p>
													<p className='m-0'>3 : Well-developed</p>
													<p className='m-0'>2 : Need to put more effort</p>
													<p className='m-0'>1 : Need an encouragement and help</p>
												</>
											}
										</div>


										{
											assignment_type === 'quiz' ?
											<>
												<div className='col-12 mt-3'>
													<div className='row m-0'>
														<div className='col-12'>
															<p className='m-0' style={{fontSize : '1.25rem', color : 'black'}}>Pick what you want to do</p>
															<div className='row m-0 mt-2'>
																{
																	modal_radio_arr.map((data, index)=>(
																		<>
																		{
																			data.is_show ?
																			<div className='col-auto' key={index}>
																				<div className="form-check">
																					<input className="form-check-input" type="radio" name="exampleRadios" id={'radio-' + data.id} value={data.id} checked={data.is_checked} onChange={()=>changeRadio(index)} />
																					<label className="form-check-label" htmlFor={'radio-' + data.id} style={{color : 'black'}}>
																						{data.title}
																					</label>
																				</div>
																			</div>
																			: <></>
																		}
																		</>
																	))
																}
															</div>
														</div>
													</div>
												</div>

												<div className='col-12 mt-4'>
													<div className='row m-0'>
														<div className='col-12'>
															<p className='m-0' style={{color : 'black'}}>{radio_selected === 'grade' ? 'Assignment Grade' : radio_selected === 'revision' ? 'Input Notes' : ''}</p>

															{
																radio_selected === 'grade' ? 
																<div className='mt-2'>
																	{
																		rule !== 'Numerical' ?
																		<SelectOption data_arr={rule_detail_arr} selected={rule_selected} title={'Grade'} changeInput={(value)=>changeInput(value, 'grade')} />
																		:
																		<>
																			<input type='text' className="form-control form-control-lg rounded" style={{backgroundColor : 'white'}} value={numerical_score} onChange={(e)=>changeNumerical(e.target.value)} />
																		</>
																	}
																</div>
																:
																<>
																<textarea className="form-control rounded mt-2" rows={3} onChange={(e)=>changeInput(e.target.value, 'notes')} value={teacher_notes} style={{resize : 'none', border : '1px solid #EAEAEA'}} placeholder=""></textarea>
																</>
															}
														</div>
													</div>
												</div>
											</>
											: assignment_type === 'discussion' ?
											<>
											<div className='col-12 mt-3'>
												<div className='row m-0'>
													{
														assignment_status_data !== 'done' &&
														<div className='col-12 mb-3'>
															<p className='m-0' style={{color : 'black'}}>Input Student Grade for their skill</p>
														</div>
													}
													<div className='col-12'>
														<div className='row'>
															{/* <div className='col-12'>
																<p className='m-0' style={{fontFamily : 'InterBold'}}>Grade Skill</p>
															</div> */}
															<div className='col-12'>                                                                
																<div className='table-responsive'>
																	<table class="table table-striped table-borderless">
																		<thead>
																			<tr>
																				<th colSpan={2}>Grade Skill</th>
																			</tr>
																		</thead>
																		<tbody>
																			{
																				grade_skill_arr.map((data, index)=>(
																					<>
																						<tr>
																							<td colSpan={2}>{data.name}</td>
																						</tr>
																						{
																							data.arr_skill.map((data_skill, index_skill)=>(
																								<tr>
																									<td className='align-middle'>
																										<p className='m-0'>{index_skill + 1}. {data_skill.name}</p>
																									</td>
																									<td className='w-25'>
																										{
																											assignment_status_data !== 'done' ?
																											<input className='form-control form-control-sm rounded' placeholder='0' value={data_skill.score} onChange={(e)=>changeScore(index, index_skill, e.target.value)} />
																											:
																											<p className='m-0 text-right'>{data_skill.score}</p>
																										}
																									</td>
																								</tr>
																							))
																						}
																					</>
																				))
																			}
																			<tr>
																				<td className='align-middle'>
																					<p className='m-0'>Average</p>
																				</td>
																				<td className='w-25'>
																					<p className='m-0 text-right'>{parseFloat(grade_skill_avg).toFixed(2)}</p>
																				</td>
																			</tr>
																			<tr>
																				<td className='align-middle'>
																					<p className='m-0'>Score</p>
																				</td>
																				<td className='w-25'>
																					<p className='m-0 text-right'>{parseFloat(grade_skill_total_score).toFixed(2)}</p>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>
													<div className='col-12 mt-3'>
														<p className='m-0' style={{color : 'black'}}>{assignment_status_data !== 'done' ? 'Input ' : ''}Notes</p>
														{
															assignment_status_data !== 'done' ?
															<textarea className="form-control rounded mt-2" rows={3} onChange={(e)=>changeInput(e.target.value, 'notes')} value={teacher_notes} style={{resize : 'none', border : '1px solid #EAEAEA'}} placeholder=""></textarea>
															:
															<p className='m-0 mt-2'>{teacher_notes}</p>
														}
													</div>
												</div>
											</div>
											</>
											: 
											assignment_type === 'upload' ? 
											<>
												<div className='col-12 mt-3'>
													<div className='row m-0'>
														<div className='col-12'>
															<p className='m-0' style={{fontSize : '1.25rem', color : 'black'}}>Pick what you want to do</p>
															<div className='row m-0 mt-2'>
																{
																	radio_project_arr.map((data, index)=>(
																		<>
																		{
																			data.is_show ?
																			<div className='col-auto' key={index}>
																				<div className="form-check">
																					<input className="form-check-input" type="radio" name="exampleRadios" id={'radio-' + data.id} value={data.id} checked={data.is_checked} onChange={()=>changeRadio(index, 'project')} />
																					<label className="form-check-label" htmlFor={'radio-' + data.id} style={{color : 'black'}}>
																						{data.title}
																					</label>
																				</div>
																			</div>
																			: <></>
																		}
																		</>
																	))
																}
															</div>
														</div>
													</div>
												</div>

												<div className='col-12 mt-4'>
													<div className='row m-0'>
														<div className='col-12'>
															<textarea className="form-control rounded mt-2" rows={3} onChange={(e)=>changeInput(e.target.value, 'notes')} value={teacher_notes} style={{resize : 'none', border : '1px solid #EAEAEA'}} placeholder=""></textarea>
														</div>
													</div>
												</div>
											</>
											:
											assignment_type === 'ungraded' ?
											<>
												<div className='col-12 mt-3'>
													<div className='row m-0'>
														<div className='col-auto d-flex align-items-center'>
															<img src={base.img_modal_ungraded} style={{height : '7.5rem'}} />
														</div>
														<div className='col d-flex align-items-center'>
															<p className='m-0' style={{color : 'black'}}>Are you sure you would like to proceed to Confirm Student Activity Submission ?</p>
														</div>
													</div>
												</div>
												<div className='col-12 mt-4'>
													<div className='row'>
														<div className='col'>
															<button type='button' className='btn btn-outline-primary rounded shadow-sm w-100' data-dismiss="modal">No</button>
														</div>
														<div className='col'>
															<button type='button' className='btn btn-primary rounded shadow-sm w-100' onClick={submitGrading} disabled={is_modal_btn_disable}>Yes</button>
														</div>
													</div>
												</div>
											</>
											: <></>
										}

										{
											assignment_type !== 'ungraded' &&
											<div className='col-12 mt-4'>
												<div className='row m-0'>
													<div className='col'>
														{
															assignment_status_data !== 'done' ?
															<button className='btn btn-primary rounded px-5' onClick={submitGrading} disabled={is_modal_btn_disable}>Submit</button>
															:
															<button className='btn btn-outline-primary rounded px-5' data-dismiss="modal">Close</button>
														}
													</div>
												</div>
											</div>
										}

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