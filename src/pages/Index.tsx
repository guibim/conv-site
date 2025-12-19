import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { ArrowRight, Construction } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

type FilterType = "all" | "csv" | "xlsx" | "dta" | "txt" | "json" | "xml" | "html" | "bim";

interface ConverterItem {
  labelKey: string;
  descKey: string;
  href: string;
  disabled?: boolean;
}

interface ConverterGroup {
  titleKey: string;
  description?: string;
  isBeta?: boolean;
  items: ConverterItem[];
}

const Index = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filters: { key: FilterType; labelKey: string }[] = [
    { key: "all", labelKey: "index.filter.all" },
    { key: "csv", labelKey: "index.filter.csv" },
    { key: "xlsx", labelKey: "index.filter.xlsx" },
    { key: "dta", labelKey: "index.filter.dta" },
    { key: "txt", labelKey: "index.filter.txt" },
    { key: "json", labelKey: "index.filter.json" },
    { key: "xml", labelKey: "index.filter.xml" },
    { key: "html", labelKey: "index.filter.html" },
    { key: "bim", labelKey: "index.filter.bim" },
  ];

  const converterGroups: Record<string, ConverterGroup> = {
    csv: {
      titleKey: "group.csv",
      items: [
        { labelKey: "conv.csv_to_json", descKey: "desc.csv_json", href: "/csv-to-json" },
        { labelKey: "conv.csv_to_xml", descKey: "desc.csv_xml", href: "/csv-to-xml" },
        { labelKey: "conv.csv_to_html", descKey: "desc.csv_html", href: "/csv-to-html" },
        { labelKey: "conv.csv_to_txt", descKey: "desc.csv_txt", href: "/csv-to-txt" },
        { labelKey: "conv.csv_to_sql", descKey: "desc.csv_sql", href: "/csv-to-sql" },
        { labelKey: "conv.csv_to_markdown", descKey: "desc.csv_markdown", href: "/csv-to-markdown" },
        { labelKey: "conv.csv_to_xlsx", descKey: "desc.csv_xlsx", href: "/csv-to-xlsx" },
        { labelKey: "conv.csv_to_dta", descKey: "desc.csv_dta", href: "/csv-to-dta", disabled: true },
      ],
    },
    xlsx: {
      titleKey: "group.xlsx",
      items: [
        { labelKey: "conv.xlsx_to_csv", descKey: "desc.xlsx_csv", href: "/xlsx-to-csv" },
      ],
    },
    dta: {
      titleKey: "group.dta",
      items: [
        { labelKey: "conv.dta_to_csv", descKey: "desc.dta_csv", href: "/dta-to-csv" },
      ],
    },
    txt: {
      titleKey: "group.txt",
      items: [
        { labelKey: "conv.txt_to_csv", descKey: "desc.txt_csv", href: "/txt-to-csv" },
        { labelKey: "conv.txt_to_json", descKey: "desc.txt_json", href: "/txt-to-json" },
        { labelKey: "conv.txt_to_xml", descKey: "desc.txt_xml", href: "/txt-to-xml" },
      ],
    },
    json: {
      titleKey: "group.json",
      items: [
        { labelKey: "conv.json_to_csv", descKey: "desc.json_csv", href: "/json-to-csv" },
        { labelKey: "conv.json_to_txt", descKey: "desc.json_txt", href: "/json-to-txt" },
        { labelKey: "conv.json_to_xml", descKey: "desc.json_xml", href: "/json-to-xml" },
        { labelKey: "conv.json_to_yaml", descKey: "desc.json_yaml", href: "/json-to-yaml" },
      ],
    },
    xml: {
      titleKey: "group.xml",
      items: [
        { labelKey: "conv.xml_to_csv", descKey: "desc.xml_csv", href: "/xml-to-csv" },
        { labelKey: "conv.xml_to_json", descKey: "desc.xml_json", href: "/xml-to-json" },
      ],
    },
    html: {
      titleKey: "group.html",
      items: [
        { labelKey: "conv.html_to_txt", descKey: "desc.html_txt", href: "/html-to-txt" },
        { labelKey: "conv.html_to_markdown", descKey: "desc.html_markdown", href: "/html-to-markdown" },
      ],
    },
    bim: {
      titleKey: "group.bim",
      items: [
        { labelKey: "conv.ifc_to_csv", descKey: "desc.ifc_csv", href: "/ifc-to-csv" },
        { labelKey: "conv.ifc_to_json", descKey: "desc.ifc_json", href: "/ifc-to-json" },
        { labelKey: "conv.ifc_to_html", descKey: "desc.ifc_html", href: "/ifc-to-html" },
        { labelKey: "conv.ifc_to_txt", descKey: "desc.ifc_txt", href: "/ifc-to-txt" },
      ],
    },
  };

  const visibleGroups = activeFilter === "all" 
    ? Object.entries(converterGroups) 
    : Object.entries(converterGroups).filter(([key]) => key === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Menu />

      <main className="flex-1 py-12 md:py-20">
        <div className="container">
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("index.title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("index.subtitle")}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((filter) => (
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

          {/* Converter Groups */}
          <div className="max-w-5xl mx-auto space-y-10">
            {visibleGroups.map(([key, group]) => (
              <section key={key}>
                {/* Group Header */}
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    {group.isBeta && <Construction className="h-5 w-5 text-primary" />}
                    {t(group.titleKey)}
                  </h2>
                  {group.isBeta && (
                    <Badge variant="outline" className="border-primary text-primary">
                      {t("badge.construction")}
                    </Badge>
                  )}
                </div>

                {/* Beta Description */}
                {group.isBeta && group.description && (
                  <p className="text-sm text-muted-foreground mb-4 pl-1">
                    {t(group.description)}
                  </p>
                )}

                {/* Converter Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((item) => (
                    item.disabled ? (
                      <div
                        key={item.href}
                        className="group flex items-center justify-between p-5 rounded-xl border border-border bg-card/50 opacity-50 cursor-not-allowed"
                      >
                        <div>
                          <h3 className="font-semibold text-foreground/60">
                            {t(item.labelKey)}
                          </h3>
                          <p className="text-sm text-muted-foreground/60">
                            {t(item.descKey)}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs text-muted-foreground border-muted-foreground/30">
                          {t("badge.unavailable")}
                        </Badge>
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        to={item.href}
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
                    )
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
