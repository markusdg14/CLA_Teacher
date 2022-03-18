import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import CardSubject from '../../../components/cardSubject';


export default function GradeBook(){
    var base = new Base()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : ''}})
    const [data_active_arr, set_data_active_arr] = useState([])
    const [data_unactive_arr, set_data_unactive_arr] = useState([])

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
                    set_data_active_arr(data)
                }
                else if(type === 'past'){
                    set_data_unactive_arr(data)
                }
            }
        }
    }

    function toDetail(index){
        window.location.href = '/grade-book/detail?id=' + data_active_arr[index].id
    }


    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Grade Book'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 p-3 pt-4'>
                                <div className='row m-0'>
                                    <div className='col-12 mb-3 text-right'>
                                        <button className='btn btn-primary rounded'>Academic Year Active</button>
                                    </div>
                                    <div className='col-12 mt-4'>
                                        <div className='row'>
                                            {
                                                data_active_arr.map((data, index)=>(
                                                    <div className='col-6 col-lg-4 mb-3' key={index}>
                                                        <CardSubject data={data} toDetail={()=>toDetail(index)} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className='col-12 mt-3 text-right'>
                                        <button className='btn btn-primary rounded'>Academic Year Unactive</button>
                                    </div>
                                    <div className='col-12 mt-4'>
                                        <div className='row'>
                                            {
                                                data_unactive_arr.map((data, index)=>(
                                                    <div className='col-6 col-lg-4 mb-3' key={index}>
                                                        <CardSubject data={data} toDetail={()=>toDetail(index)} />
                                                    </div>
                                                ))
                                            }
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