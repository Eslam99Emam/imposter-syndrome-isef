
const GEMINI_API_KEY = "AIzaSyChcxwqCkwCAgZkQdYs16iH5VvChzrOip4";

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
    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
            method: "POST",
            headers: { "Content-Type": "application/json", 'x-goog-api-key': GEMINI_API_KEY },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: ASSISTANT_SYSTEM_PROMPT }]
                    },
                    {
                        parts: [{ text: userMessage }]
                    }
                ]
            })
        }
    );

    const data = await response.json();
    try {
        return data.candidates[0].content.parts[0].text;
    } catch {
        return "حصل خطأ بسيط، حاول تاني.";
    }
}