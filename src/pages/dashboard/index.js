"use client";
import React, { useEffect, useState } from 'react'
import { Inter, Lato, Montserrat, Poppins, Open_Sans, Figtree } from 'next/font/google'
import { BsTags, BsPersonCircle, BsWhatsapp, BsInstagram } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5"
import { AiOutlinePieChart, AiOutlineLike, AiOutlineMail, AiOutlineClose, AiOutlinePlus, AiOutlineYoutube} from "react-icons/ai"
import { TbCalendarTime, TbCashBanknote } from "react-icons/tb"
import { FaRegBell } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { GoSearch } from "react-icons/go";
import Card from '@/components/card';
import IconData from '@/components/iconData';
import Chart from '@/components/chart';
import PieChart from '@/components/pieChart';
import Modal from '@/components/modal';
import { useSession } from 'next-auth/react';
import { useRouter, useNavigate } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import ProfileCreator from '@/components/profileCreator';

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['700'] })
const monte = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const osans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const fig = Figtree({ subsets: ['latin'], weight: ['400', '600'] })

const cardData = [
    {
        icon: <TbCashBanknote />,
        iconColor: "bg-iconGreen",
        heading: "Total Revenues",
        value: "$2,129,430",
        percent: "2.5%",
        sign: "pos",
    },
    {
        icon: <BsTags />,
        iconColor: "bg-iconYellow",
        heading: "Total Transactions",
        value: "1,520",
        percent: "1.5%",
        sign: "pos",
    },
    {
        icon: <AiOutlineLike />,
        iconColor: "bg-iconPeach",
        heading: "Total Likes",
        value: "9821",
        percent: "2.8%",
        sign: "pos",
    },
    {
        icon: <FiUsers />,
        iconColor: "bg-iconViolet",
        heading: "Total Users",
        value: "10,192",
        percent: "0.5%",
        sign: "pos",
    },
]



const Dashboard = () => {

    const { data, status } = useSession();


    if (status === "authenticated") {
        return (
            <main className={`flex h-screen items-center justify-between px-12 py-16 m-0 ${inter.className} relative`}>
                <aside className={`h-full rounded-3xl flex-[0.2] px-8 py-8 hidden lg:flex flex-col justify-between items-start text-white blue-gradient`}>
                    <Link href="/" className={` hidden lg:block w-full h-min text-4xl mt-4 leading-relaxed font-bold ${monte.className}` }>Board.</Link>
                    <div className={`flex-1 flex flex-col justify-start mt-8 gap-8 ${monte.className}`}>
                        <div className={`w-full text-white font-semibold text-lg flex justify-start items-center gap-4`}>
                            <AiOutlinePieChart />
                            Dashboard
                        </div>
                        <div className={`w-full text-white/70 text-lg flex justify-start items-center gap-4`}>
                            <BsTags />
                            Transactions
                        </div>
                        <div className={`w-full text-white/70 text-lg flex justify-start items-center gap-4`}>
                            <TbCalendarTime />
                            Schedules
                        </div>
                        <div className={`w-full text-white/70 text-lg flex justify-start items-center gap-4`}>
                            <BsPersonCircle />
                            Users
                        </div>
                        <div className={`w-full text-white/70 text-lg flex justify-start items-center gap-4`}>
                            <IoSettingsOutline />
                            Settings
                        </div>

                    </div>
                    <div className={`flex flex-col justify-start mt-8 gap-6 ${monte.className}`}>
                        <div className={`w-full text-white/70 text-sm flex justify-start items-center gap-4`}>
                            Help
                        </div>
                        <div className={`w-full text-white/70 text-sm flex justify-start items-center gap-4`}>
                            Contact Us
                        </div>

                    </div>
                </aside>
                <section className={`flex-1 h-full py-0 px-8 text-black flex flex-col justify-between`}>
                    <div className={`w-full flex justify-between items-center py-0`}>
                        <div className={`flex-1 text-2xl font-bold ${monte.className}`}>
                            Dashboard
                        </div>
                        <div className={`max-w-[200px] flex-[0.4] bg-white p-2 flex justify-between items-center text-sm text-lightgrey ${lato.className}`}>
                            Search
                            <GoSearch />
                        </div>
                        <FaRegBell className='mx-4' />
                        <div className={`h-8 aspect-square rounded-full object-contain bg-amber-300 overflow-hidden`}>
                            <img src={data?.user?.image} alt="profile" onError={(e)=> {
                                e.currentTarget.src= "https://avatars.dicebear.com/api/bottts/stefan.svg"
                            }} className='h-full' />
                        </div>
                    </div>
                    <div className={`grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 grid-flow-row items-center py-0 `}>
                        {
                            cardData.map((value, index) => <Card child={<IconData {...value} />} />)
                        }
                    </div>
                    <Card child={<Chart monte={monte} lato={lato} />} />
                    <div className={`grid grid-cols-2 gap-x-6 gap-y-4 grid-flow-row items-center py-0 `}>
                        <Card child={<PieChart monte={monte} lato={lato} />} />
                        <Card child={<ProfileCreator />} />
                    </div>
                </section>
            </main>
        )
    }
    return <div className={`flex flex-col h-screen w-screen items-center justify-center px-12 py-16 m-0 ${monte.className} gap-20 relative`} role="status">
        <svg aria-hidden="true" className="inline w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="text-3xl">Checking user...</span>
    </div>
}

export default Dashboard