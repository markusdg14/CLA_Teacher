import React, { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import Header from '../../components/header';
import CustomBadge from '../../components/customBadge';
import LessonHeader from '../../components/lessonHeader';


export default function LessonsChat(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})

    function useQuery(){
        const {search} = useLocation()
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()
    
    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
        // console.log(query.get('id'))
    }, [])

    function backBtn(){
        window.history.back()
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Lesson 1 - Math'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <LessonHeader title={'Correction Needed'} type={'warning'} backBtn={()=>backBtn()} />
            </div>

            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className='row m-0'>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 px-4'>
                                <div className='row'>
                                    <div className='col-12 p-0'>

                                        <div className='row'>
                                            <div className='col-12 p-4' style={{borderBottom : '1px solid #eaeaea'}}>
                                                <img className='position-absolute' src={base.img_leaves} style={{height : '5rem', top : '-.25rem', right : 0}} />
                                                <div className='row m-0'>
                                                    <div className='col-auto'>
                                                        <img src={base.img_no_profile} style={{height : '3.5rem', aspectRatio : 1, borderRadius : '3.5rem'}} />
                                                    </div>
                                                    <div className='col p-0 d-flex align-items-center '>
                                                        <div>
                                                            <p className='m-0 font-weight-bold' style={{color : 'black'}}>Nama Guru</p>
                                                            <p className='mb-0' style={{color : 'black', fontSize : '.75rem'}}><i className="fas fa-circle mr-2" style={{color : '#68D391'}}></i>Online</p>
                                                        </div>
                                                    </div>
                                                    <div className='col-auto px-4 mt-3 mt-lg-0'>
                                                        <div className='bg-ea text-center px-5 py-2' style={{borderRadius : '.5rem', zIndex : 1000}}>
                                                            <p className='m-0 font-weight-bold' style={{color : 'black'}}>Assignment Science #0001</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12 p-4' style={{borderBottom : '1px solid #eaeaea'}}>
                                                <div className='row m-0'>
                                                    <div className='col-12 d-flex mt-2'>
                                                        <div className='py-2 px-3 rounded chat receiver'>
                                                            <p className='m-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                <small>{base.moment().format('HH:mm a')}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 d-flex mt-2'>
                                                        <div className='py-2 px-3 rounded chat receiver'>
                                                            <p className='m-0'>ut labore et dolore magna aliqua. perfect! ✅</p>
                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                <small>{base.moment().format('HH:mm a')}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 d-flex mt-2'>
                                                        <div className='py-2 px-3 rounded chat receiver'>
                                                            <p className='m-0'>incididunt ut labore</p>
                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                <small>{base.moment().format('HH:mm a')}</small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='col-12 d-flex justify-content-end mt-2'>
                                                        <div className='py-2 px-3 rounded chat sender'>
                                                            <p className='m-0'>Lorem ipsum dolor sit amet, consasdasdasdasda sda sda ectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                <small>{base.moment().format('HH:mm a')}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 d-flex justify-content-end mt-2'>
                                                        <div className='py-2 px-3 rounded chat sender'>
                                                            <p className='m-0'>incididunt ut labore</p>
                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                <small>{base.moment().format('HH:mm a')}</small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='col-12 d-flex mt-2'>
                                                        <div className='py-2 px-3 rounded chat receiver'>
                                                            <p className='m-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                <small>{base.moment().format('HH:mm a')}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 d-flex mt-2'>
                                                        <div className='py-2 px-3 rounded chat receiver'>
                                                            <p className='m-0'>ut labore et dolore magna aliqua. perfect! ✅</p>
                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                <small>{base.moment().format('HH:mm a')}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 d-flex mt-2'>
                                                        <div className='py-2 px-3 rounded chat receiver'>
                                                            <p className='m-0'>incididunt ut labore</p>
                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                <small>{base.moment().format('HH:mm a')}</small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='col-12 d-flex justify-content-end mt-2'>
                                                        <div className='py-2 px-3 rounded chat sender'>
                                                            <p className='m-0'>Lorem ipsum dolor sit amet, consasdasdasdasda sda sda ectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                <small>{base.moment().format('HH:mm a')}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 d-flex justify-content-end mt-2'>
                                                        <div className='py-2 px-3 rounded chat sender'>
                                                            <p className='m-0'>incididunt ut labore</p>
                                                            <div className='d-flex align-items-end justify-content-end mt-2'>
                                                                <small>{base.moment().format('HH:mm a')}</small>
                                                            </div>
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
                                                        <form>
                                                            <div className="input-group bg-white" style={{border : '1px solid #EAEAEA', borderRadius : '.5rem'}}>
                                                                <input type="text" className="form-control form-control border-0 bg-transparent" placeholder='' />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text border-0 bg-transparent" id="inputGroup-sizing-default"><i className="fas fa-paper-plane"></i></span>
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
            </div>
            
        </div>
    )
}