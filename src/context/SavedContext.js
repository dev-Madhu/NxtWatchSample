import React from 'react'

const SavedContext = React.createContext({
  savedVideosList: [],
  addVideoItem: () => {},
})

export default SavedContext
