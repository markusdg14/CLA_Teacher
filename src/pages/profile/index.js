import { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/header';

export default function ProfileIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})

    const [profile_menu_arr] = useState([
        {title : 'Profile', desc : 'View & Edit your profile', icon : 'fas fa-user-friends', nav : '/profile/edit'},
        {title : 'Change Password', desc : 'Change your password', icon : 'fas fa-book', nav : '/profile/change-password'},
    ])

    async function logout(){
        var firebaseToken = await localStorage.getItem('firebaseToken')

        var response = await base.request('/auth/logout', 'post', {token : firebaseToken})
        if(response != null){
            if(response.status == 'success'){
                localStorage.clear()
                window.location.href = '/auth/login'
            }
        }
    }

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'profile'} user_data={user_data} />
            </div>


            <div className='col-12 mt-5 pt-4'>

                <div className='row'>
                    {
                        profile_menu_arr.map((data, index)=>(
                            <div className={'col-12 col-lg-6' + (index != 0 ? ' mt-3 mt-lg-0' : '')} key={index}>
                                <a href={data.nav} className='text-decoration-none'>
                                <div className="card rounded shadow-sm" style={{cursor : 'pointer'}}>
                                    <div className="card-body p-3 p-lg-4">
                                            <div className='row'>
                                                <div className='col-auto'>
                                                    <div className='bg-primary rounded d-flex align-items-center justify-content-center profileMenuIcon'>
                                                        <h5 className='m-0'><i className={"text-white " + (data.icon)}></i></h5>
                                                    </div>
                                                </div>
                                                <div className='col-auto d-flex align-items-center justify-content-center p-0 px-lg-3'>
                                                    <div className='profileMenu'>
                                                        <h5 className='text-uppercase m-0'>{data.title}</h5>
                                                        <p className='text-uppercase m-0 d-none d-lg-block'>{data.desc}</p>
                                                    </div>
                                                </div>
                                                <div className='col d-flex align-items-center justify-content-end pl-0 profileMenuIcon'>
                                                    <h5 className='m-0'><i className="fas fa-chevron-right text-primary"></i></h5>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                </a>
                            </div>
                        ))
                    }
                </div>

            </div>

            <div className='col-12 mt-5'>
                <div className='row m-0'>
                    <div className='col-12 p-0'>
                        <img src={base.img_learn} style={{height : 'auto', width : '100%'}} />
                    </div>
                    {/* <div className='col-12 mt-2 p-5 rounded' style={{backgroundColor : '#F8F9FE'}}>
                        <div className='row'>
                            <div className='col-auto d-flex align-items-center justify-content-center'>
                                <div className=''>
                                    <h3 className='m-0' style={{color : '#575A89', fontFamily : 'PlayfairDisplay'}}>Study Until You’re Happy</h3>
                                    <p className='m-0 mt-3 mt-lg-0' style={{color : '#413F3F'}}>Lectus dignissim egestas quisque nulla. Lectus dignissim egestas quisque nulla.</p>
                                </div>
                            </div>
                            <div className='position-absolute-lg profile_msg_picture'>
                                <img src={base.img_study_2} />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className='col-12 mt-5'>
                <div className='row m-0'>
                    <div className='col-12 col-lg-7 bg-white p-4 px-4 rounded shadow'>
                        <div className='row m-0'>
                            <div className='col-12 col-lg-auto px-4' style={{cursor : 'pointer'}} onClick={logout}>
                                <div className='row'>
                                    <div className='col-auto p-0'>
                                        <div className='d-flex align-items-center justify-content-center' style={{height : '2.25rem', width : '2.25rem', backgroundColor : '#ED757C', borderRadius : '.5rem'}}>
                                            <h4 className='m-0'><i class="bi bi-power text-white"></i></h4>
                                        </div>
                                    </div>
                                    <div className='col-auto d-flex align-items-center justify-content-center'>
                                        <p className='m-0'><b style={{color : 'black'}}>Loging Out</b></p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-lg d-flex align-items-center justify-content-center justify-content-lg-end mt-3 mt-lg-0'>
                                <p className='m-0' style={{fontSize : '.75rem'}}>Version Application 1.0.1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}