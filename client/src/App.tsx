import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import { CookieBanner } from "@/components/layout/CookieBanner";

const EmailDiario = lazy(() => import("@/pages/EmailDiario"));
const PoliticaPrivacidad = lazy(() => import("@/pages/PoliticaPrivacidad"));
const AvisoLegal = lazy(() => import("@/pages/AvisoLegal"));
const PoliticaCookies = lazy(() => import("@/pages/PoliticaCookies"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageFallback() {
  return (
    <div
      className="min-h-screen w-full bg-[#050505]"
      aria-hidden="true"
    />
  );
}

function App() {
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/email-diario" component={EmailDiario} />
          <Route path="/politica-privacidad" component={PoliticaPrivacidad} />
          <Route path="/aviso-legal" component={AvisoLegal} />
          <Route path="/politica-cookies" component={PoliticaCookies} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <CookieBanner />
    </>
  );
}

export default App;
