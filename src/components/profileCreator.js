import React, { useEffect, useState } from 'react'
import { Inter, Lato, Montserrat, Poppins, Open_Sans, Figtree } from 'next/font/google'
import { BsWhatsapp, BsInstagram } from "react-icons/bs";
import {  AiOutlineMail, AiOutlineClose, AiOutlinePlus, AiOutlineYoutube} from "react-icons/ai"

import Modal from '@/components/modal';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const monte = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })
const fig = Figtree({ subsets: ['latin'], weight: ['400', '600'] })

const ProfileCreator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalTab, setModalTab] = useState("basic");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [insta, setInsta] = useState("");
    const [yout, setYout] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null)
    const {data} = useSession();
    const handleUpdate = (e) => {
        if (e.target.name === "name") setName(e.target.value);
        if (e.target.name === "email") setEmail(e.target.value);
        if (e.target.name === "insta") setInsta(e.target.value);
        if (e.target.name === "yout") setYout(e.target.value);
        else if (e.target.name === "phone") {
            setPhone(e.target.value);
        }
    };

    const addUserData = async () => {
        try {
            setIsLoading(true);
            const currentData = await axios.post("/api/user/add",{
                userEmail : data?.user?.email,
                name,
                email,
                phone,
                yout,
                insta
            });
            if(currentData?.status && currentData.status===500) throw new Error(currentData.json.error);
            setIsLoading(false);
            getCardData();
            setIsOpen(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    const handleForm = (e, direction = "next") => {
        e.preventDefault();
        if (direction === "prev") {
            setModalTab("basic");
        }
        else if (modalTab === "basic") {
            if (!name || !email || !phone) {
                return alert("Required Fields Empty");
            }
            setModalTab("social")
        }
        else {
            addUserData();
        }
    }

    const getCardData = async () =>{
        try {
            const currentData = await axios.post("/api/user/get",{
                email : data.user.email
            });
            console.log(currentData.data.data)
            if(currentData?.status && currentData.status===500) throw new Error(currentData.error);

            if(currentData.data && Object.keys(currentData.data.data).length!==0)
            setUserData({
                ...currentData.data.data
            });

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCardData();
    },[])

    return (
        <div className={`h-[180px] px-5 py-8 w-full flex flex-col items-center justify-center gap-5`}>
            {
                userData!==null ?
                <>
                <div className={`w-full text-2xl font-semibold ${fig.className}`}>
                    {userData.name}
                </div>
                <div className={`w-full grid grid-cols-2 gap-x-2 gap-y-4 grid-rows-2 text-sm font-normal ${fig.className}`}>
                    <div className='flex items-center justify-start gap-2'>
                        <BsWhatsapp className={`text-green-500 text-lg p-1 rounded-full bg-green-300/10`}/>
                        <span className={`underline  text-xs`}>
                            {`+91 ${userData.phone}`}
                        </span>
                    </div>
                    {
                        userData?.instagram_link && 
                        <div className='flex items-center justify-start gap-2'>
                        <BsInstagram className={`text-pink-500 text-lg p-1 rounded-full bg-pink-300/10`}/>
                        <span className={`underline  text-xs`}>
                            {userData.instagram_link}
                        </span>
                    </div>
                    }
                    <div className=' flex items-center justify-start gap-2'>
                        <AiOutlineMail className={`text-violet-500 text-lg p-1 rounded-full bg-violet-300/10`}/>
                        <span className={`underline  text-xs`}>
                            {`${userData.email}`}
                        </span>
                    </div>
                    
                    {
                        userData?.youtube_link && 
                        <div className='flex items-center justify-start gap-2'>
                        <AiOutlineYoutube className={`text-red-500 text-lg p-1 rounded-full bg-red-300/10`}/>
                        <span className={`underline text-xs`}>
                            {`${userData.youtube_link}`}
                        </span>
                    </div>
                    }
                </div>

                </>
                 : 
                <>
                <div className='bg-gray-300 rounded-full text-gray-400 p-4 text-5xl cursor-pointer' onClick={() => setIsOpen(true)}>
                <AiOutlinePlus />
            </div>
            <div className=' text-gray-400 p-4 text-lg cursor-pointer'>
                Add Profile
            </div>
                </>
            }


            <Modal open={isOpen} fig={fig} onClose={() => setIsOpen(false)}>
                <div className={`w-full flex justify-between py-4 px-6 text-xl font-semibold border-b border-zinc-400/40 ${fig.className}`}>
                    Add New Profile
                    <AiOutlineClose onClick={() => setIsOpen(false)} className='text-gray-400 cursor-pointer' />
                </div>
                <div className={`flex w-full justify-between items-center`}>
                    <div className={`flex-[0.45] my-2 flex flex-col items-center text-base text-black/80 ${fig.className}`} onClick={() => {
                        setModalTab("basic");
                    }}>
                        <div className={`mb-3 font-semibold`}>
                            Basic
                        </div>
                        <div className={`w-[80%] h-1 rounded-full ${modalTab === "basic" ? "bg-primary" : "bg-gray-300"}`}></div>
                    </div>
                    <div className={`flex-[0.45] my-2 flex flex-col items-center text-base text-black/80 ${fig.className}`} onClick={() => {
                        setModalTab("social")
                    }}>
                        <div className={`mb-3 font-semibold`}>
                            Social
                        </div>
                        <div className={`w-[80%] h-1 rounded-full ${modalTab === "social" ? "bg-primary" : "bg-gray-300"}`}></div>
                    </div>
                </div>
                {
                    isLoading ?
                        <div className={`flex flex-col h-full w-full items-center justify-center px-12 py-16 m-0 ${monte.className} gap-20 relative`} role="status">
                            <svg aria-hidden="true" className="inline w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="text-3xl">Checking user...</span>
                        </div>
                        :
                        <form className={`flex-1 flex flex-col items-center w-full relative`}>
                            {
                                modalTab === "basic" ?
                                    <>
                                        <div
                                            aria-label="email"
                                            className={`w-4/5 flex flex-col my-4 items-start justify-between text-base gap-2`}
                                        >
                                            <label htmlFor="name" className="">
                                                Enter Name *
                                            </label>{" "}
                                            <input
                                                className={`w-full border-0 rounded-[10px] px-2 py-3 bg-[#f5f5f5] outline-none my-2`}
                                                type="text"
                                                placeholder="Eg. John Doe"
                                                name="name"
                                                value={name}
                                                onChange={handleUpdate}
                                            />
                                        </div>
                                        <div
                                            aria-label="email"
                                            className={`w-4/5 flex flex-col my-4 items-start justify-between text-base gap-2`}
                                        >
                                            <label htmlFor="email" className="">
                                                Enter Email *
                                            </label>{" "}
                                            <input
                                                className={`w-full border-0 rounded-[10px] px-2 py-3 bg-[#f5f5f5] outline-none my-2`}
                                                type="email"
                                                placeholder="Eg. johndoe@gmail.com"
                                                name="email"
                                                value={email}
                                                onChange={handleUpdate}
                                            />
                                        </div>
                                        <div
                                            aria-label="password"
                                            className={`w-4/5 flex flex-col my-4 items-start justify-between text-base gap-2`}
                                        >
                                            <label htmlFor="phone" className="">
                                                Enter Phone *
                                            </label>{" "}
                                            <input
                                                className={`w-full border-0 rounded-[10px] px-2 py-3 bg-[#f5f5f5] outline-none my-2`}
                                                type="tel"
                                                placeholder="Enter your password"
                                                name="phone"
                                                value={phone}
                                                onChange={handleUpdate}
                                            />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div
                                            aria-label="insta"
                                            className={`w-4/5 flex flex-col my-4 items-start justify-between text-base gap-2`}
                                        >
                                            <label htmlFor="insta" className="">
                                                Instagram Link (optional)
                                            </label>{" "}
                                            <input
                                                className={`w-full border-0 rounded-[10px] px-2 py-3 bg-[#f5f5f5] outline-none my-2`}
                                                type="text"
                                                placeholder="Eg. instagram.com/John_Doe"
                                                name="insta"
                                                value={insta}
                                                onChange={handleUpdate}
                                            />
                                        </div>

                                        <div
                                            aria-label="youtube link"
                                            className={`w-4/5 flex flex-col my-4 items-start justify-between text-base gap-2`}
                                        >
                                            <label htmlFor="yout" className="">
                                                Youtube Link (optional)
                                            </label>{" "}
                                            <input
                                                className={`w-full border-0 rounded-[10px] px-2 py-3 bg-[#f5f5f5] outline-none my-2`}
                                                type="text"
                                                placeholder="Eg. youtube/username"
                                                name="yout"
                                                value={yout}
                                                onChange={handleUpdate}
                                            />
                                        </div>
                                    </>
                            }
                            <div className={`w-full fixed bottom-0 py-4 px-[10%] mx-auto flex justify-end gap-4 border-t border-gray-300`}>
                                {
                                    modalTab === "basic" ?
                                        <button onClick={handleForm} className={`bg-primary px-6 py-3 rounded-lg text-white text-sm ${fig.className}`}>
                                            Next
                                        </button> :
                                        <div className={`w-full flex justify-end gap-4`}>
                                            <button onClick={(e) => {
                                                handleForm(e,"prev");
                                            }} className={`bg-transparent px-6 py-3 border border-gray-300 rounded-lg text-gray-800 text-sm ${fig.className}`}>
                                                Prev
                                            </button>
                                            <button onClick={handleForm} className={`bg-primary px-6 py-3 rounded-lg text-white text-sm ${fig.className}`}>
                                                Save
                                            </button>
                                        </div>
                                }
                            </div>
                        </form>
                }
            </Modal>
        </div>
    )
}

export default ProfileCreator;