import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Mail, UserRound, Instagram } from "lucide-react";
import ChatbotInterface from "@/components/ChatbotInterface";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// Combined team data
// const teamData = [
//   {
//     id: 1,
//     name: "Prof. Amit Kumar",
//     position: "Faculty Advisor, MEA",
//     department: "Mechanical Engineering",
//     email: "amit@me.iitb.ac.in",
//     linkedin: "#",
//     bio: "Professor Kumar specializes in thermal engineering and has been the faculty advisor for MEA since 2020.",
//     image: "/public/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png"
//   },
//   {
//     id: 2,
//     name: "Prof. Priya Patel",
//     position: "Co-Faculty Advisor, MEA",
//     department: "Mechanical Engineering",
//     email: "priya@me.iitb.ac.in",
//     linkedin: "#",
//     bio: "Professor Patel focuses on robotics and automation. She has been instrumental in developing industry partnerships.",
//     image: "/public/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png"
//   },
//   {
//     id: 3,
//     name: "Rahul Gupta",
//     position: "Overall Coordinator",
//     year: "4th Year",
//     email: "rahul@iitb.ac.in",
//     linkedin: "#",
//     bio: "Rahul oversees all MEA activities and has been part of the association since his first year.",
//     image: "/public/lovable-uploads/6b115935-67fc-4138-8a82-cf42108c1d16.png"
//   },
//   {
//     id: 4,
//     name: "Sneha Sharma",
//     position: "Technical Events Coordinator",
//     year: "3rd Year",
//     email: "sneha@iitb.ac.in",
//     linkedin: "#",
//     bio: "Sneha manages all technical workshops and competitions. She has a keen interest in CAD design.",
//     image: "/public/lovable-uploads/e3fd6b91-d6bc-45ef-8ccf-7fd7292b928d.png"
//   },
//   {
//     id: 5,
//     name: "Vikram Singh",
//     position: "Academic Coordinator",
//     year: "3rd Year",
//     email: "vikram@iitb.ac.in",
//     linkedin: "#",
//     bio: "Vikram coordinates academic initiatives including mentorship programs and study sessions.",
//     image: "/public/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png"
//   },
//   {
//     id: 6,
//     name: "Ananya Desai",
//     position: "Technical Team Member",
//     year: "2nd Year",
//     email: "ananya@iitb.ac.in",
//     linkedin: "#",
//     bio: "Ananya is passionate about thermal sciences and helps organize technical workshops on CAD design.",
//     image: "/public/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png"
//   },
//   {
//     id: 7,
//     name: "Raj Mehta",
//     position: "Events Team Member",
//     year: "2nd Year",
//     email: "raj@iitb.ac.in",
//     linkedin: "#",
//     bio: "Raj assists in planning and executing various MEA events and competitions throughout the academic year.",
//     image: "/public/lovable-uploads/6b115935-67fc-4138-8a82-cf42108c1d16.png"
//   },
//   {
//     id: 8,
//     name: "Neha Kapoor",
//     position: "Editorial Team Member",
//     year: "2nd Year",
//     email: "neha@iitb.ac.in",
//     linkedin: "#",
//     bio: "Neha contributes to MEA's newsletter and manages social media content to keep students informed.",
//     image: "/public/lovable-uploads/e3fd6b91-d6bc-45ef-8ccf-7fd7292b928d.png"
//   },
//   {
//     id: 9,
//     name: "Arjun Reddy",
//     position: "Web Team Member",
//     year: "2nd Year",
//     email: "arjun@iitb.ac.in",
//     linkedin: "#",
//     bio: "Arjun maintains the MEA website and helps develop new features to improve user experience.",
//     image: "/public/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png"
//   }
// ];

const teamData = [
  {
    id: 1,
    name: "Kriti Talreja",
    position: "Dept General Secretary",
    email: "210100083@iitb.ac.in",
    linkedin: null,
    instagram: null,
    bio: "The heart of the council, she’s the one you can count on to pick up your call—whether it’s for a rant, a chat, or gossip. You’d never guess when she actually sleeps—she’s always quick to respond, effortlessly keeping everything on track, as if she never needs a break. Her cute, short haircut matches her warm and caring nature. She’ll make sure you’re well-fed and listen to your stories as if they’re the most important thing in the world, because to her, they are.",
    image: "/static/media/kriti.49403b70.jpg"
  },
  {
    id: 2,
    name: "Lovepreet Singh",
    position: "PG Secretary",
    email: "23m1686@iitb.ac.in",
    linkedin: "https://linkedin.com/in/preetlovi",
    instagram: "https://www.instagram.com/_preet_lovi?igsh=MTh0cmtkMnZoODJkcA%3D%3D&utm_source=qr",
    bio: "With an old-school soul and a modern flair, he effortlessly combines authenticity with ambition, bringing a unique charm to everything he does. Finding joy in life’s simple pleasures, he thrives on a good playlist or an enriching conversation that leaves an impact. Driven by a desire for beauty and growth, he seeks to make each step meaningful, embracing life’s journey with open eyes and an open heart.",
    image: "/static/media/lovepreet.d4af362a.jpeg"
  },
  {
    id: 3,
    name: "Bhushan Khandare",
    position: "Chief Secretary Events and Execution",
    email: "22b2138@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/bhushan-khandare-518078250/",
    instagram: "https://www.instagram.com/bhushankhandare_/",
    bio: "The perfect example of work-life balance—strict and focused till the work is done, but once it's over he’s the most relaxed, fun-loving guy in the room. He tackles any project with bullet points and flow charts, making tough jobs look easy. A history and politics enthusiast, his conversations are insightful, and he’s got a knack for decision-making and team motivation. His feed? Full of scary reels he’s bound to share, yet he’s always there with support and solutions when you need them.",
    image: "/static/media/bhushan.0248cb2c.JPG"
  },
  {
    id: 4,
    name: "Tanmay Kulkarni",
    position: "Chief Secretary Academic Affairs",
    email: "22b2188@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/tanmaykulkarni3/",
    instagram: "https://www.instagram.com/tanmay_kulkarni__/",
    bio: "The “hamesha mast rehne ka” guy, always spreading good vibes. A proud Marathi and former cadet, he’s smart, philosophical, and the go-to for intellectual debates. A true patriot with a hidden talent for writing, he may seem “sakal se bhola,” but there’s much more to him than meets the eye. Even though he does RR, he’s still great at everything he touches.",
    image: "/static/media/tanmay1.9e7f4397.jpg"
  },
  {
    id: 5,
    name: "Himanshu Sharma",
    position: "Department Coordinator",
    email: "23m1693@iitb.ac.in",
    linkedin: "https://in.linkedin.com/in/himanshu-1998",
    instagram: "https://www.instagram.com/himanshu_1998_/",
    bio: "Balancing serious work with a spark of spontaneity. He’s the kind of person who might suggest a cup of tea at 2 a.m. or a thrilling pool game at 4 a.m.! His weekends are filled with DIY projects, squash matches, and exciting trekking adventures that keep his spirit alive and his friends guessing what he’ll come up with next!",
    image: "/static/media/himanshu.9540227c.jpg"
  },
   {
    id: 6,
    name: "Harishkumar Gajakosh",
    position: "PG Cultural Secretary",
    email: "23m1681@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/hklg/",
    instagram: "https://www.instagram.com/lets.chillax/",
    bio: "He is a photography enthusiast with a love for capturing moments. When not behind the camera, you’ll likely find him battling it out in Clash Royale. Binge-watching anime is one of his other favourite pastimes But that’s not all—being drawn to co-curriculars with a cultural twist keeps life full of exciting events and fresh perspectives.",
    image: "/static/media/harish.41d8bff1.png"
  },
  {
    id: 7,
    name: "Sumit Anand",
    position: "PG Sports Secretary",
    email: "23m1634@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/sumit-anand-49190a171?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/_s.aanand_44/",
    bio: "He has spent unforgettable years in the picturesque landscapes of Uttarakhand, where he discovered his passion for hilly escapades. His secret weapon? A fit physique that fuels his athletic pursuits and keeps him ready for any challenge. Juggling academics, sports, and a dash of playful flirting, he knows how to keep campus life exciting. A history buff with a fascination for World War tales, he is always ready to share a laugh or an engaging story, ensuring that every gathering is lively and memorable.",
    image: "/static/media/sumit.b1275535.jpg"
  },
  {
    id: 8,
    name: "Vinay Kumar Tiwari",
    position: "Department Coordinator",
    email: "23m1644@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/vinay-kumar-tiwari-163847263/?originalSubdomain=in",
    instagram: "https://www.instagram.com/vinaytiwari5789/",
    bio: "Believes in balancing life with purpose and knows that hard work is the foundation for achieving anything truly meaningful. Drawn to tackling technical challenges, he’s passionate about finding solutions that combine elegance with precision to push the boundaries of innovation. Focused on making a positive impact, he brings a fresh perspective to every project, always striving to make a difference in society.",
    image: "/static/media/vinay.2421e9e7.jpeg"
  },
  {
    id: 9,
    name: "Meghraj Prajapat",
    position: "AURAA(PGAC)",
    email: "23m1583@iitb.ac.in",
    linkedin: null,
    instagram: null,
    bio: "He champions a balanced lifestyle, firmly believing that a happy mind and a fit body are essential ingredients for boosting productivity and successfully achieving his goals. With a passion for tackling complex technical challenges, he thrives on the excitement of discovering innovative solutions, particularly in research that requires a high level of precision and detail. Driven by an insatiable curiosity and a strong desire to push the boundaries of engineering, he is on a mission to integrate AI into his work, aiming for groundbreaking advancements that make a real difference.",
    image: "/static/media/meghraj.156a2d31.jpg"
  },
  {
    id: 10,
    name: "Manish Kumar",
    position: "PhD Representative",
    email: "manish94@iitb.ac.in",
    linkedin: null,
    instagram: null,
    bio: "Grounded and straightforward, he values simplicity in life and believes in staying true to his roots, balancing ambition with a practical outlook. Immersed in his academic journey, he’s recognized not only for his dedication to learning but also for his easygoing nature and commitment to honoring his promises. When it comes to tough decisions, he’s one to follow his heart over his mind, letting his instincts and emotions guide him toward what feels genuinely right.",
    image: "/static/media/manish.78c95bca.jpg"
  },
  {
    id: 11,
    name: "Aditya Udeniya",
    position: "UG Sports Secretary",
    email: "23b2109@iitb.ac.in",
    linkedin: null,
    instagram: null,
    bio: "Popularly referred to by his last name, he’s the council’s resident comedian, always ready to turn any situation into a laugh. Officially the sports secy, but he’s involved in everything—from getting work done to snapping photos at every event and making sure there’s food at every meet. Behind all the jokes (and bakchodi), he’s incredibly dependable, taking on any task with enthusiasm. With his signature “sahi baat hai,” he’s always fun to be around and someone you can count on.",
    image: "/static/media/aditya.f201ff7a.jpg"
  },
  {
    id: 12,
    name: "Adrika Das",
    position: "Design Secretary",
    email: "23b2171@iitb.ac.in",
    linkedin: null,
    instagram: null,
    bio: "A creative powerhouse, Adrika can bring any idea to life in minutes, Photoshopping anything into existence with ease. Known as the council’s “sushi girl,” she’s always fueled by good food and her passion for design. Her high-pitched voice and love for drama add to her charm, and she’s a pro at getting everyone’s secrets. Hardworking, yet always full of fun, she’s the one who breaks the silence with jokes and turns serious moments into laughter.",
    image: "/static/media/adrika.5c2558b3.jpeg"
  },
  {
    id: 13,
    name: "Devasish Behera",
    position: "Media Secretary",
    email: "23b2291@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/devasish-behera-474409278?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram: "https://instagram.com/devasssish",
    bio: "Meet the quiet genius of our council – the guy who rocks loose-fit clothes, always behind the lens capturing those stunning, candid shots that give us our best moments. Usually tucked away in his own world with headphones on, but when he does speak, it’s always worth listening to. His editing skills? Absolutely top-notch. He’s got the flair of a future vlogging star. You might find him lost in the brainrot side of Instagram, but he's always cooking up something that'll keep you glued to your screens.",
    image: "/static/media/devasish.6d644b9b.jpeg"
  },
  {
    id: 14,
    name: "Dhriti Singh",
    position: "Senior Editor",
    email: "23b2108@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/dhriti-singh-194aa92a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram: null,
    bio: "No one can beat her at having multiple tabs and apps open, much like her mind, which has evolved just right for yapping 24/7. Swears by Taylor Swift and is always up to date with the celebrity gossip. When she’s not being a full-on Swiftie (never), she is either speaking in AI or cooking on Google Docs. She has labelled herself as an “introvert,” so if you find her showing golden retriever energy around you, then Congratulations! You’ve crossed the “I Don't Know You Yet” stage. Always ready with the best puppy face—especially when food is involved. But charms aside, when she’s at work, she’s in the zone and makes sure everyone else is too.",
    image: "/static/media/dhriti.3055c706.jpg"
  },
  {
    id: 15,
    name: "Kaavya Vasu",
    position: "2nd Year CR",
    email: "23b2194@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/kaavya-vasu-5aa278290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/kaavya_vasu17?igsh=amlpcjQ5b25pYXI=",
    bio: "Wannabe superstar with rizz levels off the charts and a blowout that's got all the ladies jealous. From racing team to StyleUp to MEA to gym, he's basically got a PhD in 'being everywhere.' With a humor that could lead to a live-action adaptation of Flynn Rider surrounded with swords, he’ll throw his most creative, colorful gaali your way—which, from him, is practically a badge of honor. Beneath all that swagger, he’s one of the few who’ll genuinely hear you out—even if he’s judging your music taste the whole time.",
    image: "/static/media/kaavya.c782329c.jpg"
  },
  {
    id: 16,
    name: "Keshav Goyal",
    position: "Associate Secretary",
    email: "23B2121@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/keshav-goyal-9b2504299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram: "https://www.instagram.com/keshavgoyal6335/",
    bio: "The guy who somehow nails both street smartness and top grades—all while staying calm like it’s no big deal. He’s got that “consultant” vibe, always talking in this smooth, diplomatic tone that makes even chaos sound manageable. Though he's a Delhi boy, he doesn’t bring the usual Delhi spice; he's more like the council’s peace negotiator. Reliable, chill, and always on top of things—he’s the guy who can charm his way through any task.",
    image: "/static/media/keshav.4f2e1223.png"
  },
  {
    id: 17,
     name: "Khushi Sharma",
    position: "2nd Year CR",
    email: "23b2182@iitb.ac.in",
    linkedin: "https://www.linkedin.com/in/khushi-sharma-10b93b286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram: "https://www.instagram.com/khushi_knrs/profilecard/?igsh=eXJ6eXFqa2VmeTRs",
    bio: "Juggling over a zillion tasks, each requiring umpteen hours, she still finishes everything on time! She’s a multi-talented powerhouse: dancer, singer, speaker, poet...you name it, she’s already good at it. Constantly on the move but somehow always free for a chat, she’s the friend who can handle your problems while finishing her to-do list. Despite all her impressive achievements, she’s still one of the kindest people in insti—basically a superhuman with a heart of gold.",
    image: "/static/media/khushi.a74da7b3.jpg"
  }
]

const TeamMemberCard = ({ member }: { member: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div 
      className="h-[400px] w-full perspective-1000" 
      onClick={handleFlip}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of Card */}
        <Card className="absolute w-full h-full backface-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-transparent hover:border-mea-gold transition-all duration-300">
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
            
            <div className="flex space-x-3 mt-2">
              {member.email && (
                <a 
                  href={`mailto:${member.email}`}
                  className="text-gray-500 dark:text-gray-400 hover:text-mea-gold transition-colors"
                  aria-label={`Email ${member.name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail size={18} />
                </a>
              )}
              {member.linkedin && (
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-mea-gold transition-colors"
                  aria-label={`${member.name}'s LinkedIn profile`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={18} />
                </a>
              )}
              {member.instagram && (
                <a 
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-mea-gold transition-colors"
                  aria-label={`${member.name}'s Instagram profile`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Instagram size={18} />
                </a>
              )}
            </div>
            
            <div className="absolute bottom-4 text-center w-full">
              <span className="text-xs font-medium text-mea-gold inline-flex items-center">
                Click to view bio
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* Back of Card */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 cursor-pointer overflow-hidden">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="mb-2 flex flex-col items-center">
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-mea-gold font-medium text-sm">{member.position}</p>
            </div>
            
            <div className="flex-grow overflow-auto custom-scrollbar my-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {member.bio || "No bio available."}
              </p>
            </div>
            
            <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center gap-4">
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`}
                    className="text-gray-500 hover:text-mea-gold transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail size={18} />
                  </a>
                )}
                {member.linkedin && (
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-mea-gold transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {member.instagram && (
                  <a 
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-mea-gold transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram size={18} />
                  </a>
                )}
              </div>
              <div className="text-xs text-center text-gray-500 mt-2">
                {member.email}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
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
