
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import DataTable,{ createTheme } from 'react-data-table-component'
import {Button, ClickAwayListener, Grid, TextField} from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const Swal = require('sweetalert2')

function Services() {


  createTheme('solarized', {
    text: {
      primary: '#ffff',
      secondary: '#ffce45',
    },
    background: {
      default: '#1e1e1e',
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

  const [services,setServices] = useState([])
  const [service,setService] = useState({})
  const [toCreate,setToCreate] = useState(false)
  


  const navigate = useNavigate()
  const getServices =  async() =>{
    try {

      const response = await axios.get("http://127.0.0.1:8000/api/servicesView")
      
   
    setServices(response.data)
    setOpen(false)
    }catch (error) {
      console.log(error)
    }
  }

  

  const columns =[
    {
      name: 'Id',
      sortable: true,
      selector: (row) => row.id,

  },
    {
      name: 'Name',
      selector: (row) => row.name,
     

  },
    
    {
      name: 'Duration',
      selector: (row) => row.default_duration,

  },
  {
    name: 'Charge',
    selector: (row) => row.default_price,



},{ name: 'Edit',
cell: (row) => (
       <Button className="quiffbtn" color="warning" onClick={() =>handleModalOpen(row.id)}  variant="outlined">Edit</Button>
)
},{ name: 'Delete',
cell: (row) => (
 
      <Button className="quiffbtn" color="error" onClick={() =>handleDeleteClick(row.id)}  variant="outlined">Delete</Button>
)

  
}
    
  

  ]

  useEffect(() => {
    getServices();
  
    
  }, [])
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const [open, setOpen] = React.useState(false);
  const handleModalOpen = 



    async(id) =>{
      console.log(id)
      try {
        setOpen(true);  
        const response = await axios.get(`http://127.0.0.1:8000/api/servicesManagement/${id}`)  
        setService(response.data)
        console.log(response.data)
           
      }catch (error) {
        console.log(error)
      }
    }
    const handleModalsubmit = async() => {

      if(toCreate){

        try {
          
          await axios.post(`http://127.0.0.1:8000/api/serivicesView`, service)  
          setService({})
          getServices()
          
             
        }catch (error) {
          console.log(error)
        }

      }else{

        try {
          
          await axios.put(`http://127.0.0.1:8000/api/servicesManagement/${service.id}`, service)  
          setService({})
          getServices()
          
             
        }catch (error) {
          console.log(error)
        }

      }
      

    }
    const handleDeleteClick = (id) => {
      Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6 ',
          confirmButtonText: 'Yes!'
        }).then(async(result) => {
          if (result.isConfirmed) {
            await axios.delete(`http://127.0.0.1:8000/api/servicesManagement/${id}`, service).then(() => {
              Swal.fire(
                'Done!',
                'Slot Deleted Successfully!',
                'success'
              ).then(() => {
                getServices()
              })
            })  
            
          }
        })
  }
 
    


    
  
  
  const handleModalClose = () =>{ 
    setToCreate(false)
    setOpen(false)
    setService({})
  
  };


  return (
    
    <div className="container ">
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {toCreate?
          <Typography id="modal-modal-title-forCreate" className="mb-5" variant="h6" component="h2">
          Create New Service!
         </Typography>:
          <Typography id="modal-modal-title-forEdit" className="mb-5" variant="h6" component="h2">
           Edit Here!
          </Typography>
          }
          <Grid container spacing={2}>
              <Grid  item xs={12}>
              <TextField id="serviceName" label="Name" variant="outlined" onChange={(e)=>setService((prev)=>{ return{...prev,name:e.target.value} })} value={service.name} />
              </Grid>
              <Grid item xs={12}>
              <TextField id="serviceDuration" label="Duration" onChange={(e)=>setService((prev)=>{ return{...prev,default_duration:e.target.value} })} value={service.default_duration} variant="outlined" />
              </Grid>
              <Grid item xs={12}>
              <TextField id="serviceCharge" label="Charge" onChange={(e)=>setService((prev)=>{ return{...prev,default_price:e.target.value} })} value={service.default_price} variant="outlined" />
              </Grid>
              <Grid item xs={12}>
              <Button className="quiffbtn" onClick={handleModalsubmit} variant="outlined">Save</Button>
              </Grid>
            </Grid>
        </Box>
      </Modal>
      <DataTable theme="solarized" title="Services Management" highlightOnHover subHeader subHeaderComponent={
        <Button className="quiffbtn" color="info" onClick={()=>{
          setToCreate(true)
          setOpen(true)}} variant="outlined">Add New+</Button>
      } 
        
       fixedHeader fixedHeaderScrollHeight='400px' columns={columns} pagination data={services}/>
    </div>
  )
}

export default Services
