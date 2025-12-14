import { Routes, Route } from 'react-router-dom';
import './App.css';
import SharedLayout from './SharedLayout';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import About from './components/about/About';
import EmailVerification from './components/authentication/EmailVerification';


function App() {

  return (
    <Routes>
      <Route path='/' element={<SharedLayout/>}>
        <Route path='nouveau-compte' element={<Signup/>}/>
        <Route path='se-connecter' element={<Login/>}/>
        <Route path='about' element = {<About/>}/>
        <Route path='verification-email' element = {<EmailVerification/>}/>
      </Route>
    </Routes>
  )
}

export default App;
