# Links: Link Sharing System

## Overview

A system where users can generate shareable links for content (text, images, or files) and set them as public or private. Public links can be accessed by anyone, while private links require authentication or a password for access.
integration

# Purpose

1. **Secure & Flexible Sharing:** Users can generate shareable links for text, images, or files with customizable access settings.

2. **Public & Private Access Control:** Public links are accessible to anyone, while private links require authentication or a password.

3. **Convenient & User-Friendly:** Provides an easy-to-use platform for managing and sharing content securely.

## Technologies used

1. React(TypeScript)

2. Express(JWT, CORS)

3. MongoDB

4. Nodejs

## Core features

1. Authentication using firebase.

2. Upload image and generate link.

3. Manage my images(update, delete).

## Dependencies

1. Firebase
2. Axios
3. TanStack Query
4. React Helmet
5. Sweet alert
6. Tailwind
7. DaisyUI

## Live links

1. Live link: [visit](https://link-sharing-system-client.web.app)

## Server Repo

1. [visit](https://github.com/sakib-333/link-sharing-system-server)

## How to in local machine

1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:sakib-333/link-sharing-system-client.git

   cd link-sharing-system-client
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env.local` file root of the folder and all of your secret keys.

   ```bash
   VITE_apiKey=<your-firebase-api-key>
   VITE_authDomain=<your-firebase-authDomain>
   projectId=<your-firebase-projectId>
   storageBucket=<your-firebase-storageBucket>
   messagingSenderId=<your-firebase-messagingSenderId>
   appId=<your-firebase-appId>
   VITE_BASE_URL=<your-server-base-url>
   VITE_IMGBB_API_KEY=<your-imgbb-api-key>
   ```

4. Start server

   ```bash
   npm run dev
   ```

5. Your server should now be running on `http://localhost:5173`.
