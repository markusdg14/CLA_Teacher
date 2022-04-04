import { useEffect, useState, createRef } from 'react';
import Base from '../../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../../components/header';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import momentPlugin from '@fullcalendar/moment'

export default function CalendarIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})
    const [event_arr, set_event_arr] = useState([])
    const [current_month, set_current_month] = useState('')
    const [calendar_btn_nav] = useState([
        {icon : 'fas fa-chevron-circle-left', type : 'prev', margin : 'mr-2'},
        {icon : 'fas fa-chevron-circle-right', type : 'next', margin : 'ml-2'},
    ])

    const [is_loading, set_is_loading] = useState(true)

    const calendarRef = createRef()

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)

        set_current_month(base.moment().format('MMMM YYYY'))
    }, [])

    useEffect(()=>{
        if(current_month !== ''){
            get_data()
        }
    }, [current_month])


    async function get_data(){
        var month = base.moment(current_month).format('YYYY-MM')
        var url = '/event?month=' + month
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                var data_arr = []
                for(var x in data){
                    var detail_data = {
                        id : data[x].id,
                        title : data[x].name,
                        start : base.moment(data[x].date).format('YYYY-MM-DD'),
                        borderColor : '#0EA5E9'
                    }
                    data_arr.push(detail_data)
                }

                set_event_arr(data_arr)

                setTimeout(() => {
                    set_is_loading(false)
                }, 750);
            }
        }
    }

    function calendarBtn(type){
        set_is_loading(true)
        var calendar = calendarRef.current.getApi()
        if(type === 'prev'){
            calendar.prev()
        }
        else if(type === 'next'){
            calendar.next()
        }
        else if(type === 'today'){
            calendar.today()
        }
        set_current_month(base.moment(calendar.getDate()).format('MMMM YYYY'))
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'calendar'} user_data={user_data} />
            </div>


            <div className='col-12 mt-5 pt-4'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 p-3 pt-3 pb-5'>
                                <img className='position-absolute' src={base.img_leaves} style={{height : '5rem', right : 0, top : '-.5rem'}} />
                                <div className='row m-0'>
                                    <div className='col-12 pr-3'>
                                        <div className='row m-0'>
                                           <div className='col-12 col-lg d-flex align-items-center'>
                                                <h2 className='m-0' style={{fontFamily : 'InterBold', fontSize : '1.75rem'}}><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>{current_month}</h2>
                                            </div>
                                            <div className='col-12 col-lg-auto text-right mt-3 mt-lg-0 d-flex justify-content-end'>
                                                <div className='row m-0 mr-0 mr-lg-5'>
                                                    <div className='col-auto'>
                                                        <button className='btn btn-secondary text-white py-2 px-4 text-uppercase' style={{borderRadius : '.25rem'}} onClick={()=>calendarBtn('today')}>Today</button>
                                                    </div>
                                                    <div className='col-auto d-flex align-items-center'>
                                                        <div className='row'>
                                                            {
                                                                calendar_btn_nav.map((data, index)=>(
                                                                    <div className={'col-auto p-0 ' + data.margin} key={index}>
                                                                        <h4 className='m-0' style={{cursor : 'pointer'}} onClick={()=>calendarBtn(data.type)}><i className={data.icon + " text-secondary"}></i></h4>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>   
                                                    </div>
                                                </div>        
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12' id='calendarView'>
                                        <FullCalendar
                                            ref={calendarRef}
                                            plugins={[ dayGridPlugin, momentPlugin ]}
                                            initialView="dayGridMonth"
                                            headerToolbar={{
                                                left : '',
                                                right : ''
                                            }}
                                            firstDay={'1'}
                                            dayHeaderFormat={{weekday : 'long'}}
                                            eventTimeFormat={{hour : '2-digit', minute : '2-digit'}}
                                            eventSources={[
                                                {
                                                    events : event_arr,
                                                    color : '#0EA5E91A',
                                                    textColor : '#0369A1'
                                                }
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className='col-12 mt-5 pt-3'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className='row m-0'>
                            <div className='col-12 p-4 px-5'>
                                <div className='row'>
                                    <div className='col-auto'>
                                        <img src={base.img_study_1} style={{height : '10rem'}} />
                                    </div>
                                    <div className='col ml-5'>
                                        {
                                            !is_loading ?
                                            <>
                                                {
                                                    event_arr.length > 0 ?
                                                    <div className='row'>
                                                        {
                                                            event_arr.map((data, index)=>(
                                                                <div className='col-6 mb-4' key={index}>
                                                                    <div className='row'>
                                                                        <div className='col-auto'>
                                                                            <div className='bg-primary d-flex align-items-center justify-content-center rounded' style={{height : '3.5rem', width : '3.5rem'}}>
                                                                                <p className='m-0 text-white' style={{fontFamily : 'InterBold', fontSize : '1.5rem'}}>{base.moment(data.date).format('DD')}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col'>
                                                                            <p className='m-0' style={{fontSize : '.75rem'}}>8:30 - 9:00 AM</p>
                                                                            <p className='m-0 font-weight-bold' style={{color : 'black', fontSize : '1.25rem'}}>{data.title}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            ))
                                                        }
                                                    </div>
                                                    :
                                                    <div className='h-100 d-flex align-items-center justify-content-center'>
                                                        <h4>No Data</h4>
                                                    </div>
                                                }
                                            </>
                                            :
                                            <div className='h-100 d-flex align-items-center justify-content-center'>
                                                <h4>Please Wait...</h4>
                                            </div>
                                        }
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