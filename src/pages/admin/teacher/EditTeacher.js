import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Route, Routes, useParams } from 'react-router-dom';
import TeacherDetail from './TeacherDetail';

function EditTeacher() {

    const [password, setpassword] = useState("");
    const [IDnumber, setIDnumber] = useState("");
    const [nameENG, setnameENG] = useState("");
    const [nameTH, setnameTH] = useState("");
    const [teacherID, setTeacherID] = useState('');

    const { userID } = useParams();

    const [data, setData] = useState("");

    const fetchData = () => {
        axios.get(process.env.REACT_APP_API_URL + "/teacher", { params: { userID: userID } })
            .then(res => {
                console.log(res.data);

                if (res.data.error === true) {
                    console.log(res.data)
                    console.log("ERROR FOUND WHEN GET DATA FROM API");
                    return;
                }
                setnameTH(res.data.data.nameTH);
                setnameENG(res.data.data.nameENG);
                setpassword(res.data.data.password);
                setIDnumber(res.data.data.IDnumber);
                setTeacherID(res.data.data.teacherID);
            }).catch(error => {
                console.log(error.res);
            });
    }

    const backToTeacherDetail = (userID) => {
        window.location.href = "/admin/teacher/detail/" + userID;
    }

    useEffect(() => {
        fetchData();
    },[])

    const editTeacher = () => {
        axios.put(process.env.REACT_APP_API_URL + "/teacher", {
            userID: userID,
            password: password,
            IDnumber: IDnumber,
            nameENG: nameENG,
            nameTH: nameTH,
            teacherID: teacherID
        }).then(() => {
            setData([
                ...data,
                {
                    userID: userID,
                    password: password,
                    IDnumber: IDnumber,
                    nameENG: nameENG,
                    nameTH: nameTH,
                    teacherID: teacherID
                }
            ])
            window.location.href = "/admin/teacher/detail/" + userID;
        })
    }

    return (
        <div>
            <Routes>
                <Route path='/admin/teacher/detail/:userID' element={<TeacherDetail/>}/>
            </Routes>
            <div className=' bg-gray-200 slate-500 min-h-screen border'>
                <h1 className=' text-black text-4xl text-center m-3'>แก้ไขข้อมูลอาจารย์</h1>

                <div className='container mx-auto text-black'>
                    <div className=' grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 p-6 '>
                        <div >
                            <p>รหัสประจำตัว</p>
                            <div className="mb-5 flex justify-center ">
                                <input
                                    onChange={(event) => {
                                        setTeacherID(event.target.value)
                                    }}
                                    type="text"
                                    value={teacherID}
                                    name="teacherID"
                                    placeholder='รหัสประจำตัว'
                                    className="w-full rounded-md border border-while (condition) {
                    } bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div >
                            <p>ชื่อไทย</p>
                            <div className="mb-5 flex justify-center ">
                                <input
                                    onChange={(event) => {
                                        setnameTH(event.target.value)
                                    }}
                                    type="text"
                                    value={nameTH}
                                    name="nameTH"
                                    placeholder='ชื่อไทย'
                                    className="w-full rounded-md border border-while (condition) {
                    } bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div >
                            <p>ชื่ออังกฤษ</p>
                            <div className="mb-5 flex justify-center ">
                                <input
                                    onChange={(event) => {
                                        setnameENG(event.target.value)
                                    }}
                                    type="text"
                                    value={nameENG}
                                    name="nameENG"
                                    placeholder="ชื่ออังกฤษ"
                                    className="w-full rounded-md border border-while (condition) {
                    } bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div >
                            <p>รหัสประจำตัวประชาชน</p>
                            <div className="mb-5 flex justify-center ">
                                <input
                                    onChange={(event) => {
                                        setIDnumber(event.target.value)
                                    }}
                                    type="text"
                                    value={IDnumber}
                                    name="IDnumber"
                                    placeholder="รหัสประจำตัวประชาชน"
                                    className="w-full rounded-md border border-while (condition) {
                    } bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div >
                            <p>Password</p>
                            <div className="mb-5 flex justify-center ">
                                <input
                                    onChange={(event) => {
                                        setpassword(event.target.value)
                                    }}
                                    type="text"
                                    value={password}
                                    name="Password"
                                    placeholder="Password"
                                    className="w-full rounded-md border border-while (condition) {
                    } bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='  grid grid-cols-2 '>
                    <div className=' ml-3'>
                        <button onClick={() => backToTeacherDetail(userID)} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                                <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">กลับ</span>
                            <span className="relative invisible">Button Text</span>
                        </button>
                    </div>
                    <div className=' absolute right-0 mr-7'>
                        <button onClick={() => editTeacher(userID)} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                                <svg className=' text-white' width="30" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 15.22H14.72M14.72 15.22H27.44M14.72 15.22V2.5M14.72 15.22V27.94" stroke="currentColor" strokeWidth="3.18" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">บันทึก</span>
                            <span className="relative invisible">Button Text</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditTeacher