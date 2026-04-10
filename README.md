# Klickra Platform

Klickra is a premium, AI-powered digital services marketplace designed to help businesses scale in the AI era.

## Features
- **AI-Powered Services**: SEO, SXO, AEO, GEO, AIO, and more.
- **3D Immersive UI**: Built with Three.js and GSAP for a world-class user experience.
- **AI Audit Tool**: Instant website analysis using simulated PageSpeed metrics.
- **Multi-Step Contact Form**: Smart inquiry system with auto-response simulation.
- **Razorpay Integration**: Secure, instant checkout for all service packages via Razorpay.me.
- **Client Dashboard**: Manage projects, invoices, and audit reports.
- **SEO Optimized**: Complete schema markup, meta tags, and technical SEO.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Animations**: Three.js, GSAP, Framer Motion
- **Backend**: Firebase (Auth, Firestore)
- **APIs**: Razorpay, Google Fonts

## Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up Firebase:
   - Create a Firebase project.
   - Enable Authentication (Google Provider).
   - Create a Firestore database.
   - Add your Firebase config to `src/firebase.ts`.
4. Run development server: `npm run dev`
5. Build for production: `npm run build`

## API Configuration
- **Razorpay**: Payments are handled via the secure Razorpay.me link.
- **Firebase**: Ensure `firebase-applet-config.json` is correctly populated.

## Deployment
The platform is optimized for deployment on Cloud Run or any modern static hosting provider.

---
Powered by Klickra AI
