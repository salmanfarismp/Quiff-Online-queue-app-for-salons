import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../../../contexts/AuthContext';
import Myheader from '../header/MyHeader';
import './Login.css'
import { useNavigate } from 'react-router-dom';



const myTheme = createTheme({
  palette: {
    primary: {
        main: '#ffce45',
    },
    secondary: {
      main: '#ffff',
    },
    mode:'dark'
    
}
});

export default function SignIn({userSide,adminSide}) {
  let {loginUser,loginAdmin} = React.useContext(AuthContext)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userName = data.get('username')
    let password = data.get('password')
    if(userSide){
      loginUser(userName, password)
    }
    if(adminSide){

      loginAdmin(userName, password)
    }


    
  };
  const navigate = useNavigate()

  return (
    <ThemeProvider theme={myTheme}>
      <div className="daddaa" >
      <Myheader isInLogin />
    
      <Container className="loginComponent" component="main" maxWidth="xs">
        
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              
              variant="standard" 
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete='blak'
              autoFocus
            />
           
            <TextField
            
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              variant="standard" 
              autoComplete='off'
              
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link className="Alterlink" variant="body2">
                  <span onClick={() =>navigate('/register')}>
                  Don't have an account? Sign Up
                  </span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        
      </Container>
      
      </div>
    </ThemeProvider>
  );
}