export async function getAllEvents() {
  let data = [];
  try {
    const res = await fetch(process.env.DB_URL, {
      headers: {
        authorization: `Bearer ${process.env.DB_API_KEY}`,
        apikey: process.env.DB_API_KEY,
      },
    });
    data = await res.json();
  } catch (error) {
    // TODO: Handle fetch error
    console.log(error);
  }
  return data;
}

export async function getFeaturedEvents() {
  let data = [];
  try {
    const res = await fetch(`${process.env.DB_URL}?isFeatured=eq.true`, {
      headers: {
        authorization: `Bearer ${process.env.DB_API_KEY}`,
        apikey: process.env.DB_API_KEY,
      },
    });
    data = await res.json();
  } catch (error) {
    // TODO: Handle fetch error
    console.log(error);
  }
  return data;
}

export async function getEventById(id) {
  let data = [];
  try {
    const res = await fetch(`${process.env.DB_URL}?id=eq.${id}`, {
      headers: {
        authorization: `Bearer ${process.env.DB_API_KEY}`,
        apikey: process.env.DB_API_KEY,
      },
    });
    data = await res.json();
  } catch (error) {
    // TODO: Handle fetch error
    console.log(error);
  }
  return data;
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const events = await getAllEvents();

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
