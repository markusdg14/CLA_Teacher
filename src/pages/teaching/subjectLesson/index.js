import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import CardSubject from '../../../components/cardSubject';
import NoData from '../../../components/NoData'
import ActiveUnactiveData from '../../../components/activeUnactiveData';

export default function SubjectLesson(){
    var base = new Base()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})
    const [current_data_arr, set_current_data_arr] = useState([])
    const [past_data_arr, set_past_data_arr] = useState([])
    const [assignment_data, set_assignment_data] = useState()

    const [data_type_arr, set_data_type_arr] = useState([
        {title : 'Academic Year Active', type : 'active', is_show : true},
        {title : 'Academic Year Unactive', type : 'past', is_show : false},
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