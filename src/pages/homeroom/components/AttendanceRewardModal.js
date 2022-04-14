import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';

export default function AttendanceRewardModal({submission, changeFileInput, changeInput, postAssignment, student_arr, attendance_reward_student_selected}){
    var base = new Base()

    return(
        <div className="modal fade" id="attendanceRewardModal" tabIndex="-1" aria-labelledby="attendanceRewardModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content rounded border-0 shadow-sm">
                    <div className="modal-body p-0">
                        <div className={'row m-0'}>
                            <div className='col-12 p-3 pt-4 pb-5'>
                                <div className='row m-0'>
                                    <div className='col-12 mb-3'>
                                        <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Add Attendance & Reward</h5>
                                    </div>

                                    <div className='col-12 mt-3'>
                                        <div className='row m-0'>
                                            <div className='col'>
                                                <SelectOption data_arr={student_arr} selected={attendance_reward_student_selected} title={'Student'} changeInput={(value)=>changeInput(value, 'grade')} />
                                            </div>
                                            <div className='col'>
                                                <button className='btn btn-primary rounded shadow-sm px-5'>Filter</button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='col-12 mt-4'>
                                        <div className='row m-0'>
                                            <div className='col'>
                                                <button className='btn btn-primary rounded shadow-sm px-5' onClick={postAssignment}>Submit</button>
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