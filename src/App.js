import './App.css'
import AuthProvider from './components/AuthProvider/AuthProvider'
import Content from './components/Content/Content'
import Header from './components/Header/Header'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Content />
      </div>
    </AuthProvider>
  )
}

export default App
