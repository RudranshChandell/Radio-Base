# RadioBase Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables Required

#### Backend Environment Variables (Set in Render Dashboard)
- [ ] `OPENAI_API_KEY` - Your OpenAI API key
- [ ] `GOOGLE_CLIENT_ID` - Google OAuth client ID
- [ ] `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- [ ] `N2YO_API_KEY` - N2YO API key (optional)

#### Frontend Environment Variables (Set in Render Dashboard)
- [ ] `NEXT_PUBLIC_API_BASE_URL` - Backend service URL
- [ ] `NEXT_PUBLIC_LOGIN_URL` - OAuth login URL
- [ ] `NEXT_PUBLIC_REGISTER_URL` - OAuth register URL

### 2. Google OAuth Setup

1. **Create Google OAuth Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Set application type to "Web application"

2. **Configure Authorized Redirect URIs**:
   - Add: `https://radiobase-backend.onrender.com/login/oauth2/code/google`
   - Add: `http://localhost:8080/login/oauth2/code/google` (for local development)

3. **Copy Credentials**:
   - Copy Client ID and Client Secret
   - Add to Render environment variables

### 3. OpenAI API Setup

1. **Get OpenAI API Key**:
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Create account or sign in
   - Go to "API Keys" section
   - Create new API key
   - Copy and add to Render environment variables

### 4. N2YO API Setup (Optional)

1. **Get N2YO API Key**:
   - Go to [N2YO API](https://www.n2yo.com/api/)
   - Register for free API key
   - Copy and add to Render environment variables

## Deployment Steps

### Option 1: Blueprint Deploy (Recommended)

1. **Fork Repository**:
   - [ ] Fork this repository to your GitHub account

2. **Connect to Render**:
   - [ ] Go to [render.com](https://render.com)
   - [ ] Sign up/Login with GitHub
   - [ ] Click "New +" → "Blueprint"
   - [ ] Connect GitHub account
   - [ ] Select forked repository

3. **Configure Services**:
   - [ ] Review service names and configurations
   - [ ] Set environment variables
   - [ ] Click "Apply" to deploy

### Option 2: Manual Deploy

#### Backend Service
1. **Create Web Service**:
   - [ ] Go to Render Dashboard
   - [ ] Click "New +" → "Web Service"
   - [ ] Connect GitHub repository
   - [ ] Configure:
     - Name: `radiobase-backend`
     - Environment: `Docker`
     - Region: `Oregon` (or preferred)
     - Branch: `main`
     - Root Directory: `Backend`
     - Build Command: (leave empty)
     - Start Command: (leave empty)

2. **Set Environment Variables**:
   - [ ] Add all required backend environment variables
   - [ ] Save and deploy

#### Frontend Service
1. **Create Web Service**:
   - [ ] Go to Render Dashboard
   - [ ] Click "New +" → "Web Service"
   - [ ] Connect same GitHub repository
   - [ ] Configure:
     - Name: `radiobase`
     - Environment: `Node`
     - Region: `Oregon` (or preferred)
     - Branch: `main`
     - Root Directory: `radiobase`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`

2. **Set Environment Variables**:
   - [ ] Add all required frontend environment variables
   - [ ] Save and deploy

#### Database
1. **Create PostgreSQL Database**:
   - [ ] Go to Render Dashboard
   - [ ] Click "New +" → "PostgreSQL"
   - [ ] Configure:
     - Name: `radiobase-db`
     - Region: `Oregon` (or preferred)
     - Plan: `Free`

## Post-Deployment Verification

### 1. Health Checks
- [ ] Backend health check: `https://radiobase-backend.onrender.com/actuator/health`
- [ ] Frontend loads: `https://radiobase.onrender.com`

### 2. OAuth Flow
- [ ] Click "Login" button on frontend
- [ ] Verify Google OAuth redirect works
- [ ] Check successful authentication
- [ ] Verify redirect to dashboard

### 3. API Endpoints
- [ ] Test location API: `POST /api/location`
- [ ] Verify satellite data retrieval
- [ ] Check CORS headers

### 4. Database Connection
- [ ] Verify database connection in backend logs
- [ ] Check user data persistence after OAuth login

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - [ ] Check build logs in Render dashboard
   - [ ] Verify Java 17 and Node.js 18 compatibility
   - [ ] Check Maven and npm dependencies

2. **Environment Variables**:
   - [ ] Verify all required variables are set
   - [ ] Check variable names match exactly
   - [ ] Ensure no extra spaces or quotes

3. **CORS Errors**:
   - [ ] Check browser console for CORS errors
   - [ ] Verify `ALLOWED_ORIGINS` includes frontend URL
   - [ ] Check `NEXT_PUBLIC_API_BASE_URL` is correct

4. **OAuth Issues**:
   - [ ] Verify Google OAuth credentials
   - [ ] Check redirect URIs in Google Console
   - [ ] Ensure HTTPS URLs for production

5. **Database Issues**:
   - [ ] Check database connection string
   - [ ] Verify database is running
   - [ ] Check user permissions

### Debug Steps

1. **Check Logs**:
   - [ ] Review backend logs in Render dashboard
   - [ ] Check frontend build logs
   - [ ] Monitor database connection logs

2. **Test Endpoints**:
   - [ ] Use curl or Postman to test API endpoints
   - [ ] Verify health check endpoint
   - [ ] Test OAuth flow manually

3. **Environment Verification**:
   - [ ] Check environment variables in Render dashboard
   - [ ] Verify URLs are correct
   - [ ] Test API keys separately

## Security Checklist

- [ ] All sensitive data in environment variables
- [ ] CORS properly configured
- [ ] OAuth redirect URIs secured
- [ ] Database credentials protected
- [ ] API keys not exposed in code
- [ ] HTTPS enabled for production
- [ ] Health checks implemented
- [ ] Non-root Docker user configured

## Performance Optimization

- [ ] Enable caching where appropriate
- [ ] Optimize database queries
- [ ] Use CDN for static assets
- [ ] Monitor resource usage
- [ ] Set up logging and monitoring

## Maintenance

- [ ] Set up automatic backups
- [ ] Monitor application health
- [ ] Update dependencies regularly
- [ ] Review security settings
- [ ] Monitor API usage and costs 