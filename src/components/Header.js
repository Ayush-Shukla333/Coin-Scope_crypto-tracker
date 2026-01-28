import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState()
  console.log(currency);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme ={darkTheme}>
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography onClick={() => navigate('/')} variant='h5'
            sx={{
              flex: 1,
              color: 'gold',
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Coin Scope
          </Typography>

          <Select
            variant="outlined"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            sx={{ width: 100, height: 40, marginRight:2 }}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};

export default Header;
