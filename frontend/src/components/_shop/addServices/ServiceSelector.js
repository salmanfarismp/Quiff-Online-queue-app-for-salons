import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box, Button, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, ThemeProvider } from '@mui/material';
import './AddServices.css'
import { useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import AuthContext from '../../../contexts/AuthContext';




const theme = createTheme({
  palette: {
      primary: {
          main: '#007bff',
      },
      mode:'dark'
      
  }
}
  
);





const SelectServices = ({setPageOne,selectedServices,setselectedServices})=>{

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });


  const [serviceName, setServiceName] = useState('')
  const [serviceDuration, setServiceDuration] = useState('')
  const [servicePrice, setServicePrice] = useState('')
  const [services, setservices] = useState(null)
  const [serviceArray, setServiceArray] = useState([])

  React.useEffect(() => {
    
    
    getservices()
  
    
  }, [])

  React.useEffect(() => {
    
    if(services !== null){
      const propertyValues = Object.values(services);
      console.log(propertyValues)
      setServiceArray(propertyValues)
    }
    

  
    
  }, [services])

  const handleServiceCreation = async (e) => {

    e.preventDefault()

  //   try { 
  //     const response = await axios.post(`http://127.0.0.1:8000/api/services`)
  //     if(response.status === 200){
        
  //       setservices(response.data)
        
  //     }
      
  //   }catch (error) {
  //     console.log(error)
  //   }

   }
  


  const getservices = async () =>{
    try { 
      const response = await axios.get(`http://127.0.0.1:8000/api/services`)
      if(response.status === 200){
        
        setservices(response.data)
        
      }
      
    }catch (error) {
      console.log(error)
    }
  }
  const [openDialog, setopenDialog] = React.useState(React.useMemo(() => false, []));

  const handleClickOpen = () => {
    setopenDialog(true);
  };

  const handleClickClose = () => {
    setopenDialog(false);
  };

  
  return(

    <Grid container justifyContent="center"
             spacing={0}>
        <Dialog
                
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickClose}
                aria-describedby="alert-dialog-slide-description"
              >
               <form action="">
                <DialogTitle>{"Create Service Here"}</DialogTitle>
                <DialogContent>
                  {/* <DialogContentText style={{float: 'right'}} id="alert-dialog-slide-description">
                  Edit Your Services
                  </DialogContentText> */}
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                    autoFocus
                    margin="dense"
                    value={serviceName}
                    onChange={(e)=>setServiceName(e.target.value)}
                    id="name"
                    label="name"
                    fullWidth
                    variant="outlined"
                  />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                  id="outlined-multiline-static"
                  label="Durataion( in minutes)"
                  multiline
                  fullWidth
                  
                  
                />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                    autoFocus
                    margin="dense" 
                    id="price"
                    label="Price"
                    fullWidth
                    variant="outlined"
                  />
                    </Grid>
                    
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <div className="d-flex w-100 justify-content-between" >
                    <div className="dd">
                    <Button onClick={handleClickClose}>Cancel</Button>
                    </div>
                    
                    <div className="d">
                  
                  <Button type='submit' onClick={(e)=>handleServiceCreation(e)} >Create</Button>
                  </div>
                  </div>
                </DialogActions>
                </form>
              </Dialog>
            
        <Grid item lg={7}>
          <div className="selected_services ">
          <div className="m-2">

          

            {selectedServices.map((service)=>{
                return (
                
                <Chip className="m-1" key={service.id} label={service.name} />
                )
            })}
            </div>
          
          </div>
        </Grid>
        <Grid item lg={5}>
        <div className="services_toolbar ">
        <Autocomplete
          clearOnEscape
          autoComplete
          filterSelectedOptions
          multiple
          getOptionLabel={option => option.name}
          onChange={(event, value) =>
            {
              console.log(value)
              return(setselectedServices(value))}}
          onInputChange={(event, value) =>console.log(event, value)}
          id="combo-box-demo"
          options={serviceArray?serviceArray:[]}
          sx={{ width: 300 }}
          renderInput={(params) =>{ 
            
            return( <TextField {...params} value="" label="Search Services here..." />)}}
          />
          <p className="mt-3" style={{color: '#91a5b2'}}>Is there a service that isn't listed? <span onClick={()=> setopenDialog(true)} style={{color: '#ffce45',textDecoration:'underline',cursor:'pointer'}}>create it!</span></p>
            <Button onClick={() =>setPageOne(false)}>Configure Services</Button>
        </div> 
        </Grid>
      </Grid>

  )
}

const ConfigureServices = ({setPageOne,selectedServices,setselectedServices}) =>{

  const {user} = React.useContext(AuthContext)

  const columns =[
    
    {
      name: 'Service',
      selector: (row) => row.name,
     

  },
    

  {
    name: 'Price',
    selector: (row) => row.default_price,


},
{
    name: 'Estimated Time',
    selector: (row) => row.default_duration + ' minutes',


},
  
    
  

  ]
    createTheme('dark', {
    text: {
      primary: '#ffff',
      secondary: '#ffce45',
    },
    background: {
      default: '#121212',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#515151',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');




  const [editService,setEditService] = React.useState({id:'',name:'',default_price:'',default_duration:''})

  const handleEditing = (row,event) => {
   
    handleClickOpen()
    setEditService({id:row.id,name:row.name,default_price:row.default_price,default_duration:row.default_duration})


  }

  const [openDialog, setopenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setopenDialog(true);
  };

  const handleClickClose = () => {
    setopenDialog(false);
  };

  const handleServicesSave =  async()=>{

    let formData = {shopOwner:user.user_id,selectedServices:selectedServices}

    try {
     
      const response = await axios.post(`http://127.0.0.1:8000/api/create_shop_services`, formData )
     
      if(response.status === 200){
        
        console.log('kya bat hei');
       
      
      }
      
    }catch (error) {
      console.log(error)
    }
  }


  

  const handleDialogSave = ()=>{

    setselectedServices(selectedServices.map(service =>
      {
      if(service.id === editService.id){
        return {id:editService.id,name:editService.name,default_price:editService.default_price,default_duration:editService.default_duration}
      }
      return service
    }))
    
    setEditService({id:'',name:'',default_price:'',default_duration:''})
    setopenDialog(false);
  }

  



  return(
    
    <Grid container justifyContent="center"
            alignItems="center" spacing={0}>
          <ServiceUpdator openDialog={openDialog} 
          handleClickClose={handleClickClose} editService={editService} setEditService={setEditService} handleDialogSave={handleDialogSave}  />
        <Grid item lg={7}>
        <div className="container ">
          <DataTable theme="dark"  highlightOnHover subHeader 
          onRowClicked={(row, event) => handleEditing(row,event)}  
        fixedHeader fixedHeaderScrollHeight='400px' columns={columns} pagination data={selectedServices}/>
    </div>
        </Grid>
        <Grid item lg={5}>
        <div className="services_toolbar ">
        <h3 className='text-light'>Click on services to edit</h3>
        <Button onClick={handleServicesSave}>Save</Button>
            <Button onClick={()=>setPageOne(true)}>Go Back</Button>
        </div> 
        </Grid>
      </Grid>
      

  )
}

export default function Tags() {

  const [pageOne,setPageOne] = React.useState(true)
  const [selectedServices, setselectedServices] = React.useState([])

  return (
    <div className="service_selector">
    <ThemeProvider  theme={theme}>
      
      {pageOne?<SelectServices selectedServices={selectedServices} setselectedServices={setselectedServices} setPageOne={setPageOne} />
      :<ConfigureServices selectedServices={selectedServices} setselectedServices={setselectedServices} setPageOne={setPageOne} />}
      
    
    </ThemeProvider>
    </div>
  );
}





export const ServiceCreator = () => {
  return (
    <div>
      
    </div>
  )
}



export const ServiceUpdator = ({openDialog,handleClickClose,editService,setEditService,handleDialogSave}) => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  return (
    <div>
                      <Dialog
                
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickClose}
                aria-describedby="alert-dialog-slide-description"
              >
               
                <DialogTitle>{"Edit Service Here"}</DialogTitle>
                <DialogContent>
                  {/* <DialogContentText style={{float: 'right'}} id="alert-dialog-slide-description">
                  Edit Your Services
                  </DialogContentText> */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                    autoFocus
                    margin="dense"
                    disabled
                    id="name"
                    label="name"
                    value={editService.name}
                    fullWidth
                    variant="outlined"
                  />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                  id="outlined-multiline-static"
                  label="Durataion( in minutes)"
                  onChange={(e)=>setEditService(prev=>{
                    return({...prev,default_duration:e.target.value})
                  })}
                  value={editService.default_duration}
                  multiline
                  fullWidth
                  
                  
                />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                    autoFocus
                    margin="dense" 
                    id="price"
                    label="Price"
                    onChange={(e)=>setEditService(prev=>{
                      return({...prev,default_price:e.target.value})
                    })}
                  value={editService.default_price}
                    fullWidth
                    variant="outlined"
                  />
                    </Grid>
                    
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <div className="d-flex w-100 justify-content-between" >
                    <div className="dd">
                    <Button onClick={handleClickClose}>Cancel</Button>
                    </div>
                    
                    <div className="d">
                  
                  <Button onClick={handleDialogSave}>Save it</Button>
                  </div>
                  </div>
                </DialogActions>
              </Dialog>
      
    </div>
  )
}





