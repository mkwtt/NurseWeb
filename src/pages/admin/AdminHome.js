import React, { useEffect, useState } from 'react'
import Professertable from '../../components/Table/Professertable'
import Studenttable from '../../components/Table/Studenttable'
import Admintable from '../../components/Table/Admintable'
import DropDown from '../../components/Button/DropDown'
import LoadingPage from '../LoadingPage'


function AdminHome() {

  const [loading, setLoading] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);

      setTimeout(() => {
        setCompleted(true);
      }, 1000);
    }, 2000);
  }, []);

  const goToImportExcell = () => {
    window.location.href = "/NA/admin/Gptimport_excel";
  }

  const goToEditUserPassword = () => {
    window.location.href = "/NA/admin/edit/password";
  }

  return (

    <div>
      {!completed ? (
        <LoadingPage></LoadingPage>
      ) : (<div className=' min-h-screen'>
        <h1 className=' text-black text-4xl text-center mt-10'>จัดการผู้ใช้</h1>
        <div className=' flex flex-row-reverse mr-4 mt-4'>
          <div className=' flex justify-around'>
            <div className=' mr-5'>
              <button onClick={goToEditUserPassword} className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold  text-black transition-all duration-150 ease-in-out  rounded-2xl hover:pl-10 hover:pr-6 bg-gray-50  group">
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out  bg-orange-400 group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">แก้ไขรหัสผ่าน</span>
              </button>
            </div>
            <div className=' mr-5'>
              <button onClick={goToImportExcell} className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold  text-black transition-all duration-150 ease-in-out  rounded-2xl hover:pl-10 hover:pr-6 bg-gray-50  group">
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out  bg-orange-400 group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                  <svg width="30" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 15.22H14.72M14.72 15.22H27.44M14.72 15.22V2.5M14.72 15.22V27.94" stroke="currentColor" strokeWidth="3.18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                  <svg className=' text-white' width="30" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 15.22H14.72M14.72 15.22H27.44M14.72 15.22V2.5M14.72 15.22V27.94" stroke="currentColor" strokeWidth="3.18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">นำเข้าข้อมูล</span>
              </button>
            </div>
            <div>
              <DropDown></DropDown>
            </div>
          </div>
        </div>
        <p className=' mt-3 mb-1 ml-2 text-black'>อาจารย์</p>
        <Professertable />
        <p className=' mt-3 mb-1 ml-2 text-black'>นิสิต</p>
        <Studenttable />
        <p className=' mt-3 mb-1 ml-2 text-black'>ผู้ดูแลระบบ</p>
        <Admintable></Admintable>

      </div>)
      }

    </div>
  )

}

export default AdminHome
