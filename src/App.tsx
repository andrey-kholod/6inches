import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Registration from './pages/Registration'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authorization' element={<Auth />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
