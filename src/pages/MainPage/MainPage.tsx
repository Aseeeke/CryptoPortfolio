import { FormAdd } from "../../modules/FormAdd/FormAdd";
import { Header } from "../../modules/Header/Header";
import { PortfolioList } from "../../modules/PortfolioList/PortfolioList";
import { useSelector } from "react-redux";
import { getFormStatus } from "../../shared/form.slice";
import PriceUpdater from "../../modules/PriceUpdater/PriceUpdater";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../shared/consts";
import styles from "./MainPage.module.scss";

export const MainPage = () => {
  const formStatus = useSelector(getFormStatus);
  const [coinsPassed, setCoinsPassed] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const getCoins = async () => {
      try {
        const response = await axios.get(API_URL);
        setCoinsPassed(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCoins();
    setLoader(false);
  }, []);

  if (loader) return <div>{/*loader*/}</div>;

  return (
    <div className={styles.container}>
      <Header />
      <PriceUpdater />
      {formStatus && coinsPassed.length > 0 ? (
        <FormAdd coinsPassed={coinsPassed} />
      ) : null}
      <PortfolioList />
    </div>
  );
};
