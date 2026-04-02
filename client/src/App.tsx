import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import EmailDiario from "@/pages/EmailDiario";
import Confirmado from "@/pages/Confirmado";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/email-diario" component={EmailDiario} />
      <Route path="/confirmado" component={Confirmado} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
