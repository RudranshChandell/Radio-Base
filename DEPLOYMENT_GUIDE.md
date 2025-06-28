# RadioBase Deployment Guide

This guide will help you deploy RadioBase to production with the frontend on Vercel and backend on your preferred platform.

## Prerequisites

- Google OAuth2 credentials configured
- N2YO API key
- PostgreSQL database (for production)
- Vercel account (for frontend)
- Backend hosting platform (Render, Railway, Heroku, etc.)

## Frontend Deployment (Vercel)

### 1. Prepare Frontend for Vercel

The frontend is already configured for Vercel deployment with:
- `vercel.json` configuration
- Environment variables setup
- Next.js optimization

### 2. Deploy to Vercel

1. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set the root directory to `radiobase`

2. **Configure Environment Variables in Vercel:**
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
   NEXT_PUBLIC_LOGIN_URL=https://your-backend-url.com/oauth2/authorization/google
   NEXT_PUBLIC_REGISTER_URL=https://your-backend-url.com/oauth2/authorization/google
   ```

3. **Deploy:**
   - Vercel will automatically build and deploy your app
   - Your frontend will be available at `https://your-app.vercel.app`

## Backend Deployment

### Option 1: Render (Recommended)

1. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository

2. **Configure the service:**
   - **Name:** `radiobase-backend`
   - **Environment:** Docker
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `Backend`
   - **Build Command:** (leave empty, uses Dockerfile)
   - **Start Command:** (leave empty, uses Dockerfile)

3. **Environment Variables:**
   ```
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   N2YO_API_KEY=your-n2yo-api-key
   DB_URL=your-postgres-connection-string
   DB_USERNAME=your-db-username
   DB_PASSWORD=your-db-password
   ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000
   PORT=8080
   ```

4. **Database Setup:**
   - Create a PostgreSQL database in Render
   - Use the connection details in your environment variables

### Option 2: Railway

1. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Deploy from GitHub
   - Select your repository

2. **Configure Environment Variables** (same as Render)

3. **Add PostgreSQL Plugin:**
   - Add PostgreSQL from Railway's plugin marketplace
   - Railway will automatically set `DATABASE_URL`

### Option 3: Heroku

1. **Create Heroku App:**
   ```bash
   heroku create your-app-name
   ```

2. **Add PostgreSQL:**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set GOOGLE_CLIENT_ID=your-google-client-id
   heroku config:set GOOGLE_CLIENT_SECRET=your-google-client-secret
   heroku config:set N2YO_API_KEY=your-n2yo-api-key
   heroku config:set ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

## Environment Variables Reference

### Frontend (Vercel)
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `https://your-backend.onrender.com` |
| `NEXT_PUBLIC_LOGIN_URL` | OAuth login URL | `https://your-backend.onrender.com/oauth2/authorization/google` |
| `NEXT_PUBLIC_REGISTER_URL` | OAuth register URL | `https://your-backend.onrender.com/oauth2/authorization/google` |

### Backend
| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `123456789-abc123.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | `GOCSPX-abc123def456` |
| `N2YO_API_KEY` | N2YO API Key | `ABC123-DEF456-GHI789` |
| `DB_URL` | PostgreSQL Connection String | `postgresql://user:pass@host:5432/db` |
| `DB_USERNAME` | Database Username | `postgres` |
| `DB_PASSWORD` | Database Password | `secure_password` |
| `ALLOWED_ORIGINS` | CORS Allowed Origins | `https://your-app.vercel.app,http://localhost:3000` |
| `PORT` | Server Port | `8080` |

## Post-Deployment Checklist

### Frontend
- [ ] Environment variables configured in Vercel
- [ ] App builds successfully
- [ ] OAuth login works
- [ ] API calls to backend work
- [ ] Location services work

### Backend
- [ ] Environment variables configured
- [ ] Database connection established
- [ ] Health check endpoint responds (`/actuator/health`)
- [ ] OAuth endpoints accessible
- [ ] API endpoints working
- [ ] CORS configured correctly

### Integration
- [ ] Frontend can communicate with backend
- [ ] OAuth flow works end-to-end
- [ ] Satellite data loads correctly
- [ ] Location services work in production

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure `ALLOWED_ORIGINS` includes your frontend URL
   - Check that the backend URL is correct in frontend environment variables

2. **Database Connection:**
   - Verify database credentials
   - Check if database is accessible from your backend hosting

3. **OAuth Issues:**
   - Ensure Google OAuth credentials are correct
   - Add your backend URL to authorized redirect URIs in Google Console

4. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Health Checks

- Frontend: Visit your Vercel URL
- Backend: Visit `https://your-backend-url.com/actuator/health`

## Security Notes

- Never commit sensitive environment variables to version control
- Use environment variables for all sensitive configuration
- Enable HTTPS in production
- Regularly rotate API keys and secrets
- Monitor application logs for security issues 