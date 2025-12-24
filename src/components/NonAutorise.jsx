import { useNavigate } from 'react-router-dom';

const NonAutorise = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>⛔ Accès Non Autorisé</h1>
        <p>Vous n'avez pas la permission d'accéder à cette page.</p>
        <button onClick={() => navigate(-1)}>Retour</button>
        <button onClick={() => navigate('/')}>Accueil</button>
        </div>
    );
};

export default NonAutorise;