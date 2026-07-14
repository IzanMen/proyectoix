import { Suspense, lazy } from "react";
import {
  Switch,
  Route,
  Router as WouterRouter,
  useLocation,
} from "wouter";

const Home = lazy(() => import("@/pages/Home"));
const EmailDiario = lazy(() => import("@/pages/EmailDiario"));
const Regalo = lazy(() => import("@/pages/Regalo"));
const Suscrito = lazy(() => import("@/pages/Suscrito"));
const PoliticaPrivacidad = lazy(() => import("@/pages/PoliticaPrivacidad"));
const AvisoLegal = lazy(() => import("@/pages/AvisoLegal"));
const PoliticaCookies = lazy(() => import("@/pages/PoliticaCookies"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Cuestionario = lazy(() => import("@/pages/Cuestionario"));
const Campaign = lazy(() => import("@/pages/Campaign"));
const Plantillas = lazy(() => import("@/pages/Plantillas"));
const PlantillaDemo = lazy(() => import("@/pages/PlantillaDemo"));
const NotFound = lazy(() => import("@/pages/not-found"));
const CookieBanner = lazy(() =>
  import("@/components/layout/CookieBanner").then((m) => ({
    default: m.CookieBanner,
  })),
);

function PageFallback() {
  return (
    <div className="min-h-screen w-full bg-[#050505]" aria-hidden="true" />
  );
}

function AppRoutes() {
  const [location] = useLocation();
  const isPrivateTemplateRoute = location.startsWith("/plantillas");

  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/email-diario" component={EmailDiario} />
          <Route path="/regalo" component={Regalo} />
          <Route path="/suscrito" component={Suscrito} />
          <Route path="/politica-privacidad" component={PoliticaPrivacidad} />
          <Route path="/aviso-legal" component={AvisoLegal} />
          <Route path="/politica-cookies" component={PoliticaCookies} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/plantillas" component={Plantillas} />
          <Route path="/plantillas/:slug" component={PlantillaDemo} />
          <Route path="/lp/negocios-menorca" component={Campaign} />
          <Route path="/brief/9k3a7q2x5m" component={Cuestionario} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      {!isPrivateTemplateRoute && (
        <Suspense fallback={null}>
          <CookieBanner />
        </Suspense>
      )}
    </>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <AppRoutes />
    </WouterRouter>
  );
}

export default App;
