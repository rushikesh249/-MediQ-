# MediQ - Healthcare Assistance Platform

MediQ is a comprehensive healthcare assistance platform that leverages artificial intelligence to analyze medical reports and provide accessible insights to patients and healthcare professionals.

## 🚀 Features

- **AI-Powered Medical Analysis**: Upload medical reports (images/PDFs) for AI-powered analysis
- **Multi-role Interface**: Separate dashboards for patients and doctors
- **OCR Technology**: Extracts text from medical documents for analysis
- **Specialist Recommendations**: AI suggests appropriate specialists based on report findings
- **Urgency Assessment**: Evaluates and categorizes the urgency level of medical conditions
- **Personalized Recommendations**: Provides diet plans and follow-up questions
- **Secure Authentication**: JWT-based authentication system

## 🛠️ Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Vite** - Fast build tool
- **Material UI (MUI)** - Component library for React
- **React Router** - Declarative routing for React
- **Axios** - Promise-based HTTP client

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework
- **TypeScript** - Typed superset of JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling (ODM) library
- **Ollama** - Local LLM runner with llama3.2 model
- **Tesseract.js** - OCR library
- **Multer** - Middleware for handling multipart/form-data

## 📁 Project Structure

```
MediQ/
├── backend/                 # Backend server code
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # API controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic services
│   │   └── server.ts        # Main server file
│   ├── package.json
│   └── tsconfig.json
├── health-assist-frontend/  # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API and business logic
│   │   └── styles/          # Styling files
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Ollama installed locally (for AI features)
- Git

### Installation

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd MediQ/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mediq
JWT_SECRET=your_jwt_secret_key
```

4. Build the TypeScript code:
```bash
npm run build
```

5. Start the server:
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd MediQ/health-assist-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires authentication)

### AI Services
- `POST /api/ai/analyze` - Analyze medical report (requires file upload, requires authentication)

## 🤖 AI Features

MediQ uses Ollama with the llama3.2 model to:
- Simplify complex medical terminology
- Recommend appropriate specialists
- Assess urgency levels
- Provide dietary recommendations
- Generate follow-up questions

## 📊 Components Overview

### Frontend Pages
- **Login/Signup** - User authentication
- **Patient Portal** - Patient dashboard and history
- **Doctor Dashboard** - Medical professional interface
- **Report Upload** - Upload and analyze medical reports
- **Report View** - Detailed view of analyzed reports

### Key Components
- **HealthMeter** - Visual health indicators
- **ParameterTable** - Display medical parameters
- **UrgencyBadge** - Visual urgency indicators
- **HospitalMap** - Map integration for nearby hospitals
- **KanbanBoard** - Doctor's patient management
- **RealTimeAlerts** - Critical patient notifications

## 🌐 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 💬 Support

For support, please open an issue in the repository.

---

Made with ❤️ for better healthcare accessibility