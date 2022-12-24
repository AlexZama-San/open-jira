
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { Inter } from '@next/font/google'
import { Layout } from '../components/layouts/layout'
import { EntryList } from '../components/ui/EntryList'
import { NewEntry } from '../components/ui/NewEntry';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout title='Home - OpenJira'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='pendientes'/>

              <NewEntry />
              <EntryList status='pending'/>
            
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='en progreso'/>
            
              <EntryList status='in-progress'/>
           
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title='completadas'/>
         
              <EntryList status='completed'/>
          
          </Card>
        </Grid>
      </Grid>

    </Layout>
  )
}
