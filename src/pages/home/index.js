import { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/header';

import HomeList from '../../components/homeList';


export default function HomeIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : '', name : ''}, arr_schedule : {}})
    
    const [to_do_list_arr, set_to_do_list_arr] = useState([])

    const [schedule_lesson_day_arr, set_schedule_lesson_day_arr] = useState([])
    const [schedule_lesson_time_arr, set_schedule_lesson_time_arr] = useState([])
    const [schedule_arr, set_schedule_arr] = useState([])

    const [schedule_page, set_schedule_page] = useState('1')

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(async ()=>{
        if(user_data.id !== ''){
            get_todo()
            get_schedule()
        }
    }, [user_data])

    useEffect(async ()=>{
		// set_schedule_lesson_time_arr([])
		set_schedule_arr([])
		get_schedule()
	}, [schedule_page])

    async function get_todo(){
        var url = '/announcement?type=for_student_teacher'
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                // for(var x in data){
                //     data[x].title = data[x].todo
                // }
                set_to_do_list_arr(data)
            }
        }
    }

    async function get_schedule(){
        var counter_time = ''
        var limit_time = ''
        counter_time = base.moment('08:00', 'HH:mm')
        // if(schedule_page === '1'){
        //     limit_time = base.moment('10:30', 'HH:mm')
        // }
        // else if(schedule_page === '2'){
        //     counter_time = base.moment('11:00', 'HH:mm')
        // }
        limit_time = base.moment('13:45', 'HH:mm')
        var arr_time = []

        while(counter_time.isSameOrBefore(limit_time)){
            arr_time.push({
                id: counter_time.format('HH:mm'),
                name: counter_time.format('HH:mm'),
                name_sm: counter_time.format('HH:mm'),
                counter : counter_time.add(15, 'm').format('HH:mm')
            })
            // counter_time.add(30, 'm')
        }

        set_schedule_lesson_time_arr(arr_time)

        var day_arr = []

        for(var x=1;x<=5;x++){
            var weekStartDate = base.moment().day(x)
            day_arr.push({id : x, title : base.moment(weekStartDate).format('dddd')})
        }
        await set_schedule_lesson_day_arr(day_arr)

        var arr_schedule = []
        var data = user_data.arr_schedule
        set_schedule_arr(data)
    }

    async function showMoreSchedule(){
		if(schedule_page === '1'){
			set_schedule_page('2')
		}
		else{
			set_schedule_page('1')
		}
	}

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Dashboard'} user_data={user_data} />
            </div>

            <div className='col-12 pt-4 mt-3'>
                <HomeList
                    data_arr={to_do_list_arr}
                    title={'Annoucement'}
                    icon={'fas fa-folder'}

                />
            </div>

            <div className='col-12 mt-3'>

                <div className='card p-0 rounded border-0'>
                    <div className='card-body p-0 pb-3'>
                        <div className='row m-0'>
                            <div className='col-12 p-0 rounded'>
                                <div className="table-responsive rounded">
                                    <table className="table table-fixed-lg">
                                        <tbody className='bg-white'>
                                            <tr className='' style={{backgroundColor : '#F9FAFB', borderBottom : '1px solid #E5E7EB'}}>
                                                <th className='border-0 '></th>
                                                {
                                                    schedule_lesson_day_arr.map((day_data, day_index)=>(
                                                        <th className='text-center border-0 schedule_day' style={{color : '#8A92A6'}} key={day_index}>{day_data.title}</th>
                                                    ))
                                                }
                                            </tr>
                                            {
                                                schedule_lesson_time_arr.map((data_time, index_time)=>(
                                                    <tr key={index_time}>
                                                        <td className='border-0 px-0 pt-1 pb-0 align-middle td-fit-content'>
                                                            <p className='m-0 p-0 px-1 px-lg-3 schedule_time'>{data_time.name + ' - ' + data_time.counter}</p>
                                                        </td>

                                                        {
                                                            schedule_arr != null &&
                                                            <>
                                                                {
                                                                    schedule_arr[schedule_lesson_day_arr[0].id] != null && schedule_arr[schedule_lesson_day_arr[0].id][data_time.name] != null && schedule_arr[schedule_lesson_day_arr[0].id][data_time.name].type === 'event' ?
                                                                    <td className='border-0 px-0 pt-1 pb-0 align-middle' colSpan={5}>
                                                                        <div className='h-100 px-2'>
                                                                            <div className='m-0 p-2 px-3 rounded' style={{backgroundColor : '#EBEFE2'}}>
                                                                                <p className='m-0 schedule_subject text-center' style={{color : '#B6C0A0', fontFamily : 'InterBold', lineHeight : '1rem'}}>
                                                                                    {schedule_arr[schedule_lesson_day_arr[0].id][data_time.name].type === 'schedule' ? schedule_arr[schedule_lesson_day_arr[0].id][data_time.name].subject.name : schedule_arr[schedule_lesson_day_arr[0].id][data_time.name].name}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    <>
                                                                        {
                                                                            schedule_lesson_day_arr.map((data_day, index_day)=>(
                                                                                <td className='border-0 px-0 pt-1 pb-0 align-middle' key={index_day}>
                                                                                    {
                                                                                        schedule_arr[data_day.id] != null && schedule_arr[data_day.id][data_time.name] != null && schedule_arr[data_day.id][data_time.name].start_time != null ?
                                                                                        <div className='h-100 px-2'>
                                                                                            <div className='p-2 d-flex align-items-center' style={{borderLeft : '.5rem solid #DE496E', backgroundColor : '#DE496E33', borderRadius : '.5rem'}}>
                                                                                                    <div>
                                                                                                        <p className='m-0 schedule_subject h-100' style={{color : '#6B7280', lineHeight : '1rem'}}>
                                                                                                            {schedule_arr[data_day.id][data_time.name].type === 'schedule' ? schedule_arr[data_day.id][data_time.name].subject.name + ' - ' + schedule_arr[data_day.id][data_time.name].class_model.grade.name : schedule_arr[data_day.id][data_time.name].name}
                                                                                                        </p>
                                                                                                    </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        :
                                                                                        <></>
                                                                                    }
                                                                                </td>
                                                                            ))
                                                                        }
                                                                    </>
                                                                }
                                                            </>
                                                        }

                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* <div className='col-12 mt-3'>
                                <button className='btn btn-primary shadow-sm rounded w-100' onClick={()=>showMoreSchedule()}><i className={(schedule_page === '1' ? 'bi bi-arrow-down-circle-fill' : 'bi bi-arrow-left-circle-fill') + " text-white mr-3"}></i>{schedule_page === '1' ? 'Next Schedule' : 'Back'}</button>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 p-0 p-lg-3 pt-2 pt-lg-4 pb-2 pb-lg-5'>
                                <img className='position-absolute d-none d-lg-block' src={base.img_leaves} style={{height : '5rem', right : 0, top : '-.75rem'}} />
                                <div className='row m-0'>
                                    <div className='col-12 mb-0 mb-lg-3 pr-3'>
                                        <div className='row m-0'>
                                            <div className='col-12 col-lg px-0'>
                                                <h5 className='m-0 homeListTitle'><i className="bi bi-chat-square-dots-fill mr-2 mr-lg-3" style={{color : '#00000066'}}></i>Teaching Schedule</h5>
                                            </div>
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
                                                                <td className='text-center border-0 schedule_day' style={{color : '#8A92A6'}} key={day_index}>{day_data.title}</td>
                                                            ))
                                                        }
                                                    </tr>
                                                    {
                                                        schedule_lesson_time_arr.map((data_time, index_time)=>(
                                                            <tr key={index_time}>
                                                                <td className='border-0 pb-2 p-0 mb-2 text-center align-middle td-fit-content-sm'>
                                                                    <p className='m-0 p-1 px-1 px-lg-3 schedule_time'>{data_time.name}</p>
                                                                </td>
                                                                {
                                                                    schedule_lesson_day_arr.map((data_day, index_day)=>(
                                                                        <td className='border-0 p-0 pb-2 align-middle' key={index_day}>
                                                                            {
                                                                                user_data.arr_schedule != null ?
                                                                                <>
                                                                                    {
                                                                                        user_data.arr_schedule[data_day.id] != null && user_data.arr_schedule[data_day.id][data_time.name] != null && user_data.arr_schedule[data_day.id][data_time.name].start_time != null ?
                                                                                        <div className='h-100 px-2'>
                                                                                            <div className='m-0 p-2 px-3 rounded' style={{backgroundColor : '#EBEFE2'}}>
                                                                                                <p className='m-0 schedule_subject text-center' style={{color : '#B6C0A0', fontFamily : 'InterBold', lineHeight : '1rem', fontSize : '.75rem'}}>{user_data.arr_schedule[data_day.id][data_time.name].class_model.grade.name} {user_data.arr_schedule[data_day.id][data_time.name].class_model.name}</p>
                                                                                                <p className='m-0 schedule_subject text-center' style={{color : '#B6C0A0', fontFamily : 'InterBold', lineHeight : '1rem', fontSize : '.75rem'}}>{user_data.arr_schedule[data_day.id][data_time.name].subject.name}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        :
                                                                                        <div className='h-100 px-2'>
                                                                                            <div className='m-0 p-2 px-3 rounded' style={{backgroundColor : '#F7F7F7'}}>
                                                                                                <p className='m-0 schedule_subject text-center' style={{color : '#F7F7F7', fontFamily : 'InterBold', lineHeight : '1rem', userSelect : 'none', fontSize : '.75rem'}}>-</p>
                                                                                                <p className='m-0 schedule_subject text-center' style={{color : '#F7F7F7', fontFamily : 'InterBold', lineHeight : '1rem', userSelect : 'none', fontSize : '.75rem'}}>-</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                </>
                                                                                :
                                                                                <div className='h-100 px-2'>
                                                                                    <div className='m-0 p-2 px-3 rounded' style={{backgroundColor : '#F7F7F7'}}>
                                                                                        <p className='m-0 schedule_subject text-center' style={{color : '#F7F7F7', fontFamily : 'InterBold', lineHeight : '1rem', userSelect : 'none', fontSize : '.75rem'}}>-</p>
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

                                    <div className='col-12 d-block d-lg-none text-right mt-2'>
                                        <img className='' src={base.img_leaves} style={{height : '2.75rem'}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div> */}

        </div>
    )
}