import { useEffect, useState } from 'react';
import Base from '../utils/base';


export default function LoadingData(){
    var base = new Base()

    return(
        <>
        <div className='col-12'>
            <div className='row m-0'>
                <div className='col-12 text-center'>
                    <img src={base.img_mind} style={{height : '20rem'}} />
                    <h2 className='m-0' style={{color : '#575A89', fontSize : '1.5rem'}}>Loading data...</h2>
                </div>
            </div>
        </div>
        </>
    )
}