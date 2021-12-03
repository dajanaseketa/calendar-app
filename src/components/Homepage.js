import Topbar from './Topbar';
import ContentCard from './ContentCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const  Homepage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('access_token')) {
            navigate('/login');
        } 
    }, []);

    return ( 
        <div className='homepage'>
            <Topbar/>
            <ContentCard/>
        </div>
     );
}
 
export default Homepage;