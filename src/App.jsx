import React from 'react'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import Main from "./components/Main.jsx"
import InteractivePlayground from './App/playground'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      <Main/>
      </>
    )
  },

  {
    path: '/playground',
    element: (
      <>
      <InteractivePlayground/>
      </>
    )
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App