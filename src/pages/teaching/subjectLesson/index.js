import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import CardSubject from '../../../components/cardSubject';


export default function SubjectLesson(){
    var base = new Base()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})
    const [current_data_arr, set_current_data_arr] = useState([])
    const [past_data_arr, set_past_data_arr] = useState([])
    const [assignment_data, set_assignment_data] = useState()

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
        if(type === 'current'){
            data = current_data_arr[index]
        }
        else if(type === 'past'){
            data = past_data_arr[index]
        }
        window.location.href = '/subject-lesson/detail?id=' + data.id + '&subject_id=' + data.subject.id + '&grade_id=' + data.grade.id + '&academic_year_id=' + data.academic_year_id
    }


    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Subject & Lesson Plan'} user_data={user_data} />
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
                                                current_data_arr.map((data, index)=>(
                                                    <div className='col-6 col-lg-4 mb-3' key={index}>
                                                        <CardSubject data={data} toDetail={()=>toDetail(index, 'current')} />
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
                                                past_data_arr.map((data, index)=>(
                                                    <div className='col-6 col-lg-4 mb-3' key={index}>
                                                        <CardSubject data={data} toDetail={()=>toDetail(index, 'past')} />
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