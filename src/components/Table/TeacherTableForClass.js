import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function TeacherTableForClass() {
    const [teacherTable, setTeacherTable] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = teacherTable ? Math.ceil(teacherTable.length / itemsPerPage) : 0;
    const [searchTerm, setSearchTerm] = useState("");

    const { classID } = useParams();

    useEffect(() => {
        const fetchData = () => {
            axios.get(process.env.REACT_APP_API_URL + "/class", { params: { classID: classID } })
                .then(res => {
                    // console.log(res.data);

                    if (res.data.error === true) {
                        // console.log(res.data);
                        // console.log("ERROR FOUND WHEN GET DATA FROM API");
                        return;
                    }
                    setTeacherTable(res.data.data.teachers)
                })
                .catch(error => {
                    // console.log(error.res);
                });
        }
        fetchData();
    }, [searchTerm]);

    const handleClick = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
    };

    // const deleteTeacher = (userID) => {
    //     Swal.fire({
    //         title: 'ต้องการลบอาจารย์หรือไม่?',
    //         showDenyButton: true,
    //         showCancelButton: true,
    //         confirmButtonText: 'ใช่',
    //         denyButtonText: `ไม่ใช่`,
    //         cancelButtonText: 'ยกเลิก'
    //     })
    //         .then((results) => {
    //             if (results.isConfirmed) {
    //                 axios.delete(process.env.REACT_APP_API_URL + "/class/taugh", { data: { userID, classID } })
    //                     .then((response) => {
    //                         setTeacherTable(
    //                             teacherTable.filter((_) => {
    //                                 return _.userID !== userID;

    //                             })
    //                         )
    //                         Swal.fire('Deleted!', '', 'success')

    //                     }).catch(function (error) {
    //                         if (error.response) {
    //                             console.log(error.response);
    //                         }
    //                     });
    //             }
    //             else if (results.isDenied) {
    //                 window.location.href = "/admin/class/detail/" + classID;
    //             }
    //         })

    // }

    const renderTable = () => {
        if (!teacherTable) {
            return null;
        }
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filterTeacher.slice(start, end).map((_, index) => (
            <tbody key={start + index}>
                <tr className="hover:bg-gray-200 bg-white border-b">
                    <td className="py-4 px-6" >{_.teacherID}</td>
                    <td className="py-4 px-6">{_.nameTH}</td>
                    <td className="py-4 px-6">{_.nameENG}</td>
                    <td className="py-4 px-6">{_.taughtType}</td>
                    {/* <td className="py-4 px-6 flex flex-row">
                        <div className=' ml-3'
                            content="View Admin"
                            color="error"
                            onClick={() => { deleteTeacher(_.userID) }}
                        >
                            <button >
                                <svg width="20" height="20" viewBox="0 0 47 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M39.2592 23.4346V46.2701C39.2592 47.0752 38.6673 47.7277 37.937 47.7277H9.72969C8.99945 47.7277 8.40747 47.0752 8.40747 46.2701V23.4346" stroke="black" strokeWidth="6.54545" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.4258 38.0104V23.4346" stroke="black" strokeWidth="6.54545" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M28.2407 38.0104V23.4346" stroke="black" strokeWidth="6.54545" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M43.6665 13.7172H32.648M32.648 13.7172V5.45759C32.648 4.65259 32.0561 4 31.3258 4H16.3407C15.6105 4 15.0185 4.65259 15.0185 5.45759V13.7172M32.648 13.7172H15.0185M4 13.7172H15.0185" stroke="black" strokeWidth="6.54545" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </td> */}
                </tr>
            </tbody>
        ));
    };

    // const renderPageNumbers = () => {
    //     if (!teacherTable) {
    //         return null;
    //     }
    //     const pageNumbers = [];
    //     for (let i = 1; i <= totalPages; i++) {
    //         pageNumbers.push(
    //             <li
    //                 key={i}
    //                 className={`${currentPage === i ? "bg-orange-500 text-white" : "bg-white text-black"
    //                     } hover:bg-orange-200 inline-block mx-1 px-3 py-1 rounded-lg cursor-pointer`
    //                 }
    //             >
    //                 <a href="#!" onClick={(e) => handleClick(e, i)}>
    //                     {i}
    //                 </a>
    //             </li>
    //         );
    //     }
    //     return pageNumbers;
    // };

    const handlePrevClick = (e) => {
        e.preventDefault();
        handleClick(e, currentPage - 1);
    };

    const handleNextClick = (e) => {
        e.preventDefault();
        handleClick(e, currentPage + 1);
    };

    const renderPageNumbers = () => {
        if (!teacherTable) {
            return null;
        }
        const pageNumbers = [];
        const nextPage = currentPage + 1;
        const prevPage = currentPage - 1;
        const maxPageRange = 3;
        const startPageRange = Math.max(1, currentPage - maxPageRange);
        const endPageRange = Math.min(totalPages, currentPage + maxPageRange);

        pageNumbers.push(
            <li
                href="#!"
                onClick={(e) => handleClick(e, 1)}
                key={"first"}
                className={`bg-white text-black hover:bg-orange-200 inline-block mx-1 px-3 py-1 rounded-lg cursor-pointer`}
            >
                <a href="#!" onClick={(e) => handleClick(e, 1)}>
                    หน้าแรก
                </a>
            </li>
        );

        if (currentPage > 1) {
            pageNumbers.push(
                <li
                    href="#!"
                    onClick={handlePrevClick}
                    key={"prev"}
                    className={`bg-white text-black hover:bg-orange-200 inline-block mx-1 px-3 py-1 rounded-lg cursor-pointer`}
                >
                    <a href="#!" onClick={handlePrevClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
                        </svg>
                    </a>
                </li>
            );
        }

        for (let i = startPageRange; i <= endPageRange; i++) {
            pageNumbers.push(
                <li
                    href="#!"
                    onClick={(e) => handleClick(e, i)}
                    key={i}
                    className={`${currentPage === i ? "bg-orange-500 text-white" : "bg-white text-black"
                        } hover:bg-orange-200 inline-block mx-1 px-3 py-1 rounded-lg cursor-pointer`}
                >
                    <a href="#!" onClick={(e) => handleClick(e, i)}>
                        {i}
                    </a>
                </li>
            );
        }

        if (currentPage < totalPages) {
            pageNumbers.push(
                <li
                    href="#!"
                    onClick={handleNextClick}
                    key={"next"}
                    className={`bg-white text-black hover:bg-orange-200 inline-block mx-1 px-3 py-1 rounded-lg cursor-pointer`}
                >
                    <a href="#!" onClick={handleNextClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                        </svg>
                    </a>
                </li>
            );
        }

        pageNumbers.push(
            <li
                href="#!"
                onClick={(e) => handleClick(e, totalPages)}
                key={"last"}
                className={`bg-white text-black hover:bg-orange-200 inline-block mx-1 px-3 py-1 rounded-lg cursor-pointer`}
            >
                <a href="#!" onClick={(e) => handleClick(e, totalPages)}>
                    หน้าสุดท้าย
                </a>
            </li>
        );

        return pageNumbers;
    };

    const filterTeacher = teacherTable.filter((item) =>
        item.teacherID.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <input
                className=" mb-5 w-full rounded-md border border-black bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                placeholder="ค้นหาอาจารย์...(รหัสอาจารย์)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='relative overflow-x-auto shadow-md  sm:rounded-lg'>
                <table className=" w-full text-sm text-left text-black">
                    <thead className="text-sm text-black uppercase bg-orange-300">
                        <tr  >

                            <th scope="col" className="py-3 px-6" >รหัสอาจารย์</th>
                            <th scope="col" className="py-3 px-6">ชื่อไทย</th>
                            <th scope="col" className="py-3 px-6">ชื่ออังกฤษ</th>
                            <th scope="col" className="py-3 px-6">รูปแบบการสอน</th>
                            {/* <th scope="col" className="py-3 px-6">การกระทำ</th> */}
                        </tr>
                    </thead>
                    {renderTable()}
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <ul className="flex">
                    {renderPageNumbers()}
                </ul>
            </div>
        </>
    )
}

export default TeacherTableForClass