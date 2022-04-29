import { useEffect, useState } from 'react';
import Base from '../../utils/base';

export default function ForgetPassword(){
    var base = new Base()

    const [email, set_email] = useState('')

    const [error_data, set_error_data] = useState({type : '', message : ''})

    const [alert, set_alert] = useState({type : '', message : ''})
    const [is_disable_btn, set_is_disable_btn] = useState(false)

    useEffect(async ()=>{
        await localStorage.clear()
    }, [])

    function changeInput(value){
        set_error()
        set_error('', '', 'alert')
        set_email(value)
    }

    async function forgetPasswordSend(){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var flag = 1
        var data_forget_password = {email : email, user_type : 'teacher'}

        if(email === ''){
            flag = 0
            set_error('email', 'Email')
        }
        if(!email.match(mailformat)){
            flag = 0
            set_error('email', 'Invalid email format')
        }

        if(flag){
            set_is_disable_btn(true)
            var url = '/auth/forget-password'

            var response = await base.request(url, 'post', data_forget_password)
            if(response != null){
                if(response.status == 'success'){
                    set_error('success', 'Please check your email', 'alert')

                    setTimeout(() => {
                        window.location.href = '/auth/login'
                    }, 1500);
                }
                else{
                    set_error('danger', response.message, 'alert')
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
            set_alert({type : type, message : message})
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
                                            alert.message !== '' &&
                                            <div className={"rounded alert alert-" + (alert.type)} role="alert">{alert.message}</div>
                                        }
                                    </div>
                                    <div className={"col-12 form-group m-0"}>
                                        <label className='text-primary'><i className={"bi bi-envelope-fill mr-2"}></i>Email Address</label>
                                        <input type='email' className="form-control form-control-lg border-0 rounded" style={{backgroundColor : '#F8F8F8'}} value={email} onChange={(e)=>changeInput(e.target.value)} />
                                        {
                                            error_data.type === 'email' &&
                                            <small className="form-text text-danger">{error_data.message}</small>
                                        }
                                    </div>

                                    <div className='col-12 mt-5'>
                                        <button type='button' className='btn btn-lg btn-primary rounded w-100' onClick={forgetPasswordSend} disabled={is_disable_btn}>Reset Password</button>
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