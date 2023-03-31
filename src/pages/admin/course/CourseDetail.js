import axios from 'axios';
import StudentPopup from '../../../components/Button/StudentPopup'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function CourseDetail() {
    const [data, setData] = useState([]);
    const { courseID } = useParams();
    const { categoryID } = useParams();

    const [courseList, setCourseList] = useState([]);

    const [categoryInfo, setCategoryInfo] = useState('');
    const [courseNameTH, setCourseNameTH] = useState('');
    const [courseNameENG, setCourseNameENG] = useState('');
    const [detail, setDetail] = useState('');
    const [creditStudy, setCreditStudy] = useState('');
    const [studyTimeTheory, setStudyTimeTheory] = useState('');
    const [studyTimePractice, setStudyTimePractice] = useState('');
    const [studyTimeSelf, setStudyTimeSelf] = useState('');

    const [category, setCategory] = useState([]);

    const [categoryName, setCategoryName] = useState('');

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

    const deleteCourse = () => {
        Swal.fire({
            title: 'ต้องการลบหลักสูตรหรือไม่?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: `ไม่ใช่`,
            cancelButtonText: 'ยกเลิก'
        })
            .then((results) => {
                if (results.isConfirmed) {
                    axios.delete(process.env.REACT_APP_API_URL + "/course", { data: { courseID: courseID } })
                        .then((response) => {
                            setCourseList(
                                courseList.filter((_) => {
                                    return _.courseID !== courseID;
                                })
                            )
                            Swal.fire('Deleted!', '', 'success')
                                .then(() => { window.location.href = "/admin/course/all"; })


                        }).catch(function (error) {
                            if (error.response) {
                                console.log(error.response);
                            }
                        });
                }
                else if (results.isDenied) {
                    window.location.href = "/admin/course/all";
                }
            })

    }

    const fetchData = () => {


        axios.get(process.env.REACT_APP_API_URL + "/course/detail", { params: { courseID: courseID } })
            .then(res => {
                console.log(res.data);

                if (res.data.error === true) {
                    console.log(res.data)
                    console.log("ERROR FOUND WHEN GET DATA FROM API");
                    return;
                }
                setCategoryName(res.data.data.categoryName);
                setCourseNameTH(res.data.data.courseNameTH);
                setCourseNameENG(res.data.data.courseNameENG);
                setDetail(res.data.data.detail);
                setCreditStudy(res.data.data.creditStudy);
                setStudyTimeTheory(res.data.data.studyTimeTheory);
                setStudyTimePractice(res.data.data.studyTimePractice);
                setStudyTimeSelf(res.data.data.studyTimeSelf);

            }).catch(error => {
                console.log(error.res);
            });

        axios.get(process.env.REACT_APP_API_URL + "/course/category")
            .then(res => {
                console.log(res.data);

                if (res.data.error === true) {
                    console.log(res.data);
                    console.log("ERROR FOUND WHEN GET DATA ");
                    return;
                }
                setCategory(res.data.data)
            })
            .catch(error => {
                console.log(error.res)
            });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const checkDataChange = () => {
        Swal.fire({
            title: 'ข้อมูลมีการเปลี่ยนแปลง',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            denyButtonText: `ไม่บันทึก`,
            cancelButtonText: 'ยกเลิก'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.put(process.env.REACT_APP_API_URL + "/course", {
                        courseID: courseID,
                        categoryID: categoryInfo,
                        courseNameTH: courseNameTH,
                        courseNameENG: courseNameENG,
                        detail: detail,
                        creditStudy: creditStudy,
                        studyTimeTheory: studyTimeTheory,
                        studyTimePractice: studyTimePractice,
                        studyTimeSelf: studyTimeSelf
                    })
                        .then(() => {
                            setData([
                                ...data,
                                {
                                    courseID: courseID,
                                    categoryID: categoryInfo,
                                    courseNameTH: courseNameTH,
                                    courseNameENG: courseNameENG,
                                    detail: detail,
                                    creditStudy: creditStudy,
                                    studyTimeTheory: studyTimeTheory,
                                    studyTimePractice: studyTimePractice,
                                    studyTimeSelf: studyTimeSelf
                                }
                            ])
                            Swal.fire('Saved!', '', 'success')
                                .then(() => { window.location.href = "/admin/course/all" })
                        })
                }
                else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                        .then(() => { window.location.href = "/admin/course/all" })
                }
            });
    }

    const backToAdminCourseAll = () => {
        window.location.href = "/admin/course/all";
    }

    const onchangeCategory = (event) => {
        const filterCategory = category.filter((item => {
            return event.target.value == item.categoryID
        }))
        setCategoryInfo(event.target.value);
        setCategoryName(filterCategory[0].categoryName);
    }

    console.log(categoryInfo)
    return (
        <div>
            <div className=" text-black min-h-screen border space-y-5 mb-10">
                <div className=" font-bold text-4xl m-7 grid grid-cols-1 place-items-center">ข้อมูลรายวิชา</div>
                <div>
                    <div className='container mx-auto text-black'>
                        <div className=' grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 p-6 '>
                            <div >
                                <p>หมวดวิชา</p>
                                <div className="mb-5 flex justify-center ">
                                    <input
                                        defaultValue={categoryName}
                                        name="categoryName"
                                        className="w-full rounded-md border border-while  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                    />
                                </div>
                                <p>แก้ไขหมวดวิชา</p>
                                <div className="mb-5 flex justify-center ">
                                    <select
                                        onChange={(event) => {
                                            onchangeCategory(event)
                                        }}
                                        type="text"
                                        name='categoryName'
                                        className="w-full rounded-md border border-while bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                    >
                                        <option value={""}>---โปรดระบุหมวดวิชา---</option>
                                        {
                                            category.map((_, index) => (<option key={index} value={_.categoryID}>{_.categoryName}</option>))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div >
                                <p>ชื่อไทย</p>
                                <div className="mb-5 flex justify-center ">
                                    <input
                                        defaultValue={courseNameTH}
                                        onChange={(event) => {
                                            setCourseNameTH(event.target.value)
                                        }}
                                        type="text"
                                        name="courseNameTH"
                                        placeholder="ชื่อไทย"
                                        className="w-full rounded-md border border-while  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                    />
                                </div>
                            </div>

                            <div >
                                <p>ชื่ออังกฤษ</p>
                                <div className="mb-5 flex justify-center ">
                                    <input
                                        defaultValue={courseNameENG}
                                        onChange={(event) => {
                                            setCourseNameENG(event.target.value)
                                        }}
                                        type="text"
                                        name="courseNameENG"
                                        placeholder="ชื่ออังกฤษ"
                                        className="w-full rounded-md border border-while  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                    />
                                </div>
                            </div>

                            <div >
                                <p>รายละเอียดวิชา</p>
                                <div className="mb-5 flex justify-center ">
                                    <input
                                        defaultValue={detail}
                                        onChange={(event) => {
                                            setDetail(event.target.value)
                                        }}
                                        type="text"
                                        name="detail"
                                        placeholder="รายละเอียดวิชา"
                                        className="w-full rounded-md border border-while  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                    />
                                </div>
                            </div>

                            <div >
                                <p>หน่วยกิต</p>
                                <div className="mb-5 flex justify-center ">
                                    <input
                                        defaultValue={creditStudy}
                                        onChange={(event) => {
                                            setCreditStudy(event.target.value)
                                        }}
                                        type="text"
                                        name="creditStudy"
                                        placeholder="หน่วยกิต"
                                        className="w-full rounded-md border border-while  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                    />
                                </div>
                            </div>

                            <div >
                                <p>ชั่วโมงทฤษฎี</p>
                                <div className="mb-5 flex justify-center ">
                                    <input
                                        defaultValue={studyTimeTheory}
                                        onChange={(event) => {
                                            setStudyTimeTheory(event.target.value)
                                        }}
                                        type="text"
                                        name="studyTimeTheory"
                                        placeholder="ชั่วโมงทฤษฎี"
                                        className="w-full rounded-md border border-while  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                    />
                                </div>
                            </div>

                            <div >
                                <p>ชั่วโมงปฏิบัติ</p>
                                <div className="mb-5 flex justify-center ">
                                    <input
                                        defaultValue={studyTimePractice}
                                        onChange={(event) => {
                                            setStudyTimePractice(event.target.value)
                                        }}
                                        type="text"
                                        name="studyTimePractice"
                                        placeholder="ชั่วโมงปฏิบัติ"
                                        className="w-full rounded-md border border-while  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                    />
                                </div>
                            </div>

                            <div >
                                <p>ชั่วโมงศึกษาด้วยตัวเอง</p>
                                <div className="mb-5 flex justify-center ">
                                    <input
                                        defaultValue={studyTimeSelf}
                                        onChange={(event) => {
                                            setStudyTimeSelf(event.target.value)
                                        }}
                                        type="text"
                                        name="studyTimeSelf"
                                        placeholder="ชั่วโมงศึกษาด้วยตัวเอง"
                                        className="w-full rounded-md border border-while  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#423bce] focus:shadow-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' flex flex-row-reverse justify-around'>
                <div className=''>
                    <div className=''>
                        <button onClick={() => checkDataChange(courseID)} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
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
                <div className=''>
                    <div className=''>
                        <button onClick={() => deleteCourse(courseID)} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                                <svg className=' text-white' width="30" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 15.22H14.72M14.72 15.22H27.44M14.72 15.22V2.5M14.72 15.22V27.94" stroke="currentColor" strokeWidth="3.18" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">ลบ</span>
                            <span className="relative invisible">Button Text</span>
                        </button>
                    </div>
                </div>
                <div className=' ml-3'>
                    <button onClick={backToAdminCourseAll} className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                            <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">กลับ</span>
                        <span className="relative invisible">Button Text</span>
                    </button>
                </div>

            </div>

        </div>

    )
}

export default CourseDetail