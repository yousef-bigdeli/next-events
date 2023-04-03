import styles from "./event-detail.module.css";

const EventContent = ({ children }) => {
  return <section className={styles.eventContent}>{children}</section>;
};

export default EventContent;
