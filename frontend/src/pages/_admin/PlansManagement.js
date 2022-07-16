
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import DataTable,{ createTheme } from 'react-data-table-component'
import {Button, ClickAwayListener, Grid, TextField} from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const Swal = require('sweetalert2')

function Plans() {


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

  const [plans,setPlans] = useState([])
  const [plan,setPlan] = useState({})
  const [toCreate,setToCreate] = useState(false)
  


  const navigate = useNavigate()
  const getPlans =  async() =>{
    try {

      const response = await axios.get("http://127.0.0.1:8000/api/plansView")
      
   
    setPlans(response.data)
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
    name: 'Description',
    selector: (row) => row.description,

},
    
    {
      name: 'Duration',
      selector: (row) => `${row.duration} months`,

  },
  {
    name: 'Price',
    selector: (row) => row.price,



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
    getPlans();
  
    
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
        const response = await axios.get(`http://127.0.0.1:8000/api/plansManagement/${id}`)  
        setPlan(response.data)
        console.log(response.data)
           
      }catch (error) {
        console.log(error)
      }
    }
    const handleModalsubmit = async() => {

      if(toCreate){

        try {
          
          await axios.post(`http://127.0.0.1:8000/api/plansView`, plan)  
          setPlan({})
          getPlans()
          
             
        }catch (error) {
          console.log(error)
        }

      }else{

        try {
          
          await axios.put(`http://127.0.0.1:8000/api/plansManagement/${plan.id}`, plan)  
          setPlan({})
          getPlans()
          
             
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
            await axios.delete(`http://127.0.0.1:8000/api/plansManagement/${id}`, plan).then(() => {
              Swal.fire(
                'Done!',
                'Plan Deleted Successfully!',
                'success'
              ).then(() => {
                getPlans()
              })
            })  
            
          }
        })
  }
 
    


    
  
  
  const handleModalClose = () =>{ 
    setToCreate(false)
    setOpen(false)
    setPlan({})
  
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
          Create New Plan!
         </Typography>:
          <Typography id="modal-modal-title-forEdit" className="mb-5" variant="h6" component="h2">
           Edit Here!
          </Typography>
          }
          <Grid container spacing={2}>
              <Grid  item xs={12}>
              <TextField id="planName" label="Name" variant="outlined" onChange={(e)=>setPlan((prev)=>{ return{...prev,name:e.target.value} })} value={plan.name} />
              </Grid>
              <Grid  item xs={12}>
              <TextField id="planDescription" label="Description" variant="outlined" onChange={(e)=>setPlan((prev)=>{ return{...prev,description:e.target.value} })} value={plan.description} />
              </Grid>
              <Grid item xs={12}>
              <TextField id="planDuration" label="Duration" onChange={(e)=>setPlan((prev)=>{ return{...prev,duration:e.target.value} })} value={plan.duration} variant="outlined" />
              </Grid>
              <Grid item xs={12}>
              <TextField id="planPrice" label="Price" onChange={(e)=>setPlan((prev)=>{ return{...prev,price:e.target.value} })} value={plan.price} variant="outlined" />
              </Grid>
              <Grid item xs={12}>
              <Button className="quiffbtn" onClick={handleModalsubmit} variant="outlined">Save</Button>
              </Grid>
            </Grid>
        </Box>
      </Modal>
      <DataTable theme="solarized" title="Slots Management" highlightOnHover subHeader subHeaderComponent={
        <Button className="quiffbtn" color="info" onClick={()=>{
          setToCreate(true)
          setOpen(true)}} variant="outlined">Add New+</Button>
      } 
        
       fixedHeader fixedHeaderScrollHeight='400px' columns={columns} pagination data={plans}/>
    </div>
  )
}

export default Plans
