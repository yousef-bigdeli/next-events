import LogisticsItem from "./logistics-item";

import Image from "next/legacy/image";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";

import styles from "./event-detail.module.css";

const EventLogistics = ({ event }) => {
  const { date, location, image, imageAlt } = event;

  const readableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const address = location.replace(", ", "\n");

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        {/* <Image
          src={`/${image}`}
          alt={imageAlt}
          width={320}
          height={240}
        /> */}
        <img src={`/${image}`} alt={imageAlt} width={320} height={240} />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{readableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{address}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export default EventLogistics;
