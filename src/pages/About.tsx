import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Github,
  Linkedin,
  Mail,
  Server,
  Code,
  Database,
  FileCode,
  Cog,
  Shield,
  FileSearch,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const About = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "About Conv",
      subtitle: "Lightweight conversion and metadata extraction aligned with QA-focused engineering.",
      aboutTitle: "Project Context",
      aboutText:
        "Conv is a lightweight file processing application that prioritizes traceability, predictable behavior and practical interoperability. The current frontend is aligned with the active API surface instead of exposing experimental or legacy paths that are not available in production.",
      techTitle: "Technical Surface",
      tech: [
        { icon: Server, label: "Backend", value: "FastAPI + Uvicorn (api-v2)" },
        { icon: Code, label: "Frontend", value: "React + TypeScript + Vite" },
        { icon: Cog, label: "Deployment", value: "GitHub Pages for the frontend and Render Free Tier for the API" },
        { icon: FileCode, label: "API Model", value: "Single API surface for conversion and image metadata extraction" },
        { icon: Database, label: "Supported Outputs", value: "CSV, TXT, JSON, XML and HTML conversion flows" },
        { icon: Shield, label: "Operational Note", value: "Cold start is expected on the first API request because the service runs on Render Free Tier" },
      ],
      qaTitle: "QA and Reliability Focus",
      qaItems: [
        "Validation of file transformation contracts between frontend and backend",
        "Safer handling of upload limits, parser failures and unsupported payloads",
        "Clearer alignment between UI promises and the API capabilities that are live in production",
        "Metadata extraction as an auditable endpoint for image inspection scenarios",
      ],
      architectureTitle: "Current Architecture",
      architectureText:
        "The project now operates with a simpler surface: one active API for supported conversions and image metadata extraction, one frontend aligned with that API contract, and documentation that reflects the production state instead of the historical backlog.",
      contactTitle: "Links and Contact",
    },
    pt: {
      title: "Sobre o Conv",
      subtitle: "Conversao leve e extracao de metadata alinhadas com engenharia orientada a QA.",
      aboutTitle: "Contexto do Projeto",
      aboutText:
        "Conv e uma aplicacao leve de processamento de arquivos que prioriza rastreabilidade, comportamento previsivel e interoperabilidade pratica. O frontend atual esta alinhado com a superficie real da API, sem expor caminhos experimentais ou legados que nao estao disponiveis em producao.",
      techTitle: "Superficie Tecnica",
      tech: [
        { icon: Server, label: "Backend", value: "FastAPI + Uvicorn (api-v2)" },
        { icon: Code, label: "Frontend", value: "React + TypeScript + Vite" },
        { icon: Cog, label: "Deploy", value: "GitHub Pages no frontend e Render Free Tier na API" },
        { icon: FileCode, label: "Modelo de API", value: "Uma unica superficie de API para conversao e extracao de metadata de imagem" },
        { icon: Database, label: "Saidas suportadas", value: "Fluxos de conversao em CSV, TXT, JSON, XML e HTML" },
        { icon: Shield, label: "Observacao operacional", value: "Cold start pode acontecer na primeira requisicao porque o servico roda no Render Free Tier" },
      ],
      qaTitle: "Foco em QA e Confiabilidade",
      qaItems: [
        "Validacao de contratos de transformacao entre frontend e backend",
        "Tratamento mais seguro para limites de upload, falhas de parser e payloads nao suportados",
        "Alinhamento claro entre o que a interface promete e o que a API realmente entrega em producao",
        "Extracao de metadata como endpoint auditavel para cenarios de inspecao de imagem",
      ],
      architectureTitle: "Arquitetura Atual",
      architectureText:
        "O projeto opera agora com uma superficie mais simples: uma API ativa para conversoes suportadas e metadata de imagem, um frontend alinhado com esse contrato e documentacao refletindo o estado real de producao em vez do backlog historico.",
      contactTitle: "Links e Contato",
    },
  }[language];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Menu />

      <main className="flex-1 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {content.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </header>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {content.aboutTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed pl-3 border-l-2 border-border">
              {content.aboutText}
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {content.techTitle}
            </h2>
            <div className="grid gap-3">
              {content.tech.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
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

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {content.qaTitle}
            </h2>
            <ul className="space-y-3 pl-3">
              {content.qaItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <FileSearch className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {content.architectureTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed pl-3 border-l-2 border-border">
              {content.architectureText}
            </p>
          </section>

          <Separator className="my-8" />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {content.contactTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <a
                href="https://github.com/guibim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent/30 transition-all group"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-foreground group-hover:text-primary transition-colors font-medium">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/guilherme-bim/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent/30 transition-all group"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-foreground group-hover:text-primary transition-colors font-medium">LinkedIn</span>
              </a>
              <a
                href="mailto:guilhermebim016@gmail.com"
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent/30 transition-all group"
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
