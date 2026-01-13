import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Render ortamında gizli
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const prompt = `
Ailenin sohbete başlaması gerekiyor.
Said'in babası Kerem, dedesi Hacı Abdullah, kuzeni Ahmet, teyze oğlu Ömer, teyze oğlu Mahmut, hala oğlu Mervan, amcası Faruk.
Kullanıcı: "${message}"
Said ve ailesi sırayla cevap versin, her karakter kendi kişiliğine göre konuşsun.
Yanıtları Türkçe ver ve kısa, doğal bir aile sohbeti gibi olsun.
Format: Karakter: Mesaj
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI hatası" });
  }
}
