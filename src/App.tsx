import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ConversionPage from "./components/ConversionPage";
import { conversions } from "./lib/conversions";

import Index from "./pages/Index";
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
          {conversions.map((conversion) => (
            <Route
              key={conversion.path}
              path={conversion.path}
              element={
                <ConversionPage
                  titleKey={conversion.pageTitleKey}
                  fromFormat={conversion.fromFormat}
                  toFormat={conversion.toFormat}
                  acceptedExtension={conversion.acceptedExtension}
                />
              }
            />
          ))}
          <Route path="/extract-metadata" element={<ExtractMetadata />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
