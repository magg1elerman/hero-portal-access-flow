
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

// Wrapper component to handle URL parameters
const LoginWrapper = () => {
  return <Login />;
};

// Wrapper component for NewUser
const RegisterWrapper = () => {
  return <NewUser />;
};

// Wrapper component for Welcome
const WelcomeWrapper = () => {
  return <Welcome />;
};

// Wrapper component for PayBill
const AccessAccountWrapper = () => {
  return <PayBill />;
};

// Root redirect
const Root = () => {
  return <Navigate to="/welcome" replace />;
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
