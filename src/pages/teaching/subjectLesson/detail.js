import { useEffect, useState, useMemo } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import Select from 'react-select'
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';

export default function SubjectLessonDetail(){
    var base = new Base()

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}, current_academic_year : {id : ''}})
    const [data_arr, set_data_arr] = useState([])
    
    const [grade_arr, set_grade_arr] = useState([])
    const [grade_selected, set_grade_selected] = useState('')

    const [academic_year_arr, set_academic_year_arr] = useState([])
    const [academic_year_selected, set_academic_year_selected] = useState('')

    const [subject_arr, set_subject_arr] = useState([])
    const [header, set_header] = useState('')

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])
    
    useEffect(async ()=>{
        if(user_data.id !== ''){
            get_data()
        }
    }, [user_data])


    async function get_data(){
        var url = '/assignment/group?subject_id=' + query.get('subject_id') + '&grade_id=' + query.get('grade_id') + '&academic_year_id=' + query.get('academic_year_id')
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                set_header(response.assignment_group.grade.name + ' ' + response.assignment_group.subject.name)
                set_data_arr(data)
            }
        }
    }


    function backBtn(){
        window.history.back()
    }

    function changeFilter(val, type){
        var filter = JSON.parse(val)
        set_grade_selected(filter)
    }

    function applyFilter(){
        console.log(grade_selected)
    }


    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Subject & Lesson Plan'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='row'>
                    <div className='col d-flex align-items-center'>
                        <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                            <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                        </div>
                    </div>
                    <div className='col-auto text-right d-flex align-items-center justify-content-center mt-3 mt-lg-0'>
                        <div className='bg-white rounded shadow-sm px-4 py-3'>
                            <p className='m-0'>Academy Year / {header}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <div className='col-12 p-3 pt-4'>
                                <div className='row m-0'>
                                    <div className='col'>
                                        <label>Grade</label>
                                        <Select
                                            name='grade_selected'
                                            value={1}
                                            options={grade_arr}
                                            onChange={(val)=>changeFilter(JSON.stringify(val), 'grade')}
                                        />
                                    </div>
                                    <div className='col'>
                                        <label>Academic Year</label>
                                        <Select
                                            name='academic_year_selected'
                                            value={academic_year_selected}
                                            options={academic_year_arr}
                                        />
                                    </div>
                                    <div className='col'>
                                        <label>Subject</label>
                                        <Select
                                            name='subject_selected'
                                            value={subject_selected}
                                            options={subject_arr}
                                        />
                                    </div>
                                    <div className='col d-flex align-items-end'>
                                        <button className='btn btn-primary rounded w-100' onClick={()=>applyFilter()}>Filter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div> */}

            <div className='col-12 mt-4 text-right'>
                <button className='btn btn-outline-primary rounded px-5'>Student View</button>
            </div>

            <div className='col-12 mt-5'>
                <div className='row'>

                    {
                        data_arr.map((data, index)=>(
                            <div className={'col-12' + (index != 0 ? ' mt-4' : '')} key={index}>
                                <div className='row'>
                                    <div className='col-3 py-3' style={{backgroundColor : '#EBEFE2'}}>

                                        <div className='row'>
                                            <div className='col-12 bg-white p-4'>
                                                <h5 className='m-0 text-primary'>{data.lesson.name}</h5>
                                            </div>
                                            <div className='col-12 p-4'>
                                                <p className='m-0'>Confirmed by {data.created_user.name}</p>
                                                <p className='m-0'>Last Update by {data.updated_user.name}</p>
                                                <p className='m-0'>Last Updated at {base.moment(data.updated_at_format).format('DD/MM/YY')}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-9 px-4 bg-white'>
                                        <div className='row'>

                                            {
                                                data.assignment_agreement.map((assignment, index_assignment)=>(
                                                    <div className='col-12 py-3 rounded' style={{borderBottom : '1px solid #EAEAEA'}} key={index_assignment}>
                                                        <div className='row'>
                                                            <div className='col-auto d-flex align-items-center'>
                                                                <h5 className='m-0 d-inline-block'>
                                                                    {
                                                                        assignment.total_submitted == assignment.total_student ?
                                                                        <i className="bi bi-check-square-fill text-secondary"></i>
                                                                        :
                                                                        <i className="bi bi-square" style={{color : '#8A92A6'}}></i>
                                                                    }
                                                                </h5>
                                                            </div>
                                                            <div className='col d-flex align-items-center'>
                                                                <p className='m-0 d-inline-block'>
                                                                    <i className="bi bi-puzzle-fill mr-4" style={{fontSize : 18}}></i>
                                                                    {assignment.name}
                                                                </p>
                                                            </div>
                                                            <div className='col-auto d-flex align-items-center px-5'>
                                                                <div className='py-1 px-5' style={{border : '1px solid #008060', borderRadius : '1rem'}}>
                                                                    <p className='m-0' style={{color : '#008060', fontSize : '.75rem'}}>Graded</p>
                                                                </div>
                                                            </div>
                                                            <div className='col-auto text-right'>
                                                                <p className='m-0' style={{fontFamily : 'InterBold', color : 'black', fontSize : '.75rem'}}>Terkumpul {assignment.total_submitted}/{assignment.total_student} Student</p>
                                                                <p className='m-0' style={{color : 'black', fontSize : '.75rem'}}>DUE : {assignment.deadline_date != null ? base.moment(assignment.deadline_date).format('DD/MM/YY HH:mm') : '-'}</p>
                                                            </div>
                                                            <div className='col-auto text-right d-flex align-items-center'>
                                                                <h4 className='m-0' style={{cursor : 'pointer'}}><i className="bi bi-pencil-square" style={{color : '#0085FF'}}></i></h4>
                                                            </div>
                                                        </div>
                                                    </div>

                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
}