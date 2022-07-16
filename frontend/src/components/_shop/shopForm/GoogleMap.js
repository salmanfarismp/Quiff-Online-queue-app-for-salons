// import React from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

// const options = {
  
// }

// function MyComponent() {
//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: "YOUR_API_KEY" // ,
//     // ...otherOptions
//   })

//   const RenderMap = () => {
//     // wrapping to a function is useful in case you want to access `window.google`
//     // to eg. setup options or create latLng object, it won't be available otherwise
//     // feel free to render directly if you don't need that
//     const onLoad = React.useCallback(
//       function onLoad (mapInstance) {
       
//       },[]
//     )
//     return <GoogleMap
//       options={options}
//       onLoad={onLoad}
//     >
//       {
//         // ...Your map components
//       }
//     </GoogleMap>
//   }

//   if (loadError) {
//     return <div>Map cannot be loaded right now, sorry.</div>
//   }

//   return isLoaded ? RenderMap() : <p>loading...</p>
// }