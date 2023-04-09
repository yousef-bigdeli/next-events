import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
// Utils
import { getFilteredEvents } from "@/helpers/api-utils";
// Components
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import Head from "next/head";

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  // ************ Get all data
  const fetcher = ([url, api]) =>
    fetch(url, {
      headers: {
        authorization: `Bearer ${api}`,
        apikey: api,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    [process.env.DB_URL, process.env.DB_API_KEY],
    fetcher
  );

  useEffect(() => {
    if (data) setLoadedEvents(data);
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered events</title>
      <meta name="description" content="A list of filtered events." />
    </Head>
  );

  if (!loadedEvents || isLoading)
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );

  // get Filter data
  const year = +filterData[0];
  const month = +filterData[1];

  pageHeadData = (
    <Head>
      <title>Filtered events</title>
      <meta name="description" content={`All events for ${month}/${year}`} />
    </Head>
  );

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2018 ||
    month < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className="center">Invalid filter. Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  // ********** Filter Events
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0)
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className="center">No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  // Show result
  const date = new Date(year, month - 1);

  return (
    <div>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;

// export async function getServerSideProps({ params }) {
//   const filterData = params.slug;

//   const year = +filterData[0];
//   const month = +filterData[1];

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2018 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true
//     };
//   }

//   const filteredEvents = await getFilteredEvents({ year, month });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year,
//         month,
//       },
//     },
//   };
// }
