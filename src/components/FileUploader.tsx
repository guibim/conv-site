import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle2, X, Loader2, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface FileUploaderProps {
  acceptedExtension: string;
  outputFormat: string;
}

const FileUploader = ({ acceptedExtension, outputFormat }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const fromFormat = acceptedExtension.replace(".", "");
  const toFormat = outputFormat.toLowerCase();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const droppedFile = files[0];
      if (droppedFile.name.endsWith(acceptedExtension)) {
        setFile(droppedFile);
        setIsConverted(false);
        setError(null);
      }
    }
  }, [acceptedExtension]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setIsConverted(false);
      setError(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("from_format", fromFormat);
    formData.append("to_format", toFormat);

    try {
      const response = await fetch("https://conv-api-la6e.onrender.com/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP Error: ${response.status}`);
      }

      const blob = await response.blob();
      const originalName = file.name.replace(/\.[^/.]+$/, "");
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${originalName}.${toFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setIsConverted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsConverting(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setIsConverted(false);
    setError(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Cold Start Warning */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border text-sm">
        <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-muted-foreground">
          {t("uploader.cold_start")}
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center 
          min-h-[200px] p-8 rounded-xl border-2 border-dashed 
          transition-all duration-200 cursor-pointer
          ${isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50"
          }
          ${file ? "bg-accent/20" : ""}
        `}
      >
        <input
          type="file"
          accept={acceptedExtension}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isConverting}
        />

        {!file ? (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary mb-4">
              <Upload className="h-7 w-7 text-primary" />
            </div>
            <p className="text-foreground font-medium mb-1 text-center">
              {t("uploader.drag")} <span className="text-primary">{t("uploader.browse")}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {t("uploader.accepted")} {acceptedExtension}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground truncate max-w-[200px]">
                {file.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                disabled={isConverting}
                className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                aria-label={t("uploader.remove")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("uploader.selected")} {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}
      </div>

      {/* Convert Button */}
      {file && !isConverted && (
        <Button 
          onClick={handleConvert}
          className="w-full"
          size="lg"
          disabled={isConverting}
        >
          {isConverting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t("uploader.converting")}
            </>
          ) : (
            `${t("uploader.convert")} ${outputFormat.toUpperCase()}`
          )}
        </Button>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
          <span className="text-sm text-destructive">
            {t("uploader.error")} {error}
          </span>
        </div>
      )}

      {/* Success Message */}
      {isConverted && (
        <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-accent border border-primary/20">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">
            {t("uploader.success")}
          </span>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
