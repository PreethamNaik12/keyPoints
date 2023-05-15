import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Link,
  Routes
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';


function App() {
  return (
    <NoteState>

    <Router>
      <>
        
            <Navbar />
            <Alert alert = {"Message"}/>
              <div className='container'>

              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
              </Routes>
            
          </div>
          
      </>
    </Router>

    </NoteState>


  );
}

export default App;
