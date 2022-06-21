import { useEffect, useState } from 'react';
import Base from '../utils/base';

export default function UnderConstruction(){
    var base = new Base()

    return(
        <>
        <div className='col-12 mt-4 pt-4 text-center'>
            <img src={base.img_under_construction} style={{height : '20rem'}} />
        </div>
        </>
    )
}