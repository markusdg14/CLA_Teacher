import React from 'react';
import Base from '../../utils/base';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomeIndex from '../home';
import Navbar from './navbar';
import CalendarIndex from '../teaching/calendar';
import ProfileIndex from '../profile';
import AuthLogin from '../auth/login';
import CheckAssignment from '../teaching/checkAssignment';
import CheckAssignmentDetail from '../teaching/checkAssignment/detail';
import SubjectLesson from '../teaching/subjectLesson';
import SubjectLessonDetail from '../teaching/subjectLesson/detail';
import Announcement from '../teaching/announcement';
import GradeBook from '../teaching/gradeBook';
import GradeBookDetail from '../teaching/gradeBook/detail';
import HomeroomIndex from '../homeroom';
import HomeroomDetail from '../homeroom/detail';
import TrackerIndex from '../teaching/tracker';
import HomeIndex from '../home';
import ForgetPassword from '../auth/forgetPass';
import EditProfile from '../profile/edit';
import SubjectLessonEdit from '../teaching/subjectLesson/editActivity';


// import Navbar from './navbar'
// import SideBar from './sidebar'

export default class BaseLayout extends Base{

  state = {
    token : '',
  }
  
  async componentDidMount(){
    var token = await localStorage.getItem('token')
    await this.setState({token : token})
    // await localStorage.clear()
  }

  render(){
    const { token } = this.state
    return (
      <>
      <Router>
        <div className='position-relative' id="wrapper" style={{width : '100wh', height : '100vh'}}>
            <div className="ratio-169" style={{width : '100%',  backgroundSize : 'cover', backgroundRepeat : 'no-repeat', backgroundImage : "url(" + this.img_background +")"}} ></div>
            
            <div className='background-left'>
              <img src={this.img_logo_talent} />
            </div>
            <div className='background-right'>
              <img src={this.img_logo_talent} />
            </div>

            <div className='position-absolute w-100 pb-5' style={{top : 0}}>
              {
                token != null &&
                <Navbar />
              }

              <div className='container pb-5 mb-5 mt-4 px-0'>
                <Routes>
                    <Route exact path={"/"} element={<HomeIndex />}></Route>

                    <Route exact path={"/teacher-tracker"} element={<TrackerIndex />}></Route>
                    <Route exact path={"/check-assignment"} element={<CheckAssignment />}></Route>
                    <Route exact path={"/check-assignment/detail"} element={<CheckAssignmentDetail />}></Route>

                    <Route exact path={"/subject-lesson"} element={<SubjectLesson />}></Route>
                    <Route exact path={"/subject-lesson/edit-activity"} element={<SubjectLessonEdit />}></Route>
                    <Route exact path={"/subject-lesson/detail"} element={<SubjectLessonDetail />}></Route>

                    <Route exact path={"/announcement"} element={<Announcement />}></Route>

                    <Route exact path={"/grade-book"} element={<GradeBook />}></Route>
                    <Route exact path={"/grade-book/detail"} element={<GradeBookDetail />}></Route>

                    <Route exact path={"/homeroom"} element={<HomeroomIndex />}></Route>
                    <Route exact path={"/homeroom/detail"} element={<HomeroomDetail />}></Route>

                    <Route exact path={"/calendar"} element={<CalendarIndex />}></Route>
                    <Route exact path={"/profile"} element={<ProfileIndex />}></Route>
                    <Route exact path={"/profile/edit"} element={<EditProfile />}></Route>

                    <Route exact path={"/auth/login"} element={<AuthLogin />}></Route>
                    <Route exact path={"/auth/forget-password"} element={<ForgetPassword />}></Route>
                </Routes>
              </div>
            </div>
        </div>
      </Router>
      </>
    );
  }
}