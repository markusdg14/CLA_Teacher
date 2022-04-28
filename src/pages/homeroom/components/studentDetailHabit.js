import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';


export default function HomeroomStudentHabitDetail({habit_student_selected, search, changeSearch, accomplished_habit_arr, talents_transaction_arr, viewOnGoing}){
	var base = new Base()

	return(
		<div className='row'>

            <div className='col-12'>
                <div className='row'>
                    <div className='col-12 col-lg-auto'>
                        <div className="card rounded shadow-sm">
                            <div className={"card-body p-3"}>
                                <div className='row'>
                                    <div className='col-auto'>
                                        <img src={habit_student_selected.image_display} style={{height : '4rem', width : '4rem', aspectRatio : 1, borderRadius : '4rem'}} />
                                    </div>
                                    <div className='col-auto pl-0 d-flex align-items-center'>
                                        <h6 className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{habit_student_selected.name}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg mt-3 mt-lg-0'>
                        <div className="card rounded shadow-sm h-100">
                            <div className={"card-body p-3 d-flex align-items-center"}>
                                <div>
                                    <h3 className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>{habit_student_selected.talent_balance}</h3>
                                    <p className='m-0'>Total Talents</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg mt-3 mt-lg-0'>
                        <div className="card rounded shadow-sm h-100">
                            <div className={"card-body p-3 d-flex align-items-center"}>
                                <div>
                                    <h3 className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>Rp. {parseFloat(habit_student_selected.talent_rate.rate).toLocaleString(base.currencyFormat)}</h3>
                                    <p className='m-0'>Kurs per Talent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg-auto mt-3 mt-lg-0'>
                        <div className="card rounded shadow-sm h-100">
                            <div className={"card-body p-3 d-flex align-items-center"}>
                                <div>
                                    <h5 className='m-0 text-secondary' style={{fontFamily : 'InterBold'}}>On Going Habit Challenge</h5>
                                    <button className='btn btn-sm btn-primary rounded px-3 mt-2' onClick={viewOnGoing}>View More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 p-3 pt-4'>
                                <div className='row m-0'>
                                    <div className='col-12 mb-3 pr-3'>
                                        <div className='row'>
                                            <div className='col-12 col-lg'>
                                                <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>History Habit Accomplished</h5>
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
                                                        <th>Category</th>
                                                        <th>Habit</th>
                                                        <th>Talents Received</th>
                                                        <th>Confirmed Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        accomplished_habit_arr.map((data, index)=>(
                                                            <tr key={index}>
                                                                <td className='align-middle td-fit-content'>{base.moment(data.start_date).format('DD/MM') + ' - ' + base.moment(data.end_date).format('DD/MM')}</td>
                                                                <td className='align-middle'>{data.category_habit.name}</td>
                                                                <td className='align-middle'>{data.name}</td>
                                                                <td className='align-middle'>{data.talent_earned}</td>
                                                                <td className='align-middle'>{base.moment(data.done_date).format('DD/MM HH:mm')}</td>
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
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 p-3 pt-4'>
                                <div className='row m-0'>
                                    <div className='col-12 mb-3 pr-3'>
                                        <div className='row'>
                                            <div className='col-12 col-lg'>
                                                <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>In Out Talents</h5>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='col-12'>
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
                                    </div> */}
                                    <div className='col-12 mt-3'>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Date Time</th>
                                                        <th>Talents In</th>
                                                        <th>Talents Out</th>
                                                        <th>Rupiah</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        talents_transaction_arr.map((data, index)=>(
                                                            <tr key={index}>
                                                                <td className='align-middle td-fit-content'>{data.id}</td>
                                                                <td className='align-middle'>{base.moment(data.created_at).format('DD/MM')}</td>
                                                                <td className='align-middle text-secondary'>{data.type === 'in' ? '+' + data.amount : ''}</td>
                                                                <td className='align-middle text-danger'>{data.type === 'out' ? '-' + data.amount : ''}</td>
                                                                <td className='align-middle'>Rp. {parseFloat(data.amount_convert).toLocaleString(base.currencyFormat)}</td>
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