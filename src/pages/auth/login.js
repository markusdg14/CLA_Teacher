import { useEffect, useState } from 'react';
import Base from '../../utils/base';

import { getToken } from '../../firebaseInit.js';
import firebase from 'firebase/app';
import 'firebase/messaging';

import {isSafari, isMobileSafari} from 'react-device-detect'

export default function AuthLogin(){
    var base = new Base()

    const [form_login_arr, set_form_login_arr] = useState([
        {title : 'Email Address', type : 'email', input_type : 'email', icon : 'bi bi-envelope-fill', value : ''},
        {title : 'Password', type : 'password', input_type : 'password', icon : 'bi bi-key-fill', value : ''},
    ])

    const [error_data, set_error_data] = useState({type : '', message : ''})

    const [login_alert, set_login_alert] = useState({type : '', message : ''})
    const [is_disable_btn, set_is_disable_btn] = useState(false)
    const [firebaseToken, set_firebaseToken] = useState('')

    useEffect(async ()=>{
        await localStorage.clear()

        if(!isMobileSafari || !isSafari){
            if(firebase.messaging.isSupported()){
                await getToken(token=>{
                    console.log(token)
                    set_firebaseToken(token)
                })
            }
        }

    }, [])

    function changeInput(value, index){
        set_error()
        set_error('', '', 'alert')
        var data_index = form_login_arr[index]
        
        form_login_arr[index].value = value

        base.update_array(form_login_arr, set_form_login_arr, data_index, index)
    }

    async function signInBtn(){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var flag = 1
        var data_login = {email : '', password : '', token : firebaseToken}
        
        for(var x in form_login_arr){
            if(form_login_arr[x].value === ''){
                set_error(form_login_arr[x].type, form_login_arr[x].type)
                flag = 0
                break
            }
            if(form_login_arr[x].type === 'email'){
                if(!form_login_arr[x].value.match(mailformat)){
                    set_error('email', 'Invalid email format')
                    flag = 0
                    break
                }
            }
        }

        if(flag){
            set_is_disable_btn(true)
            var url = '/auth/login'
            for(var x in form_login_arr){
                data_login[form_login_arr[x].type] = form_login_arr[x].value
            }

            var response = await base.request(url, 'post', data_login)
            if(response != null){
                if(response.status == 'success'){
                    if(response.type.name === 'teacher'){
                        set_error('success', 'Login Success!!', 'alert')
                        localStorage.setItem('token', response.token)
                        await localStorage.setItem('firebaseToken', firebaseToken)
    
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 750);
                    }
                    else {
                        set_error('danger', `Sorry, you're not a teacher`, 'alert')
                        set_is_disable_btn(false)
                    }
                }
                else{
                    set_error('danger', 'Incorrect email or password', 'alert')
                    set_is_disable_btn(false)
                }
            }
        }
    }

    function set_error(type='', message='', error_type='form'){
        if(error_type == 'form'){
            set_error_data({type : type, message : message + ` can't be empty`})
        }
        else if(error_type == 'alert'){
            set_login_alert({type : type, message : message})
        }
    }

    return(
        <div className='row m-0'>

            <div className='col-12 mt-5 text-center'>
                <img src={base.img_logo_text} className={'loginLogo'} />
            </div>

            <div className='col-12 px-0 px-lg-5 mt-5'>
                <div className='row m-0'>
                    <div className='col-12 px-0 px-lg-5'>
                        <div className="card rounded shadow-sm h-100 w-100">
                            <div className="card-body py-5 px-2 px-lg-5">
                                <form className='row m-0'>
                                    <div className='col-12'>
                                        {
                                            login_alert.message !== '' &&
                                            <div className={"rounded alert alert-" + (login_alert.type)} role="alert">{login_alert.message}</div>
                                        }
                                    </div>
                                    {
                                        form_login_arr.map((data, index)=>(
                                            <div className={"col-12 form-group m-0" + (index !== 0 ? ' mt-3' : '')} key={index}>
                                                <label className='text-primary'><i className={(data.icon) + " mr-2"}></i>{data.title}</label>
                                                <input type={data.input_type} className="form-control form-control-lg border-0 rounded" style={{backgroundColor : '#F8F8F8'}} value={data.value} onChange={(e)=>changeInput(e.target.value, index)} />
                                                {
                                                    error_data.type === data.type &&
                                                    <small className="form-text text-danger">{error_data.message}</small>
                                                }
                                            </div>
                                        ))
                                    }

                                    <div className='col-12 mt-5'>
                                        <button type='button' className='btn btn-lg btn-primary rounded w-100' onClick={signInBtn} disabled={is_disable_btn}>Sign In</button>
                                    </div>
                                    <div className='col-12 mt-3 pb-4'>
                                        <a href='/auth/forget-password' className='mt-3 text-primary'><u>Forget Password</u></a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}