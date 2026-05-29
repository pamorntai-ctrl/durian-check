# 🥭 Durian Check — เครื่องมือเช็คทุเรียนสุกสำหรับ SME ไทย

Web tool ภาษาไทยสำหรับพ่อค้าแม่ค้าตลาดในการตรวจทุเรียน — ใช้กล้องถ่ายภาพ + ไมโครโฟนเคาะฟังเสียง → ระบบประเมินความแก่และพยากรณ์วันที่ทาน 3 ระดับ → พิมพ์สติกเกอร์แปะที่ผลทุเรียน

**Live demo**: https://durian-check.pamornt-ai.workers.dev

---

## ✨ คุณสมบัติเด่น

- 📸 **ถ่ายภาพ 3 มุม** พร้อม SVG frame overlay แนะนำตำแหน่งวางทุเรียน (เหมือน ID card scan)
  - ภาพ 1: ขั้ว (stem)
  - ภาพ 2: เปลือกด้านข้าง (body + spines)
  - ภาพ 3: ก้น (bottom with segment lines)
- 🔊 **บันทึกเสียงเคาะ** วิเคราะห์ความถี่ด้วย Web Audio API (FFT)
  - ความถี่ต่ำ + พลังงาน low-freq สูง = ทุเรียนกลวง = แก่/สุก
- 🤖 **2 โหมดการวิเคราะห์**
  - **Gemini AI** (default): Google Gemini 2.5 Flash Vision วิเคราะห์ภาพ + เสียง ~0.05 บาท/ครั้ง
  - **Heuristic** (offline): วิเคราะห์สี + FFT ในเบราว์เซอร์ ฟรี ไม่ต้องเน็ต
- 🧪 **แยก 2 มิติ**
  - **ความแก่ (Maturity)**: อ่อน / กึ่งแก่ / แก่ — คุณสมบัติคงที่ตั้งแต่เก็บเกี่ยว จำกัดระดับสูงสุดที่ถึงได้
  - **ความสุก (Ripeness)**: 0-100% — เปลี่ยนแปลงตามเวลาหลังเก็บ ใช้พยากรณ์วันที่
- 📅 **Timeline 3 ระดับ** — กรอบนอกนุ่มใน → นุ่มละมุน → ครีมมี่
  - ระดับสูงสุดที่ลูกค้าจะเลือกได้ขึ้นกับความแก่ (อ่อน=สูงสุดระดับ 1, กึ่งแก่=2, แก่=3)
- 🖨️ **สติกเกอร์ POS Handheld 58mm**
  - ตัวอักษรใหญ่หนา อ่านง่ายบนกระดาษความร้อน
  - QR code 28mm สแกนได้
  - แสดงทั้ง 3 ระดับ + วันที่ พร้อมขีดฆ่าระดับที่เลย/ไม่ถึง
- 🧩 **หน้าตัวอย่าง SVG** (`/test-samples.html`) — 9 ภาพ illustrations 3 use case สำหรับเทสกล้องโดยไม่ต้องใช้ทุเรียนจริง

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML + CSS + JavaScript (no build step) |
| Backend | Cloudflare Workers (TypeScript) |
| AI Vision | Google Gemini 2.5 Flash API (multimodal: image + text) |
| Audio | Web Audio API (`AnalyserNode`, FFT 2048 bins) |
| Camera | MediaDevices `getUserMedia` |
| QR Code | qrcode.js (CDN) |
| Hosting | Cloudflare Workers + Static Assets |
| Source | GitHub + Cloudflare Git Connect auto-deploy |

---

## 📐 Architecture

```
                      ┌──────────────────────┐
                      │   Phone Browser      │
                      │   (Thai SME trader)  │
                      └──────────┬───────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │                             │
                  ▼                             ▼
       ┌───────────────────┐         ┌──────────────────┐
       │ Camera API        │         │ Microphone API   │
       │ (3 photos: stem,  │         │ (Web Audio FFT,  │
       │  body, bottom)    │         │  tap freq stats) │
       └─────────┬─────────┘         └─────────┬────────┘
                 │                             │
                 └──────────────┬──────────────┘
                                ▼
              ┌─────────────────────────────────┐
              │  Cloudflare Worker              │
              │  durian-check.workers.dev       │
              │                                 │
              │  GET  /          → index.html   │
              │  GET  /test-samples.html        │
              │  POST /api/analyze              │
              │       (validates + proxies)     │
              └──────────────┬──────────────────┘
                             │
                             ▼  (HTTPS, x-goog-api-key header)
              ┌─────────────────────────────────┐
              │  Google Gemini 2.5 Flash        │
              │  generativelanguage.google.com  │
              │  - Receives 3 base64 images     │
              │  - + audio stats text           │
              │  - + Thai rubric system prompt  │
              │  - Returns structured JSON      │
              └─────────────────────────────────┘
                             │
                             ▼  (JSON via Worker)
              ┌─────────────────────────────────┐
              │  Result UI on phone:            │
              │  - Maturity badge               │
              │  - Ripeness timeline 3 levels   │
              │  - Print sticker → POS handheld │
              └─────────────────────────────────┘
```

---

## 📂 โครงสร้างโปรเจกต์

```
durian/
├── wrangler.toml              # Cloudflare Workers config
├── README.md                  # ไฟล์นี้
├── .gitignore
├── public/                    # Static assets (served by Cloudflare)
│   ├── index.html             # แอปหลัก (single file, ~50KB)
│   └── test-samples.html      # 9 SVG ตัวอย่างทุเรียน 3 use cases
└── src/                       # Cloudflare Worker code
    ├── index.ts               # Worker entry — routes /api/* + static fallback
    └── analyze.ts             # Gemini API proxy + Thai rubric system prompt
```

---

## 🚀 Setup & Deployment

### Prerequisites
- Cloudflare account (ฟรีพอ)
- Google AI Studio API key (https://aistudio.google.com/apikey)
- GitHub account สำหรับ auto-deploy

### Local Development

```bash
# Clone
git clone https://github.com/pamorntai-ctrl/durian-check.git
cd durian-check

# Install wrangler
npm install -g wrangler

# Set local Gemini key
echo "GEMINI_API_KEY=AIzaSy..." > .dev.vars

# Run local dev server (camera/mic ทำงานบน localhost)
wrangler dev
# เปิด http://localhost:8787
```

### Deploy to Cloudflare

#### Auto-deploy (Recommended)
1. Push ขึ้น GitHub
2. Cloudflare dashboard → **Workers & Pages** → **Create**
3. Connect Git → เลือก repo
4. Build settings: leave default (wrangler.toml มีอยู่แล้ว)
5. Deploy

#### Manual
```bash
wrangler deploy
```

#### Set API key on Cloudflare
- Worker settings → **Variables and Secrets** → **Add**
- Name: `GEMINI_API_KEY`
- Value: paste key
- Type: **Secret** (encrypt)
- Save → Redeploy

---

## 🔌 API: POST `/api/analyze`

### Request
```json
{
  "photos": {
    "stem": "<base64 JPEG, no data: prefix>",
    "body": "<base64 JPEG>",
    "bottom": "<base64 JPEG>"
  },
  "audio": {
    "avgFreq": 220.5,
    "lowRatio": 0.42,
    "samples": 45
  }
}
```

### Response (success 200)
```json
{
  "result": {
    "maturity": "mature",
    "maturity_score": 0.85,
    "ripeness_score": 0.78,
    "days_to_level_1": 0,
    "days_to_level_2": 2,
    "days_to_level_3": 4,
    "max_reachable_level": 3,
    "confidence": 0.82,
    "reasoning_thai": "ขั้วแห้งสีน้ำตาล เปลือกเหลืองอมน้ำตาล ก้นเริ่มแยก เสียงทุ้ม...",
    "indicators": {
      "stem": "น้ำตาลแห้ง รอยตัดแห้ง",
      "body": "เหลืองอมน้ำตาล หนามห่าง ปลายน้ำตาล",
      "bottom": "เห็นรอยแยก 5 พูชัดเจน"
    }
  },
  "usage": {
    "promptTokenCount": 2841,
    "candidatesTokenCount": 187,
    "totalTokenCount": 3028
  },
  "model": "gemini-2.5-flash"
}
```

### Errors
| Code | Cause |
|------|-------|
| 400 | Missing photos / audio in request |
| 500 | `GEMINI_API_KEY` not set on server |
| 502 | Gemini returned non-JSON or error |

---

## 🧠 ทำไมแยก "ความแก่" กับ "ความสุก"?

นี่คือ insight สำคัญของโปรเจกต์ที่ไม่เหมือนแอปทั่วไป:

| มิติ | ความหมาย | เปลี่ยนแปลงไหม | มีผลต่อ |
|-----|---------|--------------|--------|
| **ความแก่** (Maturity) | ตอนเก็บเกี่ยว ทุเรียนแก่พอไหม | ❌ คงที่ตั้งแต่ตัด | จำกัดระดับสูงสุดที่จะถึงได้ |
| **ความสุก** (Ripeness) | ตอนนี้สุกมากแค่ไหน | ✅ เพิ่มขึ้นทุกวัน | ใช้คำนวณวันที่ของแต่ละระดับ |

**ตัวอย่าง:**
- ทุเรียน **อ่อน** ต่อให้รอ 10 วันก็ไปได้แค่ระดับ 1 (กรอบนอกนุ่มใน) — เนื้อจะแข็งและรสจืด ไม่มีวันครีมมี่
- ทุเรียน **แก่ + ดิบ** วันนี้ → รอ 4-5 วันถึงระดับ 1 → อีก 2 วันเป็นระดับ 2 → อีก 2 วันเป็นระดับ 3

ระบบจึงต้องประเมินทั้ง 2 มิตินี้แยกกัน เพื่อให้ลูกค้าวางแผนการกินได้ถูกต้อง

---

## 🎯 User Flow

```
Home (เลือกโหมด)
  ↓
ถ่ายภาพ 1/3: ขั้ว        [SVG frame: rectangle on top]
  ↓ Confirm
ถ่ายภาพ 2/3: เปลือก     [SVG frame: full body oval]
  ↓ Confirm
ถ่ายภาพ 3/3: ก้น        [SVG frame: circle + 5-point star]
  ↓ Confirm
เคาะฟังเสียง (กดค้าง)    [Mic icon + waveform viz]
  ↓ Release
[AI mode] → Loading screen → Gemini API ~5-10s
[Heuristic] → Instant
  ↓
ผลลัพธ์: Maturity panel + Timeline 3 levels
  ↓
พิมพ์สติกเกอร์ → POS Handheld 58mm
```

---

## 🖨️ การพิมพ์สติกเกอร์

ออกแบบมาเฉพาะสำหรับ **POS Handheld Thermal Printer 58mm**:

- `@page size: 58mm auto` — กระดาษม้วนความร้อน
- Font 11-20pt (ใหญ่ อ่านได้บนกระดาษ thermal)
- เน้น weight 700-900 (thermal printer มักทำตัวบางหาย)
- หลีกเลี่ยง solid background ดำ (เปลืองหมึก/burn paper)
- QR code 28×28mm (ขนาดต่ำสุดที่สแกนได้บน thermal)
- 5 ส่วนหลัก: หัวสติกเกอร์ + ความสุก/แก่ + 3 ระดับวันที่ + QR + footer

ทดสอบ: `Ctrl/⌘+P` → เลือก printer หรือ Save as PDF

---

## 🧪 หน้าตัวอย่างเทสกล้อง

เปิดได้ที่ `/test-samples.html` — มี SVG illustrations ของทุเรียน 9 ภาพ (3 use cases × 3 มุม):

1. 🥒 **ทุเรียนอ่อน** — เขียวสด, ก้นปิดสนิท, หนามแหลมตั้ง
2. 🥭 **ทุเรียนกึ่งแก่** — เขียวอมเหลือง, ก้นมีร่องบาง
3. 🟢 **ทุเรียนแก่** — น้ำตาลเหลือง, ก้นแยก 5 พูชัด

วิธีใช้: เปิดหน้านี้บนหน้าจอ Laptop/Tablet → ใช้มือถืออีกเครื่องส่องกล้องเทส

---

## 💰 ต้นทุนการใช้งาน

| รายการ | ราคา |
|--------|-----|
| Cloudflare Workers (Free tier) | ฟรี (100k req/วัน) |
| Google Gemini 2.5 Flash | ~$0.0015 = **~0.05 บาท/ครั้ง** |
| Gemini Free tier | 1,500 req/วัน ฟรี |
| โดเมน .workers.dev | ฟรี |

**สำหรับ SME**: ใช้ 50 ครั้ง/วัน = 2.5 บาท/วัน = ~75 บาท/เดือน

---

## 🔄 Version History

| Commit | สิ่งที่เปลี่ยน |
|--------|-------------|
| `0c24a09` | Redesign print สำหรับ POS Handheld 58mm |
| `9d44f5d` | Fix Gemini schema (เอา integer enum ออก) |
| `b9bd647` | Add test-samples.html (9 SVG ตัวอย่าง) |
| `71689d3` | เปลี่ยน Claude → Gemini API |
| `e1df14d` | Restructure → Cloudflare Workers + Assets |
| `e92f8bc` | Add Claude Vision mode (เดิม) |
| `68bc23a` | Initial commit: heuristic-only version |

---

## 🚧 Roadmap / Ideas

- [ ] บันทึก log การตรวจในฐานข้อมูล (Cloudflare D1)
- [ ] Dashboard สำหรับร้านดูสถิติ
- [ ] รองรับทุเรียนหลายพันธุ์ (หมอนทอง, ชะนี, ก้านยาว — แต่ละพันธุ์มีรูบริคต่าง)
- [ ] โหมด offline แบบ PWA
- [ ] LINE LIFF integration ให้ลูกค้าสแกน QR แล้วเข้าดูตารางทาน
- [ ] Train local ML model เก็บข้อมูลจาก Gemini API เป็น dataset

---

## 🤝 Credits

- 🧠 AI vision: Google Gemini 2.5 Flash
- ☁️ Hosting: Cloudflare Workers + Static Assets
- 🎨 UI design: Thai market trader-friendly (ตัวใหญ่, สี durian theme)
- 🥭 Domain expertise: รูบริคจัดทำตามคำแนะนำของพ่อค้าทุเรียนตลาดไทยทั่วไป

---

## 📜 License

MIT — feel free to ปรับใช้กับโปรเจกต์ SME อื่น ๆ

---

**Built for Thai SME durian sellers 🇹🇭**

หากเจอ bug หรือมีคำแนะนำ — เปิด issue ใน GitHub repo
