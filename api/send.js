export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST allowed" });
    }

    const WEBHOOK = process.env.WEBHOOK_URL;
    const { name, question } = req.body;
    const time = new Date().toLocaleString("vi-VN");


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
// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const webhookURL = process.env.WEBHOOK_URL;

//   try {
//     await fetch(webhookURL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(req.body)
//     });

//     res.status(200).json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to send message" });
//   }
// }
