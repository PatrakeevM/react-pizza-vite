import React from "react";

import styles from "./NotFound.styles";

const NotFound = () => (
  <div className={styles.title}>
    <h1>Ничего не найдено!</h1>
    <p className={styles.desc}>
      Проверьте корректность введённых данных и попробуйте ещё раз
    </p>
  </div>
);

export default NotFound;
