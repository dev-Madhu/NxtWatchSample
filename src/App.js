import {Route, Switch} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Login from './components/Login'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  </>
)

export default App
