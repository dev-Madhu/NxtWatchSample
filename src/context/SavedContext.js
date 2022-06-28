import React from 'react'

const SavedContext = React.createContext({
  savedVideosList: [],
  isDarkTheme: false,
  addVideoItem: () => {},
  toggleTheme: () => {},
})

export default SavedContext
