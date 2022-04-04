import { useEffect, useState } from 'react';
import Base from '../utils/base';
import CustomBadge from './customBadge';


export default function LessonHeader({title, type, backBtn}){
    var base = new Base()

    return(
        <>
        <div className='row'>
            <div className='col'>
                <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                    <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                </div>
            </div>
            <div className='col-auto text-right d-flex align-items-center justify-content-center'>
                <CustomBadge title={title} type={type} />
            </div>
        </div>
        </>
    )
}