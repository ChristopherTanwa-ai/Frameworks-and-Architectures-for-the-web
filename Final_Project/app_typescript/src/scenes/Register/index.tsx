import React, { useState } from 'react'
import Login from '../login';
import Registerbtn from '../login/registerbtn';



type Props = {
  isLoggedIn: boolean; // Add the isLoggedIn prop
  handleLogin: any;
  handleLogout:any;
  username: string;
};

const Register = ({isLoggedIn, handleLogin, handleLogout, username}: Props) => {
  const [isLoginToggled, setIsLoginToggled] = useState<boolean>(true);
  const [isRegisterToggled, setIsRegisterToggled] = useState<boolean>(false);


  const handleLoginClick = () => {  
    
    if (isRegisterToggled) {
      setIsLoginToggled(!isLoginToggled);
      setIsRegisterToggled(!isRegisterToggled);
    } else {
      setIsLoginToggled(!isLoginToggled);
    }
  };
  
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
    <h1 className='basis-3/5 font-montserrat text-3xl text-black pb-4 text-center' >Hi {username}</h1>
    <p className='text-center pb-5'>Here you can login, register or delete your user</p>
      <div className='flex gap-4 justify-center'>
      {!isLoggedIn ? (
          <button
            className="rounded-md text-white bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
            onClick={handleLoginClick}
          >
            Login
          </button>
        ) : (
          <button
            className="rounded-md text-white bg-red-700 px-10 py-2 hover:bg-red-500 hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      <button className='rounded-md text-white bg-emerald-700 px-10 py-2 hover:bg-emerald-500 hover:text-white'
      onClick={handleRegisterClick}
      >Register</button>
      </div>
      <div>
        {isLoginToggled && (<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin}></Login>) }
      </div>
      <div>
        {isRegisterToggled && (<Registerbtn isLoggedIn={isLoggedIn} handleLogin={handleLogin}></Registerbtn>) }
      </div>
    </div>
  )
}

export default Register