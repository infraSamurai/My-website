# 🔧 Environment Variables Setup Guide

## 📋 Overview

Your school website needs environment variables for:
- 📧 **Email functionality** (Gmail integration)
- 🗄️ **Database connection** (Vercel Postgres)
- 🌐 **Site configuration** (URLs and settings)

## 🏠 Local Development Setup

### Step 1: Create Local Environment File

1. **Copy the example file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local` with your values:**
   ```bash
   nano .env.local
   # or use any text editor
   ```

### Step 2: Gmail App Password Setup

**For EMAIL_USER and EMAIL_PASS:**

1. **Enable 2-Factor Authentication** on your Gmail:
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Security → 2-Step Verification
   - Follow the setup process

2. **Generate App Password:**
   - In Google Account → Security → 2-Step Verification
   - Scroll down to "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Enter "School Website"
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

3. **Update your `.env.local`:**
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop
   ```

### Step 3: Test Local Setup

```bash
npm run dev
```

Visit `http://localhost:3000` and test the contact form.

## 🚀 Vercel Production Setup

### Step 1: Set Environment Variables in Vercel

**In your Vercel project dashboard:**

1. **Go to Settings → Environment Variables**
2. **Add these variables for ALL environments** (Production, Preview, Development):

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```

### Step 2: Add Vercel Postgres Database

1. **In Vercel Dashboard → Storage → Create Database**
2. **Select "Postgres"**
3. **Choose "Hobby" (Free Plan)**

**Vercel automatically adds these variables:**
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NO_SSL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### Step 3: Update Site URL

**After deployment, update:**
```
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.vercel.app
```

## 🔒 Security Best Practices

### Environment File Security

1. **NEVER commit these files to git:**
   ```gitignore
   .env.local
   .env.production
   .env
   ```

2. **Use different values for different environments:**
   - Development: Test Gmail account
   - Production: Official school Gmail

3. **Rotate passwords regularly:**
   - Generate new Gmail app passwords quarterly
   - Update in both local and Vercel environments

### Gmail Security

1. **Use dedicated Gmail account** for the school website
2. **Enable 2FA** on the account
3. **Use App Passwords** (never regular Gmail password)
4. **Monitor Gmail activity** regularly

## 🛠️ Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_USER` | Gmail address for sending emails | `school@gmail.com` |
| `EMAIL_PASS` | Gmail app password (16 chars) | `abcd efgh ijkl mnop` |
| `NEXT_PUBLIC_SITE_URL` | Your website URL | `https://school.vercel.app` |

### Auto-Generated (Vercel Postgres)

| Variable | Description |
|----------|-------------|
| `POSTGRES_URL` | Full database connection string |
| `POSTGRES_PRISMA_URL` | Prisma-optimized connection string |
| `POSTGRES_USER` | Database username |
| `POSTGRES_HOST` | Database host |
| `POSTGRES_PASSWORD` | Database password |
| `POSTGRES_DATABASE` | Database name |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `DEBUG` | Enable debug logging | `false` |
| `LOG_LEVEL` | Logging level | `info` |

## 🚨 Troubleshooting

### Email Not Working?

1. **Check Gmail App Password:**
   - Ensure 2FA is enabled
   - Generate new app password
   - Use exact 16-character format

2. **Verify Environment Variables:**
   - Check spelling and spaces
   - Ensure variables are set in Vercel
   - Redeploy after changing variables

3. **Test Gmail Connection:**
   ```javascript
   // In browser console on your site
   fetch('/api/send-contact-email', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       name: 'Test',
       email: 'test@example.com',
       message: 'Test message'
     })
   })
   ```

### Database Connection Issues?

1. **Verify Postgres is connected in Vercel**
2. **Check if database was initialized:**
   ```
   https://your-site.vercel.app/api/init-db
   ```
3. **Review Vercel function logs**

### Build/Deployment Errors?

1. **Check all required variables are set**
2. **Verify no typos in variable names**
3. **Ensure .env.local is not committed to git**
4. **Review Vercel deployment logs**

## ✅ Verification Checklist

### Local Development
- [ ] `.env.local` created and configured
- [ ] Gmail app password generated
- [ ] Contact form sends emails locally
- [ ] Database connection working

### Vercel Production
- [ ] Environment variables set in Vercel dashboard
- [ ] Vercel Postgres database connected
- [ ] Site URL updated after deployment
- [ ] All forms working in production
- [ ] Email notifications received

## 📞 Support

**If you need help:**
1. Check Vercel function logs for errors
2. Verify Gmail account settings
3. Test each environment variable individually
4. Contact Vercel support if database issues persist

---

**🎯 Result:** Secure, working environment setup for your school website with professional email notifications and reliable database connectivity!