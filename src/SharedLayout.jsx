import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';



const SharedLayout = () => {

    return (
            <main className=''>
                <Navbar />
                <div className='min-h-[calc(100vh-341px)]'>
                    <Outlet />
                </div>
                <Footer />
            </main>
    )
    }
    
export default SharedLayout;