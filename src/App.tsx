
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FedMonitor from "./pages/FedMonitor";
import ImpactDashboard from "./pages/ImpactDashboard";
import PortfolioLab from "./pages/PortfolioLab";
import AnalystsHub from "./pages/AnalystsHub";
import FedNews from "./pages/FedNews";
import Research from "./pages/Research";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Security from "./pages/Security";
import Support from "./pages/Support";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/fed-monitor" element={<FedMonitor />} />
            <Route path="/impact" element={<ImpactDashboard />} />
            <Route path="/portfolio-lab" element={<PortfolioLab />} />
            <Route path="/analysts" element={<AnalystsHub />} />
            <Route path="/fed-news" element={<FedNews />} />
            <Route path="/research" element={<Research />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/security" element={<Security />} />
            <Route path="/support" element={<Support />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
