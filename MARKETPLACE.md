# 🛒 Durian Marketplace — Scaling Roadmap

จาก **Durian Check Tool** (Phase 0 — เสร็จแล้ว) → **Durian Marketplace** (Phase 1-4)

---

## ✅ Decisions Made (Latest)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Marketplace type | **Multi-seller** | หลายร้านขายได้ — true marketplace |
| Payment provider | **Stripe** (via Lovable integration) | Native Lovable integration + รองรับ PromptPay ในไทย |
| Frontend framework | **Lovable** (React + Vite + shadcn/ui) | Scaffold marketplace UI ได้เร็ว |
| Backend | **Supabase** (Postgres + Auth + Storage + Edge Functions) | ทำงานกับ Lovable ได้ตรง ๆ |
| Tool calibration | **Implemented in Phase 0** ✓ | Device-specific baseline ทำให้แม่นกว่าทุกเครื่อง |

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
- พิมพ์สติกเกอร์ POS Handheld 58mm
- 🎚️ **Device Calibration** — บันทึก baseline เสียงเคาะของแข็ง + ของกลวง เก็บใน localStorage → ทำให้ทุกเครื่อง/ทุกไม้เคาะแม่นเท่ากัน
- หน้าตัวอย่างทดสอบ `/test-samples.html` — 9 SVG illustrations 3 use cases

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

### Confirmed (Phase 1+)

**Stack: Lovable + Supabase + Stripe**

| Layer | Technology | ทำไม |
|-------|-----------|------|
| Frontend | **Lovable** (React + Vite + TypeScript + Tailwind + shadcn/ui) | AI scaffold เร็ว, design system ตรง style.md |
| Auth | **Supabase Auth** (Phone OTP) | ไม่ต้องเขียน OTP เอง, Lovable native integration |
| Database | **Supabase Postgres** | relational ตอบโจทย์ marketplace ดี |
| Storage | **Supabase Storage** | เก็บภาพทุเรียน |
| Realtime | **Supabase Realtime** | cart sync, order status push |
| Edge Functions | **Supabase Edge Functions** (Deno) | Gemini proxy + Stripe webhook |
| Payment | **Stripe** (PromptPay + cards) | Lovable native integration ([docs](https://docs.lovable.dev/integrations/stripe)), รองรับ PromptPay ในไทย |
| Hosting | **Lovable hosted** (or export → Vercel/CF Pages) | One-click deploy |
| Monitoring | **Sentry** (free tier) | error tracking |

### ทำไมเลือก Stripe (ไม่ใช่ Omise/2C2P)

- ✅ **Lovable มี native Stripe integration** → เขียนน้อยกว่ามาก
- ✅ Stripe **รองรับ PromptPay** ใน Thailand แล้ว (เป็น payment method ในตัว)
- ✅ รองรับบัตร credit/debit ด้วย → ลูกค้าทั่วไปจ่ายง่ายขึ้น
- ✅ Dashboard + analytics ของ Stripe ดีกว่า provider ไทยส่วนใหญ่
- ⚠️ ค่าธรรมเนียมสูงกว่าเล็กน้อย (3.65% + 10฿ vs Omise 0.55% + 15฿) — แลกกับ developer experience และ feature ครบ

### Alternatives ที่ตัดทิ้ง

| Stack | ทำไมไม่เลือก |
|-------|-------------|
| Cloudflare D1 + R2 (stay) | Ecosystem น้อย, ทำ marketplace ช้ากว่า, ไม่มี native Lovable support |
| Firebase | ไม่ใช่ SQL → join ลำบาก, lock-in สูง |
| Next.js + own Postgres | ต้อง maintain server เอง, ช้าตอนเริ่ม |
| Omise (เคยพิจารณา) | ไม่มี native Lovable integration, ต้องเขียน webhook + UI เอง |

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
  
  -- Stripe Connect (multi-seller payout)
  stripe_account_id text unique,           -- 'acct_...' from Stripe Connect
  stripe_onboarding_complete boolean default false,
  stripe_payouts_enabled boolean default false,
  commission_rate numeric(4,3) default 0.05,  -- platform เก็บ 5% default
  
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
  
  -- ============ รูป (สำคัญ — แสดงในร้าน) ============
  -- 3 ภาพจากการตรวจ (เก็บไว้ทุกใบ ห้ามลบ — ใช้ AI re-check ใน Phase 3)
  photo_stem_url text not null,            -- ภาพขั้ว (สำหรับ detail page + AI verify)
  photo_body_url text not null,            -- ภาพเปลือกด้านข้าง = ภาพหลัก/ภาพหน้าร้าน
  photo_bottom_url text not null,          -- ภาพก้น (สำหรับ detail page + AI verify)
  
  -- ภาพหลักที่แสดงในร้าน (default = body, seller เปลี่ยนได้)
  cover_photo_url text generated always as (photo_body_url) stored,
  
  -- Thumbnail สำหรับ grid view (resize 400px, สร้างด้วย Supabase Storage transformation)
  thumbnail_url text,
  
  -- ภาพเพิ่มเติมจาก seller (เช่น ภาพเนื้อในหลังผ่า, ภาพ packaging) — optional
  extra_photos text[] default '{}',
  
  -- AI metadata (เก็บไว้ debug + Phase 3 re-check)
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
  
  -- payment (Stripe)
  payment_method text check (payment_method in ('promptpay','card','transfer')),
  stripe_session_id text,                  -- 'cs_...' Stripe Checkout Session
  stripe_payment_intent_id text,           -- 'pi_...' Stripe PaymentIntent
  stripe_transfer_id text,                 -- 'tr_...' transfer ไป seller (Connect)
  application_fee_amount numeric(10,2),    -- platform commission ที่เก็บไว้
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

## 5.5 Image Storage Strategy 📸

ภาพทุเรียนเป็นหัวใจของ marketplace — ลูกค้าตัดสินใจซื้อจากภาพเป็นอันดับแรก ระบบต้องเก็บไว้แม่นยำและแสดงเร็ว

### หลักการ
1. **ภาพ Body = ภาพหลัก (cover)** — แสดงในหน้า browse/shop
   - เพราะเป็นมุมที่เห็นทั้งลูก ดูเป็น "ทุเรียน" ชัดเจน
   - ภาพ stem/bottom เน้น quality verification ไม่ใช่ marketing
2. **เก็บทั้ง 3 ภาพ ห้ามลบ** — ใช้ตอนลูกค้าดู detail + Phase 3 AI re-check
3. **CDN delivery** — Supabase Storage มี CDN built-in
4. **Optimize ก่อน upload** — resize client-side, ลด bandwidth

### Supabase Storage Buckets

```
durian-photos/                          (public read, authenticated write)
  └─ {seller_id}/
       └─ {listing_id}/
            ├─ stem.jpg                 (original ~1280px, quality 80%)
            ├─ body.jpg                 (original ~1280px, quality 80%)
            ├─ bottom.jpg               (original ~1280px, quality 80%)
            └─ extra-{n}.jpg            (optional — seller upload เพิ่ม)

durian-thumbnails/                      (public read, server-write only)
  └─ {listing_id}/
       ├─ cover-400.jpg                 (400px thumbnail of body)
       ├─ cover-800.jpg                 (800px medium for detail card)
       └─ gallery-{stem,body,bottom}-600.jpg  (600px gallery view)
```

### Image Pipeline

```
[Phone Camera 1920×1440]
        │
        ▼  client-side canvas resize + compress
[Optimized 1280×960 JPEG 80%]
        │
        ▼  POST /api/upload-photo (Edge Function)
[Supabase Storage: durian-photos/{seller}/{listing}/body.jpg]
        │
        ▼  trigger generates thumbnails
[durian-thumbnails/{listing}/cover-400.jpg]
[durian-thumbnails/{listing}/cover-800.jpg]
        │
        ▼  URLs saved in durian_listings table
[photo_body_url + thumbnail_url]
        │
        ▼  serve via CDN
[Marketplace cards display thumbnail; detail page loads full]
```

### Client-Side Image Optimization (ก่อน upload)

```typescript
async function optimizeImage(file: File, maxDim = 1280, quality = 0.8): Promise<Blob> {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise(r => img.onload = r);
  
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);
  
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
  
  return new Promise(resolve => canvas.toBlob(
    blob => resolve(blob!),
    'image/jpeg',
    quality
  ));
}
```

### Thumbnail Generation (server-side)

ทางเลือก:

**Option A — Supabase Storage Transformations** (แนะนำ Phase 1)
```typescript
// On-the-fly resize via URL params
const thumbUrl = supabase.storage
  .from('durian-photos')
  .getPublicUrl(`${seller}/${listing}/body.jpg`, {
    transform: { width: 400, quality: 80 }
  }).data.publicUrl;
// → ?width=400&quality=80 — Supabase handles caching
```

**Option B — Cloudflare Workers Image Resizing** (Phase 2 ถ้า scale)
- ผ่าน Cloudflare → variants + caching ที่ edge

**Option C — pgmq + worker job** (overkill ตอนแรก)

### Upload Flow (Frontend)

```typescript
async function submitListing(checkResult, listingData) {
  // 1. Create listing record (status: draft)
  const { data: listing } = await supabase
    .from('durian_listings')
    .insert({ ...listingData, status: 'draft' })
    .select().single();
  
  // 2. Optimize + upload 3 photos in parallel
  const uploads = ['stem', 'body', 'bottom'].map(async key => {
    const blob = await optimizeImage(checkResult.photos[key]);
    const path = `${user.id}/${listing.id}/${key}.jpg`;
    await supabase.storage
      .from('durian-photos')
      .upload(path, blob, { contentType: 'image/jpeg', upsert: true });
    return supabase.storage.from('durian-photos').getPublicUrl(path).data.publicUrl;
  });
  const [stemUrl, bodyUrl, bottomUrl] = await Promise.all(uploads);
  
  // 3. Generate thumbnail URL (Supabase transformation)
  const thumbUrl = supabase.storage
    .from('durian-photos')
    .getPublicUrl(`${user.id}/${listing.id}/body.jpg`, {
      transform: { width: 400, quality: 80 }
    }).data.publicUrl;
  
  // 4. Update listing with photo URLs + activate
  await supabase.from('durian_listings').update({
    photo_stem_url: stemUrl,
    photo_body_url: bodyUrl,
    photo_bottom_url: bottomUrl,
    thumbnail_url: thumbUrl,
    status: 'active'
  }).eq('id', listing.id);
}
```

### Display Patterns

**Marketplace Browse (grid cards):**
```tsx
<img 
  src={listing.thumbnail_url}        // 400px webp via Supabase CDN
  loading="lazy"
  alt={listing.variety}
  className="aspect-square object-cover rounded-lg"
/>
```

**Listing Detail (gallery):**
```tsx
<Swiper>
  <SwiperSlide>
    <img src={photo_body_url} alt="เปลือก" />     {/* default = body first */}
    <Badge>ภาพหลัก</Badge>
  </SwiperSlide>
  <SwiperSlide>
    <img src={photo_stem_url} alt="ขั้ว" />
    <Badge>🌱 ขั้ว</Badge>
  </SwiperSlide>
  <SwiperSlide>
    <img src={photo_bottom_url} alt="ก้น" />
    <Badge>⭐ ก้น</Badge>
  </SwiperSlide>
  {extra_photos.map(url => <SwiperSlide><img src={url} /></SwiperSlide>)}
</Swiper>
```

### Storage Costs (Supabase Pro)

| ปริมาณ | ขนาดประมาณ | ราคา/เดือน |
|--------|-----------|-----------|
| Storage 100GB included | ~30,000 listings × 3 photos | included |
| เกินจาก 100GB | $0.021/GB | คิดต่อ |
| Egress (CDN) 250GB included | ~2M page views | included |
| เกิน egress | $0.09/GB | |

**Estimate**: SME 10 ร้าน × 50 listings/วัน × 30 วัน = 15,000 listings/เดือน × 3 photos × ~200KB = **~9GB/เดือน** — รวมสะสมทั้งปี ~108GB → เกิน free tier ปีหน้า

### Image Retention Policy

| สถานะ Listing | เก็บภาพ |
|--------------|--------|
| Active / Reserved | เก็บใน Storage |
| Sold | เก็บ 90 วัน (สำหรับ rating + dispute) → ย้ายไป cold storage |
| Expired (เลย level_3_date) | เก็บ 30 วัน → ลบทั้งหมด |
| Deleted by seller | ลบใน 7 วัน (grace period) |

ทำผ่าน Supabase cron jobs + Edge Function

### Privacy & Moderation

- ✅ ภาพมีแต่ทุเรียน — **ไม่มี PII** ปล่อย public CDN ได้
- ✅ ห้ามมีคน/ใบหน้าในภาพ — moderate ด้วย Gemini เมื่อ upload (Phase 2)
- ⚠️ Watermark? — ตอนแรกไม่ใส่ ถ้ามีปัญหา crop/reupload ค่อยใส่

---

## 6. Pages / Screens

### Seller App (ในแอปเดียวกัน)
1. **Home** — เลือก: เช็คทุเรียน / รายการของฉัน / ยอดขาย
2. **Check Durian** — ตามเดิม (Phase 0) — 3 ภาพ + เสียงเคาะ
3. **Submit Listing** — preview 3 ภาพ + กรอกข้อมูลพันธุ์/ราคา/น้ำหนัก/stock
   - **Cover photo selector**: default ใช้ body, seller เลือกเปลี่ยนได้
   - เพิ่มภาพเสริม (extra_photos) — เช่น ภาพเนื้อในหลังผ่าทดสอบ, packaging
   - แสดง preview ของ marketplace card ให้ seller ดูก่อน publish
4. **My Listings** — list (พร้อม thumbnail) + edit/delete + stats
5. **Order Inbox** — เห็น order ใหม่ (พร้อม thumbnail) → ยืนยัน/ปฏิเสธ
6. **Earnings Dashboard** — กราฟยอดขาย + Stripe payouts

### Buyer App
1. **Home (Browse)** — feed grid ของ listing
   - แต่ละ card: **ภาพ body (cover)** + variety + ราคา + วันที่ระดับ 2
   - thumbnail 400px lazy-load
2. **Filter Page** — date picker + variety chips + price slider + location
3. **Listing Detail**
   - **Image gallery (swiper)**: body (default) → stem → bottom → extras
   - แต่ละภาพมี badge บอกมุม (🌱 ขั้ว / 🥭 เปลือก / ⭐ ก้น)
   - Tap ภาพ → full screen zoom
   - Timeline 3 ระดับ + seller info + แผนที่
4. **Cart** — รายการ + thumbnail แต่ละ item + edit qty + total
5. **Checkout** — เลือก delivery + Stripe Checkout (PromptPay/card)
6. **Order History** — list orders พร้อม thumbnail ของแต่ละ item
7. **Profile** — ที่อยู่, password, logout

---

## 7. API Endpoints (Supabase Edge Functions + RPC)

### Phase 1 essentials

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/analyze` | POST | seller | Gemini API proxy (มีอยู่แล้ว) |
| `/api/listings` | POST | seller | สร้าง listing (รับ url ของ 3 ภาพหลัง upload เสร็จ) |
| `/api/listings` | GET | public | browse + filter (return thumbnail_url) |
| `/api/listings/:id` | GET | public | detail (return ทั้ง 3 photos + extras) |
| `/api/listings/:id` | PATCH | seller | แก้ (รวมถึงเปลี่ยน cover photo) |
| `/api/listings/:id` | DELETE | seller | ลบ (trigger ลบไฟล์ใน Storage) |
| `/api/listings/:id/photos` | POST | seller | upload ภาพเสริม (extra_photos) |
| `/api/listings/:id/cover` | PATCH | seller | เปลี่ยน cover photo |
| `/api/cart/add` | POST | buyer | เพิ่มลงตะกร้า |
| `/api/cart` | GET | buyer | ดูตะกร้า (รวม thumbnail) |
| `/api/cart/:id` | DELETE | buyer | ลบ |

**Image upload**: ใช้ Supabase Storage SDK โดยตรงจาก client (ไม่ผ่าน Edge Function — ลด latency + cost)
- RLS policy บน bucket จำกัดให้ upload ได้แค่ folder ของตัวเอง
- File size limit 5MB/ภาพ
- MIME type whitelist: `image/jpeg`, `image/webp`

### Phase 2 — Payment

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/checkout` | POST | buyer | สร้าง order + PromptPay QR |
| `/api/payments/webhook` | POST | Omise | sync สถานะการชำระ |
| `/api/orders` | GET | buyer/seller | order list |
| `/api/orders/:id/confirm` | POST | seller | ยืนยัน order |

---

## 8. Auth Flow (Phone OTP — Mockup ใน MVP)

> **🚫 MVP ไม่ส่ง SMS จริง** — ใช้ mockup OTP เพื่อ ship เร็ว ลดต้นทุน และเทสง่าย
> SMS integration จริงเลื่อนไป Phase 2/3 หลัง validate user behavior แล้ว

### MVP Mockup OTP Flow

```
1. ผู้ใช้ใส่เบอร์ → กด "รับรหัส OTP"
2. Edge Function สร้าง 6 หลัก สุ่ม → เก็บใน DB (otp_codes table)
   ⚡ ไม่ส่ง SMS — แค่ return ในการตอบกลับ API หรือ log ใน console
3. UI แสดง OTP ให้เห็นในหน้าจอ (development banner สีเหลือง)
   หรือใช้ universal test code "123456" ตอน development
4. ผู้ใช้ใส่ OTP 6 หลัก → verify
5. ถ้าถูก → Supabase create session → return JWT
6. ถ้า user ใหม่ → onboarding (ตั้งชื่อ, เลือก role buyer/seller/both)
```

### Mockup Implementation

**Option A — Universal test code** (ง่ายสุด)
```typescript
const MOCK_OTP = '123456';  // ทุกเบอร์ใช้ code นี้

async function sendOtp(phone: string) {
  // ไม่ส่ง SMS — แค่ log + return ok
  console.log(`[MOCK] OTP for ${phone}: ${MOCK_OTP}`);
  return { ok: true, debugOtp: MOCK_OTP };  // debugOtp แสดงใน UI ตอน dev
}

async function verifyOtp(phone: string, code: string) {
  if (code !== MOCK_OTP) throw new Error('รหัส OTP ไม่ถูกต้อง');
  return await supabase.auth.signInWithOtp({ phone, options: { skipVerification: true } });
}
```

**Option B — Random code แสดงในหน้าจอ** (สมจริงขึ้น)
```typescript
async function sendOtp(phone: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await supabase.from('otp_codes').insert({ phone, code, expires_at: new Date(Date.now() + 5*60*1000) });
  return { ok: true, debugOtp: code };  // ⚠️ remove debugOtp ตอน production!
}
```

UI:
```tsx
{import.meta.env.DEV && debugOtp && (
  <div className="bg-yellow-100 border-2 border-yellow-400 p-3 rounded-lg">
    🔧 <b>DEV MODE</b>: OTP คือ <code>{debugOtp}</code>
  </div>
)}
```

### Database table (mockup OTP)

```sql
create table otp_codes (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  code text not null,
  attempts int default 0,
  verified boolean default false,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

create index idx_otp_phone on otp_codes(phone) where verified = false;
```

### Migration to Real SMS (Phase 2+)

เมื่อ validate แล้วว่า user behavior ดี ค่อย integrate SMS provider จริง:

| Provider | ราคา/SMS | Notes |
|----------|---------|-------|
| **Twilio** | ~$0.045 (~฿1.6) | Supabase default, setup ง่าย |
| **ThaiBulkSMS** | ~฿0.30 | ถูกที่สุด ต้อง custom edge function |
| **ANTS** | ~฿0.35 | Provider ไทย, support ดี |
| **LINE LIFF** | ฟรี | ลื่นที่สุดถ้าลูกค้ามี LINE — ต้องสมัคร LINE Developer |

**Plan**: เริ่ม ThaiBulkSMS (ถูก) → ถ้า scale เพิ่ม LINE LIFF เป็น primary

### ข้อดีของการใช้ Mockup ใน MVP

- ✅ ลดต้นทุน $50-100/เดือนใน period validate
- ✅ Demo ให้ stakeholder ดูได้โดยไม่ต้องใช้เบอร์จริง
- ✅ Onboard tester/seller รุ่นแรกได้เร็ว
- ✅ ไม่ต้องผ่าน carrier verification (Twilio ในไทยต้อง verify sender ID นาน)
- ✅ Test edge cases (OTP หมดเวลา, ลอง wrong code 3 ครั้ง, etc.) ง่ายมาก

### ⚠️ ข้อควรระวัง

- 🚫 **ห้าม deploy mockup ขึ้น production จริง** — ใส่ env flag `DISABLE_MOCK_OTP=true` บน production
- 🚫 ห้ามแสดง `debugOtp` ใน UI production — wrap ด้วย `import.meta.env.DEV` หรือ feature flag
- ✅ ตอน switch ไป real SMS ให้เก็บ mockup code path ไว้ใต้ feature flag — fallback ตอน SMS service down ได้

---

## 9. Payment Integration — Stripe (via Lovable)

### ทำไม Stripe
- ✅ **Lovable native integration** → setup ใน dashboard ไม่ต้องเขียน webhook เอง
- ✅ รองรับ **PromptPay** ในไทย (~98% ของคนไทยจ่ายได้)
- ✅ รองรับบัตร credit/debit (ลูกค้า walk-in ใช้ง่าย)
- ✅ Stripe Dashboard ดี analytics ครบ
- ✅ ทดสอบง่ายด้วย test mode

### Lovable + Stripe Setup

ดู: https://docs.lovable.dev/integrations/stripe

**ขั้นตอน:**
1. สมัคร Stripe account (https://stripe.com)
2. เปิด PromptPay ใน Stripe Dashboard → **Settings → Payment methods → PromptPay** (Thailand)
3. ใน Lovable: **Settings → Integrations → Stripe → Connect**
4. Paste **Stripe Secret Key** + **Publishable Key**
5. Lovable จะ generate:
   - `/api/checkout-session` Edge Function
   - Stripe webhook handler
   - Frontend `<StripeCheckout />` component
6. Configure products/pricing (หรือใช้ dynamic pricing จาก listing)

### Payment Flow

```
1. Buyer กด "ชำระเงิน" ใน cart
2. Frontend → Supabase Edge Function /api/checkout-session
3. Edge Function → Stripe API create Checkout Session
   - line_items: cart items snapshot
   - payment_method_types: ['promptpay', 'card']
   - success_url + cancel_url
4. Return session URL → Frontend redirect
5. Buyer เลือก PromptPay → Stripe แสดง QR → สแกนจ่าย
   (หรือเลือกบัตร → ใส่ข้อมูลบัตร)
6. Stripe webhook → /api/stripe-webhook (Edge Function)
   - event: checkout.session.completed
   - update order status → paid
   - notify seller (LINE Notify หรือ push)
7. Buyer redirect กลับ success_url → ดู order summary
```

### Stripe Fees (Thailand, 2026)

| Method | ค่าธรรมเนียม |
|--------|-------------|
| PromptPay | 1.65% + ฿10 |
| บัตรในประเทศ | 3.65% + ฿10 |
| บัตรต่างประเทศ | 4.4% + ฿10 |
| Stripe Connect (ถ้าใช้ multi-seller payout) | +0.25% + ฿7 per transfer |

**ตัวอย่าง:** ทุเรียน 500 บาท จ่าย PromptPay → fee ~฿18.25 (~3.65% effective)
ลด fee ได้ถ้า volume สูง — ติดต่อ Stripe sales

### Multi-seller Payout (Stripe Connect)

เพราะเลือก multi-seller marketplace → ต้องใช้ **Stripe Connect** สำหรับจ่ายเงินให้ seller แต่ละราย:

- **Connect Standard**: seller มี Stripe account ของตัวเอง — เรา onboard ผ่าน Connect
- **Connect Express**: Stripe จัดการทุกอย่าง, seller รับเงินผ่าน Stripe-hosted dashboard
- **Connect Custom**: ของเราคุมเต็มที่ (ซับซ้อนกว่า)

**→ เริ่มที่ Connect Express** — เร็ว, compliance น้อยกว่า

Platform เก็บ **commission %** จาก seller (เช่น 5-10%) — กำหนดใน `application_fee_amount` ของแต่ละ transaction

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
2. **Setup Supabase Storage** — สร้าง buckets `durian-photos` + `durian-thumbnails` พร้อม RLS policies
3. **Setup Lovable** → scaffold React app ตาม prompt
4. **Port `/api/analyze`** เป็น Supabase Edge Function (Deno) — copy code จาก src/analyze.ts
5. **เพิ่ม image optimization helper** (resize 1280px + JPEG 80% ก่อน upload)
6. **เพิ่ม submit listing flow** หลังหน้า result:
   - Upload 3 ภาพไป Supabase Storage
   - Generate thumbnail URL (Storage transformation)
   - Save listing record
7. **สร้าง browse page** + filter — แสดง body photo เป็น cover
8. **สร้าง detail page** + image gallery (swiper) — แสดงทั้ง 3 มุม
9. **เพิ่ม cart + checkout** (Stripe Checkout Session)
10. **Stripe webhook** สำหรับ payment confirmation
11. **Deploy** (Lovable hosted หรือ export → Vercel)

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

## 12. Cost Estimate

### MVP (1-3 เดือนแรก) — Mockup OTP, ทดสอบ market

| รายการ | ราคา/เดือน | หมายเหตุ |
|--------|-----------|---------|
| Supabase Pro | $25 (~฿900) | DB + Storage 100GB + Auth + 500K edge fn calls |
| Lovable (Pro) | $25 (~฿900) | scaffold + hosting + AI iteration |
| Gemini API | ~$50 (~฿1,800) | 1000 checks/วัน, Flash 2.5 |
| Stripe fees | จ่ายตามยอด | 1.65% + ฿10 PromptPay, 3.65% + ฿10 บัตร |
| SMS OTP | **$0** | ใช้ mockup ใน MVP ✓ |
| Image storage | included | 100GB Supabase free tier (เพียงพอ ~3 เดือน) |
| Domain | ~฿200/ปี | .com หรือ .co.th |
| Sentry | $0 | Free tier 5K events/เดือน |
| **รวม MVP** | **~฿3,600/เดือน** | + commission ตามยอดขาย |

### Phase 2-3 (หลัง validate, scale)

| รายการ | ราคา/เดือน |
|--------|-----------|
| Supabase Pro + extra storage | $35-50 |
| Lovable Pro | $25 |
| Gemini API (5000 checks/วัน) | ~$250 |
| Real SMS (ThaiBulkSMS, 2000 OTP) | ~฿600 |
| Image storage เกิน 100GB | +$0.021/GB → ~$5-15 |
| Cloudflare CDN (ถ้า egress สูง) | $0-20 |
| **รวม Scale** | **~฿15,000-20,000/เดือน** |

### Revenue Model (ถ้า commission 8%)

| ยอดขาย/เดือน | Commission | กำไรหลังหัก Stripe |
|--------------|-----------|-------------------|
| ฿100,000 | ฿8,000 | ~฿5,150 (หัก Stripe ~3.65%) |
| ฿500,000 | ฿40,000 | ~฿25,750 |
| ฿1,000,000 | ฿80,000 | ~฿51,500 |

**Break-even**: ยอดขายประมาณ **฿70,000/เดือน** (MVP cost recovery)

---

## 13. Open Questions ⚠️

### ✅ Decided
- ✅ **Marketplace type**: Multi-seller — schema รองรับแล้ว (sellers table + Stripe Connect)
- ✅ **Tech stack**: Lovable + Supabase + Stripe
- ✅ **Payment provider**: Stripe (PromptPay + บัตร) ผ่าน Lovable native integration

### ❓ ยังต้องตอบ

1. **Phase 1 MVP scope?**
   - [ ] **A** — Browse + Filter only (ลูกค้าจอง → seller โทรกลับ, ไม่มี cart/payment) → ship ใน **1-2 สัปดาห์**
   - [ ] **B** — Browse + Cart + Order (ไม่มี payment, จ่ายเงิน offline) → ship ใน **2-3 สัปดาห์**
   - [ ] **C** — Full e-commerce (Browse + Cart + Stripe payment + Order tracking) → ship ใน **4-6 สัปดาห์**
   - **แนะนำ A** เพื่อ ship เร็ว, ได้ feedback ก่อน build payment ที่ซับซ้อน

2. **ขอบเขตภูมิศาสตร์ตอน MVP?**
   - [ ] กรุงเทพ + ปริมณฑล (pickup เน้น)
   - [ ] ทั่วประเทศ (ต้องมี shipping API)
   - **แนะนำ pickup-first** — ตัด shipping integration ไป Phase 3

3. **Auth method?**
   - [ ] Phone OTP (Supabase Auth + Twilio/ThaiBulkSMS) — universal
   - [ ] LINE Login (LIFF) — UX ดีกว่าแต่ต้องสมัคร LINE Developer + verification
   - **แนะนำ Phone OTP ตอน MVP**, เพิ่ม LINE Login ใน Phase 3

4. **Commission rate ตอนเริ่ม?**
   - 5% — มาตรฐานต่ำ ดึงดูด seller
   - 10% — มาตรฐานทั่วไป (Shopee 6-8% / Lazada 5-10%)
   - 0% — promotional 3 เดือนแรก แล้วค่อยเก็บ
   - **แนะนำ 0% 3 เดือนแรก → 8%** เพื่อ onboarding seller ตอนเริ่ม

5. **Seller verification ตอน onboard?**
   - แค่เบอร์โทร + ชื่อร้าน (เร็ว)
   - + บัตรประชาชน + ที่อยู่ (กันโกง)
   - + ทะเบียนการค้า (formal)
   - **แนะนำ tier system**: เริ่มแค่เบอร์ → verified badge เพิ่มเติมถ้าส่งเอกสาร

---

## 14. Next Step

ถ้าตอบคำถาม section 13 แล้ว ผมจะ:
1. ปรับ MARKETPLACE.md ตาม decision
2. สร้าง Supabase schema migration file
3. เขียน Lovable prompt ที่ละเอียดสำหรับ scaffold
4. เริ่ม build Phase 1 MVP

---

**Maintained alongside README.md and style.md**
