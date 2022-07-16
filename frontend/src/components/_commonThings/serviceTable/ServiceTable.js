
// import React, { useEffect, useState } from 'react'
// import {useNavigate} from 'react-router-dom'
// import DataTable,{ createTheme } from 'react-data-table-component'
// import {Button} from '@mui/material';

// function ServiceTable({selectedServices,setselectedServices}) {


//   useEffect(() => {
    
    
//     console.log('selectedServices:',selectedServices);
  
    
//   }, [selectedServices])
  
//   createTheme('solarized', {
//     text: {
//       primary: '#ffff',
//       secondary: '#ffce45',
//     },
//     background: {
//       default: '#121212',
//     },
//     context: {
//       background: '#cb4b16',
//       text: '#FFFFFF',
//     },
//     divider: {
//       default: '#515151',
//     },
//     action: {
//       button: 'rgba(0,0,0,.54)',
//       hover: 'rgba(0,0,0,.08)',
//       disabled: 'rgba(0,0,0,.12)',
//     },
//   }, 'dark');

//   const [users,setUsers] = useState([])
//   const [filerData,setFilerData] = useState([])
//   const [search,setSearch] = useState("")

//   const navigate = useNavigate()
//   const getUsers =  () =>{
//     try {

//       const response = [
      
//       {service:'Hair Cut',type:80,gender:'All',estimatedTime:40},
//       {service:'Shaving ',type:80,gender:'Male',estimatedTime:40},
//       {service:'Hair Styling',type:80,gender:'Female',estimatedTime:40},
//       {service:'Facial',type:100,gender:'All',estimatedTime:40},
//       {service:'Hair Straightening',type:80,gender:'Female',estimatedTime:40},
//       {service:'Hair Massage',type:100,gender:'Male',estimatedTime:40},
      

//     ]
    
//     setFilerData(response)
//     setUsers(response)
      
//     }catch (error) {
//       console.log(error)
//     }
//   }


//   useEffect(() => {
//     getUsers();
  
    
//   }, [])
//   useEffect(() => {
//     console.log('filterData:',filerData,'users:',users)
  
    
//   }, [filerData,users])

//   useEffect(() => { 
    
    

//       const result = users.filter(user => {
//         return user.service.toLowerCase().match(search.toLowerCase())
//       })
//       console.log(result)
//       setFilerData(result)
    
    
    
//   }, [search,users])
  
  


//   return (
    
//   )
// }

// export default ServiceTable
