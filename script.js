const channelID = "2959044"; // Channel ID ThingSpeak
const readAPIKey = "KK47GSVGAJ223P1W"; // API Key ThingSpeak

const updateSlotStatus = () => {
  fetch(`https://api.thingspeak.com/channels/${channelID}/feeds/last.json?api_key=${readAPIKey}`)
    .then(response => response.json())
    .then(data => {
      // Ambil data slot dari ThingSpeak (field4, field5, field6)
      const slot1 = data.field4;
      const slot2 = data.field5;
      const slot3 = data.field6;
      
      // Update tampilan
      updateSlot(1, slot1 === "1" ? "terisi" : "kosong");
      updateSlot(2, slot2 === "1" ? "terisi" : "kosong");
      updateSlot(3, slot3 === "1" ? "terisi" : "kosong");
      
      // Update statistik
      const slotTerisi = [slot1, slot2, slot3].filter(s => s === "1").length;
      const slotKosong = 3 - slotTerisi;
      
      document.getElementById("slotTerisi").textContent = slotTerisi;
      document.getElementById("slotKosong").textContent = slotKosong;
      
      // Update waktu terakhir
      document.getElementById("lastUpdateTime").textContent = new Date(data.created_at).toLocaleString();
      
      // Update status palang
      const allFilled = slot1 === "1" && slot2 === "1" && slot3 === "1";
      const palang = document.getElementById("palang");
      const palangText = document.getElementById("palangText");
      
      if (allFilled) {
        palang.setAttribute("fill", "red");
        palangText.textContent = "Palang Tertutup";
      } else {
        palang.setAttribute("fill", "green");
        palangText.textContent = "Palang Terbuka";
      }
      
      console.log("[ThingSpeak] Data slot diperbarui");
    })
    .catch(error => console.error("Gagal ambil data:", error));
};

const updateSlot = (index, status) => {
  const rect = document.getElementById(`slot${index}`);
  const text = document.getElementById(`status${index}`);
  
  if (status === "terisi") {
    rect.setAttribute("fill", "red");
    text.textContent = "Terisi";
  } else {
    rect.setAttribute("fill", "green");
    text.textContent = "Kosong";
  }
};

// Update saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  // Update pertama kali
  updateSlotStatus();
  // Update setiap 5 detik
  setInterval(updateSlotStatus, 5000);
});
