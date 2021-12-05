import EventCard from './EventCard';

const WeekCard = ({ calendarEvents, weekNumber }) => {

    const renderEventCards = () => {
        const cardsToRender = [];
        for(let i=0; i<calendarEvents.length; i++) {
            console.log(calendarEvents[i])
            cardsToRender.push(<EventCard eventData={calendarEvents[i]} key={calendarEvents[i].id}/>);
        }
        return cardsToRender;
    }

    return ( 
        <div className='events-list'>
            <div className='list-header'>
            <h1>Week {weekNumber}</h1>
            </div>
            {renderEventCards()}
        </div>
     );
}

export default WeekCard;