import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import NoData from '../../../components/NoData';


export default function CheckAssignment(){
	var base = new Base()

	const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})

	const [tab_arr, set_tab_arr] = useState([
		{title : 'Need to Check', id : 'check', is_active : true},
		{title : 'All Activity', id : 'all', is_active : false},
	])
	const [active_tab, set_active_tab] = useState('check')
	const [data_type, set_data_type] = useState('on_checking')

	const [data_arr, set_data_arr] = useState([])

	const [search, set_search] = useState('')

	useEffect(async ()=>{
		var check_user = await base.checkAuth()
		set_user_data(check_user.user_data)
	}, [])

	// useEffect(async ()=>{
	//     if(user_data.id !== ''){
	//         get_data()
	//     }
	// }, [user_data])

	useEffect(async ()=>{
		get_data()
	}, [data_type, search])

	async function get_data(){
		var url = '/assessment/assignment?assessment_status=' + data_type + '&search=' + search
		var response = await base.request(url)
		if(response != null){
			if(response.status == 'success'){
				var data = response.data.data
				for(var x in data){
					data[x].user.image_display = base.img_no_profile
					if(data[x].user.file_name != null){
						data[x].user.image_display = base.url_photo('user', data[x].user.file_name)
					}

					data[x].grade = data[x].class_student.class_model.grade.name + data[x].class_student.class_model.name
					if(data[x].assignment_agreement != null){
						data[x].subject_lesson = data[x].assignment_agreement.assignment_group.subject.name + ' ' + data[x].assignment_agreement.assignment_group.lesson.name
						data[x].grade = data[x].assignment_agreement.assignment_group.grade.name
					}
					else {
						data[x].subject_lesson = data[x].task_agreement.project_agreement.subject.name
						data[x].grade = data[x].task_agreement.project_agreement.grade.name
					}
					data[x].submitted_date_format = base.moment(data[x].created_at).format('DD/MM HH:mm')

					data[x].checked_date_format = '-'

					if(data[x].teacher != null) {
						data[x].checked_date_format = base.moment(data[x].updated_at).format('DD/MM HH:mm')
					}
				}
				set_data_arr(data)
			}
		}
	}

	function chooseTab(index){
		set_search('')
		var data_index = tab_arr[index]
		var initActive = data_index.is_active
		for(var x in tab_arr){
			tab_arr[x].is_active = false
		}
		tab_arr[index].is_active = !initActive
		set_data_arr([])
		// set_tab_arr(tab_arr)

		if(tab_arr[index].is_active){
			set_active_tab(tab_arr[index].id)
			set_data_type((tab_arr[index].id === 'all' ? '' : 'on_checking'))
		}
		base.update_array(tab_arr, set_tab_arr, data_index, index)
	}

	function changeSearch(value){
		set_search(value)
	}


	return(
		<div className='row'>

			<div className='col-12'>
				<Header title={'Check Activity'} user_data={user_data} />
			</div>

			<div className='col-12 mt-5 pt-4'>
				<div className='row'>
					<div className='col-12'>
						<ul className="nav nav-tabs" id="myTab" role="tablist">
							{
								tab_arr.map((data, index)=>(
									<li className="nav-item" key={index}>
										<a className={"nav-link" + (data.is_active ? ' active' : '')} id={data.id + "-tab"} data-toggle="tab" href={"#" + data.id} role="tab" aria-controls={data.id} aria-selected={'false'} onClick={()=>chooseTab(index)}>{data.title}</a>
									</li>
								))
							}
						</ul>
						<div className="tab-content mt-4" id="myTabContent">
							<div className={"tab-pane fade show active"} id={active_tab} role="tabpanel" aria-labelledby={active_tab + "-tab"}>
								<div className="card rounded shadow-sm">
									<div className={"card-body p-0"}>
										<div className={'row m-0'}>
											<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
											<div className='col-12 p-3 pt-4'>
												{
													data_arr.length > 0 ?
													<>
													<div className='row m-0'>
														<div className='col-12 mb-3'>
															<div className='row'>
																<div className='col'>
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
														<div className='col-12'>
															<div className="table-responsive">
																<table className="table table-striped">
																	<thead>
																		<tr>
																		<th style={{fontFamily : 'InterBold', color : '#6B7280'}}>Nama Student</th>
																		<th style={{fontFamily : 'InterBold', color : '#6B7280'}}>Grade</th>
																		<th style={{fontFamily : 'InterBold', color : '#6B7280'}}>Subject Lesson</th>
																		<th style={{fontFamily : 'InterBold', color : '#6B7280'}}>Activity</th>
																		<th style={{fontFamily : 'InterBold', color : '#6B7280'}}>Submitted</th>
																		{
																			active_tab === 'all' &&
																			<th style={{fontFamily : 'InterBold', color : '#6B7280'}}>Checked</th>
																		}
																		<th style={{fontFamily : 'InterBold', color : '#6B7280'}}></th>
																		</tr>
																	</thead>
																	<tbody>
																	{
																		data_arr.map((data, index)=>(
																			<tr key={index}>
																				<td className='td-fit-content align-middle'>
																					<img src={data.user.image_display} className={'d-none d-lg-inline-block mr-3'} style={{height : '3rem', width : '3rem', aspectRatio : 1}} />
																					<p className='m-0 d-lg-inline-block text-capitalize'>{data.user.name}</p>
																				</td>
																				<td className='td-fit-content align-middle'>
																					<p className='m-0'>{data.grade}</p>
																				</td>
																				<td className='td-fit-content align-middle'><p className='m-0' style={{color : 'black'}}>{data.subject_lesson}</p></td>
																				<td className='td-fit-content align-middle'><p className='m-0' style={{color : 'black'}}>{
																					data.assignment_agreement != null ? data.assignment_agreement.name : data.task_agreement.title + ' - ' + data.task_agreement.project_agreement.name}</p></td>
																				<td className='td-fit-content align-middle'><p className='m-0' style={{color : 'black'}}>{data.submitted_date_format}</p></td>
																				{
																					active_tab === 'all' &&
																					<td className='td-fit-content align-middle'>
																						{
																							data.teacher != null ?
																							<p className='m-0' style={{color : 'black'}}>{data.checked_date_format} by {data.teacher.name}</p>
																							:
																							<p className='m-0' style={{color : 'black'}}>-</p>
																						}
																					</td>
																				}
																				<td className='td-fit-content align-middle'>
																					<a href={'/check-activity/detail?id=' + data.id + '&type=' + data.type} className='btn btn-sm btn-primary rounded py-2 px-4 shadow-sm'>View</a>
																				</td>
																			</tr>
																		))
																	}
																	</tbody>
																</table>
															</div>
														</div>
													</div>
													</>
													:
													<div className='mt-5 pt-3'>
														<NoData bg={'none'} />
													</div>
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