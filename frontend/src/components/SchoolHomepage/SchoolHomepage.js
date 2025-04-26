import "./SchoolHomepage.css";
import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { getSchoolByIdThunk } from "../../store/schools";
import { getAllEventsThunk } from "../../store/events";
import { getAllEventsSelector } from "../../store/events";

function SchoolHomepage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [school, setSchool] = useState({});
    const events = useSelector(getAllEventsSelector, (a, b) => a.length === b.length);
    
    useEffect(() => {
        const fetchSchool = async () => {
            const schoolId = params.schoolId;
            const response = await dispatch(getSchoolByIdThunk(schoolId.slice(-1)));
       
            if (response) {
                setSchool(response);
            }
        };
        fetchSchool();

        const fetchEvents = async () => {
            const schoolId = params.schoolId;
            const response = await dispatch(getAllEventsThunk(schoolId.slice(-1)));
          
            if (response) {
                // setEvents(response);
            }
        };
        fetchEvents();
    }, []);

    const handleEventClick = (e, eventId) => {
        e.preventDefault();
        // Navigate to the event details page
        navigate(`events/${eventId}`);
    };
    

  return (
    <div id="shp-main-div">
      <div id="shp-header-div">
        {school && school.name && (
            <div>
                {school.name}
            </div>
        )}
      </div>
      <div id="shp-events-div">
        {events && events.length > 0 ? (
            events.map((event) => (
                <button key={event.id} id={`event-btn-card`} onClick={(e) => handleEventClick(e, event.id)}>
                    <div key={event.id} className="shp-event-card">
                   <div id="shp-event-card-img"> <img src={event.imageUrl} alt={event.name} /></div>
                    <h4 style={{textAlign: 'center'}}>{event.name}</h4>
                    <p>{new Date(event.date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).slice(0, 5) + ' @ ' + event.time }
                    </p>
                    <div style={{alignSelf: 'center', margin: '5px', color: 'red'}}>CLICK TO VIEW</div>
                </div>
                </button>
            ))
        ) : (
            <div>No events available</div>
        )}
      </div>
    </div>
  );
}

export default SchoolHomepage;
