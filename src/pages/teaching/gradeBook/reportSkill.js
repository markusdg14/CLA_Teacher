import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import CardSubject from '../../../components/cardSubject';
import SelectOption from '../../../components/selectOption';
import LoadingData from '../../../components/loading';


export default function ReportSkill({student_arr, student_arr_temp, skill_student_selected, skill_student_name_selected, skill_ctg_arr, skill_list_arr, skill_assignment, skill_grade_arr, legend_arr, changeStudent, filterBtn, term_arr, term_selected, changeTerm, skill_grade_book_arr, editSkillScore, is_loading_data, editNotes}){
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
											data_arr={student_arr} 
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
											<div className='col-12 col-lg-auto'>
													<SelectOption
														data_arr={term_arr} 
														selected={term_selected}
														title={'Term'}
														changeInput={(value)=>changeTerm(value)}
													/>
											</div>
										</div>
									</div>

									{
										is_loading_data ?
										<div className='col-12 mb-3'>
											<div className='row'>
												<LoadingData />
											</div>
										</div>
										:
										<>
										{
											skill_ctg_arr.length > 0 &&
											<div className='col-12 mt-3'>
												<div className='row m-0'>
													<div className='col-12'>
														<div className="table-responsive">
															<table className="table table-borderless">
																<thead style={{backgroundColor : '#EBEFE2'}}>
																	<tr>
																		<th style={{width : '6rem'}}></th>
																		{
																			skill_assignment.map((data_assignment, index_assignment)=>(
																				<th className='text-center' key={index_assignment} style={{width : '6rem'}}>{data_assignment.name}</th>
																			))
																		}
																	</tr>
																</thead>
																<tbody>
																	{
																		skill_ctg_arr.map((data_category, index_category)=>(
																			<>
																				<tr key={index_category}>
																					<td colSpan={skill_assignment.length + 1} style={{backgroundColor : '#F3F4F6'}}>
																						<p className='m-0'>{data_category.name}</p>
																					</td>																			
																				</tr>
																				{
																					skill_list_arr.map((data_list, index_list)=>(
																						<>
																						{
																							data_list.skill_category_id === data_category.id &&
																							<tr key={index_list}>
																								<td className='text-primary pl-4'>{/* <i class="bi bi-circle-fill mr-2" style={{fontSize : '.75rem'}}></i>  */}{data_list.name}</td>

																								{
																									skill_assignment.map((data_assignment, index_assignment)=>(
																										<td className='text-center' style={{width : '6rem'}} key={index_assignment}>
																											{
																												skill_grade_arr[data_category.id] != null &&
																												<>
																													{
																														skill_grade_arr[data_category.id][data_list.id] != null &&
																														<>
																														{
																															skill_grade_arr[data_category.id][data_list.id][data_assignment.id] != null &&   
																															<p className={"m-0"}>{skill_grade_arr[data_category.id][data_list.id][data_assignment.id].score} <i className="bi bi-pencil-fill ml-2" style={{cursor : 'pointer', fontSize : '.75rem'}} onClick={()=>editSkillScore(index_category, index_list, index_assignment)}></i></p>
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
																			skill_assignment.map((data_assignment, index_assignment)=>(
																				<td className='text-center ' style={{width : '6rem'}} key={index_assignment}>
																					{
																						skill_grade_book_arr[data_assignment.id] != null &&
																						<>
																							{
																								<p className={"m-0"}>{(skill_grade_book_arr[data_assignment.id].average == null ? 0 : parseFloat(skill_grade_book_arr[data_assignment.id].average).toFixed(2))}</p>
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
																			skill_assignment.map((data_assignment, index_assignment)=>(
																				<td className='text-center ' style={{width : '6rem'}} key={index_assignment}>
																					{
																						skill_grade_book_arr[data_assignment.id] != null &&
																						<>
																							{
																								<p className={"m-0"}>{skill_grade_book_arr[data_assignment.id].total_score}</p>
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
																			skill_assignment.map((data_assignment, index_assignment)=>(
																				<td className='text-center ' style={{width : '6rem'}} key={index_assignment}>
																					{
																						skill_grade_book_arr[data_assignment.id] != null &&
																						<>
																							{
																								skill_grade_book_arr[data_assignment.id].grade_book != null &&
																								<>
																									{
																										<p className={"m-0"}>{skill_grade_book_arr[data_assignment.id].grade_book.assessment_range.legend}</p>
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
																			skill_assignment.map((data_assignment, index_assignment)=>(
																				<td className='' style={{width : '6rem'}} key={index_assignment}>
																					{
																						skill_grade_book_arr[data_assignment.id] != null &&
																						<>
																							<div className='teacher_comment' dangerouslySetInnerHTML={{__html: (skill_grade_book_arr[data_assignment.id].grade_book != null ? skill_grade_book_arr[data_assignment.id].grade_book.comment : '-')}}></div>
																							<i className="bi bi-pencil-fill" style={{cursor : 'pointer', fontSize : '.75rem'}} onClick={()=>editNotes(index_assignment)}></i>
																						</>
																					}
																				</td>
																			))
																		}
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
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
	)
}