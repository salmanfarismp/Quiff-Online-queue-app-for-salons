import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField  from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Myheader from '../../_commonThings/header/MyHeader';
import { useNavigate } from 'react-router-dom';
import {
    isRegisterValid,
} from "../../../validations/registerForm";
import { createUser } from '../../../api';




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
  

export default function SignUp() {
 
  const [registerFields, setRegisterField] = React.useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    
  });
  const [registerErrors, setRegisterError] = React.useState({
    email: "",
    password: "",
    phone: "",
    username: "",
    confirmPassword: "",
  });

  function handleRegister() {
    if (isRegisterValid(registerFields, setRegisterError, registerErrors)) {
      UserCreation()
    }
  }
  async function UserCreation(){
    const formData = {'username':registerFields.username, 'email':registerFields.email, 'phone_number':registerFields.phone, 'password':registerFields.password}
    await createUser(formData).then(response =>{
        alert('Success')
        navigate('/login')
    }).catch((error)=>{
        console.log(error.response.data);
    })
  }


  const navigate = useNavigate()
  return (
    <ThemeProvider theme={myTheme}>
         <div className="daddaa" >
         <Myheader isInSignUp />
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                variant="standard" 
                  autoComplete="off"
                  name="username"
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                  value={registerFields.username}
                    onChange={(e) => {
                        setRegisterField({
                        ...registerFields,
                        username: e.target.value,
                        });
                        setRegisterError((prevState) => ({
                        ...prevState,
                        username: "",
                        }));
                    }}
                    error={registerErrors.username}
                    helperText={registerErrors.username}
                />
              </Grid>  
              <Grid item xs={12}>
                <TextField
                     variant="standard" 
                  
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  type="number"
                  value={registerFields.phone}
                        onChange={(e) => {
                          setRegisterField({
                            ...registerFields,
                            phone: e.target.value,
                          });
                          setRegisterError((prevState) => ({
                            ...prevState,
                            phone: "",
                          }));
                        }}
                        error={registerErrors.phone}
                        helperText={registerErrors.phone}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                     variant="standard" 
                  
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  value={registerFields.email}
                    onChange={(e) => {
                        setRegisterField({
                        ...registerFields,
                        email: e.target.value,
                        });
                        setRegisterError((prevState) => ({
                        ...prevState,
                        email: "",
                        }));
                    }}
                    error={registerErrors.email}
                    helperText={registerErrors.email}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                     variant="standard" 
                  
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={registerFields.password}
                  onChange={(e) => {
                    setRegisterField({
                      ...registerFields,
                      password: e.target.value,
                    });
                    setRegisterError((prevState) => ({
                      ...prevState,
                      password: "",
                    }));
                  }}
                  error={registerErrors.password}
                  helperText={registerErrors.password}
                  
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                     variant="standard" 
                  
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  value={registerFields.confirmPassword}
                  onChange={(e) => {
                    setRegisterField({
                      ...registerFields,
                      confirmPassword: e.target.value,
                    });
                    setRegisterError((prevState) => ({
                      ...prevState,
                      confirmPassword: "",
                    }));
                  }}
                  error={registerErrors.confirmPassword}
                  helperText={registerErrors.confirmPassword}
                />
              </Grid>
             
            </Grid>
            <Button
            onClick={() => {
            handleRegister();
            }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="Alterlink"   variant="body2">
                    <span onClick={() =>navigate('/login')}  >
                    Already have an account? Sign in
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