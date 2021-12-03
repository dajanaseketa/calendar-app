import EventCard from './EventCard';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';

const DayCard = ({ calendarEvents }) => {
    useEffect(() => {
        console.log(calendarEvents);
    }, [calendarEvents]);

    return ( 
        <div className='events-list'>
            <div className='list-header'>
                <h1>Datum</h1>
                <AddIcon className='add-event-icon'/>
            </div>
            {calendarEvents.map((event) => (
                <EventCard eventData={event} key={event.id}/>
            ))}
        </div>
     );
}
 
export default DayCard;