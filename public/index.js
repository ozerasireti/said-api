// Karakterler ve aile ilişkileri
const characters = {
  said: { name: "Said", role: "torun", relatives: ["haci_abdullah","kerem","ahmet","omer","mahmut","mervan","faruk"] },
  haci_abdullah: { name: "Hacı Abdullah", role: "dede", relatives: ["said","kerem"] },
  kerem: { name: "Kerem", role: "baba", relatives: ["said","ahmet"] },
  ahmet: { name: "Ahmet", role: "kuzen", relatives: ["said","kerem"] },
  omer: { name: "Ömer", role: "teyzeoğlu", relatives: ["said"] },
  mahmut: { name: "Mahmut", role: "teyzeoğlu", relatives: ["said"] },
  mervan: { name: "Mervan", role: "halaoğlu", relatives: ["said"] },
  faruk: { name: "Faruk", role: "amca", relatives: ["said"] }
};

// Backend üzerinden AI cevabı alma
async function getAIResponse(userInput) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput })
  });
  const data = await response.json();
  return data.reply;
}

// Chat handler
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatBox.innerHTML += `<div><b>Kullanıcı:</b> ${userMessage}</div>`;
  input.value = "";

  const aiReply = await getAIResponse(userMessage);
  chatBox.innerHTML += `<div><b>Aile:</b> ${aiReply.replace(/\n/g, "<br>")}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
});
