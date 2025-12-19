import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X, Sun, Moon, Globe, FileOutput, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  const isConverterActive = location.pathname === "/" || 
    (location.pathname !== "/extract-metadata" && location.pathname !== "/about");
  const isMetadataActive = location.pathname === "/extract-metadata";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Conv+ Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-foreground">
            Conv<span className="text-primary">+</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/">
            <Button 
              variant={isConverterActive ? "default" : "ghost"} 
              className="flex items-center gap-2"
            >
              <FileOutput className="h-4 w-4" />
              {t("menu.converter")}
            </Button>
          </Link>

          <Link to="/extract-metadata">
            <Button 
              variant={isMetadataActive ? "default" : "ghost"} 
              className="flex items-center gap-2"
            >
              <FileSearch className="h-4 w-4" />
              {t("menu.metadata")}
            </Button>
          </Link>

          <Link
            to="/about"
            className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2"
          >
            {t("menu.about")}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Change language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              <DropdownMenuItem
                onClick={() => setLanguage("pt")}
                className={language === "pt" ? "bg-accent" : ""}
              >
                🇧🇷 PT-BR
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={language === "en" ? "bg-accent" : ""}
              >
                🇺🇸 ENG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Change language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              <DropdownMenuItem
                onClick={() => setLanguage("pt")}
                className={language === "pt" ? "bg-accent" : ""}
              >
                🇧🇷 PT-BR
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={language === "en" ? "bg-accent" : ""}
              >
                🇺🇸 ENG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-border/50 bg-background">
          <div className="container py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isConverterActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-primary"
              }`}
            >
              <FileOutput className="h-4 w-4" />
              {t("menu.converter")}
            </Link>
            <Link
              to="/extract-metadata"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isMetadataActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-primary"
              }`}
            >
              <FileSearch className="h-4 w-4" />
              {t("menu.metadata")}
            </Link>
            <div className="border-t border-border/50 mt-2 pt-2">
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
              >
                {t("menu.about")}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Menu;
