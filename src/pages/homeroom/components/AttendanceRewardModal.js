import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';

export default function AttendanceRewardModal({submission, changeAttendance, changeInput, postReward, student_arr, attendance_reward_student_selected, attendance_score_arr, reward_score_arr, reward_arr, attendance_all_one}){
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
                                        </div>
                                    </div>

                                    <div className='col-12 mt-3'>
                                        <div className='row m-0'>
                                            {
                                                reward_arr.map((data, index)=>(
                                                    <div className='col-6 mb-3' key={index}>
                                                        <div className='row'>
                                                            <div className='col-6 d-flex align-items-center'>
                                                                <p className='m-0'>{data.name}</p>
                                                            </div>
                                                            <div className='col-6'>
                                                                {
                                                                    data.name === 'Spiritual Growth' ?
                                                                    <input type={'number'} className='form-control rounded' style={{borderColor : '#EAEAEA'}} value={(attendance_all_one ? '1' : '0')} readOnly />
                                                                    :
                                                                    <SelectOption data_arr={(data.name === 'Attendance' ? attendance_score_arr : reward_score_arr)} selected={data.score} title={''} changeInput={(value)=>changeAttendance(value, 'reward', index)} />
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
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