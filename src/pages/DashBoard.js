import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '../component/dashBoard/Drawer';
import { drawerContent } from '../utils/index';
function DashBoard() {
  const [isActiveContent, setIsActiveContent] = useState(0);
  function displayContent() {
    return drawerContent[isActiveContent].content;
  }
  const navigate = useNavigate();
  useEffect(() => {
    // localStorage.setItem('adminDetails', JSON.stringify(adminDetails));
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails) {
      navigate('/');
    }
  }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container>
        <Grid item md={3} xs={3} lg={3} sm={3}>
          <Drawer setIsActiveContent={setIsActiveContent} />
        </Grid>
        <Grid item md={9} xs={9} lg={9} sm={9}>
          {displayContent()}
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashBoard;
