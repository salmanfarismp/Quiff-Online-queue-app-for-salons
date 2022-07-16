
import React, { useEffect, useMemo, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import DataTable,{ createTheme } from 'react-data-table-component'
import {Button} from '@mui/material';
import { positions } from '@mui/system';

function QueueTable({shopId,queue,handleActivate,handleDone,handleRemove}) {


  

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

  const [users,setUsers] = useState([])
  const [filerData,setFilerData] = useState([])
  const [search,setSearch] = useState("")
  
  const navigate = useNavigate()
  const getUsers =  () =>{
    try {

      const response = [
      
      {id:2,name:'nasif',type:'Hair Cut',gender:'13 minutes',locality:'padamugal',state:'kerala',Plan:'6months',},
      {id:3,name:'ramees',type:'shaving',gender:'30 minutes',locality:'padamugal',state:'kerala',Plan:'6months'},
      {id:4,name:'ramees',type:'Hair Cut',gender:'40 minutes',locality:'padamugal',state:'kerala',Plan:'3months'},
      {id:5,name:'break',type:'-------',gender:'40 minutes',locality:'padamugal',state:'kerala',Plan:'3months'},
      {id:6,name:'sadakath',type:'hair cut',gender:'40 minutes',locality:'padamugal',state:'kerala',Plan:'3months'},
      {id:47,name:'rinshid',type:'hair cut',gender:'40 minutes',locality:'padamugal',state:'kerala',Plan:'3months'},
    //   {id:28,name:'Handsome',type:'Beauty Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'6months'},
    //   {id:39,name:"Here's a ",type:'Beauty Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'3months'},
    //   {id:4088,name:'GlamOn',type:'Hair Salon',gender:'Mixed',locality:'padamugal',state:'kerala',Plan:'6months'},
    //   {id:46,name:'Golden',type:'Beauty Salon',gender:'Mixed',locality:'padamugal',state:'kerala',Plan:'3months'},
    //   {id:44,name:'GlamUp',type:'Beauty Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'12months'},
    //   {id:42,name:'Gloww',type:'Beauty Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'6months'},
    //   {id:43,name:'Balan',type:'Hair Salon',gender:'Male',locality:'padamugal',state:'kerala',Plan:'12months'},

    ]
    
    setFilerData(response)
    setUsers(response)
      
    }catch (error) {
      console.log(error)
    }
  }

  const columns =[

    {
        name: 'No.',
        selector: (row) => queue.indexOf(row),
  
    },
    
    {
      name: 'Username',
      selector: (row) => row.customer? row.customer.username : "Anonymous",
     

  },
    
    {
      name: 'Service',
      selector: (row) => row.service.service.name,

  },
  {
    name: 'Time',
    selector: (row) =>{
      console.log(typeof(row.time))
      return row.time.slice(0, 8)
    }
    


  



  
},
{ name: 'Status',
cell: (row) =>
{
  if (queue.indexOf(row) === 0){
   return(
    <>
    {row.is_active?
      <Button color="success"  onClick={() => handleDone(row.id)} className="quiffbtn" variant="outlined">Done</Button>:
      <Button color="secondary" onClick={() => handleActivate(row.id)}className="quiffbtn" variant="outlined">Activate</Button> }
    
    </>
    
   )
  }else{
   return <p className='text-warning'>Waiting</p>
  }  
 
 
 }
},
{ name: 'Remove',
cell: (row) => !row.is_active && <Button color="error" onClick={() => handleRemove(row.id)} className="quiffbtn" variant="outlined">kickout</Button>

  
  
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
    <div className="container mt-1 ">
      <DataTable theme="solarized" highlightOnHover title={<LiveClock/>} subHeader subHeaderComponent={
        <input type="text" className="quiffSearch"  placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
      } fixedHeader fixedHeaderScrollHeight='400px' columns={columns} pagination data={queue}/>
    </div>
  )
}

export default QueueTable


const LiveClock = ()=>{

    
    let time = new Date().toLocaleTimeString();
    const [currentTime,setCurrentTime] = useState(time)

    const updateTime = ()=>{

        time = new Date().toLocaleTimeString();
        setCurrentTime(time);


    }
    setInterval(updateTime,1000)



    return (
        <div>
            {currentTime}
        </div>
    )

}
