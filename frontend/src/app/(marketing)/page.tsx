import { apiRoutes } from "~/lib/api";
import Event from "./Event";

async function getAllEvents() {
  const request = await fetch(apiRoutes.events);
  return (await request.json()) as EventResponse;
}

export default async function Home() {
  const events = await getAllEvents();
  return (
    <div>
      <h1 className="text-5xl text-center font-bold">
        Welcome to Events Manager
      </h1>
      <p className="text-center mt-3 text-lg">
        Check out the list of upcoming events here
      </p>

      <section>
        <h2 className="text-3xl font-semibold mt-12">Upcoming Events</h2>
        {events.data.length > 0 ? (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-8">
            {events.data.map((event) => (
              <li key={event.slug}>
                {/* <Suspense fallback={<p>Loading...</p>}> */}
                <Event
                  date={event.start_at}
                  title={event.title}
                  slug={event.slug}
                  author={event.author}
                  description={event.description}
                  tags={event.tags}
                  speakers={event.speakers}
                />
                {/* </Suspense> */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events updated. Please visit at another time</p>
        )}
      </section>
    </div>
  );
}
