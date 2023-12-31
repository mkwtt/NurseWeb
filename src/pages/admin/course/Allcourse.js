import React, { useEffect, useState } from 'react'
import Addcoursebutton2 from '../../../components/Button/Addcoursebutton2'
import Allcoursetable from '../../../components/Table/Allcoursetable'
import Addcategorybuton from '../../../components/Button/Addcategorybuton'
import Categorytable from '../../../components/Table/Categorytable'
import LoadingPage from '../../LoadingPage'

function Allcourse() {

  const [loading, setLoading] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);

      setTimeout(() => {
        setCompleted(true);
      }, 1000);
    }, 2000);
  }, [])

  return (
    <>
      {!completed ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className=' bg-white min-h-screen'>
          {/* <h1 className=' text-black text-center text-4xl mb-3'>COURSE</h1> */}
          <h1 className=' text-black text-center text-4xl mb-3'>จัดการรายวิชา</h1>

          <div className='flex flex-row-reverse'>
            <div className=' mr-3 '>
              <Addcoursebutton2 />
            </div>
            <div className=' mr-3 '>
              <Addcategorybuton />
            </div>
          </div>
          <div className='mt-3'>
            {/* <Categorytable></Categorytable> */}
            <Allcoursetable></Allcoursetable>
          </div>
        </div>
      )}
    </>
  )
}

export default Allcourse