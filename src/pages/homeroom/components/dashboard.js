import { useEffect, useState } from 'react';
import Base from '../../../utils/base';


export default function HomeroomDashboard({rank_student_arr, schedule_lesson_day_arr, schedule_lesson_time_arr, schedule_arr, school_subject_arr, search, changeSearch}){
    var base = new Base()

    return(
        <div className='row'>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-12 col-lg-6'>
                        <DashboardList data_arr={rank_student_arr} type={'rank'} title={'Rank Student by Grade'} />
                    </div>

                    <div className='col-12 col-lg-6 mt-3 mt-lg-0'>
                        <DashboardList data_arr={[]} type={'todo_list'} title={'To Do List'} />
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
                                        <div className='row m-0'>
                                            <div className='col-12 col-lg'>
                                                <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Student Lesson</h5>
                                            </div>
                                            {/* <div className='col-12 col-lg-auto text-right mt-3 mt-lg-0 d-flex justify-content-end'>
                                                <div className='row m-0 mr-0 mr-lg-5'>
                                                    {
                                                        lesson_tracker_btn_arr.map((data, index)=>(
                                                            <div className={'col-auto p-0 ' + data.margin}>
                                                                <h4 className='m-0' style={{cursor : 'pointer'}} onClick={()=>lessonTrackerBtn(data.type)}><i className={data.icon + " text-secondary"}></i></h4>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className="table-responsive">
                                            <table className="table table-fixed-lg">
                                                <tbody>
                                                    <tr>
                                                        <td className='border-0'></td>
                                                        {
                                                            schedule_lesson_day_arr.map((day_data, day_index)=>(
                                                                <th className='text-center border-0' style={{color : '#8A92A6'}} key={day_index}>{day_data.title}</th>
                                                            ))
                                                        }
                                                    </tr>
                                                    {
                                                        schedule_lesson_time_arr.map((data_time, index_time)=>(
                                                            <tr key={index_time}>
                                                                <td className='border-0 pb-2 p-0 mb-2 text-center align-middle td-fit-content-sm'>
                                                                    <p className='m-0 p-1 px-3'>{data_time.name}</p>
                                                                </td>
                                                                {
                                                                    schedule_lesson_day_arr.map((data_day, index_day)=>(
                                                                        <td className='border-0 p-0 pb-2' key={index_day}>
                                                                            {
                                                                                schedule_arr[data_day.id] != null && schedule_arr[data_day.id][data_time.name] != null && schedule_arr[data_day.id][data_time.name].start_time != null ?
                                                                                <div className='h-100 px-2'>
                                                                                    <div className='m-0 p-2 px-3 rounded' style={{backgroundColor : '#EBEFE2'}}>
                                                                                        <p className='m-0 font-weight-bold' style={{color : '#B6C0A0', fontSize : '.75rem', lineHeight : '1rem'}}>{schedule_arr[data_day.id][data_time.name].subject.name}</p>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                <div className='h-100 px-2'>
                                                                                    <div className='m-0 p-2 px-3 rounded' style={{backgroundColor : '#F7F7F7'}}>
                                                                                        <p className='m-0 font-weight-bold' style={{color : '#F7F7F7', fontSize : '.75rem', lineHeight : '1rem', userSelect : 'none'}}>-</p>
                                                                                    </div>
                                                                                </div>
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
                                                <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>School Subject</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='row m-0'>
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
                                        <div className='row m-0'>
                                            <div className='col-12'>
                                                <div className="table-responsive">
                                                    <table className="table table-fixed-lg">
                                                        <thead>
                                                            <tr>
                                                                <th className=''>ID</th>
                                                                <th className=''>Subject</th>
                                                                <th className=''>Lesson Plan</th>
                                                                <th className=''>Teacher Assigned</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                school_subject_arr.map((data, index)=>(
                                                                    <tr key={index}>
                                                                        <td>{data.id}</td>
                                                                        <td>{data.name}</td>
                                                                        <td>{data.subject_type.name}</td>
                                                                        <td>{data.teacher}</td>
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

            </div>

        </div>
    )
}

function DashboardList({title, data_arr, type}){
    const base = new Base()
    return(
        <div className="card rounded shadow-sm h-100">
            <div className={"card-body p-0"}>
                <div className={'row m-0'}>
                    <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                    <div className='col-12 p-3 pt-4 pb-5'>
                        <div className='row m-0'>
                            <div className='col-12 mb-4'>
                                <div className='row m-0'>
                                    <div className='col p-0 d-flex align-items-center'>
                                        <h5 className='m-0'>{title}</h5>
                                    </div>
                                </div>
                            </div>
                            {
                                data_arr.length > 0 ?
                                <>
                                    {
                                        data_arr.map((data, index)=>(
                                            <div className={'col-12' + (index !== 0 ? ' mt-3' : '')} key={index}>
                                                <div className='row m-0'>
                                                    {
                                                        type === 'rank' ?
                                                        <>
                                                            <div className='col-auto p-0 d-flex align-items-center'>
                                                                <p className='m-0' style={{color : 'black'}}>#{index+1}</p>
                                                            </div>
                                                            <div className='col-auto d-flex align-items-center justify-content-center'>
                                                                <img src={data.class_student.user.image_display} style={{height : '3.5rem', width : '3.5rem', aspectRatio : 1, borderRadius : '3.5rem'}} />
                                                            </div>
                                                            <div className='col p-0 d-flex align-items-center'>
                                                                <div>
                                                                    <p className='m-0 text-capitalize' style={{color : 'black', fontFamily : 'InterBold'}}>{data.class_student.user.name}</p>
                                                                    <p className='m-0 text-capitalize' style={{fontSize : '.75rem'}}>{data.class_student.user.id}</p>
                                                                </div>
                                                            </div>
                                                            <div className='col p-0 d-flex align-items-center justify-content-end'>
                                                                <h4 className='m-0 text-capitalize' style={{color : 'black', fontFamily : 'InterBold'}}>{data.total_score}</h4>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                        <div className='col-auto p-0 d-flex align-items-center justify-content-center'>
                                                            <div style={{height : '1.25rem', width : '1.25rem', border : '2px solid #8C9196', borderRadius : '.25rem'}}></div>
                                                        </div>
                                                        <div className='col d-flex align-items-center'>
                                                            <p className='m-0 text-capitalize'>{data.title}</p>
                                                        </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                                :
                                <div className='col-12 text-center'>
                                    <h4>No Data</h4>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}