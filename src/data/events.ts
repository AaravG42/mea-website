export type EventItem = {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  attendees: number;
  capacity: number;
  image: string;
  description: string;
  category: string;
  googleCalendarLink: string;
};

export type EventsData = {
  upcoming: EventItem[];
  conducted: EventItem[];
};

export const eventsData: EventsData = {
  upcoming: [
    {
      id: 3,
      title: "Trad Day",
      date: new Date(2026, 2, 15),
      time: "18:00 - 22:00",
      location: "ME Workshop Area",
      attendees: 0,
      capacity: 80,
      image: "/lovable-uploads/trad.jpg",
      description:
        "Experience the traditional side of mechanical engineering! Learn about conventional machining techniques, hand tools, and the craftsmanship that laid the foundation for modern manufacturing.",
      category: "Informal",
      googleCalendarLink:
        "https://calendar.google.com/calendar/u/0/r/eventedit?text=Trad+Day&dates=20251225T100000Z/20251225T170000Z&location=ME+Workshop+Area&pli=1",
    },
    {
      id: 9,
      title: "MechAdvance26 Symposium",
      date: new Date(2026, 2, 14),
      time: "10:00 - 18:00",
      location: "ME Department, IIT Bombay",
      attendees: 0,
      capacity: 300,
      image: "/lovable-uploads/MechAdvance26.jpeg",
      description:
        "Flagship IITB Mechanical Engineering symposium exploring advances in interdisciplinary research linking ME with AI, robotics, biomechanics, energy, materials, manufacturing, and mechanics.",
      category: "Conference",
      googleCalendarLink:
        "https://calendar.google.com/calendar/u/0/r/eventedit?text=MechAdvance26+Symposium&dates=20260314T100000Z/20260314T180000Z&location=ME+Department,+IIT+Bombay&pli=1",
    },
  ],
  conducted: [
    {
      id: 1,
      title: "Badminton League",
      date: new Date(2025, 11, 15),
      time: "14:00 - 18:00",
      location: "ME Sports Complex",
      attendees: 0,
      capacity: 64,
      image: "/lovable-uploads/badmintonleague.jpeg",
      description:
        "Join our exciting badminton league where mechanical engineers showcase their athletic prowess alongside their technical skills. Compete in thrilling matches and experience the perfect blend of sports and engineering spirit!",
      category: "Competition",
      googleCalendarLink:
        "https://calendar.google.com/calendar/u/0/r/eventedit?text=Badminton+League&dates=20251215T140000Z/20251215T180000Z&location=ME+Sports+Complex&pli=1",
    },
    {
      id: 2,
      title: "Merch Launch",
      date: new Date(2025, 11, 20),
      time: "16:00 - 20:00",
      location: "ME Department Plaza",
      attendees: 0,
      capacity: 150,
      image: "/lovable-uploads/merchlaunch1.jpg",
      description:
        "Be the first to get your hands on the latest MEA merchandise! From stylish t-shirts to exclusive accessories, celebrate your mechanical engineering pride with our brand new collection.",
      category: "Social",
      googleCalendarLink:
        "https://calendar.google.com/calendar/u/0/r/eventedit?text=Merch+Launch&dates=20251220T160000Z/20251220T200000Z&location=ME+Department+Plaza&pli=1",
    },
    {
      id: 4,
      title: "CAD Clash",
      date: new Date(2024, 9, 15),
      time: "14:00 - 18:00",
      location: "ME CAD Lab",
      attendees: 85,
      capacity: 100,
      image: "/lovable-uploads/cadclash.png",
      description:
        "An intense competition where mechanical engineering students battled it out in CAD design challenges. From conceptual sketches to detailed 3D models, participants showcased their design skills and creativity.",
      category: "Competition",
      googleCalendarLink: "#",
    },
    {
      id: 5,
      title: "Convocation",
      date: new Date(2024, 7, 20),
      time: "10:00 - 16:00",
      location: "IIT Bombay Main Auditorium",
      attendees: 500,
      capacity: 600,
      image: "/lovable-uploads/convo.jpg",
      description:
        "A grand celebration marking the successful completion of the mechanical engineering program. Graduates received their degrees amidst inspiring speeches and memorable moments.",
      category: "Social",
      googleCalendarLink: "#",
    },
    {
      id: 6,
      title: "Mechanza",
      date: new Date(2024, 8, 29),
      time: "18:00 - 22:00",
      location: "LT-PCSA",
      attendees: 142,
      capacity: 150,
      image: "/lovable-uploads/mechanza25.jpg",
      description:
        "The most anticipated soirée of the year where sophistication meets celebration. Mechanical engineers dressed in their finest attire for an evening of elegance, conversation, and unforgettable memories.",
      category: "Social",
      googleCalendarLink: "#",
    },
    {
      id: 7,
      title: "Treasure Hunt",
      date: new Date(2024, 10, 10),
      time: "13:00 - 17:00",
      location: "ME Department Campus",
      attendees: 96,
      capacity: 120,
      image: "/lovable-uploads/treasurehunt.jpeg",
      description:
        "A thrilling treasure hunt that tested both mental acuity and physical endurance. Teams navigated through challenging clues hidden across the department, combining problem-solving with exploration.",
      category: "Competition",
      googleCalendarLink: "#",
    },
  ],
};

