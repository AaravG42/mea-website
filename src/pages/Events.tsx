import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MapPin, Clock, CalendarIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ChatbotInterface from "@/components/ChatbotInterface";

// Sample events data with dates and categories
const eventsData = {
  upcoming: [
    {
      id: 1,
      title: "Technical Workshop: Advanced CAD Modeling",
      date: new Date(2024, 4, 20),
      time: "14:00 - 17:00",
      location: "ME Building, Room 201",
      attendees: 0,
      capacity: 50,
      image: "/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png",
      description: "Learn advanced CAD modeling techniques from industry experts to enhance your design skills. This hands-on workshop will cover parametric modeling, assembly design, and simulation techniques.",
      category: "Workshop",
      googleCalendarLink: "#"
    },
    {
      id: 2,
      title: "Annual Mechanical Day Celebration",
      date: new Date(2024, 5, 10),
      time: "10:00 - 18:00",
      location: "ME Department Lawn",
      attendees: 0,
      capacity: 200,
      image: "/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png",
      description: "Join us for a day of celebration, competitions, and networking with alumni and faculty. The event will feature technical competitions, cultural performances, and an alumni panel discussion.",
      category: "Social",
      googleCalendarLink: "#"
    },
    {
      id: 3,
      title: "Industrial Visit: Tata Motors",
      date: new Date(2024, 6, 15),
      time: "08:00 - 18:00",
      location: "Tata Motors, Pune",
      attendees: 0,
      capacity: 60,
      image: "/lovable-uploads/e3fd6b91-d6bc-45ef-8ccf-7fd7292b928d.png",
      description: "Explore manufacturing processes and automation systems at the Tata Motors facility in Pune. This visit will provide insights into automotive manufacturing, quality control, and supply chain management.",
      category: "Visit",
      googleCalendarLink: "#"
    }
  ],
  past: [
    {
      id: 4,
      title: "Guest Lecture: Future of Electric Vehicles",
      date: new Date(2024, 3, 5),
      time: "15:00 - 17:00",
      location: "ME Seminar Hall",
      attendees: 120,
      capacity: 150,
      image: "/lovable-uploads/6b115935-67fc-4138-8a82-cf42108c1d16.png",
      description: "A comprehensive lecture on the future of electric vehicles and their impact on mechanical engineering design principles.",
      category: "Lecture",
      googleCalendarLink: "#"
    },
    {
      id: 5,
      title: "Technical Paper Competition",
      date: new Date(2024, 2, 25),
      time: "10:00 - 16:00",
      location: "ME Conference Room",
      attendees: 45,
      capacity: 50,
      image: "/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png",
      description: "Students presented their research papers on various mechanical engineering topics, with prizes for the best papers.",
      category: "Competition",
      googleCalendarLink: "#"
    },
    {
      id: 6,
      title: "Alumni Interaction Session",
      date: new Date(2024, 1, 15),
      time: "18:00 - 20:00",
      location: "Online (Zoom)",
      attendees: 180,
      capacity: 200,
      image: "/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png",
      description: "An interactive session with alumni working in various industries, sharing their experiences and career advice.",
      category: "Networking",
      googleCalendarLink: "#"
    }
  ]
};

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Workshop: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Social: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Visit: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Lecture: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    Competition: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Networking: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
  };
  return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
};

const EventCard = ({ event, isUpcoming = false }: { event: any, isUpcoming?: boolean }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-4 right-4 ${getCategoryColor(event.category)}`}>
          {event.category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-mea-darkblue dark:text-mea-lightblue">
          {event.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <CalendarIcon className="h-4 w-4 mr-2 text-mea-gold" />
            <span>{format(event.date, "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2 text-mea-gold" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2 text-mea-gold" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users className="h-4 w-4 mr-2 text-mea-gold" />
            {isUpcoming ? (
              <span>{event.attendees}/{event.capacity} Registered</span>
            ) : (
              <span>{event.attendees} Attended</span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {isUpcoming ? (
            <>
              <Button className="flex-1 bg-mea-gold hover:bg-amber-500">
                Register Now
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0" asChild>
                      <a href={event.googleCalendarLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to Google Calendar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const getEventDates = () => {
    const dates: Date[] = [];
    [...eventsData.upcoming, ...eventsData.past].forEach(event => {
      dates.push(new Date(event.date));
    });
    return dates;
  };

  const eventDates = getEventDates();

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
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Events</CardTitle>
          <CardDescription>
            Discover upcoming and past events organized by the Mechanical Engineering Association
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 sm:mb-8 w-full overflow-x-auto flex sm:inline-flex whitespace-nowrap text-xs sm:text-base">
              <TabsTrigger value="upcoming" className="flex-1 sm:flex-none">Upcoming</TabsTrigger>
              <TabsTrigger value="past" className="flex-1 sm:flex-none">Past</TabsTrigger>
              <TabsTrigger value="calendar" className="flex-1 sm:flex-none">Calendar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {selectedDate && (
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-mea-gold/10 p-3 rounded-lg gap-2">
                  <p className="text-sm">
                    Showing events for: <span className="font-semibold">{format(selectedDate, "MMMM d, yyyy")}</span>
                  </p>
                  <Button variant="outline" size="sm" onClick={clearDateFilter} className="self-end">
                    Clear Filter
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredUpcomingEvents.length > 0 ? (
                  filteredUpcomingEvents.map((event: any) => (
                    <EventCard key={event.id} event={event} isUpcoming={true} />
                  ))
                ) : (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-10">
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No events found for the selected date.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              {selectedDate && (
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-mea-gold/10 p-3 rounded-lg gap-2">
                  <p className="text-sm">
                    Showing events for: <span className="font-semibold">{format(selectedDate, "MMMM d, yyyy")}</span>
                  </p>
                  <Button variant="outline" size="sm" onClick={clearDateFilter} className="self-end">
                    Clear Filter
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredPastEvents.length > 0 ? (
                  filteredPastEvents.map((event: any) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-8 sm:py-10">
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No events found for the selected date.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="calendar">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="lg:col-span-1 sm:mx-auto sm:w-72 lg:w-full">
                  <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
                    <CardContent className="p-3 sm:p-4">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border border-input dark:border-gray-700 p-2 sm:p-3 w-full"
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
                      <div className="mt-3 sm:mt-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center mb-1">
                          <div className="w-3 h-3 bg-mea-gold/20 border-b-2 border-mea-gold rounded-sm mr-2"></div>
                          <span>Events scheduled</span>
                        </div>
                        <p className="mt-1 sm:mt-2">Click on a date to view events for that day.</p>
                      </div>
                      {selectedDate && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3 sm:mt-4 w-full" 
                          onClick={clearDateFilter}
                        >
                          Clear Selection
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-3">
                  <Card className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
                    <CardHeader className="pb-2 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl">
                        {selectedDate ? `Events on ${format(selectedDate, "MMMM d, yyyy")}` : "All Events"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedDate ? (
                        <div className="space-y-3 sm:space-y-4">
                          {[...filteredUpcomingEvents, ...filteredPastEvents].length > 0 ? (
                            [...filteredUpcomingEvents, ...filteredPastEvents].map((event: any) => (
                              <div key={event.id} className="flex flex-col md:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors backdrop-blur-sm">
                                <div className="md:w-1/4 h-40 md:h-32 relative">
                                  <img src={event.image} alt={event.title} className="rounded-md w-full h-full object-cover" />
                                  <Badge className={`absolute top-2 right-2 ${getCategoryColor(event.category)}`}>
                                    {event.category}
                                  </Badge>
                                </div>
                                <div className="md:w-3/4">
                                  <h3 className="text-base sm:text-lg font-semibold text-mea-darkblue dark:text-mea-lightblue">{event.title}</h3>
                                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
                                  <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1 text-mea-gold" />
                                      <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="h-3 w-3 mr-1 text-mea-gold" />
                                      <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Users className="h-3 w-3 mr-1 text-mea-gold" />
                                      <span>{event.attendees}/{event.capacity}</span>
                                    </div>
                                  </div>
                                  <div className="mt-3 flex gap-2">
                                    <Button size="sm" className="bg-mea-gold hover:bg-amber-500">
                                      Register Now
                                    </Button>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="outline" size="icon" className="shrink-0" asChild>
                                            <a href={event.googleCalendarLink} target="_blank" rel="noopener noreferrer">
                                              <ExternalLink className="h-4 w-4" />
                                            </a>
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Add to Google Calendar</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 sm:py-10">
                              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No events scheduled for this date.</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 sm:py-10">
                          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Select a date to view events for that day.</p>
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
