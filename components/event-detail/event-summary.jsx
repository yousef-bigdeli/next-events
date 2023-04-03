import styles from "./event-detail.module.css";

const EventSummary = ({ title }) => {
  return (
    <div className={styles.summary}>
      <h1>{title}</h1>
    </div>
  );
};

export default EventSummary;
