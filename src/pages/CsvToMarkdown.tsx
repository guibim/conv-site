import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import FileUploader from "@/components/FileUploader";
import { useLanguage } from "@/contexts/LanguageContext";

const CsvToMarkdown = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Menu />
      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground text-center mb-8">
            {t("page.csv_to_markdown")}
          </h1>
          <FileUploader
            acceptedExtension=".csv"
            outputFormat="md"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CsvToMarkdown;
