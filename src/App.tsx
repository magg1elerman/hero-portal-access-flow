
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import Portal from "./pages/Portal";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import PayBill from "./pages/PayBill";

const queryClient = new QueryClient();

// Wrapper component to handle business ID retrieval from URL
const LoginWrapper = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("bid") || "sales-demo"; // Default to sales-demo if bid is not provided
  return <Login businessId={businessId} />;
};

// Wrapper component for NewUser to handle business ID retrieval
const RegisterWrapper = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("bid") || "sales-demo"; // Default to sales-demo if bid is not provided
  return <NewUser businessId={businessId} />;
};

// Wrapper component for Welcome to handle business ID retrieval
const WelcomeWrapper = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("bid") || "sales-demo"; // Default to sales-demo if bid is not provided
  return <Welcome businessId={businessId} />;
};

// Wrapper component for PayBill to handle business ID retrieval
const AccessAccountWrapper = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("bid") || "sales-demo"; // Default to sales-demo if bid is not provided
  return <PayBill businessId={businessId} />;
};

// Root redirect
const Root = () => {
  return <Navigate to="/welcome?bid=sales-demo" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/welcome" element={<WelcomeWrapper />} />
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/register" element={<RegisterWrapper />} />
          <Route path="/access-account" element={<AccessAccountWrapper />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
