
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

// Sample event data
const events = [
  {
    id: 1,
    title: "Technical Workshop: CAD Modeling",
    date: "May 15, 2023",
    location: "ME Building, Room 201",
    attendees: 45,
    image: "/public/lovable-uploads/6b115935-67fc-4138-8a82-cf42108c1d16.png",
    description: "Learn advanced CAD modeling techniques from industry experts to enhance your design skills."
  },
  {
    id: 2,
    title: "Annual Mechanical Day Celebration",
    date: "June 5, 2023",
    location: "ME Department Lawn",
    attendees: 120,
    image: "/public/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png",
    description: "Join us for a day of celebration, competitions, and networking with alumni and faculty."
  },
  {
    id: 3,
    title: "Industrial Visit: Tata Motors",
    date: "July 10, 2023",
    location: "Tata Motors, Pune",
    attendees: 60,
    image: "/public/lovable-uploads/e3fd6b91-d6bc-45ef-8ccf-7fd7292b928d.png",
    description: "Explore manufacturing processes and automation systems at the Tata Motors facility in Pune."
  }
];

const LatestEvents = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-mea-darkblue">Latest </span>
            <span className="text-mea-gold">Events</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover our most recent activities and upcoming events. Join us and be a part of the MEA community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={16} className="mr-2" />
                    <span>{event.attendees} Attendees</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/events">
            <Button className="bg-mea-darkblue hover:bg-mea-lightblue">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestEvents;
