import React, { useContext } from 'react'
import {Navbar,Form,Nav,NavDropdown,FormControl,Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './MyHeader.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Button, Grid, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EditIcon from '@mui/icons-material/Edit';
import AuthContext from '../../../contexts/AuthContext';


// i am 95% satisfied.

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Myheader({isInSignUp,isInLogin}) {
    const navigate = useNavigate()
    const [editUser,setEditUser] = React.useState(false);
    const [open, setOpen] = React.useState(false);

  const handleEdit = ()=> {
    setEditUser(true)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(false);
  };
    const {user,logoutUser} = useContext(AuthContext)
    
    return (
        <Navbar className="quiffheader" style={{borderBottom:'1px solid # '}} expand="lg">
        <Container>
          <Navbar.Brand  style={{color: '#ffff'}} href="/">
          <img src={logo} alt="logo" srcSet="" style={{width: '160px', height: '60px'}} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-between">
            {!user && <p style={{color: '#ffff',margin: '10px',cursor: 'pointer'}} onClick={() =>navigate('/shopslandingpage')}  >Add Shop</p>}
            <p style={{color: '#ffff',margin: '10px',cursor:'pointer'}} ><NotificationsActiveIcon/></p>
            { user && !user?.is_businessOwner && <p style={{color: '#ffff',margin: '10px'}} onClick={handleClickOpen} >Account</p>}
              {user ?<Button className="quiffthemebtn"  onClick={() =>logoutUser()} variant="outlined">Log Out</Button>:
                (isInLogin? <Button className="quiffthemebtn" onClick={() =>navigate('/register')} variant="outlined">Sign Up</Button>:
                <Button className="quiffthemebtn" onClick={() =>navigate('/login')} variant="outlined">Sign In</Button>
               )
                } 
            </Nav>
          </Navbar.Collapse>
          <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"User Detailes"}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{float: 'right'}} id="alert-dialog-slide-description">
          <Button className="quiffthemebtn" onClick={handleEdit} variant="outlined"><EditIcon/></Button>
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
            autoFocus
            margin="dense"
            disabled={!editUser}
            id="name"
            label="UserName"
            value='michu'
            fullWidth
            variant="outlined"
          />
            </Grid>
            <Grid item xs={12}>
            <TextField
          id="outlined-multiline-static"
          label="Email Address"
          disabled={!editUser}
          value='safwansalman786@gmail.com'
          multiline
          fullWidth
          
          
        />
            </Grid>
            <Grid item xs={12}>
            <TextField
            autoFocus
            margin="dense" 
            id="name"
            label="Phone Number"
            disabled={!editUser}
            value= '9207439466'
            fullWidth
            variant="outlined"
          />
            </Grid>
            
          </Grid>
        </DialogContent>
        <DialogActions>
          <div className="d-flex w-100 justify-content-between" >
            <div className="dd">
              <p>Change Password</p>
            </div>
            {editUser?
            <div className="d">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
          </div>:
          <Button onClick={handleClose}>Close</Button>
        }
          </div>
        </DialogActions>
      </Dialog>
        </Container>
      </Navbar>
    )
  }
  

export default Myheader







  

  
