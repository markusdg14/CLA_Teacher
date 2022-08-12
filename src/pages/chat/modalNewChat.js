import { useEffect, useState } from 'react';
import SelectOption from '../../components/selectOption';
import Base from '../../utils/base';
import Select from 'react-select'

export default function ModalNewChat(){
	var base = new Base()
	const [user_type_arr, set_user_type_arr] = useState([{title : 'Teacher', id : 'teacher', is_checked : false}, {title : 'Student', id : 'student', is_checked : false}])
	const [user_type_selected, set_user_type_selected] = useState('')
	const [user_arr, set_user_arr] = useState([])
	const [user_selected, set_user_selected] = useState('')

	useEffect(()=>{
		if(user_type_selected !== ''){
			set_user_arr([])
			get_user_list()
		}
	}, [user_type_selected])

	async function changeInput(val, type){
		if(type === 'user_type'){
			var index_selected = user_type_arr[val]
			var init_selected = index_selected.is_checked
			for(var x in user_type_arr){
				user_type_arr[x].is_checked = false
			}
	
			user_type_arr[val].is_checked = !init_selected
			if(user_type_arr[val].is_checked){
				set_user_type_selected(user_type_arr[val].id)
			}
			base.update_array(user_type_arr, set_user_type_arr, index_selected, val)
		}
		else if(type === 'user'){
			set_user_selected(val.id)
		}
	}

	async function get_user_list(){
		var url = '/user/' + user_type_selected + '/all'

		var response = await base.request(url)
		if(response != null){
			if(response.status == 'success'){
				var data = response.data
				for(var x in data){
					data[x].label = data[x].name
					data[x].value = data[x].id
				}

				set_user_arr(data)
			}
		}
	}

	async function createRoom(){
		var url = '/chat'
		var data_post = {
			user : {id : user_selected}
		}

		var response = await base.request(url, 'post', data_post)
		if(response != null){
			if(response.status == 'success'){
				window.location.href = '/chat-room?id=' + response.data.id
			}
		}
	}

	return(
		<>
			<div className="modal fade" id="modalNewChat" tabIndex="-1" aria-labelledby="modalNewChatLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg">
					<div className="modal-content rounded border-0 shadow-sm">
						<div className="modal-body p-0">
							<div className={'row m-0'}>
								<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
								<div className='col-12 p-3 pt-4 pb-5'>
									<div className='row m-0'>
										<div className='col-12 mb-3'>
											<h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Add Chat Room</h5>
										</div>
										<div className='col-12 mt-3 p-0'>
											<div className='row m-0'>
												<div className='col-12'>
													<p className='m-0' style={{fontSize : '1.25rem', color : 'black'}}>Pick user</p>
													<div className='row mt-2'>
														{
															user_type_arr.map((data, index)=>(
																<div className='col-auto' key={index}>
																	<div className="form-check">
																		<input className="form-check-input" type="radio" name="exampleRadios" id={'radio-' + data.id} value={data.id} checked={data.is_checked} onChange={()=>changeInput(index, 'user_type')} />
																		<label className="form-check-label" htmlFor={'radio-' + data.id} style={{color : 'black'}}>
																			{data.title}
																		</label>
																	</div>
																</div>
															))
														}
													</div>
												</div>

												{
													user_type_selected !== '' &&
													<div className='col-12 mt-3'>
														<p className='m-0 text-capitalize' style={{fontSize : '1.25rem', color : 'black'}}>{user_type_selected} Name</p>
														<div className='row mt-2'>
															<div className='col'>
																<Select options={user_arr} onChange={(value)=>changeInput(value, 'user')} />
															</div>
														</div>
													</div>
												}
											</div>
										</div>

										<div className='col-12 mt-3'>
											<button className='btn btn-primary rounded py-2 px-5' onClick={()=>createRoom()}>Create</button>
										</div>
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