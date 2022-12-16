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

  const country = state.country;
  const nativeNameLang = country !== null ? Object.keys(country.name.nativeName)[0] : '';
  const nativeName = country !== null ? country.name.nativeName[nativeNameLang]["common"] : '';

  return (
    <>
    {
      state.fetching !== true 
      ? <Card sx={{ width : "600px" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height=""
            image={country.flags.png}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`${id} (${nativeName})`}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The official name of {country.name.common} is {country.name.official}, belongs to region {country.region} and 
              subregion {country.subregion}. Located at the {country.latlng[0]}°N and {country.latlng[1]}°W, this coutry has 
              population of {country.population} people and it {country.independent ? 'has' : 'has not'} gained the independent,
              arccording to the CIA World Factbook.
            </Typography>
          </CardContent>
        </Card>
      : null
    }
    </>
  );
}
