import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Linkedin, Mail, Server, Code, Database, FileCode, Cog, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const About = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "About Conv+",
      subtitle: "Lightweight File Conversion & Data Validation API",
      aboutTitle: "About the Project",
      aboutText: "Conv+ is a lightweight and modular file conversion service designed with a strong focus on data quality, robustness and interoperability. The project addresses real-world data processing challenges such as inconsistent file encodings, fragile conversions and lack of transparency in file transformations.",
      techTitle: "Technology & Architecture",
      tech: [
        { icon: Server, label: "Backend", value: "Python, FastAPI, Uvicorn" },
        { icon: Cog, label: "Architecture", value: "Modular service-based design (one converter per format pair)" },
        { icon: Code, label: "API Style", value: "REST" },
        { icon: FileCode, label: "Encoding Strategy", value: "Robust CSV encoding handling (UTF-8, UTF-8 BOM, Windows-1252, Latin-1)" },
        { icon: Database, label: "Output Standardization", value: "UTF-8 normalized outputs" },
        { icon: Shield, label: "Deployment", value: "Compatible with lightweight environments (Render free tier)" },
      ],
      useCasesTitle: "Use Cases",
      useCases: [
        "Conversion between structured and semi-structured formats (CSV, JSON, XML, TXT, HTML, XLSX, DTA)",
        "Bidirectional conversion consistency validation",
        "Data inspection and normalization",
        "QA-oriented validation of file transformations",
        "Extraction and auditing of BIM / IFC data without proprietary software",
      ],
      purposeTitle: "Project Purpose",
      purposeText: "Conv+ was developed as a technical portfolio project and practical lab focused on:",
      purposeItems: [
        "Backend API design",
        "Data validation strategies",
        "Encoding and interoperability challenges",
        "Quality Assurance practices applied to data pipelines",
        "Defensive programming and edge-case handling",
      ],
      purposeNote: "Conv+ does not aim to replace heavy ETL or BIM tools, but focuses on accessibility, transparency and correctness of data transformations.",
      contactTitle: "Links & Contact",
    },
    pt: {
      title: "Sobre o Conv+",
      subtitle: "API Leve de Conversão de Arquivos e Validação de Dados",
      aboutTitle: "Sobre o Projeto",
      aboutText: "Conv+ é um serviço leve e modular de conversão de arquivos, projetado com foco em qualidade de dados, robustez e interoperabilidade. O projeto aborda desafios comuns em fluxos reais de processamento de dados, como inconsistências de encoding, conversões frágeis e falta de transparência nas transformações de arquivos.",
      techTitle: "Tecnologia e Arquitetura",
      tech: [
        { icon: Server, label: "Backend", value: "Python, FastAPI, Uvicorn" },
        { icon: Cog, label: "Arquitetura", value: "Design modular baseado em serviços (um conversor por par de formatos)" },
        { icon: Code, label: "Estilo de API", value: "REST" },
        { icon: FileCode, label: "Estratégia de Encoding", value: "Tratamento robusto de encoding CSV (UTF-8, UTF-8 BOM, Windows-1252, Latin-1)" },
        { icon: Database, label: "Padronização de Saída", value: "Saídas normalizadas em UTF-8" },
        { icon: Shield, label: "Deploy", value: "Compatível com ambientes leves (Render free tier)" },
      ],
      useCasesTitle: "Casos de Uso",
      useCases: [
        "Conversão entre formatos estruturados e semi-estruturados (CSV, JSON, XML, TXT, HTML, XLSX, DTA)",
        "Validação de consistência em conversões bidirecionais",
        "Inspeção e normalização de dados",
        "Validação de transformações de arquivos orientada a QA",
        "Extração e auditoria de dados BIM / IFC sem software proprietário",
      ],
      purposeTitle: "Propósito do Projeto",
      purposeText: "Conv+ foi desenvolvido como um projeto de portfólio técnico e laboratório prático focado em:",
      purposeItems: [
        "Design de APIs backend",
        "Estratégias de validação de dados",
        "Desafios de encoding e interoperabilidade",
        "Práticas de Quality Assurance aplicadas a pipelines de dados",
        "Programação defensiva e tratamento de edge-cases",
      ],
      purposeNote: "Conv+ não pretende substituir ferramentas pesadas de ETL ou BIM, mas foca em acessibilidade, transparência e correção das transformações de dados.",
      contactTitle: "Links e Contato",
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Menu />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg font-mono">
              {t.subtitle}
            </p>
          </header>

          {/* About Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {t.aboutTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed pl-3 border-l-2 border-border">
              {t.aboutText}
            </p>
          </section>

          <Separator className="my-8" />

          {/* Technology Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {t.techTitle}
            </h2>
            <div className="grid gap-3">
              {t.tech.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
                >
                  <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">{item.label}:</span>
                    <span className="text-muted-foreground ml-2">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-8" />

          {/* Use Cases Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {t.useCasesTitle}
            </h2>
            <ul className="space-y-2 pl-3">
              {t.useCases.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <Separator className="my-8" />

          {/* Purpose Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {t.purposeTitle}
            </h2>
            <p className="text-muted-foreground mb-4 pl-3 border-l-2 border-border">
              {t.purposeText}
            </p>
            <ul className="space-y-2 pl-3 mb-4">
              {t.purposeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground/80 italic pl-3 border-l-2 border-primary/30">
              {t.purposeNote}
            </p>
          </section>

          <Separator className="my-8" />

          {/* Contact Section */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {t.contactTitle}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/guibim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent/30 transition-all group flex-1"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-foreground group-hover:text-primary transition-colors font-medium">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/guilherme-bim/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent/30 transition-all group flex-1"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-foreground group-hover:text-primary transition-colors font-medium">LinkedIn</span>
              </a>
              <a
                href="mailto:guilhermebim016@gmail.com"
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent/30 transition-all group flex-1"
              >
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-foreground group-hover:text-primary transition-colors font-medium">Email</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
