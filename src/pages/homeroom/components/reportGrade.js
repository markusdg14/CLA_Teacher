import { useEffect, useState } from 'react';
import Base from '../../../utils/base';


export default function HomeroomReportGrade({grade_subject_arr, grade_student_arr, grade_book_dtl_arr, toggleSubject}){
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
                                                <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Report Card Grade</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 mt-3'>
                                        <div className='row m-0'>
                                            {
                                                grade_subject_arr.map((data, index)=>(
                                                <div className='col-12'>
                                                    <div className='row'>
                                                        <div className='col-12 p-3' style={{backgroundColor : '#EBEFE2', cursor : 'pointer'}} onClick={()=>toggleSubject(index)}>
                                                            <div className='row'>
                                                                <div className='col d-flex align-items-center'>
                                                                    <p className='m-0'>Subject / Standard : <span className='m-0' style={{fontFamily : 'InterBold'}}>{data.name}</span> / <span>{data.minimum_pass_score}</span></p>
                                                                </div>
                                                                <div className='col-auto d-flex align-items-center justify-content-end'>
                                                                    <i className={"fas fa-chevron-" + (data.is_show ? 'up' : 'down')}></i>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {
                                                            data.is_show &&
                                                            <div className='col-12'>
                                                            <div className="table-responsive">
                                                                <table className="table w-100">
                                                                    <thead>
                                                                        <tr>
                                                                            <th></th>
                                                                            {
                                                                                data.arr_assignment.map((data_assignment, index_assignment)=>(
                                                                                    <th className='text-center'>{data_assignment.name}</th>
                                                                                ))
                                                                            }
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            grade_student_arr.map((data_student, index_student)=>(
                                                                                <tr key={index_student}>
                                                                                    <td className='td-fit-content'>{data_student.user.name}</td>

                                                                                    {
                                                                                        data.arr_assignment.map((data_assignment, index_assignment)=>(
                                                                                            <>
                                                                                                {
                                                                                                    grade_book_dtl_arr[data.id] != null ?
                                                                                                    <>
                                                                                                        {
                                                                                                            grade_book_dtl_arr[data.id][data_student.id][data_assignment.id] != null ?
                                                                                                            <td className='text-center'>{grade_book_dtl_arr[data.id][data_student.id][data_assignment.id].score}</td>
                                                                                                            :
                                                                                                            <td></td>
                                                                                                        }
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                    </>
                                                                                                }
                                                                                            </>
                                                                                        ))
                                                                                    }
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            </div>
                                                        }
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

            </div>

        </div>
    )
}