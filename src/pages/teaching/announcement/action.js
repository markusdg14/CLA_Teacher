import { useEffect, useState, useMemo, useRef } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import NoData from '../../../components/NoData';
import UnderConstruction from '../../../components/underConstruction';
import SelectOption from '../../../components/selectOption';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AnnouncementAction(){
    var base = new Base()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : ''}})

    const [grade_arr, set_grade_arr] = useState([])
    const [selected_grade, set_selected_grade] = useState('')
    const [selected_user_type, set_selected_user_type] = useState('')
    const [title, set_title] = useState('')
    const [body, set_body] = useState('')

    const [data_arr, set_data_arr] = useState([])
    const [academic_year, set_academic_year] = useState([])
    const [time_selected, set_time_selected] = useState('')

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(()=>{
        if(user_data.id != null){
            get_user_type()
            get_grade()
            set_academic_year([user_data.current_academic_year])
            if(query.get('type') === 'edit'){
                get_data()
            }
        }
    }, [user_data])

    async function get_data(){
        var url = '/announcement?id=' + query.get('id')
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                set_selected_grade(data.grade.id)
                set_title(data.title)
                set_time_selected(data.publish_at)
                set_body(data.body)
            }
        }
    }

    async function get_user_type(){
        var url = '/type/all?name=student'
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                set_selected_user_type(data[0])
            }
        }
    }


    async function get_grade(){
        var url = '/academic-year/grade?academic_year_id=' + user_data.current_academic_year.id
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                set_grade_arr(data)
            }
        }
    }

    async function changeInput(type, value){
        if(type === 'grade'){
            set_selected_grade(value)
        }
        else if(type === 'title'){
            set_title(value)
        }
        else if(type === 'publish_at'){
            set_time_selected(value)
        }
        else if(type === 'body'){
            set_body(value)
        }
    }

    async function submit(){
        var url = '/announcement'
        var method = (query.get('type') === 'add' ? 'post' : 'put')

        var data_post = {
            title : title,
            body : body,
            academic_year : {id : user_data.current_academic_year.id},
            grade : {id : selected_grade},
            type : selected_user_type,
            publish_at : base.moment(time_selected).format('DD/MM/YYYY HH:mm')
        }

        if(query.get('type') === 'edit'){
            data_post.id = query.get('id')
        }

        console.log(JSON.stringify(data_post))
        var response = await base.request(url, method, data_post)
        if(response != null){
            if(response.status == 'success'){
                window.location.replace('/announcement')
            }
        }
    }

    function backBtn(){
        window.location.replace('/announcement')
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Announcement'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                    <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                </div>
            </div>

            <div className='col-12 mt-5'>
                <div className='row'>
                    <div className='col-12 mt-3 mt-lg-0'>
                        <div className="card rounded shadow-sm">
                            <div className={"card-body p-0"}>
                                <div className={'row m-0'}>
                                    <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                    <div className='col-12 p-3 pt-4'>
                                        <div className='row m-0'>

                                            <div className='col-12'>
                                                <p className='m-0' style={{color : 'black'}}>Pick Academic Year</p>
                                                <SelectOption data_arr={academic_year} selected={user_data.current_academic_year.id} title={'Academic Year'} disabled={true} />
                                            </div>
                                            <div className='col-12 mt-3'>
                                                <p className='m-0' style={{color : 'black'}}>Pick Grade</p>
                                                <SelectOption data_arr={grade_arr} selected={selected_grade} title={'Grade'} changeInput={(value)=>changeInput('grade', value)} />
                                            </div>
                                            <div className='col-12 mt-3'>
                                                <p className='m-0' style={{color : 'black'}}>Title</p>
                                                <input type='text' className="form-control rounded" value={title} style={{borderColor : '#EAEAEA'}} onChange={(e)=>changeInput('title', e.target.value)}/>
                                            </div>
                                            <div className='col-12 mt-3'>
                                                <p className='m-0' style={{color : 'black'}}>Body</p>
                                                <textarea className="form-control rounded mt-2" rows={5} onChange={(e)=>changeInput('body', e.target.value)} value={body} style={{resize : 'none', border : '1px solid #EAEAEA'}} placeholder=""></textarea>
                                            </div>

                                            <div className='col-12 mt-3'>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <p className='m-0' style={{color : 'black'}}>Publish At</p>
                                                        <DatePicker
                                                            selected={time_selected !== '' ? new Date(time_selected) : ''}
                                                            onChange={date => changeInput('publish_at', date)}
                                                            timeFormat="HH:mm"
                                                            dateFormat="dd MMMM yyyy HH:mm"
                                                            showTimeSelect={true}
                                                        />
                                                    </div>
                                                    {/* <div className='col-6'>
                                                        <p className='m-0' style={{color : 'black'}}>Publish Time</p>
                                                        <input type='text' className="form-control rounded" value={title} style={{borderColor : '#EAEAEA'}} onChange={(e)=>changeInput('title', e.target.value)}/>
                                                    </div> */}
                                                </div>
                                            </div>

                                            <div className='col-12 my-3 text-right'>
                                                <button className='btn btn-primary rounded' onClick={()=>submit()}>Submit</button>
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