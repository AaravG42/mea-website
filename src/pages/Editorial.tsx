
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
    image: "/public/lovable-uploads/f4aa4742-2202-46f3-9eec-cefb01abd89b.png"
  },
  {
    id: 2,
    title: "Student Spotlight: Innovative Projects from the Graduating Batch",
    excerpt: "Highlighting the impressive final-year projects from our most recent batch of mechanical engineering graduates.",
    author: "Dr. Priya Patel",
    date: "March 22, 2023",
    category: "Projects",
    readTime: "6 min read",
    image: "/public/lovable-uploads/5f363352-0705-487a-baed-4c046690236b.png"
  },
  {
    id: 3,
    title: "Industry Collaboration: Bridging Academia and Professional Practice",
    excerpt: "How our department is working with industry partners to enhance student learning and research opportunities.",
    author: "Prof. Rajesh Kumar",
    date: "February 10, 2023",
    category: "Partnerships",
    readTime: "5 min read",
    image: "/public/lovable-uploads/e3fd6b91-d6bc-45ef-8ccf-7fd7292b928d.png"
  },
  {
    id: 4,
    title: "Alumni Success Story: From MEA to SpaceX",
    excerpt: "An inspiring journey of our alumnus who went from leading MEA initiatives to working on cutting-edge aerospace projects.",
    author: "Vikram Singh",
    date: "January 28, 2023",
    category: "Alumni",
    readTime: "7 min read",
    image: "/public/lovable-uploads/6b115935-67fc-4138-8a82-cf42108c1d16.png"
  }
];

// Sample publications
const publications = [
  {
    id: 1,
    title: "Advances in Computational Fluid Dynamics for Aerospace Applications",
    authors: "Kumar A., Patel S., Sharma R.",
    journal: "Journal of Aerospace Engineering",
    year: 2023,
    volume: "45(3)",
    pages: "321-335",
    doi: "10.1234/jae.2023.45.3.321"
  },
  {
    id: 2,
    title: "Hybrid Nanomaterials for Enhanced Thermal Conductivity in Heat Exchangers",
    authors: "Desai M., Singh V., Kapoor N.",
    journal: "International Journal of Heat and Mass Transfer",
    year: 2023,
    volume: "187",
    pages: "123-142",
    doi: "10.1234/ijhmt.2023.187.123"
  },
  {
    id: 3,
    title: "Machine Learning Approaches for Predicting Material Fatigue in Automotive Components",
    authors: "Mehta S., Gupta R., Sharma A.",
    journal: "Materials Science and Engineering: A",
    year: 2022,
    volume: "842",
    pages: "142-156",
    doi: "10.1234/msea.2022.842.142"
  },
  {
    id: 4,
    title: "Sustainable Design Practices in Mechanical Engineering Education",
    authors: "Patel P., Kumar R., Singh V.",
    journal: "Journal of Engineering Education",
    year: 2022,
    volume: "111(2)",
    pages: "287-301",
    doi: "10.1234/jee.2022.111.2.287"
  },
  {
    id: 5,
    title: "Optimization of Additive Manufacturing Parameters for Functional Metal Parts",
    authors: "Kapoor N., Desai M., Gupta R.",
    journal: "Additive Manufacturing",
    year: 2022,
    volume: "58",
    pages: "102-118",
    doi: "10.1234/am.2022.58.102"
  }
];

// Sample newsletters
const newsletters = [
  {
    id: 1,
    title: "MEA Monthly Digest - April 2023",
    date: "April 30, 2023",
    description: "Recap of events, research highlights, and department news from April 2023."
  },
  {
    id: 2,
    title: "MEA Monthly Digest - March 2023",
    date: "March 31, 2023",
    description: "Recap of events, research highlights, and department news from March 2023."
  },
  {
    id: 3,
    title: "MEA Monthly Digest - February 2023",
    date: "February 28, 2023",
    description: "Recap of events, research highlights, and department news from February 2023."
  }
];

const Editorial = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Editorial</CardTitle>
          <CardDescription>
            Explore our blog posts, publications, and newsletters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="blog">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blog">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-2">
                        <span className="text-xs font-medium bg-mea-gold/10 text-mea-gold px-2 py-1 rounded-full">{post.category}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.date}</div>
                        </div>
                        <Button variant="outline" size="sm">Read More</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button>View All Posts</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="publications">
              <div className="space-y-6">
                {publications.map((pub) => (
                  <Card key={pub.id} className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{pub.title}</h3>
                      <p className="text-gray-600 mb-2">{pub.authors}</p>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p><span className="font-medium">Journal:</span> {pub.journal}</p>
                        <p><span className="font-medium">Year:</span> {pub.year}</p>
                        <p><span className="font-medium">Volume:</span> {pub.volume}</p>
                        <p><span className="font-medium">Pages:</span> {pub.pages}</p>
                        <p><span className="font-medium">DOI:</span> <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-mea-gold hover:underline">{pub.doi}</a></p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button>View All Publications</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="newsletters">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsletters.map((newsletter) => (
                  <Card key={newsletter.id} className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center text-mea-gold mb-4">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span className="text-sm">{newsletter.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{newsletter.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{newsletter.description}</p>
                      <Button variant="outline" className="w-full" size="sm">Download PDF</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
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
