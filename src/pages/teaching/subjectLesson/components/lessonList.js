import { useEffect, useState } from 'react';
import SelectOption from '../../../../components/selectOption';
import Base from '../../../../utils/base';

export default function LessonList({data_arr, confirmLesson, changeView}){
	var base = new Base()

	return(
		<>
			<div className='row'>
            {
                data_arr.map((data, index)=>(
                    <div className={'col-12' + (index != 0 ? ' mt-4' : '')} key={index}>
                        <div className='row'>
                            <div className='col-12 col-lg-3 py-3' style={{backgroundColor : '#EAEAEA'}}>

                                <div className='row'>
                                    <div className='col-12 bg-white p-4'>
                                        <h5 className='m-0 text-primary'>{data.lesson.name}</h5>
                                    </div>
                                    <div className='col-12 p-4'>
                                        <p className='m-0'>Confirmed by {data.created_user.name}</p>
                                        <p className='m-0'>Last Update by {data.updated_user.name}</p>
                                        <p className='m-0'>Last Updated at {base.moment(data.updated_at_format).format('DD/MM/YY')}</p>

                                        {
                                            !data.is_confirm &&
                                            <div className='mt-4'>
                                                <button className='btn btn-primary w-100 rounded shadow-sm' onClick={()=>confirmLesson(index)}>Confirm</button>
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 col-lg-9 px-4 bg-white'>
                                <div className='row'>

                                    {
                                        data.assignment_agreement.map((assignment, index_assignment)=>(
                                            <div className='col-12 py-3 rounded' style={{borderBottom : '1px solid #EAEAEA'}} key={index_assignment}>
                                                <div className='row'>
                                                    <div className='col d-flex align-items-center'>
                                                        <p className='m-0 d-inline-block'>
                                                            <i className={(assignment.icon) + " mr-4 text-primary"} style={{fontSize : 18}}></i>
                                                            {assignment.name}
                                                        </p>
                                                    </div>
                                                    <div className='col-auto text-left text-lg-right mt-2 mt-lg-0'>
                                                        <p className='m-0' style={{fontFamily : 'InterBold', color : 'black', fontSize : '.75rem'}}>Terkumpul {assignment.total_submitted}/{assignment.total_student} Student</p>
                                                        <p className='m-0' style={{color : 'black', fontSize : '.75rem'}}>DUE : {assignment.deadline_date != null ? base.moment(assignment.deadline_date).format('DD/MM/YY HH:mm') : '-'}</p>
                                                    </div>
                                                    <div className='col col-lg-auto text-right mt-2 mt-lg-0 d-flex align-items-center justify-content-end'>
                                                        <h4 className='m-0' style={{cursor : 'pointer'}}><i className="bi bi-pencil-square" style={{color : '#0085FF'}} onClick={()=>changeView(index, index_assignment)}></i></h4>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
		</>
	)
}