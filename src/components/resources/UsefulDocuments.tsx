
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Download, BookOpen, GraduationCap, Wrench, Calculator } from "lucide-react";

// Sample document data
const documents = {
  "academic": [
    {
      id: 1,
      title: "Curriculum Handbook 2023-24",
      type: "PDF",
      size: "2.4 MB",
      updated: "Aug 15, 2023",
      url: "#"
    },
    {
      id: 2,
      title: "Academic Calendar",
      type: "PDF",
      size: "1.1 MB",
      updated: "Jul 20, 2023",
      url: "#"
    },
    {
      id: 3,
      title: "Course Registration Guide",
      type: "PDF",
      size: "3.7 MB",
      updated: "Jul 25, 2023",
      url: "#"
    },
    {
      id: 4,
      title: "Examination Rules",
      type: "PDF",
      size: "1.8 MB",
      updated: "Aug 5, 2023",
      url: "#"
    }
  ],
  "research": [
    {
      id: 5,
      title: "Research Labs Overview",
      type: "PDF",
      size: "4.2 MB",
      updated: "Jun 10, 2023",
      url: "#"
    },
    {
      id: 6,
      title: "BTech Project Guidelines",
      type: "DOCX",
      size: "1.5 MB",
      updated: "Jul 12, 2023",
      url: "#"
    },
    {
      id: 7,
      title: "Publication Style Guide",
      type: "PDF",
      size: "2.1 MB",
      updated: "May 30, 2023",
      url: "#"
    }
  ],
  "technical": [
    {
      id: 8,
      title: "CAD Software Installation Guide",
      type: "PDF",
      size: "3.3 MB",
      updated: "Apr 18, 2023",
      url: "#"
    },
    {
      id: 9,
      title: "Lab Safety Manual",
      type: "PDF",
      size: "5.6 MB",
      updated: "Mar 22, 2023",
      url: "#"
    },
    {
      id: 10,
      title: "Machine Shop User Guide",
      type: "PDF",
      size: "4.7 MB",
      updated: "Jun 5, 2023",
      url: "#"
    }
  ],
  "forms": [
    {
      id: 11,
      title: "Lab Access Request Form",
      type: "DOCX",
      size: "0.8 MB",
      updated: "Aug 1, 2023",
      url: "#"
    },
    {
      id: 12,
      title: "Equipment Requisition Form",
      type: "DOCX",
      size: "0.7 MB",
      updated: "Jul 15, 2023",
      url: "#"
    },
    {
      id: 13,
      title: "Internship Application Form",
      type: "DOCX",
      size: "1.2 MB",
      updated: "Jun 20, 2023",
      url: "#"
    },
    {
      id: 14,
      title: "Leave Application",
      type: "DOCX",
      size: "0.5 MB",
      updated: "May 10, 2023",
      url: "#"
    }
  ]
};

const renderIcon = (docType: string) => {
  switch (docType) {
    case "PDF":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "DOCX":
      return <FileText className="h-5 w-5 text-blue-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

const UsefulDocuments = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Useful Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="academic">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Academic</span>
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Research</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Technical</span>
            </TabsTrigger>
            <TabsTrigger value="forms" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Forms</span>
            </TabsTrigger>
          </TabsList>
          
          {Object.keys(documents).map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(documents as any)[category].map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center">
                      {renderIcon(doc.type)}
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{doc.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="rounded bg-gray-200 dark:bg-gray-700 px-2 py-0.5">{doc.type}</span>
                          <span className="mx-2">•</span>
                          <span>{doc.size}</span>
                          <span className="mx-2">•</span>
                          <span>Updated: {doc.updated}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="flex-shrink-0" asChild>
                      <a href={doc.url} download>
                        <Download className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Download</span>
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UsefulDocuments;
