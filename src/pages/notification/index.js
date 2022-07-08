import { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/header';


export default function NotificationIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : '', name : ''}, arr_schedule : {}})
    const [data_arr, set_data_arr] = useState([])

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(async ()=>{
        if(user_data.id !== ''){
            get_data()
        }
    }, [user_data])

    useEffect(async ()=>{
        if(data_arr.length > 0){
            read_notif()
        }
    }, [data_arr])

    async function get_data(){
        var url = '/notification'
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                set_data_arr(response.data.data)
            }
        }
    }

    async function read_notif(){
        var url = '/notification/read'
        var response = await base.request(url, 'put', {})
        if(response != null){
            if(response.status == 'success'){
                console.log('read!')
            }
        }
    }

    return(
        <div className='row'>
            
            <div className='col-12'>
                <Header title={'Notification'} user_data={user_data} />
            </div>


            <div className='col-12 mt-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className="card rounded shadow-sm h-100 w-100">
                            <div className="card-body p-0">
                                <div className='row m-0'>
                                    <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                    <div className='col-12 p-3 pt-4 pb-5'>
                                        <div className='row'>
                                            
                                            {
                                                data_arr.length > 0 ?
                                                <>
                                                    {
                                                        data_arr.map((data, index)=>(
                                                            <div className={'col-12' + (index > 0 ? ' mt-2' : '')} key={index}>
                                                                <div className='row'>
                                                                    <div className='col-auto'>
                                                                        <i className="bi bi-circle-fill" style={{color : (data.read_at != null ? '#EAEAEA' : '#FC5A5A'), fontSize : '.75rem'}}></i>
                                                                    </div>
                                                                    <div className='col pl-0'>
                                                                        <div className='row'>
                                                                            <div className='col-12'>
                                                                                <p className='m-0' style={{fontFamily : (data.read_at == null ? 'InterBold' : 'Inter')}}>{data.title}</p>
                                                                            </div>
                                                                            <div className='col-auto'>
                                                                                <div className='px-3 py-1 rounded' style={{backgroundColor : '#F2F9E4'}}>
                                                                                    <p className='m-0' style={{fontSize : '.7rem', color : '#6F826E', fontFamily : (data.read_at == null ? 'InterBold' : 'Inter')}}>{base.moment(data.created_at).format('DD MMMM YYYY | HH:mm')}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
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
        </div>
    )
}