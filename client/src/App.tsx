import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Tutorials from "./pages/Tutorials";
import Pricing from "./pages/Pricing";
import Download from "./pages/Download";
import FAQ from "./pages/FAQ";
import ParametrixDetail from "./pages/ParametrixDetail";
import SpecbaseDetail from "./pages/SpecbaseDetail";
import AutoNestCutDetail from "./pages/AutoNestCutDetail";
import DocmarkDetail from "./pages/DocmarkDetail";
import UtilitiesDetail from "./pages/UtilitiesDetail";
import ConstructlmDetail from "./pages/ConstructlmDetail";
import SemantraDetail from "./pages/SemantraDetail";
import LexicodeDetail from "./pages/LexicodeDetail";
import Resources from "./pages/Resources";
import ProductPage from "./pages/ProductPage";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Purchase from "./pages/Purchase";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Set manual scroll restoration to prevent browser interference
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
      // Only scroll to top if there's no hash in the URL
      if (!window.location.hash) {
        window.scrollTo(0, 0);
        console.log('[Router] Scrolled to top for:', location);
      } else {
        // Scroll to the hash element with increased timeout for DOM load
        setTimeout(() => {
          const id = window.location.hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log('[Router] Scrolled to hash:', id);
          } else {
            console.warn('[Router] Hash element not found:', id);
          }
        }, 150);
      }
    });
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tools" component={Tools} />
      {/* <Route path="/tutorials" component={Tutorials} /> */}
      <Route path="/pricing" component={Pricing} />
      {/* <Route path="/download" component={Download} /> */}
      {/* <Route path="/faq" component={FAQ} /> */}
      <Route path="/tools/parametrix" component={ParametrixDetail} />
      <Route path="/tools/specbase" component={SpecbaseDetail} />
      <Route path="/tools/autonestcut" component={AutoNestCutDetail} />
      <Route path="/tools/docmark" component={DocmarkDetail} />
      <Route path="/tools/constructlm" component={ConstructlmDetail} />
      <Route path="/tools/mievents" component={SemantraDetail} />
      <Route path="/tools/lexicode" component={LexicodeDetail} />
      <Route path="/tools/utilities" component={UtilitiesDetail} />
      {/* <Route path="/resources" component={Resources} /> */}
      <Route path="/products/:slug" component={ProductPage} />
      <Route path="/contact" component={Contact} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/purchase/:slug" component={Purchase} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
