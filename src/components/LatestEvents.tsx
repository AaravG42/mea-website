
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { eventsData } from "@/data/events";

const events = [...eventsData.upcoming]
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .slice(0, 3);

const LatestEvents = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-mea-darkblue dark:text-mea-lightblue">Latest </span>
            <span className="text-mea-gold">Events</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our most recent activities and upcoming events. Join us and be a part of the MEA community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span>{format(event.date, "MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users size={16} className="mr-2" />
                    <span>{event.attendees} Attendees</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/events">
            <Button className="bg-mea-darkblue hover:bg-mea-lightblue dark:bg-mea-gold dark:text-gray-900 dark:hover:bg-amber-500">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestEvents;
