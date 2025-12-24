import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import NavbarWrapper from './components/navbar/NavbarWrapper';



const SharedLayout = () => {

    return (
            <main className=''>
                <NavbarWrapper />
                <div className='min-h-[calc(100vh-341px)]'>
                    <Outlet />
                </div>
                <Footer />
            </main>
    )
    }
    
export default SharedLayout;