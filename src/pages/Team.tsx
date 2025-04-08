
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Mail, UserRound } from "lucide-react";
import ChatbotInterface from "@/components/ChatbotInterface";

// Combined team data
const teamData = [
  // Faculty
  {
    id: 1,
    name: "Prof. Amit Kumar",
    position: "Faculty Advisor, MEA",
    department: "Mechanical Engineering",
    email: "amit@me.iitb.ac.in",
    linkedin: "#",
    bio: "Professor Kumar specializes in thermal engineering and has been the faculty advisor for MEA since 2020.",
    image: "/public/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png"
  },
  {
    id: 2,
    name: "Prof. Priya Patel",
    position: "Co-Faculty Advisor, MEA",
    department: "Mechanical Engineering",
    email: "priya@me.iitb.ac.in",
    linkedin: "#",
    bio: "Professor Patel focuses on robotics and automation. She has been instrumental in developing industry partnerships.",
    image: "/public/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png"
  },
  // Coordinators
  {
    id: 3,
    name: "Rahul Gupta",
    position: "Overall Coordinator",
    year: "4th Year",
    email: "rahul@iitb.ac.in",
    linkedin: "#",
    bio: "Rahul oversees all MEA activities and has been part of the association since his first year.",
    image: "/public/lovable-uploads/6b115935-67fc-4138-8a82-cf42108c1d16.png"
  },
  {
    id: 4,
    name: "Sneha Sharma",
    position: "Technical Events Coordinator",
    year: "3rd Year",
    email: "sneha@iitb.ac.in",
    linkedin: "#",
    bio: "Sneha manages all technical workshops and competitions. She has a keen interest in CAD design.",
    image: "/public/lovable-uploads/e3fd6b91-d6bc-45ef-8ccf-7fd7292b928d.png"
  },
  {
    id: 5,
    name: "Vikram Singh",
    position: "Academic Coordinator",
    year: "3rd Year",
    email: "vikram@iitb.ac.in",
    linkedin: "#",
    bio: "Vikram coordinates academic initiatives including mentorship programs and study sessions.",
    image: "/public/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png"
  },
  // Volunteers
  {
    id: 6,
    name: "Ananya Desai",
    position: "Technical Team Member",
    year: "2nd Year",
    email: "ananya@iitb.ac.in",
    linkedin: "#",
    bio: "Ananya is passionate about thermal sciences and helps organize technical workshops on CAD design.",
    image: "/public/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png"
  },
  {
    id: 7,
    name: "Raj Mehta",
    position: "Events Team Member",
    year: "2nd Year",
    email: "raj@iitb.ac.in",
    linkedin: "#",
    bio: "Raj assists in planning and executing various MEA events and competitions throughout the academic year.",
    image: "/public/lovable-uploads/6b115935-67fc-4138-8a82-cf42108c1d16.png"
  },
  {
    id: 8,
    name: "Neha Kapoor",
    position: "Editorial Team Member",
    year: "2nd Year",
    email: "neha@iitb.ac.in",
    linkedin: "#",
    bio: "Neha contributes to MEA's newsletter and manages social media content to keep students informed.",
    image: "/public/lovable-uploads/e3fd6b91-d6bc-45ef-8ccf-7fd7292b928d.png"
  },
  {
    id: 9,
    name: "Arjun Reddy",
    position: "Web Team Member",
    year: "2nd Year",
    email: "arjun@iitb.ac.in",
    linkedin: "#",
    bio: "Arjun maintains the MEA website and helps develop new features to improve user experience.",
    image: "/public/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png"
  }
];

const TeamMemberCard = ({ member }: { member: any }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-transparent hover:border-mea-gold transition-colors duration-300">
                <Avatar className="w-full h-full">
                  <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                  <AvatarFallback>
                    <UserRound className="w-12 h-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-mea-gold font-medium text-sm mb-1">{member.position}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                {member.department || member.year}
              </p>
              
              <div className="flex space-x-3">
                <a 
                  href={`mailto:${member.email}`} 
                  className="text-gray-500 dark:text-gray-400 hover:text-mea-gold transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail size={18} />
                </a>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 dark:text-gray-400 hover:text-mea-gold transition-colors"
                  aria-label={`${member.name}'s LinkedIn profile`}
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 shadow-lg animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 bg-gradient-to-b from-mea-gold/10 to-transparent rounded-t-md">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-mea-gold">
              <AvatarImage src={member.image} />
              <AvatarFallback>
                <UserRound className="w-6 h-6 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-bold text-foreground">{member.name}</h4>
              <p className="text-mea-gold text-sm">{member.position}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{member.bio || "No bio available."}</p>
          
          <div className="mt-4 pt-3 border-t flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {member.department || member.year}
            </div>
            <div className="flex space-x-2">
              <a 
                href={`mailto:${member.email}`} 
                className="text-muted-foreground hover:text-mea-gold transition-colors"
                aria-label={`Email ${member.name}`}
              >
                <Mail size={16} />
              </a>
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-mea-gold transition-colors"
                aria-label={`${member.name}'s LinkedIn profile`}
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const Team = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Our Team</CardTitle>
          <CardDescription>
            Meet the people behind the Mechanical Engineering Association
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamData.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </CardContent>
      </Card>
      <ChatbotInterface />
    </div>
  );
};

export default Team;
