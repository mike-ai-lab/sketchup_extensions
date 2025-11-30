import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import ParametrixDetail from "./pages/ParametrixDetail";
import ProductPage from "./pages/ProductPage";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Purchase from "./pages/Purchase";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tools" component={Tools} />
      <Route path="/tools/parametrix" component={ParametrixDetail} />
      <Route path="/products/:slug" component={ProductPage} />
      <Route path="/contact" component={Contact} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/purchase/:slug" component={Purchase} />
      <Route path="/pricing" component={Tools} />
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
