import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import CardSubject from '../../../components/cardSubject';
import SelectOption from '../../../components/selectOption';


export default function ReportGrade({class_student, assignment_agreement, grade_book_arr, term_arr, term_selected, changeTerm}){
    var base = new Base()

    return(
        <div className='row'>
            <div className='col-12 mt-5'>
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
                                            <div className='col-12 col-lg-auto'>
                                                <SelectOption
                                                    data_arr={term_arr} 
                                                    selected={term_selected}
                                                    title={'Term'}
                                                    changeInput={(value)=>changeTerm(value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className="table-responsive">
                                            <table className="table table-fixed-lg">
                                                <thead>
                                                    <tr>
                                                        <td></td>
                                                        <td className={'text-center'}>Final Score</td>
                                                        {
                                                            assignment_agreement.map((data, index)=>(
                                                                <td key={index} className={'text-center'}>{data.name}</td>
                                                            ))
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        class_student.map((data, index)=>(
                                                            <tr key={index}>
                                                                <td>{data.user.name}</td>
                                                                <td className={'text-center align-middle'}>
                                                                    {
                                                                        <>
                                                                            {
                                                                                grade_book_arr[data.id] != null &&
                                                                                <>
                                                                                {
                                                                                    grade_book_arr[data.id]['final_score'] != null &&
                                                                                    <span className='badge badge-success rounded px-3 py-2'>{grade_book_arr[data.id]['final_score'].score}</span>
                                                                                }
                                                                                </>
                                                                            }
                                                                        </>
                                                                    }
                                                                </td>
                                                                {
                                                                    assignment_agreement.map((data_agreement, index_agreement)=>(
                                                                        <td key={index_agreement} className={'text-center align-middle'}>
                                                                            {
                                                                                grade_book_arr[data.id] != null &&
                                                                                    <>
                                                                                        {
                                                                                            grade_book_arr[data.id][data_agreement.id] != null &&
                                                                                            <span className='badge badge-success rounded px-3 py-2'>{grade_book_arr[data.id][data_agreement.id].score}</span>
                                                                                        }
                                                                                    </>
                                                                            }
                                                                        </td>
                                                                    ))
                                                                }
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