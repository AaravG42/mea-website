import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import ChatbotInterface from "@/components/ChatbotInterface";

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "The Future of Mechanical Engineering in a Digital World",
    excerpt: "Exploring how digital technologies are reshaping mechanical engineering education and practice at IIT Bombay and beyond.",
    author: "Prof. Amit Sharma",
    date: "April 15, 2023",
    category: "Technology",
    readTime: "8 min read",
    image: "/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png"
  },
  {
    id: 2,
    title: "Student Spotlight: Innovative Projects from the Graduating Batch",
    excerpt: "Highlighting the impressive final-year projects from our most recent batch of mechanical engineering graduates.",
    author: "Dr. Priya Patel",
    date: "March 22, 2023",
    category: "Projects",
    readTime: "6 min read",
    image: "/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png"
  },
  {
    id: 3,
    title: "Industry Collaboration: Bridging Academia and Professional Practice",
    excerpt: "How our department is working with industry partners to enhance student learning and research opportunities.",
    author: "Prof. Rajesh Kumar",
    date: "February 10, 2023",
    category: "Partnerships",
    readTime: "5 min read",
    image: "/lovable-uploads/e3fd6b91-d6bc-45ef-8ccf-7fd7292b928d.png"
  },
  {
    id: 4,
    title: "Alumni Success Story: From MEA to SpaceX",
    excerpt: "An inspiring journey of our alumnus who went from leading MEA initiatives to working on cutting-edge aerospace projects.",
    author: "Vikram Singh",
    date: "January 28, 2023",
    category: "Alumni",
    readTime: "7 min read",
    image: "/lovable-uploads/6b115935-67fc-4138-8a82-cf42108c1d16.png"
  }
];

// Sample newsletters
const newsletters = [
  {
    id: 1,
    title: "Mechanical Department Newsletter",
    date: "January 30, 2025",
    description: "Recap of events, research highlights, and department news from 2024-25."
  },
  {
    id: 2,
    title: "Freshmen Introductory Booklet 24-25",
    date: "August 20, 2024",
    description: "Anything and everything a UG freshmen needs to get started in the Insti."
  },
  {
    id: 3,
    title: "Mechanical Department Handbook",
    date: "August 20, 2024",
    description: "Recap of events, research highlights, and department news from February 2023."
  }
];

const Editorial = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Editorial</CardTitle>
          <CardDescription>
            Explore our blog posts and newsletters
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <Tabs defaultValue="blog">
            <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blog">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-40 sm:h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-wrap items-center mb-2">
                        <span className="text-xs font-medium bg-mea-gold/10 text-mea-gold px-2 py-1 rounded-full">{post.category}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">{post.excerpt}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <div className="font-medium text-sm">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.date}</div>
                        </div>
                        <Button variant="outline" size="sm" className="self-end sm:self-auto">Read More</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-6 sm:mt-8">
                <Button>View All Posts</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="newsletters">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {newsletters.map((newsletter) => (
                  <Card key={newsletter.id} className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center text-mea-gold mb-3 sm:mb-4">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        <span className="text-xs sm:text-sm">{newsletter.date}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">{newsletter.title}</h3>
                      <p className="text-gray-600 mb-4 text-xs sm:text-sm">{newsletter.description}</p>
                      <Button variant="outline" className="w-full" size="sm">Download PDF</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-6 sm:mt-8">
                <Button>View All Newsletters</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <ChatbotInterface />
    </div>
  );
};

export default Editorial;