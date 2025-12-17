# IEDC Summit 2025 🚀

[![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.14-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Official website for the **10th Anniversary Edition** of **IEDC Summit**, Kerala's premier entrepreneurship and innovation event hosted by **L.B.S. College of Engineering, Kasaragod**.

**Theme:** *Dare to Disrupt*

---

## 🌟 Overview

The **IEDC Summit 2025** marks a decade of fostering innovation, entrepreneurship, and technological excellence in Kerala. This flagship event brings together students, entrepreneurs, innovators, and industry leaders for a transformative experience featuring workshops, keynotes, networking opportunities, and collaborative learning.

This repository contains the source code for the official summit website, built with modern web technologies to ensure a seamless and engaging user experience.

## ✨ Key Features

-   **Immersive UI/UX**:
    -   **Smooth Scroll Animations**: Powered by GSAP and custom hooks for a fluid browsing experience.
    -   **Interactive Components**: 3D tilted cards (Framer Motion), dynamic logo loops, and animated statistics.
    -   **Responsive Design**: Mobile-first approach using Tailwind CSS v4 for optimal viewing on all devices.

-   **Comprehensive Event Management**:
    -   **Dynamic Schedule**: Real-time schedule updates with filtering capabilities.
    -   **Event & Speaker Showcases**: Detailed sections for featured events, speakers, and webinars.
    -   **Registration & EOIs**: Integrated forms for event registration and Expressions of Interest.

-   **Utility & Integration**:
    -   **Certificate Verification**: System for verifying participation and achievement certificates.
    -   **Supabase Integration**: Backend services for data management.
    -   **Dynamic Forms**: Reusable form components for various data collection needs.
    -   **Video Gallery**: Curated collection of past summit highlights.

## 🛠️ Tech Stack
### Frontend
-   **Framework**: [React 19](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)

### Animation & UI
-   **GSAP**: Advanced scroll animations.
-   **Framer Motion**: Complex layout transitions and 3D effects.
-   **Lucide React**: Modern, consistent icon set.

### Backend & Utilities
-   **Supabase**: Database and backend services.
-   **Custom Hooks**: Optimized hooks for scrolling, counting up, and intersection observing.

## 📦 Installation & Setup

Follow these steps to set up the project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/UmarAlMukhtar/iedcsummit25.git
    cd iedc-summit-2025
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    # or
    pnpm dev
    ```
    The application will be available at `http://localhost:5173`.

## 🚀 Build & Deployment

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
src/
├── assets/             # Static assets (images, icons)
├── components/         # Reusable UI components
│   ├── About.jsx       # About section with modals
│   ├── Events.jsx      # Event listings
│   ├── Hero.jsx        # Landing section
│   ├── Navbar.jsx      # Responsive navigation
│   ├── Schedule.jsx    # Event schedule display
│   └── ...             # (See source for full list)
├── data/               # Static data files
├── hooks/              # Custom React hooks
│   ├── useScrollAnimation.jsx
│   └── ...
├── pages/              # Route components
├── utils/              # Utility functions (Supabase, etc.)
├── App.jsx             # Main application layout
└── main.jsx            # Application entry point
```


## 📧 Contact

For queries regarding the summit or the website:

**IEDC LBSCEK**
-   Email: [iedcsummit@lbscek.ac.in](mailto:iedcsummit@lbscek.ac.in)
-   Website: [iedcsummit.in](https://iedcsummit.in)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Built with ❤️ by the <strong>IEDC LBSCEK Team</strong>
</div>
