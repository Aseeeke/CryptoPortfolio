import { useDispatch, useSelector } from "react-redux";
import {
  Asset,
  removeAsset,
  selectAssets,
  selectTotalValue,
} from "../../shared/portfolio.slice";
import { formatPrice, roundPercentage } from "../../shared/helper";

import { FixedSizeGrid as Grid } from "react-window";

import styles from "./PortfolioList.module.scss";
import AutoSizer from "react-virtualized-auto-sizer";

export const PortfolioList = () => {
  const dispatch = useDispatch();

  const assets = useSelector(selectAssets);
  const totalValue = useSelector(selectTotalValue);

  const handleRemoveAsset = (id: string) => {
    dispatch(removeAsset(id));
  };

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
    data,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
    data: { assets: Asset[] };
  }) => {
    const asset = data.assets[rowIndex];
    let content;

    switch (columnIndex) {
      case 0:
        content = asset.name;
        break;
      case 1:
        content = asset.quantity;
        break;
      case 2:
        content = "$" + formatPrice(asset.price);
        break;
      case 3:
        content = "$" + formatPrice(asset.totalValue);
        break;
      case 4:
        content = formatPrice(asset.change24h) + "%";
        break;
      case 5:
        content = roundPercentage(asset.totalValue / totalValue) + "%";
        break;
      default:
        content = "";
    }

    return (
      <div
        style={style}
        onClick={() => handleRemoveAsset(asset.id)}
        className={styles.row}
      >
        {columnIndex === 4 ? (
          <span
            className={
              asset.change24h > 0
                ? styles.percentageGreen
                : styles.percentageRed
            }
          >
            {content}
          </span>
        ) : (
          <span>{content}</span>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <span>Name</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Total Value</span>
        <span>Change 24h</span>
        <span>Percentage</span>
      </div>

      <AutoSizer>
        {({ height, width }) => (
          <Grid
            height={height}
            width={width}
            rowCount={assets.length}
            rowHeight={60}
            columnCount={6}
            columnWidth={width / 6}
            itemData={{ assets }}
            className={styles.grid}
          >
            {Cell}
          </Grid>
        )}
      </AutoSizer>
    </div>
  );
};
