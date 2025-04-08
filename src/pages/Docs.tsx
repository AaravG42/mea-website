
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
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
      sections: [
        { id: "governance", title: "Governance Structure", content: "Details about the department's governance structure and hierarchy." },
        { id: "roles", title: "Roles and Responsibilities", content: "Detailed descriptions of roles and responsibilities of various positions in the department." },
        { id: "amendments", title: "Amendment Process", content: "Procedures for amending the department constitution." }
      ]
    },
    {
      id: 2,
      title: "UG Rulebook",
      content: "The Undergraduate Rulebook contains guidelines, policies, and procedures for undergraduate students in the Mechanical Engineering Department.",
      sections: [
        { id: "admission", title: "Admission Criteria", content: "Requirements and procedures for undergraduate admission." },
        { id: "curriculum", title: "Curriculum Structure", content: "Overview of the undergraduate curriculum and credit requirements." },
        { id: "evaluation", title: "Evaluation System", content: "Details about the examination and grading system for undergraduate students." }
      ]
    },
    {
      id: 3,
      title: "Masters Rulebook",
      content: "The Masters Rulebook provides information on programs, requirements, and procedures for master's degree students in Mechanical Engineering.",
      sections: [
        { id: "programs", title: "Masters Programs", content: "Overview of different master's programs offered by the department." },
        { id: "requirements", title: "Degree Requirements", content: "Requirements for completing a master's degree in Mechanical Engineering." },
        { id: "thesis", title: "Thesis Guidelines", content: "Guidelines for preparing and submitting a master's thesis." }
      ]
    },
    {
      id: 4,
      title: "PhD Rulebook",
      content: "The PhD Rulebook outlines the requirements, procedures, and guidelines for doctoral students in the Mechanical Engineering Department.",
      sections: [
        { id: "admission-phd", title: "Admission Requirements", content: "Requirements and procedures for PhD admission." },
        { id: "qualifying", title: "Qualifying Examination", content: "Information about the PhD qualifying examination process." },
        { id: "dissertation", title: "Dissertation Guidelines", content: "Guidelines for preparing and defending a doctoral dissertation." }
      ]
    }
  ],
  guidelines: [
    {
      id: 5,
      title: "Project-based Course Guidelines",
      content: "These guidelines provide information on how project-based courses are structured and evaluated in the Mechanical Engineering Department.",
      sections: [
        { id: "structure", title: "Course Structure", content: "Structure and organization of project-based courses." },
        { id: "evaluation-project", title: "Evaluation Criteria", content: "Criteria for evaluating student performance in project-based courses." },
        { id: "deliverables", title: "Expected Deliverables", content: "Required deliverables for project-based courses." }
      ]
    },
    {
      id: 6,
      title: "UGAC Booklets",
      content: "UGAC (Undergraduate Academic Committee) booklets containing information on undergraduate academic matters.",
      sections: [
        { id: "policies", title: "Academic Policies", content: "Policies governing undergraduate academic matters." },
        { id: "procedures", title: "Procedures", content: "Procedures for various academic processes for undergraduate students." }
      ]
    },
    {
      id: 7,
      title: "Univ Intern Booklet",
      content: "The University Internship Booklet provides information on internship opportunities, procedures, and requirements for students.",
      sections: [
        { id: "opportunities", title: "Internship Opportunities", content: "Information about various internship opportunities available to students." },
        { id: "process", title: "Application Process", content: "Process for applying for internships through the university." },
        { id: "credit", title: "Internship for Credit", content: "Information about earning academic credit for internships." }
      ]
    },
    {
      id: 8,
      title: "Internship Guide 101",
      content: "A comprehensive guide to help students navigate the internship process from application to completion.",
      sections: [
        { id: "preparation", title: "Preparation", content: "How to prepare for applying to internships." },
        { id: "application", title: "Application Tips", content: "Tips for successful internship applications." },
        { id: "performance", title: "On-the-job Performance", content: "Guidelines for professional conduct and performance during internships." }
      ]
    }
  ],
  miscellaneous: [
    {
      id: 9,
      title: "Core Resume Repository",
      content: "A collection of resume templates and examples for students in the Mechanical Engineering Department.",
      sections: [
        { id: "templates", title: "Resume Templates", content: "Templates for creating effective resumes." },
        { id: "examples", title: "Sample Resumes", content: "Example resumes from successful students and alumni." }
      ]
    },
    {
      id: 10,
      title: "DCAMP Previous Year Resume Repos",
      content: "Repository of resumes from previous years' DCAMP (Department Campus Placement) activities.",
      sections: [
        { id: "industry-wise", title: "Industry-wise Resumes", content: "Resumes categorized by industry sectors." },
        { id: "success-stories", title: "Success Stories", content: "Success stories and placement highlights from previous years." }
      ]
    },
    {
      id: 11,
      title: "ISCP Handbook",
      content: "The Institute Student Companion Program (ISCP) handbook provides guidance for student mentors and mentees.",
      sections: [
        { id: "mentor", title: "Mentor Guidelines", content: "Guidelines for student mentors in the ISCP program." },
        { id: "mentee", title: "Mentee Resources", content: "Resources and support available for mentees." }
      ]
    },
    {
      id: 12,
      title: "Student Application Form",
      content: "Application forms for various student programs, scholarships, and activities in the department.",
      sections: [
        { id: "scholarships", title: "Scholarship Applications", content: "Forms for applying to departmental scholarships." },
        { id: "programs", title: "Program Applications", content: "Forms for special programs and activities." }
      ]
    },
    {
      id: 13,
      title: "Retagging norms",
      content: "Guidelines for the retagging process for courses and academic records.",
      sections: [
        { id: "process", title: "Retagging Process", content: "Step-by-step guide to the retagging process." },
        { id: "criteria", title: "Eligibility Criteria", content: "Criteria for retagging courses in academic records." }
      ]
    }
  ]
};

const Docs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDoc, setActiveDoc] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("rulebooks");

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
                      
                      {activeDoc?.id === doc.id && doc.sections.length > 0 && (
                        <ul className="ml-4 mt-2 space-y-1">
                          {doc.sections.map((section: any) => (
                            <li key={section.id}>
                              <button
                                onClick={() => setActiveSection(section.id)}
                                className={`text-left w-full px-3 py-1 rounded-md text-sm ${
                                  activeSection === section.id 
                                    ? 'text-mea-gold font-medium' 
                                    : 'text-gray-600 hover:text-mea-gold dark:text-gray-400 dark:hover:text-mea-gold'
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
                    <li className="text-gray-500 dark:text-gray-400 italic px-3 py-2">
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
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{activeDoc.content}</p>
                    
                    {activeDoc.sections.map((section: any) => (
                      <div 
                        key={section.id} 
                        id={section.id}
                        className={`mb-6 ${activeSection === section.id ? 'bg-mea-gold/5 p-4 rounded-lg' : ''}`}
                      >
                        <h3 className="text-xl font-medium mb-2">{section.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
                      </div>
                    ))}
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
