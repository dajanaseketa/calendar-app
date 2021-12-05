import EventCard from './EventCard';
import { useEffect, useState } from 'react';
import GoogleConfig from '../GoogleConfig.json';

const DayCard = (props) => {
    const [calendarEvents, setCalendarEvents] = useState(props.calendarEvents);
    const API_KEY = GoogleConfig.API_KEY;

    /* const handleDelete = (eventId) => {
        fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}?key=${API_KEY}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
    } */

    const renderEventCards = () => {
        const cardsToRender = [];
        for(let i=0; i<calendarEvents.length; i++) {
            console.log(calendarEvents[i])
            cardsToRender.push(<EventCard eventData={calendarEvents[i]} key={calendarEvents[i].id}/>);
        }
        return cardsToRender;
    }

    useEffect(() => {
        setCalendarEvents(props.calendarEvents);
    }, [calendarEvents]);

    return ( 
        <div className='events-list'>
            <div className='list-header'>
                <h1>{props.date}</h1>
            </div>
            {renderEventCards()}
        </div>
     );
}
 
export default DayCard;