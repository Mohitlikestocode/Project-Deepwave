# 🌊 Project DeepWave — hack-enshmirtz HACKATHON PROJECT 🚀

> **Predicting Tsunamis 🌊 Made Easy — with an Interactive NASA Earth Globe**

---

## 🌐 What is DeepWave?

**DeepWave** is a web app designed to help researchers, disaster-response teams, and anyone concerned with **predicting tsunami risk at any coastal location**.

It combines:

- ✅ A **machine learning model** that predicts tsunami likelihood from coordinates  
- ✅ An **interactive 3D NASA Earth globe** so users can **visually choose precise locations** instead of manually searching for latitude and longitude  

Our mission:

> **"Making critical geolocation data entry accessible and intuitive — for those moments when precision can save lives."**

---

## 📸 Experience Our Website

👉 **Click the image below to watch our demo video!**  
*(Or use the live link just below it to test it yourself.)*

[![Watch the demo](https://github.com/user-attachments/assets/9e1c9ab7-6898-435c-9586-94dcd2d22803)](https://youtu.be/ak2QTYkNcWU)

---

## 🔗 Live Link

[https://project-deepwave.vercel.app/](https://project-deepwave.vercel.app/)

---

## 🌟 About the Site

DeepWave is built to **predict tsunami risk** using precise geographic coordinates.

Normally, teams have to manually look up and type latitude and longitude—slow and error-prone, especially during emergencies.

Our **Interactive Globe** changes that:

- ✅ Spin, zoom, and explore Earth in 3D  
- ✅ Click *exactly* where you want to analyze  
- ✅ Instantly see **precise WGS84 coordinates**  

These coordinates will be **fed into our tsunami prediction ML model** (integration planned), returning risk scores in real-time.

It's not just functional—it's *engaging*, helping users better understand coastal geography and plan proactively.

---

## 🌊 Special Notes for Hackathon Reviewers

⭐️ Our *Feature Friday* highlight is our **InteractiveGlobe** component:

- ✅ Lets users **click anywhere** on Earth to get **precise latitude and longitude**  
- ✅ Uses **NASA's 4K satellite imagery** for accurate visual reference  
- ✅ Adds a **gentle bounce animation** on click so users know exactly where they clicked  
- ✅ Coordinates are instantly shown and are **designed to feed directly into our tsunami prediction model** (integration coming)

> This feature **removes the need for Google Maps or manual copy-pasting**, turning location selection into an intuitive, immersive experience.

---

## ⚡️ Why We Built This

> **"To predict tsunami risk accurately, you *must* have the exact coordinates of the coastal location at risk."**

But during an emergency, no one wants to scramble through Google Maps or manually enter numbers.  

We wanted to **rethink** that experience:

- ✅ Make it **easy, visual, and intuitive**  
- ✅ Let anyone—from scientists to first responders—pick a spot on Earth and get **reliable coordinates instantly**  
- ✅ Feed those into an **AI model** to assess tsunami risk, saving time when it matters most  

Because ultimately, **this is about protecting lives and infrastructure** with better tools.

---

## 📚 Educating Users About Real Tsunami Events

We also want DeepWave to **educate people** about the devastating power of tsunamis.

By showing **real historical events** like the **1960 Chilean Tsunami**, users see *how seismic data translates to catastrophic waves*.

> This isn't just technical—it's about **understanding why prediction matters**.  
> When users see *where* quakes happened and *what destruction they caused*, it builds awareness and respect for preparedness.  
> It's a tool that can teach as well as save.

---

## 📡 Live Seismic Data & AI Prediction (Planned Features)

- ✅ Display **real-time earthquake activity** (planned USGS/NOAA feeds)  
- ✅ Show magnitude, depth, coordinates, and **predicted tsunami risk**  
- ✅ Seamlessly feed selected coordinates into our **AI model**  
- ✅ Return **risk scores** so teams can act faster

> The goal: **select location ➜ get data ➜ predict risk ➜ save lives.**

---

## 🚀 Quick Start

**Use your preferred IDE and follow these steps:**

\`\`\`bash
# 1️⃣ Clone this repo
git clone <YOUR_GIT_URL>

# 2️⃣ Go to the project folder
cd wavefront

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev
\`\`\`

---

## 🌍 Core Features

- ✅ Interactive 3D Earth using NASA imagery
- ✅ Click to get precise latitude and longitude (WGS84 system)
- ✅ Smooth bounce animation centered on click location
- ✅ Real-time coordinate display with intuitive UI
- ✅ Built with modern tools (Vite, React, TypeScript, Tailwind, shadcn-ui)
- ✅ Mobile-friendly and responsive

---

## 🌌 Why This Globe is Special

This isn't just a static 3D model. The heart of our app is **matching a user's click to real-world geographic coordinates**, while:

- ✅ Handling globe rotation and orientation with rotation matrices
- ✅ Mapping 3D sphere points to latitude/longitude correctly
- ✅ Using high-resolution NASA Blue Marble textures for realism
- ✅ Creating a custom bounce animation with sinusoidal vertex displacement — no pre-baked animation!

---

## ✨ Highlights of the Implementation

### 🎯 Click-to-Coordinate Mapping

- Normalizes 3D click points to sphere surface
- Applies inverse rotation to get true geographic location
- Converts to:

\`\`\`
lat = arcsin(y / radius)
lng = atan2(z, x)
\`\`\`

- Normalizes to standard WGS84 longitude range

---

### 🌐 NASA Satellite Textures

- **Diffuse Map:** Real Earth imagery
- **Normal Map:** Terrain topography
- **Specular Map:** Realistic ocean reflections

---

### 🏀 Bounce Animation

- Real-time vertex displacement near click
- Smooth sinusoidal easing
- Lasts ~1.5 seconds, resets cleanly
- Works regardless of globe rotation

---

### 🛰️ Realistic Lighting

- Ambient, directional, and point lights
- Star field backdrop for immersion
- Realistic shading and reflections

---

## 💡 Example User Flow

1️⃣ User explores the globe by dragging and zooming  
2️⃣ Clicks on the target coastal region  
3️⃣ Instantly sees latitude and longitude  
4️⃣ (In the next version, those coordinates will be automatically passed to the ML model to get a tsunami risk score!)

---

## 🗺️ Example Coordinates

| Region    | Approximate Lat | Approximate Lng |
| --------- | --------------- | --------------- |
| India     | ~21° N          | ~78° E          |
| USA       | ~40° N          | ~-100° W        |
| Australia | ~-27° S         | ~133° E         |

---

## ⚙️ Built With

- ⚡ [Vite](https://vitejs.dev/) – Fast dev server
- ⚛️ [React](https://react.dev/) – UI framework
- 🟦 [TypeScript](https://www.typescriptlang.org/) – Type safety
- 🎨 [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling
- 🪄 [shadcn/ui](https://ui.shadcn.com/) – Beautiful components
- 🌌 [Three.js](https://threejs.org/) – 3D rendering

---

## 🚦 Lighthouse & SEO

- Site scores 95+ on Performance, Accessibility, Best Practices, and SEO in Lighthouse audits
- Uses semantic HTML, ARIA labels, and responsive design
- Open Graph and Twitter meta tags for beautiful social sharing
- Fast load times and optimized images
- All main sections are accessible via keyboard navigation

## 📚 Component Documentation

- Storybook is set up for visual component documentation and rapid UI prototyping
- Run `npm run storybook` to start the Storybook server
- Add new stories in `src/stories/`

