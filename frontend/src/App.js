import './App.css'
import { Navbar, MainContent, Footer } from './components/AdminComponents'
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div className="App min-vh-100" style={{ backgroundColor: "#e8f0f2" }}>
        <Navbar />
        <MainContent />
        <Footer />
        {/* <Pages /> */}
    </div>
  );
}

export default App
