import { useEffect, useState } from 'react';
import SelectOption from '../../../../components/selectOption';
import Base from '../../../../utils/base';

export default function ModalSubmitAll({okAll, disable_all_btn}){
	var base = new Base()

	return(
		<>
			<div className="modal fade" id="modalSubmitAll" tabIndex="-1" aria-labelledby="modalSubmitAllLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg">
					<div className="modal-content rounded border-0 shadow-sm">
						<div className="modal-body p-0">
							<div className={'row m-0'}>
								<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
								<div className='col-12 p-3 pt-4 pb-5'>
									<div className='row m-0'>
                                        <div className='col-12 mb-3'>
											<h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Confirming Student Submission</h5>
										</div>
                                        <div className='col-12'>
                                            <div className='row m-0'>
                                                <div className='col-auto d-flex align-items-center'>
                                                    <img src={base.img_modal_ungraded} style={{height : '7.5rem'}} />
                                                </div>
                                                <div className='col d-flex align-items-center'>
                                                    <p className='m-0' style={{color : 'black'}}>Are you sure you would like to proceed to Confirm All Student Activity Submission ?</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 mt-4'>
                                            <div className='row'>
                                                <div className='col'>
                                                    <button type='button' className='btn btn-outline-primary rounded shadow-sm w-100' disabled={disable_all_btn} data-dismiss="modal">No</button>
                                                </div>
                                                <div className='col'>
                                                    <button type='button' className='btn btn-primary rounded shadow-sm w-100' disabled={disable_all_btn} onClick={()=>okAll()}>Yes</button>
                                                </div>
                                            </div>
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