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
import { motion } from "framer-motion";

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
      googleCalendarLink: "https://calendar.google.com/calendar/u/0/r/eventedit?text=MEA+Workshop&dates=20250520T140000Z/20250520T170000Z&location=ME+Building,+Room+201&pli=1"
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
    Workshop: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    Social: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
    Visit: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Lecture: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    Competition: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Networking: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
  };
  return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
};

const EventCard = ({ event, isUpcoming = false }: { event: any, isUpcoming?: boolean }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800/50 backdrop-blur-sm focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <Badge className={`absolute top-4 left-4 ${getCategoryColor(event.category)}`}>
            {event.category}
          </Badge>
          {isUpcoming && event.date <= new Date(new Date().setDate(new Date().getDate() + 3)) && (
            <Badge className="absolute top-4 right-4 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              Soon
            </Badge>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
            {event.description}
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <CalendarIcon className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" />
              <span>{format(event.date, "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Users className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" />
              {isUpcoming ? (
                <span>
                  {event.attendees}/{event.capacity} Registered
                  {event.attendees < 5 && event.capacity > 10 && (
                    <span className="ml-1 text-amber-600 dark:text-amber-400 font-medium">• Few spots left!</span>
                  )}
                </span>
              ) : (
                <span>{event.attendees} Attended</span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 mt-auto pt-2">
            {isUpcoming ? (
              <>
                <Button 
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white transition-colors duration-200"
                  disabled={event.attendees >= event.capacity}
                >
                  {event.attendees >= event.capacity ? "Full" : "Register Now"}
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="shrink-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700" 
                        asChild
                      >
                        <a href={event.googleCalendarLink} target="_blank" rel="noopener noreferrer" aria-label="Add to calendar">
                          <ExternalLink className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
              <Button variant="outline" className="w-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                View Details
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
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

  // Event card skeleton for loading state
  const EventCardSkeleton = () => (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <CardContent className="p-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-4 w-3/4" />
        
        <div className="space-y-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse mr-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/2" />
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
          <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );

  const EventCardCompact = ({ event }: { event: any }) => (
    <div className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors backdrop-blur-sm shadow-sm">
      <div className="md:w-1/4 aspect-video md:aspect-auto md:h-32 relative rounded-md overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <Badge className={`absolute top-2 left-2 ${getCategoryColor(event.category)}`}>
          {event.category}
        </Badge>
      </div>
      <div className="md:w-3/4 flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">{event.title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
          <div className="flex items-center">
            <CalendarIcon className="h-3 w-3 mr-1 text-amber-500 dark:text-amber-400" />
            <span>{format(event.date, "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1 text-amber-500 dark:text-amber-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-amber-500 dark:text-amber-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1 text-amber-500 dark:text-amber-400" />
            <span>{event.attendees}/{event.capacity}</span>
          </div>
        </div>
        <div className="mt-auto flex gap-2 pt-1">
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white transition-colors duration-200">
            Register Now
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="shrink-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700" 
                  asChild
                >
                  <a href={event.googleCalendarLink} target="_blank" rel="noopener noreferrer" aria-label="Add to calendar">
                    <ExternalLink className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
  );

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <CardTitle className="text-2xl sm:text-3xl text-gray-900 dark:text-gray-100">Events</CardTitle>
            <div className="w-20 h-1 bg-amber-500 mt-2 mb-3" />
            <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
              Discover upcoming and past events organized by the Mechanical Engineering Association
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 sm:mb-8 w-full bg-gray-100 dark:bg-gray-800 p-1 rounded-lg overflow-x-auto flex sm:inline-flex whitespace-nowrap text-xs sm:text-base">
                <TabsTrigger 
                  value="upcoming" 
                  className="flex-1 sm:flex-none rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger 
                  value="past" 
                  className="flex-1 sm:flex-none rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Past
                </TabsTrigger>
                <TabsTrigger 
                  value="calendar" 
                  className="flex-1 sm:flex-none rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:shadow-sm transition-all duration-200"
                >
                  Calendar
                </TabsTrigger>
              </TabsList>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <TabsContent value="upcoming" className="w-full">
                  {selectedDate && (
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg gap-2 border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2 text-amber-500 dark:text-amber-400" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Showing events for: <span className="font-semibold">{format(selectedDate, "MMMM d, yyyy")}</span>
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearDateFilter} 
                        className="self-end border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                      >
                        Clear Filter
                      </Button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                      Array(3).fill(0).map((_, i) => <EventCardSkeleton key={i} />)
                    ) : filteredUpcomingEvents.length > 0 ? (
                      filteredUpcomingEvents.map((event: any) => (
                        <EventCard key={event.id} event={event} isUpcoming={true} />
                      ))
                    ) : (
                      <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 sm:py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400 text-base">No upcoming events found for the selected date.</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={clearDateFilter} 
                          className="mt-4"
                        >
                          View All Events
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="past" className="w-full">
                  {selectedDate && (
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg gap-2 border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2 text-amber-500 dark:text-amber-400" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Showing events for: <span className="font-semibold">{format(selectedDate, "MMMM d, yyyy")}</span>
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearDateFilter} 
                        className="self-end border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                      >
                        Clear Filter
                      </Button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                      Array(3).fill(0).map((_, i) => <EventCardSkeleton key={i} />)
                    ) : filteredPastEvents.length > 0 ? (
                      filteredPastEvents.map((event: any) => (
                        <EventCard key={event.id} event={event} />
                      ))
                    ) : (
                      <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10 sm:py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
                        <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                        <p className="text-gray-600 dark:text-gray-400 text-base">No past events found for the selected date.</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={clearDateFilter} 
                          className="mt-4"
                        >
                          View All Events
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="calendar" className="w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                        <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-800">
                          <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {isMobile ? "Select Date" : "Calendar"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          {isLoading ? (
                            <div className="animate-pulse">
                              <div className="grid grid-cols-7 gap-2 mb-4">
                                {Array(7).fill(0).map((_, i) => (
                                  <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md" />
                                ))}
                              </div>
                              <div className="grid grid-cols-7 gap-2">
                                {Array(35).fill(0).map((_, i) => (
                                  <div key={i} className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md" />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              className="rounded-md border border-gray-200 dark:border-gray-700 p-3 w-full"
                              modifiers={{
                                event: (date) => isDateWithEvent(date),
                              }}
                              modifiersStyles={{
                                event: { 
                                  backgroundColor: 'rgba(245, 158, 11, 0.1)', 
                                  borderBottom: '2px solid #F59E0B',
                                  color: 'var(--foreground)',
                                  fontWeight: 'bold'
                                }
                              }}
                            />
                          )}
                          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center mb-1">
                              <div className="w-3 h-3 bg-amber-500/20 border-b-2 border-amber-500 rounded-sm mr-2"></div>
                              <span>Events scheduled</span>
                            </div>
                            <p className="mt-2">Click on a date to view events for that day.</p>
                          </div>
                          {selectedDate && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-4 w-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" 
                              onClick={clearDateFilter}
                            >
                              Clear Selection
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    <div className="lg:col-span-2">
                      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm h-full">
                        <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-800">
                          <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {selectedDate ? `Events on ${format(selectedDate, "MMMM d, yyyy")}` : "All Events"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          {isLoading ? (
                            <div className="space-y-4 animate-pulse">
                              {Array(3).fill(0).map((_, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                  <div className="md:w-1/4 h-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
                                  <div className="md:w-3/4">
                                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full mb-3" />
                                    <div className="flex flex-wrap gap-2">
                                      {Array(3).fill(0).map((_, j) => (
                                        <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-20" />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : selectedDate ? (
                            <div className="space-y-4">
                              {[...filteredUpcomingEvents, ...filteredPastEvents].length > 0 ? (
                                [...filteredUpcomingEvents, ...filteredPastEvents].map((event: any) => (
                                  <EventCardCompact key={event.id} event={event} />
                                ))
                              ) : (
                                <div className="text-center py-10 sm:py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
                                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                                  <p className="text-gray-600 dark:text-gray-400 text-base">No events scheduled for this date.</p>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={clearDateFilter} 
                                    className="mt-4"
                                  >
                                    View All Events
                                  </Button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {isLoading ? (
                                Array(3).fill(0).map((_, i) => (
                                  <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div className="md:w-1/4 h-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
                                    <div className="md:w-3/4">
                                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2" />
                                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full mb-3" />
                                      <div className="flex flex-wrap gap-2">
                                        {Array(3).fill(0).map((_, j) => (
                                          <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-20" />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : [...eventsData.upcoming].length > 0 ? (
                                [...eventsData.upcoming].slice(0, 3).map((event: any) => (
                                  <EventCardCompact key={event.id} event={event} />
                                ))
                              ) : (
                                <div className="text-center py-8 sm:py-10 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                                  <p className="text-gray-600 dark:text-gray-400 text-base">Select a date to view events for that day.</p>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      <ChatbotInterface />
    </div>
  );
};

export default Events;
