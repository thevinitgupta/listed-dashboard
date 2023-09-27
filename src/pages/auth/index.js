"use client";
import React, { useEffect, useState } from 'react'
import { Inter, Montserrat, Poppins } from 'next/font/google'
import {BsGithub, BsLinkedin} from "react-icons/bs";
import {FaSquareXTwitter} from "react-icons/fa6";
import {IoLogoDiscord} from "react-icons/io5";
import Signup from '@/components/signup';
import Signin from '@/components/signin';
import { useRouter } from 'next/router';

const inter = Inter({subsets : ['latin']})
const poppins = Poppins({subsets : ['latin'], weight: ['700']})
const monte = Montserrat({subsets : ['latin'], weight: ['700']})

const Auth = () => {
    const [tab,setTab] = useState("signin");

    const router = useRouter();
    console.log(router.query);


    useEffect(()=>{
        if(router.query?.page==="signin"){
            setTab("signin");
        }
        else {
            setTab("signup");
        }
    },[tab, router])

  return (
    <main className={`flex min-h-screen items-center justify-between p-0 m-0 ${inter.className} relative`}>
        <div className={`h-screen w-full hidden lg:flex lg:flex-[0.55] blue-gradient trapezoid flex-col justify-between px-14 py-10 text-white absolute z-0 lg:relative`}>
            <div className={`w-full h-min text-2xl font-bold space-x-1.5 ${poppins.className}`}>
                LOGO
            </div>
            <div className={` hidden lg:block w-full h-min text-center text-4xl lg:text-7xl leading-relaxed ${monte.className}`}>Board.</div>
            <div className={`w-full flex items-center justify-center gap-5 lg:gap-14 text-xl lg:text-5xl`}>
                <BsGithub/>
                <FaSquareXTwitter/>
                <BsLinkedin/>
                <IoLogoDiscord/> 
            </div>
        </div>
        <div className={`h-screen w-full bg-transparent lg:flex-[0.45] flex flex-col items-center lg:items-start justify-center gap-5 px-14 py-10 text-black relative z-5`}>
        <div className={`lg:hidden w-full h-min text-2xl text-link font-bold space-x-1.5 ${poppins.className}`}>
                LOGO
            </div>
            {
                tab==="signup" ?
                <Signup /> : <Signin/>
            }
            
        </div>
    </main>
  )
}

export default Auth