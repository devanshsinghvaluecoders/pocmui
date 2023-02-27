import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ dataDept, ratiodata }) {
  const [data, setdata] = useState({
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [17, 19],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    let Male = ratiodata.filter((rep) => rep.gender === 'Male');
    let Female = ratiodata.filter((rep) => rep.gender === 'Female');
    setdata({
      labels: ['Male', 'Female'],
      datasets: [
        {
          data: [Male ? Male?.length : 0, Female ? Female?.length : 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    });
  }, [ratiodata]);

  return (
    <div>
      <Typography variant='h5' style={{ textAlign: 'center' }}>
        {dataDept?.dept_name}
      </Typography>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
