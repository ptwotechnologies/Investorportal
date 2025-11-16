import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { MdPhone, MdLanguage, MdEmail, MdWork } from "react-icons/md";
import { motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SwitchCom from "./SwitchCom";
import { IoIosCall } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";

const AdminSec4 = () => {

  const users = Array(12).fill({
    name: "Angela Moss",
    company: "Highspeed Studios",
    phone: "+91 8766270884",
    website: "www.artestor.com",
    email: "info@artestor.com",
    role: "Founder, CEO",
  });

  
  return (
   <div>
    <div>
      <Header/>
    </div>
      <div className="bg-gray-200 pt-36 p-7 flex gap-8">
       <div>
        <Sidebar/>
       </div>

       <div className=" grid grid-cols-4 gap-3 pl-52 " >
        {users.map((users, index)=>(
          <motion.div key={index} initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }} className='bg-white p-3 px-5 rounded-lg'>
              <div className='flex items-center gap-10'>
                <div className='bg-[#C4C4C4] h-16 w-16 rounded-full' />
                <div className='text-end '>
                 <div className="ml-19">
                   <SwitchCom />
                 </div>
                  <h1 className='text-md text-[#001426] font-bold'>{users.name}</h1>
                  <h2 className='text-sm'>{users.company}</h2>
                </div>
              </div>

              <div className='flex gap-3'>
                <div className='bg-[#001426] w-fit p-1 rounded-md mt-5'>
                  <div className='bg-[#F6EEFF] w-7 h-7 rounded-sm flex items-center justify-center my-2'>
                    <IoIosCall size={15} />
                  </div>
                  <div className='bg-[#F6EEFF] w-7 h-7 rounded-sm flex items-center justify-center my-2'>
                    <MdEmail size={15} />
                  </div>
                  <div className='bg-[#F6EEFF] w-7 h-7 rounded-sm flex items-center justify-center my-2'>
                    <MdEmail size={15} />
                  </div>
                  <div className='bg-[#F6EEFF] w-7 h-7 rounded-sm flex items-center justify-center my-2'>
                    <IoIosCall size={15} />
                  </div>
                </div>

                <div className='p-1 rounded-md mt-5 text-sm font-medium'>
                  <div className='flex items-start justify-start mt-3 mb-4'>
                    <p>{users.phone}</p>
                  </div>
                  <div className='flex items-start justify-start mt-3 mb-4'>
                    <p>{users.website}</p>
                  </div>
                  <div className='flex items-start justify-start mt-3 mb-4'>
                    <p>{users.email}</p>
                  </div>
                  <div className='flex items-start justify-start mt-3 mb-4'>
                    <p>{users.role}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className='bg-[#335559] ml-auto w-fit p-2 rounded-full text-white'>
                  <IoArrowForward size={20} />
                </div>
              </div>
            </motion.div>

        ))}
             
       </div>

    </div>
   </div>
  )
}

export default AdminSec4
