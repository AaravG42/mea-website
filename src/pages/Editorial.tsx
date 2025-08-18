import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatbotInterface from "@/components/ChatbotInterface";

const Editorial = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Editorial</CardTitle>
          <CardDescription>
            MEA Freshie Booklet
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="w-full h-[70vh] rounded-md overflow-hidden border">
            <iframe
              title="MEA Freshie Booklet"
              src="https://heyzine.com/flip-book/28c00a021d.html"
              className="w-full h-full"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button asChild variant="outline">
              <a href="https://heyzine.com/flip-book/28c00a021d.html" target="_blank" rel="noopener noreferrer">
                Open in new tab
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
      <ChatbotInterface />
    </div>
  );
};

export default Editorial;