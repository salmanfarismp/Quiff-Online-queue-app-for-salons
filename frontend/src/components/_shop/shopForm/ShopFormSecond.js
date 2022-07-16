import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ShopContext } from '../../../contexts/AuthContext';



export default function PaymentForm({handleNext,handleBack}) {


  const [empNumErr,setEmpNumErr] = React.useState(false)

 const handleNumberOfEmployees = (val)=>{
  setNumOfEmp(val)
  if(val > 0){
    setEmpNumErr(false)
  }else{
    setEmpNumErr(true)
  }
 }
  

    const {shopType,shopGender,numOfEmp,openTime,closingTime,openDays,
    setShopType,setShopGender,setNumOfEmp,
    setOpenTime,setClosingTime,setOpenDays} = React.useContext(ShopContext)


    React.useEffect(() => {
      console.log('shopType:',shopType,'shopGender:',shopGender,'numOfEmp:',numOfEmp,'openTime:',openTime,'closeTime:',closingTime,'openDays:',openDays)
    })
    


  return (
    <React.Fragment>
      <form  action="">
      <Accordion>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          
            <div className="d-flex flex-column">
            <Typography component="h6" variant="h6"  >Shop Details</Typography>
            <Typography  component="span" variant="p" className="CreateShopsubH" >Type, Genders, Number of employees</Typography>
            </div>
          
        </AccordionSummary>
        <AccordionDetails>
        <div className="d-flex flex-column">
        <FormControl>
          

          <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>

          <RadioGroup row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Hair Salon"
            name="radio-buttons-group"
            value={shopType}
            onChange={(e)=>setShopType(e.target.value)}
            
            >
            <FormControlLabel value="Hair Salon" control={<Radio />} label="Hair Salon" />
            <FormControlLabel value="Beauty Salon" control={<Radio />} label="Beauty Salon" />
      
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Male"
            name="radio-buttons-group"
            value={shopGender}
            onChange={(e)=>setShopGender(e.target.value)}
            
            
            >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="both" control={<Radio />} label="Both" />
          </RadioGroup>
        </FormControl>  
        
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          
            <div className="d-flex flex-column">
            <Typography component="h6" variant="h6"  >Shop operational hours</Typography>
            <Typography  component="span" variant="p" className="CreateShopsubH" style={{color: 'rgba(255, 255, 255, 0.5)'}} >Mark shop opening and closing hours</Typography>
            </div>
          
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <TextField
        id="time"
        label="Opens at"
        type="time"
        defaultValue="10:00"
        value={openTime}
        onChange={(e)=>setOpenTime(e.target.value)}
        
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
      </Grid>
       <Grid item xs={12} sm={6}>
      <TextField
        id="time"
        label="closes at"
        type="time"
        defaultValue="10:00"
        value={closingTime}
        onChange={(e)=>setClosingTime(e.target.value)}
        
        variant="standard"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
      </Grid>
      </Grid>
        <Box sx={{ mt: 4,mb:4 }}>
            <Typography component="h6" variant="h6"  >Mark Open Days</Typography>
            <Typography  component="span"variant="p" style={{color: 'rgba(255, 255, 255, 0.5)'}} >Don’t forget to uncheck your off-day</Typography>
            <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
              <FormControlLabel control={<Checkbox  checked={openDays.sunday} onChange={(e)=>
              setOpenDays(prev=>{
                return{...prev,sunday:e.target.checked}
              })
              }  />} label="Sunday" />
              <FormControlLabel control={<Checkbox onChange={(e)=>
              setOpenDays(prev=>{
                return{...prev,monday:e.target.checked}
              })} checked={openDays.monday}  />} label="Monday" />
              <FormControlLabel control={<Checkbox onChange={(e)=>
              setOpenDays(prev=>{
                return{...prev,tuesday:e.target.checked}
              })} checked={openDays.tuesday} />} label="Tuesday" />
              <FormControlLabel control={<Checkbox onChange={(e)=>
              setOpenDays(prev=>{
                return{...prev,wednesday:e.target.checked}
              })} checked={openDays.wednesday} />} label="Wednesday" />
              </Grid>
              <Grid item xs={12} sm={12}>
              <FormControlLabel control={<Checkbox onChange={(e)=>
              setOpenDays(prev=>{
                return{...prev,thursday:e.target.checked}
              })} checked={openDays.thursday} />} label="Thursday" />
              <FormControlLabel control={<Checkbox onChange={(e)=>
              setOpenDays(prev=>{
                return{...prev,friday:e.target.checked}
              })} checked={openDays.friday} />} label="Friday" />
              <FormControlLabel control={<Checkbox onChange={(e)=>
              setOpenDays(prev=>{
                return{...prev,saturday:e.target.checked}
              })} checked={openDays.saturday} />} label="Saturday" />
              </Grid>
              </Grid>
            </FormGroup>
        </Box>
      </AccordionDetails>
      </Accordion>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  
                    <Button className='quiffbtn' onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  

                  <Button className='quiffbtn'
                    variant="contained"
                    onClick={empNumErr?'':handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Next
                  </Button>
                </Box>
      
    </form>
    </React.Fragment>
  );
}