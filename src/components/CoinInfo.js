import React, { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { chartDays } from "../config/data";

import SelectButton from "./SelectButton";
const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
  try {
    setHistoricData(null); // Clear previous data to show loading state
    const { data } = await axios.get(
      HistoricalChart(coin.id, days, currency)
    );
    setHistoricData(data.prices);
  } catch (error) {
    console.error("API Error:", error);
  }
};

//Prevents API rate limits
//Stops the Network Error you saw
//Makes UI smoother

  useEffect(() => {
  const timer = setTimeout(() => {
    fetchHistoricData();
  }, 300);

  return () => clearTimeout(timer);
}, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: { xs: "100%", md: "75%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: { xs: 0, md: 3 },
          p: { xs: 2, md: 5 },
        }}
      >
        {!historicData ? (
          <CircularProgress
            sx={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1
                    ? time
                    : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                mt: 3,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;