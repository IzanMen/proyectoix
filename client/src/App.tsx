import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import EmailDiario from "@/pages/EmailDiario";
import PoliticaPrivacidad from "@/pages/PoliticaPrivacidad";
import AvisoLegal from "@/pages/AvisoLegal";
import PoliticaCookies from "@/pages/PoliticaCookies";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/email-diario" component={EmailDiario} />
      <Route path="/politica-privacidad" component={PoliticaPrivacidad} />
      <Route path="/aviso-legal" component={AvisoLegal} />
      <Route path="/politica-cookies" component={PoliticaCookies} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
