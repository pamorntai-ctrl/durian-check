import type { Env } from "./index";

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

const MODEL = "gemini-2.5-flash";

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

## คะแนนความสุก 0.0-0.25 (ดิบ): เปลือกเขียวล้วน ขั้วเขียวสด เสียงแน่นแข็ง
## คะแนน 0.25-0.45 (เริ่มสุก): เปลือกเริ่มเหลือง บางจุดน้ำตาล ขั้วเริ่มน้ำตาล
## คะแนน 0.45-0.65 (ใกล้พร้อมทาน): เปลือกเหลืองเด่น ขั้วน้ำตาลแห้ง เสียงทุ้ม
## คะแนน 0.65-0.85 (พร้อมทาน - ระดับ 1): เปลือกน้ำตาลเด่น ขั้วแห้งสนิท เสียงกลวงชัด
## คะแนน 0.85-1.0 (สุกจัด - ระดับ 2-3): เปลือกน้ำตาลเข้ม กลิ่นแรง เนื้อในเริ่มเหลว

# การพยากรณ์วันที่ทาน 3 ระดับ
ระยะห่างปกติ: ระดับ 1 → 2 ใช้ ~2 วัน, 2 → 3 อีก ~2 วัน

## ระดับ 1 — กรอบนอก นุ่มใน
สูตร: days_to_level_1 = max(-1, round((1 - ripeness_score) * 6 - 1))

## ระดับ 2 — นุ่มละมุน
days_to_level_2 = days_to_level_1 + 2

## ระดับ 3 — นุ่มเละ ครีมมี่
days_to_level_3 = days_to_level_1 + 4

# ข้อจำกัดความแก่ต่อระดับสูงสุด (max_reachable_level)
- young: ถึงได้สูงสุดระดับ 1 (2-3 ไม่ถึง เนื้อจะแข็ง)
- medium: ถึงได้สูงสุดระดับ 2 (3 อาจไม่ถึง)
- mature: ถึงได้ครบทั้ง 3 ระดับ

# วิธีตีความเสียงเคาะ
- avgFreq ต่ำ = กลวง = แก่/สุก
- lowRatio สูง = กลวง = แก่/สุก
- samples <10 ลด confidence

# วิธีตีความภาพ
ภาพ 1 = ขั้ว (น้ำหนัก maturity สูงสุด)
ภาพ 2 = เปลือก+หนาม (น้ำหนัก ripeness สูงสุด)
ภาพ 3 = ก้น (รอยแยก = แก่)

ภาพไม่ชัด/ไม่เห็นทุเรียน ให้ลด confidence และอธิบายใน reasoning_thai

# ตัวอย่างการให้คะแนน

ตัวอย่าง 1: หมอนทองแก่จัด
- ขั้วน้ำตาลแห้ง, หนามห่างปลายน้ำตาล, ก้นรอยแยกชัด
- เสียง 220 Hz, lowRatio 0.42, 45 เฟรม
→ maturity: "mature" (0.85), ripeness: 0.78
→ days L1:0, L2:2, L3:4, max_reachable: 3

ตัวอย่าง 2: ทุเรียนอ่อน
- ขั้วเขียวสด, หนามตั้งปลายเขียว, ก้นปิด
- เสียง 780 Hz, lowRatio 0.08
→ maturity: "young" (0.18), ripeness: 0.22
→ days L1:4, L2:6, L3:8, max_reachable: 1

ตัวอย่าง 3: แก่แต่ยังดิบ
- ขั้วน้ำตาลที่โคน, หนามห่างปลายน้ำตาลอ่อน, ก้นเริ่มแยก
- เสียง 380 Hz, lowRatio 0.28
→ maturity: "mature" (0.72), ripeness: 0.35
→ days L1:2, L2:4, L3:6, max_reachable: 3

ตอบเป็น JSON ตาม schema เท่านั้น ไม่ต้องมี markdown หรือคำอธิบายอื่น
ใน reasoning_thai ให้เขียน 1-2 ประโยคสั้น ๆ สรุปสิ่งที่เห็น
ใน indicators ให้เขียนสั้น ๆ (ไม่เกิน 20 คำ) ต่อแต่ละภาพ`;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    maturity: { type: "string", enum: ["young", "medium", "mature"] },
    maturity_score: { type: "number" },
    ripeness_score: { type: "number" },
    days_to_level_1: { type: "integer" },
    days_to_level_2: { type: "integer" },
    days_to_level_3: { type: "integer" },
    max_reachable_level: { type: "integer" },
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
      propertyOrdering: ["stem", "body", "bottom"],
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
  propertyOrdering: [
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
};

export async function handleAnalyze(request: Request, env: Env): Promise<Response> {
  if (!env.GEMINI_API_KEY) {
    return jsonResponse({ error: "GEMINI_API_KEY not configured on server" }, 500);
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
    `วิเคราะห์ตามรูบริค ตอบ JSON ตาม schema`;

  const apiBody = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: "user",
        parts: [
          { text: "ภาพที่ 1 — ขั้ว (stem):" },
          { inline_data: { mime_type: "image/jpeg", data: body.photos.stem } },
          { text: "ภาพที่ 2 — เปลือกด้านข้าง (body):" },
          { inline_data: { mime_type: "image/jpeg", data: body.photos.body } },
          { text: "ภาพที่ 3 — ก้น (bottom):" },
          { inline_data: { mime_type: "image/jpeg", data: body.photos.bottom } },
          { text: userText },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.3,
      maxOutputTokens: 1024,
    },
  };

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const apiResp = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": env.GEMINI_API_KEY,
    },
    body: JSON.stringify(apiBody),
  });

  if (!apiResp.ok) {
    const detail = await apiResp.text();
    return jsonResponse(
      { error: "Gemini API error", status: apiResp.status, detail },
      apiResp.status === 401 || apiResp.status === 403 ? 500 : apiResp.status,
    );
  }

  const data = (await apiResp.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
      finishReason?: string;
    }>;
    usageMetadata?: {
      promptTokenCount?: number;
      candidatesTokenCount?: number;
      totalTokenCount?: number;
    };
    error?: { message?: string };
  };

  if (data.error) {
    return jsonResponse({ error: "Gemini error", detail: data.error.message }, 502);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    return jsonResponse({ error: "No text in Gemini response", raw: data }, 502);
  }

  // Strip any markdown code fences just in case
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();

  let result: unknown;
  try {
    result = JSON.parse(cleaned);
  } catch {
    return jsonResponse({ error: "Gemini returned non-JSON", raw_text: text }, 502);
  }

  return jsonResponse({
    result,
    usage: data.usageMetadata,
    model: MODEL,
    finishReason: data.candidates?.[0]?.finishReason,
  });
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
