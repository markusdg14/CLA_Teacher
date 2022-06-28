import { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/header';


export default function ProfileChangePass(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})
    const [change_pass_form_arr, set_change_pass_form_arr] = useState([
        {title : 'Old Password', type : 'old_password', input_type : 'password', value : ''},
        {title : 'New Password', type : 'new_password', input_type : 'password', value : ''},
        {title : 'Retype New Password', type : 'retype_new_password', input_type : 'password', value : ''},
    ])

    const [form_alert, set_form_alert] = useState({type : '', message : ''})
    const [is_disable_btn, set_is_disable_btn] = useState(false)

    const [user_profile_img, set_user_profile_img] = useState({
        image_display : base.img_no_profile,
        image : '',
        original_rotation : 0,
        type : ''
    })
    const [img_data_base, set_img_data_base] = useState('')

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    function backBtn(){
        window.location.href = '/profile'
    }

    const [error_data, set_error_data] = useState({type : '', message : ''})

    function changeInput(value, index){
        set_error()
        set_error('', '', 'alert')
        var data_index = change_pass_form_arr[index]
        
        change_pass_form_arr[index].value = value
        base.update_array(change_pass_form_arr, set_change_pass_form_arr, data_index, index)
    }

    async function saveBtn(){
        var flag = 1
        for(var x in change_pass_form_arr){
            if(change_pass_form_arr[x].value === ''){
                set_error(change_pass_form_arr[x].type, change_pass_form_arr[x].title)
                flag = 0
                break
            }
        }

        if(flag){
            var url = '/auth/change-password'
            var data = {new_password : '', old_password : '', retype_new_password : ''}
            for(var x in change_pass_form_arr){
                data[change_pass_form_arr[x].type] = change_pass_form_arr[x].value
            }

            if(data.new_password !== data.retype_new_password){
                set_error('danger', `Password doesn't match`, 'alert')
            }
            else{
                set_error('warning', 'Please Wait...', 'alert')
                set_is_disable_btn(true)

                var response = await base.request(url, 'put', data)
                if(response != null){
                    set_is_disable_btn(false)
                    if(response.status == 'success'){
                        set_error('success', 'Success!', 'alert')
                        window.location.replace('/profile')
                    }
                    else{
                        set_is_disable_btn(false)
                        set_error('danger', 'Whoops! Something went wrong...', 'alert')
                    }
                }
            }
        }
    }

    function set_error(type='', message='', error_type='form'){
        if(error_type === 'form'){
            set_error_data({type : type, message : message + ` can't be empty`})
        }
        else if(error_type === 'alert'){
            set_form_alert({type : type, message : message})
        }
    }

    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Profile'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                    <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                </div>
            </div>

            <div className='col-12 mt-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className="card rounded shadow-sm h-100 w-100">
                            <div className="card-body p-0">
                                <div className='row m-0'>
                                    <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                    <div className='col-12 p-3 pt-4 pb-5'>
                                        <form className='row m-0'>
                                            <div className='col-12'>
                                                {
                                                    form_alert.message !== '' &&
                                                    <div className={"rounded alert alert-" + (form_alert.type)} role="alert">{form_alert.message}</div>
                                                }
                                            </div>
                                            {
                                                change_pass_form_arr.map((data, index)=>(
                                                    <div className={"col-12 form-group m-0" + (index !== 0 ? ' mt-3' : '')} key={index}>
                                                        <label className='text-primary'>{data.title}</label>
                                                        <input type={data.input_type} className="form-control form-control-lg rounded" style={{backgroundColor : '#FFFFFF', border : '1px solid #EAEAEA'}} value={data.value} onChange={(e)=>changeInput(e.target.value, index)} readOnly={(data.type === 'email' ? true : false)} />
                                                        {
                                                            error_data.type === data.type &&
                                                            <small className="form-text text-danger">{error_data.message}</small>
                                                        }
                                                    </div>
                                                ))
                                            }

                                            <div className='col-12 mt-5 pb-4'>
                                                <button type='button' className='btn btn-primary rounded px-5 py-2' onClick={saveBtn} disabled={is_disable_btn}>Save Changes</button>
                                            </div>
                                        </form>
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