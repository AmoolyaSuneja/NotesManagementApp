# 📝 Notes Manager App (MERN Stack)

A full-stack web application for managing personal notes built with the MERN stack (MongoDB, Express.js, React, Node.js).

## ✨ Features

### User Features
- 🔐 **User Authentication**: Secure registration and login with JWT
- 📝 **CRUD Operations**: Create, read, update, and delete notes
- 🎨 **Modern UI**: Clean and responsive design
- 📱 **Mobile Friendly**: Works seamlessly on all devices
- 🔒 **Protected Routes**: Secure access to user-specific notes

### Technical Features
- 🚀 **JWT Authentication**: Secure token-based authentication
- 🛡️ **Input Validation**: Server-side and client-side validation
- 📊 **Real-time Updates**: Instant UI updates after operations
- 🎯 **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd notes-manager-mern
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
npm run install-server

# Install frontend dependencies
npm run install-client
```

### 3. Environment Setup

#### Backend Environment
1. Copy the environment example file:
```bash
cp backend/.env.example backend/.env
```

2. Update `backend/.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

#### MongoDB Setup

**🚀 Quick Setup (Windows)**
1. Run the setup script:
   ```bash
   setup-mongodb.bat
   ```
   This will:
   - Create the `.env` file
   - Set up the data directory
   - Start MongoDB service
   - Verify the connection

**Option 1: Local MongoDB (Manual Setup)**
1. **Install MongoDB Community Server**
   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Install with default settings
   - MongoDB will be installed at: `C:\Program Files\MongoDB\Server\8.2\bin\`

2. **Create Data Directory**
   ```bash
   mkdir C:\data\db
   ```

3. **Start MongoDB**
   ```bash
   "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
   ```

4. **Verify Installation**
   ```bash
   check-mongodb.bat
   ```

**Option 2: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a new cluster
- Get your connection string and update `MONGODB_URI` in `.env`

**🔧 Troubleshooting MongoDB**
- Run `check-mongodb.bat` to diagnose issues
- Ensure MongoDB is running: `tasklist | findstr mongod`
- Check if port 27017 is available
- Run setup scripts as administrator if needed

### 4. Run the Application

#### Development Mode (Both frontend and backend)
```bash
npm run dev
```

#### Run Separately
```bash
# Backend only (port 5000)
npm run server

# Frontend only (port 3000)
npm run client
```

## 🌐 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Notes Routes (All protected)
- `GET /api/notes` - Get all notes for authenticated user
- `POST /api/notes` - Create new note
- `GET /api/notes/:id` - Get specific note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## 🚀 Deployment

### Frontend (Netlify)
1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to Netlify
3. Update API URLs in production

### Backend (Render/Heroku)
1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

## 📱 Usage

1. **Register/Login**: Create an account or sign in
2. **Create Notes**: Click "Add New Note" to create your first note
3. **View Notes**: All your notes are displayed in a grid layout
4. **Edit Notes**: Click the edit icon on any note
5. **Delete Notes**: Click the delete icon to remove a note
6. **Logout**: Use the logout button in the navigation

## 🔧 Project Structure

```
notes-manager-mern/
├── backend/
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   └── App.js       # Main App component
│   └── package.json
├── package.json         # Root package.json
└── README.md
```

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Input validation and sanitization
- Protected API routes
- CORS configuration
- Environment variable protection

## 🎨 UI/UX Features

- Modern and clean design
- Responsive layout
- Loading states
- Error handling
- Form validation
- Intuitive navigation
- Mobile-first approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Run `check-mongodb.bat` to diagnose the issue
   - Ensure MongoDB is running: `tasklist | findstr mongod`
   - Check your connection string in `.env`
   - Verify MongoDB is installed at: `C:\Program Files\MongoDB\Server\8.2\bin\`
   - Try running `setup-mongodb.bat` as administrator

2. **Port Already in Use**
   - Change the port in `backend/.env`
   - Kill existing processes on that port

3. **CORS Issues**
   - Ensure the frontend proxy is set correctly
   - Check CORS configuration in backend

4. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Note Taking! 📝✨**
