import Button from '@mui/material/Button';
import { useEffect } from 'react';
import GoogleConfig from '../GoogleConfig.json';
import { useNavigate } from 'react-router';

function Login() {
    const navigate = useNavigate();
    const CLIENT_ID = GoogleConfig.CLIENT_ID;
    const API_KEY = GoogleConfig.API_KEY;
    const SCOPES = GoogleConfig.SCOPES;

    const handleClientLoad = () => {
        window.gapi.load('client:auth2', initClient);
    };

    const openSignInPopup = () => {
        window.gapi.auth2.authorize(
            { client_id: CLIENT_ID, scope: SCOPES },
            (res) => {
                if (res.access_token) {
                    localStorage.setItem('access_token', res.access_token);

                    fetch(
                        `https://www.googleapis.com/oauth2/v3/userinfo?key=${API_KEY}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                            },
                    })
                    .then((res) => {
                        return res.json();
                    })
                    .then((res) => {
                        localStorage.setItem('user_given_name', res.given_name);
                        navigate('/');
                    });
                }
            }
        )}
 
    const initClient = () => {
        if (!localStorage.getItem('access_token')) {
            openSignInPopup();
        } else {
            navigate('/');
        }
   };

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = 'https://apis.google.com/js/api.js';

        document.body.appendChild(script);
    }, []);

    return (
        <div className='login-page'>
            <h1>Welcome to the MyCalendar App</h1>
            <Button onClick={handleClientLoad} variant='outlined'>Login with Google</Button>
        </div>
    );
}

export default Login;