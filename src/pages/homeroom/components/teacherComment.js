import { useEffect, useState } from 'react';
import SelectOption from '../../../components/selectOption';
import Base from '../../../utils/base';
import 'summernote'

export default function TeacherComment({student_arr, search, changeSearch}){
	var base = new Base()

    const [semester_selected, set_semester_selected] = useState('')
    const [data_selected, set_data_selected] = useState({id : ''})
    const [student_selected, set_student_selected] = useState({id : '', name : ''})
    const [input_notes, set_input_notes] = useState('')

    async function addTeacherComment(index, index_grade_book){
        set_student_selected(student_arr[index])
        set_data_selected(student_arr[index].arr_grade_book[index_grade_book])
        set_semester_selected(index_grade_book === 0 ? 1 : 2)
    }

    useEffect(()=>{
        base.$('#teacherCommentModal').on('show.bs.modal', function (event) {
            const summernote = base.$('#summernote')
            summernote.summernote({
                height : 200,
                callbacks: {
                    onChange: function(contents, $editable) {
                        changeInput(contents)
                    }
                }
            })
        })

        base.$('#teacherCommentModal').on('hidden.bs.modal', function (event) {
            set_input_notes('')
            base.$('#summernote').summernote('destroy');
        })
    }, [])

    useEffect(()=>{
        if(data_selected.id !== '' && student_selected.id !== ''){
            base.$('#teacherCommentModal').modal('show')
        }
    }, [data_selected, student_selected])

    async function changeInput(value){
        set_input_notes(value)
    }

    async function submitNotes(){
        var url = '/grade/book'
        var data = {
            id : data_selected.id,
            comment : input_notes
        }

        var response = await base.request(url, 'put', data)
        if(response != null){
            window.location.reload()
        }
    }

	return(
		<div className='row'>

            <div className='col-12'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <img className='rounded' src={base.img_borderTop_primary} style={{width : '100%', height : '.75rem'}} />
                            <div className='col-12 p-3 pt-4'>
                                <div className='row m-0'>
                                    <div className='col-12 mb-3 pr-3'>
                                        <div className='row m-0'>
                                            <div className='col-12 col-lg'>
                                                <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Student List</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="input-group border rounded">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-white border-0 bg-transparent pr-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                                                    </div>
                                                    <input type="text" className="form-control border-0 bg-transparent" placeholder="Search" aria-describedby="basic-addon1" value={search} onChange={(e)=>changeSearch(e.target.value)} />
                                                </div>
                                            </div>
                                            {/* <div className='col-auto d-flex align-items-center'>
                                                <p className='m-0' style={{color : 'black'}}><i className="bi bi-sort-up"></i> Sort</p>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className='col-12 mt-3'>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Student Name</th>
                                                        <th>L/P</th>
                                                        <th>Semester 1</th>
                                                        <th>Semester 2</th>
                                                        {/* <th></th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        student_arr.map((data, index)=>(
                                                            <tr key={index}>
                                                                <td className='align-middle td-fit-content'>{data.id}</td>
                                                                <td className='align-middle'>{data.name}</td>
                                                                <td className='align-middle'>{(data.gender === 1 ? 'L' : 'P')}</td>
                                                                {
                                                                    data.arr_grade_book.map((data_grade_book, index_grade_book)=>(
                                                                        <td className='align-middle' key={index_grade_book}>
                                                                        {
                                                                            data_grade_book.comment != null ?
                                                                            data_grade_book.comment
                                                                            :
                                                                            <button className='btn btn-primary d-flex justify-content-center align-items-center' style={{height : '2.5rem', width : '2.5rem', borderRadius : '2.5rem'}} onClick={()=>addTeacherComment(index, index_grade_book)}>
                                                                                <i className="bi bi-pencil-fill"></i>
                                                                            </button>
                                                                        }
                                                                        </td>
                                                                    ))
                                                                }
                                                                {/* <td>
                                                                    <button className='btn btn-primary d-flex justify-content-center align-items-center' style={{height : '2.5rem', width : '2.5rem', borderRadius : '2.5rem'}}><i className="bi bi-pencil-fill"></i></button>
                                                                </td> */}
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>

            <div className="modal fade" id="teacherCommentModal" tabIndex="-1" aria-labelledby="teacherCommentModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content rounded border-0 shadow-sm">
                        <div className="modal-body p-0">
                            <div className={'row m-0'}>
                                <div className='col-12 p-3 pt-4 pb-5'>
                                    <div className='row m-0'>
                                        <div className='col-12 mb-3'>
                                            <h5 className='m-0'><i className="bi bi-chat-square-dots-fill mr-3" style={{color : '#00000066'}}></i>Teacher's Comment</h5>
                                        </div>

                                        <div className='col-12 mt-3 pb-3'>
                                            <div className='row m-0'>
                                                <div className='col-12'>
                                                    <p className='m-0'>{student_selected.name}</p>
                                                </div>
                                                <div className='col-12 mt-3'>
                                                    <label>Semester {semester_selected}</label>
                                                    {/* <textarea className='form-control' rows={5} onChange={(e)=>changeInput(e.target.value)} value={input_notes}></textarea> */}
                                                    <div id='summernote'>{input_notes}</div>
                                                </div>

                                                <div className='col-12 mt-4'>
                                                    <button className='btn btn-primary' onClick={()=>submitNotes()}>Submit</button>
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

        </div>
	)
}