import { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/header';

export default function ProfileIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})

    const [talent_book_arr] = useState([
        {title : 'Accomplish 2 New Habit', value : 100, type : 'plus'},
        {title : 'You have Redeem some of your Talent', value : 50, type : 'min'},
    ])

    const [profile_menu_arr] = useState([
        {title : 'Grade Book', desc : 'View all of your grade', icon : 'fas fa-book', nav : '/profile/grade-book'},
        {title : 'Student Profile', desc : 'View & Edit your profile', icon : 'fas fa-user-friends', nav : '/profile/student-profile/edit'},
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

                    <div className='col-12 mr-0 mr-lg-4'>
                        <div className="card rounded shadow-sm">
                            <div className={"card-body p-0"}>
                                <div className={'row m-0'}>
                                    <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                    <div className='col-12 p-3'>
                                        <div className='row m-0'>
                                            <div className='col-12 p-4'>
                                                <div className='row'>
                                                    <div className='col text-center p-0'>
                                                        <img src={base.img_star} style={{height : '6rem'}} />
                                                        <p className='m-0 text-uppercase text-center mt-2 text-primary' style={{lineHeight : '18px'}}>GOOD BEHAVIOUR & SELF CONTROL</p>
                                                    </div>
                                                    <div className='col text-center p-0'>
                                                        <img src={base.img_star} style={{height : '6rem'}} />
                                                        <p className='m-0 text-uppercase text-center mt-2 text-primary' style={{lineHeight : '18px'}}>GOOD BEHAVIOUR & SELF CONTROL</p>
                                                    </div>
                                                    <div className='col text-center p-0'>
                                                        <img src={base.img_star} style={{height : '6rem'}} />
                                                        <p className='m-0 text-uppercase text-center mt-2 text-primary' style={{lineHeight : '18px'}}>GOOD BEHAVIOUR & SELF CONTROL</p>
                                                    </div>
                                                    <div className='col text-center p-0'>
                                                        <img src={base.img_star} style={{height : '6rem'}} />
                                                        <p className='m-0 text-uppercase text-center mt-2 text-primary' style={{lineHeight : '18px'}}>GOOD BEHAVIOUR & SELF CONTROL</p>
                                                    </div>
                                                    <div className='col text-center p-0'>
                                                        <img src={base.img_star} style={{height : '6rem'}} />
                                                        <p className='m-0 text-uppercase text-center mt-2 text-primary' style={{lineHeight : '18px'}}>GOOD BEHAVIOUR & SELF CONTROL</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12 p-3' style={{borderTop : '1px solid #EAEAEA'}}>
                                                <div className='row'>
                                                    <div className='col d-flex align-items-center mt-2'>
                                                        <p className='m-0'>Your Total Reward : <b>10 Rewards</b></p>
                                                    </div>
                                                    {/* <div className='col text-right'>
                                                        <button className='btn btn-sm btn-outline-secondary' style={{borderRadius : '.25rem'}}>See All</button>
                                                    </div> */}
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


            <div className='col-12 mt-5'>

                <div className='row'>
                    {
                        profile_menu_arr.map((data, index)=>(
                            <div className={'col-12 col-lg-6' + (index != 0 ? ' mt-3 mt-lg-0' : '')} key={index}>
                                <a href={data.nav} className='text-decoration-none'>
                                <div className="card rounded shadow-sm" style={{cursor : 'pointer'}}>
                                    <div className="card-body p-4">
                                            <div className='row'>
                                                <div className='col-auto'>
                                                    <div className='bg-primary rounded d-flex align-items-center justify-content-center' style={{height : '3.5rem', width : '3.5rem'}}>
                                                        <h5 className='m-0'><i className={"text-white " + (data.icon)}></i></h5>
                                                    </div>
                                                </div>
                                                <div className='col-auto d-flex align-items-center justify-content-center p-0 px-lg-3'>
                                                    <div className=''>
                                                        <h5 className='text-uppercase m-0'>{data.title}</h5>
                                                        <p className='text-uppercase m-0'>{data.desc}</p>
                                                    </div>
                                                </div>
                                                <div className='col d-flex align-items-center justify-content-end pl-0'>
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
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 p-3 pt-4'>
                                <div className='row m-0'>
                                    <div className='col-12 mb-4'>
                                        <div className='row m-0'>
                                            <div className='col-auto p-0 d-flex align-items-center justify-content-center'>
                                                <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i></h5>
                                            </div>
                                            <div className='col p-0 d-flex align-items-center'>
                                                <h5 className='m-0'>Talent Book</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 p-3'>
                                        <div className='row m-0'>
                                            <div className='col-12 col-lg-6 text-center d-flex align-items-center justify-content-center'>
                                                <div>
                                                    <img src={base.img_tree_talent} style={{height : '15rem'}} />
                                                    <h4 className='mt-3'>1000 Talent</h4>
                                                    <p className='rounded py-2 px-4 font-weight-bold mt-3' style={{backgroundColor : '#F0F8EF', color : '#60B158', fontSize : 12}}>atau Total Rp. 550.000</p>
                                                </div>
                                            </div>

                                            <div className='col-12 col-lg-6 mt-3 mt-lg-0'>
                                                <div className='row'>
                                                    {
                                                        talent_book_arr.map((data, index)=>(
                                                            <div className={'col-12' + (index !== 0 ? ' mt-3' : '')} key={index}>
                                                                <div className='row'>
                                                                    <div className='col-auto'>
                                                                        <p className='m-0'><i className="fas fa-circle"></i></p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p className='m-0 font-weight-bold'>{data.title}</p>
                                                                        <p className={'m-0 ' + (data.type === 'plus' ? 'text-secondary' : 'text-danger')}>{data.type === 'plus' ? '+' : '-'} {data.value} Talent</p>

                                                                        <p className='m-0 d-inline-block d-lg-none'>{base.moment().format('DD/MM/YYYY')} Pk. {base.moment().format('HH:mm')}</p>
                                                                    </div>
                                                                    <div className='col-auto text-right d-none d-lg-inline-block'>
                                                                        <p>{base.moment().format('DD/MM/YYYY')} Pk. {base.moment().format('HH:mm')}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }

                                                    <div className='position-absolute-lg text-right w-100 mt-3 mt-lg-0' style={{bottom : 0}}>
                                                        <button className='btn btn-outline-secondary' style={{borderRadius : '.5rem'}}>See All</button>
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

            <div className='col-12 mt-5'>
                <div className='row m-0'>
                    <div className='col-12 mt-2 p-5 rounded' style={{backgroundColor : '#F8F9FE'}}>
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
                    </div>
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