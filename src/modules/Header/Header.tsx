import { useDispatch } from "react-redux";
import { formOn } from "../../shared/form.slice";

import styles from "./Header.module.scss";

export const Header = () => {
  const dispatch = useDispatch();

  const handleAddAsset = () => {
    dispatch(formOn());
  };

  return (
    <header className={styles.container}>
      <h1>Portfolio Overview</h1>
      <button onClick={handleAddAsset}>Add Asset</button>
    </header>
  );
};
