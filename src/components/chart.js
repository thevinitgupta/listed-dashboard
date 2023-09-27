import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  layouts
} from 'chart.js';

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
);

Chartjs.defaults.elements.bar.borderRadius = 4;


const Chart = ({monte, lato}) => {
  const legends = ["Likes","Visits"];
  const [userData, setUserData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const getUserData = async () => {
    try {
      const data = await fetch("https://random-data-api.com/api/v2/users?size=4");
      const users = await data.json();
      console.log(users)
      const filtered = users.map((user, index)=> {
      const filteredData = {
          name : user["first_name"],
          likes : Math.abs(parseInt(user["address"]["coordinates"]["lat"])),
          visits : Math.abs(parseInt(user["address"]["coordinates"]["lng"]))
        }
        return filteredData;
      });
      console.log(filtered);
      setUserData(filtered);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setError(error.message);
    }
  }

  useEffect(()=>{
    getUserData();
  }, [isError])
  return (
    <div className={`flex flex-col w-full gap-8 px-6`}>
        <div className={`flex flex-col w-full gap-[5px] ${monte.className}`}>
          <h1 className={`font-bold  text-lg my-0`}>Activites</h1>
          <div className={`flex justify-between items-center text-sm`}>
            <div className={`flex-1 text-grey`}>
              May-June 2021
            </div>
            <div className={`flex-[0.3] flex justify-end ${lato.className} text-black`}>
                <div className={`flex-[0.4] flex items-center gap-2`}>
                  <div className={`h-[10px] w-[10px] rounded-full bg-iconPeach`}></div>
                  {legends[1]}
                </div>
                <div className={`flex-[0.4] flex items-center gap-2`}>
                  <div className={`h-[10px] w-[10px] rounded-full bg-iconGreen`}></div>
                  {legends[0]}
                </div>
            </div>
          </div>
        </div>
        <div className={`h-60 w-full`}>
          <Bar  data={{
            
               labels : userData.map(user => user.name),
               datasets : [
                  {label : "Likes",
                  data : userData.map(user => user.likes),
                  backgroundColor : 'rgba(152, 216, 158, 1)',
                  normalized : true
                },
                  {label : "Visits",
                  data : userData.map(user => user.visits),
                  backgroundColor : 'rgba(238, 132, 132, 1)',
                  normalized : true
                },
               ],
          }
          }/>
        </div>
    </div>
      
  )
}

export default Chart