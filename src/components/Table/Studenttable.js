import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import StudentDetail from '../../pages/admin/student/StudentDetail';
import Swal from 'sweetalert2';

function Studenttable() {

  const [studentlist, setStudentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = studentlist ? Math.ceil(studentlist.length / itemsPerPage) : 0;
  const [searchTerm, setSearchTerm] = useState("");

  console.log(process.env.REACT_APP_API_URL + "/student/list");

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


  console.log(process.env.REACT_APP_API_URL + "/student");



  const GotoStudentDetail = (userID) => {
    window.location = '/admin/student/detail/' + userID;
  }

  useEffect(() => {
    const fetchData = () => {

      axios.get(process.env.REACT_APP_API_URL + "/student/list")
        .then(res => {
          // const persons = res.data;
          //this.setState({ persons });
          console.log(res.data);

          if (res.data.error === true) {
            console.log(res.data)
            console.log("ERROR FOUND WHEN GET DATA FROM API ");


            return;
          }
          setStudentList(res.data.data);

        });
    }
    fetchData();
  }, [searchTerm]);

  const handleClick = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const renderTable = () => {
    if (!studentlist) {
      return null;
    }
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filterStudent.slice(start, end).map((_, index) => (
      <tbody key={start + index}>
        <tr className="hover:bg-gray-200 bg-white border-b">
          <td className="py-4 px-6" >{index + 1}</td>
          <td className="py-4 px-6">{_.studentID}</td>
          <td className="py-4 px-6">{_.nameTH}</td>
          <td className="py-4 px-6 flex flex-row">
            <div className=' ml-3'
              content="View student"
              color="error"
              onClick={() => console.log("View student", _.userID)}>
              <button onClick={() => GotoStudentDetail(_.userID)}>
                <svg width="20" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.0572 0.5C4.86 0.5 0 10.22 0 10.22C0 10.22 4.86 19.94 13.0572 19.94C21.06 19.94 25.92 10.22 25.92 10.22C25.92 10.22 21.06 0.5 13.0572 0.5ZM12.96 3.74C16.5564 3.74 19.44 6.656 19.44 10.22C19.44 13.8164 16.5564 16.7 12.96 16.7C9.396 16.7 6.48 13.8164 6.48 10.22C6.48 6.656 9.396 3.74 12.96 3.74ZM12.96 6.98C11.178 6.98 9.72 8.438 9.72 10.22C9.72 12.002 11.178 13.46 12.96 13.46C14.742 13.46 16.2 12.002 16.2 10.22C16.2 9.896 16.0704 9.6044 16.0056 9.3128C15.7464 9.8312 15.228 10.22 14.58 10.22C13.6728 10.22 12.96 9.5072 12.96 8.6C12.96 7.952 13.3488 7.4336 13.8672 7.1744C13.5756 7.0772 13.284 6.98 12.96 6.98Z" fill="black" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    ));
  };

  const renderPageNumbers = () => {
    if (!studentlist) {
      return null;
    }
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`${currentPage === i ? "bg-orange-500 text-white" : "bg-white text-black"
            } hover:bg-orange-200 inline-block mx-1 px-3 py-1 rounded-lg cursor-pointer`
          }
        >
          <a href="#!" onClick={(e) => handleClick(e, i)}>
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  const filterStudent = studentlist.filter((item) =>
    item.studentID.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <input
        className=" mb-5 w-full rounded-md border border-black bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
        placeholder="ค้นหานิสิต...(รหัสนิสิต)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <Routes>
          <Route path='/admin/student/detail/:userID' element={<StudentDetail />} />
        </Routes>

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className=" w-full text-sm text-left text-black ">
          <thead className=" text-sm text-black uppercase bg-orange-300">
            <tr  >
              <th scope="col" className="py-3 px-6" >ลำดับ</th>
              <th scope="col" className="py-3 px-6">รหัสนิสิต</th>
              <th scope="col" className="py-3 px-6">ชื่อไทย</th>
              <th scope="col" className="py-3 px-6">การกระทำ</th>
            </tr>
          </thead>
          {renderTable()}
        </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <ul className="flex">
          {renderPageNumbers()}
        </ul>
      </div>
    </>
  )
}

export default Studenttable