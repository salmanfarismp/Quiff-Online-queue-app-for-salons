import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from './logo.png'
import Orders from './Orders';
import MyDashboard from './MyDashBoard';
import { ListItemButton, ListItemIcon, ListItemText, Modal } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BorderClearIcon from '@mui/icons-material/BorderClear';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ListAltIcon from '@mui/icons-material/ListAlt';
import axios from 'axios';
import { apiBaseURL } from '../../constants/Constants';
import AuthContext from '../../contexts/AuthContext';







const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme(
    {
        palette: {
            primary: {
                main: '#ffce45',
            },
            mode:'dark'
            
        }
    }
);
function MainListItems() {
  const navigate = useNavigate()

  

  
  return(
    <div>
      
  <React.Fragment>
   <ListItemButton onClick={()=>navigate('/admin/home')} >
    
       <ListItemIcon >
         <DashboardIcon />
       </ListItemIcon>
       <ListItemText primary="Dashboard" />
    
    </ListItemButton>
   
    <ListItemButton onClick={()=>navigate('/admin/home/users')} >
       <ListItemIcon>
       <PeopleIcon />
       </ListItemIcon>
       <ListItemText primary="Users" />
     </ListItemButton>
    
     <ListItemButton  onClick={()=>navigate('/admin/home/shops')}>
       <ListItemIcon>
         <StorefrontIcon/>
       </ListItemIcon>
       <ListItemText primary="Saloons" />
     </ListItemButton>
     <ListItemButton  onClick={()=>navigate('/admin/home/salesReports')}>
       <ListItemIcon>
         <BarChartIcon />
       </ListItemIcon>
       <ListItemText primary="Reports" />
     </ListItemButton>
     <ListItemButton  onClick={()=>navigate('/admin/home/payments')}>
       <ListItemIcon>
         <MonetizationOnIcon />
       </ListItemIcon>
       <ListItemText primary="Payments" />
     </ListItemButton>
     <ListItemButton  onClick={()=>navigate('/admin/home/services')}>
       <ListItemIcon>
         <BorderClearIcon />
       </ListItemIcon>
       <ListItemText primary="Services Management" />
     </ListItemButton>
     <ListItemButton  onClick={()=>navigate('/admin/home/plans')}>
       <ListItemIcon>
         <LayersIcon />
       </ListItemIcon>
       <ListItemText primary="Plans Management" />
     </ListItemButton>
     
     </React.Fragment>
     </div>
)}

function SecondaryListItems() {
  const navigate = useNavigate()
  let {logoutAdmin} = React.useContext(AuthContext)
  return(
  <React.Fragment>
     <ListItemButton  onClick={()=>navigate('/admin/home/shop_requests')}>
       <ListItemIcon>
         <ListAltIcon />
       </ListItemIcon>
       <ListItemText primary="Shop Requests" />
     </ListItemButton>
   <ListItemButton >
       <ListItemIcon >
         <LogoutIcon />
       </ListItemIcon>
       <ListItemText primary="Log Out" onClick={()=>logoutAdmin()} />
    </ListItemButton>
    
  </React.Fragment>
  
)}


function AdminContent({children}) {

  const [notification, setNotification] = React.useState(true)
  const [requestedShops, setrequestedShops] = React.useState(null)

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

  
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  async function getNotifications(){
    
   
    await axios.get("http://127.0.0.1:8000/api/notifications").then(response => {
        let data =  response.data
        console.log('nofi',data) 
   }).catch((error)=>{
       alert(error.response.data.message)
       
   })
   
}

// React.useEffect(() => {
  
//   getNotifications()

 
// }, [])

  return (
    <ThemeProvider theme={mdTheme}>
      <Modal
        open={notification}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Notifications
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           3 Shop Creation Requests
          </Typography>
        </Box>
      </Modal>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton 
              color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon onClick={()=>notification?handleClose():handleOpen()}  />
              </Badge>
            </IconButton>
            
          </Toolbar>
          
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <div className="d-flex">

        <img src={logo} alt="logo" srcSet="" style={{width: '160px', height: '60px'}} />
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
            >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
            </div>
          
        
          <Divider />
          <List component="nav">
            <MainListItems/>
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems/>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          
          
      
      <Toolbar />
      {children}
     
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function AdminHome({children}) {
  return <AdminContent children={children}   />;
}