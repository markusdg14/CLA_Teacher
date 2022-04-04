import { useEffect, useState } from 'react';
import Base from '../../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../../components/header';


export default function GradeBookIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})

    const [student_grade_arr] = useState([
        {title : 'Student Progress', value : '95%'},
        {title : 'Overall Grade', value : 'A+'},
        {title : 'Rank Student', value : '#1'},
        {title : 'Reward & Attendance', value : '100'},
    ])

    const [lesson_arr] = useState([
        {title : 'Science', image_display : base.img_no_image, nav : '/profile/grade-book/detail'},
        {title : 'Math', image_display : base.img_no_image, nav : '/profile/grade-book/detail'},
        {title : 'English', image_display : base.img_no_image, nav : '/profile/grade-book/detail'},
        {title : 'Bahasa', image_display : base.img_no_image, nav : '/profile/grade-book/detail'},
    ])

    function backBtn(){
        window.location.href = '/profile'
    }

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Grade Book'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='row'>
                    <div className='col'>
                        <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                            <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                        </div>
                    </div>
                    <div className='col-auto d-flex align-items-center justify-content-center mt-3 mt-lg-0'>
                        {/* <CustomBadge title={title} type={type} /> */}
                        <div class="dropdown h-100">
                            <button class="btn bg-white rounded shadow dropdown-toggle h-100 dropdownAcademyYear" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                                Academic Year 2021-2022
                            </button>
                            <div class="dropdown-menu rounded shadow w-100" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Academic Year 2020-2021</a>
                                <a class="dropdown-item" href="#">Academic Year 2019-2020</a>
                                <a class="dropdown-item" href="#">Academic Year 2018-2019</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-12 mt-5'>

                <div className='row'>
                    {
                        student_grade_arr.map((data, index)=>(
                            <div className={'col-6 col-lg mb-4'} key={index}>
                                <div className="card rounded shadow-sm h-100 w-100">
                                    <div className="card-body p-4">
                                        <div className='d-flex align-items-center h-100'>
                                            <div>
                                                <h3 className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{data.value}</h3>
                                                <p className='m-0' style={{color : 'black'}}>{data.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>

            <div className='col-12 mt-4'>

                <div className='row'>
                    {
                        lesson_arr.map((data, index)=>(
                            <div className={'col-12' + (index != 0 ? ' mt-3' : '')}>
                                <a href={data.nav} className='text-decoration-none'>
                                <div className="card rounded shadow-sm" style={{cursor : 'pointer'}}>
                                    <div className="card-body px-4 py-3">
                                        <div className='row'>
                                            <div className='col-auto'>
                                                <img src={data.image_display} style={{height : '4rem', aspectRatio : 1}} />
                                            </div>
                                            <div className='col d-flex align-items-center'>
                                                <h5 className='m-0' style={{fontFamily : 'InterBold'}}>{data.title}</h5>
                                            </div>
                                            <div className='col-auto d-flex align-items-center justify-content-end'>
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

            
        </div>
    )
}