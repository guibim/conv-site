import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Menu
    "menu.converter": "Converter",
    "menu.metadata": "Extrair Metadados",
    "menu.about": "Sobre",
    
    // Metadata Page
    "metadata.title": "Extrair Metadados de Imagem",
    "metadata.subtitle": "Recurso em fase de testes e desenvolvimento",
    "metadata.betaNotice": "Esta funcionalidade está em fase beta. O endpoint de extração de metadados está sendo testado e aprimorado. Resultados podem variar dependendo do formato e metadados disponíveis na imagem.",
    "metadata.description": "Faça upload de um arquivo de imagem para extrair metadados disponíveis como EXIF, GPS, IPTC, XMP e informações técnicas do arquivo. O arquivo é processado temporariamente e nenhum dado é armazenado.",
    "metadata.maxSize": "Tamanho máximo: 10MB",
    "metadata.extract": "Extrair Metadados",
    "metadata.extracting": "Extraindo...",
    "metadata.result": "Metadados Extraídos (JSON)",
    "metadata.download": "Baixar JSON",
    "metadata.trust": "Os arquivos são processados temporariamente durante a requisição. Nenhuma imagem ou metadado é armazenado no servidor.",
    "metadata.error.type": "Formato de arquivo inválido. Por favor, envie um arquivo de imagem.",
    "metadata.error.size": "O arquivo excede o tamanho máximo permitido.",
    "metadata.error.server": "Não foi possível extrair metadados desta imagem.",
    
    // Index
    "index.title": "Converta seus arquivos facilmente",
    "index.subtitle": "Conversões simples, rápidas e seguras — sem instalação necessária.",
    "index.filter.all": "TODOS",
    "index.filter.csv": "CSV",
    "index.filter.xlsx": "XLSX",
    "index.filter.dta": "DTA",
    "index.filter.txt": "TXT",
    "index.filter.json": "JSON",
    "index.filter.xml": "XML",
    "index.filter.html": "HTML",
    "index.filter.bim": "BIM / IFC",
    
    // Groups
    "group.csv": "Conversores CSV",
    "group.xlsx": "Conversores XLSX",
    "group.dta": "Conversores DTA (Stata)",
    "group.txt": "Conversores TXT",
    "group.json": "Conversores JSON",
    "group.xml": "Conversores XML",
    "group.html": "Conversores HTML",
    "group.bim": "BIM / IFC",
    
    // Conversions
    "conv.dta_to_csv": "DTA → CSV (Stata)",
    "conv.csv_to_dta": "CSV → DTA",
    "conv.txt_to_csv": "TXT para CSV",
    "conv.csv_to_txt": "CSV para TXT",
    "conv.csv_to_json": "CSV para JSON",
    "conv.json_to_csv": "JSON para CSV",
    "conv.csv_to_xml": "CSV para XML",
    "conv.xml_to_csv": "XML para CSV",
    "conv.xml_to_json": "XML para JSON",
    "conv.csv_to_html": "CSV para HTML",
    "conv.csv_to_sql": "CSV para SQL",
    "conv.csv_to_markdown": "CSV para Markdown",
    "conv.csv_to_xlsx": "CSV para XLSX",
    "conv.xlsx_to_csv": "XLSX para CSV",
    "conv.html_to_txt": "HTML para TXT",
    "conv.html_to_markdown": "HTML para Markdown",
    "conv.txt_to_json": "TXT para JSON",
    "conv.txt_to_xml": "TXT para XML",
    "conv.json_to_txt": "JSON para TXT",
    "conv.json_to_xml": "JSON para XML",
    "conv.json_to_yaml": "JSON para YAML",
    "conv.ifc_to_csv": "IFC para CSV",
    "conv.ifc_to_json": "IFC para JSON",
    "conv.ifc_to_html": "IFC para HTML",
    "conv.ifc_to_txt": "IFC para TXT",
    
    // Descriptions
    "desc.dta_csv": "Converte arquivos Stata (.dta) para CSV",
    "desc.csv_dta": "Conversão indisponível",
    "desc.txt_csv": "Texto → CSV",
    "desc.csv_txt": "CSV → Texto",
    "desc.csv_json": "CSV → JSON",
    "desc.json_csv": "JSON → CSV",
    "desc.csv_xml": "CSV → XML",
    "desc.xml_csv": "Achata elementos XML em formato CSV tabular",
    "desc.xml_json": "Converte dados XML para JSON estruturado",
    "desc.csv_html": "CSV → HTML",
    "desc.csv_sql": "CSV → SQL",
    "desc.csv_markdown": "CSV → Markdown",
    "desc.csv_xlsx": "CSV → XLSX",
    "desc.xlsx_csv": "XLSX → CSV",
    "desc.html_txt": "HTML → Texto",
    "desc.html_markdown": "HTML → Markdown",
    "desc.txt_json": "Texto → JSON",
    "desc.txt_xml": "Texto → XML",
    "desc.json_txt": "JSON → Texto",
    "desc.json_xml": "JSON → XML",
    "desc.json_yaml": "JSON → YAML",
    "desc.ifc_csv": "Resumo de entidades",
    "desc.ifc_json": "Resumo do modelo",
    "desc.ifc_html": "Relatório BIM",
    "desc.ifc_txt": "Relatório de metadados",
    
    // Page titles
    "page.dta_to_csv": "Converter DTA para CSV",
    "page.txt_to_csv": "Converter TXT para CSV",
    "page.csv_to_txt": "Converter CSV para TXT",
    "page.csv_to_json": "Converter CSV para JSON",
    "page.json_to_csv": "Converter JSON para CSV",
    "page.csv_to_xml": "Converter CSV para XML",
    "page.xml_to_csv": "Converter XML para CSV",
    "page.xml_to_json": "Converter XML para JSON",
    "page.csv_to_html": "Converter CSV para HTML",
    "page.csv_to_sql": "Converter CSV para SQL",
    "page.csv_to_markdown": "Converter CSV para Markdown",
    "page.html_to_txt": "Converter HTML para TXT",
    "page.html_to_markdown": "Converter HTML para Markdown",
    "page.txt_to_json": "Converter TXT para JSON",
    "page.txt_to_xml": "Converter TXT para XML",
    "page.json_to_txt": "Converter JSON para TXT",
    "page.json_to_xml": "Converter JSON para XML",
    "page.json_to_yaml": "Converter JSON para YAML",
    
    // About
    "about.title": "Sobre o Conv+",
    "about.description": "Conv+ é uma plataforma de conversão de arquivos construída com arquitetura modular em FastAPI e frontend no Lovable. Cada tipo de conversão é implementado como um serviço independente, permitindo expansão sem alterar o núcleo da API. As conversões utilizam módulos leves do Python, garantindo compatibilidade com o Render Free Tier. O projeto nasceu da necessidade de converter arquivos DTA (Stata) para CSV e evoluiu para uma solução mais ampla voltada a engenharia, escalabilidade e eficiência.",
    
    // FileUploader
    "uploader.drag": "Arraste e solte seu arquivo aqui ou",
    "uploader.browse": "procure",
    "uploader.accepted": "Arquivos aceitos:",
    "uploader.selected": "Arquivo selecionado:",
    "uploader.remove": "Remover",
    "uploader.convert": "Converter para",
    "uploader.converting": "Convertendo...",
    "uploader.success": "Conversão concluída! O download iniciará automaticamente.",
    "uploader.error": "Erro ao converter:",
    "uploader.cold_start": "Aviso: A primeira conversão pode levar até 1 minuto devido ao cold start do servidor gratuito do Render.",
    
    // Footer
    "footer.developed": "Desenvolvido por",
    
    // NotFound
    "notfound.title": "Página não encontrada",
    "notfound.back": "Voltar ao início",
    
    // Badge
    "badge.beta": "BETA",
    "badge.construction": "EM CONSTRUÇÃO",
    "badge.unavailable": "INDISPONÍVEL",
  },
  en: {
    // Menu
    "menu.converter": "Converter",
    "menu.metadata": "Extract Metadata",
    "menu.about": "About",
    
    // Metadata Page
    "metadata.title": "Extract Image Metadata",
    "metadata.subtitle": "Feature in testing and development phase",
    "metadata.betaNotice": "This feature is in beta. The metadata extraction endpoint is being tested and improved. Results may vary depending on the format and available metadata in the image.",
    "metadata.description": "Upload an image file to extract available metadata such as EXIF, GPS, IPTC, XMP, and technical file information. The file is processed temporarily and no data is stored.",
    "metadata.maxSize": "Maximum file size: 10MB",
    "metadata.extract": "Extract Metadata",
    "metadata.extracting": "Extracting...",
    "metadata.result": "Extracted Metadata (JSON)",
    "metadata.download": "Download JSON",
    "metadata.trust": "Files are processed temporarily during the request. No images or metadata are stored on the server.",
    "metadata.error.type": "Invalid file format. Please upload an image file.",
    "metadata.error.size": "File exceeds the maximum allowed size.",
    "metadata.error.server": "Unable to extract metadata from this image.",
    
    // Index
    "index.title": "Convert your files easily",
    "index.subtitle": "Simple, fast and secure file conversions — no installation required.",
    "index.filter.all": "ALL",
    "index.filter.csv": "CSV",
    "index.filter.xlsx": "XLSX",
    "index.filter.dta": "DTA",
    "index.filter.txt": "TXT",
    "index.filter.json": "JSON",
    "index.filter.xml": "XML",
    "index.filter.html": "HTML",
    "index.filter.bim": "BIM / IFC",
    
    // Groups
    "group.csv": "CSV Converters",
    "group.xlsx": "XLSX Converters",
    "group.dta": "DTA (Stata) Converters",
    "group.txt": "TXT Converters",
    "group.json": "JSON Converters",
    "group.xml": "XML Converters",
    "group.html": "HTML Converters",
    "group.bim": "BIM / IFC",
    
    // Conversions
    "conv.dta_to_csv": "DTA → CSV (Stata)",
    "conv.csv_to_dta": "CSV → DTA",
    "conv.txt_to_csv": "TXT to CSV",
    "conv.csv_to_txt": "CSV to TXT",
    "conv.csv_to_json": "CSV to JSON",
    "conv.json_to_csv": "JSON to CSV",
    "conv.csv_to_xml": "CSV to XML",
    "conv.xml_to_csv": "XML to CSV",
    "conv.xml_to_json": "XML to JSON",
    "conv.csv_to_html": "CSV to HTML",
    "conv.csv_to_sql": "CSV to SQL",
    "conv.csv_to_markdown": "CSV to Markdown",
    "conv.csv_to_xlsx": "CSV to XLSX",
    "conv.xlsx_to_csv": "XLSX to CSV",
    "conv.html_to_txt": "HTML to TXT",
    "conv.html_to_markdown": "HTML to Markdown",
    "conv.txt_to_json": "TXT to JSON",
    "conv.txt_to_xml": "TXT to XML",
    "conv.json_to_txt": "JSON to TXT",
    "conv.json_to_xml": "JSON to XML",
    "conv.json_to_yaml": "JSON to YAML",
    "conv.ifc_to_csv": "IFC to CSV",
    "conv.ifc_to_json": "IFC to JSON",
    "conv.ifc_to_html": "IFC to HTML",
    "conv.ifc_to_txt": "IFC to TXT",
    
    // Descriptions
    "desc.dta_csv": "Converts Stata (.dta) files into CSV format",
    "desc.csv_dta": "Conversion unavailable",
    "desc.txt_csv": "Text → CSV",
    "desc.csv_txt": "CSV → Text",
    "desc.csv_json": "CSV → JSON",
    "desc.json_csv": "JSON → CSV",
    "desc.csv_xml": "CSV → XML",
    "desc.xml_csv": "Flattens XML elements into tabular CSV format",
    "desc.xml_json": "Converts XML data into structured JSON",
    "desc.csv_html": "CSV → HTML",
    "desc.csv_sql": "CSV → SQL",
    "desc.csv_markdown": "CSV → Markdown",
    "desc.csv_xlsx": "CSV → XLSX",
    "desc.xlsx_csv": "XLSX → CSV",
    "desc.html_txt": "HTML → Text",
    "desc.html_markdown": "HTML → Markdown",
    "desc.txt_json": "Text → JSON",
    "desc.txt_xml": "Text → XML",
    "desc.json_txt": "JSON → Text",
    "desc.json_xml": "JSON → XML",
    "desc.json_yaml": "JSON → YAML",
    "desc.ifc_csv": "Entity summary",
    "desc.ifc_json": "Model summary",
    "desc.ifc_html": "BIM report",
    "desc.ifc_txt": "Metadata report",
    
    // Page titles
    "page.dta_to_csv": "Convert DTA to CSV",
    "page.txt_to_csv": "Convert TXT to CSV",
    "page.csv_to_txt": "Convert CSV to TXT",
    "page.csv_to_json": "Convert CSV to JSON",
    "page.json_to_csv": "Convert JSON to CSV",
    "page.csv_to_xml": "Convert CSV to XML",
    "page.xml_to_csv": "Convert XML to CSV",
    "page.xml_to_json": "Convert XML to JSON",
    "page.csv_to_html": "Convert CSV to HTML",
    "page.csv_to_sql": "Convert CSV to SQL",
    "page.csv_to_markdown": "Convert CSV to Markdown",
    "page.html_to_txt": "Convert HTML to TXT",
    "page.html_to_markdown": "Convert HTML to Markdown",
    "page.txt_to_json": "Convert TXT to JSON",
    "page.txt_to_xml": "Convert TXT to XML",
    "page.json_to_txt": "Convert JSON to TXT",
    "page.json_to_xml": "Convert JSON to XML",
    "page.json_to_yaml": "Convert JSON to YAML",
    
    // About
    "about.title": "About Conv+",
    "about.description": "Conv+ is a file conversion platform built with modular architecture in FastAPI and frontend in Lovable. Each conversion type is implemented as an independent service, allowing expansion without changing the API core. Conversions use lightweight Python modules, ensuring compatibility with Render Free Tier. The project was born from the need to convert DTA (Stata) files to CSV and evolved into a broader solution focused on engineering, scalability, and efficiency.",
    
    // FileUploader
    "uploader.drag": "Drag and drop your file here or",
    "uploader.browse": "browse",
    "uploader.accepted": "Accepted files:",
    "uploader.selected": "Selected file:",
    "uploader.remove": "Remove",
    "uploader.convert": "Convert to",
    "uploader.converting": "Converting...",
    "uploader.success": "Conversion complete! Download will start automatically.",
    "uploader.error": "Error converting:",
    "uploader.cold_start": "Note: The first conversion may take up to 1 minute due to cold start on Render's free server.",
    
    // Footer
    "footer.developed": "Developed by",
    
    // NotFound
    "notfound.title": "Page not found",
    "notfound.back": "Back to home",
    
    // Badge
    "badge.beta": "BETA",
    "badge.construction": "IN CONSTRUCTION",
    "badge.unavailable": "UNAVAILABLE",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "pt" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
