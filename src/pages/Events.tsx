
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MapPin, Clock, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import ChatbotInterface from "@/components/ChatbotInterface";

// Sample events data with dates
const eventsData = {
  upcoming: [
    {
      id: 1,
      title: "Technical Workshop: Advanced CAD Modeling",
      date: new Date(2023, 4, 20), // May 20, 2023
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
      date: new Date(2023, 5, 10), // June 10, 2023
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
      date: new Date(2023, 6, 15), // July 15, 2023
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
      date: new Date(2023, 3, 5), // April 5, 2023
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
      date: new Date(2023, 2, 25), // March 25, 2023
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
      date: new Date(2023, 1, 15), // February 15, 2023
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
            <CalendarIcon size={16} className="mr-2" />
            <span>{format(event.date, "MMMM d, yyyy")}</span>
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Function to filter events based on selected date
  const getFilteredEvents = (category: string) => {
    const events = (eventsData as any)[category];
    if (!selectedDate) return events;

    return events.filter((event: any) => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear();
    });
  };

  // Get dates for the calendar highlighting
  const getEventDates = () => {
    const dates: Date[] = [];
    [...eventsData.upcoming, ...eventsData.past].forEach(event => {
      dates.push(new Date(event.date));
    });
    return dates;
  };

  const eventDates = getEventDates();

  // Function to determine if a date has an event
  const isDateWithEvent = (date: Date) => {
    return eventDates.some(eventDate => 
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  };

  const clearDateFilter = () => {
    setSelectedDate(undefined);
  };

  const filteredUpcomingEvents = getFilteredEvents("upcoming");
  const filteredPastEvents = getFilteredEvents("past");

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
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {selectedDate && (
                <div className="mb-4 flex items-center justify-between bg-mea-gold/10 p-3 rounded-lg">
                  <p className="text-sm">
                    Showing events for: <span className="font-semibold">{format(selectedDate, "MMMM d, yyyy")}</span>
                  </p>
                  <Button variant="outline" size="sm" onClick={clearDateFilter}>
                    Clear Filter
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcomingEvents.length > 0 ? (
                  filteredUpcomingEvents.map((event: any) => (
                    <EventCard key={event.id} event={event} isUpcoming={true} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">No events found for the selected date.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              {selectedDate && (
                <div className="mb-4 flex items-center justify-between bg-mea-gold/10 p-3 rounded-lg">
                  <p className="text-sm">
                    Showing events for: <span className="font-semibold">{format(selectedDate, "MMMM d, yyyy")}</span>
                  </p>
                  <Button variant="outline" size="sm" onClick={clearDateFilter}>
                    Clear Filter
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPastEvents.length > 0 ? (
                  filteredPastEvents.map((event: any) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">No events found for the selected date.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="calendar">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardContent className="p-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border border-input dark:border-gray-700 p-3"
                        modifiers={{
                          event: (date) => isDateWithEvent(date),
                        }}
                        modifiersStyles={{
                          event: { 
                            backgroundColor: 'rgba(245, 158, 11, 0.1)', 
                            borderBottom: '2px solid #F5B200',
                            color: 'var(--foreground)',
                            fontWeight: 'bold'
                          }
                        }}
                      />
                      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center mb-1">
                          <div className="w-3 h-3 bg-mea-gold/20 border-b-2 border-mea-gold rounded-sm mr-2"></div>
                          <span>Events scheduled</span>
                        </div>
                        <p className="mt-2">Click on a date to view events for that day.</p>
                      </div>
                      {selectedDate && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4 w-full" 
                          onClick={clearDateFilter}
                        >
                          Clear Selection
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {selectedDate ? `Events on ${format(selectedDate, "MMMM d, yyyy")}` : "All Events"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedDate ? (
                        <div className="space-y-4">
                          {[...filteredUpcomingEvents, ...filteredPastEvents].length > 0 ? (
                            [...filteredUpcomingEvents, ...filteredPastEvents].map((event: any) => (
                              <div key={event.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <div className="md:w-1/4">
                                  <img src={event.image} alt={event.title} className="rounded-md w-full h-32 object-cover" />
                                </div>
                                <div className="md:w-3/4">
                                  <h3 className="text-lg font-semibold">{event.title}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
                                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center">
                                      <Clock size={14} className="mr-1" />
                                      <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin size={14} className="mr-1" />
                                      <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Users size={14} className="mr-1" />
                                      <span>{event.attendees}/{event.capacity}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-10">
                              <p className="text-gray-500 dark:text-gray-400">No events scheduled for this date.</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-gray-500 dark:text-gray-400">Select a date to view events for that day.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
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
