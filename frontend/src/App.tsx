import './App.css';
import {ApplicationRoutes} from './routes'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
          <Switch>
            <Route
              exact
              path={ApplicationRoutes.HOME.path}
              component={ApplicationRoutes.HOME.component}
            />
          </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
