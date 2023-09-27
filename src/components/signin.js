import React, { useState } from 'react'
import { Inter, Lato, Montserrat, Poppins } from 'next/font/google'
import { BsApple, BsGoogle, BsGithub, BsLinkedin } from "react-icons/bs"
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoDiscord } from "react-icons/io5";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['700'] })
const monte = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })
const lato = Lato({ subsets: ['latin'], weight: ['400'] })

const Signin = ({ toggleTab }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleUpdate = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const { data, status } = useSession();
  if(status==="authenticated") return window.location = "/dashboard";
  return (
    <section className={`w-full flex flex-col justify-center gap-[6px]`}>
      <h1 className={`text-4xl font-bold my-0 ${monte.className}`}>Sign In</h1>
      <h3 className={`text-lg font-normal my-0 ${lato.className}`}>Sign in to your account</h3>
      <div className={`w-full flex items-center justify-start mt-6 gap-4 text-gray-400`}>
        <div className={`bg-white px-7 py-2 text-xs rounded-md cursor-pointer ${monte.className} flex items-center gap-2`} onClick={() => {
          signIn('google');
        }}>
          {
            status === "loading" ?
              <div role="status">
                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              :
              <>
                <BsGoogle />
                Sign in with Google
              </>}
        </div>
        <div className={`bg-white px-7 py-2 text-xs rounded-md ${monte.className} flex items-center gap-2`}>
          <BsApple />
          Sign in with Apple
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
        <div
          className={`w-full mt-4 mb-6 flex items-center justify-between text-xl gap-4`}
        >
          <Link href="/auth/forgot-password" className={`text-sm text-link`}>Forgot Password</Link>
        </div>

        <button type='submit' className={`w-full text-center py-[10px] bg-primary text-base font-bold text-white rounded-lg hover:bg-primarydark ${monte.className}`}>Sign In</button>
      </form>
      <div className={`w-full max-w-[450px] py-4 text-base text-center text-grey ${lato.className}`}>{`Don’t have an account? `}
        <span onClick={() => {
          router.replace("/auth?page=signup")
        }} className={`text-link cursor-pointer`}>
          Register here
        </span>
      </div>
      <div className={`w-full max-w-[450px] flex lg:hidden text-link/70 items-center justify-center gap-5 lg:gap-14 text-2xl lg:text-5xl`}>
        <BsGithub />
        <FaSquareXTwitter className={`text-3xl`} />
        <BsLinkedin />
        <IoLogoDiscord className={`text-3xl`} />
      </div>
    </section>
  )
}

export default Signin