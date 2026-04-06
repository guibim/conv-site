import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    "menu.converter": "Conversoes",
    "menu.metadata": "Extrair Metadata",
    "menu.about": "Sobre",

    "metadata.title": "Extrair Metadata de Imagem",
    "metadata.subtitle": "Recurso em evolucao dentro da mesma API principal",
    "metadata.betaNotice":
      "Esta funcionalidade segue em evolucao. A resposta depende dos metadados realmente embutidos no arquivo enviado.",
    "metadata.description":
      "Envie uma imagem para inspecionar informacoes tecnicas, hashes do arquivo e metadados encontrados por multiplas fontes de leitura.",
    "metadata.maxSize": "Tamanho maximo: 10 MB",
    "metadata.extract": "Extrair Metadata",
    "metadata.extracting": "Extraindo...",
    "metadata.result": "Resultado da Extracao (JSON)",
    "metadata.download": "Baixar JSON",
    "metadata.trust":
      "O arquivo e processado apenas durante a requisicao. Nenhuma imagem e armazenada de forma persistente no servidor.",
    "metadata.error.type": "Formato invalido. Envie um arquivo de imagem compativel.",
    "metadata.error.size": "O arquivo excede o tamanho maximo permitido.",
    "metadata.error.server": "Nao foi possivel extrair metadata desta imagem.",

    "index.title": "Conversao de arquivos com escopo real e superficie enxuta",
    "index.subtitle":
      "Frontend alinhado com a API v2, conversoes estaveis em producao e extracao de metadata na mesma aplicacao.",
    "index.filter.all": "TODOS",
    "index.filter.csv": "CSV",
    "index.filter.txt": "TXT",
    "index.filter.json": "JSON",
    "index.filter.xml": "XML",
    "index.filter.html": "HTML",

    "group.csv": "Conversoes a partir de CSV",
    "group.txt": "Conversoes a partir de TXT",
    "group.json": "Conversoes a partir de JSON",
    "group.xml": "Conversoes a partir de XML",
    "group.html": "Conversoes a partir de HTML",

    "conv.txt_to_csv": "TXT para CSV",
    "conv.csv_to_txt": "CSV para TXT",
    "conv.csv_to_json": "CSV para JSON",
    "conv.json_to_csv": "JSON para CSV",
    "conv.csv_to_xml": "CSV para XML",
    "conv.xml_to_csv": "XML para CSV",
    "conv.xml_to_json": "XML para JSON",
    "conv.csv_to_html": "CSV para HTML",
    "conv.html_to_txt": "HTML para TXT",
    "conv.txt_to_json": "TXT para JSON",
    "conv.txt_to_xml": "TXT para XML",
    "conv.json_to_txt": "JSON para TXT",
    "conv.json_to_xml": "JSON para XML",

    "desc.txt_csv": "Transforma texto delimitado em estrutura tabular CSV",
    "desc.csv_txt": "Serializa linhas CSV em texto simples",
    "desc.csv_json": "Converte dados tabulares para JSON",
    "desc.json_csv": "Achata colecoes JSON em CSV",
    "desc.csv_xml": "Converte linhas CSV em XML estruturado",
    "desc.xml_csv": "Extrai elementos XML para formato tabular CSV",
    "desc.xml_json": "Converte XML em JSON estruturado",
    "desc.csv_html": "Gera tabela HTML escapando o conteudo das celulas",
    "desc.html_txt": "Extrai texto de documentos HTML",
    "desc.txt_json": "Transforma texto simples em estrutura JSON",
    "desc.txt_xml": "Converte texto em XML simples",
    "desc.json_txt": "Serializa JSON em texto legivel",
    "desc.json_xml": "Converte JSON em XML",

    "page.txt_to_csv": "Converter TXT para CSV",
    "page.csv_to_txt": "Converter CSV para TXT",
    "page.csv_to_json": "Converter CSV para JSON",
    "page.json_to_csv": "Converter JSON para CSV",
    "page.csv_to_xml": "Converter CSV para XML",
    "page.xml_to_csv": "Converter XML para CSV",
    "page.xml_to_json": "Converter XML para JSON",
    "page.csv_to_html": "Converter CSV para HTML",
    "page.html_to_txt": "Converter HTML para TXT",
    "page.txt_to_json": "Converter TXT para JSON",
    "page.txt_to_xml": "Converter TXT para XML",
    "page.json_to_txt": "Converter JSON para TXT",
    "page.json_to_xml": "Converter JSON para XML",

    "uploader.drag": "Arraste e solte seu arquivo aqui ou",
    "uploader.browse": "procure",
    "uploader.accepted": "Formato aceito:",
    "uploader.selected": "Arquivo selecionado:",
    "uploader.remove": "Remover",
    "uploader.convert": "Converter para",
    "uploader.converting": "Convertendo...",
    "uploader.success": "Conversao concluida. O download foi iniciado automaticamente.",
    "uploader.error": "Erro na conversao:",
    "uploader.cold_start":
      "Aviso: a primeira requisicao pode demorar por causa do cold start do servidor gratuito da Render.",
    "uploader.invalid_type": "O arquivo enviado nao corresponde ao formato esperado para esta rota.",
    "uploader.max_size": "O arquivo excede o limite de 10 MB configurado para esta API.",

    "footer.developed": "Desenvolvido por",

    "notfound.title": "Pagina nao encontrada",
    "notfound.back": "Voltar ao inicio",

    "badge.beta": "BETA",
  },
  en: {
    "menu.converter": "Conversions",
    "menu.metadata": "Extract Metadata",
    "menu.about": "About",

    "metadata.title": "Extract Image Metadata",
    "metadata.subtitle": "Feature evolving inside the same primary API",
    "metadata.betaNotice":
      "This feature is still evolving. The response depends on the metadata actually embedded in the uploaded file.",
    "metadata.description":
      "Upload an image to inspect technical file information, hashes and metadata collected from multiple parsing sources.",
    "metadata.maxSize": "Maximum file size: 10 MB",
    "metadata.extract": "Extract Metadata",
    "metadata.extracting": "Extracting...",
    "metadata.result": "Extraction Result (JSON)",
    "metadata.download": "Download JSON",
    "metadata.trust":
      "The file is processed only during the request. No image is stored persistently on the server.",
    "metadata.error.type": "Invalid format. Please upload a supported image file.",
    "metadata.error.size": "The file exceeds the maximum allowed size.",
    "metadata.error.server": "Unable to extract metadata from this image.",

    "index.title": "File conversion with a real scope and a lean surface",
    "index.subtitle":
      "Frontend aligned with API v2, stable production conversions and image metadata extraction in the same application.",
    "index.filter.all": "ALL",
    "index.filter.csv": "CSV",
    "index.filter.txt": "TXT",
    "index.filter.json": "JSON",
    "index.filter.xml": "XML",
    "index.filter.html": "HTML",

    "group.csv": "Conversions from CSV",
    "group.txt": "Conversions from TXT",
    "group.json": "Conversions from JSON",
    "group.xml": "Conversions from XML",
    "group.html": "Conversions from HTML",

    "conv.txt_to_csv": "TXT to CSV",
    "conv.csv_to_txt": "CSV to TXT",
    "conv.csv_to_json": "CSV to JSON",
    "conv.json_to_csv": "JSON to CSV",
    "conv.csv_to_xml": "CSV to XML",
    "conv.xml_to_csv": "XML to CSV",
    "conv.xml_to_json": "XML to JSON",
    "conv.csv_to_html": "CSV to HTML",
    "conv.html_to_txt": "HTML to TXT",
    "conv.txt_to_json": "TXT to JSON",
    "conv.txt_to_xml": "TXT to XML",
    "conv.json_to_txt": "JSON to TXT",
    "conv.json_to_xml": "JSON to XML",

    "desc.txt_csv": "Transforms delimited text into tabular CSV data",
    "desc.csv_txt": "Serializes CSV rows into plain text",
    "desc.csv_json": "Converts tabular data into JSON",
    "desc.json_csv": "Flattens JSON collections into CSV",
    "desc.csv_xml": "Converts CSV rows into structured XML",
    "desc.xml_csv": "Extracts XML elements into tabular CSV format",
    "desc.xml_json": "Converts XML into structured JSON",
    "desc.csv_html": "Builds an HTML table with escaped cell content",
    "desc.html_txt": "Extracts text from HTML documents",
    "desc.txt_json": "Transforms plain text into JSON structure",
    "desc.txt_xml": "Converts text into simple XML",
    "desc.json_txt": "Serializes JSON into readable text",
    "desc.json_xml": "Converts JSON into XML",

    "page.txt_to_csv": "Convert TXT to CSV",
    "page.csv_to_txt": "Convert CSV to TXT",
    "page.csv_to_json": "Convert CSV to JSON",
    "page.json_to_csv": "Convert JSON to CSV",
    "page.csv_to_xml": "Convert CSV to XML",
    "page.xml_to_csv": "Convert XML to CSV",
    "page.xml_to_json": "Convert XML to JSON",
    "page.csv_to_html": "Convert CSV to HTML",
    "page.html_to_txt": "Convert HTML to TXT",
    "page.txt_to_json": "Convert TXT to JSON",
    "page.txt_to_xml": "Convert TXT to XML",
    "page.json_to_txt": "Convert JSON to TXT",
    "page.json_to_xml": "Convert JSON to XML",

    "uploader.drag": "Drag and drop your file here or",
    "uploader.browse": "browse",
    "uploader.accepted": "Accepted format:",
    "uploader.selected": "Selected file:",
    "uploader.remove": "Remove",
    "uploader.convert": "Convert to",
    "uploader.converting": "Converting...",
    "uploader.success": "Conversion completed. The download started automatically.",
    "uploader.error": "Conversion error:",
    "uploader.cold_start":
      "Note: the first request may take longer because the API is hosted on Render's free tier.",
    "uploader.invalid_type": "The uploaded file does not match the expected format for this route.",
    "uploader.max_size": "The file exceeds the 10 MB limit configured for this API.",

    "footer.developed": "Developed by",

    "notfound.title": "Page not found",
    "notfound.back": "Back to home",

    "badge.beta": "BETA",
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
