import { useEffect, useState } from 'react';
import Base from '../../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../../components/header';


export default function GradeBookDetail(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})

    const [lesson_grade_arr] = useState([
        {title : 'Completion Progress', value : '95%'},
        {title : 'Overall Grade', value : 'A+'},
    ])

    const [lesson_data_arr] = useState([
        {title : 'Lesson 1', dataDtl_arr : [
            {status : 'Open', type : 'open', assignment : 'Baca Buku Bab 1', grade : ''},
            {status : 'Closed', type : 'closed', assignment : 'Baca Buku Bab 1', grade : '98'},
            {status : 'Closed', type : 'closed', assignment : 'Baca Buku Bab 1', grade : 'A+'},
        ]},
        {title : 'Lesson 2', dataDtl_arr : [
            {status : 'Open', type : 'open', assignment : 'Baca Buku Bab 1', grade : ''},
            {status : 'Closed', type : 'closed', assignment : 'Baca Buku Bab 1', grade : '98'},
            {status : 'Closed', type : 'closed', assignment : 'Baca Buku Bab 1', grade : 'A+'},
        ]},
    ])

    function backBtn(){
        window.history.back()
    }

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Science Grade Book'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                    <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                </div>
            </div>

            <div className='col-12 mt-5'>

                <div className='row'>
                    {
                        lesson_grade_arr.map((data, index)=>(
                            <div className={'col-6 col-lg mb-4'} key={index}>
                                <div className="card rounded shadow-sm h-100 w-100">
                                    <div className="card-body p-4">
                                        <div className='d-flex align-items-center h-100'>
                                            <div>
                                                <h3 className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{data.value}</h3>
                                                <p className='m-0' style={{color : 'black'}}>{data.title}</p>
                                            </div>
                                        </div>
                                        <img className='position-absolute' src={base.img_leaves} style={{height : '5rem', right : '-.25rem', top : 0}} />
                                    </div>
                                </div>
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
                            <div className='col-12 p-3 pt-4 mb-5'>
                                <div className='row m-0'>
                                    {
                                        lesson_data_arr.map((data, index)=>(
                                            <div className={'col-12 p-0' + (index !== 0 ? ' mt-3' : '')} key={index}>
                                                <div className='row m-0'>
                                                    <div className='col-12'>
                                                        <h5 className='m-0'>{data.title}</h5>
                                                    </div>
                                                    <div className='col-12 mt-2'>
                                                        <div className="table-responsive">
                                                            <table class="table table-striped">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Status</th>
                                                                        <th>Assignment</th>
                                                                        <th className=''>Grade</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        data.dataDtl_arr.map((dataDetail, indexDetail)=>(
                                                                            <tr>
                                                                                <td className='' style={{color : (dataDetail.type === 'open' ? '#B1CF24' : '#FC5A5A')}}>{dataDetail.status}</td>
                                                                                <td>{dataDetail.assignment}</td>
                                                                                <td className=''>
                                                                                    {
                                                                                        dataDetail.grade !== '' &&
                                                                                        <span className='px-3 py-1 rounded' style={{backgroundColor : '#EBF8FF', color : '#0085FF'}}>{dataDetail.grade}</span>
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            
        </div>
    )
}