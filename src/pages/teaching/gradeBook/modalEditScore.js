import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';

export default function ModalEditScore({grade_skill_selected, changeGradeSkillScore, submitGradeSkillNew, submitNotesNew, grade_book_selected, changeNotes}){
	var base = new Base()

	
	return(
		<>
			<div className="modal fade" id="modalEditScore" tabIndex="-1" aria-labelledby="modalEditScoreLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg">
					<div className="modal-content rounded border-0 shadow-sm">
						<div className="modal-body p-0">
							<div className={'row m-0'}>
								<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
								<div className='col-12 p-3 pt-4 pb-5'>
									<div className='row m-0'>
										<div className='col-12 mb-3'>
											<h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Edit Score</h5>
											<h6 className='m-0' style={{color : 'black'}}>{grade_skill_selected.project_skill.skill.skill_category.name} - {grade_skill_selected.project_skill.skill.name}</h6>
										</div>

                                        <div className='col-12 mb-3'>
                                            <input type='text' className="form-control form-control-lg rounded" style={{backgroundColor : 'white'}} value={grade_skill_selected.score} onChange={(e)=>changeGradeSkillScore(e.target.value)} />
                                        </div>

                                        <div className='col-12 mt-4 text-right'>
                                            <button className='btn btn-outline-primary rounded px-5' data-dismiss="modal">Cancel</button>
                                            <button className='btn btn-primary rounded px-5 ml-2' onClick={()=>submitGradeSkillNew()}>Submit</button>
                                        </div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="modal fade" id="modalEditNotes" tabIndex="-1" aria-labelledby="modalEditNotesLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg">
					<div className="modal-content rounded border-0 shadow-sm">
						<div className="modal-body p-0">
							<div className={'row m-0'}>
								<img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
								<div className='col-12 p-3 pt-4 pb-5'>
									<div className='row m-0'>
										<div className='col-12 mb-3'>
											<h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Edit Notes</h5>
											{/* <h6 className='m-0' style={{color : 'black'}}>{grade_skill_selected.project_skill.skill.skill_category.name} - {grade_skill_selected.project_skill.skill.name}</h6> */}
										</div>

                                        <div className='col-12 mb-3'>
											{/* <textarea className="form-control rounded mt-2" id='summernote' rows={3} onChange={(e)=>changeNotes(e.target.value)} value={grade_book_selected.comment} style={{resize : 'none', border : '1px solid #EAEAEA'}} placeholder=""></textarea> */}
											<div id='summernote'>{grade_book_selected.comment}</div>
                                        </div>

                                        <div className='col-12 mt-4 text-right'>
                                            <button className='btn btn-outline-primary rounded px-5' data-dismiss="modal">Cancel</button>
                                            <button className='btn btn-primary rounded px-5 ml-2' onClick={()=>submitNotesNew()}>Submit</button>
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