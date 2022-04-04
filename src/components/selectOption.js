import { useEffect, useState } from 'react';
import Base from '../utils/base';


export default function SelectOption({data_arr, selected, title, changeInput}){
    var base = new Base()

    return(
        <select className="custom-select rounded" style={{borderColor : '#EAEAEA'}} value={selected} onChange={(value)=>changeInput(value.target.value)}>
            <option value='' disabled={true}>Select {title}</option>
            {
                data_arr.map((data, index)=>(
                    <option value={data.id} key={index}>{data.name}</option>
                ))
            }
        </select>
    )
}