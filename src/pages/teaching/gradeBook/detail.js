import { useEffect, useState, useMemo } from 'react';
import Base from '../../../utils/base';
import Header from '../../../components/header';
import Select from 'react-select'
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';

export default function GradeBookDetail(){
    var base = new Base()

    function useQuery(){
        const {search} = useLocation()
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    
    let query = useQuery()

    const [user_data, set_user_data] = useState({id : '', name : '', email : '', phone : '', image : {image_display : base.img_no_profile}})
    const [data_arr, set_data_arr] = useState([])

    const [lesson_arr, set_lesson_arr] = useState([])
    const [student_arr, set_student_arr] = useState([])

    useEffect(async ()=>{
        var check_user = await base.checkAuth()
        set_user_data(check_user.user_data)
    }, [])

    useEffect(()=>{
        if(user_data.id !== ''){
            get_data()
        }
    }, [user_data])

    async function get_data(){
        var url = '/grade/book/report-card?assignment_group_id=' + query.get('id')
        var response = await base.request(url)
        if(response != null){
            if(response.status == 'success'){
                var data = response.data
                
                var lesson_data_arr = [], count_lesson = 0
                for(let lesson of data.arr_lesson){
                    lesson.is_show = (count_lesson === 0 ? true : false)
                    lesson_data_arr.push({id : lesson.id, name : lesson.name, is_show : lesson.is_show})
                }
                set_lesson_arr(lesson_data_arr)

                // var student_data_arr = []
                // for(let student of data.arr_class_student){
                //     subject_data_arr.push({id : student.user.id, name : subject.name})
                // }
                // set_subject_arr(subject_data_arr)


            }
        }
    }

    function backBtn(){
        window.history.back()
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
                <div className='row'>
                    <div className='col-12'>
                    </div>
                </div>
            </div>
            
        </div>
    )
}