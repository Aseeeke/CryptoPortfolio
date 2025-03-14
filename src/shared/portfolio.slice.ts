import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  totalValue: number;
  change24h: number;
};

export type PortfolioState = {
  assets: Asset[];
  totalValue: number;
};

const initialState: PortfolioState = {
  assets: JSON.parse(localStorage.getItem("portfolio") || "[]"),
  totalValue: Number(JSON.parse(localStorage.getItem("portfolioValue") || "0")),
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset(
      state,
      action: PayloadAction<{
        name: string;
        symbol: string;
        quantity: number;
        change24h: number;
        price: number;
      }>,
    ) {
      if (action.payload.quantity <= 0) return;
      if (
        state.assets.find((asset) => asset.name === action.payload.name) !==
        undefined
      ) {
        const asset = state.assets.find(
          (asset) => asset.name === action.payload.name,
        );
        if (asset) {
          asset.quantity += action.payload.quantity;
          asset.totalValue = asset.price * asset.quantity;
        }
      } else {
        const newAsset: Asset = {
          id: v4(),
          name: action.payload.name,
          symbol: action.payload.symbol,
          quantity: action.payload.quantity,
          price: action.payload.price,
          totalValue: action.payload.price * action.payload.quantity,
          change24h: action.payload.change24h,
        };
        state.assets.push(newAsset);
      }
      state.totalValue = state.assets.reduce(
        (acc, asset) => acc + asset.totalValue,
        0,
      );
      state.assets.sort((a, b) => b.totalValue - a.totalValue);
      localStorage.setItem("portfolio", JSON.stringify(state.assets));
      localStorage.setItem("portfolioValue", JSON.stringify(state.totalValue));
    },
    removeAsset(state, action: PayloadAction<string>) {
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload,
      );
      state.totalValue = state.assets.reduce(
        (acc, asset) => acc + asset.totalValue,
        0,
      );
      state.assets.sort((a, b) => b.totalValue - a.totalValue);
      localStorage.setItem("portfolio", JSON.stringify(state.assets));
      localStorage.setItem("portfolioValue", JSON.stringify(state.totalValue));
    },
    updateAssetPrice(
      state,
      action: PayloadAction<{
        symbol: string;
        price: number;
        change24h: number;
      }>,
    ) {
      const asset = state.assets.find(
        (asset) =>
          asset.symbol.toUpperCase() === action.payload.symbol.toUpperCase(),
      );
      if (asset) {
        asset.price = action.payload.price;
        asset.totalValue = asset.price * asset.quantity;
        asset.change24h = action.payload.change24h;
      }
      state.totalValue = state.assets.reduce(
        (acc, asset) => acc + asset.totalValue,
        0,
      );
      state.assets.sort((a, b) => b.totalValue - a.totalValue);
      localStorage.setItem("portfolio", JSON.stringify(state.assets));
      localStorage.setItem("portfolioValue", JSON.stringify(state.totalValue));
    },
  },
});

export const { addAsset, removeAsset, updateAssetPrice } =
  portfolioSlice.actions;
export const selectAssets = (state: { portfolio: PortfolioState }) =>
  state.portfolio.assets;
export const selectTotalValue = (state: { portfolio: PortfolioState }) =>
  state.portfolio.totalValue;
export const portfolioReducer = portfolioSlice.reducer;
