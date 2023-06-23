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
import Login from './components/Login';
import Signup from './components/Signup';
import Addnote from './components/Addnote';
import { useState } from 'react';
import NewNotebtn from './components/NewNotebtn';
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import Authorization from './components/Authorization';


function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  //setting theme
  // const [themeType, setThemeType] = useState('light')
  // const switchThemes = () => {
  //   setThemeType(last => (last === 'dark' ? 'light' : 'dark'));
  //   console.log("done");
  // }

  return (


    <NoteState showAlert={showAlert}>
      <GeistProvider>
        <CssBaseline />



        <Router>
          <>

            <Navbar showAlert={showAlert}/>

            <Alert alert={alert} />

            <div className='container'>

              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />} />
                <Route exact path="/about" element={<About showAlert={showAlert} />} />
        
                <Route exact path="/authorization" element={<Authorization/>} />
       
                <Route exact path="/addnote" element={<Addnote showAlert={showAlert} />} />
                <Route exact path="/addnote" element={<NewNotebtn />} />
              </Routes>

            </div>

          </>
        </Router>
      </GeistProvider>

    </NoteState>



  );
}

export default App;
