import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, History as HistoryIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const History = () => {
  const [processedHistory, setProcessedHistory] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedHistory = localStorage.getItem("processedHistory");
    if (savedHistory) {
      setProcessedHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "processed-image.png"; // You can make this dynamic if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the object URL
      toast({ title: "Download Started", description: "Your processed image is downloading.", variant: "success" });
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({ title: "Download Failed", description: "Could not download the image. Please try again.", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold mb-1">Image Processing History</h1>
          <p className="text-muted-foreground text-sm">View and download your previously processed images.</p>
        </div>

        {processedHistory.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {processedHistory.map((imageUrl, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <img src={imageUrl} alt={`Processed ${index}`} className="w-full h-48 object-cover rounded-md mb-2" />
                  <Button className="w-full" onClick={() => handleDownload(imageUrl)}>
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <HistoryIcon className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg">No processed images in your history yet.</p>
            <p className="text-sm">Upload and process an image on the dashboard to see it here.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;