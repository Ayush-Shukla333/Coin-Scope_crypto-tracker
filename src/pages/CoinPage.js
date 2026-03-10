import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import parse from "html-react-parser";

import {
  Box,
  Typography,
  LinearProgress
} from "@mui/material";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin)
    return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          borderRight: { md: "2px solid grey" },
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            px: 3,
            pb: 2,
            textAlign: "justify",
          }}
        >
          {parse(coin?.description.en.split(". ")[0])}
        </Typography>

        <Box
          sx={{
            alignSelf: "flex-start",
            p: 3,
            pt: 1,
            width: "100%",
            display: { xs: "flex", sm: "flex", md: "block" },
            justifyContent: { xs: "space-around" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
            >
              Rank:
            </Typography>

            &nbsp;&nbsp;

            <Typography
              variant="h5"
              sx={{ fontFamily: "Montserrat" }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex", marginTop: 10 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
            >
              Current Price:
            </Typography>

            &nbsp;&nbsp;

            <Typography
              variant="h5"
              sx={{ fontFamily: "Montserrat" }}
            >
              {symbol}{" "}
              {coin?.market_data.current_price[
                currency.toLowerCase()
              ]}
            </Typography>
          </span>
        </Box>
      </Box>

      {/* Chart Section */}
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;