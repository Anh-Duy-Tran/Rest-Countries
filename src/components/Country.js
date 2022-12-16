import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserContext } from '../context/UserProvider';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CountryCard() {
  const [ state, dispatch ] = React.useContext(UserContext);

  const { id } = useParams() 
  
  React.useEffect(() => {
    const baseUrl = `https://restcountries.com/v3.1/name/${id}`;
    dispatch({ type : "fetching" });
    axios
      .get(baseUrl)
      .then(res => {
        dispatch({ type : "set-country", payload : res.data[0] })
        dispatch({ type : "fetch-complete" })
      })
      .catch(err => console.log(err));
    
  }, [id]);

  return (
    <>
    {
      state.fetching !== true 
      ? <Card sx={{ width : "600px" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height=""
            image={state.country.flags.png}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      : null
    }
    </>
  );
}
