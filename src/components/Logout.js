import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

function Logout() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }; 

    return (
        <div className='logout'>
            <Button onClick={ logout } variant='outlined'>Logout</Button>
        </div>
    );
}

export default Logout;