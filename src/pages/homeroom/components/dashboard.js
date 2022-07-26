import { useEffect, useState } from 'react';
import Base from '../../../utils/base';


export default function HomeroomDashboard({rank_student_arr, schedule_lesson_day_arr, schedule_lesson_time_arr, schedule_arr, school_subject_arr, search, changeSearch}){
	var base = new Base()

	return(
		<div className='row'>
			{/* <div className='col-12'>
				<div className='row'>
					<div className='col-12 col-lg-6'>
						<DashboardList data_arr={rank_student_arr} type={'rank'} title={'Rank Student by Grade'} />
					</div>

					<div className='col-12 col-lg-6 mt-3 mt-lg-0'>
						<DashboardList data_arr={[]} type={'todo_list'} title={'To Do List'} />
					</div>
				</div>
			</div> */}

			<div className='col-12'>
				<div className="card rounded shadow-sm">
					<div className={"card-body p-0"}>
						<div className={'row m-0'}>
							<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
							<div className='col-12 p-3 pt-4'>
								<div className='row m-0'>
									<div className='col-12 mb-3 pr-3'>
										<div className='row m-0'>
											<div className='col-12 col-lg px-0 px-lg-3'>
												<h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Student Lesson</h5>
											</div>
										</div>
									</div>
									<div className='col-12 px-0 px-lg-3'>
										<div className="table-responsive">
											<table className="w-100" style={{height : '10rem'}}>
												<tbody>
													<tr>
														<td className='position-sticky bg-white' style={{width : '4rem', left : 0}}></td>
														{
															schedule_lesson_time_arr.map((data_time, index_time)=>(
																<td style={{width : '4rem', fontSize : '.7rem'}} key={index_time}>{ data_time.id }</td>
															))
														}
													</tr>

													{
														schedule_lesson_day_arr.map((day_data, day_index)=>(
															<tr key={day_index}>
																<td style={{width : '4rem', verticalAlign : 'middle', height : '2rem', fontSize : '.7rem', left : 0}} className="text-center position-sticky bg-white">{day_data.name}</td>
																{
																	schedule_lesson_time_arr.map((data_time, index_time)=>(
																		<>
																		{
																			schedule_arr[day_data.id] != null &&
																			<>
																			{
																				schedule_arr[day_data.id][data_time.id] != null && schedule_arr[day_data.id][data_time.id].type === 'event_schedule' && day_index === 0 && schedule_arr[day_data.id][data_time.id].flag ?
																				<td style={{height: '10rem'}} rowSpan={schedule_lesson_day_arr.length} colSpan={schedule_arr[day_data.id][data_time.id].span}>
																					<div className="rounded-lg w-100 h-100 py-1 px-2 d-flex align-items-center justify-content-center" style={{backgroundColor : '#EBEFE2', cursor : 'pointer', width : '4rem'}}>
																							<p className="m-0 font-weight-bold text-center" style={{color: '#B6C0A0', fontSize: '.7rem'}}>{schedule_arr[day_data.id][data_time.id].name}</p>
																					</div>
																				</td>
																				:
																				schedule_arr[day_data.id][data_time.id] != null && schedule_arr[day_data.id][data_time.id].type === 'schedule' && schedule_arr[day_data.id][data_time.id].flag ?
																				<td colSpan={schedule_arr[day_data.id][data_time.id].span} style={{height : '2rem', width : '4rem'}}>
																					<div className="rounded-lg h-100 w-100 py-1 px-2 d-flex align-items-center justify-content-center" style={{backgroundColor : '#EBEFE2', cursor : 'pointer'}}>
																							<p className="m-0 font-weight-bold" style={{color: '#B6C0A0', fontSize: '.7rem'}}>{ schedule_arr[day_data.id][data_time.id].subject.name }</p>
																					</div>
																				</td>
																				: schedule_arr[day_data.id][data_time.id] == null ?
																				<td style={{height: '2rem'}}>
																					<div className="rounded-lg h-100 w-100" style={{backgroundColor: '#F7F7F7'}}></div>
																				</td>
																				: <></>
																			}
																			</>
																		}
																		</>
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

			<div className='col-12 mt-5'>
				<div className="card rounded shadow-sm">
					<div className={"card-body p-0"}>
						<div className={'row m-0'}>
							<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
							<div className='col-12 p-3 pt-4'>
								<div className='row m-0'>
									<div className='col-12 mb-3 pr-3'>
										<div className='row m-0'>
											<div className='col-12 col-lg px-0 px-lg-3'>
												<h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>School Subject</h5>
											</div>
										</div>
									</div>
									<div className='col-12'>
										<div className='row m-0'>
											<div className='col px-0 px-lg-3'>
												<div className="input-group border rounded">
													<div className="input-group-prepend">
														<span className="input-group-text bg-white border-0 bg-transparent pr-0" id="basic-addon1"><i className="bi bi-search"></i></span>
													</div>
													<input type="text" className="form-control border-0 bg-transparent" placeholder="Search" aria-describedby="basic-addon1" value={search} onChange={(e)=>changeSearch(e.target.value)} />
												</div>
											</div>
											<div className='col-auto d-flex align-items-center'>
												<p className='m-0' style={{color : 'black'}}><i className="bi bi-sort-up"></i> Sort</p>
											</div>
										</div>
									</div>
									<div className='col-12 mt-3 px-0 px-lg-3'>
										<div className='row m-0'>
											<div className='col-12'>
												<div className="table-responsive">
													<table className="table table-fixed-lg">
														<thead>
															<tr>
																<th className=''>ID</th>
																<th className=''>Subject</th>
																<th className=''>Lesson Plan</th>
																<th className=''>Teacher Assigned</th>
															</tr>
														</thead>
														<tbody>

															{
																school_subject_arr.map((data, index)=>(
																	<tr key={index}>
																		<td>{data.id}</td>
																		<td>{data.name}</td>
																		<td>{data.subject_type.name}</td>
																		<td>{data.teacher}</td>
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

			</div>

		</div>
	)
}

function DashboardList({title, data_arr, type}){
	const base = new Base()
	return(
		<div className="card rounded shadow-sm h-100">
			<div className={"card-body p-0"}>
				<div className={'row m-0'}>
					<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
					<div className='col-12 p-3 pt-4 pb-5'>
						<div className='row m-0'>
							<div className='col-12 mb-4'>
								<div className='row m-0'>
									<div className='col p-0 d-flex align-items-center'>
										<h5 className='m-0'>{title}</h5>
									</div>
								</div>
							</div>
							{
								data_arr.length > 0 ?
								<>
									{
										data_arr.map((data, index)=>(
											<div className={'col-12' + (index !== 0 ? ' mt-3' : '')} key={index}>
												<div className='row m-0'>
													{
														type === 'rank' ?
														<>
															<div className='col-auto p-0 d-flex align-items-center'>
																<p className='m-0' style={{color : 'black'}}>#{index+1}</p>
															</div>
															<div className='col-auto d-flex align-items-center justify-content-center'>
																<img src={data.class_student.user.image_display} style={{height : '3.5rem', width : '3.5rem', aspectRatio : 1, borderRadius : '3.5rem'}} />
															</div>
															<div className='col p-0 d-flex align-items-center'>
																<div>
																	<p className='m-0 text-capitalize' style={{color : 'black', fontFamily : 'InterBold'}}>{data.class_student.user.name}</p>
																	<p className='m-0 text-capitalize' style={{fontSize : '.75rem'}}>{data.class_student.user.id}</p>
																</div>
															</div>
															<div className='col p-0 d-flex align-items-center justify-content-end'>
																<h4 className='m-0 text-capitalize' style={{color : 'black', fontFamily : 'InterBold'}}>{data.total_score}</h4>
															</div>
														</>
														:
														<>
														<div className='col-auto p-0 d-flex align-items-center justify-content-center'>
															<div style={{height : '1.25rem', width : '1.25rem', border : '2px solid #8C9196', borderRadius : '.25rem'}}></div>
														</div>
														<div className='col d-flex align-items-center'>
															<p className='m-0 text-capitalize'>{data.title}</p>
														</div>
														</>
													}
												</div>
											</div>
										))
									}
								</>
								:
								<div className='col-12 text-center'>
									<h6 className='m-0' style={{color : 'black'}}>No Data</h6>
								</div>
							}
						</div>
					</div>
				</div>
				
			</div>
		</div>
	)
}