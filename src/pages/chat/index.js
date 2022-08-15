import { useEffect, useLayoutEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/header';
import ModalNewChat from './modalNewChat';


export default function ChatIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : '', name : ''}, arr_schedule : {}})
    const [data_arr, set_data_arr] = useState([])

    const [page, set_page] = useState('1')
    const [last_page, set_last_page] = useState('')

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(()=>{
        if(user_data.id !== ''){
            // set_data_arr([])
            get_data()
        }
    }, [user_data, page])

    async function get_data(){
        var url = '/chat?page=' + page
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                for(var x in data){
                    data[x].chat_url = '/chat-room?id=' + data[x].id

                    data[x].receiver.image_display = base.img_no_profile
                    if(data[x].receiver.file_name != null){
                        data[x].receiver.image_display = base.url_photo('user', data[x].receiver.file_name)
                    }

                }
                set_data_arr(data)
                set_last_page(response.data.last_page)
            }
        }
    }

    async function navPage(type){
        if(type === 'back'){
            set_page(parseInt(page)-1)
        }
        else if(type === 'next'){
            set_page(parseInt(page)+1)
        }
    }

    async function newChat(){
        base.$('#modalNewChat').modal('show')
    }

    return(
        <div className='row'>
            
            <div className='col-12'>
                <Header title={'Chat'} user_data={user_data} />
            </div>


            <div className='col-12 mt-5'>
                <div className='row'>
                    <div className='col-12 text-right'>
                        <button className='btn btn-primary rounded' onClick={()=>newChat()}>New Chat</button>
                    </div>
                    <div className='col-12 mt-3'>
                        <div className="card rounded shadow-sm h-100 w-100">
                            <div className="card-body p-0">
                                <div className='row m-0'>
                                    <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                    <div className='col-12 p-3 py-4'>
                                        <div className='row'>

                                            {
                                                data_arr.length > 0 ?
                                                <>
                                                    {
                                                        data_arr.map((data, index)=>(
                                                            <div className={'col-12' + (index > 0 ? ' mt-3' : '')} key={index}>
                                                                <a href={data.chat_url} style={{textDecoration : 'none'}}>
                                                                    <div className='row'>
                                                                        <div className='col-auto'>
                                                                            <img src={data.receiver.image_display} style={{height : '3rem', width : '3rem', borderRadius : '3rem'}} />
                                                                        </div>
                                                                        <div className='col d-flex align-items-center pl-0'>
                                                                            <p className='m-0' style={{fontFamily : 'InterBold', color : 'black'}}>{data.receiver.name}</p>
                                                                        </div>
                                                                        <div className='col d-flex align-items-center justify-content-end'>
                                                                            <div className='row'>
                                                                                <div className='col d-none d-lg-flex justify-content-end'>
                                                                                    <div className='row'>
                                                                                        <div className='col-auto d-flex align-items-center'>
                                                                                            <p className='m-0' style={{color : 'black', fontSize : '.75rem'}}>{(data.last_chat != null ? base.moment(data.last_chat.created_at).format('DD/MM HH:mm') : '-')}</p>
                                                                                        </div>
                                                                                        {
                                                                                            data.total_unread > 0 &&
                                                                                            <div className='col-auto pl-0'>
                                                                                                <div className='px-2 py-1' style={{backgroundColor : '#F2F9E4', borderRadius : '.25rem'}}>
                                                                                                    <p className='m-0' style={{fontSize : '.7rem'}}>{data.total_unread} Messages</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col d-block d-lg-none'>
                                                                                    <div className='row'>
                                                                                        <div className='col-12 text-right mt-1'>
                                                                                            <p className='m-0' style={{color : 'black', fontSize : '.675rem'}}>{(data.last_chat != null ? base.moment(data.last_chat.created_at).format('DD/MM HH:mm') : '-')}</p>
                                                                                        </div>
                                                                                        {
                                                                                            data.total_unread > 0 &&
                                                                                            <div className='col d-flex justify-content-end'>
                                                                                                <div className='px-2 py-1' style={{backgroundColor : '#F2F9E4', borderRadius : '.25rem'}}>
                                                                                                    <p className='m-0' style={{fontSize : '.7rem'}}>{data.total_unread}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                                :
                                                <>
                                                <div className='col-12 text-center'>
                                                    <p className='m-0' style={{fontFamily : 'Inter', fontSize : '1.25rem', color : 'black'}}>No Data</p>
                                                </div>
                                                </>
                                            }
                                            
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                last_page > 1 &&
                <div className='col-12 mt-4'>
                    <div className='row'>
                        <div className='col'>
                            <button className='btn btn-warning shadow-sm px-3 px-lg-5' style={{borderRadius : '5rem', color : '#4F4CD4'}} onClick={()=>navPage('back')}><i className="bi bi-arrow-left-short"></i> Back</button>
                        </div>
                        <div className='col text-right'>
                            <button className='btn btn-warning shadow-sm px-3 px-lg-5' style={{borderRadius : '5rem', color : '#4F4CD4'}} onClick={()=>navPage('next')}>Next <i className="bi bi-arrow-right-short"></i></button>
                        </div>
                    </div>
                </div>
            }

            <ModalNewChat />

        </div>
    )
}