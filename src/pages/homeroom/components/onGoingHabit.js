import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';


export default function HomeroomStudentHabitOnGoing({habit_student_selected, on_goingHabit_arr, toggleHabitOnGoing}){
	var base = new Base()

	return(
		<div className='row'>

            <div className='col-12'>
                <div className='row'>
                    <div className='col-auto'>
                        <div className="card rounded shadow-sm">
                            <div className={"card-body p-3"}>
                                <div className='row'>
                                    <div className='col'>
                                        <img src={habit_student_selected.image_display} style={{height : '4rem', width : '4rem', aspectRatio : 1, borderRadius : '4rem'}} />
                                    </div>
                                    <div className='col-auto pl-0 d-flex align-items-center'>
                                        <h6 className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{habit_student_selected.name}</h6>
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
                        on_goingHabit_arr.map((data, index)=>(
                            <div className='col-6' key={index}>
                                <div className="card rounded shadow-sm">
                                    <div className={"card-body p-3"}>
                                        <div className='row'>
                                            <div className='col-12 px-4 py-1'>
                                                <div className='row m-0'>
                                                    <div className='col-12 p-0' style={{cursor : 'pointer'}} onClick={()=>toggleHabitOnGoing(index)}>
                                                        <div className='row'>
                                                            <div className='col-auto'>
                                                                <h2 className='m-0'><i className="bi bi-bookmark-check-fill text-primary mr-3"></i></h2>
                                                            </div>
                                                            <div className='col p-0 d-flex align-items-center'>
                                                                <h5 className='m-0'>{data.habit.name}</h5>
                                                            </div>
                                                            <div className='col d-flex align-items-center justify-content-end'>
                                                                <i className={"fas fa-chevron-up"}></i>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {
                                                        data.is_show &&
                                                        <>
                                                            <div className='col-12 mt-3 p-0'>
                                                                <div className='row'>
                                                                    <div className='col'>
                                                                        <p className='m-0 text-primary'>Habit Category</p>
                                                                        <p className='m-0 text-primary' style={{fontFamily : 'InterBold'}}>{data.habit.category_habit.name}</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p className='m-0 text-primary'>Duration of Habit</p>
                                                                        <p className='m-0 text-primary' style={{fontFamily : 'InterBold'}}>{base.moment(data.start_date).format('DD MMM')} - {base.moment(data.end_date).format('DD MMM')}</p>
                                                                    </div>
                                                                    <div className='col'>
                                                                        <p className='m-0 text-primary'>Goals</p>
                                                                        <p className='m-0 text-primary' style={{fontFamily : 'InterBold'}}>{base.moment(data.end_date).format('DD/MM')}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-12 mt-3 p-0'>
                                                                <div className='table-responsive'>
                                                                    <table className="table table-borderless">
                                                                        <tbody>
                                                                            {
                                                                                data.day_arr.map((data_day, index_day)=>(
                                                                                    <tr key={index_day}>
                                                                                        {
                                                                                            data_day.map((data_day1, index_day1)=>(
                                                                                                <td className='text-center align-middle' key={index_day1}>
                                                                                                    {
                                                                                                        data_day1.is_done ? 
                                                                                                        <h3 className='m-0'><i className="bi bi-check-circle-fill text-secondary"></i></h3>
                                                                                                        :
                                                                                                        <p className='m-0'>{data_day1.date}</p>
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
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>


		</div>
	)
}