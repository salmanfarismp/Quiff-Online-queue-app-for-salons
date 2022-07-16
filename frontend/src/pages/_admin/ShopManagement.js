import { Box, Button, CircularProgress, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

function ShopManagement() {
  const {shopId} = useParams()
  const {is_from} = useParams()
  console.log(is_from)
  const [loading,setloading] = useState(false)
  const [shop,setshop] = React.useState({name:'',type:'',complete_address:'',
  fullname:'',gender:'',latitude:'',longitude:'',locality:'',
  pin_code:'',state:'',nation:'',contact_number:'',opening_time:'',closing:'',
shop_certificate:'',main_image:''});

const navigate = useNavigate()

  const handleShopApproval = async () =>{
    try {
      setloading(true)
      const response = await axios.put(`http://127.0.0.1:8000/api/approve_shop/${shopId}`)
      setloading(false)
      if(response.status === 200){
        
        Swal.fire({

  
          title: 'Done!',
          icon: 'success',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {

            navigate('/admin/home/shop_requests')

      
      }})}
      if(response.status === 404){
        alert(response.data)
      }
      
    }catch (error) {
      console.log(error)
    }
  }

  const getshop = async () =>{
    try {
      setloading(true)
      const response = await axios.get(`http://127.0.0.1:8000/api/get_shop/${shopId}/`)
      setloading(false)
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

  
  return (
    <div>
      <Paper elevation={3} className='m-3 p-3' >
        <h3 className='m-2 ' >SHOP DETAILS</h3>
        {loading?<Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>:
        <Grid container spacing={3}>
          <Grid item  xs={12} sm={6}>
          <Stack spacing={2}>
           
            <TextField
              
              id="shopName"
              name="shopName"
              label="Shop Name"
             disabled
              fullWidth
              value={shop?.name}
              
              variant="standard"
            />
            <TextField
              
              id="shortDescription"
              name="shortDescription"
              disabled
              label="Short Description"
              fullWidth
              value={shop?.fullname}
              variant="standard"
            />
             <TextField
              
              id="address"
              name="address"
              disabled
              label="Complete Address"
              fullWidth
              value={shop?.complete_address}
              variant="standard"
            />
          </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
          <div className="d-flex align-items-center justify-content-center w-100">
                  <img src={shop?.main_image} alt="icon"  className="  shop_icon_imgs docerops" />
                </div>
                
          </Grid>
         
          <Grid item xs={12}>
         
         
              <Box sx={{ mt: 4,mb:4 }}>
              <Typography component="h6" className='mb-2' variant="h6"  >Shop address details</Typography>

              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                
                <TextField
                  
                  id="Latitude"
                  name="Latitude"
                  type="number"
                  
                  disabled
                  label="Latitude"
                  fullWidth
        
                  value={shop?.latitude}
                  autoComplete="shipping country"
                  variant="standard"
                />
              
              </Grid>
              <Grid item xs={12} sm={6}>
               
                <TextField
                  
                  id="Longitude"
                  name="Longitude"
                 
                
                  disabled
                  label="Longitude"
                  type="number"
                  fullWidth
                  
                  value={shop?.longitude}
                  autoComplete="shipping country"
                  variant="standard"
                />
              
              </Grid>
              </Grid>
              
              <Grid container className="mt-3" spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="Country"
                  name="Country"
              
                  label="Country"
                 
                  value={shop?.nation}
                  disabled
                  fullWidth
                  
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="Pincode"
                  name="Pincode"
              
                  label="Pincode"
               
                  value={shop?.pin_code}
                  disabled
                  fullWidth
                  
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="Place"
                  name="Place"
                  label="Place"
                 
                  value={shop?.locality}
                  disabled
                  fullWidth
                  
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                
                  id="State"
                  name="State"
                  label="State"
                  value={shop?.state}
                  disabled
                  fullWidth
                  
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
            <TextField
              
              id="shopMobile"
              name="shopMobile"
        
              label="Mobile number at shop"
              disabled
              value={shop?.contact_number}
              
              type="number"
              fullWidth
              
              variant="standard"
            />
          
          </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>  
              <Box sx={{ mt: 4,mb:4 }}>
              <Typography component="h6" className='mb-2' variant="h6"  >Shop Operational details & License</Typography>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  
                  id="gender"
                  name="gender"

                  
                  disabled
                  label="Type"
                  fullWidth
        
                  value={shop?.type}
                  autoComplete="shipping country"
                  variant="standard"
                />
                 <TextField
                  
                  id="gender"
                  name="gender"
                 
                
                  disabled
                  label="Gender"

                  fullWidth
                  
                  value={shop?.gender}
                  autoComplete="shipping country"
                  variant="standard"
                />
                 <TextField
                  id="time"
                  label="Opens at"
                  type="time"
                  fullWidth
                  value={shop?.opening_time}
                  disabled
                  
                  variant="standard"
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  // inputProps={{
                  //   step: 300, // 5 min
                  // }}
                  // sx={{ width: 150 }}
                />
              
              <TextField
                  id="time"
                  label="closes at"
                  type="time"
                  value={shop?.closing_time}
                  disabled
                  fullWidth
                  
                  variant="standard"
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  // inputProps={{
                  //   step: 300, // 5 min
                  // }}
                  // sx={{ width: 150 }}
                />
              </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="d-flex align-items-center justify-content-center w-100">
                  <img src={shop?.shop_certificate} alt="icon"  className="  shop_icon_imgs docerops" />
                </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div className="d-flex w-100 justify-content-between container mt-3">
              {(is_from ==='shop_requests')?<div className="you">
              <Button onClick={()=>navigate('/admin/home/shop_requests')} className="float-right">Go Back</Button>
              </div>: <div className="me">
              <Button onClick={()=>navigate('/admin/home/shops')} className="float-right">Go Back</Button>
                </div>}

                {(is_from ==='shop_requests')?<div className="you">
              <Button variant="contained" onClick={handleShopApproval}  className=" quiffbtn float-right">Approve</Button>
              </div>: <div className="me">
              <Button variant="contained" onClick={()=>navigate('/admin/home/shops')} className="quiffbtn float-right">Save</Button>
              </div>}
            </div>
          </Grid>
              </Grid>
              </Box>
          </Grid>
        </Grid>
      }
      </Paper>
    </div>
  )
}

export default ShopManagement 