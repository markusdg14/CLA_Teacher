import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';

export default function ModalSubmit({rule_detail_arr, rule_selected, changeInput, submitGrading, notes, is_modal_btn_disable}){
    var base = new Base()

    const [modal_radio_arr, set_modal_radio_arr] = useState([
        {id : 'revision', title : 'Make student do a Revision', is_checked : true},
        {id : 'grade', title : 'Grade Assignment', is_checked : false}
    ])
    const [radio_selected, set_radio_selected] = useState('revision')

    function changeRadio(index){
        var data_index = modal_radio_arr[index]
        var initChecked = data_index.is_checked
        for(var x in modal_radio_arr){
            modal_radio_arr[x].is_checked = false
        }
        modal_radio_arr[index].is_checked = !initChecked

        base.update_array(modal_radio_arr, set_modal_radio_arr, data_index, index)
        if(modal_radio_arr[index].is_checked){
            set_radio_selected(modal_radio_arr[index].id)
        }
    }

    return(
        <>
            <div className="modal fade" id="modalSubmit" tabindex="-1" aria-labelledby="modalSubmitLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content rounded border-0 shadow-sm">
                        <div className="modal-body p-0">
                            <div className={'row m-0'}>
                                <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                                <div className='col-12 p-3 pt-4 pb-5'>
                                    <div className='row m-0'>
                                        <div className='col-12 mb-3'>
                                            <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Grading Assignment</h5>
                                        </div>

                                        <div className='col-12 mt-3'>
                                            <div className='row m-0'>
                                                <div className='col-12'>
                                                    <p className='m-0' style={{fontSize : '1.25rem', color : 'black'}}>Pick what you want to do</p>
                                                    <div className='row m-0 mt-2'>
                                                        {
                                                            modal_radio_arr.map((data, index)=>(
                                                                <div className='col-auto' key={index}>
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="radio" name="exampleRadios" id={'radio-' + data.id} value={data.id} checked={data.is_checked} onChange={()=>changeRadio(index)} />
                                                                        <label className="form-check-label" for={'radio-' + data.id} style={{color : 'black'}}>
                                                                            {data.title}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-12 mt-4'>
                                            <div className='row m-0'>
                                                <div className='col-12'>
                                                    <p className='m-0' style={{color : 'black'}}>{radio_selected === 'grade' ? 'Assignment Grade' : radio_selected === 'revision' ? 'Input Notes' : ''}</p>

                                                    {
                                                        radio_selected === 'grade' ? 
                                                        <div className='mt-2'>
                                                        <SelectOption data_arr={rule_detail_arr} selected={rule_selected} title={'Grade'} changeInput={(value)=>changeInput(value, 'grade')} />
                                                        </div>
                                                        :
                                                        radio_selected === 'revision' &&
                                                        <>
                                                        <textarea className="form-control rounded mt-2" rows={3} onChange={(e)=>changeInput(e.target.value, 'notes')} value={notes} style={{resize : 'none', border : '1px solid #EAEAEA'}} placeholder=""></textarea>
                                                        </>
                                                    }
                                                </div>

                                                <div className='col-12 mt-4'>
                                                    <button className='btn btn-primary rounded px-5' onClick={submitGrading} disabled={is_modal_btn_disable}>Submit</button>
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