import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock3, FileSearch } from "lucide-react";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { conversionFilters, conversionGroups, conversions, type FilterType } from "@/lib/conversions";

const Index = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const copy = {
    en: {
      surfaceTitle: "Aligned with API v2",
      surfaceBody:
        "The frontend only exposes conversion flows currently implemented and supported by the active backend.",
      runtimeTitle: "Render Free Tier",
      runtimeBody:
        "The API is hosted on Render Free Tier. The first request may take longer because of cold start.",
      metadataTitle: "Image metadata endpoint",
      metadataBody:
        "Metadata extraction is available in the same API surface, keeping the project lightweight and easier to validate.",
      metadataCta: "Open metadata extraction",
    },
    pt: {
      surfaceTitle: "Alinhado com a API v2",
      surfaceBody:
        "O frontend agora expõe apenas os fluxos de conversao que estao implementados e suportados pelo backend ativo.",
      runtimeTitle: "Render Free Tier",
      runtimeBody:
        "A API esta hospedada no plano gratuito da Render. A primeira requisicao pode demorar mais por causa do cold start.",
      metadataTitle: "Endpoint de metadata de imagem",
      metadataBody:
        "A extracao de metadata faz parte da mesma superficie de API, mantendo o projeto mais enxuto e facil de validar.",
      metadataCta: "Abrir extracao de metadata",
    },
  }[language];

  const visibleGroups = useMemo(() => {
    const groups = activeFilter === "all"
      ? conversionGroups
      : conversionGroups.filter((group) => group.key === activeFilter);

    return groups.map((group) => ({
      ...group,
      items: conversions.filter((conversion) => conversion.group === group.key),
    }));
  }, [activeFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Menu />

      <main className="flex-1 py-12 md:py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              API v2
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t("index.title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("index.subtitle")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto mb-10">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">{copy.surfaceTitle}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{copy.surfaceBody}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock3 className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">{copy.runtimeTitle}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{copy.runtimeBody}</p>
            </div>

            <Link
              to="/extract-metadata"
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileSearch className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">{copy.metadataTitle}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{copy.metadataBody}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                {copy.metadataCta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {conversionFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeFilter === filter.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {t(filter.labelKey)}
              </button>
            ))}
          </div>

          <div className="max-w-5xl mx-auto space-y-10">
            {visibleGroups.map((group) => (
              <section key={group.key}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    {t(group.titleKey)}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="group flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all duration-200"
                    >
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {t(item.labelKey)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t(item.descKey)}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
