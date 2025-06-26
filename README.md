# RadioBase - Satellite Tracking Application

RadioBase is a modern web application that provides real-time satellite pass predictions and AI-powered explanations for amateur radio operators, space enthusiasts, and satellite trackers.

## 🚀 Features

- **Real-time Satellite Tracking**: Get live satellite pass predictions based on your location
- **AI-Powered Explanations**: Understand satellite data with AI assistance
- **Google OAuth Integration**: Secure authentication with Google accounts
- **Responsive Design**: Modern UI that works on all devices
- **Location-based Services**: Automatic location detection for accurate predictions

## 🏗️ Architecture

- **Frontend**: Next.js 15 with React 19, Tailwind CSS
- **Backend**: Spring Boot 3.2 with Java 17
- **Database**: PostgreSQL
- **Authentication**: OAuth2 with Google
- **AI Integration**: OpenAI API
- **Satellite Data**: N2YO API

## 🚀 Quick Deploy on Render

### Option 1: Blueprint Deploy (Recommended)

1. **Fork this repository** to your GitHub account
2. **Connect to Render**:
   - Go to [render.com](https://render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub account
   - Select this repository
3. **Configure Environment Variables**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `GOOGLE_CLIENT_ID`: Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
   - `N2YO_API_KEY`: N2YO API key (optional, for enhanced data)
4. **Deploy**: Click "Apply" and wait for deployment

### Option 2: Manual Deploy

#### Backend Service
1. Create a new **Web Service** on Render
2. **Connect** your GitHub repository
3. **Configure**:
   - **Name**: `radiobase-backend`
   - **Environment**: `Docker`
   - **Region**: `Oregon` (or your preferred region)
   - **Branch**: `main`
   - **Root Directory**: `Backend`
   - **Build Command**: Leave empty (uses Dockerfile)
   - **Start Command**: Leave empty (uses Dockerfile)

#### Frontend Service
1. Create another **Web Service** on Render
2. **Configure**:
   - **Name**: `radiobase`
   - **Environment**: `Node`
   - **Region**: `Oregon` (or your preferred region)
   - **Branch**: `main`
   - **Root Directory**: `radiobase`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

#### Database
1. Create a **PostgreSQL** database on Render
2. **Configure**:
   - **Name**: `radiobase-db`
   - **Region**: `Oregon` (or your preferred region)

## 🔧 Environment Variables

### Backend Environment Variables
```bash
# Required
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DB_URL=your_postgresql_connection_string
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

# Optional
N2YO_API_KEY=your_n2yo_api_key
BASE_URL=https://your-backend-url.onrender.com
ALLOWED_ORIGINS=https://your-frontend-url.onrender.com
```

### Frontend Environment Variables
```bash
# Required
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_LOGIN_URL=https://your-backend-url.onrender.com/oauth2/authorization/google
NEXT_PUBLIC_REGISTER_URL=https://your-backend-url.onrender.com/oauth2/authorization/google
```

## 🛠️ Local Development

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL
- Maven

### Backend Setup
```bash
cd Backend

# Create application.properties with your local settings
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Run the application
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd radiobase

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8080" > .env.local

# Run development server
npm run dev
```

## 📁 Project Structure

```
Radio-Base/
├── Backend/                 # Spring Boot API
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   ├── Dockerfile          # Docker configuration
│   └── pom.xml            # Maven dependencies
├── radiobase/              # Next.js frontend
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── stores/           # Zustand state management
│   └── package.json      # Node.js dependencies
└── render.yaml           # Render deployment configuration
```

## 🔐 Security Features

- **OAuth2 Authentication**: Secure Google login
- **CORS Configuration**: Proper cross-origin resource sharing
- **Environment Variables**: Sensitive data protection
- **Health Checks**: Application monitoring
- **Non-root Docker**: Security best practices

## 📊 API Endpoints

- `GET /actuator/health` - Health check
- `POST /api/location` - Submit location for satellite data
- `GET /oauth2/authorization/google` - Google OAuth login
- `GET /login/oauth2/code/google` - OAuth callback

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Ensure Java 17+ is installed
   - Check Maven dependencies in `pom.xml`
   - Verify Node.js 18+ for frontend

2. **Database Connection**:
   - Verify PostgreSQL is running
   - Check connection string format
   - Ensure database exists

3. **OAuth Issues**:
   - Verify Google OAuth credentials
   - Check redirect URIs in Google Console
   - Ensure HTTPS for production

4. **CORS Errors**:
   - Update `ALLOWED_ORIGINS` in backend
   - Check frontend API base URL

### Render-Specific Issues

1. **Service Not Starting**:
   - Check build logs in Render dashboard
   - Verify environment variables
   - Check health check endpoint

2. **Database Connection**:
   - Use Render's internal database URL
   - Check database status in dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team. 