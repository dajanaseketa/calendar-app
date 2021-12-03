import DayCard from './DayCard';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

const ContentCard = ({ calendarData }) => {
    const [timerange, setTimerange] = useState(7);

    const handleChange = (event) => {
        setTimerange(event.target.value);
    };
    
    return ( 
        <div className='content'>
            <div className='list-header'>
                <h2>Timerange izracunat</h2>
                <div className='timerange-dropdown'>
                    <FormControl variant='standard'>
                        <InputLabel>Timerange</InputLabel>
                        <Select value={timerange} onChange={handleChange} label='Timerange'>
                            <MenuItem value={1}>1 day</MenuItem>
                            <MenuItem value={7}>7 days</MenuItem>
                            <MenuItem value={30}>30 days</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            {/*<p>ovdje staviti if dropdownValue 1 ili 7 ide dayCard, inace weekCard</p>*/}
            <DayCard calendarData={ calendarData }/>
        </div>
     );
}
 
export default ContentCard;