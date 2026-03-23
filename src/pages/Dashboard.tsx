import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, Image, Zap, History, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const UploadZone = ({
  usageCount,
  setUsageCount,
  setProcessedHistory,
  userId,
}: {
  usageCount: number;
  setUsageCount: React.Dispatch<React.SetStateAction<number>>;
  setProcessedHistory: React.Dispatch<React.SetStateAction<string[]>>;
  userId: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedPreview, setProcessedPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const MAX_USAGE = 5;

  const validateFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast({ title: "Invalid format", description: "Please upload JPG, PNG, or WEBP.", variant: "destructive" });
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 10MB.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleFile(file);
            break;
          }
        }
      }
    }
  }, [handleFile]);





  const ensureHttpsUrl = (url: string): string => {
    if (url.startsWith("http://res.cloudinary.com")) {
      return url.replace("http://", "https://");
    }
    return url;
  };

  const handleProcess = async () => {
    if (!selectedFile) {
      toast({ title: "No image selected", description: "Please upload an image first.", variant: "destructive" });
      return;
    }

    if (usageCount >= MAX_USAGE) {
      toast({
        title: "Usage Limit Reached",
        description: `You have processed ${MAX_USAGE} images. Please upgrade to process more.`,
        variant: "destructive",
      });
      navigate("/pricing");
      return;
    }

    toast({ title: "Processing...", description: "Sending image to background removal service." });

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("https://bhuvanmeowmeow.app.n8n.cloud/webhook/remove-background", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Webhook response:", result);
      if (result && result.url) {
        const secureUrl = ensureHttpsUrl(result.url);
        const { error: insertError } = await supabase
          .from("processed_images")
          .insert({ user_id: userId, image_url: secureUrl });

        if (insertError) {
          toast({
            title: "Saved with warning",
            description: "Image processed, but failed to save in history.",
            variant: "destructive",
          });
        }

        setProcessedPreview(secureUrl);
        setUsageCount((prevCount) => prevCount + 1); // Increment usage count
        setProcessedHistory((prevHistory) => [secureUrl, ...prevHistory]); // Add to history
        toast({ title: "Success", description: "Background removed! Displaying processed image.", variant: "success" });

        if (usageCount + 1 >= MAX_USAGE) { // Check if limit is reached after incrementing
          toast({
            title: "Usage Limit Reached",
            description: `You have processed ${MAX_USAGE} images. Redirecting to pricing page.`,
            variant: "destructive",
          });
          navigate("/pricing");
        }

      } else {
        toast({ title: "Error", description: "Webhook response did not contain a valid image URL.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error sending image to webhook:", error);
      toast({ title: "Error", description: "Failed to process image. Please try again.", variant: "destructive" });
    }
  };

  const handleDownload = async () => {
    if (processedPreview) {
      try {
        const response = await fetch(processedPreview);
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
    } else {
      toast({ title: "No Image to Download", description: "Please process an image first.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onPaste={handlePaste}
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
          isDragging ? "border-primary bg-primary/5" : "border-border/60 hover:border-primary/50"
        }`}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-display text-lg font-semibold mb-2">
          {isDragging ? "Drop your image here" : "Drag & drop your image"}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse. Supports JPG, PNG, WEBP up to 10MB
        </p>
        <Button variant="gradient" size="sm">Select Image</Button>
      </div>

      {preview && (
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">Original</p>
                {preview ? (
                  <img src={preview} alt="Original" className="rounded-lg w-full max-h-80 object-contain bg-muted/20" />
                ) : (
                  <div className="rounded-lg w-full h-80 bg-muted/20 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Upload an image</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">Result</p>
                {processedPreview ? (
                  <img src={processedPreview} alt="Processed" className="rounded-lg w-full max-h-80 object-contain bg-muted/20" />
                ) : (
                  <div className="rounded-lg w-full h-80 bg-muted/20 flex items-center justify-center" style={{ backgroundImage: "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%)", backgroundSize: "20px 20px" }}>
                    <p className="text-sm text-muted-foreground">Process to see result</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="gradient" onClick={handleProcess}>
                <Zap className="h-4 w-4" /> Remove Background
              </Button>
              <Button variant="outline" onClick={handleDownload} disabled={!processedPreview}>
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [usageCount, setUsageCount] = useState(() => {
    const savedCount = localStorage.getItem("usageCount");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const [processedHistory, setProcessedHistory] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("usageCount", usageCount.toString());
  }, [usageCount]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("processed_images")
        .select("image_url")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(60);

      if (error) {
        console.error("Failed to fetch processed history:", error.message);
        return;
      }

      setProcessedHistory((data ?? []).map((row) => row.image_url));
    };

    fetchHistory();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Layout hideFooter>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold mb-1">Upload Workspace</h1>
          <p className="text-muted-foreground text-sm">Remove backgrounds from your images instantly.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UploadZone
              usageCount={usageCount}
              setUsageCount={setUsageCount}
              setProcessedHistory={setProcessedHistory}
              userId={user.id}
            />
          </div>

        <div className="space-y-4">
          <Card className="glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Image className="h-4 w-4 text-primary" /> Today's Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{usageCount} / 5</div>
              <p className="text-xs text-muted-foreground mt-1">images processed today</p>
              <div className="w-full h-2 bg-muted rounded-full mt-3">
                <div className="h-2 gradient-bg rounded-full" style={{ width: `${(usageCount / 5) * 100}%` }} />
              </div>
            </CardContent>
          </Card>

          <Card className="glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-secondary" /> Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Free</div>
              <p className="text-xs text-muted-foreground mt-1">5 images/day</p>
              <Button variant="gradient" size="sm" className="w-full mt-3">Upgrade</Button>
            </CardContent>
          </Card>

          <Card className="glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <History className="h-4 w-4 text-accent" /> Recent
              </CardTitle>
            </CardHeader>
            <CardContent>
              {processedHistory.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {processedHistory.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Processed ${index}`} className="w-full h-auto rounded-md object-cover" />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No images processed yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </Layout>
);
};

export default Dashboard;