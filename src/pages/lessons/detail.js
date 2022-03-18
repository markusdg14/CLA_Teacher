import React, { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import Header from '../../components/header';
import CustomBadge from '../../components/customBadge';
import LessonHeader from '../../components/lessonHeader';


export default function LessonsDetail(){
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
        window.location.href = '/lessons'
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Lesson 1 - Math'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <LessonHeader title={'No Submission'} type={'info'} backBtn={()=>backBtn()} />
            </div>

            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className='row m-0'>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 px-4'>
                                <div className='row mt-2'>
                                    <div className='col-12 p-4 pb-5'>
                                        {/* <img className='position-absolute' src={base.img_leaves} style={{height : '5rem', top : '1.5rem', right : '.5rem'}} /> */}
                                        <div className='row'>
                                            <div className='col-auto px-0 px-lg-3'>
                                                <h4 className='m-0'><i className="far fa-square" style={{color : '#8C9196'}}></i></h4>
                                            </div>
                                            <div className='col px-0 px-lg-3'>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <div className={'px-4 px-lg-0'}>
                                                            <SectionHeader title={'Baca Buku Introduction to English Bab 1 - 3'} />
                                                        </div>
                                                        {/* <h4 className='m-0 font-weight-bold px-4 px-lg-0' style={{color : 'black'}}>Baca Buku Introduction to English Bab 1 - 3</h4> */}
                                                    </div>
                                                    <div className='col-12 mt-3'>
                                                        <div className='row mt-2'>
                                                            <div className='col-12 col-lg-auto'>
                                                                <p className='m-0'><i className="fas fa-clock mr-2"></i>Deadline on Sunday, 7 January 2020 Pk. 09.00 WIB</p>
                                                            </div>
                                                            <div className='col-12 col-lg d-flex justify-content-lg-center mt-2 mt-lg-0'>
                                                                <p className='m-0'><i className="fas fa-clipboard-check mr-2"></i>Miss Alana B</p>
                                                            </div>
                                                            <div className='col-12 col-lg d-flex justify-content-lg-center mt-2 mt-lg-0'>
                                                                <p className='m-0'><i className="fas fa-clipboard-check mr-2"></i>Daily Lesson</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 mt-4'>
                                                        <div className='row'>
                                                            <div className='col-12 mt-2'>
                                                                <p className='m-0 font-weight-bold' style={{color : '#777777'}}>Information Course</p>
                                                                <p className='m-0 mt-2' style={{color : '#777777', lineHeight : '30px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Read : Book ABC <a href='https://google.com'><u>https://google.com</u></a></p>
                                                                <img src={base.img_img_1} className='mt-4' style={{height : '10rem'}} />
                                                            </div>
                                                            <div className='col-12 mt-4'>
                                                                <p className='m-0 font-weight-bold' style={{color : '#777777'}}>Detail Assignment</p>
                                                                <ol className='m-0 mt-2 px-3'>
                                                                    <li style={{color : '#777777', lineHeight : '30px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
                                                                    <li style={{color : '#777777', lineHeight : '30px'}}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </li>
                                                                    <li style={{color : '#777777', lineHeight : '30px'}}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </li>
                                                                    <li style={{color : '#777777', lineHeight : '30px'}}>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                                                                </ol> 
                                                            </div>
                                                            <div className='col-12 mt-4'>
                                                                <button className='btn btn-primary rounded py-2 shadow px-5'>Submit Assignment</button>
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
            </div>

            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className='row m-0'>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 px-4'>
                                <div className='row mt-2'>
                                    <div className='col-12 p-4 pb-5'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <SectionHeader title={'Your Submmision'} />
                                            </div>
                                            <div className='col-12 mt-3'>
                                                <div className='row'>
                                                    <div className='col mt-2'>
                                                        <p className='m-0'><i className="fas fa-clock mr-2"></i>Submitted on Sunday, 7 January 2020 Pk. 09.00 WIB</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12 mt-4'>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <p className='m-0 font-weight-bold' style={{color : '#777777'}}>Submission</p>
                                                        <div className='p-3 border rounded mt-3'>
                                                            <ol className='m-0 px-3'>
                                                                <li style={{color : '#777777', lineHeight : '30px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
                                                                <li style={{color : '#777777', lineHeight : '30px'}}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </li>
                                                                <li style={{color : '#777777', lineHeight : '30px'}}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </li>
                                                                <li style={{color : '#777777', lineHeight : '30px'}}>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                                                            </ol>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 mt-4'>
                                                        <p className='m-0 font-weight-bold' style={{color : '#777777'}}>Attachment</p>
                                                        <div className='row mt-3'>
                                                            <div className='col-auto'>
                                                                <img src={base.img_img_1} style={{height : '7rem', width : '7rem'}} />
                                                            </div>
                                                            <div className='col-auto'>
                                                                <img src={base.img_img_1} style={{height : '7rem', width : '7rem'}} />
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
            </div>

            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className='row m-0'>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 px-4'>
                                <div className='row mt-2'>
                                    <div className='col-12 p-4 pb-5'>

                                        <div className='row'>
                                            <div className='col-12'>
                                                <SectionHeader title={'Grade & Correction'} />
                                            </div>
                                            <div className='col-12 mt-3'>
                                                <div className='row'>
                                                    <div className='col-12 col-lg d-flex align-items-center'>
                                                        <p className='m-0'><i className="fas fa-clock mr-2"></i>Graded on Sunday, 7 January 2020 Pk. 09.00 WIB</p>
                                                    </div>
                                                    <div className='col-12 col-lg mt-3 mt-lg-0 text-right'>
                                                        <a href='/lessons/chat' className='btn btn-sm btn-primary py-2 px-3 rounded'>Chat with Teacher<span className='position-absolute' style={{top : '-.5rem', right : '.75rem'}}><i className="fas fa-circle" style={{color : '#FF6262'}}></i></span></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12 mt-4'>
                                                <div className='row'>
                                                    <div className='col col-lg-auto'>
                                                        <div className='text-center p-4 py-5 py-lg-4 d-flex align-items-center justify-content-center h-100' style={{backgroundColor : '#EBEFE2', borderRadius : '.5rem'}}>
                                                            <div>
                                                                <h2 className='m-0 text-primary' style={{fontFamily : 'InterBold', fontSize : '3rem'}}>98</h2>
                                                                <p className='m-0'>Numerical Grade</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col d-flex align-items-center justify-content-center mt-3 mt-lg-0'>
                                                        <div className='p-4 py-5 py-lg-4 h-100' style={{backgroundColor : '#EBEFE2', borderRadius : '.5rem'}}>
                                                            <h6 className='m-0' style={{color : '#413F3F'}}>Teacher’s Notes</h6>
                                                            <p className='m-0 mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-12 mt-4'>
                                                <div className='' style={{height : '15rem', backgroundColor : '#EAEAEA'}}></div>
                                            </div>

                                            <div className='col-12 mt-4'>
                                                <button className='btn btn-primary rounded py-2 shadow px-5'>Submit Correction</button>
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

function SectionHeader({title}){
    const base = new Base()
    return(
        <>
            <h4 className='m-0 font-weight-bold' style={{color : 'black'}}>{title}</h4>
            <img className='position-absolute' src={base.img_leaves} style={{height : '5rem', top : '-2rem', right : 0}} />
        </>
    )
}