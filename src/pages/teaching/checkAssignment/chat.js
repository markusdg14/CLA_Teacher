import React, { useEffect, useState } from 'react';
import Base from '../../../utils/base';

import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import Header from '../../../components/header';
import CustomBadge from '../../../components/customBadge';
import LessonHeader from '../../../components/lessonHeader';


export default function CheckAssignmentChat(){
    var base = new Base()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})
    const [assignment_data, set_assignment_data] = useState({
        id : '', name : '',
		user : {id : '', name : ''},
        assessment_status : {id : '', name : ''},
        assignment_agreement : {name : ''},
        task_agreement : {title : '', project_agreement : {name : ''}},
        activity_name : ''
	})
    const [message, set_message] = useState('')
    const [chat_arr, set_chat_arr] = useState([])
    const [socket, set_socket] = useState(null)

    function useQuery(){
        const {search} = useLocation()
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()
    
    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
        set_socket(base.io(base.host + ':6003', {}))
    }, [])

    useEffect(() => {
      if(socket != null){
        socket.removeAllListeners()

        socket.emit('subscribe', {
          channel: 'new_chat.' + query.get('chat_id'),
        }).on('App\\Events\\NewChatEvent', function(channel, data) {
            var new_chat = JSON.parse(JSON.stringify(data.chat_room))
            if(new_chat.sender_id !== user_data.id){
                base.$("#chat_box").animate({ scrollTop: base.$('#chat_box').prop("scrollHeight")}, 150);

                // chat_arr.unshift(new_chat)
                // set_chat_arr(chat_arr)
                base.unshift_array(chat_arr, set_chat_arr, new_chat)
            }
        })
      }
    }, [chat_arr, socket,])

    useEffect(()=>{
		if(user_data.id !== ''){
            get_data()
		}
	}, [user_data])

    useEffect(()=>{
        if(assignment_data.id !== ''){
            get_chat()
        }
    }, [assignment_data])

    useEffect(()=>{
        base.$("#chat_box").animate({ scrollTop: base.$('#chat_box').prop("scrollHeight")}, 150);
    }, [chat_arr])

    async function get_data(){
		var url = '/assessment/assignment?id=' + query.get('id')
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                data.activity_name = ''
                if(query.get('type') === 'task'){
                    data.activity_name = data.task_agreement.project_agreement.name + ' - ' + data.task_agreement.title
                }
                else if(query.get('type') === 'assignment'){
                    data.activity_name = data.assignment_agreement.name
                }
                set_assignment_data(data)                
            }
        }
	}

    async function get_chat(){
        var url = '/chat/room?chat_id=' + query.get('chat_id')
		var response = await base.request(url)
		if(response != null){
			if(response.status == 'success'){
				var response_data = response.data.data
                set_chat_arr(response_data)
            }
        }
    }

    async function changeMessage(value){
        set_message(value)
    }

    async function sendMessage(e){
        e.preventDefault()
        if(message !== ''){
            var url = '/chat/room'

            var data = {
                chat : {id : query.get('chat_id')},
                message : message
            }

            var response = await base.request(url, 'post', data)
            if(response != null){
                if(response.status == 'success'){
                    base.$("#chat_box").animate({ scrollTop: base.$('#chat_box').prop("scrollHeight")}, 150);
                    var new_chat = {
                        sender_id : user_data.id,
                        message : message,
                        created_at : base.moment().format()
                    }

                    chat_arr.unshift(new_chat)
                    // base.add_array(chat_arr, set_chat_arr, new_chat)
                    set_message('')

                }
            }
        }
    }

    function backBtn(){
        window.history.back()
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Lesson 1 - Math'} user_data={user_data} />
            </div>

            {/* <div className='col-12 mt-5 pt-4'>
                <LessonHeader title={'Correction Needed'} type={'warning'} backBtn={()=>backBtn()} />
            </div> */}
            <div className='col-12 mt-5 pt-4'>
				<LessonHeader title={assignment_data.assessment_status.name} backBtn={()=>backBtn()} />
			</div>

            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className='row m-0'>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-12 p-4' style={{borderBottom : '1px solid #eaeaea'}}>
                                        <img className='position-absolute' src={base.img_leaves} style={{height : '5rem', top : '-.25rem', right : 0}} />

                                        
                                        <div className='row m-0'>
                                            <div className='col-auto'>
                                                <img src={base.img_no_profile} style={{height : '3.5rem', aspectRatio : 1, borderRadius : '3.5rem'}} />
                                            </div>
                                            <div className='col p-0 d-flex align-items-center '>
                                                <div>
                                                    <p className='m-0 font-weight-bold' style={{color : 'black'}}>{assignment_data.user.name}</p>
                                                    <p className='mb-0' style={{color : 'black', fontSize : '.75rem'}}><i className="fas fa-circle mr-2" style={{color : '#68D391'}}></i>Online</p>
                                                </div>
                                            </div>
                                            <div className='col-auto px-4 mt-3 mt-lg-0'>
                                                <div className='bg-ea text-center px-5 py-2' style={{borderRadius : '.5rem', zIndex : 1000}}>
                                                    <p className='m-0 font-weight-bold' style={{color : 'black'}}>{assignment_data.activity_name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 p-0' style={{maxHeight : '35rem', overflowY : 'scroll', overflowX : 'hidden'}} id={'chat_box'}>
                                        <div className='row'>
                                            <div className='col-12 p-4' style={{borderBottom : '1px solid #eaeaea'}}>
                                                <div className='row m-0'>
                                                    {
                                                        chat_arr.slice(0).reverse().map((data, index)=>(
                                                            <>
                                                                {
                                                                    data.sender_id === user_data.id ?
                                                                    <div className='col-12 d-flex justify-content-end mt-2' key={index}>
                                                                        <div className='py-2 px-3 rounded chat sender'>
                                                                            <p className='m-0'>{data.message}</p>
                                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                                <small>{base.moment(data.created_at).format('HH:mm a')}</small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className='col-12 d-flex mt-2' key={index}>
                                                                        <div className='py-2 px-3 rounded chat receiver'>
                                                                            <p className='m-0'>{data.message}</p>
                                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                                <small>{base.moment(data.created_at).format('HH:mm a')}</small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </>
                                                        ))
                                                    }
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 p-4'>
                                        <div className='row m-0'>
                                            <div className='col-auto d-flex align-items-center'>
                                                <p className='m-0' style={{cursor : 'pointer'}}><i className="fas fa-link"></i></p>
                                            </div>
                                            <div className='col-auto d-flex align-items-center'>
                                                <p className='m-0' style={{cursor : 'pointer'}}><i className="fas fa-camera"></i></p>
                                            </div>
                                            <div className='col'>
                                                <form onSubmit={(e)=>sendMessage(e)}>
                                                    <div className="input-group bg-white" style={{border : '1px solid #EAEAEA', borderRadius : '.5rem'}}>
                                                        <input type="text" className="form-control form-control border-0 bg-transparent" placeholder='' value={message} onChange={(e)=>changeMessage(e.target.value)} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text border-0 bg-transparent" id="inputGroup-sizing-default">
                                                                <button type='submit' className='bg-transparent border-0 p-0' onClick={(e)=>sendMessage(e)}>
                                                                    <i className="fas fa-paper-plane"></i>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </form>
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