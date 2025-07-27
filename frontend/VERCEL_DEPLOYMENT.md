# 🚀 Complete Vercel Deployment Guide

## Prerequisites
- Vercel account (free tier works)
- Gmail account for email functionality
- GitHub account for code hosting

## Step 1: Install Dependencies

```bash
cd frontend
npm install
```

## Step 2: Set Up Vercel Project

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Convert backend to Vercel serverless functions"
   git push origin main
   ```

2. **Create Vercel Project**:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as the root directory

## Step 3: Configure Environment Variables

In your Vercel dashboard, go to Settings → Environment Variables and add:

### Required Variables:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

### Gmail App Password Setup:
1. Enable 2FA on your Gmail account
2. Go to Google Account settings
3. Security → 2-Step Verification → App passwords
4. Generate a 16-character app password
5. Use this password (not your regular Gmail password)

## Step 4: Set Up Vercel Postgres

1. **Add Postgres Integration**:
   - In Vercel dashboard, go to Storage tab
   - Click "Create Database"
   - Select "Postgres"
   - Choose your plan (Hobby is free)

2. **Automatic Environment Variables**:
   Vercel will automatically add these variables:
   ```
   POSTGRES_URL
   POSTGRES_PRISMA_URL
   POSTGRES_URL_NO_SSL
   POSTGRES_URL_NON_POOLING
   POSTGRES_USER
   POSTGRES_HOST
   POSTGRES_PASSWORD
   POSTGRES_DATABASE
   ```

## Step 5: Initialize Database

After deployment, initialize your database by visiting:
```
https://your-project.vercel.app/api/init-db
```

Make a POST request to this endpoint (you can use browser dev tools):
```javascript
fetch('/api/init-db', { method: 'POST' })
  .then(res => res.json())
  .then(console.log);
```

## Step 6: Deploy

1. **Automatic Deployment**:
   - Vercel automatically deploys when you push to main branch
   - Check the deployments tab for status

2. **Manual Deployment** (if needed):
   ```bash
   npm run build  # Test locally first
   vercel --prod   # Deploy to production
   ```

## Step 7: Verify Functionality

Test all endpoints:

### Forms:
- ✅ Admission form: `/` (hero section)
- ✅ Visit request: `/` (CTA section)  
- ✅ Contact form: `/` (contact section)
- ✅ Article submission: `/` (contact section)

### Admin Features:
- ✅ View submissions: `/admin/submissions`
- ✅ Manage articles: `/admin/articles`
- ✅ Article approval/rejection workflow

### API Endpoints:
- ✅ `POST /api/admissions`
- ✅ `POST /api/send-admission-email`
- ✅ `POST /api/send-visit-email`
- ✅ `POST /api/send-contact-email`
- ✅ `POST /api/send-article-submission`
- ✅ `GET /api/admin/submissions/pending`
- ✅ `GET /api/admin/articles`
- ✅ `GET /api/admin/articles/featured`

## Step 8: Domain Setup (Optional)

1. **Custom Domain**:
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

2. **Update Environment Variable**:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

## Troubleshooting

### Common Issues:

1. **Email Not Sending**:
   - Verify Gmail app password is correct
   - Check EMAIL_USER and EMAIL_PASS variables
   - Ensure Gmail account has 2FA enabled

2. **Database Connection Error**:
   - Verify Vercel Postgres is properly connected
   - Check if database initialization completed
   - Review Vercel function logs

3. **Build Errors**:
   - Check TypeScript compilation: `npm run build`
   - Verify all imports are correct
   - Review Vercel deployment logs

4. **API Routes Not Working**:
   - Ensure environment variables are set
   - Check function timeout settings
   - Review serverless function logs

### Performance Optimization:

1. **Edge Functions** (for faster response):
   ```typescript
   export const runtime = 'edge';
   ```

2. **Database Connection Pooling**:
   - Use `POSTGRES_PRISMA_URL` for better connection handling
   - Implement connection retry logic

3. **Caching Strategy**:
   ```typescript
   export const revalidate = 3600; // Cache for 1 hour
   ```

## Migration from Current Setup

If migrating from existing Render backend:

1. **Export Data**: Backup your current PostgreSQL data
2. **Import to Vercel**: Use database migration tools
3. **Update DNS**: Point domain to Vercel
4. **Monitor**: Check all functionality works
5. **Cleanup**: Remove old Render services

## Monitoring & Maintenance

1. **Vercel Analytics**: Monitor performance and usage
2. **Error Tracking**: Set up error monitoring
3. **Database Backups**: Regular automated backups
4. **Security Updates**: Keep dependencies updated

## Cost Estimate

**Free Tier Limits**:
- ✅ 100GB bandwidth/month
- ✅ 1M serverless function invocations
- ✅ 60 hours database compute time
- ✅ Unlimited static deployments

**Estimated Monthly Usage** (small school):
- Bandwidth: ~10GB
- Functions: ~50K invocations  
- Database: ~20 hours compute
- **Result**: Completely within free limits

## Success Checklist

- [ ] Repository deployed to Vercel
- [ ] Environment variables configured
- [ ] Database created and initialized
- [ ] Email functionality tested
- [ ] All forms working
- [ ] Admin panel accessible
- [ ] Custom domain configured (optional)
- [ ] Performance verified (95+ Lighthouse score)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review function logs in dashboard
3. Test API endpoints individually
4. Verify environment variables
5. Contact Vercel support if needed

Your school website is now fully hosted on Vercel with 99.9% uptime and global CDN performance! 🎉