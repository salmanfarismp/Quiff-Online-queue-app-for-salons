import { Button, Dialog, DialogActions, DialogContent,  DialogTitle, Grid, Paper, Slide, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import './ShopOwnerDetails.css'
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));





function ShopOwnerDetailes() {
  const {id} = useParams()
  const {is_from} = useParams()
  const navigate = useNavigate()

  const [owner,setowner] = React.useState({username:'',email:'',phone_number:''});

  const getOwner = async () =>{
    try {

      const response = await axios.get(`http://127.0.0.1:8000/api/get_owner_of_shop/${id}`)
      if(response.status === 200){
        setowner(response.data)
      }
      
    }catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    
    getOwner()
  
    
  }, [])

  const handleBlocking = async()=>{

    if(owner.is_active){
      Swal.fire({
        title: `Do You want to Block ${owner.username} ? \n `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6 ',
        confirmButtonText: 'Yes!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          await axios.put(`http://127.0.0.1:8000/api/customersManagement/${owner.id}`, {"is_active": false}).then(() => {
            Swal.fire(
              'Done!',
              'Blocked User Successfully!',
              'success'
            ).then(() => {
              getOwner()
            })
          })         
        }
      })    
    }else{

      Swal.fire({
        title: `Do You want to unBlock ${owner.username} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6 ',
        confirmButtonText: 'Yes!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          await axios.put(`http://127.0.0.1:8000/api/customersManagement/${owner.id}`, {"is_active": true}).then(() => {
            Swal.fire(
              'Done!',
              'Unblocked User Successfully!',
              'success'
            ).then(() => {
              getOwner()
            })
          })         
        }
      })    

    }
  }

  



  return (
    <div className="ownerDetails">
      <Paper sx={{
                    p: 2,
                    m:5,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 380,
                    width: 560,
                  }} >
                     <Grid container className="mt-3" spacing={2}>
            <Grid item xs={12}>
            <TextField
            autoFocus
            margin="dense"
            disabled
            id="name"
            label="UserName"
            value={owner?.username}
            fullWidth
            variant="outlined"
          />
            </Grid>
            <Grid item xs={12}>
            <TextField
          id="outlined-multiline-static"
          label="Email Address"
          disabled
          value={owner?.email}
          multiline
          fullWidth
          
          
        />
            </Grid>
            <Grid item xs={12}>
            <TextField
            autoFocus
            margin="dense" 
            id="name"
            label="Phone Number"
            disabled
            value= {owner?.phone_number}
            fullWidth
            variant="outlined"
          />
            </Grid>
            
          </Grid>
                
      <div style={{alignItems: 'end',height: '100%'}} className="d-flex  w-100 justify-content-between" >
            <div className="dd">
            {(is_from ==='shop_requests')?<div className="you">
            <span onClick={()=>navigate('/admin/home/shop_requests')} >
              <p className='mb-0' style={{cursor:'pointer'}}>Back</p>
              </span>
              </div>: <div className="me">
              <span onClick={()=>navigate('/admin/home/shops')} >
              <p className='mb-0' style={{cursor:'pointer'}}>Back</p>
              </span>
                </div>}
    
            </div>
            
            <div className="d-flex">
              {owner.is_active?
              <Button onClick={handleBlocking}>Block</Button>:
              <Button onClick={handleBlocking}>UnBlock</Button>
            }
          
          {(is_from ==='shop_requests')?<div className="you">
              <Button onClick={()=>navigate('/admin/home/shop_requests')} >Save</Button>
              </div>: <div className="me">
              <Button variant="contained" onClick={()=>navigate('/admin/home/shops')} className="quiffbtn float-right">Save</Button>
              </div>}
          </div>
          </div>
      </Paper>
    </div>
  )
}

export default ShopOwnerDetailes
