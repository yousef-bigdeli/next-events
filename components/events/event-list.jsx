import EventItem from "./event-item";
import styles from "./event-list.module.css";

const EventList = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <EventItem key={item.id} event={item} />
      ))}
    </ul>
  );
};

export default EventList;
