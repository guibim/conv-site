import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Index from "./pages/Index";
import DtaToCsv from "./pages/DtaToCsv";
import TxtToCsv from "./pages/TxtToCsv";
import CsvToTxt from "./pages/CsvToTxt";
import CsvToJson from "./pages/CsvToJson";
import JsonToCsv from "./pages/JsonToCsv";
import CsvToXml from "./pages/CsvToXml";
import XmlToCsv from "./pages/XmlToCsv";
import XmlToJson from "./pages/XmlToJson";
import CsvToHtml from "./pages/CsvToHtml";
import CsvToSql from "./pages/CsvToSql";
import CsvToMarkdown from "./pages/CsvToMarkdown";
import HtmlToTxt from "./pages/HtmlToTxt";
import HtmlToMarkdown from "./pages/HtmlToMarkdown";
import TxtToJson from "./pages/TxtToJson";
import TxtToXml from "./pages/TxtToXml";
import JsonToTxt from "./pages/JsonToTxt";
import JsonToXml from "./pages/JsonToXml";
import JsonToYaml from "./pages/JsonToYaml";
import ExtractMetadata from "./pages/ExtractMetadata";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dta-to-csv" element={<DtaToCsv />} />
          <Route path="/txt-to-csv" element={<TxtToCsv />} />
          <Route path="/csv-to-txt" element={<CsvToTxt />} />
          <Route path="/csv-to-json" element={<CsvToJson />} />
          <Route path="/json-to-csv" element={<JsonToCsv />} />
          <Route path="/csv-to-xml" element={<CsvToXml />} />
          <Route path="/xml-to-csv" element={<XmlToCsv />} />
          <Route path="/xml-to-json" element={<XmlToJson />} />
          <Route path="/csv-to-html" element={<CsvToHtml />} />
          <Route path="/csv-to-sql" element={<CsvToSql />} />
          <Route path="/csv-to-markdown" element={<CsvToMarkdown />} />
          <Route path="/html-to-txt" element={<HtmlToTxt />} />
          <Route path="/html-to-markdown" element={<HtmlToMarkdown />} />
          <Route path="/txt-to-json" element={<TxtToJson />} />
          <Route path="/txt-to-xml" element={<TxtToXml />} />
          <Route path="/json-to-txt" element={<JsonToTxt />} />
          <Route path="/json-to-xml" element={<JsonToXml />} />
          <Route path="/json-to-yaml" element={<JsonToYaml />} />
          <Route path="/extract-metadata" element={<ExtractMetadata />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
