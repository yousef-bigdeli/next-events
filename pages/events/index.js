import Head from "next/head";
import { useRouter } from "next/router";
import { getAllEvents } from "@/helpers/api-utils";

import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/events-search";

function AllEventsPage({ events }) {
  const router = useRouter();

  const filterEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  if (!events) return <p>No events found.</p>;

  return (
    <>
      <Head>
        <title>All events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve."
        />
      </Head>
      <EventSearch onSearch={filterEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export default AllEventsPage;

export async function getStaticProps() {
  const data = await getAllEvents();

  return {
    props: {
      events: data,
    },
  };
}
