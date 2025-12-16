// Lägg till produkter 
function addProduct() {
  const template = document.getElementById("productTemplate");
  const row = template.content.cloneNode(true).querySelector(".product-row");

  // Lägg till raden
  document.getElementById("productList").appendChild(row);

  // Koppla event till input-fälten
  row.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", updateTotals);
  });

  // Koppla event till ta-bort-knappen
  row.querySelector(".removeBtn").addEventListener("click", () => {
    row.remove();
    updateTotals();
  });

  updateTotals();
}

// Uppdaterar moms, total och summa
function updateTotals() {
  let total = 0;
  let momsTotal = 0;

  document.querySelectorAll(".product-row").forEach((row) => {
    const moms = parseFloat(row.children[1].value) || 0;
    const qty = parseFloat(row.children[2].value) || 0;
    const price = parseFloat(row.children[3].value) || 0;

    // Radräkning
    const rowTotal = qty * price;
    row.children[4].value = rowTotal.toFixed(2);

    // Lägg till summering
    total += rowTotal;
    momsTotal += rowTotal * (moms / 100);
  });

  // Sätt in i DOM
  document.getElementById("momsTotal").textContent = momsTotal.toFixed(2);
  document.getElementById("grandTotal").textContent = (
    total + momsTotal
  ).toFixed(2);
}

function removeLastProduct() {
  const list = document.getElementById("productList");
  const lastRow = list.lastElementChild;
  if (lastRow) {
    lastRow.remove();
    updateTotals();
  }
}

// PDF-funktion
// Förbereda filen inför nedladdning
// Ta bort alla element som inte ska vara med 
function downloadPDF() {
  // Ta bort knappar och annat
  const element = document.getElementById("invoice");

  const opt = {
    margin: 10,
    filename: "faktura.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      userCoRS: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
  };

  html2pdf().from(element).set(opt).save();
}
