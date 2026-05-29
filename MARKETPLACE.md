# 🛒 Durian Marketplace — Scaling Roadmap

จาก **Durian Check Tool** (Phase 0 — เสร็จแล้ว) → **Durian Marketplace** (Phase 1-4)

---

## 1. Vision

```
ก่อน:  SME ใช้แอปเช็คทุเรียน → พิมพ์สติกเกอร์ → ขายในตลาด
หลัง:  SME เช็ค → กดส่งเข้า marketplace → ลูกค้าเลือกซื้อตามวันที่อยากกิน
       → จ่ายเงิน → SME แพ็คส่ง/ลูกค้ารับเอง
```

**Key insight**: ระบบ 3 ระดับ + พยากรณ์วันที่ที่มีอยู่แล้ว = **filter หลักของ marketplace** — ลูกค้าเลือกได้ว่า "อยากกินอาทิตย์หน้า" ระบบกรองทุเรียนที่จะถึงระดับ 2 ในวันที่นั้นให้

---

## 2. User Personas

### 👨‍🌾 SME Seller (พ่อค้าแม่ค้า)
- มีทุเรียน 10-200 ลูก/วัน
- ใช้มือถือ Android ราคา 5-8 พันบาท
- ต้องการ: ขายเร็ว, จัดการง่าย, ได้เงินไว
- ปัญหาเดิม: ลูกค้าซื้อทุเรียนผิดจังหวะ → คืน/บ่น

### 👩‍🍳 Customer (คนซื้อ)
- ซื้อทุเรียน 1-3 ลูก/ครั้ง
- ต้องการ: รู้แน่ว่ากินวันไหน, สดใหม่, ไม่เสี่ยง
- ปัญหาเดิม: ซื้อจากตลาดเสียงดวง

### 🚚 Logistics (ไม่ MVP)
- จัดส่งระหว่างจังหวัด
- pickup point บริการรับฝาก

---

## 3. Feature Map (4 Phases)

### Phase 0 — Tool (DONE ✅)
- เช็คทุเรียนด้วยกล้อง + เสียง → AI/Heuristic
- ผลลัพธ์: maturity + ripeness + timeline 3 ระดับ
- พิมพ์สติกเกอร์

### Phase 1 — MVP Marketplace (~2-3 สัปดาห์)

**Seller Side:**
- [ ] ปุ่ม **"ส่งเข้า marketplace"** หลังเช็คเสร็จ
- [ ] เพิ่มข้อมูล: พันธุ์, ราคา, น้ำหนัก, location, จำนวน
- [ ] อัปโหลด 3 ภาพ (มีอยู่แล้วจาก check flow)
- [ ] รายการของฉัน (My Listings) — แก้ไข/ลบ/ดูสถานะ

**Buyer Side:**
- [ ] หน้า browse — grid ของทุเรียนที่ขาย
- [ ] **Filter หลัก**:
  - 📅 วันที่อยากกิน (date picker) → กรองที่ระดับ 2 ตรงวันนั้น
  - 🥭 พันธุ์ทุเรียน (chips: หมอนทอง, ชะนี, ก้านยาว, พวงมณี, อื่น ๆ)
  - 💰 ช่วงราคา
  - 📍 พื้นที่ (จังหวัด/อำเภอ)
- [ ] หน้า detail: ดู 3 ภาพ, timeline 3 ระดับ, แผนที่ร้าน
- [ ] เพิ่มลงตะกร้า

**Auth (จำเป็น):**
- [ ] Phone OTP (เหมาะกับ SME ไทยที่สุด)
- [ ] Role: seller / buyer (1 บัญชีเป็นได้ทั้งสอง)

### Phase 2 — Checkout & Payment (~1-2 สัปดาห์)
- [ ] ตะกร้า (cart) + sync ข้ามอุปกรณ์
- [ ] หน้า checkout — เลือกที่อยู่จัดส่ง/นัดรับ
- [ ] Payment: **PromptPay QR** (มาตรฐาน SME ไทย)
- [ ] Webhook ตรวจการชำระ → สถานะ order
- [ ] Seller: อนุมัติ/ปฏิเสธ order
- [ ] Buyer: ดู order history

### Phase 3 — Trust & Scale (~3-4 สัปดาห์)
- [ ] Rating + review หลังรับสินค้า
- [ ] Seller profile: รูป, ที่ตั้ง, จำนวน listing ทั้งหมด
- [ ] **Live AI re-check**: ลูกค้า scan QR บนสติกเกอร์ → ดูผลตรวจล่าสุด
- [ ] Delivery integration (Kerry/Flash/J&T API) — ออกใบ shipping
- [ ] Notification: LINE Notify เมื่อทุเรียนถึงระดับที่ลูกค้าซื้อ
- [ ] Refund flow

### Phase 4 — Growth (~ongoing)
- [ ] AI recommendation: "ทุเรียนนี้คล้ายที่คุณซื้อรอบก่อน"
- [ ] Subscription: 1 ลูก/อาทิตย์ ส่งให้ทุกอาทิตย์
- [ ] B2B mode: ร้านอาหารสั่งล็อตใหญ่
- [ ] LINE LIFF app — สั่งใน chat
- [ ] Multi-language (English สำหรับลูกค้าต่างชาติ)
- [ ] Analytics dashboard สำหรับ seller

---

## 4. Tech Stack — Recommendation

### Current (Phase 0)
```
Static HTML + Cloudflare Worker + Gemini API
```
**ข้อจำกัด**: ไม่มี DB, ไม่มี auth, ไม่มี user state → ทำ marketplace ไม่ได้

### Recommended (Phase 1+)

**Stack: Supabase + React (Lovable-compatible)**

| Layer | Technology | ทำไม |
|-------|-----------|------|
| Frontend | **React + Vite + TypeScript + Tailwind + shadcn/ui** | Lovable เกิดมาเพื่ออันนี้ |
| Auth | **Supabase Auth** (Phone OTP) | ไม่ต้องเขียน OTP เอง รองรับไทย |
| Database | **Supabase Postgres** | relational ตอบโจทย์ marketplace ดี |
| Storage | **Supabase Storage** | เก็บภาพทุเรียน |
| Realtime | **Supabase Realtime** | cart sync, order status push |
| Edge Functions | **Supabase Edge Functions** (Deno) | Gemini proxy + payment webhooks |
| Payment | **Omise** หรือ **2C2P** (PromptPay QR) | สถาบันการเงินไทย รองรับ PromptPay |
| Hosting | **Vercel** หรือ **Cloudflare Pages** | React SPA |
| Monitoring | **Sentry** (free tier) | error tracking |

### Alternatives พิจารณา

| Stack | Pros | Cons |
|-------|------|------|
| Cloudflare D1 + R2 + Workers (stay) | ถูกที่สุด, latency ต่ำ | ecosystem น้อย ทำ marketplace ช้ากว่า |
| Firebase | Auth + DB + Storage ครบ | ไม่ใช่ SQL → ทำ join ลำบาก |
| Next.js + own Postgres | ควบคุมเต็มที่ | ต้องดูแลเอง |

**→ Supabase ชนะที่ความเร็วในการพัฒนาและ ecosystem**

---

## 5. Database Schema (Supabase Postgres)

```sql
-- ==================== Users ====================
-- ใช้ Supabase Auth สำหรับ auth.users
-- ตารางเสริมเก็บข้อมูล profile
create table profiles (
  id uuid primary key references auth.users(id),
  phone text unique not null,
  display_name text,
  role text check (role in ('buyer','seller','both')) default 'buyer',
  avatar_url text,
  default_address jsonb,
  created_at timestamptz default now()
);

-- ==================== Sellers ====================
create table sellers (
  id uuid primary key references profiles(id),
  shop_name text not null,
  bio text,
  province text,
  district text,
  pickup_address text,
  gmaps_url text,
  rating_avg numeric(3,2) default 0,
  rating_count int default 0,
  total_listings int default 0,
  created_at timestamptz default now()
);

-- ==================== Durian Listings ====================
create table durian_listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references sellers(id) not null,
  
  -- ผลการตรวจ
  variety text not null,                   -- หมอนทอง, ชะนี, ก้านยาว, etc.
  maturity text check (maturity in ('young','medium','mature')) not null,
  maturity_score numeric(3,2),
  ripeness_score numeric(3,2),
  max_reachable_level int check (max_reachable_level in (1,2,3)),
  
  -- วันที่พยากรณ์
  level_1_date date not null,
  level_2_date date,
  level_3_date date,
  
  -- ข้อมูลขาย
  price_baht numeric(10,2) not null,
  weight_kg numeric(5,2),
  stock int default 1,                     -- จำนวนคงเหลือ
  
  -- รูป
  photo_stem_url text,
  photo_body_url text,
  photo_bottom_url text,
  
  -- AI metadata (เก็บไว้ debug)
  ai_reasoning_thai text,
  ai_indicators jsonb,
  ai_model text default 'gemini-2.5-flash',
  ai_confidence numeric(3,2),
  
  -- สถานะ
  status text check (status in ('draft','active','reserved','sold','expired')) default 'active',
  
  -- meta
  checked_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- expires อัตโนมัติเมื่อเลย level_3_date + 1 วัน (ไม่ต้องเก็บ)
create index idx_listings_active on durian_listings(status, level_2_date) 
  where status = 'active';
create index idx_listings_variety on durian_listings(variety);
create index idx_listings_seller on durian_listings(seller_id);

-- ==================== Cart ====================
create table carts (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references profiles(id) not null,
  created_at timestamptz default now(),
  unique(buyer_id)
);

create table cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references carts(id) on delete cascade,
  listing_id uuid references durian_listings(id),
  qty int default 1,
  added_at timestamptz default now(),
  unique(cart_id, listing_id)
);

-- ==================== Orders ====================
create table orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references profiles(id) not null,
  seller_id uuid references sellers(id) not null,
  
  status text check (status in (
    'pending_payment','paid','confirmed','shipped',
    'delivered','cancelled','refunded'
  )) default 'pending_payment',
  
  -- ราคา
  subtotal numeric(10,2) not null,
  shipping_fee numeric(10,2) default 0,
  total numeric(10,2) not null,
  
  -- ที่อยู่จัดส่ง
  delivery_method text check (delivery_method in ('pickup','delivery')),
  delivery_address jsonb,
  
  -- payment
  payment_method text default 'promptpay_qr',
  payment_ref text,                        -- ref จาก Omise/2C2P
  paid_at timestamptz,
  
  -- meta
  buyer_note text,
  seller_note text,
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  listing_id uuid references durian_listings(id),
  qty int default 1,
  unit_price numeric(10,2),
  -- snapshot ของ listing ตอน checkout (เพราะ listing อาจเปลี่ยน)
  snapshot jsonb
);

-- ==================== Reviews ====================
create table reviews (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) unique,
  buyer_id uuid references profiles(id),
  seller_id uuid references sellers(id),
  rating int check (rating between 1 and 5),
  comment text,
  match_check text check (match_check in ('better','match','worse')),
  -- ระบุว่าทุเรียนจริงตรงกับที่ AI บอกไหม
  created_at timestamptz default now()
);

-- ==================== RLS Policies ====================
-- ตัวอย่าง: seller แก้ listing ตัวเองได้เท่านั้น
alter table durian_listings enable row level security;
create policy "Sellers manage own listings" on durian_listings
  for all using (auth.uid() = seller_id);
create policy "Public reads active listings" on durian_listings
  for select using (status = 'active');
```

---

## 6. Pages / Screens

### Seller App (ในแอปเดียวกัน)
1. **Home** — เลือก: เช็คทุเรียน / รายการของฉัน / ยอดขาย
2. **Check Durian** — ตามเดิม (Phase 0)
3. **Submit Listing** — กรอกข้อมูลพันธุ์/ราคา/น้ำหนัก/stock + preview
4. **My Listings** — list + edit/delete + stats
5. **Order Inbox** — เห็น order ใหม่ → ยืนยัน/ปฏิเสธ
6. **Earnings Dashboard** — กราฟยอดขาย

### Buyer App
1. **Home (Browse)** — feed ของ listing ใหม่
2. **Filter Page** — date picker + variety chips + price slider + location
3. **Listing Detail** — ภาพ 3 มุม + timeline 3 ระดับ + seller info + แผนที่
4. **Cart** — รายการ + edit qty + total
5. **Checkout** — เลือก delivery + PromptPay QR
6. **Order History** — list orders + status
7. **Profile** — ที่อยู่, password, logout

---

## 7. API Endpoints (Supabase Edge Functions + RPC)

### Phase 1 essentials

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/analyze` | POST | seller | Gemini API proxy (มีอยู่แล้ว) |
| `/api/listings` | POST | seller | สร้าง listing หลัง check |
| `/api/listings` | GET | public | browse + filter |
| `/api/listings/:id` | GET | public | detail |
| `/api/listings/:id` | PATCH | seller | แก้ |
| `/api/listings/:id` | DELETE | seller | ลบ |
| `/api/cart/add` | POST | buyer | เพิ่มลงตะกร้า |
| `/api/cart` | GET | buyer | ดูตะกร้า |
| `/api/cart/:id` | DELETE | buyer | ลบ |

### Phase 2 — Payment

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/checkout` | POST | buyer | สร้าง order + PromptPay QR |
| `/api/payments/webhook` | POST | Omise | sync สถานะการชำระ |
| `/api/orders` | GET | buyer/seller | order list |
| `/api/orders/:id/confirm` | POST | seller | ยืนยัน order |

---

## 8. Auth Flow (Phone OTP)

```
1. ผู้ใช้ใส่เบอร์ → กด "รับรหัส OTP"
2. Supabase ส่ง SMS ผ่าน Twilio (หรือ provider ไทย)
3. ผู้ใช้ใส่ OTP 6 หลัก
4. Supabase verify → return JWT token
5. Frontend เก็บ session → ใช้กับทุก API call
6. ถ้า user ใหม่ → onboarding (ตั้งชื่อ, เลือก role buyer/seller/both)
```

**ตัวเลือก SMS provider ไทย:**
- Twilio (default Supabase) — ราคาสูง
- ThaiBulkSMS / ANTS — ถูกกว่า ต้อง custom edge function
- LINE LIFF (อนาคต) — Login ด้วย LINE ลื่นกว่า SMS

---

## 9. Payment Integration — PromptPay QR

### ทำไม PromptPay
- 98% ของคนไทยมี = ไม่ต้องสมัครบัตร
- ค่าธรรมเนียมต่ำ (0-0.55%)
- SME คุ้นเคย

### Provider แนะนำ

| Provider | ค่าธรรมเนียม | Pros | Cons |
|----------|-------------|------|------|
| **Omise** | 0.55% + ฿15 | API ดี, docs ครบ, รองรับ PromptPay | สมัครยากนิด |
| **2C2P** | ขึ้นกับ deal | enterprise grade | overkill ตอนแรก |
| **SCB Payment** | 0-2% | ฟรีถ้ามี SCB account | API ซับซ้อน |
| **PayPal Thai** | สูง | global | ค่าธรรมเนียมแพง |

**→ เริ่มที่ Omise**

### Flow
```
1. Buyer กด "ยืนยันการสั่งซื้อ"
2. API call → Omise create charge → return QR string
3. Frontend แสดง QR + countdown 15 นาที
4. Buyer สแกนจ่าย
5. Omise webhook → /api/payments/webhook
6. Update order status → notify seller (push/LINE)
```

---

## 10. Migration Plan

### From current Cloudflare Worker
```
Phase 0 (current)              Phase 1 (new)
├─ public/index.html       →   เป็น React component
├─ src/index.ts            →   Supabase Edge Function
├─ src/analyze.ts          →   Supabase Edge Function (Deno)
├─ wrangler.toml           →   ไม่ใช้แล้ว
                           +   Supabase project
                           +   React app (Vite)
                           +   Lovable AI scaffolding
```

### Steps
1. **สร้าง Supabase project** + apply schema ข้างบน
2. **Setup Lovable** → scaffold React app ตาม prompt
3. **Port `/api/analyze`** เป็น Supabase Edge Function (Deno) — copy code
4. **เพิ่ม submit listing flow** หลังหน้า result
5. **สร้าง browse page** + filter
6. **เพิ่ม cart + checkout**
7. **Integrate Omise**
8. **Deploy**

---

## 11. MVP Scope ที่แนะนำ (Phase 1 only)

ตัด features ที่ไม่จำเป็น เพื่อ ship เร็ว:

✅ **มี:**
- Phone OTP auth
- เช็คทุเรียน + submit listing (single seller account)
- Browse + filter (วันที่กิน + พันธุ์)
- Listing detail
- เพิ่มลงตะกร้า
- "ติดต่อผู้ขาย" (LINE/โทร — ไม่มี payment)

❌ **เลื่อนไป Phase 2:**
- Payment (ตอนแรกใช้ "นัดเจอจ่ายเงิน")
- Order tracking
- Rating
- Multi-seller dispute

**ลูกค้าสามารถจองได้ → seller โทรกลับเพื่อนัด pickup/delivery**

ความซื่อแบบนี้ทำให้ได้ traffic + feedback ก่อนเขียน payment integration ที่ใช้เวลานาน

---

## 12. Cost Estimate (เดือนแรก ที่ scale พอเริ่ม)

| รายการ | ราคา/เดือน |
|--------|-----------|
| Supabase (Pro) | $25 |
| Vercel hosting | ฟรี (Hobby) |
| Gemini API (1000 checks/วัน) | ~$50 |
| Omise (ค่าธรรมเนียมจ่ายตามยอดขาย) | 0.55% ของยอด |
| SMS OTP (Twilio, ~500 OTPs) | ~$10 |
| Domain | ~฿200/ปี |
| Sentry (Free tier) | $0 |
| **รวม** | **~฿3000 + commission** |

---

## 13. Open Questions ⚠️

ต้องตอบก่อนเริ่ม build:

1. **Multi-seller หรือ single-seller?**
   - Single = ของคุณคนเดียวขาย (เร็วกว่า)
   - Multi = หลายคนมาขายได้ (marketplace จริง, ซับซ้อนกว่า)

2. **ขอบเขตภูมิศาสตร์?**
   - กรุงเทพ + ปริมณฑลก่อน?
   - ทั่วประเทศ → ต้องมี shipping integration

3. **Tech stack: Supabase หรือ Cloudflare?**
   - Supabase = เร็วกว่า, ecosystem ดีกว่า
   - Cloudflare = ถูกกว่า แต่ต้องเขียนเองเยอะ

4. **Payment method MVP?**
   - PromptPay เลย (เพิ่มเวลา 1-2 สัปดาห์)?
   - หรือเริ่มแบบ "ติดต่อจ่ายเอง" ก่อน (ship เร็ว)?

5. **Auth provider?**
   - Phone OTP (universal)
   - หรือ LINE Login (ลื่นแต่ต้องสมัคร LINE Developer)?

---

## 14. Next Step

ถ้าตอบคำถาม section 13 แล้ว ผมจะ:
1. ปรับ MARKETPLACE.md ตาม decision
2. สร้าง Supabase schema migration file
3. เขียน Lovable prompt ที่ละเอียดสำหรับ scaffold
4. เริ่ม build Phase 1 MVP

---

**Maintained alongside README.md and style.md**
