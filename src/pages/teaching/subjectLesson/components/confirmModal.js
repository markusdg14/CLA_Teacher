import { useEffect, useState } from 'react';
import SelectOption from '../../../../components/selectOption';
import Base from '../../../../utils/base';

export default function ModalConfirm({confirmLesson, is_disable_btn_modal}){
	var base = new Base()

	return(
		<>
			<div className="modal fade" id="modalConfirm" tabIndex="-1" aria-labelledby="modalConfirmLabel" aria-hidden="true">
                <div className="modal-dialog p-4 p-lg-0-">
                    <div className="modal-content rounded border-0 shadow-sm">
                        <div className="modal-body rounded p-0" style={{backgroundColor : '#F8F9FE'}}>
                            <div className={'row m-0'}>
                                <div className='col-12 p-4'>
                                    <h5 className='m-0 mt-2 modalConfirmTitle text-primary' style={{fontFamily : 'InterBold'}}><i className="bi bi-chat-square-dots-fill mr-2 mr-lg-3" style={{color : '#00000066'}}></i>Confirming Lesson Material</h5>
                                    <p className='m-0 mt-3' style={{fontSize : '.75rem'}}>Are you sure you would like to proceed with the current Lesson Material to be shown to future students ? </p>

                                    <div className='row'>
                                        <div className='col pr-2'>
                                            <button className='btn btn-outline-primary w-100 rounded shadow-sm mt-4' data-dismiss="modal" disabled={is_disable_btn_modal}>No</button>
                                        </div>
                                        <div className='col pl-2'>
                                            <button className='btn btn-primary w-100 rounded shadow-sm mt-4' onClick={()=>confirmLesson()} disabled={is_disable_btn_modal}>Yes</button>
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