# Re:Set — Hacktoberfest 2026 Submission

**Challenge:** Open-Source AI Challenge — Week 1: Touch Grass  
**Project Name:** Re:Set  
**Tagline:** Return to what matters.  
**Core Statement:** An AI that helps you use your phone less.  

---

## 1. What I Built

**Re:Set** is an open-source, open-weight AI experience designed to help people reclaim their attention from screen addiction and return to tactile offline life—starting with **reading**.

Instead of trapping users inside another gamified productivity dashboard, chatbot, or habit tracker, Re:Set operates on an inverted principle:

> **The better Re:Set works, the less time the user spends inside Re:Set.**

Re:Set generates a personalized, friction-free offline challenge using Google's **Gemma 2** open-weight model, and immediately renders a distraction-free screen telling the user to put their phone away. When they return, Gemma synthesizes their reflection with zero streaks, zero XP, and zero guilt.

Additionally, Re:Set provides a **Community QR Gathering System** that allows independent bookstores, libraries, and cafés to host silent group reading hours with privacy-preserving attendance verification.

---

## 2. The Problem

Digital devices have commodified human attention. People who genuinely want to read physical books or be in nature find themselves scrolling algorithmic feeds during every spare pocket of time.

Existing "wellness" apps worsen this by demanding daily retention, penalizing broken streaks, and employing creepy surveillance (accelerometer analysis, screen lock monitoring, GPS geofencing).

Re:Set restores human agency: AI should be a launchpad out of the digital world, not a destination.

---

## 3. Why Re:Set Is Different

| Dimension | Typical Habit/Wellness App | Re:Set |
| :--- | :--- | :--- |
| **Primary Metric** | Daily Active Minutes, App Retention | **Time Returned to Real Life (Offline Hours)** |
| **Philosophy** | "Keep your streak alive!" | **"Returning matters more than consistency."** |
| **AI Role** | Endless chatbot conversation | **Generate 1 ritual, then shut down** |
| **Verification** | Camera/GPS/Screen surveillance | **Self-trust + Physical Venue QR Check-In** |
| **Model Choice** | Closed proprietary cloud LLM | **Open-Weight Gemma 2 (Local / Inspectable)** |

---

## 4. The 10-Step Demo Experience

Re:Set is fully functional and supports the competition script:

1. **Introduction:** Open Re:Set. *"We built AI that can write and code; we wanted to build one that helps us stop using AI."*
2. **Personal Friction:** Input *"I used to read a lot, but now I spend my free time scrolling"* and select 30 minutes.
3. **Gemma Challenge:** Gemma generates *Your first Re:Set* with a specific location rule, phone rule, and tactile reflection anchor.
4. **Offline Mode:** Click *Begin Re:Set*. Screen transforms: *"Your reset has started. You don't need this app anymore. Put your phone away. 🌿"*
5. **Community Venue:** Organizers create *Saturday Re:Set — Reading Together* and generate physical venue QRs.
6. **Arrival Verification:** Participants scan the START QR (`/session/:id/start`). 27 checked in.
7. **Session Completion:** Participants scan the COMPLETE QR (`/session/:id/complete`). 24 completed. *“We don’t verify that you read every page; we verify that you showed up.”*
8. **Reflection Analysis:** Submit: *"I realized that I keep waiting until I have a lot of free time to read."* Gemma synthesizes this non-judgmentally.
9. **My Re:Set Passport:** View **2h 15m returned to real life**, 3 reading sessions, and zero streaks.
10. **Closing Message:** *"The best AI interaction might be the one that ends with you closing the app."*

---

## 5. Open Innovation & Open Weights

Re:Set handles personal diary thoughts and intimate feelings regarding time and distraction.

* **Privacy:** Closed models mandate transmitting intimate musings to third-party corporate servers. Gemma's open weights allow complete offline local execution (`gemma-local` via Ollama) with zero telemetry leakage.
* **Inspectability & Autonomy:** The `AIService -> GemmaProvider` architecture ensures the application is decoupled from any single API vendor. Users can swap models or run them on consumer hardware without vendor lock-in.

---

## 6. Ethical Verification Philosophy

> **"We don't verify that someone read every page. We verify that they showed up."**

A locked screen does not prove reading. Inactivity does not prove reading. Accelerometers do not prove reading. Re:Set explicitly rejects surveillance in favor of self-trust and community solidarity.

---

## 7. Partner Technologies Implemented

1. **Google Gemma 2 (Open-Weight Model):** Powers both the personalized Re:Set generator and the non-guilt reflection synthesis.
2. **MongoDB Atlas:** Persists community sessions, attendance records, and personal offline passport metrics with a resilient local-first fallback.
3. **Sentry:** Custom instrumentation wrapping agent spans for `generateReset()`, `completeSession()`, and `analyzeReflection()`.
4. **Render:** Fully prepared with `render.yaml` for zero-configuration deployment.
