import React, { useState } from 'react'
import Login from '../login';

type Props = {}

const Register = (props: Props) => {
  const [isLoginToggled, setIsLoginToggled] = useState<boolean>(false);
  const [isRegisterToggled, setIsRegisterToggled] = useState<boolean>(false);

  const handleLoginClick = () => {
    if(isRegisterToggled){
      setIsLoginToggled(!isLoginToggled);
      setIsRegisterToggled(!isRegisterToggled);
    }
    else {
      setIsLoginToggled(!isLoginToggled);
    }
    
  }
  const handleRegisterClick = () => {
    if(isLoginToggled){
      setIsLoginToggled(!isLoginToggled);
      setIsRegisterToggled(!isRegisterToggled);
    }
    else {
      setIsRegisterToggled(!isRegisterToggled);
    }
    
  }

  return (
    <div className='h-full pt-[10%] mx-[10%]'>
    <h1 className='basis-3/5 font-montserrat text-3xl text-black pb-4 text-center' >Hi</h1>
    <p className='text-center pb-5'>Here you can login, register or delete your user</p>
      <div className='flex gap-4 justify-center'>
      <button className='border border-blue-600 bg-blue-600 text-white rounded-md px-3 py-1'
      onClick={handleLoginClick }
      >Login</button>
      <button className='border border-emerald-600 bg-emerald-600 text-white rounded-md px-3 py-1'
      onClick={handleRegisterClick}
      >Register</button>
      </div>
      <div>
        {isLoginToggled && (<Login></Login>) }
      </div>
      <div>
        {isRegisterToggled && (<h1>Register</h1>) }
      </div>
    </div>
  )
}

export default Register