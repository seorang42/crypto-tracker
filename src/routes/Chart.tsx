import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexCharts
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => Number(price.close)) as number[],
              },
            ]}
            options={{
              xaxis: {
                labels: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toDateString()
                ),
              },
              yaxis: {
                show: false,
              },
              grid: {
                show: false,
              },
              theme: {
                mode: "dark",
              },
              chart: {
                width: 500,
                height: 300,
                background: "transparent",
                toolbar: {
                  show: false,
                },
              },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["#0be881"],
                  stops: [0, 100],
                },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexCharts
            type="candlestick"
            series={[
              {
                data: data?.map((price) => [
                  price.time_close * 1000,
                  price.open,
                  price.high,
                  price.low,
                  price.close,
                ]) as [],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                type: "candlestick",
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              xaxis: {
                labels: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toDateString()
                ),
              },
              yaxis: {
                show: false,
              },
              grid: {
                show: false,
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#EE0000",
                    downward: "#0000EE",
                  },
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Chart;
