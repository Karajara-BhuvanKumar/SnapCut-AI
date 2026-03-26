import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, History as HistoryIcon, Pencil, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";

const History = () => {
  const { user } = useAuth();
  const [processedHistory, setProcessedHistory] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("processed_images")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Unable to load history",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setProcessedHistory(data ?? []);
    };

    fetchHistory();
  }, [toast, user]);

  const handleDownload = async (item: any) => {
    try {
      const response = await fetch(item.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = item.file_name ? `bg-removed-${item.file_name}` : "processed-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Increment download count in DB
      const { error } = await supabase.rpc('increment_download_count', { image_url_val: item.image_url });
      if (error) console.error("Failed to increment download count:", error);
      
      // Update local state
      setProcessedHistory(prev => prev.map(img => 
        img.id === item.id ? { ...img, download_count: (img.download_count || 0) + 1 } : img
      ));

      toast({ title: "Download Started", description: "Your processed image is downloading.", variant: "success" });
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({ title: "Download Failed", description: "Could not download the image. Please try again.", variant: "destructive" });
    }
  };

  const startEditing = (item: any) => {
    setEditingId(item.id);
    setEditName(item.file_name || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveRename = async (id: string) => {
    if (!editName.trim()) return;

    const { error } = await supabase
      .from("processed_images")
      .update({ file_name: editName.trim() })
      .eq("id", id);

    if (error) {
      toast({ title: "Rename failed", description: error.message, variant: "destructive" });
    } else {
      setProcessedHistory(prev => prev.map(item => 
        item.id === id ? { ...item, file_name: editName.trim() } : item
      ));
      setEditingId(null);
      toast({ title: "Renamed", description: "File name updated successfully.", variant: "success" });
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold mb-1">Image Processing History</h1>
          <p className="text-muted-foreground text-sm">View, rename, and download your previously processed images.</p>
        </div>

        {processedHistory.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {processedHistory.map((item, index) => (
              <Card key={item.id || index}>
                <CardContent className="p-4">
                  <div className="relative group">
                    <img src={item.image_url} alt={item.file_name || `Processed ${index}`} className="w-full h-48 object-cover rounded-md mb-3 border border-border/50" />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      Downloads: {item.download_count || 0}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    {editingId === item.id ? (
                      <div className="flex gap-2">
                        <Input 
                          value={editName} 
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8 text-xs"
                          autoFocus
                        />
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500" onClick={() => saveRename(item.id)}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500" onClick={cancelEditing}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate flex-1">{item.file_name || "Untitled Image"}</p>
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-primary" onClick={() => startEditing(item)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {new Date(item.created_at).toLocaleDateString()} • {item.download_count || 0} downloads
                    </p>
                  </div>

                  <Button className="w-full" size="sm" onClick={() => handleDownload(item)}>
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