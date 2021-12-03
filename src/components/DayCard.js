import EventCard from './EventCard';
import AddIcon from '@mui/icons-material/Add';

const DayCard = ({ calendarData }) => {

    return ( 
        <div className='events-list'>
            <div className='list-header'>
                <h1>Datum</h1>
                <AddIcon className='add-event-icon'/>
            </div>
            {/* {calendarData.map((event) => (
                <EventCard eventData={ event }/>
            ))} */}
        </div>
     );
}
 
export default DayCard;