import { useEffect, useState, useMemo } from 'react';
import Base from '../../../utils/base';

import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import Header from '../../../components/header';

import HomeList from '../../../components/homeList';
import LessonBadge from '../../../components/lessonBadge';
import CustomBadge from '../../../components/customBadge';
import NoData from '../../../components/NoData';
import SelectOption from '../../../components/selectOption';
import NotAssigned from '../../../components/NotAssigned';
import LoadingData from '../../../components/loading';


export default function TrackerIndex(){
	var base = new Base()

	function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery()

	const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : '', name : ''}})

	const [class_arr, set_class_arr] = useState([])
	const [selected_class, set_selected_class] = useState('')

	const [selected_academic_year, set_selected_academic_year] = useState('')

	const [student_arr, set_student_arr] = useState([])

	const [subject_arr, set_subject_arr] = useState([])

	const [lesson_arr, set_lesson_arr] = useState([])

	const [is_loading, set_is_loading] = useState(true)
	const [is_loading_data, set_is_loading_data] = useState(true)

	const [activity_agreement, set_activity_agreement] = useState([])
	const [activity_submitted, set_activity_submitted] = useState({})
	const [counter, set_counter] = useState(0)
	const [is_prev, set_is_prev] = useState(false)
	const [is_next, set_is_next] = useState(false)

	const [arr_pagination, set_arr_pagination] = useState([])
	const [arr_pagination_selected, set_arr_pagination_selected] = useState('')
	const [today_page, set_today_page] = useState('')

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

	useEffect(()=>{
		if(user_data.id !== ''){
			if(selected_academic_year !== ''){
				// if(query.get('counter') != null){
				// 	if(query.get('counter') != ''){
				// 		set_counter(query.get('counter'))
				// 	}
				// 	else{
				// 		set_counter(0)
				// 	}
				// }
				// else{
				// 	set_counter(0)
				// }
				if(query.get('class_id') != null){
					set_selected_class(query.get('class_id'))
				}
				get_grade()
			}
		}
	}, [user_data, selected_academic_year])

	useEffect(()=>{
		if(selected_class !== ''){
			set_student_arr([])
			set_is_loading(true)
			set_is_loading_data(true)
			get_data()
			window.history.pushState({}, null, '/teacher-tracker?class_id=' + selected_class)
		}
	}, [selected_class, counter])

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

					if(data.length > 0){
						set_selected_class(data[0].id)
						set_class_arr(data)
					}

					set_is_loading(false)
				}
			}
		}
	}

	async function get_data(){
		var url = '/class/student-tracker?id=' + selected_class + '&counter=' + counter
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

				set_activity_submitted(assignment_submitted)
				set_activity_agreement(assignment_agreement)

				var pagination_arr = data.arr_lesson_schedule.arr_pagination

				for(var x in pagination_arr){
					pagination_arr[x].name = pagination_arr[x].start.lesson.name + ' - ' + pagination_arr[x].end.lesson.name
				}
				set_arr_pagination(pagination_arr)
				set_today_page(data.arr_lesson_schedule.today_page)

				if(counter === 0){
					var pagination_selected = ''
					pagination_selected = lessonDate_arr[0].lesson + ' - ' + lessonDate_arr[lessonDate_arr.length - 1].lesson
					set_arr_pagination_selected(pagination_selected)
				}

				
				setTimeout(() => {
					set_is_loading_data(false)
					set_is_prev(data.arr_lesson_schedule.previous_page)
					set_is_next(data.arr_lesson_schedule.next_page)
				}, 750);
			}
		}
	}

	function chooseGrade(index){
		set_counter(0)
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

	function navBtn(type){
		if(is_prev){
			if(type === 'prev'){
				set_counter(parseInt(counter)-1)
			}
		}
		if(is_next){
			if(type === 'next'){
				set_counter(parseInt(counter)+1)
			}
		}
	}

	function changePaginationLesson(value){
		var pagination_arr = arr_pagination
		var selected_counter = 0
		for(var x in pagination_arr){
			if(pagination_arr[x].name === value){
				selected_counter = parseInt(x) + 1
				set_counter(parseInt(selected_counter) - today_page)
				break
			}
		}
		set_arr_pagination_selected(value)
	}

	return(
		<div className='row'>

			<div className='col-12'>
				<Header title={'Teacher Tracker'} user_data={user_data} />
			</div>

			<div className='col-12 mt-0 mt-lg-4 pt-4'>
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
													<div className='col-auto mb-2 pr-0' key={index}>
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

							{
								!is_loading_data ?
								<div className='col-12 mt-2 d-flex align-items-center justify-content-end'>
									<div className='row'>
										<div className='col-auto pr-1'>
											<div className='d-flex align-items-center h-100'>
												<button className='btn btn-secondary shadow-sm px-3' style={{borderRadius : '5rem', color : '#4F4CD4'}} onClick={()=>navBtn('prev')} disabled={!is_prev}><i className="bi bi-arrow-left-short"></i> Prev Lesson</button>
											</div>
										</div>
										<div className='col-auto pl-1'>
											<SelectOption data_arr={arr_pagination} selected={arr_pagination_selected} title={'Lesson'} changeInput={(value)=>changePaginationLesson(value)} />
										</div>
										<div className='col-auto pl-1'>
											<div className='d-flex align-items-center h-100'>
												<button className='btn btn-secondary shadow-sm px-3' style={{borderRadius : '5rem', color : '#4F4CD4'}} onClick={()=>navBtn('next')} disabled={!is_next}>Next Lesson <i className="bi bi-arrow-right-short"></i></button>
											</div>
										</div>
									</div>
								</div>
								:
								<>
								</>
							}


							{
								is_loading_data ?
								<>
									<LoadingData />
								</>
								:
								<>
								<div className='col-12'>
									<div className='row'>
										{
											student_arr.map((data_student, index_student)=>(
												<div className='col-12' key={index_student}>
													<div className={'row m-0'}>
														<div className='col-12 p-3 pt-4'>
															<div className='row'>
																<div className='col-12'>
																	<div className='row'>
																		<div className='col'>
																			<div className='row'>
																				<div className='col-auto d-flex align-items-center'>
																					<img src={data_student.image_display} style={{height : '2.5rem', width : '2.5rem', borderRadius : '2.5rem'}} />
																				</div>
																				<div className='col d-flex align-items-center p-0'>
																					<p className='m-0'>{data_student.name}</p>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className='col-12 p-0 mt-2'>
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
																	</div>
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
							}

						</>
						:
						<>
						{
							selected_academic_year !== '' &&
							<div className='col-12 mt-5 pt-5'>
								{
									!is_loading &&
									<NotAssigned />
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