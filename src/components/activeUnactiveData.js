import { useEffect, useState } from 'react';
import Base from '../utils/base';
import CardSubject from './cardSubject';
import NoData from './NoData';

export default function ActiveUnactiveData({collapseType, dataType, toDetail, data_arr, viewType}){
    var base = new Base()

    return(
        <>
        <div className='row'>
            <div className='col-12 mb-3 text-right'>
                <button className='btn btn-primary rounded' onClick={()=>collapseType()}>{dataType.title}</button>
            </div>

            {
                dataType.is_show &&
                <div className='col-12 mt-4'>
                    {
                        data_arr.length > 0 ?
                        <>
                            <div className='row'>
                            {
                                data_arr.map((data, index)=>(
                                    <div className='col-6 col-lg-4 mb-3' key={index}>
                                        {
                                            viewType === 'homeroom' ?
                                            <CardHomeroom data={data} toDetail={()=>toDetail(index)} />
                                            : viewType === 'subject' ?
                                            <CardSubject data={data} toDetail={()=>toDetail(index)} />
                                            :
                                            <></>
                                        }
                                    </div>
                                ))
                            }
                            </div>
                        </>
                        :
                        <div className='col-12 mt-5 pt-4'>
                            <NoData bg={'none'} />
                        </div>
                    }
                </div>
            }
        </div>
        </>
    )
}

function CardHomeroom({data, toDetail}){
    var base = new Base()

    return(
        <div className="card rounded shadow-sm" style={{cursor : 'pointer'}} onClick={toDetail}>
            <div className="card-body p-0">
                <div className="ratio-169 rounded" style={{backgroundRepeat : 'no-repeat', backgroundSize : 'cover', backgroundImage : 'url('+ base.img_no_image +')'}} ></div>
                <div className='row m-0'>
                    <div className='col-12 p-3'>
                        <div className='row'>
                            <div className='col-12'>
                                <p className="m-0" style={{color : 'black'}}><b>{data.grade_name + '' + data.name}</b></p>
                            </div>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col'>
                                        <p className='m-0' style={{fontSize : '.75rem', color : 'black'}}>{data.academic_year.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}