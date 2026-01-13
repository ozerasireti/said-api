import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  const prompt = `
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
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI hatası" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
