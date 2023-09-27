import React, { useEffect, useState } from 'react'
import { Figtree, Inter, Lato, Montserrat, Open_Sans, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['700'] })
const monte = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const osans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const fig = Figtree({subsets : ['latin'], weight : ['400']})

const Card = ({
    child }) => {
    return (
        <div className={`w-full  py-4 px-4 border-2 border-grey bg-white rounded-[20px] shadow-md flex flex-col gap-2`}>
            {child}
        </div>
    )
}

export default Card