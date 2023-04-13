import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import EventContent from "@/components/event-detail/event-content";
import { getEventById, getFeaturedEvents } from "@/helpers/api-utils";
import Head from "next/head";
import Comments from "@/components/input/comments";

function EventDetailPage({ event }) {
  if (!event) return <p className="center">NO event found!</p>;

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const eventData = await getEventById(eventId);

  return {
    props: {
      event: eventData[0],
    },
  };
}

export async function getStaticPaths() {
  // We do not generate routes for all events.
  // Future events are fewer in number.
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    params: { eventId: String(event.id) },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}
