import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, ImageIcon, ShieldCheck, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ExtractMetadata = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  const acceptedTypes = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/tiff": [".tiff", ".tif"],
    "image/webp": [".webp"],
    "image/heic": [".heic"],
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError(t("metadata.error.size"));
        return;
      }
      setFile(selectedFile);
      setError(null);
      setMetadata(null);
    }
  }, [t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxFiles: 1,
    onDropRejected: () => {
      setError(t("metadata.error.type"));
    },
  });

  const handleExtract = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://conv-yw21.onrender.com/extract-exif", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setMetadata(data);
    } catch (err) {
      setError(t("metadata.error.server"));
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setMetadata(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Menu />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("metadata.title")}
              </h1>
              <Badge variant="secondary" className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                <FlaskConical className="h-3 w-3 mr-1" />
                BETA
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              {t("metadata.subtitle")}
            </p>
          </div>

          {/* Beta Notice */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              {t("metadata.betaNotice")}
            </p>
          </div>

          {/* Description */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <p className="text-muted-foreground leading-relaxed">
              {t("metadata.description")}
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            {!file ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">
                  {t("uploader.drag")}{" "}
                  <span className="text-primary font-medium">
                    {t("uploader.browse")}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG, TIFF, WEBP, HEIC
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("metadata.maxSize")}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile}>
                  {t("uploader.remove")}
                </Button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {file && !metadata && (
              <Button
                onClick={handleExtract}
                disabled={isLoading}
                className="w-full mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("metadata.extracting")}
                  </>
                ) : (
                  t("metadata.extract")
                )}
              </Button>
            )}
          </div>

          {/* Trust Message */}
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg mb-6">
            <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              {t("metadata.trust")}
            </p>
          </div>

          {/* Cold Start Warning */}
          <div className="p-4 bg-secondary/20 border border-secondary/30 rounded-lg mb-6">
            <p className="text-xs text-muted-foreground">
              {t("uploader.cold_start")}
            </p>
          </div>

          {/* Metadata Result */}
          {metadata && (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-foreground">
                  {t("metadata.result")}
                </h2>
              </div>
              <div className="p-4 max-h-[500px] overflow-auto">
                <pre className="text-xs font-mono text-foreground whitespace-pre-wrap bg-muted/50 p-4 rounded-lg">
                  {JSON.stringify(metadata, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExtractMetadata;
