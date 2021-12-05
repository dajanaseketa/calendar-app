import { useState } from 'react';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import GoogleConfig from '../GoogleConfig.json';
import { useNavigate } from 'react-router';
import * as moment from 'moment';

const Create = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(moment.now());
  const [startTime, setStartTime] = useState(moment.now());
  const [endTime, setEndTime] = useState(moment.now());
  const API_KEY = GoogleConfig.API_KEY;
  const navigate = useNavigate();

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const startDateTime = formatDateTime(startTime);
    const endDateTime = formatDateTime(endTime);

    fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`, 
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          'summary': title, 
          'start': { 'dateTime': startDateTime },
          'end': { 'dateTime': endDateTime }
        })
      })
      .then(() => {
        navigate('/');
      })
  };

  const formatDateTime = (time) => {
    const extractedDate = moment(date).format('YYYY-MM-DD');
    console.log(extractedDate)
    const extractedTime = moment(time).format('HH:mm:ss');
    return `${extractedDate}T${extractedTime}-00:00`;
  }

  return (
    <div className='create'>
        <h2>Add an Event</h2>
      <form className='create-event-form' onSubmit={handleSubmit}>
        <TextField 
          type='text' 
          variant='outlined'
          label='Event title'
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <MobileDatePicker
            className='date-picker'
            label='Event date'
            inputFormat='dd.MM.yyyy'
            value={date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            className='time-picker'
            label='Start Time'
            value={startTime}
            onChange={handleStartTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            className='time-picker'
            label='End Time'
            value={endTime}
            onChange={handleEndTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button type='submit' className='add-event-button' variant='contained'>Add Event</Button>
      </form>
    </div>
  );
}
 
export default Create;