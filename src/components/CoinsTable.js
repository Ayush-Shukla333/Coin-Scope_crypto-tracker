import React, { useState, useEffect } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const handleSearch = () =>
    coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

  const filteredCoins = handleSearch();
  const pageCount = Math.ceil(filteredCoins.length / 10);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ margin: 2, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search for a Cryptocurrency..."
          variant="outlined"
          sx={{ marginBottom: 2, width: "100%" }}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                      sx={{
                        color: "black",
                        fontWeight: 700,
                        fontFamily: "Montserrat",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCoins
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit =
                      row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        key={row.name}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/coins/${row.id}`)
                        }
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ display: "flex", gap: 2 }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                          />
                          <div>
                            <Typography
                              sx={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </Typography>
                            <Typography sx={{ color: "darkgrey" }}>
                              {row.name}
                            </Typography>
                          </div>
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.current_price.toFixed(2)
                          )}
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            color: profit
                              ? "rgb(14, 203, 129)"
                              : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(
                            2
                          )}
                          %
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap
                              .toString()
                              .slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          sx={{
            padding: 3,
            display: "flex",
            justifyContent: "center",
            color: "gold",
          }}
          count={pageCount}
          page={page}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
 