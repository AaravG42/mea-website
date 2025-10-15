// 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Search, FileText, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
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

// Updated newsletters data with PDF URLs
const newslettersData = [
  {
    id: 1,
    title: "Freshie Booklet 25-26",
    content: "Everything a UG freshman needs to get started in the Institute - comprehensive guide for new students.",
    date: "August 2025",
    pdfUrl: "https://heyzine.com/flip-book/28c00a021d.html",
    isFlipbook: true
  },
  {
    id: 2,
    title: "Freshmen Introductory Booklet 24-25",
    content: "Anything and everything a UG freshmen needs to get started in the Insti.",
    date: "August 20, 2024",
    pdfUrl: "https://drive.google.com/file/d/1_5xQfWwkKnz_GDfCewDOCwlx-KdD8ixN/view?usp=drive_link"
  },
  {
    id: 3,
    title: "Mechanical Department Handbook",
    content: "Recap of events, research highlights, and department news from February 2023.",
    date: "August 20, 2024",
    pdfUrl: "https://drive.google.com/file/d/1Ysv1q5w6SNGOHnm6z_J58zmAteAY72ca/view?usp=drive_link"
  },
  {
    id: 4,
    title: "Department Annual Report 2024",
    content: "Comprehensive annual report covering all department activities, achievements, and future plans.",
    date: "December 15, 2024",
    pdfUrl: "https://drive.google.com/file/d/1rvmoje3AYXyh9E2qXI2k0h20p466OVNT/view?usp=drive_link"
  },
  {
    id: 5,
    title: "Student Activities Newsletter",
    content: "Monthly newsletter highlighting student achievements, events, and upcoming activities.",
    date: "November 30, 2024",
    pdfUrl: "#"
  },
  {
    id: 6,
    title: "Research Highlights Quarterly",
    content: "Quarterly publication showcasing the latest research projects and publications from faculty and students.",
    date: "October 15, 2024",
    pdfUrl: "#"
  }
];

const Editorial = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNewsletter, setActiveNewsletter] = useState<any>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredNewsletters = newslettersData.filter((newsletter) => 
    newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    newsletter.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!activeNewsletter && filteredNewsletters.length > 0) {
      setActiveNewsletter(filteredNewsletters[0]);
    }
  }, [filteredNewsletters]);

  const handleNewsletterSelect = (newsletter: any) => {
    setActiveNewsletter(newsletter);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/d\/([^\/]+)/);
      if (fileId && fileId[1]) {
        return `https://drive.google.com/file/d/${fileId[1]}/preview`;
      }
    }
    return url;
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Editorial</CardTitle>
          <CardDescription>
            Explore our newsletters and research at Mechanical Engineering Department, IIT Bombay
            </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <Tabs defaultValue="blog">
            <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
              <TabsTrigger value="blog">Research</TabsTrigger>
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
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search newsletters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div className="lg:grid lg:grid-cols-4 lg:gap-6">
                {isMobile && !showSidebar && (
                  <div className="mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowSidebar(true)} 
                      className="flex items-center text-sm gap-1 w-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back to Newsletter List
                    </Button>
                  </div>
                )}
                
                {(!isMobile || showSidebar) && (
                  <div className={`lg:col-span-1 border rounded-lg p-3 sm:p-4 dark:border-gray-700 mb-4 lg:mb-0 ${isMobile && activeNewsletter ? 'animate-in fade-in-0 zoom-in-95' : ''}`}>
                    <h3 className="font-medium mb-3 text-sm sm:text-base">Newsletters</h3>
                    {filteredNewsletters.length > 0 ? (
                      <ul className="space-y-1 sm:space-y-2">
                        {filteredNewsletters.map((newsletter) => (
                          <li key={newsletter.id}>
                            <button
                              onClick={() => handleNewsletterSelect(newsletter)}
                              className={`text-left w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-sm ${
                                activeNewsletter?.id === newsletter.id 
                                  ? 'bg-mea-gold/10 text-mea-gold font-medium' 
                                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                              }`}
                            >
                              <div className="font-medium">{newsletter.title}</div>
                              <div className="text-xs text-gray-500 mt-1">{newsletter.date}</div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400 italic px-3 py-2 text-sm">
                        No newsletters match your search
                      </div>
                    )}
                  </div>
                )}
                
                {(!isMobile || (isMobile && !showSidebar && activeNewsletter)) && (
                  <div className={`lg:col-span-3 ${isMobile && !showSidebar ? 'animate-in fade-in-0 zoom-in-95' : ''}`}>
                    {activeNewsletter ? (
                      <div className="p-3 sm:p-6 border rounded-lg h-full dark:border-gray-700">
                        <div className="flex items-center mb-3 sm:mb-4">
                          <FileText className="text-mea-gold h-5 w-5 sm:h-6 sm:w-6 mr-2 flex-shrink-0" />
                          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{activeNewsletter.title}</h2>
                        </div>
                        
                        <div className="flex items-center text-mea-gold mb-3 sm:mb-4">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          <span className="text-sm sm:text-base">{activeNewsletter.date}</span>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">{activeNewsletter.content}</p>
                        
                        {activeNewsletter.pdfUrl !== "#" ? (
                          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] border rounded overflow-hidden">
                            {activeNewsletter.isFlipbook ? (
                              <iframe 
                                src={activeNewsletter.pdfUrl} 
                                width="100%" 
                                height="100%" 
                                allow="autoplay"
                                className="border-0"
                                loading="lazy"
                                title={activeNewsletter.title}
                                style={{ border: 'none' }}
                              ></iframe>
                            ) : (
                              <iframe 
                                src={getEmbedUrl(activeNewsletter.pdfUrl)} 
                                width="100%" 
                                height="100%" 
                                allow="autoplay"
                                className="border-0"
                                loading="lazy"
                                title={activeNewsletter.title}
                              ></iframe>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] border rounded bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                            <div className="text-center p-4">
                              <FileText className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-3 sm:mb-4 text-mea-gold/60" />
                              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Newsletter preview not available</p>
                              <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1 sm:mt-2">{activeNewsletter.title}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48 sm:h-64 border rounded-lg dark:border-gray-700">
                        <div className="text-center">
                          <FileText className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Select a newsletter to view its content</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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