import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import clienteAxios from './config/axios';

// Componentes
import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';

function App() {
  // State de la app
  const [citas, guardarCitas] = useState([]);

  // consumir api
  useEffect(() => {
    const consultarAPI = () => {
      clienteAxios
        .get('/pacientes')
        .then((res) => {
          // colocar resultado en el state
          guardarCitas(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    consultarAPI();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Pacientes citas={citas} />} />
        <Route exact path="/nueva" component={NuevaCita} />
        <Route exact path="/cita/:id" component={Cita} />
      </Switch>
    </Router>
  );
}

export default App;
