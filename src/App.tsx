import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import NavBar from "./components/common/NavBar"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <main className='main-content'>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
