import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import FileUploader from "@/components/FileUploader";
import { useLanguage } from "@/contexts/LanguageContext";

const CsvToXml = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Menu />

      <main className="flex-1 py-16 md:py-24">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              {t("page.csv_to_xml")}
            </h1>
            <FileUploader acceptedExtension=".csv" outputFormat="xml" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CsvToXml;
