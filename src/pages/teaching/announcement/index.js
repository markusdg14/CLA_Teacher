import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';


export default function Announcement(){
    var base = new Base()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})

    const [grade_arr, set_grade_arr] = useState([])
    const [selected_grade, set_selected_grade] = useState('')

    const [data_arr, set_data_arr] = useState([])

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(()=>{
        if(user_data.id != null){
            get_grade()
        }
    }, [user_data])

    useEffect(()=>{
        if(selected_grade !== ''){
            get_data()
        }
    }, [selected_grade])

    async function get_grade(){
        var url = '/grade/all'
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                for(var x in data){
                    data[x].is_selected = false
                }
                data[0].is_selected = true

                set_selected_grade(data[0].id)
                set_grade_arr(data)
            }
        }
    }

    async function get_data(){
        var url = '/announcement?type=current_academic_year&grade_id=' + selected_grade
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                for(var x in data){
                    data[x].created = base.moment(data[x].created_at).format('DD/MM HH:mm')
                    data[x].announced = base.moment(data[x].publish_at).format('DD/MM HH:mm')
                }
                set_data_arr(data)
            }
        }
    }

    async function selectGrade(index){
        var data_index = grade_arr[index]
        var initSelected = data_index.is_selected
        for(var x in grade_arr){
            grade_arr[x].is_selected = false
        }
        grade_arr[index].is_selected = true
        if(grade_arr[index].is_selected){
            set_selected_grade(grade_arr[index].id)
        }
        base.update_array(grade_arr, set_grade_arr, data_index, index)
    }

    async function announcementBtn(index, type){

    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Announcement'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='row'>
                    <div className='col-12 col-lg-3'>
                        <div className='row'>
                            {
                                grade_arr.map((data, index)=>(
                                    <div className='col-auto col-lg-12' key={index}>
                                        <div className={'p-3 rounded'} style={{backgroundColor : (data.is_selected ? '#F6FEE480' : 'transparent'), cursor : 'pointer'}} onClick={()=>selectGrade(index)}>
                                            <p className='m-0'>{data.name}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='col-12 col-lg-9 mt-3 mt-lg-0'>
                        <div className="card rounded shadow-sm">
                            <div className={"card-body p-0"}>
                                <div className={'row m-0'}>
                                    <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                    <div className='col-12 p-3 pt-4'>
                                        <div className='row m-0'>
                                            <div className='col-12'>
                                                <div className='row'>
                                                    <div className='col-12 col-lg'>
                                                        <div className="input-group border rounded">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text bg-white border-0 bg-transparent pr-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control border-0 bg-transparent" placeholder="Search" aria-describedby="basic-addon1" />
                                                        </div>
                                                    </div>
                                                    <div className='col-12 col-lg-auto mt-3 mt-lg-0 text-right'>
                                                        <button className='btn btn-primary rounded'>Add Announcement</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-12 mt-3'>
                                                <div className='table-responsive'>
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th className='border-0' style={{fontFamily : 'InterBold', color : '#6B7280'}}>Announcement</th>
                                                                <th className='border-0' style={{fontFamily : 'InterBold', color : '#6B7280'}}>Created</th>
                                                                <th className='border-0' style={{fontFamily : 'InterBold', color : '#6B7280'}}>Announced</th>
                                                                <th className='border-0' style={{fontFamily : 'InterBold', color : '#6B7280'}}>Status</th>
                                                                <th className='border-0' style={{fontFamily : 'InterBold', color : '#6B7280'}}></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data_arr.map((data, index)=>(
                                                                    <tr key={index}>
                                                                        <td className='align-middle'>{data.title}</td>
                                                                        <td className='align-middle'>{data.created}</td>
                                                                        <td className='align-middle'>{data.announced}</td>
                                                                        <td className='align-middle text-capitalize'>{data.status}</td>
                                                                        <td className='td-fit-content'>
                                                                            {
                                                                                data.status === 'scheduled' &&
                                                                                <>
                                                                                    <button className='btn btn-danger mr-2' style={{borderRadius : '2.5rem', height : '2.5rem', width : '2.5rem'}} onClick={()=>announcementBtn(index, 'delete')}><i className="bi bi-trash-fill text-white" style={{fontSize : '.75rem'}}></i></button>
                                                                                    <button className='btn btn-secondary' style={{borderRadius : '2.5rem', height : '2.5rem', width : '2.5rem'}} onClick={()=>announcementBtn(index, 'edit')}><i className="bi bi-pen-fill text-white" style={{fontSize : '.75rem'}}></i></button>
                                                                                </>
                                                                            }
                                                                        </td>
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