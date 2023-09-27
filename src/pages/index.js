import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import {useSession, signOut} from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data, status} = useSession();


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className=''>
        <h1 className="text-6xl text-center max-w-lg font-bold leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-cyan-400">
          Mail Synk
          </h1>
      <h2 className='text-center text-5xl font-heading font-extrabold'>
        Email Superpowered
        </h2>
        </div>

          
      <div className='w-full flex justify-center mt-32'>
        {
          status==="authenticated" ? 
          <div className='flex items-center justify-center gap-14'>
            <Link href="/dashboard" className="text-4xl text-center max-w-lg font-bold leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-cyan-400 cursor-pointer" >
          Dashboard
          </Link>
          
          <div onClick={()=>{
            signOut();
          }}  className="text-4xl text-center max-w-lg font-bold leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400 cursor-pointer" >
          Sign out
          </div>
          </div> :
          <Link href="/auth?page=signin" className="text-4xl text-center max-w-lg font-bold leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-cyan-400 cursor-pointer">
          Login
          </Link> 
        }
      </div>
    </main>
  )
}
