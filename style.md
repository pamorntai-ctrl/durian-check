# 🎨 Durian Check — Design System & Style Guide

แรงบันดาลใจ: **Exotic Fruit Sales App** (Yassine Ben Salem) — warm pastels, friendly serif headers, clean white space, card-based UI ที่ดูเป็นมิตรกับร้านขายผลไม้

ใช้ผสาน aesthetic นี้กับโทน **ทุเรียน** (เขียวธรรมชาติ + เหลืองครีม + น้ำตาลอบอุ่น) สำหรับ SME ไทย

---

## 1. Design Philosophy

| หลักการ | ใจความ |
|---------|--------|
| **Warm & Approachable** | ไม่ดู tech corporate — เหมือนตลาดสดที่มีรอยยิ้ม |
| **Generous White Space** | พื้นที่หายใจเยอะ ลดความหนาแน่นของข้อมูล |
| **Pastel Cards** | ข้อมูลแต่ละชิ้นอยู่บน card สี pastel อ่อน ๆ — ดูแบ่งแยกชัดเจน |
| **Serif Headers + Sans Body** | หัวเรื่อง serif (มีบุคลิก) + เนื้อหา sans-serif (อ่านง่าย) |
| **Soft Rounded Corners** | radius 12-16px ทุกที่ — เลี่ยงมุมแหลม |
| **Earth Tones over Neon** | สีอบอุ่นจากธรรมชาติ — เลี่ยงสีเรืองแสง/saturate จัด |
| **Touch-First** | ปุ่มใหญ่ตั้งแต่ 48px — ออกแบบสำหรับนิ้วโป้งกลางตลาด |

---

## 2. Color Palette

### 2.1 Primary (Brand)

| Token | Hex | ใช้ตอนไหน |
|-------|-----|----------|
| `--green-deep` | `#3D5A28` | หัวเรื่อง, ลิงก์หลัก, ปุ่ม primary |
| `--green-leaf` | `#6B8E23` | accent หลัก, badge สำเร็จ, border active |
| `--green-soft` | `#A8C97E` | hover state, secondary fill |
| `--green-mist` | `#E8F1DA` | card background ของ "แก่ (mature)" |

### 2.2 Pastel Cards (Status Backgrounds)

ใช้เป็น `background` ของ card แต่ละประเภท — ตามตัวอย่างจาก reference

| Token | Hex | ใช้กับ |
|-------|-----|--------|
| `--card-peach` | `#FAD9C2` | ทุเรียนสุก ระดับ 3 (creamy) |
| `--card-cream` | `#F5E6CD` | ทุเรียน base / neutral cards |
| `--card-mint` | `#D8E8C8` | ทุเรียนแก่/พร้อมทาน |
| `--card-blush` | `#F9D8D5` | แจ้งเตือน soft / favorite |
| `--card-lemon` | `#FCEAB8` | ทุเรียนสุก ระดับ 1-2 |
| `--card-sage` | `#E0E8D2` | ทุเรียนกึ่งแก่ |
| `--card-coral` | `#F7C5B2` | warning soft (อ่อน) |

### 2.3 Accents (CTA & States)

| Token | Hex | ใช้ตอนไหน |
|-------|-----|----------|
| `--coral-cta` | `#E8624D` | ปุ่ม "Add to Cart" / "พิมพ์สติกเกอร์" — สีร้อนเรียกความสนใจ |
| `--coral-cta-dark` | `#C44A38` | hover/active ของ coral-cta |
| `--yellow-durian` | `#D4A017` | brand accent ของทุเรียน, ใช้ใน gradient/highlight |
| `--brown-stem` | `#8B5A2B` | ขั้วทุเรียน, sticker label text |

### 2.4 Neutrals

| Token | Hex | ใช้ตอนไหน |
|-------|-----|----------|
| `--bg-canvas` | `#FFFFFF` | พื้นหลังหลักของแอป |
| `--bg-warm` | `#FBF7F0` | พื้นหลังรองอบอุ่น (เลี่ยงขาวจัด) |
| `--text-primary` | `#2D2D2D` | ข้อความหลัก |
| `--text-secondary` | `#6B6B6B` | hint, caption, secondary |
| `--text-on-card` | `#3D5A28` | ข้อความบน pastel card (เขียวเข้ม contrast ดี) |
| `--border-soft` | `#EDE6D3` | divider บาง ๆ |
| `--shadow-soft` | `0 4px 14px rgba(43, 30, 8, 0.08)` | engagement shadow ใต้ card |

### 2.5 Functional / Maturity Tags

| Status | Background | Border | Text |
|--------|-----------|--------|------|
| **อ่อน (Young)** | `#F7C5B2` (coral) | `#C44A38` | `#5A1A0E` |
| **กึ่งแก่ (Medium)** | `#FCEAB8` (lemon) | `#D4A017` | `#7A5A0A` |
| **แก่ (Mature)** | `#D8E8C8` (mint) | `#3D5A28` | `#1F3D14` |

---

## 3. Typography

### 3.1 Font Families

```css
--font-serif: 'Fraunces', 'Playfair Display', Georgia, serif;
--font-sans: 'Sarabun', 'Noto Sans Thai', 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

**กฎการเลือก:**
- **Serif** = headers ใหญ่ (หน้า hero, h1, h2 ของหน้า marketing)
- **Sans** = body text, ปุ่ม, UI ทั่วไป, ทุก ๆ ข้อความที่ต้องอ่านบนมือถือ
- ภาษาไทย → **Sarabun** เสมอ (ไม่มี Thai serif ที่ดีพอสำหรับ UI ขนาดเล็ก)

### 3.2 Type Scale

| Token | Size / Weight | Use |
|-------|---------------|-----|
| `--text-display` | 36px / 700 serif | hero "Exotic fruit sales app" style |
| `--text-h1` | 28px / 700 | หัวหน้าจอ "ตรวจทุเรียนของคุณ" |
| `--text-h2` | 22px / 700 | section title, card title |
| `--text-h3` | 18px / 600 | sub-section |
| `--text-body` | 16px / 400 | เนื้อหา |
| `--text-button` | 17px / 700 | ปุ่ม |
| `--text-label` | 14px / 600 | label, chip |
| `--text-hint` | 13px / 400 | hint, helper text |
| `--text-caption` | 12px / 500 | meta, timestamp |

### 3.3 Line-height & Letter-spacing

```css
--lh-tight: 1.2;        /* headers serif */
--lh-snug: 1.35;        /* sub-headers */
--lh-normal: 1.5;       /* body */
--lh-relaxed: 1.65;     /* hero paragraph */

--ls-tight: -0.02em;    /* large serif */
--ls-normal: 0;
--ls-wide: 0.04em;      /* uppercase labels */
```

---

## 4. Spacing & Sizing

### 4.1 Spacing Scale (Tailwind-style 4px base)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### 4.2 Border Radius

```css
--radius-sm: 8px;       /* chip, tag, small input */
--radius-md: 12px;      /* button, card หลัก */
--radius-lg: 16px;      /* card ใหญ่, modal */
--radius-xl: 24px;      /* hero card, top banner */
--radius-full: 9999px;  /* avatar, mic circle, pill */
```

### 4.3 Touch Targets

| Element | Min size |
|---------|----------|
| Button height | 48px |
| Icon button | 44×44px |
| Mic circle | 120-160px |
| Tap area สำหรับ list item | 56px |

---

## 5. Component Patterns

### 5.1 Card (Pastel)

แบบที่เห็นบ่อยที่สุดใน reference

```css
.card-pastel {
  background: var(--card-cream);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-soft);
  /* ไม่ต้องมี border — ใช้สีของ background แยกเอง */
}
```

**Composition:**
```
┌─────────────────────────┐
│  [Image/Illustration]   │  ← 1:1 หรือ 4:3 อยู่บน
│                         │
├─────────────────────────┤
│  Title (serif/bold)     │  ← 18px
│  Sub-text (sans)        │  ← 14px muted
│  💰 ราคา / 📅 วันที่    │  ← 16px bold
└─────────────────────────┘
```

### 5.2 Primary Button

```css
.btn-primary {
  background: var(--coral-cta);
  color: white;
  padding: 14px 24px;
  border-radius: var(--radius-md);
  font: 700 17px var(--font-sans);
  box-shadow: 0 4px 12px rgba(232, 98, 77, 0.3);
  border: none;
}
.btn-primary:active {
  transform: scale(0.98);
  background: var(--coral-cta-dark);
}
```

### 5.3 Secondary Button (Outlined)

```css
.btn-secondary {
  background: white;
  color: var(--green-deep);
  padding: 14px 24px;
  border-radius: var(--radius-md);
  font: 600 17px var(--font-sans);
  border: 2px solid var(--green-leaf);
}
```

### 5.4 Status Badge / Maturity Tag

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font: 700 13px var(--font-sans);
}
.badge.young   { background: var(--card-coral);  color: #5A1A0E; }
.badge.medium  { background: var(--card-lemon);  color: #7A5A0A; }
.badge.mature  { background: var(--card-mint);   color: #1F3D14; }
```

### 5.5 Header (App)

```css
.app-header {
  background: white;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-soft);
}
.app-header .logo {
  font: 700 18px var(--font-serif);
  color: var(--green-deep);
}
.app-header .avatar {
  width: 36px; height: 36px;
  border-radius: var(--radius-full);
  background: var(--card-cream);
}
```

### 5.6 Bottom Navigation

```css
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: white;
  padding: 8px 0 16px;  /* safe area bottom */
  display: flex; justify-content: space-around;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.05);
}
.bottom-nav .nav-item {
  padding: 8px 16px;
  color: var(--text-secondary);
  font: 500 11px var(--font-sans);
}
.bottom-nav .nav-item.active {
  color: var(--green-deep);
}
.bottom-nav .nav-item.active svg {
  filter: drop-shadow(0 0 6px rgba(107, 142, 35, 0.4));
}
```

### 5.7 Success State (Reference Pattern)

ตามที่เห็นใน reference — circle + checkmark + green theme

```css
.success-state {
  text-align: center;
  padding: 48px 24px;
}
.success-state .icon {
  width: 80px; height: 80px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: var(--card-mint);
  display: flex; align-items: center; justify-content: center;
  font-size: 40px;
  color: var(--green-deep);
}
.success-state h2 {
  font: 700 22px var(--font-serif);
  color: var(--green-deep);
  margin: 0 0 8px;
}
.success-state p {
  color: var(--text-secondary);
  font-size: 15px;
}
```

### 5.8 Progress Dots

```css
.progress-dot {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--border-soft);
  color: var(--text-secondary);
  display: flex; align-items: center; justify-content: center;
  font: 700 13px var(--font-sans);
}
.progress-dot.active {
  background: var(--card-lemon);
  color: var(--brown-stem);
  border: 2px solid var(--yellow-durian);
}
.progress-dot.done {
  background: var(--green-leaf);
  color: white;
}
```

---

## 6. Imagery & Iconography

### 6.1 Product / Hero Imagery

- **Style**: Photo-realistic หรือ painterly illustration บน white/cream background
- **Composition**: ผลไม้/ทุเรียนตรงกลาง มี shadow soft ด้านล่าง
- **Frame**: ไม่ต้อง crop ขอบสุด — เว้น whitespace รอบ ๆ ใน card

### 6.2 Icons

- ใช้ icon style **outline + light fill** (เหมือนใน reference) — น้ำหนัก 1.5-2px stroke
- ขนาดมาตรฐาน 20-24px
- สีตาม context (สีหลักของ card หรือ text color)
- แนะนำใช้ **Lucide** หรือ **Heroicons (outline)**

### 6.3 Emoji เป็น icon

- ใช้ได้ในกรณี **ทุเรียน** ที่เกี่ยวกับสภาพ/ระดับ:
  - 🥒 อ่อน • 🥭 ทุเรียน/กึ่งแก่ • 🟢 แก่
  - 🌰 ระดับ 1 • 🍯 ระดับ 2 • 🍮 ระดับ 3
- ใหญ่ 28-48px เพื่อให้เห็นชัด

---

## 7. Layout & Grid

### 7.1 Container

```css
.container {
  max-width: 480px;       /* mobile-first */
  margin: 0 auto;
  padding: 0 16px;
}
@media (min-width: 768px) {
  .container { max-width: 720px; padding: 0 24px; }
}
```

### 7.2 Card Grid (สำหรับ list ของผลไม้/ทุเรียน)

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media (min-width: 480px) {
  .card-grid { gap: 16px; }
}
```

### 7.3 Section Spacing

- ระหว่าง section: 32-40px
- ภายใน section ระหว่าง element: 12-16px
- ด้านบนหน้าหลังจาก header: 16px

---

## 8. Motion & Interaction

### 8.1 Transitions

```css
--ease-snappy: cubic-bezier(0.4, 0, 0.2, 1);
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 400ms;
```

### 8.2 Common Interactions

| Element | Effect |
|---------|--------|
| Button press | `transform: scale(0.98)` + darker bg, 150ms |
| Card tap | `transform: translateY(-2px)` + bigger shadow |
| Page transition | fade + slide-up 8px, 400ms ease-smooth |
| Mic recording | pulse animation 1.2s infinite (อยู่แล้วในแอป) |
| Success appear | scale 0.8→1 + fade-in, 300ms snappy |

---

## 9. Print Style (POS 58mm Thermal) — แยกชัดจาก Screen

หน้าจอ = warm pastel; พิมพ์ = **monochrome high-contrast** (เพราะ thermal printer)

| Aspect | Screen | Print 58mm |
|--------|--------|-----------|
| Background | pastel cards | white only |
| Typography | sans/serif mix | sans only, **bold 700-900** |
| Color | full palette | **black + white**, occasional inverted |
| Spacing | generous | tight (มม.) |
| Border | soft 1px | **0.5-0.8mm solid** |
| Size unit | px | **pt + mm** |

ดูรายละเอียดที่ `public/index.html` → `@media print` block

---

## 10. Application to Durian Screens

### 10.1 Home Screen

```
┌─────────────────────────────────┐
│  🥭 เช็คทุเรียนสุก    [👤]      │  ← App header (serif logo)
├─────────────────────────────────┤
│                                 │
│  ตรวจทุเรียนของคุณ              │  ← h1 serif
│  ใช้กล้อง + เสียงเคาะ...        │  ← hint sans
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🤖 Gemini AI              │  │  ← Card mint border
│  │ ความแม่นสูง...            │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ ⚡ เกณฑ์อย่างง่าย          │  │  ← Card cream
│  │ เร็ว ฟรี ออฟไลน์...        │  │
│  └───────────────────────────┘  │
│                                 │
│  [▶ เริ่มตรวจทุเรียน]            │  ← Big coral CTA
└─────────────────────────────────┘
```

### 10.2 Result Screen — apply pastel card pattern

```
Maturity panel = mint/coral/lemon card (ตามผล)
Timeline items = 3 cards เรียงตามวัน
  ระดับ 1 = mint (พร้อมทาน)
  ระดับ 2 = lemon (พีค)  
  ระดับ 3 = peach (creamy)
  Passed = greyed cream
  Unreachable = coral with strikethrough
```

### 10.3 Loading Screen (AI mode) — apply success-state pattern

```
┌─────────────────────────────────┐
│                                 │
│        ⌒ ⌒ ⌒                   │  ← spinner/pulse
│      ( 🥭 )                     │  ← in mint circle
│        ⌒ ⌒ ⌒                   │
│                                 │
│  Gemini กำลังวิเคราะห์...        │  ← serif h2
│  ใช้เวลา 5-10 วินาที            │  ← hint sans
│                                 │
└─────────────────────────────────┘
```

---

## 11. Asset Checklist (สำหรับ implement)

- [ ] โหลด font **Fraunces** + **Sarabun** จาก Google Fonts
- [ ] Refactor existing `:root` CSS variables ตาม `--token-name` ใหม่
- [ ] สร้าง utility classes: `.card-pastel`, `.btn-primary`, `.btn-secondary`, `.badge`
- [ ] เพิ่ม Lucide หรือ Heroicons (CDN/inline SVG)
- [ ] ใช้ rounded-corners ทุก border-box element
- [ ] ลบ gradient/glow ที่ดูเหมือน tech app — แทนด้วย soft shadow
- [ ] ทดสอบทั้งโหมด screen + print แยกกัน

---

## 12. Do's & Don'ts

### ✅ Do
- ใช้ **white space** เยอะ ๆ
- ทุก ๆ card วางบน background ขาว/cream
- **Coral** เฉพาะปุ่มหลักที่อยากให้กด
- **Green** สำหรับยืนยัน, สำเร็จ
- รูป serif headline ที่ใหญ่และตัดบรรทัดสวย
- icons ที่บางพอ ไม่หนา

### ❌ Don't
- ใช้สีเรืองแสง/neon
- ใช้ gradient หลายสี (เลี่ยง — pastel เดี่ยวพอ)
- โหลดข้อมูลแน่นใน card เดียว → แยกหลาย card
- ใช้ uppercase ภาษาไทย (อ่านยาก)
- ใช้ font size ต่ำกว่า 13px บนมือถือ
- มี border ดำเข้ม — ใช้ soft shadow แทน

---

## 13. Inspiration Credits

- **Yassine Ben Salem** — Exotic Fruit Sales App (reference image)
- **Linear app** — generous spacing patterns
- **Notion** — clean serif/sans pairing
- **Apple Shortcuts** — pastel category cards

---

**Style guide maintained alongside `public/index.html` and `README.md`. Update ทั้ง 3 ที่เสมอเมื่อ design tokens เปลี่ยน.**
