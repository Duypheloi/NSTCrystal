export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST allowed" });
    }

    const { name, question } = req.body;
    const time = new Date().toLocaleString("vi-VN");

    const WEBHOOK = process.env.WEBHOOK_URL;

    const payload = {
        content:
            "```ini\n[Câu hỏi mới từ website]```" +
            `Thời gian: *${time}*\n` +
            `Tên: ***${name}***\n` +
            `Nội dung:\n${question}`
    };

    await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    return res.status(200).json({ success: true });
}
