import React from 'react'

function DropDown() {
    return (
        <div className=' mr-3 '>
            <div className="dropdown  dropdown-bottom dropdown-end">
                <label tabIndex={0} className=" btn m-1  bg-orange-300 text-black hover:bg-gray-500">เพิ่มผู้ใช้งาน</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a href='/NA/admin/add/student'>นิสิต</a></li>
                    <li><a href='/NA/admin/add/teacher'>อาจารย์</a></li>
                    <li><a href='/NA/admin/add/admin'>ผู้ดูแลระบบ</a></li>
                </ul>
            </div>
        </div>

    )
}

export default DropDown