import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import CardSubject from '../../../components/cardSubject';
import NoData from '../../../components/NoData'
import ActiveUnactiveData from '../../../components/activeUnactiveData';

import Select from 'react-select'

export default function SubjectLesson(){
    var base = new Base()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})
    const [current_data_arr, set_current_data_arr] = useState([])
    const [past_data_arr, set_past_data_arr] = useState([])
    const [assignment_data, set_assignment_data] = useState()

    const [filter_grade_arr, set_filter_grade_arr] = useState([
        {name : 'Grade 1', label : 'Grade 1', value : 'Grade 1'},
        {name : 'Grade 2', label : 'Grade 2', value : 'Grade 2'},
        {name : 'Grade 3', label : 'Grade 3', value : 'Grade 3'},
    ])

    const [data_type_arr, set_data_type_arr] = useState([
        {title : 'Academic Year Active', type : 'active', is_show : true},
        {title : 'Academic Year Unactive', type : 'past', is_show : false},
    ])

    const [activity_status_arr, set_activity_status_arr] = useState([
        {title : 'NO', bg_color : '#999999'},
        {title : 'OK', bg_color : '#60B158'},
        {title : 'CW', bg_color : '#FFD157'},
        {title : 'OK', bg_color : '#F2994A'},
        {title : 'SK', bg_color : '#0085FF'},
        {title : 'HS', bg_color : '#FC5A5A'},
    ])

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(async ()=>{
        if(user_data.id !== ''){
            get_data('current')
            get_data('past')
        }
    }, [user_data])

    async function get_data(type){
        var url = '/assignment/group?type=' + type + '_academic_year'
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                if(type === 'current'){
                    for(var x in data){
                        data[x].label = data[x].subject.name
                    }
                    set_current_data_arr(data)
                }
                else if(type === 'past'){
                    set_past_data_arr(data)
                }
            }
        }
    }

    function toDetail(index, type){
        var data = {}
        if(type === 'active'){
            data = current_data_arr[index]
        }
        else if(type === 'past'){
            data = past_data_arr[index]
        }
        window.location.href = '/subject-lesson/detail?subject_id=' + data.subject.id + '&grade_id=' + data.grade.id + '&academic_year_id=' + data.academic_year_id
    }

    async function collapseType(index){
        var data_index = data_type_arr[index]
        var init_show = data_index.is_show
        for(var x in data_type_arr){
            data_type_arr[x].is_show = false
        }
        data_type_arr[index].is_show = !init_show
        base.update_array(data_type_arr, set_data_type_arr, data_index, index)
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Subject & Lesson Plan'} user_data={user_data} />
            </div>

            {
                current_data_arr.length === 0 && past_data_arr.length === 0 ?
                <div className='col-12 mt-5 pt-5'>
                    <NoData />
                </div>
                :
                <>
                {/* <div className='col-12 mt-5 bg-white rounded p-3'>
                    <div className='row'>
                        <div className='col'>
                            <div className='row'>
                                <div className='col-12'>
                                    <p className='m-0' style={{color : 'black'}}>Grade</p>
                                </div>
                                <div className='col-12 mt-3'>
                                <div className='row'>
                                    {
                                        filter_grade_arr.map((data, index)=>(
                                            <div className='col-12 col-lg-6 mb-2' key={index}>
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id={"grade_radio" + index} name="customRadio" class="custom-control-input" />
                                                    <label class="custom-control-label" for={"grade_radio" + index}>{data.name}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className='col'>
                            <div className='row'>
                                <div className='col-12'>
                                    <p className='m-0'>Subject</p>
                                </div>
                                <div className='col-12 mt-3'>
                                    <Select options={current_data_arr} isMulti={true} />
                                </div>
                            </div>
                        </div>

                        <div className='col'>
                            <div className='row'>
                                <div className='col-12'>
                                    <p className='m-0'>Lesson</p>
                                </div>
                                <div className='col-12 mt-3'>
                                    <Select options={filter_grade_arr} isMulti={true} />
                                </div>
                            </div>
                        </div>

                        <div className='col-auto d-flex align-items-center'>
                            <button type='button' className='btn btn-primary rounded shadow-sm'>Filter</button>
                        </div>
                    </div>
                </div>

                <div className='col-12 mt-5 px-3'>
                    <div className='row'>
                        <div className='col-auto bg-white rounded p-3 px-5'>
                            <p className='m-0'>Subject</p>
                        </div>
                    </div>
                </div>

                <div className='col-6 mt-5'>
                    <div className='row'>
                        <div className='col-12 rounded p-3 subject_lesson_list title'>
                            <div className='row'>
                                <div className='col'>
                                    <h5 className='m-0 text-primary'>Lesson</h5>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 rounded mt-1 subject_lesson_list detail shadow-sm'>
                            <div className='row'>
                                <div className='col-12 p-3' style={{borderBottom : '1px solid #eaeaea'}}>
                                    <div className='row'>
                                        <div className='col'>
                                            <h5 className='m-0'>Activity</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 px-3 py-0' style={{backgroundColor : '#D9D9D91A'}}>
                                    <div className='row m-0'>
                                        <div className='col-12 px-0 py-3' style={{borderBottom : '1px solid #EAEAEA'}}>
                                            <div className='row m-0'>
                                                <div className='col p-0'>
                                                    <div className='row'>
                                                        <div className='col-auto'>
                                                            <img src={base.img_no_profile} style={{height : '2.5rem', width : '2.5rem', borderRadius : '2.5rem', aspectRatio : 1}} />
                                                        </div>
                                                        <div className='col d-flex align-items-center p-0'>
                                                            <p className='m-0' style={{color : 'black', fontSize : '.75rem'}}>Nama Siswa</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-auto d-flex align-items-center'>
                                                    <div className='row'>
                                                        {
                                                            activity_status_arr.map((data_status, index_status)=>(
                                                                <div className='col-auto px-1'>
                                                                    <div className='rounded px-2' style={{backgroundColor : data_status.bg_color}}>
                                                                        <p className='m-0 text-white' style={{fontSize : '.75rem'}}>{data_status.title}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <div className='col p-0 d-flex align-items-center justify-content-end'>
                                                    <div>
                                                        <p className='m-0' style={{fontSize : '.75rem'}}>Last Updated at</p>
                                                        <p className='m-0' style={{fontSize : '.75rem'}}>{base.moment().format('DD/MM/YYYY HH:mm')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}



                <div className='col-12 mt-5 pt-4'>
                    <div className="card rounded shadow-sm">
                        <div className={"card-body p-0"}>
                            <div className={'row m-0'}>
                                <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                <div className='col-12 p-3 pt-4'>
                                    <div className='row m-0'>
                                        {
                                            data_type_arr.map((dataType, indexType)=>(
                                                <div className={'col-12' + (indexType > 0 ? ' mt-3' : '')} key={indexType}>
                                                    <ActiveUnactiveData collapseType={()=>collapseType(indexType)} dataType={dataType} data_arr={(dataType.type === 'active' ? current_data_arr : past_data_arr)} viewType={'subject'} toDetail={(index)=>toDetail(index, dataType.type)} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                </>
            }

            
        </div>
    )
}