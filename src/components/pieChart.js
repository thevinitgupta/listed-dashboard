import React, { useEffect, useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.plugins.legend.display = false;
ChartJS.defaults.responsive = true;
ChartJS.defaults.elements.arc.borderRadius = 4;

export const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(238, 132, 132, 1)',
          'rgba(152, 216, 158, 1)',
          'rgba(246, 220, 125, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const legendBackgrounds = [
    "bg-iconPeach",
    "bg-iconGreen",
    "bg-pieYellow"
  ]

  const calculatePercentage = (index)=>{
    let total = 0;
    data.datasets[0].data.forEach((val)=> {
        total += val;
    });
    console.log(Math.round(data.datasets[0].data[index]/total))
    const percent = Math.round(data.datasets[0].data[index]/total * 100);
    return percent;
  }

const PieChart = ({monte, lato}) => {
    
  return (
    <div className='w-full flex flex-col gap-2 px-6'>
        <div className={`flex justify-between items-center`}>
            <div className={`text-black font-bold text-xl ${monte.className}`}>Top Products</div>
            <div className={`flex-0 text-xs text-grey`}>
              May-June 2021
            </div>
        </div>
        <div className='flex-[0.8] w-full flex items-center'>
            <div className='h-full w-1/3'>
            <Doughnut data={data} />
            </div>
            <div className='w-3/4 flex flex-col items-end h-full gap-3'>
                {
                    data.labels.map((value, index)=> {
                        return (
                            <div className={`flex justify-start items-center w-[50%] gap-2`}>
                                <div className={`h-[11px] w-[11px] rounded-full ${legendBackgrounds[index]}`}></div>
                                <div className='flex flex-col justify-between  h-full gap-[2px]'>
                                    <div className={`font-bold text-sm ${monte.className}`}>{value}</div>
                                    <div className={`font-normal text-xs text-grey ${lato.className}`}>{calculatePercentage(index)}%</div>
                                    </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </div>
  )
}

export default PieChart