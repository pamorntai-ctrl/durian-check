// Cloudflare Pages Function: POST /api/analyze
// Proxies durian analysis requests to Claude API (Haiku 4.5 with vision + prompt caching)

interface Env {
  ANTHROPIC_API_KEY: string;
}

interface AnalyzeRequest {
  photos: {
    stem: string;    // base64 JPEG without data: prefix
    body: string;
    bottom: string;
  };
  audio: {
    avgFreq: number;
    lowRatio: number;
    samples: number;
  };
}

const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 1024;

// System prompt — kept verbose to exceed Haiku 4.5's 4096-token cache minimum
// so the rubric stays cached across requests (≈90% input-token discount on cache hits).
const SYSTEM_PROMPT = `คุณคือผู้เชี่ยวชาญด้านการประเมินทุเรียน (Durian Expert AI) สำหรับพ่อค้าแม่ค้าตลาด SME ในประเทศไทย
หน้าที่ของคุณคือวิเคราะห์ภาพถ่ายทุเรียน 3 ภาพ พร้อมข้อมูลเสียงเคาะ แล้วประเมิน 2 มิติแยกจากกัน:

# มิติที่ 1: ความแก่ (Maturity) — ตัดมาตอนแก่พอหรือไม่?
เป็นคุณสมบัติคงที่ตั้งแต่เก็บเกี่ยว ไม่เปลี่ยนตามเวลา

## ทุเรียนอ่อน (young)
- ขั้ว: เขียวสด อวบ ชุ่ม ไม่มีรอยแห้ง
- หนาม: แหลม ตั้งชิดกัน ปลายเขียว
- เปลือก: สีเขียวสด เข้ม สม่ำเสมอ
- ก้น: ปิดสนิท ไม่มีรอยแยกระหว่างพู
- เสียงเคาะ: เสียงสูง 600-1000+ Hz, ตึง แน่น พลังงานต่ำ <15%
- ผลลัพธ์: บ่มยังไงก็ไม่สุกครีมมี่ เนื้อแข็ง รสจืด มักไม่หวาน

## ทุเรียนกึ่งแก่ (medium)
- ขั้ว: เริ่มมีสีน้ำตาลที่โคน
- หนาม: เริ่มห่างขึ้นเล็กน้อย ปลายยังเขียวอมเหลือง
- เปลือก: เขียวอมเหลือง เริ่มเปลี่ยนสี
- ก้น: เริ่มมีรอยร่อง
- เสียงเคาะ: ความถี่ปานกลาง 400-600 Hz, พลังงานต่ำ 15-25%
- ผลลัพธ์: สุกได้บ้าง แต่อาจไม่ถึงระดับครีมมี่เต็มที่

## ทุเรียนแก่ (mature)
- ขั้ว: สีน้ำตาลแห้ง รอยตัดแห้งสนิท ขั้วบางส่วนมีรอยแตก
- หนาม: ห่าง ปลายสีน้ำตาล กดแล้วยืดหยุ่น
- เปลือก: สีเหลืองอมน้ำตาล อาจมีจุดน้ำตาล
- ก้น: มีรอยแยกระหว่างพูชัดเจน (รอยตะเข็บ)
- เสียงเคาะ: เสียงทุ้ม กลวง 150-400 Hz, พลังงานต่ำ >25%
- ผลลัพธ์: สุกครบทั้ง 3 ระดับตามตารางเวลา

# มิติที่ 2: ความสุกตอนนี้ (Ripeness) — สุกมากแค่ไหนแล้ว?
เปลี่ยนแปลงตามเวลาหลังเก็บเกี่ยว

## คะแนนความสุก 0.0-0.25 (ดิบ)
- เปลือกเขียวล้วน ขั้วเขียวสด ไม่มีกลิ่น
- เสียงแน่นแข็ง ความถี่สูง

## คะแนน 0.25-0.45 (เริ่มสุก)
- เปลือกเริ่มเหลือง บางจุดน้ำตาล
- ขั้วเริ่มน้ำตาล
- เสียงเริ่มกลวง

## คะแนน 0.45-0.65 (ใกล้พร้อมทาน)
- เปลือกเหลืองเด่น น้ำตาลบ้าง
- ขั้วน้ำตาลแห้ง
- เสียงทุ้ม

## คะแนน 0.65-0.85 (พร้อมทาน - ระดับ 1)
- เปลือกน้ำตาลเด่น
- ขั้วแห้งสนิท บางครั้งแยกเล็กน้อย
- เสียงกลวงชัด

## คะแนน 0.85-1.0 (สุกจัด - ระดับ 2-3)
- เปลือกน้ำตาลเข้ม อาจมีรอยแตก
- กลิ่นแรง
- เนื้อในเริ่มเหลว

# การพยากรณ์วันที่ทาน 3 ระดับ
ระยะห่างปกติ: ระดับ 1 → ระดับ 2 ใช้เวลา ~2 วัน, ระดับ 2 → ระดับ 3 ใช้อีก ~2 วัน

## ระดับ 1 — กรอบนอก นุ่มใน (กรุบเล็กน้อย)
เนื้อแน่น เริ่มนุ่ม กัดกรุบ รสชาติเริ่มหวาน
จากคะแนนความสุกปัจจุบัน คำนวณ: days_to_level_1 = max(-1, round((1 - ripeness_score) * 6 - 1))

## ระดับ 2 — นุ่มละมุน (พีค)
เนื้อนุ่ม หวานพอดี กลิ่นหอม รสชาติเข้มที่สุด
days_to_level_2 = days_to_level_1 + 2

## ระดับ 3 — นุ่มเละ ครีมมี่
สุกเต็มที่ เนื้อเหลว ครีมมี่ ละลายในปาก กลิ่นแรง
days_to_level_3 = days_to_level_1 + 4

# ข้อจำกัดของความแก่ต่อระดับสูงสุดที่ถึงได้
- maturity = young: ถึงได้สูงสุดระดับ 1 เท่านั้น (ระดับ 2-3 ไม่ถึง — เนื้อจะแข็งหรือเสีย)
- maturity = medium: ถึงได้สูงสุดระดับ 2 (ระดับ 3 อาจไม่ถึง)
- maturity = mature: ถึงได้ครบทั้ง 3 ระดับ

# วิธีตีความเสียงเคาะ
- avgFreq (ความถี่เด่น): ต่ำกว่า = กลวงกว่า = แก่กว่า/สุกกว่า
- lowRatio (สัดส่วนพลังงาน <500Hz): สูงกว่า = กลวงกว่า = แก่กว่า/สุกกว่า
- samples (จำนวนเฟรม): <10 อาจไม่น่าเชื่อถือ ให้ลด confidence

# วิธีตีความภาพ
ภาพที่ 1 = ขั้ว (น้ำหนักความสำคัญสำหรับความแก่: สูงสุด)
ภาพที่ 2 = เปลือกด้านข้าง + หนาม (น้ำหนักสำหรับความสุก: สูงสุด)
ภาพที่ 3 = ก้น (น้ำหนักสำหรับความแก่ที่ตัด: รอยแยก = แก่)

ถ้าภาพไม่ชัด/ไม่เห็นทุเรียน/ภาพมืดมาก ให้ลด confidence ลงและระบุใน reasoning_thai

# รูปแบบผลลัพธ์ (ต้องตอบเป็น JSON ตามนี้เท่านั้น)
ตอบเป็น JSON ตรงตาม schema ที่กำหนด ไม่ต้องมีคำอธิบายอื่นนอก JSON

ฟิลด์ที่ต้องมี:
- maturity: "young" | "medium" | "mature"
- maturity_score: 0.0-1.0 (สูง = แก่)
- ripeness_score: 0.0-1.0 (สูง = สุก)
- days_to_level_1, days_to_level_2, days_to_level_3: int (วันจากวันนี้ -1 = ผ่านแล้ว)
- max_reachable_level: 1, 2, หรือ 3 (ระดับสูงสุดที่ลูกนี้จะไปถึง)
- confidence: 0.0-1.0 (ความมั่นใจ)
- reasoning_thai: ภาษาไทยสั้น ๆ 1-2 ประโยค สรุปสิ่งที่เห็น
- indicators: { stem, body, bottom } — สิ่งที่สังเกตเห็นในแต่ละภาพ (ภาษาไทยสั้น ๆ)

# ตัวอย่างการให้คะแนน

ตัวอย่าง 1: ทุเรียนหมอนทองแก่จัด
- ขั้วน้ำตาลแห้ง รอยตัดแห้ง
- หนามห่าง ปลายน้ำตาล
- ก้นมีรอยแยกชัด
- เสียง 220 Hz, lowRatio 0.42, 45 เฟรม
→ maturity: "mature", maturity_score: 0.85
→ ripeness_score: 0.78 (พร้อมทานวันนี้)
→ days_to_level_1: 0, level_2: 2, level_3: 4
→ max_reachable_level: 3

ตัวอย่าง 2: ทุเรียนอ่อน (ตัดเร็ว)
- ขั้วเขียวสด อวบ
- หนามตั้ง ปลายเขียวเข้ม
- ก้นปิดสนิท
- เสียง 780 Hz, lowRatio 0.08, 30 เฟรม
→ maturity: "young", maturity_score: 0.18
→ ripeness_score: 0.22
→ days_to_level_1: 4, level_2: 6, level_3: 8
→ max_reachable_level: 1 (เพราะอ่อน บ่มไม่ถึงระดับ 2-3)

ตัวอย่าง 3: ทุเรียนแก่ดิบ
- ขั้วน้ำตาลที่โคน เริ่มแห้ง
- หนามห่าง ปลายน้ำตาลอ่อน
- ก้นมีร่องเริ่มแยก
- เสียง 380 Hz, lowRatio 0.28
→ maturity: "mature", maturity_score: 0.72
→ ripeness_score: 0.35
→ days_to_level_1: 2, level_2: 4, level_3: 6
→ max_reachable_level: 3

ระวัง: หากข้อมูลภาพและเสียงขัดแย้งกัน (เช่น ภาพดูแก่แต่เสียงดูอ่อน) ให้ปรับ confidence ลง และอธิบายใน reasoning_thai
ห้ามตอบนอก JSON schema เด็ดขาด`;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    maturity: { type: "string", enum: ["young", "medium", "mature"] },
    maturity_score: { type: "number" },
    ripeness_score: { type: "number" },
    days_to_level_1: { type: "integer" },
    days_to_level_2: { type: "integer" },
    days_to_level_3: { type: "integer" },
    max_reachable_level: { type: "integer", enum: [1, 2, 3] },
    confidence: { type: "number" },
    reasoning_thai: { type: "string" },
    indicators: {
      type: "object",
      properties: {
        stem: { type: "string" },
        body: { type: "string" },
        bottom: { type: "string" },
      },
      required: ["stem", "body", "bottom"],
      additionalProperties: false,
    },
  },
  required: [
    "maturity",
    "maturity_score",
    "ripeness_score",
    "days_to_level_1",
    "days_to_level_2",
    "days_to_level_3",
    "max_reachable_level",
    "confidence",
    "reasoning_thai",
    "indicators",
  ],
  additionalProperties: false,
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.ANTHROPIC_API_KEY) {
    return jsonResponse({ error: "ANTHROPIC_API_KEY not configured on server" }, 500);
  }

  let body: AnalyzeRequest;
  try {
    body = (await request.json()) as AnalyzeRequest;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!body?.photos?.stem || !body?.photos?.body || !body?.photos?.bottom) {
    return jsonResponse({ error: "Missing photos (stem/body/bottom required)" }, 400);
  }
  if (!body?.audio) {
    return jsonResponse({ error: "Missing audio data" }, 400);
  }

  const userText =
    `ข้อมูลเสียงเคาะทุเรียน:\n` +
    `- ความถี่เฉลี่ย: ${body.audio.avgFreq.toFixed(0)} Hz\n` +
    `- สัดส่วนพลังงานความถี่ต่ำ (<500Hz): ${(body.audio.lowRatio * 100).toFixed(0)}%\n` +
    `- จำนวนเฟรมที่บันทึก: ${body.audio.samples}\n\n` +
    `ภาพ 3 ภาพแนบมาด้วย (ขั้ว / เปลือก / ก้น ตามลำดับ)\n` +
    `กรุณาวิเคราะห์ตามรูบริค ตอบ JSON ตาม schema`;

  const apiBody = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "ภาพที่ 1 — ขั้ว (stem):" },
          {
            type: "image",
            source: { type: "base64", media_type: "image/jpeg", data: body.photos.stem },
          },
          { type: "text", text: "ภาพที่ 2 — เปลือกด้านข้าง (body):" },
          {
            type: "image",
            source: { type: "base64", media_type: "image/jpeg", data: body.photos.body },
          },
          { type: "text", text: "ภาพที่ 3 — ก้น (bottom):" },
          {
            type: "image",
            source: { type: "base64", media_type: "image/jpeg", data: body.photos.bottom },
          },
          { type: "text", text: userText },
        ],
      },
    ],
    output_config: {
      format: { type: "json_schema", schema: RESPONSE_SCHEMA },
    },
  };

  const apiResp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(apiBody),
  });

  if (!apiResp.ok) {
    const detail = await apiResp.text();
    return jsonResponse(
      { error: "Claude API error", status: apiResp.status, detail },
      apiResp.status === 401 || apiResp.status === 403 ? 500 : apiResp.status,
    );
  }

  const data = (await apiResp.json()) as {
    content: Array<{ type: string; text?: string }>;
    usage?: {
      input_tokens?: number;
      output_tokens?: number;
      cache_creation_input_tokens?: number;
      cache_read_input_tokens?: number;
    };
    stop_reason?: string;
  };

  const textBlock = data.content?.find((b) => b.type === "text");
  if (!textBlock?.text) {
    return jsonResponse({ error: "No text in Claude response", raw: data }, 502);
  }

  let result: unknown;
  try {
    result = JSON.parse(textBlock.text);
  } catch {
    return jsonResponse({ error: "Claude returned non-JSON", raw_text: textBlock.text }, 502);
  }

  return jsonResponse({
    result,
    usage: data.usage,
    model: MODEL,
    cached: (data.usage?.cache_read_input_tokens ?? 0) > 0,
  });
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
