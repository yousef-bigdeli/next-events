import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) return <p className="center">Loading...</p>;

  const year = +filterData[0];
  const month = +filterData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2018 ||
    month < 1 ||
    month > 12
  ) {
    return <p className="center">Invalid filter. Please adjust your values.</p>;
  }

  const filteredEvents = getFilteredEvents({ year, month });
  const date = new Date(year, month - 1);

  if (!filteredEvents || filteredEvents.length === 0)
    return <p className="center">No events found for the chosen filter!</p>;

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;
