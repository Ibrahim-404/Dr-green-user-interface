<div align="center">

  <img src="public/assets/dr-logo.png" alt="Dr. Green Logo" width="180" style="border-radius: 12px; margin-bottom: 15px;" />

  # 🌿 Dr. Green — Web Ecosystem
  ### Next-Generation Health, Personalized Nutrition & Wellness E-Commerce Platform

  <p align="center">
    <strong>A high-performance, bilingual (AR/EN) web application built with Angular 18 & Server-Side Rendering (SSR).</strong>
  </p>

  <p align="center">
    <a href="https://angular.dev/"><img src="https://img.shields.io/badge/Angular-18.0.6-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 18" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://angular.dev/guide/ssr"><img src="https://img.shields.io/badge/SSR-Angular%20Universal-0F9D58?style=for-the-badge&logo=node.js&logoColor=white" alt="SSR" /></a>
    <a href="https://getbootstrap.com/"><img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap 5" /></a>
    <a href="https://primeng.org/"><img src="https://img.shields.io/badge/PrimeNG-17.18-C2185B?style=for-the-badge&logo=primeng&logoColor=white" alt="PrimeNG" /></a>
    <a href="https://dotnet.microsoft.com/"><img src="https://img.shields.io/badge/Backend-.NET%208%20Web%20API-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET 8" /></a>
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-architecture--ecosystem">Architecture</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-author">Author</a>
  </p>

</div>

---

## 📖 Executive Summary

**Dr. Green** is a modern, enterprise-ready digital health and wellness platform designed to bridge personalized healthcare, intelligent diet planning, and high-quality nutritional supplements e-commerce. 

Built with modern **Angular 18** and **Angular SSR**, Dr. Green provides blazing-fast initial load times, seamless SEO indexability, responsive user interactions, and complete bilingual localization (Arabic & English with automated RTL/LTR directional layout shifts).

The platform seamlessly connects to a robust **.NET 8 Web API** micro-services architecture and an integrated **Angular Admin Dashboard**, creating a unified, scalable medical and nutrition ecosystem.

---

## 🌟 Key Features

### 🥗 1. Interactive 7-Step Health & Nutrition Assessment
* **Personalized Assessment Engine:** Interactive step-by-step wizard capturing user biometrics, physical activity levels, dietary restrictions, and personal weight goals.
* **Custom Metric Controls:** Tailored virtual rulers and real-time calculation components for height, weight, and target body mass index (BMI).
* **Automated Diet Plan Generation:** Dynamically generates tailored daily caloric targets and macronutrient distributions based on user assessments.

### 📊 2. "MyPlan" Health Journey & Fitness Dashboard
* **Daily Calorie Tracker:** Real-time calorie budget tracker comparing consumed intake against recommended limits (`RecommendedCalories` vs. `CalSubmission`).
* **Interactive Weight Progress Charts:** Visual tracking of body weight progress over time powered by **Chart.js** and **CanvasJS**.
* **Food & Meal Logging:** Comprehensive food catalog for logging breakfast, lunch, dinner, and snacks with automated gram-to-calorie conversion.
* **Dietary Supplement Tracker:** Daily reminders and intake logging for prescribed vitamins and nutritional supplements.
* **Training & Workout Videos:** Embedded high-performance video player powered by `@videogular` for guided fitness exercises and tutorials.

### 🛒 3. Nutritional Supplements E-Commerce Store
* **Product Catalog:** Filter by medical categories, nutritional benefits, tags, and price points.
* **Rich Product Details:** Multi-angle image galleries, detailed ingredient breakdowns, nutritional facts, health certifications, and customer ratings.
* **Cart & Checkout Workflow:** Dynamic shopping cart with instant quantity adjustments, tax & shipping calculations, and coupon support.
* **Address Management:** Multi-address directory with geolocation tagging, allowing users to save and switch shipping destinations effortlessly.
* **Order Tracking & History:** Real-time visibility into past and active orders with itemized status breakdowns.

### 💡 4. Trending Health Insights & Tips Blog
* **Curated Articles:** Health articles and clinical advice categorized into Nutrition, Workouts, and General Wellness.
* **Robust Fail-Safe SSR:** Hardened server-side rendering logic guaranteeing zero template crashes even with sparse or dynamically filtered dataset states.

### 🌐 5. True Bilingual Support (Arabic & English)
* **Seamless Language Switcher:** Powered by `@ngx-translate` with dynamic JSON dictionaries.
* **Bi-directional Layout (RTL & LTR):** Full CSS/SCSS layout transformation adjusting typography, icons, cards, and data tables according to the active language.

### 🔐 6. Enterprise-Grade Authentication & Security
* **JWT Token Security:** Automatic token persistence, decoding, and injection via custom Angular HTTP Interceptors (`AuthInterceptor`).
* **Two-Factor / SMS Verification:** Integrated OTP verification step for user onboarding and password resets.
* **Protected Routes:** Angular functional `AuthGuard` ensuring safe navigation to user-specific portals.

---

## 🏗️ Architecture & Ecosystem

Dr. Green operates as a three-pillar ecosystem:

```
                              ┌────────────────────────────────────────┐
                              │               CLIENT BROWSER           │
                              └───────────────────┬────────────────────┘
                                                  │
                                                  ▼
                        ┌───────────────────────────────────────────────────┐
                        │        Dr. Green Web Frontend (This Repo)         │
                        │    Angular 18 + Node/Express SSR (Port 4200)      │
                        └─────────────────────────┬─────────────────────────┘
                                                  │ REST APIs / JWT
                                                  ▼
                        ┌───────────────────────────────────────────────────┐
                        │              Dr. Green Backend API                │
                        │             .NET 8 Web API (Port 5200)            │
                        └─────────────┬───────────────────────┬─────────────┘
                                      │                       │
                                      ▼                       ▼
                        ┌───────────────────────────┐ ┌─────────────────────┐
                        │   SQL Server Database     │ │ Dr. Green Dashboard │
                        │  (Remote Production Host) │ │  Angular Admin App  │
                        └───────────────────────────┘ └─────────────────────┘
```

| Component | Repository | Technology | Description |
| :--- | :--- | :--- | :--- |
| **Website Frontend** | [Dr-green-user-interface](https://github.com/Ibrahim-404/Dr-green-user-interface) | Angular 18, SSR, TypeScript, SCSS | Main client-facing portal & store |
| **Backend API** | [Dr-green-backend](https://github.com/Ibrahim-404/Dr-green-backend) | .NET 8, EF Core, SQL Server | Central REST API & Business Logic |
| **Admin Dashboard** | [Dr-green-dashboard](https://github.com/Ibrahim-404/Dr-green-dashboard) | Angular, Bootstrap, ApexCharts | Management portal for clinic staff & admins |

---

## 🛠️ Tech Stack & Libraries

| Domain | Technology / Library | Version | Role / Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [Angular](https://angular.dev/) | `^18.0.0` | Core Single Page Application framework |
| **Rendering** | [@angular/ssr](https://angular.dev/guide/ssr) | `^18.0.6` | Universal Server-Side Rendering & Hydration |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `~5.4.2` | Strongly typed JavaScript |
| **Styling** | [Bootstrap](https://getbootstrap.com/) & SCSS | `^5.3.3` | Responsive layout, modern grid & custom SCSS theme |
| **UI Components** | [PrimeNG](https://primeng.org/) & [Angular Material](https://material.angular.io/) | `^17.18` / `^18.1` | Advanced dialogs, dropdowns, and accessible UI controls |
| **Mobile-Ready UI**| [@ionic/angular](https://ionicframework.com/) | `^8.2.6` | Mobile-first controls & interactive gestures |
| **Data Viz** | [Chart.js](https://www.chartjs.org/) & [CanvasJS](https://canvasjs.com/) | `^4.4` / `^1.2` | Weight history analytics & nutritional metric charts |
| **Internationalization** | [@ngx-translate/core](https://github.com/ngx-translate/core) | `^15.0.0` | Complete runtime English & Arabic translation |
| **Media Player** | [@videogular/ngx-videogular](https://videogular.github.io/ngx-videogular/) | `^8.0.0` | Custom video player for training routines |
| **Carousels** | [Swiper](https://swiperjs.com/) & [ngx-owl-carousel-o](https://github.com/oliviertassinari/ngx-owl-carousel-o) | `^11.1` / `^18.0` | Touch-enabled hero sliders & product carousels |
| **Auth & Security** | `jwt-decode` & `angular-jwt` | `^4.0.0` | Decodes JWT claims & enforces token lifecycles |

---

## 📁 Project Structure

```bash
drGreen-website/
├── public/                     # Static public assets (images, logos, svgs)
│   ├── assets/                 # Brand illustrations, icons & logos
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── features/           # Authentication domain (Login, Register, OTP, Forgot Password)
│   │   ├── pages/              # Primary route views & functional feature modules
│   │   │   ├── about/          # Clinic vision, story & medical team
│   │   │   ├── cart/           # Shopping cart & multi-step address management
│   │   │   ├── contacts/       # Direct customer support & inquiries
│   │   │   ├── favorite/       # User wishlist & saved products
│   │   │   ├── home/           # Hero banners, quick assessment entry & featured products
│   │   │   ├── my-orders/      # Order tracking & invoice history
│   │   │   ├── plan/           # 7-step interactive diet & nutrition wizard
│   │   │   ├── products/       # E-Commerce store, filters, search & details
│   │   │   ├── profile/        # Account settings, password change, "MyPlan" dashboard
│   │   │   └── tips/           # Health blog, nutrition guides & workout tips
│   │   ├── pipes/              # Custom Angular transformation pipes (e.g. limitToPipe)
│   │   ├── services/           # Global application state & LocalStorage services
│   │   ├── shared/             # Reusable UI components, modals, loaders & navbar/footer
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   ├── assets/
│   │   └── i18n/               # Localization translation files (ar.json, en.json)
│   ├── environments/           # Environment-specific variables (Local, Dev, Prod baseURL)
│   ├── styles.scss             # Global design tokens, CSS variables & typography
│   ├── main.server.ts          # Server-Side Rendering entry point
│   └── main.ts                 # Client hydration entry point
├── angular.json                # Angular CLI workspace build configurations
├── server.ts                   # Express.js Server-Side Rendering application server
└── package.json                # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following tools are installed on your machine:
* **Node.js**: `v18.18.0` or higher (LTS recommended)
* **npm**: `v9.0.0` or higher
* **Angular CLI**: `^18.1.0` (`npm install -g @angular/cli`)
* **.NET 8 SDK** *(Optional for local backend hosting)*

### 1. Clone the Repository

```bash
git clone https://github.com/Ibrahim-404/Dr-green-user-interface.git
cd Dr-green-user-interface
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environments

Verify or customize the API target in `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  baseURL: 'http://localhost:5200/' // Target .NET 8 Web API endpoint
};
```

### 4. Run Development Server (with Watch Mode)

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will hot-reload automatically upon file changes.

### 5. Production Build & SSR Execution

To compile the production bundles and run the Node.js Server-Side Rendering server:

```bash
# Build production client and server bundles
npm run build

# Start the high-performance SSR server
npm run serve:ssr:drgreen
```

---

## 🧪 Quality & Engineering Highlights

* **Fail-Safe SSR Defenses:** Every asynchronous template binding uses defensive structural guards (`@if`, safe navigation `?.`, and fallback models) to ensure zero unhandled server exceptions during SSR page rendering.
* **Type Safety:** Full TypeScript strictness with comprehensive interface definitions for products, tips, meals, user plans, and authentication responses.
* **Optimized Bundle Sizes:** Lazy loading applied across all main feature routes (`pages-module`, `products-module`, `tips-module`, `myplan-module`, `cart-module`), keeping initial load under **1.6 MB**.

---

## 👨‍💻 Author & Credits

Developed with precision and passion by:

**Ibrahim Mohamed Haggag**  
*Full-Stack Software Engineer & Front-End Specialist*

* **GitHub:** [@Ibrahim-404](https://github.com/Ibrahim-404)
* **Email:** [hemamohamed.hm35@gmail.com](mailto:hemamohamed.hm35@gmail.com)
* **Project Repository:** [Dr-green-user-interface](https://github.com/Ibrahim-404/Dr-green-user-interface)

---

<div align="center">
  <sub>Built with ❤️ using Angular 18 and .NET 8. Released under the <a href="LICENSE">MIT License</a>.</sub>
</div>
