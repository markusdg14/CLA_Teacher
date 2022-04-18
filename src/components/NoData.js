import { useEffect, useState } from 'react';
import Base from '../utils/base';

export default function NoData({bg}){
    var base = new Base()

    return(
        <>
        <div className='row m-0'>
            <div className='col-12 mt-4 p-0 pb-4 rounded' style={{backgroundColor : (bg === 'none' ? 'transparent' : '#F8F9FE')}}>
                <div className='row m-0'>
                    <div className='col-12 text-center studentNoAccess' style={{marginTop : '-5rem'}}>
                        <img src={base.img_study_1} style={{height : '10rem'}} />
                        <h2 className='m-0 mt-2' style={{color : '#575A89', fontSize : '1.75rem'}}>No Data Available</h2>
                        <p className='m-0 mt-3'>The Academic Year have not yet started and no Previous Academic Year Data exist. Please come back again.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}