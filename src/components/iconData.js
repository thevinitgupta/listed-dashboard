import React from 'react'
import { Figtree, Inter, Lato, Montserrat, Open_Sans, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['700'] })
const monte = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const osans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const fig = Figtree({subsets : ['latin'], weight : ['400']})

const IconData = ({
    icon,
    iconColor,
    heading, 
    value, 
    percent, 
    sign
}) => {
    return (
        <>
            <div className={`h-[30px] w-[30px] text-[20px] text-white rounded-full ${iconColor} flex items-center justify-center`}>
                {icon}
            </div>
            <div className={`w-full text-[11px] ${lato.className}`}>
                {heading}
            </div>
            <div className={`w-full flex justify-between items-end`}>
                <div className={`text-xl font-bold ${osans.className}`}>{value}</div>
                <div className={`text-[10px] rounded-lg px-2 py-1 ${sign === "pos" ? "bg-labelGreen text-roshi" : ""} ${fig.className}`}>{percent}</div>
            </div>
        </>
    )
}

export default IconData