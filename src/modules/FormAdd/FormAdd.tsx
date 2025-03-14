import { useState } from "react";
import { addAsset } from "../../shared/portfolio.slice";
import { useDispatch } from "react-redux";

import styles from "./FormAdd.module.scss";
import { formOff } from "../../shared/form.slice";
import { formatPrice } from "../../shared/helper";

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export const FormAdd = ({ coinsPassed }: { coinsPassed: Coin[] }) => {
  const [coins] = useState<Coin[]>(coinsPassed || []);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>(coinsPassed || []);

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [quantity, setQuantity] = useState("");

  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filteredCoins = coins.filter(
      (coin) =>
        coin.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
        coin.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredCoins(filteredCoins);
  };

  const handleAddCoin = (
    event: React.FormEvent<HTMLFormElement>,
    coin: Coin,
  ) => {
    event.preventDefault();
    dispatch(
      addAsset({
        name: coin.name,
        quantity: Number(quantity),
        symbol: coin.symbol,
        change24h: coin.price_change_percentage_24h,
        price: coin.current_price,
      }),
    );
    dispatch(formOff());
  };

  return (
    <div
      className={styles.container}
      onClick={() => {
        dispatch(formOff());
      }}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h2>Add Portfolio</h2>
        <form onSubmit={(event) => handleAddCoin(event, selectedCoin!)}>
          <input type="text" onChange={handleSearch} placeholder="Search" />
          <ul>
            {filteredCoins.map((coin) => (
              <li key={coin.id} onClick={() => setSelectedCoin(coin)}>
                <span>{coin.symbol}</span>
                <span>${formatPrice(coin.current_price)}</span>
                <span
                  style={{
                    color:
                      coin.price_change_percentage_24h > 0 ? "green" : "red",
                  }}
                >
                  {formatPrice(coin.price_change_percentage_24h)}%
                </span>
              </li>
            ))}
          </ul>
          {selectedCoin ? (
            <div className={styles.inputAdd}>
              <input
                type="number"
                min="1"
                max="500"
                placeholder="Amount"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button type="submit">Add</button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};
