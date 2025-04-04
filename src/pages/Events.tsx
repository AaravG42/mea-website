
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatbotInterface from "@/components/ChatbotInterface";

// Sample events data
const eventsData = {
  upcoming: [
    {
      id: 1,
      title: "Technical Workshop: Advanced CAD Modeling",
      date: "May 20, 2023",
      time: "14:00 - 17:00",
      location: "ME Building, Room 201",
      attendees: 0,
      capacity: 50,
      image: "/public/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png",
      description: "Learn advanced CAD modeling techniques from industry experts to enhance your design skills. This hands-on workshop will cover parametric modeling, assembly design, and simulation techniques."
    },
    {
      id: 2,
      title: "Annual Mechanical Day Celebration",
      date: "June 10, 2023",
      time: "10:00 - 18:00",
      location: "ME Department Lawn",
      attendees: 0,
      capacity: 200,
      image: "/public/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png",
      description: "Join us for a day of celebration, competitions, and networking with alumni and faculty. The event will feature technical competitions, cultural performances, and an alumni panel discussion."
    },
    {
      id: 3,
      title: "Industrial Visit: Tata Motors",
      date: "July 15, 2023",
      time: "08:00 - 18:00",
      location: "Tata Motors, Pune",
      attendees: 0,
      capacity: 60,
      image: "/public/lovable-uploads/e3fd6b91-d6bc-45ef-8ccf-7fd7292b928d.png",
      description: "Explore manufacturing processes and automation systems at the Tata Motors facility in Pune. This visit will provide insights into automotive manufacturing, quality control, and supply chain management."
    }
  ],
  past: [
    {
      id: 4,
      title: "Guest Lecture: Future of Electric Vehicles",
      date: "April 5, 2023",
      time: "15:00 - 17:00",
      location: "ME Seminar Hall",
      attendees: 120,
      capacity: 150,
      image: "/public/lovable-uploads/6b115935-67fc-4138-8a82-cf42108c1d16.png",
      description: "A comprehensive lecture on the future of electric vehicles and their impact on mechanical engineering design principles."
    },
    {
      id: 5,
      title: "Technical Paper Competition",
      date: "March 25, 2023",
      time: "10:00 - 16:00",
      location: "ME Conference Room",
      attendees: 45,
      capacity: 50,
      image: "/public/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png",
      description: "Students presented their research papers on various mechanical engineering topics, with prizes for the best papers."
    },
    {
      id: 6,
      title: "Alumni Interaction Session",
      date: "February 15, 2023",
      time: "18:00 - 20:00",
      location: "Online (Zoom)",
      attendees: 180,
      capacity: 200,
      image: "/public/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png",
      description: "An interactive session with alumni working in various industries, sharing their experiences and career advice."
    }
  ]
};

const EventCard = ({ event, isUpcoming = false }: { event: any, isUpcoming?: boolean }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users size={16} className="mr-2" />
            {isUpcoming ? (
              <span>{event.attendees}/{event.capacity} Registered</span>
            ) : (
              <span>{event.attendees} Attended</span>
            )}
          </div>
        </div>
        
        {isUpcoming ? (
          <Button className="w-full bg-mea-gold hover:bg-amber-500">
            Register Now
          </Button>
        ) : (
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Events</CardTitle>
          <CardDescription>
            Discover upcoming and past events organized by the Mechanical Engineering Association
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.upcoming.map(event => (
                  <EventCard key={event.id} event={event} isUpcoming={true} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.past.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <ChatbotInterface />
    </div>
  );
};

export default Events;
