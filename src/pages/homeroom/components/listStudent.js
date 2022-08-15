import { useEffect, useState } from 'react';
import Base from '../../../utils/base';


export default function HomeroomListStudent({student_arr, search, changeSearch}){
    var base = new Base()

    return(
        <div className='row'>

            <div className='col-12'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 p-3 pt-4'>
                                <div className='row m-0'>
                                    <div className='col-12 mb-3 pr-3'>
                                        <div className='row m-0'>
                                            <div className='col-12 col-lg'>
                                                <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Student List</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="input-group border rounded">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-white border-0 bg-transparent pr-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                                                    </div>
                                                    <input type="text" className="form-control border-0 bg-transparent" placeholder="Search" aria-describedby="basic-addon1" value={search} onChange={(e)=>changeSearch(e.target.value)} />
                                                </div>
                                            </div>
                                            {/* <div className='col-auto d-flex align-items-center'>
                                                <p className='m-0' style={{color : 'black'}}><i className="bi bi-sort-up"></i> Sort</p>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className='col-12 mt-3'>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Student Name</th>
                                                        <th>L/P</th>
                                                        <th>Phone Number</th>
                                                        <th>City of Birth</th>
                                                        <th>Date of Birth</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        student_arr.map((data, index)=>(
                                                            <tr key={index}>
                                                                <td className='align-middle td-fit-content'>{data.id}</td>
                                                                <td className='align-middle'>{data.name}</td>
                                                                <td className='align-middle'>{(data.gender === 1 ? 'L' : 'P')}</td>
                                                                <td className='align-middle'>{data.phone}</td>
                                                                <td className='align-middle'>{data.birth_city.name}</td>
                                                                <td className='align-middle'>{base.moment(data.birth_date).format('DD/MM/YYYY')}</td>
                                                                <td>
                                                                    <button className='btn btn-primary rounded px-4'>View More</button>
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
                        </div>
                        
                    </div>
                </div>

            </div>

        </div>
    )
}