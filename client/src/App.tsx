import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dialogue from "./pages/Dialogue";
import Archive from "./pages/Archive";
import Travel from "./pages/Travel";
import Showcase from "./pages/Showcase";
import DialogueHistory from "./pages/DialogueHistory";


const base = "/";

function AppRouter() {
  return (
    <WouterRouter base={base}>
      <Layout>
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/dialogue"} component={Dialogue} />
          <Route path={"/archive"} component={Archive} />
          <Route path={"/archive/:id"} component={Archive} />
          <Route path={"/dialogue-history"} component={DialogueHistory} />
          <Route path={"/travel"} component={Travel} />
          <Route path={"/showcase"} component={Showcase} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
