import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import img from "./avatar.svg"
import './card.css'

const ProfileCard = () =>  {
  const theme = useTheme();
  return (
    <Card className='pfcard' class='c1' sx={{ display: 'flex', height: '180px'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Arhum Imran
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            HR Representative
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            FAST National University of Computing and Emerging Sciences
          </Typography>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={img}
        alt="Live from space album cover"
      />
    </Card>
  );
}
export default ProfileCard