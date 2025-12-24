import { Routes, Route } from 'react-router-dom';
import './App.css';
import SharedLayout from './SharedLayout';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import About from './components/about/About';
import EmailVerification from './components/authentication/EmailVerification';
import PromoProjetsPage from './components/promoteur/PromoProjetsPage';
import ProtectedRoute from './components/ProtectedRoute';
import NonAutorise  from './components/NonAutorise' 
import ClientProjects from './components/clients/ClientProjects';


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SharedLayout/>}>
        <Route element = {<ProtectedRoute/>}>
            <Route path='verification-email' element = {<EmailVerification/>}/>
        </Route>

        <Route path="client/projets" element={<ProtectedRoute allowedRoles={['client_physique', 'client_entreprise']}> <ClientProjects/> </ProtectedRoute>}/>
        
            <Route path="promoteur/mes-projets" element={<ProtectedRoute allowedRoles={'promoteur'}> <PromoProjetsPage/> </ProtectedRoute>}/>
            <Route path="non-autorise" element={<ProtectedRoute allowedRoles={['promoteur', 'client_physique', 'client_entreprise']}><NonAutorise/> </ProtectedRoute>}/>
            <Route path='about' element = {<About/>}/>
            <Route path="se-connecter" element={<Login />} />
            <Route path="nouveau-compte" element={<Signup />} />
      </Route>
    </Routes>
    </>
  )
}

export default App;
