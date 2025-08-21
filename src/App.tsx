import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ClaimsList } from "./components/ClaimsList";
import { ClaimDetail } from "./components/ClaimDetail";
import { Dashboard } from "./components/Dashboard";
import { ClaimPipelinePage } from "./components/pipeline/ClaimPipelinePage";
import { WorkingDemoPage } from "./components/WorkingDemoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ClaimsList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/claims/pipelines" element={<ClaimPipelinePage />} />
            <Route path="/working-demo" element={<WorkingDemoPage />} />
            <Route path="/claim/:id" element={<ClaimDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
