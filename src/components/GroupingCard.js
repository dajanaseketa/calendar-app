import EventCard from './EventCard';
import GoogleConfig from '../GoogleConfig.json';

const GroupingCard = ({fetchEvents, calendarEvents, date, selectedTimerange}) => {
    const API_KEY = GoogleConfig.API_KEY;

    const handleChildClick = (eventId) => {
        fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}?key=${API_KEY}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        }).then(() => {
            fetchEvents();
        })
    }

    const renderGroupingCards = () => {
        if(selectedTimerange === 1 || selectedTimerange === 7) {
            return renderDayCards();
        } else {
            return renderWeekCards();
        }
    }

    const renderDayCards = () => {
        return (<div className='events-list'>
            <div className='list-header'>
                <h1>{date}</h1>
            </div>
            {renderEventCards()}
        </div>);
    }

    const renderWeekCards = () => {
        return (<div className='events-list'>
        <div className='list-header'>
            <h1>Week {date}</h1>
            </div>
            {renderEventCards()}
            </div>
        );
    }

    const renderEventCards = () => {
        const cardsToRender = [];
        for(let i=0; i<calendarEvents.length; i++) {
            cardsToRender.push(<EventCard eventData={calendarEvents[i]} onClick={(child) => handleChildClick(child)} key={calendarEvents[i].id}/>);
        }
        return cardsToRender;
    }

    return (
        <div>
            {renderGroupingCards()}
        </div>
     );
}
 
export default GroupingCard;