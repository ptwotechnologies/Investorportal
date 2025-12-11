import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import loginLogo from "/ArtesterLogo2.png"
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from 'react-router-dom'

const Mobile = () => {

  
  const [showSignoutDialog, setShowSignoutDialog] = useState(false);

  const handleSignOutClick = () => {
    setShowSignoutDialog(true);
  };

  const handleConfirmSignOut = () => {
    setShowSignoutDialog(false);
    alert("Signed out!"); 
  };

  return (
    <div className=''>
      <div className='flex items-center justify-between bg-white p-2 py-3'>
        <div>
          <img src={loginLogo} alt="logo" className='w-30' />
        </div>

        <div>
          <Sheet>
            <SheetTrigger asChild>
              <GiHamburgerMenu size={30} className="text-[#001426]" />
            </SheetTrigger>

            <SheetContent className="w-screen h-fit rounded-2xl mt-17">
              <div className='border border-[#D9D9D9] rounded-2xl'>

                <SheetHeader>
                  <SheetTitle></SheetTitle>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 text-[#001032] text-xl px-7">

                  <div id='top'>
                    <ul className='flex flex-col gap-2'>
                      <Link to="/profile"><li>Profile</li></Link>
                      <Link to="/request"><li>Requests</li></Link>
                      <Link to="/connect"><li>Connect</li></Link>
                      <Link to="/notification"><li>Notification</li></Link>
                    </ul>
                  </div>

                  <div id='bottom' className='mt-10 mb-6'>
                    <ul className='flex flex-col gap-2'>
                      <Link to="/settings"><li>Settings</li></Link>
                      <Link to="/help"><li>Help</li></Link>
                    </ul>
                  </div>

                </div>

                <SheetFooter>
                 
                  <Button
                    type="button"
                    className="bg-[#001032]"
                    onClick={handleSignOutClick}
                  >
                    Sign out
                  </Button>

                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>

              </div>

             
              {showSignoutDialog && (
                <div className="absolute bottom-40  left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-300 shadow-lg rounded-md w-50 flex flex-col items-center text-sm text-[#001426] p-2">
                  <button
                    onClick={handleConfirmSignOut}
                    className="w-full py-2 border-b border-gray-200 hover:bg-gray-100 text-[#001032]"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowSignoutDialog(false)}
                    className="w-full py-2 hover:bg-gray-100 text-[#001032]"
                  >
                    No
                  </button>
                </div>
              )}

            </SheetContent>
          </Sheet>
        </div>

      </div>
    </div>
  )
}

export default Mobile;
