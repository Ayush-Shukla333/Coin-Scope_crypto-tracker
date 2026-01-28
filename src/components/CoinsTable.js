import React, { useState, useEffect } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { currency, symbol } = CryptoState();
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }
    console.log(coins);

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            mode: 'dark',
        },
    });

    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
    };
    const useStyles = makeStyles(() => ({

    }));
    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: 'center' }}>
                <Typography variant="h4" style={{ margin: 19, fontFamily: 'Montserrat', }}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField label="Search for a Cryptocurrency..." variant="outlined" style={{ marginBottom: 20, width: "100%" }} onChange={(e) => setSearch(e.target.value)} />
                <TableContainer >
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: 'gold' }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColour: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearch().map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow onClick={() => navigate(`/coins/${row.id}`)} key={row.name} style={{ cursor: "pointer" }} className={classes.row}>
                                                <TableCell component='th' scope='row' styles={{ display: 'flex', gap: 15 }}>
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ textTransform: 'uppercase', fontSize: 22 }}>{row.symbol}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                </TableBody>
                            </Table>

                        )
                    }
                </TableContainer>
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable
