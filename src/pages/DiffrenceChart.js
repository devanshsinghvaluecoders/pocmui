import React from 'react';
import { getAllDept, getAllEmployees } from '../utils';
import PieChart from '../component/Analytics/PieChart';
import { Grid } from '@mui/material';
function DiffrenceChart() {
  return (
    <div>
      {getAllDept ? (
        <Grid container>
          {getAllDept.map((rep) => (
            <Grid item md={4}>
              <PieChart
                dataDept={rep}
                ratiodata={getAllEmployees.filter(
                  (rek) => rek.department === rep.dept_name
                )}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        'no Data'
      )}
    </div>
  );
}

export default DiffrenceChart;
