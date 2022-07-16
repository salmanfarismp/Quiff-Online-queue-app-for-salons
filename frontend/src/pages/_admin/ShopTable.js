
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import DataTable,{ createTheme } from 'react-data-table-component'
import {Button} from '@mui/material';
import axios from 'axios'

function Shops() {


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

  const [shops,setShops] = useState([])
  const [filerData,setFilerData] = useState([])
  const [search,setSearch] = useState("")

  const navigate = useNavigate()
  const getShops = async () =>{
    try {

      const response = await axios.get("http://127.0.0.1:8000/api/shopsView")
    setFilerData(response.data)
    setShops(response.data)
      
    }catch (error) {
      console.log(error)
    }
  }

  const columns =[
    {
      name: 'Id',
      selector: (row) => row.id,

  },
    {
      name: 'Name',
      selector: (row) => row.name,
     

  },
    
    {
      name: 'Type',
      selector: (row) => row.type,

  },
  {
    name: 'Gender',
    selector: (row) => row.gender,

},
  {
    name: 'Locality',
    selector: (row) => row.locality,

},
{
  name: 'State',
  selector: (row) => row.state,

// },
//   {
//     name: 'Plan',
//     selector: (row) => row.plan? row.plan:null,

},{ name: 'Owner',
cell: (row) => (
       <Button className="quiffbtn" onClick={() =>navigate(`/admin/home/shops/owner/shop_management/${row.id}` ) } variant="outlined">Owner</Button>
)
},{ name: 'Manage',
cell: (row) => (
 
      <Button color="info" className="quiffbtn" onClick={() =>navigate(`/admin/home/shops/shop_management/${row.id}`)} variant="outlined">View</Button>
)

  
}
    
  

  ]

  useEffect(() => {
    getShops();
  
    
  }, [])
 

  useEffect(() => { 
    
    

      const result = shops.filter(shop => {
        return shop.name.toLowerCase().match(search.toLowerCase())
      })
      console.log(result)
      setFilerData(result)
    
    
    
  }, [search,shops])
  
  


  return (
    <div className="container ">
      <DataTable theme="solarized" title="Shops Management" highlightOnHover subHeader subHeaderComponent={
        <input type="text" className="quiffSearch"  placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
      } fixedHeader fixedHeaderScrollHeight='400px' columns={columns} pagination data={filerData}/>
    </div>
  )
}

export default Shops
