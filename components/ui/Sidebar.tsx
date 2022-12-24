import { Drawer, Divider, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';

const menuItems: string[] = ['inbox', 'starred', 'send Email', 'drafts']

export const Sidebar = () => {

    const {sidemenuOpen, closeSidemenu} = useContext(UIContext)
    

  return (
    <Drawer
        anchor='left'
        open={sidemenuOpen}
        onClose={closeSidemenu}>
            <Box sx={{width: 250}}>
                <Box sx={{padding: '5px 10px'}}>
                    <Typography variant='h4'>
                        Menu
                    </Typography>
                </Box>

                <Divider />
                <List>
                    {
                        menuItems.map((item, index) => (
                            <ListItem button key={item}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
           
    </Drawer>
  )
}
