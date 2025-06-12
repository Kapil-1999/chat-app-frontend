import React, { useContext } from 'react'
import MyRoutes from './routes/MyRoutes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster />
      <MyRoutes />
    </div>
  )
}

export default App