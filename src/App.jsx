import { Routes, Route } from 'react-router-dom';
import './App.css';
import SharedLayout from './SharedLayout';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import About from './components/about/About';
import Home from './components/home/Home';
import EmailVerification from './components/authentication/EmailVerification';
import ProtectedRoute from './components/ProtectedRoute';
import NonAutorise  from './components/NonAutorise';
import Dashboard from './components/pages/promoteur/Dashboard';
import PromoReservations from './components/pages/promoteur/PromoReservations';
import ProjectDetails from './components/pages/promoteur/mesProjets/ProjectDetails';
import MesProjets from  './components/pages/promoteur/mesProjets/MesProjets';
import CreateProject from './components/pages/promoteur/mesProjets/CreateProject';

import TousLesProjets from './components/pages/client/tousLesProjets/TousLesProjets';
import ClientProjectDetails from './components/pages/client/tousLesProjets/ClientProjectDetails';
import MesReservations from './components/pages/client/MesReservations';
import MesFavoris from './components/pages/client/MesFavoris';


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SharedLayout/>}>

        <Route lement={<ProtectedRoute allowedRoles={['promoteur','client_physique', 'client_entreprise']  }> <MesProjets /> </ProtectedRoute>}>
            <Route path='verification-email' element = {<EmailVerification/>}/>
        </Route>
        
        <Route path="/promoteur/mes-projets" element={<ProtectedRoute allowedRoles={'promoteur'}> <MesProjets /> </ProtectedRoute>}/>
        <Route path="/promoteur/reservations" element={<ProtectedRoute allowedRoles={'promoteur'}> <PromoReservations/> </ProtectedRoute>}/>
        <Route path="/promoteur/tableau-de-bord" element={<ProtectedRoute allowedRoles={'promoteur'}> <Dashboard/> </ProtectedRoute>}/>
        <Route path="/promoteur/mes-projets/:id" element={<ProtectedRoute allowedRoles={'promoteur'}> <ProjectDetails /> </ProtectedRoute>}/>
        <Route path="/promoteur/mes-projets/creer-projet" element={<ProtectedRoute allowedRoles={'promoteur'}> <CreateProject /> </ProtectedRoute>}/>
        <Route path="/promoteur/accueil" element={<ProtectedRoute allowedRoles={'promoteur'}> <Home/> </ProtectedRoute>}/>


        <Route path="/client/projets" element={<ProtectedRoute allowedRoles={['client_physique', 'client_entreprise']}> <TousLesProjets/> </ProtectedRoute>}/>
        <Route path="/client/projets/:id" element={<ProtectedRoute allowedRoles={['client_physique', 'client_entreprise']}> <ClientProjectDetails /> </ProtectedRoute>}/>
        <Route path="/client/mes-reservations" element={<ProtectedRoute allowedRoles={['client_physique', 'client_entreprise']}> <MesReservations/> </ProtectedRoute>}/>
        <Route path="/client/favoris" element={<ProtectedRoute allowedRoles={['client_physique', 'client_entreprise']}> <MesFavoris/> </ProtectedRoute>}/>
        <Route path="/client/accueil" element={<ProtectedRoute allowedRoles={['client_physique', 'client_entreprise']}> <Home/> </ProtectedRoute>} />

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
