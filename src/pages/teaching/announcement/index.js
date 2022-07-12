import { useEffect, useState } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import NoData from '../../../components/NoData';
import UnderConstruction from '../../../components/underConstruction';


export default function Announcement(){
    var base = new Base()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : ''}})

    const [grade_arr, set_grade_arr] = useState([])
    const [selected_grade, set_selected_grade] = useState('')

    const [data_arr, set_data_arr] = useState([])

    const [is_under_construction] = useState(false)

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
        var url = '/academic-year/grade?academic_year_id=' + user_data.current_academic_year.id
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                for(var x in data){
                    data[x].is_selected = false
                }
                if(data.length > 0){
                    data[0].is_selected = true
                    set_selected_grade(data[0].id)
                }

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

    const [selected_announcement, set_selected_announcement] = useState({id : ''})
    const [modal_btn_is_disabled, set_modal_btn_is_disabled] = useState(false)

    useEffect(()=>{
        if(selected_announcement.id !== ''){
            base.$('#modalDeleteAnnouncement').modal('show')
        }
    }, [selected_announcement])

    async function deleteAnnouncement(type, index=0){
        if(type === 'open_modal'){
            set_selected_announcement(data_arr[index])
        }
        else if(type === 'delete_action'){
            var url = '/announcement?id=' + selected_announcement.id
    
            var response = await base.request(url, 'delete')
            if(response != null){
                if(response.status == 'success'){
                    window.location.reload()
                }
            }
        }
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Announcement'} user_data={user_data} />
            </div>

            {
                is_under_construction ?
                <UnderConstruction />
                :
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
                                                            <a href='/announcement/action?type=add' className='btn btn-primary rounded'>Add Announcement</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {
                                                    data_arr.length > 0 ?
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
                                                                                            <button className='btn btn-danger mr-2' style={{borderRadius : '2.5rem', height : '2.5rem', width : '2.5rem'}} onClick={()=>deleteAnnouncement('open_modal', index)}><i className="bi bi-trash-fill text-white" style={{fontSize : '.75rem'}}></i></button>
                                                                                            <a href={'/announcement/action?type=edit&id=' + data.id} className='btn btn-secondary' style={{borderRadius : '2.5rem', height : '2.5rem', width : '2.5rem'}}><i className="bi bi-pen-fill text-white" style={{fontSize : '.75rem'}}></i></a>
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
                                                    :
                                                    <div className='col-12 mt-5 pt-5'>
                                                        <NoData bg={'none'} />
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
            }

            <div className="modal fade" id="modalDeleteAnnouncement" tabIndex="-1" aria-labelledby="modalDeleteAnnouncementLabel" aria-hidden="true">
                <div className="modal-dialog p-4 p-lg-0-">
                    <div className="modal-content rounded border-0 shadow-sm">
                        <div className="modal-body rounded p-0" style={{backgroundColor : '#F8F9FE'}}>
                            <div className={'row m-0'}>
                                <div className='col-12 p-4'>
                                    <h5 className='m-0 mt-2 modalDeleteAnnouncementTitle text-primary' style={{fontFamily : 'InterBold'}}><i className="bi bi-chat-square-dots-fill mr-2 mr-lg-3" style={{color : '#00000066'}}></i>Delete announcement</h5>
                                    <p className='m-0 mt-3' style={{fontSize : '.75rem'}}>Are you sure you would like to delete this announcement? </p>

                                    <div className='row'>
                                        <div className='col pr-2'>
                                            <button className='btn btn-outline-primary w-100 rounded shadow-sm mt-4' data-dismiss="modal" disabled={modal_btn_is_disabled}>No</button>
                                        </div>
                                        <div className='col pl-2'>
                                            <button className='btn btn-primary w-100 rounded shadow-sm mt-4' onClick={()=>deleteAnnouncement('delete_action')} disabled={modal_btn_is_disabled}>Yes</button>
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