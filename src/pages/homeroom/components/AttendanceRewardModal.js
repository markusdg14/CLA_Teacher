import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AttendanceRewardModal({submission, changeAttendance, changeInput, postReward, student_arr, attendance_reward_student_selected, attendance_score_arr, reward_score_arr, reward_arr, attendance_all_one, attendance_date, attendance_date_arr,
    point_transaction_arr, attendance_point_data}){
    var base = new Base()

    return(
        <div className="modal fade" id="attendanceRewardModal" tabIndex="-1" aria-labelledby="attendanceRewardModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content rounded border-0 shadow-sm">
                    <div className="modal-body p-0">
                        <div className={'row m-0'}>
                            <div className='col-12 p-3 pt-4 pb-5'>
                                <div className='row m-0'>
                                    <div className='col-12 mb-3'>
                                        <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Add Attendance & Reward</h5>
                                    </div>

                                    <div className='col-12 mt-3 pb-3' style={{borderBottom : '1px solid #EAEAEA'}}>
                                        <div className='row m-0'>
                                            <div className='col-auto'>
                                                <label>Student</label>
                                                <SelectOption data_arr={student_arr} selected={attendance_reward_student_selected} title={'Student'} changeInput={(value)=>changeAttendance(value, 'student')} />
                                            </div>
                                            <div className='col-auto'>
                                                <label>Date</label>
                                                <DatePicker
                                                    selected={(attendance_date === '' ? '' : new Date(attendance_date))}
                                                    onChange={date => changeAttendance(date, 'date')}
                                                    maxDate={new Date()}
                                                    timeFormat="HH:mm"
                                                    dateFormat="dd MMMM yyyy"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12 mt-3'>
                                        <div className='row'>
                                            <div className='col-12 p-0'>
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Date</th>
                                                                {
                                                                    reward_arr.map((data, index)=>(
                                                                        <th key={index}>{data.name}</th>
                                                                    ))
                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                attendance_date_arr.map((data, index)=>(
                                                                    <tr key={index}>
                                                                        <td>
                                                                            {data.name}
                                                                        </td>
                                                                    {
                                                                        reward_arr.map((data_reward, index_reward)=>(
                                                                            <td key={index_reward}>
                                                                                {
                                                                                    attendance_point_data != null ?
                                                                                    <>
                                                                                    {
                                                                                        attendance_point_data[data_reward.id] != null ?
                                                                                        <>
                                                                                        {
                                                                                            attendance_point_data[data_reward.id][data.name].id != null ?
                                                                                            <>
                                                                                            <div className='row'>
                                                                                                {
                                                                                                    data_reward.name === 'Attendance' ?
                                                                                                    <>
                                                                                                    {
                                                                                                        attendance_score_arr.map((data_score, index_attendance_score)=>(
                                                                                                            <RadioScore index={index_attendance_score} name={data_score.name} id={data_score.id} is_checked={data_score.id == attendance_point_data[data_reward.id][data.name].amount} radio_id={'radio-' + data.id + '-' + data_reward.id + '-' + data_score.id} />
                                                                                                        ))
                                                                                                    }
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                    {
                                                                                                        reward_score_arr.map((data_score, index_reward_score)=>(
                                                                                                            <RadioScore index={index_reward_score} name={data_score.name} id={data_score.id} is_checked={data_score.id == attendance_point_data[data_reward.id][data.name].amount} radio_id={'radio-' + data.id + '-' + data_reward.id + '-' + data_score.id} />
                                                                                                        ))
                                                                                                    }
                                                                                                    </>
                                                                                                }
                                                                                            </div>
                                                                                            </>
                                                                                            :
                                                                                            <>
                                                                                            <div className='row'>
                                                                                                {/* {
                                                                                                    data_reward.name === 'Attendance' ?
                                                                                                    <>
                                                                                                    {
                                                                                                        attendance_score_arr.map((data_score, index_attendance_score)=>(
                                                                                                            <RadioScore index={index_attendance_score} name={data_score.name} id={data_score.id} is_checked={data_score.is_checked} />
                                                                                                        ))
                                                                                                    }
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                    {
                                                                                                        reward_score_arr.map((data_score, index_reward_score)=>(
                                                                                                            <RadioScore index={index_reward_score} name={data_score.name} id={data_score.id} is_checked={data_score.is_checked} />
                                                                                                        ))
                                                                                                    }
                                                                                                    </>
                                                                                                } */}
                                                                                            </div>
                                                                                            </>
                                                                                        }
                                                                                        </>
                                                                                        :
                                                                                        <></>
                                                                                    }
                                                                                    </>
                                                                                    :
                                                                                    <></>
                                                                                }
                                                                            </td>
                                                                        ))
                                                                    }
                                                                    </tr>
                                                                ))
                                                            }
                                                            <tr></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='col-12 mt-4'>
                                        <div className='row m-0'>
                                            <div className='col'>
                                                <button className='btn btn-primary rounded shadow-sm px-5' onClick={postReward}>Submit</button>
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

function RadioScore({index, name, id, is_checked, radio_id}){
    return(
        <div className='col-auto' key={index}>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" id={radio_id} value={id} checked={is_checked} onChange={()=>console.log(index)} />
                <label className="form-check-label" htmlFor={radio_id} style={{color : 'black'}}>
                    {name}
                </label>
            </div>
        </div>
    )
}