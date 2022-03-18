import { useEffect, useState } from 'react';
import Base from '../utils/base';


export default function CardSubject({data, toDetail}){
    var base = new Base()

    return(
        <>
        <div className="card rounded shadow-sm" style={{cursor : 'pointer'}} onClick={toDetail}>
            <div className="card-body p-0">
                <div className="ratio-169 rounded" style={{backgroundRepeat : 'no-repeat', backgroundSize : 'cover', backgroundImage : 'url('+ base.img_no_image +')'}} ></div>
                <div className='row m-0'>
                    <div className='col-12 p-3'>
                        <div className='row'>
                            <div className='col-12'>
                                <p className="m-0" style={{color : 'black'}}><b>{data.subject.name}</b></p>
                            </div>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col'>
                                        <p className='m-0' style={{fontSize : '.75rem', color : 'black'}}>{data.grade.name}</p>
                                    </div>
                                    <div className='col-auto'>
                                        <p className='m-0' style={{fontSize : '.75rem', color : 'black'}}>{data.academic_year_name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}