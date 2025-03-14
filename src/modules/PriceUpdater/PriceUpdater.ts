import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAssets, updateAssetPrice } from "../../shared/portfolio.slice";

const PriceUpdater = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAssets);

  const assetsLength = assets.length;

  useEffect(() => {
    if (assets.length === 0) return;

    const streams = assets
      .map((asset) => asset.symbol.toLowerCase() + "usdt@ticker")
      .join("/");
    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { stream, data } = message;
      const price = parseFloat(data.c);
      const change24h = parseFloat(data.P);
      const assetSymbol = stream.split("usdt")[0].toUpperCase();
      dispatch(updateAssetPrice({ symbol: assetSymbol, price, change24h }));
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [assetsLength, dispatch]);

  return null;
};

export default PriceUpdater;
