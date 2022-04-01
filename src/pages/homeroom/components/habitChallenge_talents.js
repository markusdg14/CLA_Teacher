import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';


export default function HomeroomHabitChallengeTalent({search, changeSearch, student_arr, to_be_confirm_habit_arr, viewDetailHabit}){
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
                                                <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>To Be Confirm Completed Habit</h5>
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
                                            <div className='col-auto d-flex align-items-center'>
                                                <p className='m-0' style={{color : 'black'}}><i className="bi bi-sort-up"></i> Sort</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 mt-3'>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Student Name</th>
                                                        <th>Habit</th>
                                                        <th>Category</th>
                                                        <th>Earned Talents</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        to_be_confirm_habit_arr.map((data, index)=>(
                                                            <tr key={index}>
                                                                <td className='align-middle td-fit-content'>{base.moment(data.date).format('DD/MM')}</td>
                                                                <td className='align-middle'>{data.class_student.user.name}</td>
                                                                <td className='align-middle'>{data.habit.name}</td>
                                                                <td className='align-middle'>{data.habit.category_habit.name}</td>
                                                                <td className='align-middle'>{data.talent_earned}</td>
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

            <div className='col-12 mt-5'>
                <div className='row'>
                    {
                        student_arr.map((data, index)=>(
                            <div className='col-6 col-lg-3 mb-3' key={index}>
                                <div className="card rounded shadow-sm">
                                    <div className={"card-body p-3 py-4"}>
                                        <div className='row'>
                                            <div className='col-12 text-center'>
                                                <img src={data.image_display} style={{height : '5rem', width : '5rem', aspectRatio : 1, borderRadius : '5rem'}} />
                                            </div>
                                            <div className='col-12 mt-2 text-center'>
                                                <h5 className='m-0 text-center'>{data.name}</h5>
                                                <p className='m-0 text-center'>{data.talent_balance} Talents | {data.total_ongoing_habit_tracker} Ongoing</p>
                                            </div>
                                            <div className='col-12 mt-3 text-center'>
                                                <button className='btn btn-sm btn-primary rounded px-3' onClick={()=>viewDetailHabit(index)}>View More</button>
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