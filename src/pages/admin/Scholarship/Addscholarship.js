import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
function Addscholarship() {
    const [scholarship_name, setscholarship_name] = useState("");
    const [data, setData] = useState([]);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })



    const deletescholarship = (scholarship_id) => {
        axios.delete(process.env.REACT_APP_API_URL + "/student/scholarship", { data: { scholarship_id: scholarship_id } })
            .then((response) => {
                setData(
                    data.filter((_) => {
                        return _.scholarship_id !== scholarship_id;
                    })
                )
                

                Toast.fire({
                    icon: 'success',
                    title: 'Delete scholarship success'
                })


            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            });
    }

    const fetchData = () => {
        axios.get(process.env.REACT_APP_API_URL + "/student/scholarship")
            .then(res => {
                // const persons = res.data;
                //this.setState({ persons });
                console.log(res.data);

                if (res.data.error === true) {
                    console.log(res.data)
                    console.log("ERROR FOUND WHEN GET DATA FROM API ");


                    return;
                }
                setData(res.data.data);

            });
    }

    const Addscholarship = () => {
        axios.post(process.env.REACT_APP_API_URL + "/student/scholarship", {

            scholarship_name: scholarship_name

        }).then(() => {
            setData([
                ...data,
                {
                    scholarship_name: scholarship_name
                }
            ])
        })
        window.location.href = '/admin/scholarship/add';
    }

    const BacktoCourse = () => {
        window.location.href = '/admin/home';
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='bg-white min-h-screen'>
            <h1 className='mt-3 ml-3 text-4xl'>ทุนการศึกษา</h1>
            <div className='container mx-auto'>
                <div className=' grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 p-6 '>
                    <div class="mb-5 flex justify-center ">
                        <input
                            onChange={(event) => {
                                setscholarship_name(event.target.value)
                            }}
                            type="text"
                            name="scholarship_name"
                            placeholder="ชื่อทุน"
                            class=" px-10 rounded-md border border-while bg-gray-100 py-3  text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                        />
                    </div>
                    <div className='mb-5 flex justify-center '>
                        <button onClick={Addscholarship} class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-orange-300 rounded-full shadow-md group">
                            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full  bg-orange-300 group-hover:translate-x-0 ease">
                                <svg className=' text-white' width="30" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 15.22H14.72M14.72 15.22H27.44M14.72 15.22V2.5M14.72 15.22V27.94" stroke="currentColor" stroke-width="3.18" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <span class="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">เพิ่มทุน</span>
                            <span class="relative invisible">Button Text</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className=" grid grid-cols-1 place-items-center">
                <div className=" text-black block bg-gray-200 w-2/3 p-auto rounded-2xl">
                    <div className=' relative overflow-x-auto shadow-md sm:rounded-lg'>
                        <table className=" w-full text-sm text-left text-black">
                            <thead className="text-sm text-black uppercase  bg-orange-300">
                                <tr  >
                                    <th scope="col" className="py-3 px-6" >ลำดับ</th>
                                    <th scope="col" className="py-3 px-6">ชื่อทุน</th>
                                    <th scope="col" className="py-3 px-6">การกระทำ</th>
                                </tr>
                            </thead>
                            {data.map((_, index) => (
                                <tbody>
                                    <tr className="  hover:bg-gray-200 bg-white border-b"
                                    >
                                        <td className="py-4 px-6" >{index + 1}</td>
                                        <td className="py-4 px-6">{_.scholarship_name}</td>
                                        <td className='py-4 px-6 flex flex-row'>
                                            <div className=''
                                                content="Delete professor"
                                                color="error"
                                                onClick={() => { deletescholarship(_.scholarship_id) }}>
                                                <svg width="20" height="20" viewBox="0 0 47 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M39.2592 23.4346V46.2701C39.2592 47.0752 38.6673 47.7277 37.937 47.7277H9.72969C8.99945 47.7277 8.40747 47.0752 8.40747 46.2701V23.4346" stroke="black" stroke-width="6.54545" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M19.4258 38.0104V23.4346" stroke="black" stroke-width="6.54545" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M28.2407 38.0104V23.4346" stroke="black" stroke-width="6.54545" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M43.6665 13.7172H32.648M32.648 13.7172V5.45759C32.648 4.65259 32.0561 4 31.3258 4H16.3407C15.6105 4 15.0185 4.65259 15.0185 5.45759V13.7172M32.648 13.7172H15.0185M4 13.7172H15.0185" stroke="black" stroke-width="6.54545" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            ))}


                        </table>
                    </div>
                </div>
            </div>
            <div className='  grid grid-cols-2 '>
                <div className=' ml-3'>
                    <button onClick={BacktoCourse} class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-orange-300 rounded-full shadow-md group">
                        <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full  bg-orange-300 group-hover:translate-x-0 ease">
                            <svg class="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span class="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">กลับ</span>
                        <span class="relative invisible">Button Text</span>
                    </button>
                </div>

            </div>
        </div>
    )
}
export default Addscholarship