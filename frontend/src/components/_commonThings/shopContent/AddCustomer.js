import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

function AddCustomer({handleAddtoQueuebyShop,shopId, queue, byShop,handleJoinQueue}) {

  
    createTheme('solarized', {
        text: {
          primary: '#ffff',
          secondary: '#ffce45',
        },
        background: {
          default: '#212529',
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
      const [selectedServices,setSelectedServices] = useState(null)
      const getServices = async () =>{
        try {
    
        const response = await axios.get(`http://127.0.0.1:8000/api/shop_services/${shopId}/`)
        setServices(response.data)
          
        }catch (error) {
          console.log(error)
        }
      }
    
      const columns =[
    
        {
            name: 'No.',
            selector: (row) => services.indexOf(row) + 1,
      
        },
        
        {
          name: 'Service',
          selector: (row) => row.service.name,
         
    
      },
        
        {
          name: 'Duration',
          selector: (row) => row.duration,
    
      },
      {
        name: 'Price',
        selector: (row) => row.price,
    
    
      
    },
        
      
    
      ]
    
      useEffect(() => {
        getServices();
      
        
      }, [])

     const handleRowChange = (state, row) =>{
      setSelectedServices(state.selectedRows);
     }
    
    
    
      return (
        <div className="container mt-1 ">
          <DataTable theme="solarized" highlightOnHover title="Select Services" selectableRows 
          onSelectedRowsChange={handleRowChange}
           fixedHeader fixedHeaderScrollHeight='400px' columns={columns} pagination data={services}/>
           {byShop?
            <Button className='quiffthemebtn' onClick={()=>{
            
              handleAddtoQueuebyShop(selectedServices)
  
            }} style={{backgroundColor: 'transparent'}} variant="contained">Add to queue</Button>:
            <Button className='quiffthemebtn' onClick={()=>{
            
              handleJoinQueue(selectedServices)
  
            }} style={{backgroundColor: 'transparent'}} variant="contained">Pay & Join</Button>
           
          }
          
        </div>
      )
  
    
}

export default AddCustomer






  

   