
# 🗂️ **System and User Documentation**  
## **Athletic Admission and Parking Web App**

![db-schema]

[db-schema]: ./images/

---

## 📘 **System Documentation**

### 1. **System Overview**
The **Athletic Admission and Parking Web App** is designed to streamline the process of purchasing tickets for athletic events and managing those events. The application serves three main purposes:
- **For Users**: To register, browse, and purchase admission and parking tickets for school athletic events.
- **For Schools/Administrators**: To manage school profiles and events, as well as track ticket sales and attendance.
- **For Principals**: To register their schools and confirm admin users for event management.

---

### 2. **System Requirements**

#### 2.1 **Functional Requirements**  
- User sign-up and login authentication
- Event creation and management (CRUD functionality for schools and events)
- Stripe integration for secure payment processing
- User dashboard for viewing upcoming events and purchasing tickets
- Principal users can register schools and approve admin users

#### 2.2 **Non-Functional Requirements**
- Responsive design (Mobile & Desktop)
- Cloud hosting on **Render.com**
- Secure payments via **Stripe**
- High availability (99.9% uptime)

---

### 3. **Technology Stack**

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: PostgreSQL, Sequelize ORM
- **Payment Integration**: Stripe API
- **Hosting**: Render.com for both the frontend and backend

---

### 4. **Database Design**

#### 4.1 **User Model**
| Field            | Type     | Description                                  |
|------------------|----------|----------------------------------------------|
| `id`             | UUID     | Primary Key                                  |
| `firstName`      | String   | User’s first name                            |
| `lastName`       | String   | User’s last name                             |
| `email`          | String   | User’s unique email address                  |
| `hashedPassword` | String   | Hashed password                              |
| `role`           | Enum     | Role (e.g., `user`, `admin`, `principal`)    |
| `schoolId`       | UUID     | Foreign key to `School` (nullable)           |

#### 4.2 **School Model**
| Field     | Type    | Description                              |
|-----------|---------|------------------------------------------|
| `id`      | UUID    | Primary Key                              |
| `name`    | String  | School name                              |
| `state`   | String  | State abbreviation (e.g., "CA")          |
| `city`    | String  | City location                            |
| `zipCode` | String  | Postal/ZIP code                          |
| `address` | String  | Full street address                      |

#### 4.3 **Event Model**
| Field       | Type    | Description                            |
|-------------|---------|----------------------------------------|
| `id`        | UUID    | Primary Key                            |
| `schoolId`  | UUID    | Foreign key to `School`                |
| `name`      | String  | Event name                             |
| `description` | Text  | Description of the event               |
| `location`  | String  | Physical location of event             |
| `date`      | Date    | Event date                             |
| `time`      | Time    | Start time                             |
| `price`     | Decimal | Ticket price                           |
| `imageUrl`  | String  | Event image URL                        |
| `status`    | Enum    | Event status (e.g., `scheduled`, `completed`, `cancelled`) |

---

### 5. **API Documentation**

#### 5.1 **Authentication Routes**
- **POST /signup**: Register a new user  
- **POST /login**: Log in and return JWT token

#### 5.2 **School Management (Principal Only)**
- **POST /schools**: Register a new school (Principal only)
- **GET /schools**: List all schools  
- **PUT /schools/:id**: Update a school  
- **DELETE /schools/:id**: Delete a school

#### 5.3 **Event Management**
- **GET /events**: List all events  
- **POST /events**: Create a new event  
- **PUT /events/:id**: Update event details  
- **DELETE /events/:id**: Delete an event

#### 5.4 **Payment Handling**
- **POST /checkout-session**: Create a Stripe Checkout session for event tickets and parking  
---

### 6. **Security Considerations**
- **Password Handling**: Use bcrypt to hash passwords before storage
- **JWT**: Secure token-based authentication for user sessions
- **HTTPS**: Enforced across all endpoints to ensure secure communication
- **Payment Data**: Handled directly by Stripe, ensuring PCI-DSS compliance

---

## 👥 **User Documentation**

### 1. **Introduction**
Welcome to the **Athletic Admission and Parking Web App**. This application is designed to make purchasing tickets for athletic events simple, and managing those events seamless. This documentation will guide you through using the system.

---

### 2. **User Roles**

- **General User**:  
  - Can sign up, log in, and view events.
  - Can purchase tickets (admission and parking).
  - Can view order history and event details.

- **Admin**:  
  - Can create, update, and delete events.
  - Has full access to events.

- **Principal**:  
  - Can register a new school for their district.
  - Can access all school events and manage school details.

---

### 3. **User Guide**

#### 3.1 **Registration and Login**
1. **Sign-Up**:  
   - Click the signup link on the navigation bar.
   - Choose the type of user you are.
   - Enter the required fields
   - Submit form - successful registration will be displayed
   
2. **Login**:  
   - Enter your email and password to log in.

#### 3.2 **Browsing Events**
1. After logging in, you will be redirected to the home page, where you can search for schools to go to their school homepages.
2. Use form to search for schools.

#### 3.3 **Purchasing Tickets**
1. Select an event.
2. Choose your parking option and select checkout
3. Proceed to checkout and provide payment details via **Stripe**.
4. Once the payment is successful, you will receive be redirected to the success page.

### 4. **Admin Guide**

#### 4.1 **Event Management**
1. **Create Event**:  
   - As an admin, you can create new events by providing details such as event name, location, time, description, price, and an image URL.
   
2. **Update Event**:  
   - Update existing events by editing any of the event fields.

3. **Delete Event**:  
   - You can delete events from the dashboard. This will remove the event from the user-facing side of the app.

   ### 5. **Principal Guide**

#### 5.1 **School Registration**
1. **Register School**:  
   - A principal user can register a new school by providing its name, city, state, zip code, and address.
   - This will create a school profile within the system.

---

### 6. **Troubleshooting**

#### 6.1 **Issue: Unable to log in**
- Ensure you are using the correct email and password combination.
- If you forgot your password, use the “Forgot Password” feature to reset it.

#### 6.2 **Issue: Payment failure**
- Check your card details for accuracy.
- Ensure that there are sufficient funds or available credit on your card.
- If issues persist, contact **Stripe support**.

