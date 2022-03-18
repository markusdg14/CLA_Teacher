import { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/header';


export default function LessonsIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})

    const [lesson_arr, set_lesson_arr] = useState([
        {title : 'Lesson 1', is_open : true, lesson_detail : [
            {title : 'Daily Lesson', type : 'daily', detail_arr : [
                {title : 'Baca buku bab 1', due_date : base.moment().format('DD/MM/YYYY HH:mm a')},
                {title : 'Baca buku bab 2', due_date : base.moment().format('DD/MM/YYYY HH:mm a')}
            ]},
            {title : 'Weekly Lesson', type : 'weekly', detail_arr : [
                {title : 'Baca buku bab 1', due_date : base.moment().format('DD/MM/YYYY HH:mm a')},
                {title : 'Baca buku bab 2', due_date : base.moment().format('DD/MM/YYYY HH:mm a')}
            ]}
        ], is_open : true},
        {title : 'Lesson 2', is_open : false, lesson_detail : [
            {title : 'Daily Lesson', type : 'daily', detail_arr : [
                {title : 'Baca buku bab 1', due_date : base.moment().format('DD/MM/YYYY HH:mm a')},
                {title : 'Baca buku bab 2', due_date : base.moment().format('DD/MM/YYYY HH:mm a')}
            ]},
            {title : 'Weekly Lesson', type : 'weekly', detail_arr : [
                {title : 'Baca buku bab 1', due_date : base.moment().format('DD/MM/YYYY HH:mm a')},
                {title : 'Baca buku bab 2', due_date : base.moment().format('DD/MM/YYYY HH:mm a')}
            ]}
        ], is_open : false},
        {title : 'Lesson 3', is_open : false, lesson_detail : [
            {title : 'Daily Lesson', type : 'daily', detail_arr : [
                {title : 'Baca buku bab 1', due_date : base.moment().format('DD/MM/YYYY HH:mm a')},
                {title : 'Baca buku bab 2', due_date : base.moment().format('DD/MM/YYYY HH:mm a')}
            ]},
            {title : 'Weekly Lesson', type : 'weekly', detail_arr : [
                {title : 'Baca buku bab 1', due_date : base.moment().format('DD/MM/YYYY HH:mm a')},
                {title : 'Baca buku bab 2', due_date : base.moment().format('DD/MM/YYYY HH:mm a')}
            ]}
        ], is_open : false},
        {title : 'Lesson 4', is_open : false, lesson_detail : [
            {title : 'Daily Lesson', type : 'daily', detail_arr : [
                {title : 'Baca buku bab 1', due_date : base.moment().format('DD/MM/YYYY HH:mm a')},
                {title : 'Baca buku bab 2', due_date : base.moment().format('DD/MM/YYYY HH:mm a')}
            ]},
            {title : 'Weekly Lesson', type : 'weekly', detail_arr : [
                {title : 'Baca buku bab 1', due_date : base.moment().format('DD/MM/YYYY HH:mm a')},
                {title : 'Baca buku bab 2', due_date : base.moment().format('DD/MM/YYYY HH:mm a')}
            ]}
        ], is_open : false},
        {title : 'Lesson 5', is_open : false, lesson_detail : [], is_open : false},
    ])

    function accordionBtn(index){
        var data_index = lesson_arr[index]
        var initSelected = data_index.is_open
        for(var x in lesson_arr){
            lesson_arr[x].is_open = false
        }
        lesson_arr[index].is_open = !initSelected
        
        base.update_array(lesson_arr, set_lesson_arr, data_index, index)
    }

    async function toDetail(index, indexLesson, indexDtl){
        window.location.href = '/lessons/detail?id=123'
    }

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])


    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Lesson'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <form>
                    <div className="input-group shadow bg-white rounded">
                        <div className="input-group-prepend">
                            <span className="input-group-text border-0 pl-4 bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-search"></i></span>
                        </div>
                        <input type="text" className="form-control form-control-lg border-0 bg-transparent" placeholder='Search by Assignment ...' style={{fontSize : '18px', height : '3.5rem'}} />
                    </div>
                </form>
            </div>

            <div className='col-12 mt-5'>
                <div className="accordion shadow rounded" id="accordionLesson">

                    {
                        lesson_arr.map((data, index)=>(
                            <div className="card" key={index}>
                                <div className="card-header p-0 bg-white" id={"heading" + (index)} style={{cursor : 'pointer'}}>
                                    <div className='row m-0'>
                                        <div className='col p-4'>
                                            <img className='position-absolute' src={base.img_borderLeft_primary} style={{height : '100%', left : 0, top : 0}} />
                                                <button className="btn btn-block text-left btn-accordion" type="button" data-toggle="collapse" data-target={"#collapse" + (index)} aria-expanded={(index === 0 ? 'true' : 'false')} aria-controls={"collapse" + (index)} onClick={()=>accordionBtn(index)}>
                                                    <div className='row'>
                                                        <div className='col-auto'>
                                                            <h5 className='m-0 font-weight-bold' style={{color : 'black'}}><i className="bi bi-server text-primary mr-5"></i>{data.title}</h5>
                                                        </div>
                                                        <div className='col text-right'>
                                                            <i className={"fas fa-chevron-" + (data.is_open ? 'up' : 'down')}></i>
                                                        </div>
                                                    </div>
                                                </button>
                                        </div>
                                    </div>
                                </div>

                                <div id={"collapse" + (index)} className={"collapse " + (index === 0 ? 'show' : '')} aria-labelledby={"heading" + (index)} data-parent="#accordionLesson">
                                    <div className="card-body p-0">
                                        {
                                            data.lesson_detail.length > 0 ?
                                            <div className='row m-0'>
                                                {
                                                    data.lesson_detail.map((dataLesson, indexLesson)=>(
                                                        <div className={'col-12 '} key={indexLesson}>
                                                            <div className='row'>
                                                                <div className='col-12 p-4 px-5 d-flex align-items-center' style={{borderBottom : '2px solid #eaeaea'}}>
                                                                    <div>
                                                                        <p className={'m-0 py-2 px-5 text-center' + (dataLesson.type === 'daily' ? ' dailyLesson' : ' weeklyLesson')} style={{borderRadius : '2rem'}}>{dataLesson.title}</p>
                                                                    </div>
                                                                </div>
                                                                <div className='col-12'>
                                                                    <div className='row'>
                                                                        {
                                                                            dataLesson.detail_arr.map((dataDtl, indexDtl)=>(
                                                                                <div className='col-12 py-4 px-5 ' key={indexDtl} style={{cursor : 'pointer', borderBottom : '2px solid #eaeaea', backgroundColor : '#F8F8F8'}} onClick={()=>toDetail(index, indexLesson, indexDtl)}>
                                                                                    <div className="custom-control custom-checkbox">
                                                                                        <input type="checkbox" className="custom-control-input" id={'lessonCheckbox' + (index) + '_' + (indexLesson) + '_' + (indexDtl)} />
                                                                                        <div className='custom-control-label lessonCheckbox' htmlFor={'lessonCheckbox' + (index) + '_' + (indexLesson) + '_' + (indexDtl)}>
                                                                                            <div className='row'>
                                                                                                <div className='col-12 col-lg'>
                                                                                                    <label className="font-weight-bold m-0" style={{cursor : 'pointer', color : 'black'}}>
                                                                                                        <i className="bi bi-sticky-fill mx-3"></i>{dataDtl.title}
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className='col-12 col-lg d-flex justify-content-lg-end mt-2 mt-lg-0'>
                                                                                                    <p className='m-0 ml-3 ml-lg-0' style={{color : '#413F3F'}}>DUE : {dataDtl.due_date}</p>
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
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            :
                                            <div className='row m-0'>
                                                <div className='col-12 text-center p-5'>
                                                    <img src={base.img_study_3} style={{height : '12rem'}} />
                                                    <p className='m-0' style={{color : 'black'}}>You haven’t finish submitting the other assignment.</p>
                                                    <p className='m-0' style={{color : 'black'}}>Come back later after you’re done with the others</p>
                                                </div>
                                            </div>
                                        }
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