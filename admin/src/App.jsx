import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Order from './pages/Orders/Order.jsx'


function App() {

  const url = "http://localhost:4000"

  return (
    <>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/order' element={<Order url={url}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
