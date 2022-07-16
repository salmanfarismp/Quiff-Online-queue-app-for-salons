import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import AuthContext from '../../contexts/AuthContext';
import { Box, Button, Modal, Typography } from '@mui/material';
import axios from 'axios';

function PrivateAdminRoute({children}) {
  const {admin} = useContext(AuthContext);
  
  return admin ? children : <Navigate to="/admin/login" />;
}

export default PrivateAdminRoute



export function PrivateUserRoute({children}) {
  const {user} = useContext(AuthContext);
  const [queueDetailes, setQueueDetailes] = useState({})


  const getQueueDetailes = async()=>{
    try {
       
      const response = await axios.get(`http://127.0.0.1:8000/api/user_queue_detailes/${user?.user_id}/`)
     
      if(response.status === 200){
        setQueueDetailes(response.data)
       
      
      }
      
    }catch (error) {
      console.log(error)
    }
  } 

const style = {
  position: 'absolute',
  top: '20%',
  left: '70%',
  transform: 'translate(-50%, -50%)',
  width: '40%',

  bgcolor: 'background.paper',
  border: '2px solid #ffce45',
  boxShadow: 24,
  p: 4,
};

const handleOpen = () => setNotification(true);
const handleClose = () => setNotification(false);
const [notification, setNotification] = React.useState(true)
 
  return user ? 
  (
    <div>
      
      <Modal
        open={notification}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           You Are In Queue!
          </Typography>
          <Button style={{color: '#ffce45'}} id="modal-modal-description" sx={{ mt: 2 }}>
           Go to shop Page
          </Button>
        </Box>
      </Modal>
      {children}
    </div>
  )
  
   : <Navigate to="/login" />;
}


export function PrivateShopRoute({children}) {
  const {user} = useContext(AuthContext);
 
  return user.is_businessOwner ? children : <Navigate to="/login" />;
}

export function FastPassRoute({children}) {
  const {user} = useContext(AuthContext);
  if(user?.is_businessOwner){
    return <Navigate to="/shopHome" />
  }
  else if(user){
    return <Navigate to="/home" />
  }
  else{
    return children
  }
}

