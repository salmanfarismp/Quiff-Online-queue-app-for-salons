import React from 'react'
import AdminContent from './AdminHome'


function Admin({children}) {
  return (
    <div>
      <AdminContent children={children} />
    </div>
    
  )
}

export default Admin
