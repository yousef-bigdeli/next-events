export async function getAllEvents() {
  const res = await fetch(process.env.DB_URL, {
    headers: {
      authorization: `Bearer ${process.env.DB_API_KEY}`,
      apikey: process.env.DB_API_KEY,
    },
  });
  const data = await res.json();
  return data;
}

export async function getFeaturedEvents() {
  const res = await fetch(`${process.env.DB_URL}?isFeatured=eq.true`, {
    headers: {
      authorization: `Bearer ${process.env.DB_API_KEY}`,
      apikey: process.env.DB_API_KEY,
    },
  });
  const data = await res.json();
  return data;
}

export async function getEventById(id) {
  const res = await fetch(`${process.env.DB_URL}?id=eq.${id}`, {
    headers: {
      authorization: `Bearer ${process.env.DB_API_KEY}`,
      apikey: process.env.DB_API_KEY,
    },
  });
  const data = await res.json();
  return data;
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const events = await getAllEvents();

  let filteredEvents = events.filter((event) => {
    event.date.getFullYear() === year && event.date.getMonth() === month - 1;
  });

  return filteredEvents;
}
