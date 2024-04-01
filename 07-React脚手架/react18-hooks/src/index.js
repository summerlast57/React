import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom";
import router from './router'
import store from './store'

import App from './App'


const root = createRoot(document.getElementById('root'))
root.render(
  
    <Provider store={store}>
      <RouterProvider router={router}>
      <App />
      </RouterProvider>
    </Provider>
  




)
