export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { contents } = req.body;
        const apiKey = process.env.GEMINI_API_KEY || "AQ.Ab8RN6KRGgiTrSpurK2eoy9HU9SBKpOkjVv-DR38DKhV944ZNA";
        const MODEL = "gemini-3.6-flash";

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({ contents })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ 
                error: data.error?.message || 'Google API 後端呼叫失敗' 
            });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message || '內部伺服器錯誤' });
    }
}
