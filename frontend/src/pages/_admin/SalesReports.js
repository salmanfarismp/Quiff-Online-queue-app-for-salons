
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import DataTable,{ createTheme } from 'react-data-table-component'
import {Button} from '@mui/material';

function SalesReports() {


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

  const navigate = useNavigate()
  const getUsers =  () =>{
    try {

      const response = [
      
      // {id:2,name:'Dessert',type:'Hair Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'6months',},
      // {id:3,name:'CutMyHair',type:'Hair Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'6months'},
      // {id:4,name:'GoodHairDays',type:'Hair Salon',gender:'Female',locality:'padamugal',state:'kerala',Plan:'3months'},
      // {id:5,name:'BeautifyMe',type:'Beauty Salon',gender:'Female',locality:'padamugal',state:'kerala',Plan:'3months'},
      // {id:6,name:'Hairy',type:'Hair Salon',gender:'Female',locality:'padamugal',state:'kerala',Plan:'3months'},
      // {id:47,name:'Yox',type:'Beauty Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'3months'},
      // {id:28,name:'Handsome',type:'Beauty Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'6months'},
      // {id:39,name:"Here's a ",type:'Beauty Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'3months'},
      // {id:4088,name:'GlamOn',type:'Hair Salon',gender:'Mixed',locality:'padamugal',state:'kerala',Plan:'6months'},
      // {id:46,name:'Golden',type:'Beauty Salon',gender:'Mixed',locality:'padamugal',state:'kerala',Plan:'3months'},
      // {id:44,name:'GlamUp',type:'Beauty Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'12months'},
      // {id:42,name:'Gloww',type:'Beauty Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'6months'},
      // {id:43,name:'Balan',type:'Hair Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'12months'},

    ]
    
    setFilerData(response)
    setUsers(response)
      
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

},
  {
    name: 'Plan',
    selector: (row) => row.Plan,

},{ name: 'Owner',
cell: (row) => (
       <Button className="quiffbtn" onClick={() =>navigate(`/admin/home/shops/owner/${row.id}`) } variant="outlined">Owner</Button>
)
},{ name: 'Manage',
cell: (row) => (
 
      <Button color="info" className="quiffbtn" onClick={() =>navigate(`/admin/home/shops/${row.id}`)} variant="outlined">View</Button>
)

  
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
        return user.name.toLowerCase().match(search.toLowerCase())
      })
      console.log(result)
      setFilerData(result)
    
    
    
  }, [search,users])
  
  


  return (
    <div className="container ">
      <DataTable theme="solarized" title="Sales Reports" highlightOnHover subHeader subHeaderComponent={
        <input type="text" className="quiffSearch"  placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
      } fixedHeader fixedHeaderScrollHeight='400px' columns={columns} pagination data={filerData}/>
    </div>
  )
}

export default SalesReports
