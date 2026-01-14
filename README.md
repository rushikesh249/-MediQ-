<!-- PROJECT SHIELDS -->
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green?style=flat&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb)](https://www.mongodb.com)
[![License](https://img.shields.io/github/license/rushikesh249/-MediQ-?color=blue)](LICENSE)

<br />

<div align="center">
  <a href="https://github.com/rushikesh249/-MediQ-">
    <img src="https://placehold.co/120x120?text=MEDIQ" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">MediQ - Healthcare Assistance Platform</h3>

  <p align="center">
    AI-powered medical report analysis platform connecting patients with healthcare insights
    <br />
    <a href="https://github.com/rushikesh249/-MediQ-/issues">Report Bug</a>
    ·
    <a href="https://github.com/rushikesh249/-MediQ-/issues">Request Feature</a>
  </p>
</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Reference](#api-reference)
- [AI/OCR Pipeline](#aiocr-pipeline)
- [Security & Privacy](#security--privacy)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

MediQ is a comprehensive healthcare assistance platform that bridges the gap between complex medical reports and patient understanding through artificial intelligence. Built with modern web technologies, MediQ enables patients and healthcare professionals to analyze medical documents, receive simplified explanations, and get actionable healthcare insights.

**⚠️ Medical Disclaimer**: MediQ is an educational and assistance tool designed to enhance healthcare accessibility. It does not provide medical diagnoses. Always consult qualified healthcare professionals for medical advice and treatment decisions.

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **AI-Powered Analysis** | Upload medical reports (images/PDFs) for intelligent analysis using LLM technology |
| **Multi-Role Interface** | Dedicated dashboards for patients and healthcare professionals |
| **Advanced OCR Integration** | Extract text from medical documents using Tesseract.js for accurate processing |
| **Smart Specialist Matching** | AI recommends appropriate medical specialists based on report findings |
| **Urgency Classification** | Automated assessment of medical condition urgency levels |
| **Personalized Recommendations** | Custom diet plans and follow-up questions tailored to individual cases |
| **Secure Authentication** | JWT-based authentication with role-based access control |
| **Real-time Processing** | Instant analysis results with visual health indicators |

## 🛠️ Tech Stack

### Frontend
```javascript
React 18 • TypeScript • Vite • Material UI • React Router • Axios
```

### Backend
```javascript
Node.js • Express • TypeScript • MongoDB • Mongoose • Ollama • Tesseract.js • Multer
```

### Infrastructure & DevOps
```javascript
Vercel (Frontend) • Railway/Render (Backend) • MongoDB Atlas • Docker (Planned)
```

## 🏗️ System Architecture

```mermaid
graph TB
    A[React Frontend] --> B[Express API Gateway]
    B --> C[MongoDB Database]
    B --> D[Ollama LLM Service]
    B --> E[Tesseract OCR Engine]
    B --> F[Multer File Handler]
    G[Medical Reports] --> A
    A --> H{User Roles}
    H --> I[Patient Dashboard]
    H --> J[Doctor Interface]
```

## 📁 Project Structure

```
MediQ/
├── backend/                          # Node.js/Express backend server
│   ├── src/
│   │   ├── config/                   # Database configuration
│   │   │   └── db.ts                 # MongoDB connection setup
│   │   ├── controllers/              # Request handlers
│   │   │   ├── aiController.ts       # AI analysis logic
│   │   │   └── authController.ts     # Authentication handlers
│   │   ├── models/                   # Database schemas
│   │   │   └── User.ts               # User model definition
│   │   ├── routes/                   # API route definitions
│   │   │   ├── aiRoutes.ts           # AI service endpoints
│   │   │   └── authRoutes.ts         # Auth service endpoints
│   │   ├── services/                 # Business logic
│   │   │   └── ocrService.ts         # OCR processing service
│   │   └── server.ts                 # Main application entry point
│   ├── uploads/                      # Temporary file storage
│   ├── package.json                  # Backend dependencies
│   └── tsconfig.json                 # TypeScript configuration
│
├── health-assist-frontend/           # React frontend application
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── common/               # Shared components
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   ├── HealthMeter.tsx
│   │   │   │   ├── ParameterTable.tsx
│   │   │   │   └── UrgencyBadge.tsx
│   │   │   ├── doctor/               # Doctor-specific components
│   │   │   │   ├── KanbanBoard.tsx
│   │   │   │   └── RealTimeAlerts.tsx
│   │   │   ├── layout/               # Layout components
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── map/                  # Mapping components
│   │   │   │   └── HospitalMap.tsx
│   │   │   ├── patient/              # Patient-specific components
│   │   │   │   └── EmergencyAlert.tsx
│   │   │   └── simulation/           # Simulation components
│   │   │       ├── FamilyDashboard.tsx
│   │   │       └── WhatsAppBot.tsx
│   │   ├── pages/                    # Application pages
│   │   │   ├── DoctorDashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── PatientHistory.tsx
│   │   │   ├── PatientPortal.tsx
│   │   │   ├── ReportUpload.tsx
│   │   │   ├── ReportView.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── WhatsAppChat.tsx
│   │   ├── services/                 # API clients and utilities
│   │   │   ├── aiService.ts          # AI analysis service
│   │   │   ├── api.ts                # HTTP client configuration
│   │   │   └── authService.ts        # Authentication service
│   │   ├── styles/                   # Styling files
│   │   │   ├── globals.css           # Global styles
│   │   │   └── theme.ts              # MUI theme configuration
│   │   ├── App.tsx                   # Main application component
│   │   └── main.tsx                  # React entry point
│   ├── public/                       # Static assets
│   ├── package.json                  # Frontend dependencies
│   └── vite.config.ts                # Vite build configuration
│
├── .gitignore                        # Git ignore rules
└── README.md                         # Project documentation
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Ollama installed locally for AI features
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd MediQ/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment configuration**

Create a `.env` file in the backend root directory with the following content:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mediq
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=development
```

4. **Build TypeScript**
```bash
npm run build
```

5. **Start development server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd MediQ/health-assist-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 🔧 API Reference

### Authentication Endpoints

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/api/auth/register` | POST | ❌ | Register new user account |
| `/api/auth/login` | POST | ❌ | Authenticate user credentials |
| `/api/auth/profile` | GET | ✅ | Retrieve authenticated user profile |

### AI Analysis Endpoints

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/api/ai/analyze` | POST | ✅ | Analyze medical report with AI |

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/ai/analyze \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "report=@medical_report.pdf"
```

## 🤖 AI/OCR Pipeline

### How It Works

1. **Document Upload** → User uploads medical report (PDF/Image)
2. **OCR Processing** → Tesseract.js extracts text from document
3. **LLM Analysis** → Ollama processes extracted text with llama3.2 model
4. **Intelligent Parsing** → AI generates structured medical insights
5. **Results Delivery** → Frontend displays analysis with recommendations

### Analysis Components

- **Medical Explanation**: Simplified interpretation of complex medical terminology
- **Specialist Recommendation**: Appropriate medical specialty suggestions
- **Urgency Assessment**: Condition severity classification (High/Medium/Low)
- **Dietary Guidance**: Personalized nutritional recommendations
- **Follow-up Questions**: Relevant questions for patient-doctor discussions

## 🔒 Security & Privacy

### Implemented Security Measures

- **JWT Authentication**: Secure token-based user authentication
- **Password Hashing**: bcrypt encryption for credential protection
- **Input Validation**: Comprehensive data sanitization and validation
- **CORS Protection**: Controlled cross-origin resource sharing
- **Rate Limiting**: API request throttling to prevent abuse
- **File Type Validation**: Restricted upload formats for security

### Data Privacy

- **No PHI Storage**: Protected Health Information is not permanently stored
- **Temporary Processing**: Files are deleted after analysis completion
- **Encrypted Transmission**: HTTPS/TLS for secure data transfer
- **Access Control**: Role-based permissions for data access

## 🌐 Environment Variables

### Backend Configuration (`.env`)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Connection
MONGO_URI=mongodb://localhost:27017/mediq
# For production: mongodb+srv://username:password@cluster.mongodb.net/mediq

# Security
JWT_SECRET=your_very_secure_secret_key_here
BCRYPT_SALT_ROUNDS=12

# Optional Features
OLLAMA_HOST=http://localhost:11434
UPLOAD_LIMIT=10MB
```

### Frontend Configuration (`.env`)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
# For production: https://your-backend-domain.com/api

# Feature Flags
VITE_ENABLE_DEBUG=true
VITE_MAX_FILE_SIZE=10MB
```

## 📸 Screenshots

> **Note**: Screenshots will be added once the application is fully developed and deployed.

### Dashboard Interface
![Dashboard](./screenshots/dashboard.png)
*Main user dashboard with health metrics and navigation*

### Report Upload
![Upload Page](./screenshots/upload.png)
*Medical report upload interface with drag-and-drop functionality*

### Analysis Results
![Analysis Output](./screenshots/analysis.png)
*AI-generated medical analysis with recommendations*

### Doctor Interface
![Doctor Dashboard](./screenshots/doctor-dashboard.png)
*Professional interface for healthcare providers*

## 🗺️ Roadmap

### Phase 1: Core Enhancements ✅
- [x] Multi-role authentication system
- [x] Basic medical report analysis
- [x] Patient and doctor dashboards

### Phase 2: Advanced Features 🚀
- [ ] Enhanced OCR accuracy for medical documents
- [ ] Role-based access control improvements
- [ ] Real-time notification system
- [ ] Mobile-responsive design enhancements

### Phase 3: Infrastructure & Scaling 🏗️
- [ ] Docker containerization for easy deployment
- [ ] CI/CD pipeline implementation
- [ ] Performance monitoring and logging
- [ ] Load balancing and horizontal scaling

### Phase 4: Intelligence & Analytics 📊
- [ ] Advanced ML model evaluation metrics
- [ ] Predictive health trend analysis
- [ ] Integration with electronic health records (EHR)
- [ ] Telemedicine consultation features

### Phase 5: Enterprise Features 🔒
- [ ] HIPAA compliance certification
- [ ] Multi-tenant architecture
- [ ] Advanced analytics dashboard
- [ ] API marketplace for third-party integrations

## 🤝 Contributing

Contributions are welcome! Here's how you can help improve MediQ:

### Getting Started

1. **Fork the repository on GitHub first**
   - Visit https://github.com/rushikesh249/-MediQ-
   - Click the "Fork" button in the top-right corner

2. **Clone your fork**
```bash
git clone https://github.com/YOUR_USERNAME/-MediQ-.git
cd MediQ
```

3. **Create feature branch**
```bash
git checkout -b feature/amazing-new-feature
```

4. **Make your changes**
```bash
# Follow the project structure and coding standards
# Write clean, well-documented code
```

5. **Commit your changes**
```bash
git commit -m "feat: add amazing new feature"
```

6. **Push to branch**
```bash
git push origin feature/amazing-new-feature
```

7. **Open Pull Request**

### Contribution Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting
- Write comprehensive tests for new features
- Update documentation as needed
- Adhere to commit message conventions

### Code Quality Standards

- Use ESLint with provided configuration
- Maintain 80%+ test coverage
- Document public APIs and complex logic
- Follow semantic versioning for releases

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

```
ISC License

Copyright (c) 2024, Rushikesh Patil

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

## 🙏 Acknowledgments

- **Ollama Team** for the excellent local LLM platform
- **Tesseract.js** for robust OCR capabilities
- **MongoDB Community** for the flexible database solution
- **Open Source Community** for invaluable libraries and tools

---

<p align="center">
  Made with ❤️ for better healthcare accessibility
  <br />
  <a href="https://github.com/rushikesh249/-MediQ-/stargazers">⭐ Star this project</a>
  ·
  <a href="https://github.com/rushikesh249/-MediQ-/fork">🍴 Fork this project</a>
  ·
  <a href="https://github.com/rushikesh249/-MediQ-/issues">🐛 Report Issues</a>
</p>