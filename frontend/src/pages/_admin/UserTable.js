
import React, { useEffect, useState } from 'react'
import DataTable,{ createTheme } from 'react-data-table-component'
import {Button} from '@mui/material';
import axios from 'axios'
const Swal = require('sweetalert2')

function UserTable() {


  const handleBlocking = async(row)=>{
    if(row.is_active){

      Swal.fire({
        title: `Do You want to Block ${row.username} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6 ',
        confirmButtonText: 'Yes!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          await axios.put(`http://127.0.0.1:8000/api/customersManagement/${row.id}`, {"is_active": false}).then(() => {
            Swal.fire(
              'Done!',
              'Blocked User Successfully!',
              'success'
            ).then(() => {
              getUsers()
            })
          })         
        }
      })    
    }else{

      Swal.fire({
        title: `Do You want to unBlock ${row.username} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6 ',
        confirmButtonText: 'Yes!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          await axios.put(`http://127.0.0.1:8000/api/customersManagement/${row.id}`, {"is_active": true}).then(() => {
            Swal.fire(
              'Done!',
              'Unblocked User Successfully!',
              'success'
            ).then(() => {
              getUsers()
            })
          })         
        }
      })    

    }
  }


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

  const [users,setUsers] = useState([])
  const [filerData,setFilerData] = useState([])
  const [search,setSearch] = useState("")

  const getUsers =  async() =>{
    try {

      const response  = await axios.get("http://127.0.0.1:8000/api/customersView")
    
    setFilerData(response.data)
    setUsers(response.data)
      
    }catch (error) {
      console.log(error)
    }
  }

  const columns =[
    {
      name: 'UserId',
      selector: (row) => row.id,

  },
    {
      name: 'Username',
      selector: (row) => row.username,
     

  },
    {
      name: 'Phone',
      selector: (row) => row.phone_number,

  },
    {
      name: 'Email',
      selector: (row) => row.email,

  },
    { name: 'Active',
      cell: (row) => {
        if(!row.is_active){
          return (
            <Button className="quiffbtn" color="error" onClick={()=>handleBlocking(row)} size="medium" variant="outlined">Blocked</Button>

          )
        }else{
          return(
            <Button className="quiffbtn" color="success" onClick={()=>handleBlocking(row)} size="medium" variant="outlined">Active</Button>)

        }
      }

        
      }
    
  

  ]

  useEffect(() => {
    getUsers();
  
    
  }, [])
  useEffect(() => {
    console.log('filterData:',filerData,'users:',users)
  
    
  }, [filerData,users])

  useEffect(() => { 
    
    

      const result = users.filter(user => {
        return user.username.toLowerCase().match(search.toLowerCase())
      })
      setFilerData(result)
    
    
    
  }, [search,users])
  
  


  return (
    <div className="container ">
      <DataTable theme="solarized" title="Customers Management" highlightOnHover subHeader subHeaderComponent={
        <input type="text" className="quiffSearch"  placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
      } fixedHeader fixedHeaderScrollHeight='400px' columns={columns} pagination data={filerData}/>
    </div>
  )
}

export default UserTable
