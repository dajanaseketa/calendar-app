import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect } from 'react';
import * as moment from 'moment';

const EventCard = ({ eventData }) => {
    const eventId = eventData.id;
    
    return ( 
        <div className='event-preview'>
            <div className='list-header'>
                <h2>{eventData.title}</h2>
                <DeleteOutlineIcon className='delete-event-icon' 
                /* onClick={this.props.onDelete(eventData.id)} */
                />
            </div>
            <div className='list-content'>
                <h4>start: {moment(eventData.start).format('DD.MM.YYYY. HH:mm:ss')}</h4>
                <h4>end: {moment(eventData.end).format('DD.MM.YYYY. HH:mm:ss')}</h4>
            </div>
        </div>
     );
}
 
export default EventCard;