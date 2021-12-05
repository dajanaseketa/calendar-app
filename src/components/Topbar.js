import Logout from './Logout';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

const Topbar = () => {
    const defaultUserName = 'Somebody';
    const userName = localStorage.getItem('user_given_name') ? localStorage.getItem('user_given_name') : defaultUserName;
    const navigate = useNavigate();

    const addEvent = () => {
        navigate('/create');
    }; 

    return ( 
        <nav className='topbar'>
            <h1>{ userName }'s Calendar</h1>
            <div className="buttons-container">
                <Button className='add-event-button' onClick={addEvent} variant='contained'>Add Event</Button>
                <Logout/>
            </div>
        </nav>
     );
}
 
export default Topbar;