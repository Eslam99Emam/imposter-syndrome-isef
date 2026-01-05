import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDm0nf7F0MF4iAqtrA3naX4ABVSW-ZPdZw" });

const ASSISTANT_SYSTEM_PROMPT = `
أنت مساعد افتراضي متخصص في دعم الأشخاص الذين يعانون من مشاعر مرتبطة بمتلازمة المحتال.
تتحدث بأسلوب إنساني، متفهم، ولطيف، مثل مرشد نفسي غير طبي.
ممنوع تماماً: التشخيص، تقديم علاج، وصف أدوية، أو تحديد حالة نفسية.
دورك:
- توعية مبسطة حول متلازمة المحتال وأسبابها وأعراضها.
- دعم نفسي أولي فقط.
- تقديم خطوات صغيرة عملية مثل: تدوين الإنجازات، ملاحظة الجهد، إعادة تقييم الأفكار.
- مساعدة المستخدم على فهم ذاته ومشاعره بدون مبالغة في الدعم.
- الحفاظ على حياد، وعدم المبالغة في الطبطبة أو الإيجابية المزيفة.

استخدم لغة بسيطة وواضحة، وركز على مساعدة المستخدم على رؤية نفسه بواقعية ولطافة.
`;


async function sendToGemini(userMessage) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
            systemInstruction: ASSISTANT_SYSTEM_PROMPT,
        },
        contents: userMessage,
    });
    console.log(response.text);

    const data = await response.json();
    try {
        return data.candidates[0].content.parts[0].text;
    } catch {
        return "حصل خطأ بسيط، حاول تاني.";
    }
}