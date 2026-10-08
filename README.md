# Re:Set

> **Return to what matters.**  
> *An AI that helps you use your phone less.*

Built for **Hacktoberfest 2026 Open-Source AI Challenge — Week 1: Touch Grass**.

---

## Core Product Principle

> **"The better Re:Set works, the less time the user spends inside Re:Set."**

Re:Set is **not** another AI chatbot, productivity dashboard, habit tracker, streak app, or wellness assistant. It is a bridge between artificial intelligence and real-world life.

---

## 1. The Problem

People increasingly spend their free time trapped in infinite feeds and notification loops, even when they genuinely want to return to offline activities they love: reading physical books, walking in nature, moving their bodies, and gathering in person.

Traditional apps claim to solve this by adding *more* screen time: demanding daily check-ins, punishing broken streaks, sending artificial notifications, and treating attention as an engagement metric.

---

## 2. The Idea

Re:Set uses an open-weight AI model (**Gemma 2**) to create a small, personalized, low-friction offline challenge:

```text
Your first Re:Set
📖 Read for 30 minutes
📍 Choose somewhere different from your usual room.
📵 Put your phone away while reading.
🌱 When you finish, remember one idea, sentence, or feeling that stayed with you.
```

The moment the user clicks **Begin Re:Set**, the application deliberately becomes almost useless:

```text
RE:SET
Your reset has started.
You don't need this app anymore.
Put your phone away. 🌿
```

The user physically leaves their phone alone and returns to life.

---

## 3. Why AI?

AI is not used as an endless chatbot. It has two strict, bounded responsibilities:

1. **Re:Set Generator:** Translates personal friction ("I used to read a lot, but now I scroll") and available duration into an achievable, tactile offline ritual.
2. **Non-Judgmental Reflection:** When the user returns, Gemma analyzes their feeling and takeaway without guilt ("Not this time is okay", "Returning matters more than consistency").

---

## 4. Why Open Innovation & Open Weights Matter

Re:Set deals with intimate human reflections: why you stopped reading, your thoughts on literature, and your private struggles with distraction.

* **Privacy by Design:** Closed cloud APIs require personal journal entries to leave user devices and feed corporate model training. With open-weight models like **Gemma 2**, inference can run locally (e.g. via Ollama) with 100% offline isolation.
* **Inspectable & Swappable:** Re:Set uses a clean `AIService` abstraction (`AIService -> GemmaProvider`). Any open-weight model can be substituted without touching application code.
* **Resilient Fallback:** If internet access is lost, a deterministic, Gemma-aligned offline engine takes over. The app **never** fabricates AI responses and always discloses model provenance.

---

## 5. Community Verification: Zero Surveillance

> **"We don't verify that you read every page. We verify that you showed up."**

Re:Set rejects digital surveillance. A phone being locked does not prove reading. Screen timers do not prove reading. Accelerometers do not prove reading.

Instead, Re:Set uses:
* **Self-Trust for Solo Sessions:** The user simply reports: *"I completed my Re:Set"* or *"Not this time"*.
* **QR-Based Attendance for Community Gatherings:** Bookstores, libraries, and cafés display two physical QR posters:
  * **START QR (`/session/:id/start`):** Scanned upon arrival at the venue. Records that you gathered.
  * **COMPLETE QR (`/session/:id/complete`):** Scanned when leaving. Collects reflections.

Organizers see:
* `27 checked in`
* `24 completed`
* `3 did not complete`

No surveillance. Just human presence.

---

## 6. Architecture

```text
                 ┌────────────────────────────────┐
                 │     React + Vite Client        │
                 │ (Editorial Journal Aesthetic)  │
                 └───────────────┬────────────────┘
                                 │
                                 ▼
                 ┌────────────────────────────────┐
                 │    Express Backend API         │
                 │   (Health, Reset, Community)   │
                 └───────────────┬────────────────┘
                                 │
              ┌──────────────────┴──────────────────┐
              ▼                                     ▼
       ┌──────────────┐                      ┌─────────────┐
       │   AIService  │                      │   MongoDB   │
       │      │       │                      │    Atlas    │
       │      ▼       │                      └─────────────┘
       │ GemmaProvider│                             │
       │  (Gemma 2)   │                             ▼
       │      │       │                     Community Sessions
       │      ▼       │                     QR Check-In/Out
       │   Fallback   │                     Passport Stats
       └──────────────┘
```

---

## 7. Tech Stack

* **Frontend:** React 18, Vite, Lucide Icons, QRCode.react, Vanilla CSS design system.
* **Backend:** Node.js, Express, Mongoose.
* **AI:** Google Gemma 2 (Open-weight 9B/2B), Hugging Face Inference API / Local Ollama (`gemma2`).
* **Database:** MongoDB Atlas (with automatic in-memory fallback for offline test environments).
* **Monitoring & Tracing:** Sentry agent spans around `generateReset()`, `completeSession()`, and `analyzeReflection()`.
* **Deployment:** Production-ready for Render (`render.yaml`).

---

## 8. Running Locally

### Prerequisites
* Node.js (v18+ recommended)
* npm

### Quick Start (Single Command)

1. Clone repository:
   ```bash
   git clone <repo-url>
   cd week1_hacktoberfest
   ```

2. Install all dependencies:
   ```bash
   npm run install:all
   ```

3. Build client & start production server:
   ```bash
   npm run build
   npm start
   ```

4. Or start concurrent development servers:
   ```bash
   npm run dev
   ```

Open `http://localhost:5000` (or `http://localhost:5173` in Vite dev mode).

---

## 9. Environment Variables

Copy `.env.example` to `server/.env`:

```bash
cp .env.example server/.env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB Atlas connection string (leave blank for instant in-memory demo) | `mongodb+srv://...` |
| `AI_PROVIDER` | AI provider choice (`gemma`, `gemma-local`, or `fallback`) | `gemma` |
| `GEMMA_MODEL` | Hugging Face / Ollama model identifier | `google/gemma-2-9b-it` |
| `GEMMA_API_KEY` | Hugging Face token or API key | `hf_...` |
| `OLLAMA_URL` | Local Ollama endpoint | `http://localhost:11434` |
| `SENTRY_DSN` | Sentry DSN for performance and error tracing | *(optional)* |

---

## 10. Live Demo & Testing Mode

Judges do not need a second device or 30 physical minutes to experience the complete flow:

1. **1-Minute Judge Walkthrough:** Click `⚡ 1-Minute Judge Walkthrough` in the top demo banner to test all 10 script milestones.
2. **Simulate Scan:** In `/organizer` or `/community`, click **Show QR Codes** and use **Simulate Scan** to test mobile arrival and completion.
3. **Simulate 30 Minutes:** On the offline screen, use **Simulate 30 Minutes (Demo)** to jump directly to the reflection flow.

---

## 11. Privacy & Telemetry Limitations

* **No Surveillance:** We never request GPS, camera, screen lock state, or battery status.
* **Honest Disclosure:** In hosted API mode, prompt inputs are sent to the open model router. In `gemma-local` mode, zero data leaves the user's computer.
* **Limitations:** Community sessions currently require organizer trust to display the QR code at the physical venue.

---

## 12. Future Horizons

* **Independent Bookstores & Cafés:** Printed wood-engraved QR stations for local quiet-reading hours.
* **New Activities:** Movement, Nature walks, Analog crafting, and Face-to-face connecting.
* **Local-First Native App:** Direct device-local Gemma execution via WebGPU / ONNX Runtime.

---

### License
Apache-2.0 License.
