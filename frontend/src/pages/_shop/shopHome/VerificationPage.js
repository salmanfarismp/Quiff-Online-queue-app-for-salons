
import React, { useContext, useEffect, useState } from 'react'
import {  Button, Fab, Grid, Typography } from '@mui/material'
import shakeHand from './shakeHand.png'
import yellowLoading from './yellowLoading.gif'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ServicesSelector from '../../../components/_shop/addServices/ServiceSelector'
import PlanCards from '../../../components/_shop/PlanCards'
import axios from 'axios'
import AuthContext from '../../../contexts/AuthContext';




export default function VerificationPage ({}) {

    const {user} = useContext(AuthContext)
  
    const [shop, setshop] = useState(null)
  
    const getshop = async () =>{
      try {
       
        const response = await axios.get(`http://127.0.0.1:8000/api/get_shop_for_process/${user?.user_id}/`)
       
        if(response.status === 200){
          setshop(response.data)
         
        
        }
        
      }catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      
     getshop()
    
      
    }, [])
  
  
    const theme = createTheme({
      palette: {
          primary: {
              main: '#007bff',
          },
          mode:'dark'
          
      }
  }
      
  );
  
    const steps = ['Shop creation', 'Menu digitisation', 'Selecting Plan', 'Activate'];
  
  
    const [activeStep, setActiveStep] = React.useState(0);
    const [arrowPosition, setArrowPosition] = React.useState(12);
    const [completed, setCompleted] = React.useState({});
  
    useEffect(() => {
      
      if(shop?.verification_process === 'verificatonRequested'){
          setActiveStep(0)
          setArrowPosition(12)
  
      }else if(shop?.verification_process === 'verificationApproved'){
        setActiveStep(1)
        setArrowPosition(36)
      }else if(shop?.verification_process === 'menuCreated'){
        setActiveStep(2)
        setArrowPosition(60)
      }else if(shop?.verification_process === 'planSelected'){
        setActiveStep(3)
        setArrowPosition(86)
      }else{
        setActiveStep(0)
        setArrowPosition(12)
      }
    
      
    }, [shop])
  
  
  
  
  
   
  
  
  
    function getStepContent(step) {
      switch (step) {
        case 0:
          return <FirstStepDes  />;
        case 1:
          return <SecondStepDes setActiveStep={setActiveStep}/>;
        case 2:
          return <ThirdStepDes setActiveStep={setActiveStep}/>;
        case 3:
          return <FourthStepDes setActiveStep={setActiveStep}/>;
        default:
          throw new Error('Unknown step');
      }
    }
    
  
    const totalSteps = () => {
      return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    // const isLastStep = () => {
    //   return activeStep === totalSteps() - 1;
    // };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
  
    // const handleNext = () => {
    //   const newActiveStep =
    //     isLastStep() && !allStepsCompleted()
    //       ? // It's the last step, but not all steps have been completed,
    //         // find the first step that has been completed
    //         steps.findIndex((step, i) => !(i in completed))
    //       : activeStep + 1;
    //   setActiveStep(newActiveStep);
    // };
  
    // const handleBack = () => {
    //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };
  
    // const handleStep = (step) => () => {
    //   setActiveStep(step);
    // };
  
    // const handleComplete = () => {
    //   const newCompleted = completed;
    //   newCompleted[activeStep] = true;
    //   setCompleted(newCompleted);
    //   handleNext();
    // };
  
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };
  
  
    return(
      <div className="verification_page">
        <div className="content_container container">
        
          <div className="ver_progress ver_steps">
        <div className="container shop_info">
          <div className=" inner">
            <h1>
              {shop?.name}
            </h1>
            <p>
           {shop?.complete_address}
            </p>
      
  
          </div>
          
  
        </div>
        <ThemeProvider  theme={theme}>
      <Box className=" m-2" sx={{ width: '98%' }}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit">
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
              {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? 'Finish'
                        : 'Complete Step'}
                    </Button>
                  ))}
              </Box> */}
            </React.Fragment>
          )}
        </div>
      </Box>
      </ThemeProvider>
        </div>      
         <div className="ver_progress ver_info">
           <div className="arrow_up " style={{left: arrowPosition+'%'}} />
           {getStepContent(activeStep)}
           
        </div> 
        </div>
      </div>
    )
  
  }
  
  
  const FirstStepDes = ()  =>{
  
    return(
      <div className="m-5 text-light d-flex flex-column " >
        <p className="capriola-font" style={{fontSize:'14px'}}>
  
        Our Team is verifying your Form. It usually takes 1-3 working days. Please be patient and come back later...
        </p>
      <div className="d-flex w-100 align-items-center justify-content-center">
  
        <img src={yellowLoading} alt="verifying" style={{height: '200px',width: '300px'}} />
      </div>
      </div>
  
    )
  } 
  const SecondStepDes = ({setActiveStep})  =>{
  
    return(
      <div className="m-2" >
       <ServicesSelector setActiveStep={setActiveStep} />
      </div>
  
    )
  } 
  const ThirdStepDes = ({setActiveStep})  =>{
  
    return(
      <div className="m-5  " >
        <PlanCards setActiveStep={setActiveStep} />
      </div>
  
    )
  } 
  const FourthStepDes = ()  =>{
  
    const {user} = useContext(AuthContext)
  
    const shopReady = async () => {
      alert('lets rock it')
      try {
       
        const response = await axios.put(`http://127.0.0.1:8000/api/all_set_for_shop/${user?.user_id}/`)
       
        if(response.status === 200){       
          user.is_verified = true
          
    
        }
        
      }catch (error) {
        console.log(error)
      }
  
    }
  
    return(
      <div className=" fourthstep   " >
        <div className="inner">
        <h3>Wow We Are Ready To Work!</h3>
       <h1>So Glad to Work With You</h1>
       <Button onClick={shopReady} className="quiffyellowbtn mt-3">Here We Go!</Button>
  
        </div>
        <div className="inner d-flex" style={{justifyContent:'center', alignItems: 'center'}}>
          <img src={shakeHand} style={{height: '200px'}} alt="" />
        </div>
       
      </div>
  
    )
  } 