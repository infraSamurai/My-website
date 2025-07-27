# 🔧 EXACT Vercel Environment Variables

## 📋 Copy These EXACT Values to Vercel Dashboard

**Go to: Vercel Project → Settings → Environment Variables**

**Add these for ALL environments (Production, Preview, Development):**

```
EMAIL_USER=devansh.prakhar@gmail.com
EMAIL_PASS=nnvgucdgchkafrsv
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```

## 🚨 IMPORTANT NOTES:

### 1. Your Gmail is Already Configured ✅
- **Email**: `devansh.prakhar@gmail.com`
- **App Password**: `nnvgucdgchkafrsv`
- **Status**: Ready to use (from your backend/.env)

### 2. Update Site URL After Deployment
**Before deployment:**
```
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```

**After deployment (replace with actual URL):**
```
NEXT_PUBLIC_SITE_URL=https://akshararambh-school.vercel.app
```

### 3. Database Variables (Auto-Generated)
**Vercel will automatically add these when you connect Postgres:**
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` 
- `POSTGRES_URL_NO_SSL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## 🎯 Step-by-Step Vercel Setup:

### Step 1: Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. **Set Root Directory**: `frontend`
4. Deploy

### Step 2: Add Environment Variables
1. Go to Settings → Environment Variables
2. Add the 3 variables above for ALL environments
3. Click "Save"

### Step 3: Add Database
1. Go to Storage → Create Database
2. Select "Postgres" 
3. Choose "Hobby" (Free)
4. Vercel auto-adds database variables

### Step 4: Initialize Database
1. Redeploy your project (to pick up new env vars)
2. Visit: `https://your-site.vercel.app/api/init-db`
3. In browser console: 
   ```javascript
   fetch('/api/init-db', { method: 'POST' })
   ```

## ✅ Verification Checklist:

- [ ] Environment variables added to Vercel
- [ ] Vercel Postgres database connected
- [ ] Database initialized successfully
- [ ] Email test from contact form works
- [ ] Site URL updated after deployment

## 🚨 Security Notes:

1. **Gmail App Password**: `nnvgucdgchkafrsv` is secure (16-char app password)
2. **Never commit .env.local** to Git (already in .gitignore)
3. **Rotate passwords** every 6 months for security
4. **Monitor Gmail activity** for any suspicious usage

---

**🎉 Result**: Your school website will have the SAME email functionality as your current Render backend, but faster and completely free on Vercel!