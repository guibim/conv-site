import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import FileUploader from "@/components/FileUploader";
import { useLanguage } from "@/contexts/LanguageContext";

const TxtToXml = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Menu />
      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground text-center mb-8">
            {t("page.txt_to_xml")}
          </h1>
          <FileUploader
            acceptedExtension=".txt"
            outputFormat="xml"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TxtToXml;
