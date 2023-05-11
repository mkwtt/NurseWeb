import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Route, Routes, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditAdmin from './EditAdmin';
import LoadingPage from '../LoadingPage';

function AdminDetail() {

    const [data, setData] = useState([]);
    const [adminlist, setAdminList] = useState([]);

    const { userID } = useParams();

    const [loading, setLoading] = useState(undefined);
    const [completed, setCompleted] = useState(undefined);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 700,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const deleteAdmin = (userID) => {
        Swal.fire({
            title: 'ต้องการลบผู้ดูแลระบบหรือไม่?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: `ไม่ใช่`,
            cancelButtonText: 'ยกเลิก'
        })
            .then((results) => {
                if (results.isConfirmed) {
                    axios.delete(process.env.REACT_APP_API_URL + "/admin", { data: { userID: userID } })
                        .then((response) => {
                            setAdminList(
                                adminlist.filter((_) => {
                                    return _.userID !== userID;
                                })
                            )

                            // Toast.fire({
                            //     icon: 'success',
                            //     title: 'Delete data success'
                            // })
                            Swal.fire({
                                // position: "top-end",
                                icon: "success",
                                title: "Delete data success",
                                showConfirmButton: false,
                                timer: 1000,
                            })
                                .then(
                                    () => {
                                        window.location.href = "/NA/admin/home";
                                    }
                                )
                        }).catch(function (error) {
                            if (error.response) {
                                // console.log(error.response);
                            }
                        });
                }
                else if (results.isDenied) {
                    window.location.href = "/NA/admin/detail/" + userID;
                }
            })

    }

    const fetchData = () => {


        axios.get(process.env.REACT_APP_API_URL + "/admin", { params: { userID: userID } })
            .then(res => {
                // console.log(res.data);

                if (res.data.error === true) {
                    // console.log(res.data)
                    // console.log("ERROR FOUND WHEN GET DATA FROM API");
                    return;
                }
                setData(res.data.data);
                setLoading(true);

                setTimeout(() => {
                    setCompleted(true);
                }, 1000);

            }).catch(error => {
                // console.log(error.res);
            });
    }

    useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 2000);
    }, [])

    const goToEditAdmin = (userID) => {
        window.location.href = "/NA/admin/edit/" + userID;
    }

    return (
        <>
            {!completed ? (
                <LoadingPage></LoadingPage>
            ) : (
                <div>
                    <Routes>
                        <Route path='/admin/edit/:userID' element={<EditAdmin />} />
                    </Routes>
                    <div className=" text-black min-h-screen  space-y-5">
                        <div className=" font-bold text-4xl m-10 grid grid-cols-1 place-items-center">ข้อมูลผู้ดูแลระบบ</div>
                        <div className=' flex flex-row-reverse  '>
                        <div className='   mr-3'>
                                <button onClick={() => goToEditAdmin(userID)} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-orange-400 rounded-full shadow-md group">
                                    <span className="absolute inset-0 flex items-center justify-center rotate-180 w-full h-full text-white duration-300 -translate-x-full bg-orange-400 group-hover:translate-x-0 ease">
                                        <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                    <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">แก้ไข</span>
                                    <span className="relative invisible">Button Text</span>
                                </button>
                            </div>

                            <div className='  mr-3'>
                                <button onClick={() => deleteAdmin(userID)} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-red-500 rounded-full shadow-md group">
                                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
                                        <svg width="20" className=' text-white' height="20" viewBox="0 0 47 51" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M39.2592 23.4346V46.2701C39.2592 47.0752 38.6673 47.7277 37.937 47.7277H9.72969C8.99945 47.7277 8.40747 47.0752 8.40747 46.2701V23.4346" stroke="black" strokeWidth="6.54545" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19.4258 38.0104V23.4346" stroke="black" strokeWidth="6.54545" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M28.2407 38.0104V23.4346" stroke="black" strokeWidth="6.54545" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M43.6665 13.7172H32.648M32.648 13.7172V5.45759C32.648 4.65259 32.0561 4 31.3258 4H16.3407C15.6105 4 15.0185 4.65259 15.0185 5.45759V13.7172M32.648 13.7172H15.0185M4 13.7172H15.0185" stroke="black" strokeWidth="6.54545" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">ลบ</span>
                                    <span className="relative invisible">Button Text</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className=' text-3xl text-center mb-5'>ผู้ดูแลระบบ : {data.nameTH}</div>
                            <div className=" grid grid-cols-1 place-items-center">
                                <div className=" block bg-gray-200 w-2/3 p-auto rounded-2xl ring ring-black text-xl">
                                    <div className=" flex justify-around">
                                        <div className=" ml-7">
                                            {
                                                data.nameTH ?
                                                    <>
                                                        <div className=" m-3">ชื่อสกุล : {data.nameTH}</div></> :
                                                    <></>
                                            }
                                            {
                                                data.adminID ?
                                                    <>
                                                        <div className=" m-3">รหัสประจำตัว : {data.adminID}</div></> :
                                                    <></>
                                            }
                                        </div>
                                        <div className=" mr-7">
                                            {
                                                data.nameENG ?
                                                    <>
                                                        <div className=" m-3">ชื่ออังกฤษ : {data.nameENG}</div></> :
                                                    <></>
                                            }
                                            {
                                                data.IDnumber ?
                                                    <>
                                                        <div className=" m-3">เลขบัตรประจำตัวประชาชน : {data.IDnumber}</div></> :
                                                    <></>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AdminDetail