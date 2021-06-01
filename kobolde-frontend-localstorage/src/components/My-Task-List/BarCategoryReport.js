import React,{ useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';

import axios from 'axios';
const data1 = {
 
  labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
  datasets: [
    {
      label: '# of Red Votes',
      data: [ 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '# of Blue Votes',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: 'rgb(54, 162, 235)',
    },
    {
      label: '# of Green Votes',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
};

export default function BarCategoryReport(props) {
 const [data, setData] = useState([]);
 let title = [];
 let id=[];
 let titleproducts=[];
 React.useEffect(()=>{
  axios.get('https://kobolde.ahoora.se:8443/api/v1/admin/category').then(res=>{
  const categories=res.data;
  
  
     categories.forEach(element => {
      title.push(element.title);
      id.push(element[Object.keys(element)[0]].length); 
     
    });
  setData({
    Data: {
      labels: title,
      datasets: [
        {
          label: "IPL 2018/2019 Top Run Scorer",
          data:id,
          backgroundColor: [
            "#3cb371",
            "#0000FF",
            "#9966FF",
            "#4C4CFF",
            "#00FFFF",
            "#f990a7",
            "#aad2ed",
            "#FF00FF",
            "Blue",
            "Red"
          ]
        }
      ]
    }
  });
});


},[]);


return(
  <>
    <div className='header'>
      <h1 className='title'>Kategori Diagram</h1>
      <div className='links'>
        <a
          className='btn btn-gh'
         
        >
          Skriva Ut
        </a>
      </div>
    </div>
    
    <Bar data={data.Data} />
  </>
);
}

