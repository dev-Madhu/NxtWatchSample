import {Route, Redirect, Switch} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Login from './components/Login'
import VideoItemDetails from './components/VideoItemDetails/VideoItemDetails'
import Trending from './components/Trending/Trending'
import Gaming from './components/Gaming/Gaming'
import NotFound from './components/NotFound/NotFound'
import HeaderRoute from './components/HeaderRoute'

const App = () => (
  <>
    <HeaderRoute />
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/videos/:id" component={VideoItemDetails} />
      <ProtectedRoute exact path="/trending" component={Trending} />
      <ProtectedRoute exact path="/gaming" component={Gaming} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
