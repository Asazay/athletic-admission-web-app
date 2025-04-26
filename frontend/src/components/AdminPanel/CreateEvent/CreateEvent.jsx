import "./CreateEvent.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createEventThunk } from "../../../store/events";

function CreateEvent() {
  const { user } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const schoolId = user.school.id;


  const handleSubmit = async (e) => {
    e.preventDefault();

    let resErr;

    // Handle form submission logic here
    const eventData = {
      schoolId,
      name,
      description,
      location,
      date,
      time,
      price,
      imageUrl,
    };

    // Dispatch the event creation action
    let res = await dispatch(createEventThunk(eventData)).catch(async (error) => {
     resErr = await error.json();
    }
    );

    if (resErr) {
      // Handle error response
      console.error("Error creating event:", resErr);
      alert("Error creating event: " + resErr.message);
      return;
    }


    alert("Event created successfully!");

    // Reset form fields
    // setName("");
    // setDescription("");
    // setLocation("");
    // setDate("");
    // setTime("");
    // setPrice("");
    // setImageUrl("");

    // Optionally, you can navigate to a different page after successful creation
    nav(`/admin/${user.id}/panel`);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // Handle cancel logic here
    nav(`/admin/${user.id}/panel`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "date":
        setDate(value);
        break;
      case "time":
        setTime(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "imageUrl":
        setImageUrl(value);
        break;
      default:
        break;
    }
  };

  return (
    <div id="create-event">
      <div id="title-div"><h1>Create Event</h1></div>
      <form id='create-form' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventName">Name:</label>
          <input
            type="text"
            id="eventName"
            name="name"
            required
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDescription">Description:</label>
          <input
            id="eventDescription"
            name="description"
            required
            value={description}
            onChange={handleChange}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="eventLocation">Location:</label>
          <input
            type="text"
            id="eventLocation"
            name="location"
            required
            value={location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Date:</label>
          <input
            type="date"
            id="eventDate"
            name="date"
            required
            value={date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventTime">Time:</label>
          <input
            type="time"
            id="eventTime"
            name="time"
            required
            value={time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventPrice">Price:</label>
          <input
            type="number"
            id="eventPrice"
            name="price"
            required
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventImageUrl">Image URL:</label>
          <input
            type="text"
            id="eventImageUrl"
            name="imageUrl"
            placeholder="Will default to a preselected image if not provided"
            value={imageUrl}
            onChange={handleChange}
          />
        </div>

        <div id="btn-div">
          <button type="submit">Create Event</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
