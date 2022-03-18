import { useEffect, useState } from 'react';
import Base from '../../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../../components/header';


export default function StudentProfileIndex(){
    var base = new Base()

    const [user_data, set_user_data] = useState({name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})
    const [user_form_arr, set_user_form_arr] = useState([
        {title : 'Name', type : 'name', input_type : 'text', value : user_data.name},
        {title : 'Email', type : 'email', input_type : 'email', value : ''},
        {title : 'Phone Number', type : 'number', input_type : 'text', value : ''},
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

        set_user_form_arr([
            {title : 'Name', type : 'name', input_type : 'text', value : check_user.user_data.name},
            {title : 'Email', type : 'email', input_type : 'email', value : check_user.user_data.email},
            {title : 'Phone Number', type : 'phone', input_type : 'text', value : check_user.user_data.phone},
        ])

        base.update_object(user_profile_img, set_user_profile_img, check_user.user_data.image.image_display, 'image_display')

        // set_user_profile_img(check_user.user_data.image)
    }, [])

    function backBtn(){
        window.location.href = '/profile'
    }

    const [error_data, set_error_data] = useState({type : '', message : ''})

    function changeInput(value, index){
        set_error()
        set_error('', '', 'alert')
        var data_index = user_form_arr[index]
        
        if(user_form_arr[index].type === 'phone'){
            var indexValue = value.length - 1
            if(value.charCodeAt(indexValue) >= 48 && value.charCodeAt(indexValue) <= 57){
                user_form_arr[index].value = value
            }
            else if(indexValue < 0){
                user_form_arr[index].value = ''
            }
        }
        else{
            user_form_arr[index].value = value
        }


        base.update_array(user_form_arr, set_user_form_arr, data_index, index)
    }

    async function saveBtn(){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var flag = 1
        for(var x in user_form_arr){
            if(user_form_arr[x].value === ''){
                set_error(user_form_arr[x].type, user_form_arr[x].type)
                flag = 0
                break
            }
            if(user_form_arr[x].type === 'email'){
                if(!user_form_arr[x].value.match(mailformat)){
                    set_error('email', 'Invalid email format')
                    flag = 0
                    break
                }
            }
        }

        if(flag){
            var url = '/auth/change-profile'
            var data = {name : '', phone : '',}
            for(var x in user_form_arr){
                data[user_form_arr[x].type] = user_form_arr[x].value
            }

            set_error('warning', 'Please Wait...', 'alert')
            set_is_disable_btn(true)

            if(user_profile_img.type === 'new'){
                data.image = user_profile_img
                data.image.image = img_data_base
            }

            var response = await base.request(url, 'put', data)
            if(response != null){
                if(response.status == 'success'){
                    set_error('success', 'Success!', 'alert')
                    window.location.reload()
                }
                else{
                    set_is_disable_btn(false)
                    set_error('danger', 'Whoops! Something went wrong...', 'alert')
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

    function getImgBase(file, callback){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    async function changeImage(event){
        await getImgBase(event.target.files[0], (result)=>{
            set_img_data_base(result)
        })

        var img_data = user_profile_img
        img_data.image_display = URL.createObjectURL(event.target.files[0])
        img_data.type = 'new'

        base.update_object(user_profile_img, set_user_profile_img, img_data.image_display, 'image_display')

        // set_user_profile_img(img_data)
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
                                            <div className='col-12 mb-4'>
                                                <div className='row'>
                                                    <div className='col-auto'>
                                                        <img src={user_profile_img.image_display} style={{height : '5.5rem', width : '5.5rem', aspectRatio : 1, borderRadius : '5.5rem'}} />
                                                    </div>
                                                    <div className='col-auto d-flex align-items-center'>
                                                        <input type="file" name="photo" accept="image/*" id="file_input" className="d-none" onChange={(event)=>changeImage(event)} /> 
                                                        <button type='button' className='btn btn-outline-primary rounded px-4 py-2' onClick={()=>base.$('#file_input').trigger('click')}>Edit Image</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                user_form_arr.map((data, index)=>(
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

                                            <div className='col-12 mt-3'>
                                                <a href='#' className='mt-3 text-primary'><u>Change Password</u></a>
                                            </div>
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