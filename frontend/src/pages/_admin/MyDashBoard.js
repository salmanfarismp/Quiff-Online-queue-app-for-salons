import { Box, Container, Grid, Modal, Paper, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import Orders from './Orders'
import Chart from './../../components/_admin/Chart';
import Deposits from './Deposits';
import './MyDashBoard.css'
import GroupIcon from '@mui/icons-material/Group';
function MyDashboard() {
  

  
  


  return (
    <div>
      
       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
             
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >
                  <div className="dashboard-cards">
                    <div className="icon-side">
                    <div className="icon">
                    <GroupIcon/>
                    </div>
                    </div>
                    <div className="details-side">
                    <div className="title">
                        Users
                    </div>
                    <div className="count">
                      17
                    </div>
                    </div>
                  </div>
                  
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >
                   <div className="dashboard-cards">
                    <div className="icon-side">
                    <div className="icon">
                    <GroupIcon/>
                    </div>
                    </div>
                    <div className="details-side">
                    <div className="title">
                        Active
                    </div>
                    <div className="count">
                      4
                    </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >
                   <div className="dashboard-cards">
                    <div className="icon-side">
                    <div className="icon">
                    <GroupIcon/>
                    </div>
                    </div>
                    <div className="details-side">
                    <div className="title">
                        Shops
                    </div>
                    <div className="count">
                      21
                    </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                  }}
                >
                  <div className="dashboard-cards">
                    <div className="icon-side">
                    <div className="icon">
                    <GroupIcon/>
                    </div>
                    </div>
                    <div className="details-side">
                    <div className="title">
                        Revenue
                    </div>
                    <div className="count">
                      $1700
                    </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
               {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> 
              {/* Recent Deposits
              
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* <Orders /> */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
      
    </div>
  )
}

export default MyDashboard
