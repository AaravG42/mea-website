
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Timetable from "@/components/resources/Timetable";
import LabsList from "@/components/resources/LabsList";
import UsefulDocuments from "@/components/resources/UsefulDocuments";
import ChatbotInterface from "@/components/ChatbotInterface";

const Resources = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Resources</CardTitle>
          <CardDescription>
            Access academic timetables, lab information, and useful documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timetable">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="timetable">Academic Timetable</TabsTrigger>
              <TabsTrigger value="labs">Labs Information</TabsTrigger>
              <TabsTrigger value="documents">Useful Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timetable">
              <Timetable />
            </TabsContent>
            
            <TabsContent value="labs">
              <LabsList />
            </TabsContent>
            
            <TabsContent value="documents">
              <UsefulDocuments />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <ChatbotInterface />
    </div>
  );
};

export default Resources;
