
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import Portal from "./pages/Portal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component to handle business ID retrieval from URL
const LoginWrapper = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("bid") || "sales-demo"; // Default to sales-demo if bid is not provided
  return <Login businessId={businessId} />;
};

// Wrapper component for NewUser to handle business ID retrieval
const NewUserWrapper = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("bid") || "sales-demo"; // Default to sales-demo if bid is not provided
  return <NewUser businessId={businessId} />;
};

// Root redirect
const Root = () => {
  return <Navigate to="/login?bid=sales-demo" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/newuser" element={<NewUserWrapper />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
