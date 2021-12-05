import DayCard from './DayCard';
import WeekCard from './WeekCard';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import GoogleConfig from '../GoogleConfig.json';
import { useNavigate } from 'react-router';
import * as moment from 'moment';

const ContentCard = () => {
    const [selectedTimerange, setSelectedTimerange] = useState(7);
    const [startDate, setStartDate] = useState(moment().valueOf());
    const [endDate, setEndDate] = useState(moment(startDate).add(selectedTimerange, 'days'));
    const [events, setEvents] = useState([]);
    const API_KEY = GoogleConfig.API_KEY;
    const navigate = useNavigate();

    const handleTimerangeChange = (event) => {
        setSelectedTimerange(event.target.value);
        /* console.log(event.target.value)
        console.log(selectedTimerange) */
        setStartDate(moment().valueOf());
        setEndDate(moment(startDate).add(event.target.value, 'days'));
    };

    const fetchCalendarEvents = () => {
        fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true&timeMin=${moment(startDate).toISOString()}&timeMax=${moment(endDate).toISOString()}&key=${API_KEY}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
        .then((res) => {
            if (res.status !== 401) {
                return res.json();
            } else {
                localStorage.removeItem("access_token");
                navigate('/login');
            }
        })
        .then((data) => {
            if (data?.items) {
                setEvents(formatEvents(data.items));
            }
        });
    };

    const formatEvents = (list) => {
        return list.map((item) => ({
            id: item.id,
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date,
            groupByKey: (selectedTimerange === 1 || selectedTimerange === 7) ? moment(item.start.dateTime).format('DD.MM.YYYY') : moment(item.start.dateTime).isoWeek()
        }));
    };

    const groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

    const renderGroupingCards = () => {
        const cardsToRender = [];
        const groupEvents = groupBy('groupByKey');
        const groupedEvents = groupEvents(events);
            
        console.log(groupedEvents)
        for (const [key, value] of Object.entries(groupedEvents)) {
            if (selectedTimerange === 1 || selectedTimerange === 7) {
                console.log(selectedTimerange)
                cardsToRender.push(<DayCard calendarEvents={value} date={key} key={key}/>);
            } else {
                console.log(selectedTimerange)
                cardsToRender.push(<WeekCard calendarEvents={events} weekNumber={key} key={key}/>);
            }
        }
        return cardsToRender;
    }

    useEffect(() => {
        fetchCalendarEvents();
    }, [selectedTimerange]);
    
    return ( 
        <div className='content'>
            <div className='list-header'>
                <h2>{moment(startDate).format('DD.MM.YYYY')} - {moment(endDate).format('DD.MM.YYYY')}</h2>
                <div className='timerange-dropdown'>
                    <FormControl variant='standard'>
                        <InputLabel>Timerange</InputLabel>
                        <Select value={selectedTimerange} onChange={handleTimerangeChange} label='Timerange'>
                            <MenuItem value={1}>1 day</MenuItem>
                            <MenuItem value={7}>7 days</MenuItem>
                            <MenuItem value={30}>30 days</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            {renderGroupingCards()}
        </div>
     );
}
 
export default ContentCard;