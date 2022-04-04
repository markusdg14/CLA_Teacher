import { useEffect, useState, useMemo } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import Select from 'react-select'
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import ReportGrade from './reportGrade';
import ReportSkill from './reportSkill';

export default function GradeBookDetail(){
    var base = new Base()

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})
    const [header_menu_arr, set_header_menu_arr] = useState([
        {id : 'report_card_grade', title : 'Report Card Grade', is_selected : true},
        {id : 'report_card_skill', title : 'Report Card Skill', is_selected : false},
    ])
    const [header_selected, set_header_selected] = useState('report_card_grade')

    const [term_arr, set_term_arr] = useState([])
    const [term_selected, set_term_selected] = useState('')

    const [data_arr, set_data_arr] = useState([])

    const [lesson_arr, set_lesson_arr] = useState([])
    const [class_student, set_class_student] = useState([])
    const [assignment_agreement, set_assignment_agreement] = useState([])
    const [grade_book_arr, set_grade_book_arr] = useState({})

    const [student_arr, set_student_arr] = useState([])
    const [student_arr_temp, set_student_arr_temp] = useState([])
    const [skill_student_selected, set_skill_student_selected] = useState('')
    const [skill_student_name_selected, set_skill_student_name_selected] = useState('')
    const [skill_ctg_arr, set_skill_ctg_arr] = useState([])
    const [skill_list_arr, set_skill_list_arr] = useState([])
    const [skill_assignment, set_skill_assignment] = useState([])
    const [skill_grade_arr, set_skill_grade_arr] = useState([])
    const [skill_grade_book_arr, set_skill_grade_book_arr] = useState([])

    const [legend_arr, set_legend_arr] = useState([])

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(()=>{
        if(user_data.id !== ''){
            get_term()
        }
    }, [user_data])

    async function get_term(){
        var url = '/term'

        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                set_term_arr(data)
                set_term_selected(data[0].id)
            }
        }
    }

    useEffect(()=>{
        if(header_selected === 'report_card_skill'){
            get_legend()
        }
    }, [header_selected])

    useEffect(()=>{
        if(term_selected !== ''){
            get_data()
        }
    }, [term_selected])

    async function get_data(){
        var url = ''
        if(header_selected === 'report_card_grade'){
            url = '/grade/book/report-card?subject_id=' + query.get('subject_id') + '&grade_id=' + query.get('grade_id') + '&term_id=' + term_selected
        }
        else if(header_selected === 'report_card_skill'){
            url = '/grade/book/report-card/skill?subject_id=' + query.get('subject_id') + '&grade_id=' + query.get('grade_id') + '&term_id=' + term_selected + '&user_id=' + skill_student_selected
        }
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                
                if(header_selected === 'report_card_grade'){
                    set_class_student(data.arr_class_student)
                    set_assignment_agreement(data.arr_assignment_agreement.data)
                    set_grade_book_arr(data.arr_grade_book_detail)
                    
                    var class_student = data.arr_class_student
                    var arr_student = []
                    for(var x in class_student){
                        arr_student.push(class_student[x].user)
                    }
                    
                    set_student_arr(arr_student)
                }
                else {
                    set_skill_assignment(data.arr_assignment.data)
                    set_skill_list_arr(data.arr_skill)
                    set_skill_ctg_arr(data.arr_skill_category)
                    set_skill_grade_arr(data.arr_grade_skill)
                    set_skill_grade_book_arr(data.arr_grade_book_skill)
                }
            }
        }
    }

    async function get_legend(){
        var url = '/assessment/range'

        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data.data
                set_legend_arr(data)
            }
        }
    }

    function changeStudent(value){
        set_skill_student_selected(value)
    }

    function filterStudent(){
        if(skill_student_selected !== ''){
            for(var x in student_arr){
                if(student_arr[x].id === skill_student_selected){
                    set_skill_student_name_selected(student_arr[x].name)
                }
            }
            get_data()
        }
    }

    function changeMenu(index){
        var data_index = header_menu_arr[index]
        var initSelected = data_index.is_selected
        for(var x in header_menu_arr){
            header_menu_arr[x].is_selected = false
        }
        header_menu_arr[index].is_selected = true
        base.update_array(header_menu_arr, set_header_menu_arr, data_index, index)

        if(header_menu_arr[index].is_selected){
            set_header_selected(header_menu_arr[index].id)
        }
    }

    function backBtn(){
        window.history.back()
    }

    function changeTerm(val){
        set_term_selected(val)
    }


    return(
        <div className='row'>

            <div className='col-12'>
                <Header title={'Grade Book'} user_data={user_data} />
            </div>

            <div className='col-12 mt-5 pt-4'>
                <div className='bg-white shadow rounded d-flex align-items-center justify-content-center' style={{cursor : 'pointer', width : '3rem', height : '3rem'}} onClick={backBtn}>
                    <h3 className='m-0'><i className="bi bi-arrow-left-short" style={{color : '#6F826E'}}></i></h3>
                </div>
            </div>

            <div className='col-12 mt-5'>
                <div className="card rounded shadow-sm">
                    <div className={"card-body p-0"}>
                        <div className={'row m-0'}>
                            <div className='col-12 py-5 px-4'>
                                <div className='row m-0'>
                                    {
                                        header_menu_arr.map((data, index)=>(
                                            <div className='col-auto p-0 mr-2' key={index}>
                                                <div className={(data.is_selected ? 'bg-primary' : '') + ' p-2 px-3'} style={{borderRadius : '1.5rem', cursor : 'pointer'}} onClick={()=>changeMenu(index)}>
                                                    <p className={'m-0' + (data.is_selected ? ' text-white' : '')}>{data.title}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className='col-12 mt-5'>
                {
                    header_selected === 'report_card_grade' ?
                    <>
                    <ReportGrade
                        class_student={class_student}
                        assignment_agreement={assignment_agreement}
                        grade_book_arr={grade_book_arr}
                        term_arr={term_arr}
                        term_selected={term_selected}
                        changeTerm={(val)=>changeTerm(val)}
                    />
                    </>
                    :
                    <>
                    <ReportSkill
                        student_arr={student_arr}
                        student_arr_temp={student_arr_temp}
                        skill_student_selected={skill_student_selected}
                        skill_student_name_selected={skill_student_name_selected}
                        skill_ctg_arr={skill_ctg_arr}
                        skill_list_arr={skill_list_arr}
                        skill_assignment={skill_assignment}
                        skill_grade_arr={skill_grade_arr}
                        legend_arr={legend_arr}
                        changeStudent={(val)=>changeStudent(val)}
                        filterBtn={()=>filterStudent()}
                        term_arr={term_arr}
                        term_selected={term_selected}
                        changeTerm={(val)=>changeTerm(val)}
                        skill_grade_book_arr={skill_grade_book_arr}
                    />
                    </>
                }
            </div>
            
        </div>
    )
}