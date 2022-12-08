import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';


export default function HomeroomReportSkill({skill_student_arr, skill_student_selected, skill_student_name_selected, changeStudent, filterBtn, skill_subject_arr, skill_ctg_arr, skill_list_arr, skill_project_arr, skill_grade_arr, legend_arr, toggleReportSkill, skill_grade_book_arr}){
	var base = new Base()

	return(
		<div className='row'>
			<div className='col-12'>
				<div className='row'>
					<div className='col-12 col-lg-6'>
						<div className="card rounded shadow-sm h-100">
							<div className={"card-body p-4"}>
								<div className='row'>
									<div className='col-12'>
										<label>Student Name</label>
									</div>
									<div className='col'>
										<SelectOption 
											data_arr={skill_student_arr} 
											selected={skill_student_selected}
											title={'Student'}
											changeInput={(value)=>changeStudent(value)}
										/>
									</div>
									<div className='col-auto d-flex align-items-center justify-content-end'>
										<button className='btn btn-primary rounded' onClick={filterBtn}>Filter</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-12 col-lg-6 mt-3 mt-lg-0'>
						<div className="card rounded shadow-sm h-100">
							<div className={"card-body p-0"}>
								<div className='row m-0'>
								<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
								<div className='col-12 p-4'>
									<div className='row'>
										{
											legend_arr.map((data, index)=>(
												<div className='col-12' key={index}>
													<p className='m-0'>{data.legend} : {data.name}</p>
												</div>
											))
										}
									</div>
								</div>
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
								<div className='row m-0'>
									<div className='col-12 mb-3 pr-3'>
										<div className='row m-0'>
											<div className='col-12 col-lg'>
												<h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>{(skill_student_name_selected === '' ? 'Nama Siswa' : skill_student_name_selected)}</h5>
											</div>
										</div>
									</div>
									<div className='col-12 mt-3'>
										<div className='row m-0'>
												{
													skill_subject_arr.map((data, index)=>(
														<div className='col-12'>
															<div className="table-responsive">
																<table className="table table-borderless">
																	<thead style={{backgroundColor : '#EBEFE2'}}>
																		<tr style={{cursor : 'pointer'}} onClick={()=>toggleReportSkill(index)}>
																			<th style={{width : '6rem'}}>{data.name} <i className={"ml-3 fas fa-chevron-" + (data.is_show ? 'up' : 'down')}></i></th>
																			{
																				data.arr_project.map((data_assignment, index_assignment)=>(
																					<th className='text-center' key={index_assignment} style={{width : '6rem'}}>{data_assignment.name}</th>
																				))
																			}
																		</tr>
																	</thead>

																	{
																		data.is_show &&
																		<tbody>
																			{
																				data.arr_skill_category.map((data_category, index_category)=>(
																					<>
																						<tr key={index_category}>
																							<td colSpan={data.arr_project.length + 1} style={{backgroundColor : '#F3F4F6'}}>
																								<p className='m-0'>{data_category.name}</p>
																							</td>																			
																						</tr>
																						{
																							data_category.arr_skill.map((data_list, index_list)=>(
																								<>
																								{
																									data_list.skill_category_id === data_category.id &&
																									<tr key={index_list}>
																										<td className='text-primary pl-4'>{data_list.name}</td>

																										{
																											data.arr_project.map((data_assignment, index_assignment)=>(
																												<td className='text-center' style={{width : '6rem'}} key={index_assignment}>
																													{
																														skill_grade_arr[data.id] != null &&
																														<>
																															{
																																skill_grade_arr[data.id][data_category.id] != null &&
																																<>
																																	{
																																		skill_grade_arr[data.id][data_category.id][data_list.id] != null &&
																																		<>
																																		{
																																			skill_grade_arr[data.id][data_category.id][data_list.id][data_assignment.id] &&
																																			<p className={"m-0"}>{skill_grade_arr[data.id][data_category.id][data_list.id][data_assignment.id].score}</p>
																																		}
																																		</>
																																	}
																																</>
																															}
																														</>
																													}
																												</td>
																											))
																										}
																									</tr>
																								}
																								</>
																							))
																						}
																					</>
																				))
																			}
																			
																			<tr style={{backgroundColor : '#EBEFE2'}}>
																				<td className='align-middle text-uppercase' style={{color : '#8A92A6'}}>Average</td>
																				{
																					data.arr_project.map((data_assignment, index_assignment)=>(
																						<td className='text-center ' style={{width : '6rem'}} key={index_assignment}>
																							{
																								skill_grade_book_arr[data.id] != null &&
																								<>
																									{
																										skill_grade_book_arr[data.id][data_assignment.id] != null &&
																										<>
																										<p className={"m-0"}>{skill_grade_book_arr[data.id][data_assignment.id].average != null ? (parseFloat(skill_grade_book_arr[data.id][data_assignment.id].average).toFixed(2)) : 0}</p>
																										</>
																									}
																								</>
																							}
																						</td>
																					))
																				}
																			</tr>

																			<tr style={{backgroundColor : '#EBEFE2'}}>
																				<td className='align-middle text-uppercase' style={{color : '#8A92A6'}}>Score</td>
																				{
																					data.arr_project.map((data_assignment, index_assignment)=>(
																						<td className='text-center ' style={{width : '6rem'}} key={index_assignment}>
																							{
																								skill_grade_book_arr[data.id] != null &&
																								<>
																									{
																										skill_grade_book_arr[data.id][data_assignment.id] != null &&
																										<>
																										{
																											<p className={"m-0"}>{skill_grade_book_arr[data.id][data_assignment.id].total_score != null ? (parseFloat(skill_grade_book_arr[data.id][data_assignment.id].total_score).toFixed(2)) : 0}</p>
																										}
																										</>
																									}
																								</>
																							}
																						</td>
																					))
																				}
																			</tr>

																			<tr>
																				<td className='align-middle text-uppercase' style={{color : '#8A92A6'}}>Legend of Mark</td>
																				{
																					data.arr_project.map((data_assignment, index_assignment)=>(
																						<td className='text-center ' style={{width : '6rem'}} key={index_assignment}>
																							{
																								skill_grade_book_arr[data_assignment.id] != null &&
																								<>
																									{
																										skill_grade_book_arr[data_assignment.id][data_assignment.id] != null &&
																										<>
																										{
																											skill_grade_book_arr[data.id][data_assignment.id].grade_book != null &&
																											<p className={"m-0"}>{skill_grade_book_arr[data.id][data_assignment.id].grade_book.assessment_range.legend}</p>
																										}
																										</>
																									}
																								</>
																							}
																						</td>
																					))
																				}
																			</tr>
																			<tr>
																				<td className='align-middle text-uppercase' style={{color : '#8A92A6'}}>Teacher Notes</td>
																				{
																					data.arr_project.map((data_assignment, index_assignment)=>(
																						<td className='' style={{width : '6rem'}} key={index_assignment}>
																							{
																								skill_grade_book_arr[data.id] != null &&
																								<>
																									{
																										skill_grade_book_arr[data.id][data_assignment.id] != null &&
																										<>
																										<div className='teacher_comment' dangerouslySetInnerHTML={{__html: (skill_grade_book_arr[data.id][data_assignment.id].grade_book != null ? skill_grade_book_arr[data.id][data_assignment.id].grade_book.comment : '-')}}></div>
																										</>
																									}
																								</>
																							}
																						</td>
																					))
																				}
																			</tr>

																		</tbody>
																	}
																</table>
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
				</div>

			</div>

		</div>
	)
}