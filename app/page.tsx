import EventCard from "@/components/EventCard"
import ExploreBtn from "@/components/ExploreBtn"
import { events } from "@/lib/constants"



const Home = () => {
  return (
    <section>
      <h1 className="text-center">Dont miss your <br /> biggedst change</h1>
      <p className="text-center my-5 text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      <ExploreBtn />

      <div className="grid grid-cols-3 gap-10">
        {events.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </div>

    </section>
  )
}

export default Home