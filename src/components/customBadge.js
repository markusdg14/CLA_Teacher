import { useEffect, useState } from 'react';
import Base from '../utils/base';


export default function CustomBadge({title, type}){
    var base = new Base()

    const bgColor = (type === 'success' ? '#D5EBDF' : type === 'info' ? '#EBF8FF' : type === 'warning' ? '#FEEBC8' : '')
    const textColor = (type === 'success' ? '#608AA0' : type === 'info' ? '#6F826E' : type === 'warning' ? '#DD6B20' : '')

    return(
        <>
        <div className='col d-flex justify-content-center'>
            <p className='m-0 p-1 px-4' style={{backgroundColor : bgColor, borderRadius : '2rem', color : textColor}}>{title}</p>
        </div>
        </>
    )
}