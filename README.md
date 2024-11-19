Car Management Application

A full-featured Car Management Application built with Next.js (TypeScript), MongoDB, and Material-UI (MUI). This app enables users to manage their car inventory with features like user authentication, car creation, viewing, editing, and deletion. The application also includes a global search functionality to efficiently find cars based on their title, description, or tags.

Features
 - User Authentication: Sign up and log in securely to manage your cars.
 - Add Cars: Upload up to 10 images for a car, set a title, description, and tags.
 - Manage Cars: View, edit, and delete cars.
 - Global Search: Search cars by title, description, or tags.
 - View Details: Click on any car to see its full details.
 - Responsive and professional UI with Material-UI and Tailwind CSS.

Tech Stack
 - Frontend: Next.js (TypeScript), Material-UI, Tailwind CSS.
 - Backend: Node.js API routes (RESTful API).
 - Database: MongoDB.
 - Styling: Material-UI components, Tailwind CSS.
 - Authentication: JWT for secure API interactions and Zod For typeChecking.

Folder Structure
 - The project follows the src-based folder structure in Next.js:

 ```
 src/
├── app/
│   ├── api/
│   │   ├── cars/
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts          # Details of specific car (CRUD operations).
│   │   │   ├── create/
│   │   │   │   ├── route.ts         # Create a new car.
│   │   │   ├── list/
│   │   │       ├── route.ts         # List all cars.
│   │   ├── users/
│   │   │   ├── signin/
│   │   │   │   ├── route.ts         # User login logic.
│   │   │   ├── signup/
│   │   │   │   ├── route.ts         # User signup logic.
│   │   │   ├── logout/
│   │   │       ├── route.ts         # User logout logic.
│   ├── cars/
│   │   ├── [id]/
│   │   │   ├── edit/
│   │   │   │   ├── page.tsx         # Edit specific car frontend logic.
│   │   │   ├── page.tsx             # Details of specific car frontend logic.
│   │   ├── create/
│   │   │   ├── page.tsx             # Create a new car frontend logic.
│   │   ├── list/
│   │       ├── page.tsx             # List all cars frontend logic.
│   ├── signin/
│   │   ├── page.tsx                 # Sign-in page.
│   ├── signup/
│       ├── page.tsx                 # Sign-up page.
├── components/
│   ├── CarForm.tsx                  # Reusable car form component.
│   ├── CarCard.tsx                  # Card to display car details.
│   ├── Appbar.tsx                   # Navigation bar.
│   ├── Auth.tsx                     # Authentication UI components.
│   ├── TypeCheck.ts                 # Input validation logic.
│   ├── SearchBar.tsx                # Search bar for cars.
├── dbConfig/
│   ├── dbConfig.ts                  # MongoDB connection setup.
├── models/
│   ├── Car.ts                       # MongoDB schema for cars.
│   ├── model.ts                     # MongoDB schema for user authentication.
├── styles/
│   ├── globals.css                  # Global styles (includes TailwindCSS).
│   ├── theme.ts                     # Material-UI theme customization.
.env                                 # Environment variables.

```


Getting Started
1. Prerequisites
 - NextJs
 - ReactJs
 - Typescript
 - Node.js (v16+)
 - MongoDB Database
 - Git (for version control)
2. Clone the Repository
  - git clone https://github.com/your-username/car-management.git
  -  cd my-app

3. Install Dependencies
  Install all required Node.js modules:
 - npm install


4. Setup Environment Variables

  Create a .env.local file in the root directory and add the following variables:

  - MONGO_URI=your_mongodb_connection_string
  - JWT_SECRET=your_jwt_secret_key
  - Domain: http://localhost:3000

5. Run the Development Server

     Start the development server:

     - npm run dev


API Endpoints

1. POST /api/users/signup
 - Description: Register a new user.
 - Body Parameters:
    - username (string, required)
    - password (string, required)

2. POST /api/users/signin
  - Description: Log in an existing user.
   - Body Parameters:
      - username (string, required)
      - password (string, required)

3. POST /api/cars/create
   - Description: Add a new car.
   - Body Parameters:
     - title (string, required)
     - description (string, required)
     - tags (array of strings, optional)
     - images (array of file uploads, up to 10, required)

4. GET /api/cars/list
    - Description: Retrieve all cars created by the user.

5. GET /api/cars/
    - Description: Retrieve details of a specific car.

6. PUT /api/cars/
  - Description: Update a car's details.
   - Body Parameters: Any combination of the car fields.

7. DELETE /api/cars/
  - Description: Delete a specific car.


Scripts
   - Start Development Server: npm run dev
   - Build for Production: npm run build
   - Start Production Server: npm start
   - Lint the Code: npm run lint

Screenshots
1. Signup /Signin Page
<img src="screenshots/Screenshot (1264).png" alt="Add Contact Form" width="700"/>
<img src="screenshots/Screenshot (1265).png" alt="Add Contact Form" width="700"/>

2. Car List Page
<img src="screenshots/Screenshot (1270).png" alt="Contact List Page" width="700"/>
<img src="screenshots/Screenshot (1271).png" alt="Contact List Page" width="700"/>

3. Add Car Page
<img src="screenshots/Screenshot (1272).png" alt="Add Contact Form" width="700" />

4. Edit Car Detail Page
<img src="screenshots/Screenshot (1273).png" alt="Edit Contact Form" width="700" />

5. Edit Car [id] Page
<img src="screenshots/Screenshot (1274).png" alt="Edit Contact Form" width="700" />

