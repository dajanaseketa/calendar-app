import Topbar from './Topbar';
import ContentCard from './ContentCard';

const  Homepage = () => {
    return ( 
        <div className='homepage'>
            <Topbar/>
            <ContentCard /*calendarData={ calendarData }*//>
        </div>
     );
}
 
export default Homepage;