import { useEffect, useState } from 'react';
import Base from '../../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../../components/header';

import HomeList from '../../../components/homeList';
import LessonBadge from '../../../components/lessonBadge';
import CustomBadge from '../../../components/customBadge';
import NoData from '../../../components/NoData';
import SelectOption from '../../../components/selectOption';


export default function TrackerIndex(){
	var base = new Base()

	const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : '', name : ''}})

	const [class_arr, set_class_arr] = useState([])
	const [selected_class, set_selected_class] = useState('')

	const [academic_year_arr, set_academic_year_arr] = useState([])
	const [selected_academic_year, set_selected_academic_year] = useState('')
	const [selected_academic_year_name, set_selected_academic_year_name] = useState('')

	const [tracker_btn_arr] = useState([
		{icon : 'fas fa-chevron-circle-left', type : 'prev', margin : 'mr-2'},
		{icon : 'fas fa-chevron-circle-right', type : 'next', margin : 'ml-2'},
	])

	const [student_arr, set_student_arr] = useState([])

	const [subject_arr, set_subject_arr] = useState([])

	const [lesson_arr, set_lesson_arr] = useState([])

	const [submitted_data_arr, set_submitted_data_arr] = useState([])

	const [is_loading, set_is_loading] = useState(true)

	const [activity_agreement, set_activity_agreement] = useState([])
	const [activity_submitted, set_activity_submitted] = useState({})

	useEffect(async ()=>{
		var check_user = await base.checkAuth()
		set_user_data(check_user.user_data)
		set_selected_academic_year(check_user.user_data.current_academic_year.id)
	}, [])

	const [activity_status] = useState([
		{title : 'OK', color : '#60B158'},
		{title : 'MJ', color : '#CF91FF'},
		{title : 'MN', color : '#FF973C'},
		{title : 'S', color : '#5EB2FF'},
		{title : 'HS', color : '#FC5A5A'},
	])

	// useEffect(()=>{
	// 	if(user_data.id !== ''){
	// 		get_academic_year()
	// 	}
	// }, [user_data])

	useEffect(()=>{
		if(user_data.id !== ''){
			if(selected_academic_year !== ''){
				get_grade()
			}
		}
	}, [user_data, selected_academic_year])

	useEffect(()=>{
		if(selected_class !== ''){
			set_student_arr([])
			set_is_loading(true)
			get_data()
		}
	}, [selected_class])

	async function get_academic_year(){
		var url = '/academic-year/all'
		var response = await base.request(url)
		if(response != null){
			if(response.status == 'success'){
				var data = response.data
				set_academic_year_arr(data)
				set_selected_academic_year('')
			}
		}
	}

	async function get_grade(){
		if(selected_academic_year != ''){
			var url = '/academic-year/class?academic_year_id=' + selected_academic_year
			var response = await base.request(url)
			if(response != null){
				if(response.status == 'success'){
					var data = response.data.data
					for(var x in data){
						data[x].title = data[x].grade.name + ' ' + data[x].name
						data[x].is_selected = false
						data[0].is_selected = true
					}
					set_selected_class(data[0].id)
					set_class_arr(data)

					set_is_loading(false)
				}
			}
		}
	}

	async function get_data(){
		var url = '/class/student-tracker?id=' + selected_class
		var response = await base.request(url)
		if(response != null){
			if(response.status == 'success'){
				var data = response.data

				var lessonDate_arr = []
				for(let lessonSchedule of data.arr_lesson_schedule.arr){
					var day_name = base.moment(lessonSchedule.date).format('DD dddd')
					lessonDate_arr.push({id : lessonSchedule.id, day_name : day_name, lesson : lessonSchedule.lesson.name, lesson_id : lessonSchedule.lesson.id})
				}

				set_lesson_arr(lessonDate_arr)

				var student_data_arr = [], count_student = 0
				for(let student of data.arr_class_student){
					// student.is_show = (count_student == 0 ? true : false)
					var image_display = base.img_no_profile
					if(student.user.file_name != null){
						image_display = base.url_photo('user', student.user.file_name)
					}
					student_data_arr.push({id : student.user.id, name : student.user.name, class_student_id : student.id, image_display : image_display})
					count_student++
				}
				set_student_arr(student_data_arr)

				var subject_data_arr = []
				for(let subject of data.arr_subject){
					subject_data_arr.push({id : subject.id, name : subject.name})
				}
				set_subject_arr(subject_data_arr)

				var submitted_arr = []
				var assignment_submitted = data.arr_assignment_submitted
				var assignment_agreement = data.arr_assignment_agreement

				// for(var x in assignment_submitted){
				// 	submitted_arr[x] = {}
				// 	var submitted = assignment_submitted[x]
				// 	for(var y in submitted){
				// 		submitted_arr[x][y] = {}
				// 		var lesson = submitted[y]
				// 		for(var z in lesson){
				// 			if(lesson[z] != null){
				// 				lesson[z].assessment_status.badge_type = (lesson[z].assessment_status.data === 'done' ? 'success' : lesson[z].assessment_status.data === 'on_checking' ? 'warning' : lesson[z].assessment_status.data === 'need_correction' ? 'info' : '')
				// 			}
				// 			submitted_arr[x][y][z] = lesson[z]
				// 		}
				// 	}
				// }

				set_activity_submitted(assignment_submitted)
				set_activity_agreement(assignment_agreement)
				set_submitted_data_arr(submitted_arr)
			}
		}
	}

	function chooseGrade(index){
		var data_index = class_arr[index]
		var initSelected = data_index.is_selected
		for(var x in class_arr){
			class_arr[x].is_selected = false
		}
		class_arr[index].is_selected = true
		if(class_arr[index].is_selected)
			set_selected_class(class_arr[index].id)

		base.update_array(class_arr, set_class_arr, data_index, index)
	}

	function trackerBtn(type){

	}

	function toggle_table(index){
		var data_index = student_arr[index]
		var initShow = data_index.is_show
		for(var x in student_arr){
			student_arr[x].is_show = false
		}
		student_arr[index].is_show = !initShow
		base.update_array(student_arr, set_student_arr, data_index, index)
	}

	function changeAcademicYear(value){
		set_selected_academic_year(value)
		var academic_year_selected = {id : '', name : ''}
		for(var x in academic_year_arr){
			if(academic_year_arr[x].id === value){
				academic_year_selected = academic_year_arr[x]
			}

		}
		set_selected_academic_year_name(academic_year_selected.name)
	}

	return(
		<div className='row'>

			<div className='col-12'>
				<Header title={'Teacher Tracker'} user_data={user_data} />
			</div>

			<div className='col-12 mt-5 pt-4'>
				<div className='row'>
					{
						class_arr.length > 0 ?
						<>
							<div className='col-12 mt-3'>
								<div className='row'>
									<div className='col-12 col-lg'>
										<div className='row'>
											{
												class_arr.map((data, index)=>(
													<div className='col-auto mb-2' key={index}>
														<div className={'gradePicker' + (data.is_selected ? ' selected' : '')} onClick={()=>chooseGrade(index)}>
															<p className='m-0'>{data.title}</p>
														</div>
													</div>
												))
											}
										</div>
									</div>
									<div className='col-12 col-lg mt-2 d-flex align-items-center justify-content-end'>
										<div className='row m-0'>
											{
												activity_status.map((data_status, index_status)=>(
													<div className='col-auto' key={index_status}>
														<div className='row'>
															<div className='col-auto pr-2 d-flex align-items-center'>
																<i class="bi bi-circle-fill" style={{color : data_status.color, fontSize : '.75rem'}}></i>
															</div>
															<div className='col-auto p-0 d-flex align-items-center'>
																<p className='m-0'>{data_status.title}</p>
															</div>
														</div>
													</div>
												))
											}
										</div>
									</div>
								</div>
							</div>

							<div className='col-12 mt-2'>
								<div className='row'>
									{
										student_arr.map((data_student, index_student)=>(
											<div className='col-12' key={index_student}>
												<div className={'row m-0'}>
													<div className='col-12 p-3 pt-4'>
														<div className='row'>
															<div className='col-12'>
																<div className='row'>
																	<div className='col-auto d-flex align-items-center'>
																		<img src={data_student.image_display} style={{height : '2.5rem', width : '2.5rem', borderRadius : '2.5rem'}} />
																	</div>
																	<div className='col d-flex align-items-center p-0'>
																		<p className='m-0'>{data_student.name}</p>
																	</div>
																</div>
															</div>
															<div className='col-12 p-0 mt-3'>
																<div className="table-responsive rounded">
																	<table class="table table-striped table-borderless m-0 bg-white">
																		<thead>
																			<tr>
																				<th className='border-0 align-middle' style={{color : '#8A92A6', width : '6rem'}}>
																					<p className='text-primary m-0'>Subject</p>
																				</th>
																				{
																					lesson_arr.map((data, index)=>(
																						<th className='border-0 px-0 text-center' style={{color : '#8A92A6', width : '6rem'}} key={index}>
																							<p className='m-0'>{data.lesson}</p>
																						</th>
																					))
																				}
																			</tr>
																		</thead>
																		<tbody>
																			{
																				subject_arr.map((data_subject, index_subject)=>(
																					<tr key={index_subject}>
																						<td className='p-2 px-4 align-middle td-fit-content'>
																							<p className='m-0'>{data_subject.name}</p>
																						</td>

																						{
																							lesson_arr.map((data_lesson, index_lesson)=>(
																								<td className={'m-0 p-0' + (activity_agreement[data_lesson.lesson_id] == null ? ' align-middle' : '')}>
																									<div className='row m-0'>
																										{
																											activity_agreement[data_lesson.lesson_id] != null &&
																											<>
																												{
																													activity_agreement[data_lesson.lesson_id][data_subject.id] != null ?
																													<>
																														{
																															activity_agreement[data_lesson.lesson_id][data_subject.id].map((data_activity, index_activity)=>(
																																<>
																																	{
																																		activity_submitted[data_student.class_student_id] != null &&
																																		<>
																																			{
																																				activity_submitted[data_student.class_student_id][data_subject.id] != null &&
																																				<>
																																				<div className='col-12' key={index_activity} style={{backgroundColor : (activity_submitted[data_student.class_student_id][data_subject.id][data_lesson.id][data_activity.id] != null ? activity_submitted[data_student.class_student_id][data_subject.id][data_lesson.id][data_activity.id].status_color : '')}}>
																																				{
																																					activity_submitted[data_student.class_student_id][data_subject.id] != null &&
																																					<>
																																					{
																																						activity_submitted[data_student.class_student_id][data_subject.id] != null &&
																																						<>
																																						{
																																							activity_submitted[data_student.class_student_id][data_subject.id][data_lesson.id] != null &&
																																							<>
																																							<p className='m-0' style={{color : (activity_submitted[data_student.class_student_id][data_subject.id][data_lesson.id][data_activity.id] != null ? activity_submitted[data_student.class_student_id][data_subject.id][data_lesson.id][data_activity.id].text_color : '')}}>
																																								{
																																									data_activity.type === 'assignment' ? data_activity.name : data_activity.title
																																								}
																																							</p>
																																							</>
																																						}
																																						</>
																																					}
																																				</>
																																				}
																																				</div>
																																			</>
																																			}
																																		</>
																																	}
																																</>
																															))
																														}
																													</>
																													:
																													<>
																													<div className='col-12 text-center'>
																														{/* <h5 className='m-0'><i className="fas fa-lock text-white"></i></h5> */}
																													</div>
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
																			<tr>
																			</tr>
																		</tbody>
																	</table>
																	{/* <table className="table table-borderless w-100">
																		<tbody>
																				{
																					subject_arr.map((data_subject, index_subject)=>(
																						<tr key={index_subject}>
																							<td className='p-2 align-middle border-0 td-fit-content'>
																								<p className='m-0'>{data_subject.name}</p>
																							</td>

																							{
																								lesson_arr.map((data, index)=>(
																									<td className='p-2 align-middle' key={index}>
																										<div className='h-100 px-2'>
																											<div className='m-0 p-2 px-3 rounded' style={{backgroundColor : '#F7F7F7', height : '2.5rem'}}></div>
																										</div>
																									</td>
																								))
																							}
																						</tr>
																					))
																				}
																		</tbody>
																	</table> */}
																</div>
																{/* <div className="table-responsive">
																	<table className="table table-borderless w-100">
																		<thead>
																			<tr>
																				<th className='border-0 align-middle' style={{color : '#8A92A6', width : '6rem'}}>
																					<h5 className='text-primary m-0'>{base.moment().format('MMMM')}</h5>
																				</th>
																				{
																					lesson_arr.map((data, index)=>(
																						<th className='border-0 px-0 text-center' style={{color : '#8A92A6', width : '6rem'}} key={index}>
																							<p className='m-0'>{data.day_name}</p>
																							<p className='mb-0 text-secondary' style={{fontSize : '.75rem'}}>{data.lesson}</p>
																						</th>
																					))
																				}
																			</tr>
																		</thead>
																		<tbody>
																			{
																				student_arr.map((data, index)=>(
																					<tr key={index}>
																						<td className='px-0 pt-0' colSpan={lesson_arr.length + 1}>
																							<div className='p-2 d-flex align-items-center' onClick={()=>toggle_table(index)} style={{height : '3rem', backgroundColor : '#EBEFE2', cursor : 'pointer', color : '9FA2B4'}}>
																								{data.name}
																								<i className={"ml-3 fas fa-chevron-" + (data.is_show ? 'up' : 'down')}></i>
																							</div>

																							{
																								data.is_show &&
																								<>
																									{
																										subject_arr.map((dataSubject, indexSubject)=>(
																											<tr key={indexSubject}>
																												<td className='text-primary'><i class="bi bi-circle-fill mr-2"></i> {dataSubject.name}</td> 
																												
																												{
																													lesson_arr.map((dataSubmitted, indexSubmitted)=>(
																														<td className='text-center px-0' style={{width : '6rem'}} key={indexSubmitted}>
																															<div className="">
																																{
																																	submitted_data_arr[data.id] != null &&
																																	<>
																																		{
																																			submitted_data_arr[data.id][dataSubject.id][dataSubmitted.id] != null &&
																																			<span className={"badge badge-pill p-2 px-3 rounded badge-" + (submitted_data_arr[data.id][dataSubject.id][dataSubmitted.id].assessment_status.badge_type)}>{submitted_data_arr[data.id][dataSubject.id][dataSubmitted.id].assessment_status.name}</span>
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
																								</>
																							}
																						</td>
																					</tr>
																				))
																			}
																		</tbody>
																	</table>
																</div> */}
															</div>
														</div>
													</div>
												</div>
											</div>

										))
									}
								</div>
							</div>
						</>
						:
						<>
						{
							selected_academic_year !== '' &&
							<div className='col-12 mt-5 pt-5'>
								{
									!is_loading &&
									<NoData />
								}
							</div>
						}
						</>
					}
				</div>
			</div>


		</div>
	)
}

function BadgeTable({title, type}){
	const bgColor = (type === 'success' ? '#CEF2CE' : type === 'warning' ? '#FFF2CA' : '')
	const textColor = (type === 'success' ? '#44A244' : type === 'warning' ? '#E6BA34' : '')
	return (
		<div className='h-100 px-2'>
			<div className='m-0 p-2 px-3' style={{backgroundColor : bgColor, borderRadius : '1rem'}}>
				<p className='m-0 font-weight-bold text-center' style={{color : textColor, fontSize : '.75rem', lineHeight : '1rem'}}>{title}</p>
			</div>
		</div>
	)
}