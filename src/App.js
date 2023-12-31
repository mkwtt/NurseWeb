import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// components
import Layout from './components/Layout';

// page
import Login from './pages/Login';

// admin
import AdminHome from './pages/admin/AdminHome';
import AddStudent from './pages/admin/student/AddStudent';
import AddTeacher from './pages/admin/teacher/AddTeacher';
import AddAdmin from './pages/admin/AddAdmin';
import EditAdmin from './pages/admin/EditAdmin';
import EditStudent from './pages/admin/student/EditStudent';
import EditTeacher from './pages/admin/teacher/EditTeacher';
import StudentDetail from './pages/admin/student/StudentDetail';
import TeacherDetail from './pages/admin/teacher/TeacherDetail';
import AdminDetail from './pages/admin/AdminDetail';
import AddCategory from './pages/admin/course/category/AddCategory';
import AddSyllabus from './pages/admin/course/syllabus/AddSyllabus';
import AdminSyllabus from './pages/admin/course/syllabus/AdminSyllabus';
import SyllabusDetail from './pages/admin/course/syllabus/SyllabusDetail';
import AddCourse from './pages/admin/course/AddCourse';
import Allcourse from './pages/admin/course/Allcourse';
import CourseDetail from './pages/admin/course/CourseDetail';
import AddWorkHistory from './pages/admin/workHistory/AddWorkHistory';
import WorkHistoryList from './pages/admin/workHistory/WorkHistoryList';
import WorkHistoryDetail from './pages/admin/workHistory/WorkHistoryDetail';
import Addscholarship from './pages/admin/Scholarship/Addscholarship';
import Addclass from './pages/admin/course/class/Addclass';
import Classdetail from './pages/admin/course/class/Classdetail';
import Evalsum from './pages/admin/eval/Evalsum';
import Evalsearch from './pages/admin/eval/Evalsearch';
import Adminoverall from './pages/admin/Adminoverall';
import EditUserPassword from './pages/admin/EditUserPassword';
//// import excell

import { Import_excel } from './pages/admin/excel/Import_excel';
import Chatgpt_import_excel from './pages/admin/excel/Chatgpt_import_excel';

import ClassManagement from './pages/admin/course/class/ClassManagement';


//student
import Studenthome from './pages/student/Studenthome';
import Studentevalpractice from './pages/student/eval/Studentevalpractice';
import Studentevaltheory from './pages/student/eval/Studentevaltheory';
import StudentevalCourse from './pages/student/eval/StudentevalCourse';
import StudentallEval from './pages/student/eval/StudentallEval';

//teacher
import Teacherhome from './pages/teacher/Teacherhome';
import TeacherEval_search from './pages/teacher/TeacherEval_search';
import SubjectManagement from './pages/teacher/SubjectManagement';
import View_taugheval from './pages/teacher/View_taugheval';
import Taugh_sum from './pages/teacher/Taugh_sum';
import Taugh_sumprac from './pages/teacher/Taugh_sumprac';

///comment
import Theory_comment from './pages/admin/eval_comment/Theory_comment';
import Practic_comment from './pages/admin/eval_comment/Practic_comment';
import Evalsum_comment from './pages/admin/eval_comment/Evalsum_comment';

// test
import Apitest from './Test.js/Apitest';
import Test2 from './Test.js/Test2';


///credit
import Credit from './pages/Credit';




// user Token for authn
import useToken from '../src/components/useToken';



const router = [

  {
    path: "/Apitest",
    element: <Apitest />,
    level: "admin"
  },
  {
    path: "/Apitest2",
    element: <Test2 />,
    level: "admin"

  },
  {
    path: "/NA/course/add",
    element: <AddCourse />,
    level: "admin"

  },
  {
    path: "/NA/course/category/add",
    element: <AddCategory />,
    level: "admin"

  },
  {
    path: "/NA/admin/edit/:userID/*",
    element: <EditAdmin />,
    level: "admin"

  },
  {
    path: "/NA/admin/student/edit/:userID/*",
    element: <EditStudent />,
    level: "admin"

  },
  {
    path: "/NA/admin/teacher/edit/:userID/*",
    element: <EditTeacher />,
    level: "admin"

  },
  {
    path: "/NA/admin/home/*",
    element: <AdminHome />,
    level: "admin"

  },
  {
    path: "/NA/admin/add/student",
    element: <AddStudent />,
    level: "admin"

  },
  {
    path: "/NA/admin/add/teacher",
    element: <AddTeacher />,
    level: "admin"

  },
  {
    path: "/NA/admin/add/admin",
    element: <AddAdmin />,
    level: "admin"

  },
  {
    path: "/NA/admin/detail/:userID/*",
    element: <AdminDetail />,
    level: "admin"

  },
  {
    path: "/NA/admin/student/detail/:userID/*",
    element: <StudentDetail />,
    level: "admin"

  },
  {
    path: "/NA/admin/teacher/detail/:userID/*",
    element: <TeacherDetail />,
    level: "admin"

  },
  {
    path: "/NA/student/home",
    element: <Studenthome />,
    level: "student"

  },
  {
    path: "/NA/teacher/home",
    element: <Teacherhome />,
    level: "teacher"

  },
  {
    path: "/NA/admin/course/syllabus/Add",
    element: <AddSyllabus />,
    level: "admin"

  },
  {
    path: "/NA/admin/course/syllabus/adminsyllabus",
    element: <AdminSyllabus />,
    level: "admin"

  },
  {
    path: "/NA/admin/course/syllabus/:syllabusID/*",
    element: <SyllabusDetail />,
    level: "admin"

  },
  {
    path: "/NA/admin/course/all",
    element: <Allcourse />,
    level: "admin"

  },
  {
    path: "/NA/admin/course/detail/:courseID/*",
    element: <CourseDetail />,
    level: "admin"
  },
  {
    path: "/NA/admin/student/work/add/:userID/*",
    element: <AddWorkHistory />,
    level: "admin"
  },
  {
    path: "/NA/admin/student/work/list/:userID/*",
    element: <WorkHistoryList />,
    level: "admin"
  },
  {
    path: "/NA/admin/student/work/detail/:workHistoryID/*",
    element: <WorkHistoryDetail />,
    level: "admin"
  },
  {
    path: "/NA/admin/scholarship/add",
    element: <Addscholarship />,
    level: "admin"

  },
  {
    path: "/NA/student/eval/practice/:evalTaughID/*",
    element: <Studentevalpractice />,
    level: "student"

  },
  {
    path: "/NA/student/eval/theory/:evalTaughID/*",
    element: <Studentevaltheory />,
    level: "student"

  },
  {
    path: "/NA/admin/add/class",
    element: <Addclass />,
    level: "admin"

  },
  {
    path: "/NA/admin/class/detail/:classID/*",
    element: <Classdetail />,
    level: "admin"

  },
  {
    path: "/NA/student/eval/course/:studyID/*",
    element: <StudentevalCourse />,
    level: "student"

  },
  {
    path: "/NA/student/eval/all",
    element: <StudentallEval />,
    level: "student"

  },
  {
    path: "/NA/admin/eval/sum/:classID/*",
    element: <Evalsum />,
    level: "admin"

  },
  {
    path: "/NA/teacher/eval/sum/:classID/*",
    element: <Evalsum />,
    level: "teacher"

  },
  {
    path: "/NA/admin/eval/search",
    element: <Evalsearch />,
    level: "admin"

  },
  {
    path: "/NA/teacher/eval/search",
    element: <TeacherEval_search />,
    level: "teacher"

  },
  {
    path: "/NA/admin/overall",
    element: <Adminoverall />,
    level: "admin"
  },
  {
    path: "/NA/teacher/subject",
    element: <SubjectManagement />,
    level: "teacher"

  },
  {
    path: "/NA/teacher/Taughview",
    element: <View_taugheval />,
    level: "teacher"

  },
  {
    path: "/NA/teacher/sum/theory/:classID/*",
    element: <Taugh_sum />,
    level: "teacher"

  },
  {
    path: "/NA/teacher/sum/practice/:classID/*",
    element: <Taugh_sumprac />,
    level: "teacher"

  },
  {
    path: "/NA/credit",
    element: <Credit />,
    level: "admin"

  },
  {
    path: "/NA/credit",
    element: <Credit />,
    level: "student"

  },
  {
    path: "/NA/credit",
    element: <Credit />,
    level: "teacher"

  },
  ///////excel/////
  {
    path: "/admin/import_excel",
    element: <Import_excel />,
    level: "admin"
  },                                                                                                            
  {
    path: "/NA/admin/Gptimport_excel",
    element: <Chatgpt_import_excel />,
    level: "admin"
  },
  {
    path: "/NA/admin/class",
    element: <ClassManagement />,
    level: "admin"

  },
  {
    path: "/Practice_comment",
    element: <Practic_comment />,
    level: "teacher"

  },
  {
    path: "/Theorycomment/:classID/*",
    element: <Theory_comment />,
    level: "teacher"

  },
  {
    path: "/Evalsumcomment",
    element: <Evalsum_comment />,
    level: "teacher"
  },
  {
    path: "/Evalsumcomment",
    element: <Evalsum_comment />,
    level: "admin"
  },
  {
    path: "/NA/admin/edit/password",
    element: <EditUserPassword/>,
    level: "admin"
  },
 

]; 

function App() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();

  // check if user is login if not return login page
  // console.log("--------------");
  // console.log(token);
  // console.log("--------------");
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      {/* layout for select path and auth condition */}
      <Layout session={token} setToken={setToken}>

        {/* show all page for test only */}
        {/* {
          router.map((item, index) => (
            <div className=' m-3 border shadow'>
              <h1 className=' text-xs font-bold'> {item.path} </h1>
              <div className=' border border-green-800 m-3 '>
                {item.element}
              </div>
            </div>
          ))
        } */}

        <Router>
          {/* <div> */}
          <Routes>
            {
              router.map((item, index) => {
                if (item.level == token.level)
                  return (<Route key={index} path={item.path} element={item.element} />);
              })
            }
          </Routes>
          {/* </div> */}
        </Router>

      </Layout>




    </div>
  )
}

export default App