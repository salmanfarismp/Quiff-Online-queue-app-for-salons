import React, { useEffect, useState } from 'react'
import './Otp.css'

function Otp({handleOtpVal}) {

    const [otpInput,setOtpInput] = useState({ 
        otp1: null, otp2: null, otp3: null, otp4: null, otp5: null,otp6: null,
    })

    useEffect(() => {
      

        if(otpInput.otp1 !== null && otpInput.otp2 !== null && otpInput.otp3 !== null 
        && otpInput.otp4 !==null && otpInput.otp5 !==null && otpInput.otp6 !==null ) {

            const otpValue = otpInput.otp1 + otpInput.otp2 + otpInput.otp3 + otpInput.otp4 + otpInput.otp5 + otpInput.otp6
            console.log(otpValue)
            handleOtpVal(otpValue)
        }else{
            handleOtpVal(null)
        }
    
     
    }, [otpInput])
    

    const inputfocus = (elmnt)=>{

        
        
         if(elmnt.target.value !==  ''){
            console.log("next");
           
              const next = elmnt.target.tabIndex;
              if (next < 6) {
                elmnt.target.form.elements[next].focus()
              }
        }

        

    }

  return (
      <div className="d">
          <form >
            <div className="otp_container">
                <input 
                    type="number"
                    onFocus={()=> setOtpInput(
                            prev => {
                                return {...prev,otp1:null} 
                            }        
                        )}
                    name="otp1"
                    min="0"
                    max="9" 
                    autocomplete="off" 
                    className="otp_input" 
                    onKeyUp={e => inputfocus(e)}
                    onChange={
                        e => setOtpInput(
                            prev => {
                                if(e.target.value >=0 && e.target.value <=9){

                                    return {...prev,otp1:e.target.value} 
                                }else{
                                    return{...prev}
                                }
                            }
                        )
                    } 
                    value={otpInput.otp1}
                      
                    
                    tabIndex="1"  
                    
                />
                <input 
                    type="number"
                    onFocus={()=> setOtpInput(
                            prev => {
                                return {...prev,otp2:null} 
                            }        
                        )}

                     
                    name="otp2" 
                    min="0"
                    max="9"
                    autocomplete="off" 
                    className="otp_input" 
                    onKeyUp={e => inputfocus(e)}
                    onChange={
                        e => setOtpInput(
                            prev => {
                                if(e.target.value >=0 && e.target.value <=9){

                                    return {...prev,otp2:e.target.value} 
                                }else{
                                    return{...prev}
                                }
                            }
                        )
                    } 
                    value={otpInput.otp2} 
                    tabIndex="2"  
                    
                />
                <input 
                    type="number"
                    onFocus={()=> setOtpInput(
                            prev => {
                                return {...prev,otp3:null} 
                            }        
                        )}

                     
                    name="otp3" 
                    min="0"
                    max="9"
                    autocomplete="off" 
                    className="otp_input" 
                    onKeyUp={e => inputfocus(e)}
                    onChange={
                        e => setOtpInput(
                            prev => {
                                if(e.target.value >=0 && e.target.value <=9){

                                    return {...prev,otp3:e.target.value} 
                                }else{
                                    return{...prev}
                                }
                            }
                        )
                    } 
                    value={otpInput.otp3} 
                    tabIndex="3"  
                    
                />
                <input 
                    type="number"
                    onFocus={()=> setOtpInput(
                            prev => {
                                return {...prev,otp4:null} 
                            }        
                        )}

                     
                    name="otp4" 
                    min="0"
                    max="9"
                    autocomplete="off" 
                    className="otp_input" 
                    onKeyUp={e => inputfocus(e)}
                    onChange={
                        e => setOtpInput(
                            prev => {
                                if(e.target.value >=0 && e.target.value <=9){

                                    return {...prev,otp4:e.target.value} 
                                }else{
                                    return{...prev}
                                }
                            }
                        )
                    } 
                    value={otpInput.otp4} 
                    tabIndex="4"  
                    
                />
                <input 
                    type="number"
                    onFocus={()=> setOtpInput(
                            prev => {
                                return {...prev,otp5:null} 
                            }        
                        )}

                     
                    name="otp5" 
                    min="0"
                    max="9"
                    autocomplete="off" 
                    className="otp_input" 
                    onKeyUp={e => inputfocus(e)}
                    onChange={
                        e => setOtpInput(
                            prev => {
                                if(e.target.value >=0 && e.target.value <=9){

                                    return {...prev,otp5:e.target.value} 
                                }else{
                                    return{...prev}
                                }
                            }
                        )
                    } 
                    value={otpInput.otp5} 
                    tabIndex="5"  
                    
                />
                <input 
                    type="number"
                    onFocus={()=> setOtpInput(
                            prev => {
                                return {...prev,otp6:null} 
                            }        
                        )}

                     
                    name="otp6" 
                    min="0"
                    max="9"
                    autocomplete="off" 
                    className="otp_input" 
                    onKeyUp={e => inputfocus(e)}
                    onChange={
                        e => setOtpInput(
                            prev => {
                                if(e.target.value >=0 && e.target.value <=9){

                                    return {...prev,otp6:e.target.value} 
                                }
                                else{
                                    return{...prev}
                                }
                            }
                        )
                    } 
                    value={otpInput.otp6} 
                    tabIndex="6"  
                    
                />
            </div>
          </form>
      </div>
  )
}

export default Otp
