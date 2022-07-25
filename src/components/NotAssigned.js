import { useEffect, useState } from 'react';
import Base from '../utils/base';

export default function NotAssigned(){
    var base = new Base()

    return(
        <>
        <div className='row'>
            <div className='col-12 mt-2 p-0 pb-4 rounded' style={{backgroundColor : '#F8F9FE'}}>
                <div className='row m-0'>
                    <div className='col-12 text-center studentNoAccess' style={{marginTop : '-10rem'}}>
                        <img src={base.img_mind} style={{height : '20rem'}} />
                        <h2 className='m-0 mt-2' style={{color : '#575A89', fontSize : '1.5rem'}}>You’re Currently Not Assigned</h2>
                        <p className='m-0 mt-3'>Christian Life Academic have not assigned you to any classes and subjects. Contact Operator for more information</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}