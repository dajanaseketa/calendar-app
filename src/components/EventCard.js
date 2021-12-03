import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const EventCard = ({ eventData }) => {
    
    return ( 
        <div className='event-preview'>
            <h1>Podaci o eventu</h1>
            <DeleteOutlineIcon/>
        </div>
     );
}
 
export default EventCard;