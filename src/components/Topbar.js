import Logout from './Logout';

const Topbar = () => {
    const userName = localStorage.getItem('userFirstName')
    return ( 
        <nav className='topbar'>
            <h1>{ userName }'s Calendar</h1>
            <Logout />
        </nav>
     );
}
 
export default Topbar;