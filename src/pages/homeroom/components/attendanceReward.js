import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';


export default function HomeroomAttendanceReward({term_arr, term_selected, changeTerm, reward_arr, date_arr, attendance_reward_month, class_student_arr, arr_point, toggleStudent, attendance_reward_nav_btn, changeOffset}){
	var base = new Base()

	return(
		<div className='row'>

			<div className='col-12'>
				<div className="card rounded shadow-sm">
					<div className={"card-body p-0"}>
						<div className={'row m-0'}>
							<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
							<div className='col-12 p-3 pt-4'>
								<div className='row m-0'>
									<div className='col-12 mb-3 pr-3'>
										<div className='row m-0'>
											<div className='col-12 col-lg-auto d-flex align-items-center h-100'>
												<SelectOption
													data_arr={term_arr} 
													selected={term_selected}
													title={'Term'}
													changeInput={(value)=>changeTerm(value)}
												/>
											</div>
											<div className='col-12 col-lg'>
												<div className='row h-100'>
													{
														attendance_reward_nav_btn.map((data, index)=>(
															<div className={'col-auto p-0 ' + data.margin}>
																	<div className='d-flex align-items-center h-100'>
																		<h4 className='m-0' style={{cursor : 'pointer'}} onClick={()=>changeOffset(data.type)}><i className={data.icon + " text-secondary"}></i></h4>
																	</div>
															</div>
														))
													}
												</div>
											</div>
										</div>
									</div>
									<div className='col-12'>
										<div className="table-responsive">
											<table className="table w-100 table-borderless">
												<thead>
													<tr style={{backgroundColor : '#EBEFE2'}}>
														<td style={{width : '6rem'}}></td>
														<td></td>
														<td className='text-center' colSpan={date_arr.length + 1}>{attendance_reward_month}</td>
													</tr>
													<tr style={{backgroundColor : '#EBEFE2'}}>
														<td style={{width : '6rem'}}></td>
														<td className='text-center'>Total</td>
														{
															date_arr.map((data_date, index_date)=>(
																<td className='text-center' key={index_date}>{base.moment(data_date).format('D')}</td>
															))
														}
													</tr>
												</thead>
												<tbody>
													{
														class_student_arr.map((data_student, index_student)=>(
															<>
																<tr style={{backgroundColor : '#F3F4F6', cursor : 'pointer'}} onClick={()=>toggleStudent(index_student)}>
																	<td className='td-fit-content py-0'>
																		<div className='d-flex align-items-center' style={{height : '3rem', color : '9FA2B4'}}>
																			{data_student.user.name}
																			<i className={"ml-3 fas fa-chevron-" + (data_student.is_show ? 'up' : 'down')}></i>
																		</div>
																	</td>
																	<td className='py-0' colSpan={date_arr.length + 2}></td>
																</tr>
																{
																	data_student.is_show &&
																	<>
																	{
																		reward_arr.map((data_reward, index_reward)=>(
																			<tr key={index_reward}>
																				<td className=''>{data_reward.name}</td>
																				<td className='text-center'>
																					{
																						arr_point[data_student.id] != null &&
																						<>
																							{
																								arr_point[data_student.id][data_reward.id] != null &&
																								<>
																								{
																									arr_point[data_student.id][data_reward.id]['total'] != null &&
																									<>
																									<span className={"badge badge-pill p-1 px-2 rounded badge-success"}>{arr_point[data_student.id][data_reward.id]['total']}</span>
																									</>
																								}
																								</>
																							}
																						</>
																					}
																				</td>
																				{
																					date_arr.map((data_date, index_date)=>(
																						<td className='text-center' key={index_date}>
																							{
																								arr_point[data_student.id] != null &&
																								<>
																									{
																										arr_point[data_student.id][data_reward.id] != null &&
																										<>
																										{
																											arr_point[data_student.id][data_reward.id][data_date] != null ?
																											<>
																											<span className={"badge badge-pill p-1 px-2 rounded badge-" + (arr_point[data_student.id][data_reward.id][data_date].amount === '0' ? 'danger' : arr_point[data_student.id][data_reward.id][data_date].amount === '1' ? 'success' : arr_point[data_student.id][data_reward.id][data_date].amount === 'P' ? 'info' : '')}>{arr_point[data_student.id][data_reward.id][data_date].amount}</span>
																											</>
																											:
																											<span className={"badge badge-pill p-1 px-2 rounded badge-danger"}>{0}</span>
																										}
																										</>
																									}
																								</>
																							}
																						</td>
																					))
																				}
																			</tr>
																		))
																	}
																	</>
																}
															</>
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