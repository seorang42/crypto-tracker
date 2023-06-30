import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

const PriceInfo = styled.div<{ positive: boolean }>`
  background-color: ${(props) => props.theme.boxBgColor};
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 5px 10px 15px 0px rgba(0, 0, 0, 0.2);
  h1 {
    align-self: flex-start;
    margin-bottom: 10px;
    font-size: 0.9rem;
  }
  div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 1.7rem;
    font-weight: 400;
    color: ${(props) => (props.positive ? "#Cf3948" : "#3062B0")};
  }
`;

const AthPrice = styled.div`
  background-color: ${(props) => props.theme.boxBgColor};
  padding: 30px;
  border-radius: 10px;
  grid-column: 1/3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 5px 10px 15px 0px rgba(0, 0, 0, 0.2);
  div {
    display: flex;
    flex-direction: column;
    width: auto;
  }
  div:last-child {
    font-size: 2rem;
    font-weight: 400;
  }
`;

const PriceInfos = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
`;

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <PriceInfos>
          <AthPrice>
            <div>
              <span>{`${data!.quotes.USD.ath_date.slice(
                0,
                10
              )} ${data!.quotes.USD.ath_date.slice(11, 16)}`}</span>
              <span>최고가 달성</span>
            </div>
            <div>${data!.quotes.USD.ath_price.toFixed(3)}</div>
          </AthPrice>
          <PriceInfo positive={data!.quotes.USD.percent_change_1h > 0}>
            <h1>1시간 전보다</h1>
            <div>
              <span>{data!.quotes.USD.percent_change_1h}%</span>
              <span>
                {data!.quotes.USD.percent_change_1h > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </span>
            </div>
          </PriceInfo>
          <PriceInfo positive={data!.quotes.USD.percent_change_6h > 0}>
            <h1>6시간 전보다</h1>
            <div>
              <span>{data!.quotes.USD.percent_change_6h}%</span>
              <span>
                {data!.quotes.USD.percent_change_6h > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </span>
            </div>
          </PriceInfo>
          <PriceInfo positive={data!.quotes.USD.percent_change_12h > 0}>
            <h1>12시간 전보다</h1>
            <div>
              <span>{data!.quotes.USD.percent_change_12h}%</span>
              <span>
                {data!.quotes.USD.percent_change_12h > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </span>
            </div>
          </PriceInfo>
          <PriceInfo positive={data!.quotes.USD.percent_change_24h > 0}>
            <h1>24시간 전보다</h1>
            <div>
              <span>{data!.quotes.USD.percent_change_24h}%</span>
              <span>
                {data!.quotes.USD.percent_change_24h > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </span>
            </div>
          </PriceInfo>
          <PriceInfo positive={data!.quotes.USD.percent_change_7d > 0}>
            <h1>7일 전보다</h1>
            <div>
              <span>{data!.quotes.USD.percent_change_7d}%</span>
              <span>
                {data!.quotes.USD.percent_change_7d > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </span>
            </div>
          </PriceInfo>
          <PriceInfo positive={data!.quotes.USD.percent_change_30d > 0}>
            <h1>30일 전보다</h1>
            <div>
              <span>{data!.quotes.USD.percent_change_30d}%</span>
              <span>
                {data!.quotes.USD.percent_change_30d > 0 ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} />
                )}
              </span>
            </div>
          </PriceInfo>
        </PriceInfos>
      )}
    </div>
  );
}

export default Price;
