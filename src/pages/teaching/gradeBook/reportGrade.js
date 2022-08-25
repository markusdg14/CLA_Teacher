import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import CardSubject from '../../../components/cardSubject';
import SelectOption from '../../../components/selectOption';


export default function ReportGrade({class_student, assignment_agreement, grade_book_arr, term_arr, term_selected, changeTerm, editScore}){
		var base = new Base()

		return(
			<div className='row'>
				<div className='col-12 mt-5'>
					<div className="card rounded shadow-sm">
						<div className={"card-body p-0"}>
							<div className={'row m-0'}>
								<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
								<div className='col-12 p-3 pt-4'>
									<div className='row m-0'>
										<div className='col-12 mb-3 px-0'>
											<div className='row m-0'>
													<div className='col-12 col-lg'>
															<h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Report Card Grade</h5>
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
										<div className='col-12 p-0'>
											<div className="table-responsive">
												<table className="table">
													<thead>
														<tr>
															<td className='py-2'>No</td>
															<td className='py-2'>Student Name</td>
															<td className={'text-center py-2'} style={{backgroundColor : '#FFF2CA'}}>Final Score</td>
															{
																assignment_agreement.map((data, index)=>(
																	<td key={index} className={'text-center py-2'}>{data.name}</td>
																))
															}
														</tr>
													</thead>
													<tbody>
														{
															class_student.map((data, index)=>(
																<tr key={index}>
																	<td className='td-fit-content py-2'>{parseInt(index)+1}</td>
																	<td className='py-2'>{data.user.name}</td>
																	<td className={'text-center align-middle py-2'} style={{backgroundColor : '#FFF2CA'}}>
																		{
																			<>
																				{
																					grade_book_arr[data.id] != null &&
																					<>
																					{
																						grade_book_arr[data.id]['final_score'] != null &&
																						<p className='m-0'>{(grade_book_arr[data.id]['final_score'].average_score == null ? 0 : parseFloat(grade_book_arr[data.id]['final_score'].average_score).toFixed(2))}</p>
																					}
																					</>
																				}
																			</>
																		}
																	</td>
																	{
																		assignment_agreement.map((data_agreement, index_agreement)=>(
																			<td key={index_agreement} className={'text-center align-middle py-2'}>
																				{
																					grade_book_arr[data.id] != null &&
																					<>
																					{
																						grade_book_arr[data.id][data_agreement.id] != null ?
																						<p className='m-0'>{grade_book_arr[data.id][data_agreement.id].score} <i className="bi bi-pencil-fill" style={{cursor : 'pointer', fontSize : '.6rem'}} onClick={()=>editScore(index, index_agreement)}></i></p>
																						:
																						<p className='m-0'>0</p>
																					}
																					</>
																				}
																			</td>
																		))
																	}
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
			</div>
		)
}