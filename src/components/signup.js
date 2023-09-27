import React, {useState} from 'react'
import { Inter, Lato, Montserrat, Poppins } from 'next/font/google'
import {BsApple, BsGoogle, BsGithub, BsLinkedin} from "react-icons/bs"
import {FaSquareXTwitter} from "react-icons/fa6";
import {IoLogoDiscord} from "react-icons/io5";
import Link from 'next/link'
import { useRouter } from 'next/router'

const inter = Inter({subsets : ['latin']})
const poppins = Poppins({subsets : ['latin'], weight: ['700']})
const monte = Montserrat({subsets : ['latin'], weight: ['400','700']})
const lato = Lato({subsets : ['latin'], weight: ['400']})

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleUpdate = (e) => {
        if (e.target.name === "email") setEmail(e.target.value);
        else if (e.target.name === "password") {
          setPassword(e.target.value);
        }
      };
  return (
    <section className={`w-full flex flex-col justify-center gap-[6px]`}>
        <h1 className={`text-4xl font-bold my-0 ${monte.className}`}>Sign Up</h1>
        <h3 className={`text-lg font-normal my-0 ${lato.className}`}>Create your account</h3>
        <div className={`w-full flex items-center justify-start mt-6 gap-4 text-gray-400`}>
            <div className={`bg-white px-7 py-2 text-xs rounded-md ${monte.className} flex items-center gap-2`}>
                <BsGoogle/>
                Sign up with Google
            </div>
            <div className={`bg-white px-7 py-2 text-xs rounded-md ${monte.className} flex items-center gap-2`}>
                <BsApple/>
                Sign up with Apple
            </div>
        </div>
        <form className={`w-full max-w-[450px] my-4 bg-white px-10 py-8 rounded-[20px] ${lato.className}`}>
        <div
        aria-label="email"
        className={`w-full flex flex-col my-4 items-start justify-between text-base gap-2`}
      >
        <label htmlFor="email" className="">
          Email Address
        </label>{" "}
        <input
          className={`w-full border-0 rounded-[10px] px-2 py-3 bg-[#f5f5f5] outline-none my-2`}
          type="email"
          placeholder="johndoe@gmail.com"
          name="email"
          value={email}
          onChange={handleUpdate}
        />
      </div>
      <div
        aria-label="password"
        className={`w-full flex flex-col my-4 items-start justify-between text-base gap-2`}
      >
        <label htmlFor="password" className="">
          Password{" "}
        </label>{" "}
        <input
          className={`w-full border-0 rounded-[10px] px-2 py-3 bg-[#f5f5f5] outline-none my-2`}
          type="password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={handleUpdate}
        />
      </div>
      
        <button type='submit' className={`w-full text-center py-[10px] bg-primary text-base font-bold text-white rounded-lg hover:bg-primarydark ${monte.className}`}>Sign Up</button>
        </form>
        <div className={`w-full max-w-[450px] py-4 text-base text-center text-grey ${lato.className}`}>{`Don’t have an account? `}
        <span onClick={()=>{
            router.replace("/auth?page=signin")
        }} className={`text-link cursor-pointer`}>
        Login here
        </span> 
        </div>
        <div className={`w-full max-w-[450px] flex lg:hidden text-link/70 items-center justify-center gap-5 lg:gap-14 text-2xl lg:text-5xl`}>
                <BsGithub/>
                <FaSquareXTwitter className={`text-3xl`}/>
                <BsLinkedin/>
                <IoLogoDiscord className={`text-3xl`}/> 
            </div>
    </section>
  )
}

export default Signup