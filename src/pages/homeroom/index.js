import { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/header';

import HomeList from '../../components/homeList';
import LessonBadge from '../../components/lessonBadge';
import CustomBadge from '../../components/customBadge';
import CardSubject from '../../components/cardSubject';
import NoData from '../../components/NoData';
import ActiveUnactiveData from '../../components/activeUnactiveData';
import UnderConstruction from '../../components/underConstruction';


export default function HomeroomIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : '', name : ''}})
    const [data_active_arr, set_data_active_arr] = useState([])
    const [data_unactive_arr, set_data_unactive_arr] = useState([])

    const [data_type_arr, set_data_type_arr] = useState([
        {title : 'Homeroom Class Active', type : 'active', is_show : true},
        {title : 'Past Homeroom Class', type : 'past', is_show : false},
    ])

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(async ()=>{
        if(user_data.id !== ''){
            // get_data('current')
            // get_data('past')
        }
    }, [user_data])

    async function get_data(type){
        var url = '/class/homeroom?type=' + type + '_academic_year'
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                if(type === 'current'){
                    set_data_active_arr(data)
                }
                else if(type === 'past'){
                    set_data_unactive_arr(data)
                }
            }
        }
    }

    function toDetail(index, type){
        var id = ''
        if(type === 'active'){
            id = data_active_arr[index].id
        }
        else if(type === 'past'){
            id = data_unactive_arr[index].id
        }
        window.location.href = '/homeroom/detail?id=' + id
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
                <Header title={'Homeroom'} user_data={user_data} />
            </div>

            <UnderConstruction />

            {/* {
                data_active_arr.length === 0 && data_unactive_arr.length === 0 ?
                <div className='col-12 mt-5 pt-5'>
                    <NoData />
                </div>
                :
                <>
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
                                                    <ActiveUnactiveData collapseType={()=>collapseType(indexType)} dataType={dataType} data_arr={(dataType.type === 'active' ? data_active_arr : data_unactive_arr)} viewType={'homeroom'} toDetail={(index)=>toDetail(index, dataType.type)} />
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
            } */}


        </div>
    )
}