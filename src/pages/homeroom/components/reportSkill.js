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
													<p className='m-0'>{data.start_score} - {data.end_score} : {data.name}</p>
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
											<div className='col-12'>
												{
													skill_subject_arr.map((data, index)=>(
														<div className="table-responsive" key={index}>
															<table className="table w-100">
																<thead>
																	<tr style={{backgroundColor : '#EBEFE2', cursor : 'pointer'}} onClick={()=>toggleReportSkill(index)}>
																		<th style={{width : '6rem'}}>{data.name} <i className={"ml-3 fas fa-chevron-" + (data.is_show ? 'up' : 'down')}></i></th>
																		{
																			skill_project_arr.map((data_project, index_project)=>(
																				<th className='text-center align-middle' key={index_project} style={{width : '6rem'}}>{data_project.name}</th>
																			))
																		}
																	</tr>
																</thead>
																<tbody>
																{
																	data.is_show &&
																	<>
																		{
																			skill_ctg_arr.map((data_category, index_category)=>(
																				<>
																				<tr key={index_category}>
																					<td className='p-0' colSpan={skill_project_arr.length + 1}>
																						<div className='px-2 py-0 d-flex align-items-center' style={{height : '3rem'}}>
																							<p className='m-0' style={{fontFamily : 'InterBold'}}>{data_category.name}</p>
																						</div>
																					</td>
																				</tr>
																				{
																					skill_list_arr.map((data_skill, index_skill)=>(
																						<tr key={index_skill}>
																							<td className='text-primary'><i class="bi bi-circle-fill mr-2" style={{fontSize : '.75rem'}}></i> {data_skill.name}</td> 
																							
																							{
																								skill_project_arr.map((data_project, index_project)=>(
																									<td className='text-center px-0' style={{width : '6rem'}} key={index_project}>
																										<div className="">
																											{
																												skill_grade_arr[data.id] != null &&
																												<>
																													{
																														skill_grade_arr[data.id][data_category.id][data_skill.id] != null &&
																														<>
																														{
																															skill_grade_arr[data.id][data_category.id][data_skill.id][data_project.id] &&
																															<span className={"badge badge-pill p-2 px-3 rounded badge-success"}>{skill_grade_arr[data.id][data_category.id][data_skill.id][data_project.id].score}</span>
																														}
																														</>
																													}
																												</>
																											}
																										</div>
																									</td>
																								))
																							}
																						</tr>
																					))
																				}
																				<tr style={{backgroundColor : '#FFF8E5'}}>
																					<td className='align-middle text-uppercase' style={{color : '#8A92A6'}}>Average</td>
																					{
																						skill_project_arr.map((data_project, index_project)=>(
																							<td className='text-center ' style={{width : '6rem'}} key={index_project}>
																								{
																									skill_grade_book_arr[data.id] != null &&
																									<>
																										{
																											skill_grade_book_arr[data.id][data_project.id] != null &&
																											<>
																											<span className={"badge badge-pill p-2 px-3 rounded badge-dark"}>{skill_grade_book_arr[data.id][data_project.id].average}</span>
																											</>
																										}
																										{
																										}
																									</>
																								}
																							</td>
																						))
																					}
																				</tr>

																				<tr style={{backgroundColor : '#FFF8E5'}}>
																					<td className='align-middle text-uppercase' style={{color : '#8A92A6'}}>Score</td>
																					{
																						skill_project_arr.map((data_project, index_project)=>(
																							<td className='text-center ' style={{width : '6rem'}} key={index_project}>
																								{
																									skill_grade_book_arr[data.id] != null &&
																									<>
																										{
																											skill_grade_book_arr[data.id][data_project.id] != null &&
																											<>
																											{
																												skill_grade_book_arr[data.id][data_project.id].grade_book != null &&
																												<span className={"badge badge-pill p-2 px-3 rounded badge-dark"}>{skill_grade_book_arr[data.id][data_project.id].grade_book.score}</span>
																											}
																											</>
																										}
																										{
																										}
																									</>
																								}
																							</td>
																						))
																					}
																				</tr>

																				<tr style={{backgroundColor : '#F7F7F7'}}>
																					<td className='align-middle text-uppercase' style={{color : '#8A92A6'}}>Legend of Mark</td>
																					{
																						skill_project_arr.map((data_project, index_project)=>(
																							<td className='text-center ' style={{width : '6rem'}} key={index_project}>
																								{
																									skill_grade_book_arr[data.id] != null &&
																									<>
																										{
																											skill_grade_book_arr[data.id][data_project.id] != null &&
																											<>
																											{
																												skill_grade_book_arr[data.id][data_project.id].grade_book != null &&
																												<span className={"badge badge-pill p-2 px-3 rounded badge-dark"}>{skill_grade_book_arr[data.id][data_project.id].grade_book.assessment_range.legend}</span>
																											}
																											</>
																										}
																										{
																										}
																									</>
																								}
																							</td>
																						))
																					}
																				</tr>
																				<tr style={{backgroundColor : '#F7F7F7'}}>
																					<td className='align-middle text-uppercase' style={{color : '#8A92A6'}}>Teacher Notes</td>
																					{
																						skill_project_arr.map((data_project, index_project)=>(
																							<td style={{width : '6rem'}} key={index_project}>
																								{
																									skill_grade_book_arr[data.id] != null &&
																									<>
																										{
																											skill_grade_book_arr[data.id][data_project.id] != null &&
																											<>
																											<p className={"m-0"}>{skill_grade_book_arr[data.id][data_project.id].grade_book != null ? skill_grade_book_arr[data.id][data_project.id].grade_book.comment : '-'}</p>
																											</>
																										}
																										{
																										}
																									</>
																								}
																							</td>
																						))
																					}
																				</tr>

																				
																				</>
																			))
																		}
																	</>
																}
																</tbody>
															</table>
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

		</div>
	)
}