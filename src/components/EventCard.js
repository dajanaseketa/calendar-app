import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect } from 'react';

const EventCard = ({ eventData }) => {
    useEffect(() => {
        console.log(eventData);
    }, [eventData]);
    
    return ( 
        <div className='event-preview'>
            <div className='list-header'>
                <h2>{eventData.title}</h2>
                <DeleteOutlineIcon className='delete-event-icon'/>
            </div>
            <div className='list-content'>
                <h4>start: {eventData.start}</h4>
                <h4>end: {eventData.end}</h4>
            </div>
        </div>
     );
}
 
export default EventCard;