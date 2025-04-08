import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Mail, UserRound } from "lucide-react";
import ChatbotInterface from "@/components/ChatbotInterface";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={`transition-all duration-300 transform ${isHovered ? 'scale-105 shadow-xl' : 'hover:-translate-y-1 hover:shadow-lg'} cursor-pointer relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className={`p-6 transition-all duration-300 ${isHovered ? 'pb-24' : ''}`}>
        <div className="flex flex-col items-center text-center">
          <div className={`${isHovered ? 'w-24 h-24' : 'w-32 h-32'} rounded-full overflow-hidden mb-4 border-2 transition-all duration-300 ${isHovered ? 'border-mea-gold' : 'border-transparent hover:border-mea-gold'}`}>
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
        
        {/* Bio section that appears on hover */}
        <div 
          className={`absolute left-0 right-0 bottom-0 bg-gradient-to-t from-mea-gold/10 to-transparent p-4 transition-all duration-300 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        >
          <p className="text-muted-foreground text-sm leading-relaxed">
            {member.bio || "No bio available."}
          </p>
        </div>
      </CardContent>
    </Card>
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
