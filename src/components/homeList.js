import { useEffect, useState } from 'react';
import Base from '../utils/base';


export default function HomeList({data_arr, title, icon}){
    var base = new Base()

    return(
        <>
        <div className="card rounded shadow-sm h-100">
            <div className={"card-body p-0"}>
                <div className={'row m-0'}>
                    <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                    <div className='col-12 p-3 pt-4 pb-5'>
                        <img className='position-absolute' src={base.img_leaves} style={{height : '5rem', right : 0, top : '-.5rem'}} />
                        <div className='row m-0'>
                            <div className='col-12 mb-3 mb-lg-4'>
                                <div className='row m-0'>
                                    {
                                        icon != '' &&
                                        <div className='col-auto p-0 d-flex align-items-center justify-content-center'>
                                            <h5 className='m-0'><i className={"mr-3 " + icon} style={{color : '#00000066'}}></i></h5>
                                        </div>
                                    }
                                    <div className='col p-0 d-flex align-items-center'>
                                        <h5 className='m-0'>{title}</h5>
                                    </div>
                                </div>
                            </div>
                            {
                                data_arr.length > 0 ?
                                <>
                                    {
                                        data_arr.map((data, index)=>(
                                            <div className={'col-12' + (index !== 0 ? ' mt-3' : '')} key={index}>
                                                <div className='row m-0'>
                                                    <div className='col-auto p-0 d-flex align-items-center justify-content-center'>
                                                        <div style={{height : '1.25rem', width : '1.25rem', border : '2px solid #8C9196', borderRadius : '.25rem'}}></div>
                                                    </div>
                                                    <div className='col d-flex align-items-center'>
                                                        <p className='m-0 text-capitalize'>{data.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                                :
                                <div className='col-12 text-center'>
                                    <h6 className='m-0' style={{fontFamily : 'Inter', color : 'black'}}>No Data</h6>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}