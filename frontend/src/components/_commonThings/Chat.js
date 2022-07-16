import React, { useEffect, useMemo, useState } from 'react'
import {Avatar,Button, Card,TextField, CardHeader} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {apiBaseURL} from '../../constants/Constants'
// import WebSocket from 'ws';






const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        mode:'dark'
        
    }
}
    
);

function Chat() {

  const [roomName,setRoomName] =useState('salman')
  const [messages,setMessages] = useState([])
  const [Inpmessage,setMessage] = useState('')

  
  const ws =  useMemo(()=>{ return new  WebSocket(`ws://${apiBaseURL}/ws/chat/` + `${roomName}` + '/')},[roomName] );
  

 useEffect(() => {

  ws.onopen = e => {
    console.log('open', e.data)
  }
  ws.onmessage = e => {
    const dataFromServer = JSON.parse(e.data);
    console.log('got replay!', dataFromServer.type);
    if(dataFromServer){
      setMessages(prev=>{
        return [...prev,{msg:dataFromServer.message,name:dataFromServer.username}]
      })
    }
  }

 
   
  
 }, [])
 

  

  // ws.on('message', function message(data) {
  //   console.log('received: %s', data);
  // });
  const handleMsg = ()=>{
    ws.send(JSON.stringify({
      type: 'message',
      message:Inpmessage,
      username:'michu'

    }), )
      setMessage('')
  }

 
  return (


    <div className="chat">
        <ThemeProvider  theme={theme}>
         <div className="chats">

<Card className="chat_card " >
  {messages.map(message =>
   
    <CardHeader className="text-light"
      avatar={
        <Avatar >
          R
    </Avatar>
      }
      title={message.name}
      subheader={message.msg}
    />
    )}
  </Card>
  
 
 
  
  



  
</div>
            
   
      <div className="d-flex p-2 justify-content-between">

    <TextField
      id="outlined-helperText"
      label="chat here"
     style={{width: '100%'}}
      variant="outlined"
      value={Inpmessage}
      
      
      onChange={e => {
        setMessage(e.target.value);
      }}
    />
    <Button
      // type="submit"
      variant="contained"
      color="primary"
      onClick={handleMsg}
     
    >
      <SendIcon/>
      </Button>
      </div>
  
  </ThemeProvider>
          </div>
   
  )
}

export default Chat
