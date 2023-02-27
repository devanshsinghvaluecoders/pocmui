import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box, ListItemIcon } from '@mui/material';
import { drawerContent } from '../../utils/index';
const SideBar = ({ setIsActiveContent }) => {
  return (
    <Drawer
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: 'rgb(25,118,210)',
          borderRadius: '30px',
          color: 'white',
        },
      }}
      variant='persistent'
      ModalProps={{
        keepMounted: true,
      }}
      anchor={'left'}
      open
    >
      <List>
        {drawerContent.map((content, index) => (
          <ListItem key={content.text} disablePadding>
            <ListItemButton onClick={() => setIsActiveContent(index)}>
              <ListItemIcon>{content.drawerIcon}</ListItemIcon>
              <ListItemText primary={content.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
