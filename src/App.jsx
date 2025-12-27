import { Routes, Route } from 'react-router-dom';
import './App.css';
import SharedLayout from './SharedLayout';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import About from './components/about/About';
import EmailVerification from './components/authentication/EmailVerification';
import ProtectedRoute from './components/ProtectedRoute';
import NonAutorise  from './components/NonAutorise' 
import Dashboard from './components/promoteur/Dashboard';
import PromoReservations from './components/promoteur/PromoReservations';
import ProjectDetails from './components/promoteur/ProjectDetails';
import ProjectList from  './components/promoteur/ProjectList';
import CreateProject from './components/promoteur/CreateProject';

import ClientProjects from './components/clients/ClientProjects';
import ClientReservations from './components/clients/ClientReservations';
import FavorisProject from './components/clients/FavorisProject';



function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SharedLayout/>}>

        <Route element = {<ProtectedRoute/>}>
            <Route path='verification-email' element = {<EmailVerification/>}/>
        </Route>
        
        <Route path="/promoteur/mes-projets" element={<ProtectedRoute allowedRoles={'promoteur'}> <ProjectList /> </ProtectedRoute>}/>
        <Route path="promoteur/reservations" element={<ProtectedRoute allowedRoles={'promoteur'}> <PromoReservations/> </ProtectedRoute>}/>
        <Route path="promoteur/tableau-de-bord" element={<ProtectedRoute allowedRoles={'promoteur'}> <Dashboard/> </ProtectedRoute>}/>
        <Route path="/promoteur/mes-projets/:id" element={<ProtectedRoute allowedRoles={'promoteur'}> <ProjectDetails /> </ProtectedRoute>}/>
        <Route path="/promoteur/mes-projets/creer-projet" element={<ProtectedRoute allowedRoles={'promoteur'}> <CreateProject /> </ProtectedRoute>}/>


        <Route path="client/projets" element={<ProtectedRoute allowedRoles={['client_physique', 'client_entreprise']}> <ClientProjects/> </ProtectedRoute>}/>
        <Route path="client/mes-reservations" element={<ProtectedRoute allowedRoles={['client_physique', 'client_entreprise']}> <ClientReservations/> </ProtectedRoute>}/>
        <Route path="client/favoris" element={<ProtectedRoute allowedRoles={['client_physique', 'client_entreprise']}> <FavorisProject/> </ProtectedRoute>}/>

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
