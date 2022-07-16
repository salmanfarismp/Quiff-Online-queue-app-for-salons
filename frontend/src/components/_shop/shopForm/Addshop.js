import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuContainer from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FirstForm from './ShopFormFirst';
import SecondForm from './ShopFormSecond';
import ThirdForm from './ShopFormThird';
import logo from './logo.png'
import { useNavigate } from 'react-router-dom';
import Myheader from '../../_commonThings/header/MyHeader';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './Addshop.css'
import { Controller, FormProvider, useFormContext } from 'react-hook-form';
const steps = ['Shop information', 'Shop type and timing', 'Upload Images'];




const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        mode:'dark'
        
    }
}
    
);

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FirstForm handleNext={handleNext} />;
      case 1:
        return <SecondForm handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <ThirdForm  handleBack={handleBack} />;
      default:
        throw new Error('Unknown step');
    }
  }

  
  
  

  return (
    <div className="addshopdiv">  
    <ThemeProvider  theme={theme}>
      <CssBaseline />
    
      <Myheader/>
      
      
      <MuContainer component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography className="capriola-font" component="span" variant="h4" align="center">
            Register Your Salon
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <CheckCircleIcon className="Shop-form-success"/>
                <Typography  component="span" variant="h5" gutterBottom>
                Shop listing details submitted. <br/>
                </Typography>
                <Typography  component="span" variant="subtitle1">
                Our team will verify the details and update once your page is live on Quiff!
                We will notify you when everything is done.
                you can <span>Sign In</span> to your account and check updations.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                
                {getStepContent(activeStep)}
                
                {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button className='quiffbtn' onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button className='quiffbtn'
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box> */}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </MuContainer>
    </ThemeProvider>
    </div>
  );
}