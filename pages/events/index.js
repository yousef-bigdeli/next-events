import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  const filterEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={filterEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export default AllEventsPage;
