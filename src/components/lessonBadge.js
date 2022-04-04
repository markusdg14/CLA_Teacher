import { useEffect, useState } from 'react';
import Base from '../utils/base';


export default function LessonBadge({title, type}){
    var base = new Base()

    const bgColor = (type === 'purple' ? '#E9EAF4' : type === 'red' ? '#FFEEEA' : type === 'yellow' ? '#FFF9EC' : '')
    const textColor = (type === 'purple' ? '#4D56A2' : type === 'red' ? '#FD6540' : type === 'yellow' ? '#F1BA12' : '')
    const dotColor = (type === 'purple' ? '#BABDDB' : type === 'red' ? '#FFCABD' : type === 'yellow' ? '#FFE8B2' : '')

    return(
        <>
        <div className='row m-0'>
            <div className='col-12 p-2 px-3 rounded d-flex align-items-center' style={{backgroundColor : bgColor}}>
                <div className='d-flex align-items-center'>
                    <h4 className='m-0 d-inline-block'><i className="fas fa-circle" style={{color : dotColor}}></i></h4>
                    <p className='m-0 d-inline-block ml-3' style={{color : textColor, fontSize : '.75rem'}}>
                        <b>{title}</b>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}