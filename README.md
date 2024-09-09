# Tarang -React Chatting App

![Project Preview] (![Screenshot 2024-08-14 155557](https://github.com/user-attachments/assets/1d8dfd13-04fa-44e8-93a7-443d7a404d2b)



A real-time chatting application built using **React**, **Socket.io**, and **Express**. The app features real-time messaging, profile picture uploads to **AWS S3**, and user authentication. This project demonstrates effective use of modern web technologies to create an engaging messaging experience.
### An old image. Update Soon..

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Demo

Check out the live demo: [Chatting App Demo] ## PENDING  <!-- Add your deployed app link here -->

## Features

- Real-time messaging with **Socket.io**
- Profile picture uploads to **AWS S3**
- User authentication and management
- Responsive UI with **React**

## Tech Stack

- **Frontend:** React.js
- **Backend:** Express.js, Socket.io
- **Database:** MongoDB
- **Cloud Storage:** AWS S3
- **Deployment:** Render

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-chatting-app.git
   cd react-chatting-app

2. Install Dependencies for the backend:
   ```bash
   cd backend
   npm install
```
3. Install dependencies for the frontend:
```bash
    cd frontend
    npm install
```
4. Create a .env file in the backend directory and add the following environment variables:
   ```
      MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-secret-key>
    AWS_ACCESS_KEY_ID=<your-aws-access-key>
    AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
    AWS_S3_BUCKET=<your-s3-bucket-name>
 ```
5. Run the application:
```bash
    # Start backend server
    cd backend
    npm start
    
    # Start frontend server
    cd ../frontend
    npm start
```
## Usage
1. Sign up or log in to access the chat.
2. Upload your profile picture and start messaging in real-time.
3. Enjoy seamless and interactive chat experiences!
        
## Contributing
Contributions are welcome! Please fork the repository and submit pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
