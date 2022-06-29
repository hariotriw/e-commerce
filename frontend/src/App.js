import './App.css'
import { Navbar, MainContent, Footer } from './components/AdminComponents'
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div className="App">
        <Navbar />
        <MainContent />
        <Footer />
        {/* <Pages /> */}
    </div>
  );
}

export default App
