import './App.css'
import AuthProvider from './components/AuthProvider/AuthProvider'
import Header from './components/Header/Header'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
      </div>
    </AuthProvider>
  )
}

export default App
