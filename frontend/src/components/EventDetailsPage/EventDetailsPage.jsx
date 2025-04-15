import "./EventDetailsPage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Redirect } from "react-router-dom";
import { getEventByIdThunk } from "../../store/events";

function EventDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [event, setEvent] = useState({});
  const [parkingPrice, setParkingPrice] = useState(0);
  const [errors, setErrors] = useState({})
  const [disable, setDisable] = useState(true)

  useEffect(() => {
    if(!parkingPrice) {
      setErrors({error:'You must select a parking option'});
      setDisable(true)
    }
    else {
      setErrors(new Object());
      setDisable(false)
    }
  }, [parkingPrice])

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
    <div id="evp-main-div">
      <div id="evp-event-title-div">
        {event && event.name && <div>{event.name}</div>}
      </div>
      <div id="evp-event-img-div">
        {event && event.imageUrl && (
          <img src={event.imageUrl} alt={event.name} />
        )}
      </div>
      <div id="evp-event-description-div">
        {event && event.description && <div>{event.description}</div>}
      </div>
      {event && event.date && event.time && event.location && event.price && (
        <div id="evp-event-info-div">
          <ul>
            <li>
              Date:{" "}
              {new Date(event.date)
                .toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .slice(0, 5) +
                " @ " +
                event.time}
            </li>
            <li>Location: {event.location}</li>
            <li>Price: ${parseFloat(event.price).toFixed(2)}</li>
            <li>
              {"Parking: "}
              <select
                id="evp-parking-select"
                value={parkingPrice}
                onChange={(e) => {
                  e.preventDefault();
                  setParkingPrice(e.target.value);
                }}
              >
                <option value="">Select Parking</option>
                <option value="None 0">None</option>
                <option value="General 0">General - Free</option>
                <option value="Lot-A 15">Lot A - $15.00</option>
                <option value="Lot-B 10">Lot B - $10.00</option>
                <option value="Lot-C 5">Lot C - $5.00</option>
              </select>
            </li>
          </ul>
          {(errors && <p>{errors.error}</p>) || <p></p>}
          <button
            id="evp-pay-btn"
            disabled={disable}
            onClick={() =>
              navigate("/checkout", {
                state: {
                  event,
                  parking: parkingPrice.split(" ")[0],
                  parkingPrice: parseInt(parkingPrice.split(" ")[1]).toFixed(2),
                },
              })
            }
          >
            Buy Admission
          </button>
        </div>
      )}
    </div>
  );
}

export default EventDetailsPage;
