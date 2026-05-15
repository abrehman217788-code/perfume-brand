# AB Rehman's Portfolio Website

Professional portfolio website showcasing 4 amazing projects with modern design, smooth animations, and fully functional contact system.

## Features

✨ **Modern Design**
- Gradient backgrounds and smooth animations
- Fully responsive (mobile, tablet, desktop)
- Professional color scheme
- Smooth scroll navigation

📱 **Project Showcase**
- 4 featured projects with descriptions
- Technology tags
- Direct links to live demos
- Beautiful card-based layout

📊 **Statistics Section**
- Display key achievements
- Projects completed, experience, and more

📧 **Contact System**
- Multiple contact methods
- Functional contact form with email integration
- Phone and email links
- Location information

## Project Structure

```
portfolio-website/
├── index.html       (Main HTML file)
├── styles.css       (Responsive styling)
├── script.js        (Interactivity & form handling)
└── README.md        (This file)
```

## Contact Information

- **Email:** ab.rehman217788@gmail.com
- **Phone:** +923331940971
- **Location:** Pakistan

## Featured Projects

1. **Clothing Brand Website** - E-commerce platform with shopping cart
2. **Lumina Cafe** - Restaurant website with reservations
3. **Tech Company Website** - Corporate site with services & portfolio
4. **CV Generator** - Interactive resume builder

---

## 🚀 **Deployment Guide**

### Option 1: Netlify (Easiest - 5 minutes)

1. Visit https://netlify.com
2. Sign up with Google or GitHub
3. Drag & drop this folder into Netlify
4. Get a live URL instantly (e.g., myportfolio.netlify.app)
5. **Optional:** Add custom domain in Site Settings

**Advantages:**
- ✅ Free hosting
- ✅ Free SSL certificate
- ✅ Automatic deployments from GitHub
- ✅ Easy custom domain setup

---

### Option 2: Vercel (GitHub Integrated)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import this project
4. Click "Deploy"
5. Instant live URL

**Setup:**
```bash
# If using GitHub
1. Push folder to GitHub
2. Connect to Vercel
3. Auto-deploys on every push
```

---

### Option 3: GitHub Pages (Free)

1. Create GitHub account (https://github.com)
2. Create repo named: `yourusername.github.io`
3. Upload all files to this repo
4. Access at: `https://yourusername.github.io`

**Steps:**
```bash
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
```

---

### Option 4: Firebase Hosting

1. Go to https://firebase.google.com
2. Create new project
3. Install Firebase CLI: `npm install -g firebase-tools`
4. In project folder:
```bash
firebase login
firebase init hosting
firebase deploy
```

---

### Option 5: Traditional Web Hosting

Use providers like:
- **Hostinger** (https://hostinger.com) - $2.99/month
- **Bluehost** (https://bluehost.com) - $2.95/month
- **GoDaddy** (https://godaddy.com) - $3.95/month

**Setup:**
1. Buy hosting + domain
2. Upload files via FTP (FileZilla)
3. Point domain to hosting
4. Live!

---

## 🔧 **Setting Up Contact Form**

### Current Setup (Email Client)
Contact form opens your default email client with pre-filled message.

### Advanced Setup (EmailJS - FREE)

For direct email without opening client:

1. Go to https://emailjs.com (FREE tier available)
2. Sign up with Gmail
3. Create email service (connect your Gmail)
4. Get your **Public Key**
5. Update in `script.js`:
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY_HERE');
   ```

**EmailJS Free Tier:**
- ✅ 200 emails/month
- ✅ No backend required
- ✅ Direct API integration

---

## ✅ **Pre-Deployment Checklist**

- [x] Website is responsive (tested on mobile)
- [x] All project links work
- [x] Contact form is functional
- [x] Images load properly
- [x] Navigation is smooth
- [x] No console errors

---

## 📲 **After Deployment**

1. **Test everything:**
   - Click all links
   - Test contact form
   - Check on mobile devices

2. **Share on social media:**
   - LinkedIn
   - Facebook
   - Twitter
   - GitHub

3. **Optional enhancements:**
   - Add Google Analytics
   - Add testimonials section
   - Add blog section
   - Add dark mode toggle
   - Add more projects

---

## 🎨 **Customization**

### Change Colors
Edit `:root` in `styles.css`:
```css
:root {
    --primary-color: #667eea;      /* Change this */
    --secondary-color: #764ba2;    /* And this */
}
```

### Update Project Links
In `index.html`, update project links:
```html
<a href="YOUR_PROJECT_URL" class="project-link" target="_blank">View Project →</a>
```

### Update Contact Info
Find and replace:
- `ab.rehman217788@gmail.com` → Your email
- `+923331940971` → Your phone
- `Pakistan` → Your location

---

## 📚 **Resources**

- **Netlify Docs:** https://docs.netlify.com
- **Vercel Docs:** https://vercel.com/docs
- **GitHub Pages:** https://pages.github.com
- **Firebase Docs:** https://firebase.google.com/docs/hosting
- **EmailJS:** https://emailjs.com/docs

---

## 💡 **Tips**

- Keep portfolio updated with latest projects
- Use high-quality project descriptions
- Add project live links when available
- Update skills as you learn new technologies
- Consider adding a blog section
- Add testimonials from clients

---

**Created:** May 12, 2026  
**Version:** 1.0  
**Status:** Ready for Deployment

Questions? Contact: ab.rehman217788@gmail.com | +923331940971

