# Deployment Steps for Voting System on Render.com

## Prerequisites
- GitHub repository: https://github.com/ntarunkumar77-crypto/voting-system.git
- MongoDB Atlas connection string: mongodb+srv://ntarunkumar77_db_user:98QzqGznuZhC40Cp@cluster0.nvinpyc.mongodb.net/?appName=Cluster0

## Steps to Deploy

1. **Create a Render Account**
   - Go to https://render.com and sign up for a free account.

2. **Connect GitHub Repository**
   - In Render dashboard, click "New" > "Web Service".
   - Connect your GitHub account and select the repository: `ntarunkumar77-crypto/voting-system`.

3. **Configure the Service**
   - Name: voting-system (or any name you like)
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Production

4. **Set Environment Variables**
   - Add the following environment variable:
     - Key: `DATABASE_URL`
     - Value: `mongodb+srv://ntarunkumar77_db_user:98QzqGznuZhC40Cp@cluster0.nvinpyc.mongodb.net/?appName=Cluster0`

5. **Deploy**
   - Click "Create Web Service" to deploy.
   - Wait for the build and deployment to complete (may take a few minutes).

6. **Get Public URL**
   - Once deployed, Render will provide a public URL like `https://voting-system.onrender.com`.
   - Visit this URL to access your live voting system app.

## Notes
- Render offers a free tier with 750 hours per month.
- If the app goes to sleep due to inactivity, the first load may be slow.
- Ensure your MongoDB Atlas cluster allows connections from all IPs (0.0.0.0/0) in the network access settings.
