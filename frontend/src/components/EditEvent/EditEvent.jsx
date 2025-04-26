import "./EditEvent.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getEventByIdThunk } from "../../store/events";
import { editEventThunk } from "../../store/events";

function EditEvent() {
  const { user } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  let eventId = params.eventId;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await dispatch(getEventByIdThunk(eventId));

      if (response) {
        // Handle the response, e.g., set state or display event details
        const { name, description, location, date, time, price, imageUrl } = response;

        setName(name);
        setDescription(description);
        setLocation(location);
        setDate(formatDate(date).replace(/-/g, "/"));
        setTime(time);
        setPrice(price);
        setImageUrl(imageUrl);
        setEvent(response);
      }
    };
    fetchEvent();
  }, [dispatch, params.eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      name,
      description,
      location,
      date,
      time,
      price: parseFloat(price),
      imageUrl,
    };

    // Call the edit event thunk with the updated event data
    dispatch(editEventThunk(eventId, updatedEvent)).catch((error) => {
        // Handle error
        console.error("Error updating event:", error);
      });
      alert("Event updated successfully");
      nav(`/admin/${user.id}/panel`);
  };

  return (
    <div id="edit-event">
      <div id="title-div"><h1>Edit Event</h1></div>
      <form>
        <div className="form-group">
          <label htmlFor="eventName">Name:</label>
          <input type="text" id="eventName" name="eventName" required value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="eventDescription">Description:</label>
          <input
            id="eventDescription"
            name="eventDescription"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="eventLocation">Location:</label>
          <input type="text" id="eventLocation" name="eventLocation" required value={location} onChange={e => setLocation(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Date:</label>
          <input type="text" id="eventDate" name="eventDate" required value={date} onChange={e => setDate(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="eventTime">Time:</label>
          <input type="text" id="eventTime" name="eventTime" required value={time} onChange={e => setTime(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="eventPrice">Price(USD):</label>
          <input
            type="text"
            id="eventPrice"
            name="eventPrice"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventImageUrl">Image URL:</label>
          <input type="url" id="eventImageUrl" name="eventImageUrl" required value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
        </div>

        <div id="btn-div">
          <button type="submit" onClick={e => handleSubmit(e)}>Save</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              nav(`/admin/${user.id}/panel`);
            }}
          >
            Cancel
          </button>
          </div>
      </form>
    </div>
  );
}

export default EditEvent;
