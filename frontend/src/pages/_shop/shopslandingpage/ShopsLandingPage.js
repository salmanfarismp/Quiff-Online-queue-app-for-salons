import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ShopsLandingPage.css'
import Myheader from '../../../components/_commonThings/header/MyHeader'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material'



const theme = createTheme({
  palette: {
      primary: {
          main: '#ffce45',
      },
      mode:'dark'
      
  }
})


function ShopsLandingPage() {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="d">
        <div className='shopbanner-body'>
        <ThemeProvider  theme={theme}>
        <Dialog open={open}  onClose={handleClose}>
        <DialogTitle>We Are Here To Help You!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill The Form Below.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Search Your Shop Here..."
            type="email"
            fullWidth
            variant="outlined"
          />
            </Grid>
            <Grid item xs={12}>
            <TextField
          id="outlined-multiline-static"
          label="Tell Us What Happened"
          multiline
          fullWidth
          rows={4}
          
        />
            </Grid>
            <Grid item xs={12}>
            <TextField
            autoFocus
            margin="dense" 
            id="name"
            label="Contact Number"
            type="email"
            fullWidth
            variant="outlined"
          />
            </Grid>
            
          </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button className='quiffbtn' onClick={handleClose}>Cancel</Button>
          <Button className='quiffbtn' onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
            
            <Myheader/>
            <div className="shopbanner-content container">
              
                <h1 className="capriola-font">Register your salon on quiff.</h1>
                <p className="darktheme ">Add online booking to your shop and provide your 
                    customers with a seamless booking experience. <br />
                    Streamline your hair salon business and save time.</p>
                <div className="d-flex pt-3  "> 
                <button onClick={()=>navigate('/registersalon')} className="btn darktheme me-3 " style={{backgroundColor:'#FFCE45',borderRadius:'10px',fontWeight:'bold', width:'20rem'}}>Register Your salon</button>
                <button onClick={handleClickOpen} className="btn darktheme  " style={{background:'transperant',borderRadius:'10px',fontWeight:'bold',width:'20rem', border:'1px solid #FFCE45'}}>Salon already listed?claim now!</button>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default ShopsLandingPage






  

