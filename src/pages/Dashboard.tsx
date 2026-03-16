import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, Image, Zap, History, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

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
  }, []);

  const handleProcess = () => {
    toast({ title: "Processing...", description: "Connect backend to enable AI processing." });
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
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
                <img src={preview} alt="Original" className="rounded-lg w-full max-h-80 object-contain bg-muted/20" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium">Result</p>
                <div className="rounded-lg w-full h-80 bg-muted/20 flex items-center justify-center" style={{ backgroundImage: "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%)", backgroundSize: "20px 20px" }}>
                  <p className="text-sm text-muted-foreground">Process to see result</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="gradient" onClick={handleProcess}>
                <Zap className="h-4 w-4" /> Remove Background
              </Button>
              <Button variant="outline" disabled>
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const Dashboard = () => (
  <Layout hideFooter>
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Upload Workspace</h1>
        <p className="text-muted-foreground text-sm">Remove backgrounds from your images instantly.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UploadZone />
        </div>

        <div className="space-y-4">
          <Card className="glow-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Image className="h-4 w-4 text-primary" /> Today's Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0 / 5</div>
              <p className="text-xs text-muted-foreground mt-1">images processed today</p>
              <div className="w-full h-2 bg-muted rounded-full mt-3">
                <div className="h-2 gradient-bg rounded-full" style={{ width: "0%" }} />
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
              <p className="text-sm text-muted-foreground">No images processed yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </Layout>
);

export default Dashboard;
