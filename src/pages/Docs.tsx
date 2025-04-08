
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ChatbotInterface from "@/components/ChatbotInterface";

// Updated documentation data based on the image
const docsData = {
  rulebooks: [
    {
      id: 1,
      title: "Department Constitution",
      content: "The Department Constitution outlines the governance structure, roles, and responsibilities within the Mechanical Engineering Department.",
      pdfUrl: "#"
    },
    {
      id: 2,
      title: "UG Rulebook",
      content: "The Undergraduate Rulebook contains guidelines, policies, and procedures for undergraduate students in the Mechanical Engineering Department.",
      pdfUrl: "#"
    },
    {
      id: 3,
      title: "Masters Rulebook",
      content: "The Masters Rulebook provides information on programs, requirements, and procedures for master's degree students in Mechanical Engineering.",
      pdfUrl: "#"
    },
    {
      id: 4,
      title: "PhD Rulebook",
      content: "The PhD Rulebook outlines the requirements, procedures, and guidelines for doctoral students in the Mechanical Engineering Department.",
      pdfUrl: "#"
    }
  ],
  guidelines: [
    {
      id: 5,
      title: "Project-based Course Guidelines",
      content: "These guidelines provide information on how project-based courses are structured and evaluated in the Mechanical Engineering Department.",
      pdfUrl: "#"
    },
    {
      id: 6,
      title: "UGAC Booklets",
      content: "UGAC (Undergraduate Academic Committee) booklets containing information on undergraduate academic matters.",
      pdfUrl: "#"
    },
    {
      id: 7,
      title: "Univ Intern Booklet",
      content: "The University Internship Booklet provides information on internship opportunities, procedures, and requirements for students.",
      pdfUrl: "#"
    },
    {
      id: 8,
      title: "Internship Guide 101",
      content: "A comprehensive guide to help students navigate the internship process from application to completion.",
      pdfUrl: "#"
    }
  ],
  miscellaneous: [
    {
      id: 9,
      title: "Core Resume Repository",
      content: "A collection of resume templates and examples for students in the Mechanical Engineering Department.",
      pdfUrl: "#"
    },
    {
      id: 10,
      title: "DCAMP Previous Year Resume Repos",
      content: "Repository of resumes from previous years' DCAMP (Department Campus Placement) activities.",
      pdfUrl: "#"
    },
    {
      id: 11,
      title: "ISCP Handbook",
      content: "The Institute Student Companion Program (ISCP) handbook provides guidance for student mentors and mentees.",
      pdfUrl: "#"
    },
    {
      id: 12,
      title: "Student Application Form",
      content: "Application forms for various student programs, scholarships, and activities in the department.",
      pdfUrl: "#"
    },
    {
      id: 13,
      title: "Retagging norms",
      content: "Guidelines for the retagging process for courses and academic records.",
      pdfUrl: "#"
    }
  ]
};

const Docs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("rulebooks");

  // Filter docs based on search term
  const filteredDocs = (docsData as any)[activeCategory].filter((doc: any) => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Select the first doc by default if none is selected
  if (!activeDoc && filteredDocs.length > 0) {
    setActiveDoc(filteredDocs[0]);
  }

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveDoc(null);
  };

  // Handle doc selection
  const handleDocSelect = (doc: any) => {
    setActiveDoc(doc);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Documentation</CardTitle>
          <CardDescription>
            Access rulebooks, guidelines, and miscellaneous documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="rulebooks">Rulebooks</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="miscellaneous">Miscellaneous</TabsTrigger>
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
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                      >
                        {doc.title}
                      </button>
                    </li>
                  ))}
                  
                  {filteredDocs.length === 0 && (
                    <li className="text-gray-500 dark:text-gray-400 italic px-3 py-2">
                      No documents match your search
                    </li>
                  )}
                </ul>
              </div>
              
              {/* Document Content - PDF Embed */}
              <div className="lg:col-span-3">
                {activeDoc ? (
                  <div className="p-6 border rounded-lg h-full">
                    <div className="flex items-center mb-4">
                      <FileText className="text-mea-gold h-6 w-6 mr-2" />
                      <h2 className="text-2xl font-semibold">{activeDoc.title}</h2>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{activeDoc.content}</p>
                    
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">PDF document preview:</p>
                    </div>
                    
                    <div className="w-full h-[500px] border rounded bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                      {/* This would be replaced with an actual PDF embed in production */}
                      <div className="text-center p-4">
                        <FileText className="h-10 w-10 mx-auto mb-4 text-mea-gold/60" />
                        <p className="text-gray-500 dark:text-gray-400">PDF Document would be embedded here</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{activeDoc.title}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 border rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">Select a document to view its content</p>
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
