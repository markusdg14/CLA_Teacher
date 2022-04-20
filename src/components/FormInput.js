import { useEffect, useState } from 'react';
import Base from '../utils/base';


export default function FormInput({title, changeInput, value, error_data, type, input_type, readOnly}){
    var base = new Base()

    return(
        <>
            <label className='text-primary'>{title}</label>
            <input type={input_type} className="form-control form-control-lg rounded formInput" value={value} onChange={(e)=>changeInput(e.target.value)} readOnly={readOnly} />
            {
                error_data.type === type &&
                <small className="form-text text-danger">{error_data.message}</small>
            }
        </>
    )
}