import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import EventContent from "@/components/event-detail/event-content";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";

function EventDetailPage() {
  const router = useRouter();
  const event = getEventById(router.query.eventId);

  if (!event) return <p className="center">NO event found!</p>;

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetailPage;
