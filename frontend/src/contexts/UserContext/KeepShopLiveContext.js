import React, { createContext, useState } from 'react'

const KeepShopLive = createContext()
export default KeepShopLive

export const  KeepShopLiveProvider = ({children}) => {

    const [shopisLive, setShopisLive] = useState(0)

    let contextData = {
        shopisLive: shopisLive,
        setShopisLive: setShopisLive
    
    }
    return (
        <KeepShopLive.Provider value={contextData} >
            {children}
        </KeepShopLive.Provider>
    )
}


