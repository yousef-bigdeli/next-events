import styles from "./event-detail.module.css";

const LogisticsItem = ({ icon: Icon, children }) => {
  return (
    <li className={styles.logisticsItem}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
