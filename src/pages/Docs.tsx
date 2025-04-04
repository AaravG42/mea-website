
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ChatbotInterface from "@/components/ChatbotInterface";

// Sample documentation data
const docsData = {
  academics: [
    {
      id: 1,
      title: "BTech Curriculum",
      content: "The BTech program in Mechanical Engineering at IIT Bombay is a four-year program with eight semesters. The curriculum is designed to provide a strong foundation in mechanical engineering principles and practical skills.",
      sections: [
        { id: "core", title: "Core Courses", content: "These are mandatory courses that cover fundamental mechanical engineering concepts." },
        { id: "electives", title: "Elective Courses", content: "Students can choose from a range of specialized elective courses based on their interests." },
        { id: "labs", title: "Laboratory Courses", content: "Hands-on laboratory courses provide practical experience and reinforce theoretical concepts." },
        { id: "projects", title: "Projects", content: "Students undertake major and minor projects to apply their knowledge to real-world problems." }
      ]
    },
    {
      id: 2,
      title: "MTech Curriculum",
      content: "The MTech program in Mechanical Engineering is a two-year program with four semesters. It offers specializations in several areas of mechanical engineering.",
      sections: [
        { id: "specializations", title: "Specializations", content: "Students can specialize in areas such as thermal engineering, manufacturing, robotics, etc." },
        { id: "coursework", title: "Coursework", content: "The first year primarily consists of coursework in the chosen specialization." },
        { id: "thesis", title: "Thesis", content: "The second year is dedicated to thesis research in the chosen specialization area." }
      ]
    }
  ],
  facilities: [
    {
      id: 3,
      title: "Research Laboratories",
      content: "The Mechanical Engineering Department at IIT Bombay is equipped with state-of-the-art research laboratories that support cutting-edge research in various areas of mechanical engineering.",
      sections: [
        { id: "thermal", title: "Thermal Engineering Labs", content: "These labs are equipped for research in heat transfer, thermodynamics, and fluid mechanics." },
        { id: "manufacturing", title: "Manufacturing Labs", content: "These labs have advanced manufacturing equipment including CNC machines and 3D printers." },
        { id: "robotics", title: "Robotics and Automation Labs", content: "These labs are equipped for research in robotics, control systems, and automation." }
      ]
    },
    {
      id: 4,
      title: "Computing Facilities",
      content: "The department provides high-performance computing facilities for computational research and education.",
      sections: [
        { id: "hpc", title: "High-Performance Computing Cluster", content: "A dedicated cluster for computationally intensive simulations and analyses." },
        { id: "software", title: "Engineering Software", content: "Access to a wide range of engineering software for design, analysis, and simulation." }
      ]
    }
  ],
  policies: [
    {
      id: 5,
      title: "Academic Policies",
      content: "These policies govern academic matters such as course registration, examinations, and grading.",
      sections: [
        { id: "registration", title: "Course Registration", content: "Policies regarding course registration, add/drop, and withdrawal." },
        { id: "exams", title: "Examinations", content: "Rules and regulations for midterm and end-term examinations." },
        { id: "grading", title: "Grading System", content: "Information about the grading system and calculation of CPI/SPI." }
      ]
    },
    {
      id: 6,
      title: "Department Policies",
      content: "These are specific policies of the Mechanical Engineering Department.",
      sections: [
        { id: "labs-access", title: "Laboratory Access", content: "Policies regarding access to department laboratories and equipment." },
        { id: "safety", title: "Safety Guidelines", content: "Safety guidelines to be followed in laboratories and workshops." }
      ]
    }
  ]
};

const Docs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("academics");

  // Filter docs based on search term
  const filteredDocs = (docsData as any)[activeCategory].filter((doc: any) => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.sections.some((section: any) => 
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Select the first doc by default if none is selected
  if (!activeDoc && filteredDocs.length > 0) {
    setActiveDoc(filteredDocs[0]);
    if (filteredDocs[0].sections.length > 0) {
      setActiveSection(filteredDocs[0].sections[0].id);
    }
  }

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveDoc(null);
    setActiveSection(null);
  };

  // Handle doc selection
  const handleDocSelect = (doc: any) => {
    setActiveDoc(doc);
    if (doc.sections.length > 0) {
      setActiveSection(doc.sections[0].id);
    } else {
      setActiveSection(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Documentation</CardTitle>
          <CardDescription>
            Explore academic guidelines, facilities, and policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>
            
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documentation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1 border rounded-lg p-4">
                <h3 className="font-medium mb-4">Table of Contents</h3>
                <ul className="space-y-2">
                  {filteredDocs.map((doc: any) => (
                    <li key={doc.id}>
                      <button
                        onClick={() => handleDocSelect(doc)}
                        className={`text-left w-full px-3 py-2 rounded-md ${
                          activeDoc?.id === doc.id 
                            ? 'bg-mea-gold/10 text-mea-gold font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {doc.title}
                      </button>
                      
                      {activeDoc?.id === doc.id && doc.sections.length > 0 && (
                        <ul className="ml-4 mt-2 space-y-1">
                          {doc.sections.map((section: any) => (
                            <li key={section.id}>
                              <button
                                onClick={() => setActiveSection(section.id)}
                                className={`text-left w-full px-3 py-1 rounded-md text-sm ${
                                  activeSection === section.id 
                                    ? 'text-mea-gold font-medium' 
                                    : 'text-gray-600 hover:text-mea-gold'
                                }`}
                              >
                                {section.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  
                  {filteredDocs.length === 0 && (
                    <li className="text-gray-500 italic px-3 py-2">
                      No documents match your search
                    </li>
                  )}
                </ul>
              </div>
              
              {/* Document Content */}
              <div className="lg:col-span-3">
                {activeDoc ? (
                  <div className="p-6 border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">{activeDoc.title}</h2>
                    <p className="text-gray-700 mb-6">{activeDoc.content}</p>
                    
                    {activeDoc.sections.map((section: any) => (
                      <div 
                        key={section.id} 
                        id={section.id}
                        className={`mb-6 ${activeSection === section.id ? 'bg-mea-gold/5 p-4 rounded-lg' : ''}`}
                      >
                        <h3 className="text-xl font-medium mb-2">{section.title}</h3>
                        <p className="text-gray-700">{section.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 border rounded-lg">
                    <p className="text-gray-500">Select a document to view its content</p>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      <ChatbotInterface />
    </div>
  );
};

export default Docs;
