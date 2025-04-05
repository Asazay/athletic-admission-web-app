import './EventDetailsPage.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { getEventByIdThunk } from '../../store/events';

function EventDetailsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [event, setEvent] = useState({});

    console.log(event);

    useEffect(() => {
        const fetchEvent = async () => {
            const schoolId = params.schoolId.slice(-1);
            const eventId = params.eventId.slice(-1);
            const response = await dispatch(getEventByIdThunk(eventId, schoolId));
            if (response) {
                setEvent(response);
            }
        };
        fetchEvent();
    }, [dispatch, params.eventId]);

    return (
        <div id='evp-main-div'>
            <div id='evp-event-title-div'>
                {event && event.name && (
                    <div>
                        {event.name}
                    </div>
                )}
            </div>
            <div id='evp-event-img-div'>
                {event && event.imageUrl && (
                    <img src={event.imageUrl} alt={event.name} />
                )}
            </div>
            <div id='evp-event-description-div'>
                {event && event.description && (
                    <div>
                        {event.description}
                    </div>
                )}
            </div>
                {event && event.date && event.time && event.location && event.price && (
                    <div id='evp-event-info-div'>
                        <ul>
                            <li>Date: {new Date(event.date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).slice(0, 5) + ' @ ' + event.time}</li>
                            <li>Location: {event.location}</li>
                            <li>Price: ${event.price.toFixed(2)}</li>
                            <li>
                                {'Parking: '}
                                <select id='evp-parking-select'>
                                    <option value='none'>Select Parking</option>
                                    <option value='general'>General - Free</option>
                                    <option value='lot A'>Lot A - $20.00</option>
                                    <option value='lot B'>Lot B - $10.00</option>
                                    <option value='lot C'>Lot C - $5.00</option>
                                </select>
                            </li>
                        </ul>
                        <button id='evp-pay-btn' onClick={() => console.log(':)')}>Buy Admission</button>
                    </div>
                )}
        </div>
    )

}

export default EventDetailsPage;