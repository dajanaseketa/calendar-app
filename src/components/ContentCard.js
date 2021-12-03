import DayCard from './DayCard';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import GoogleConfig from '../GoogleConfig.json';
import { useNavigate } from 'react-router';

const ContentCard = () => {
    const [selectedTimerange, setselectedTimerange] = useState(7);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(startDate.setDate(startDate.getDate() + selectedTimerange)));
    const [timerangeString, setTimerangeString] = useState(`${startDate} - ${endDate}`);
    const [events, setEvents] = useState(null);
    const API_KEY = GoogleConfig.API_KEY;
    
    const navigate = useNavigate();

    const handleChange = (event) => {
        setselectedTimerange(event.target.value);
        console.log(selectedTimerange)
        setEndDate(endDate.getDate()+selectedTimerange);
        console.log(endDate)
    };

    const fetchCalendarEvents = () => {
        console.log("tusam")
        fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
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
                console.log(data)
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
        }));
    };

    useEffect(() => {
        setEndDate(new Date(endDate.getDate() + selectedTimerange));
        fetchCalendarEvents();
    }, [selectedTimerange]);
    
    return ( 
        <div className='content'>
            <div className='list-header'>
                <h2>{timerangeString}</h2>
                <div className='timerange-dropdown'>
                    <FormControl variant='standard'>
                        <InputLabel>Timerange</InputLabel>
                        <Select value={selectedTimerange} onChange={handleChange} label='Timerange'>
                            <MenuItem value={1}>1 day</MenuItem>
                            <MenuItem value={7}>7 days</MenuItem>
                            <MenuItem value={30}>30 days</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            {/*<p>ovdje staviti if dropdownValue 1 ili 7 ide dayCard, inace weekCard</p>*/}
            <DayCard calendarEvents={events}/>
        </div>
     );
}
 
export default ContentCard;