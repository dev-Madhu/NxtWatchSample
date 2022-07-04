import {Route, Switch} from 'react-router-dom'
import {v4} from 'uuid'
import {Component} from 'react'
import './App.css'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Login from './components/Login'
import VideoItemDetails from './components/VideoItemDetails/VideoItemDetails'
import Trending from './components/Trending/Trending'
import Gaming from './components/Gaming/Gaming'
import NotFound from './components/NotFound/NotFound'
import SavedVideos from './components/SavedVideos/SavedVideos'
import SavedContext from './context/SavedContext'

class App extends Component {
  state = {
    savedVideosList: [],
    isDarkTheme: false,
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  addVideoItem = product => {
    const newProduct = {...product, num: v4()}
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, newProduct],
    }))
  }

  render() {
    const {savedVideosList, isDarkTheme} = this.state
    return (
      <SavedContext.Provider
        value={{
          savedVideosList,
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          addVideoItem: this.addVideoItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </SavedContext.Provider>
    )
  }
}

export default App
