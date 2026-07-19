// ============================
// DATI DI PARTENZA
// ============================
let contatti = [
  { id: 1, nome: "Mario", cognome: "Rossi", telefono: "3331234567", email: "mario.rossi@email.com" },
  { id: 2, nome: "Anna", cognome: "Bianchi", telefono: "3479876543", email: "anna.bianchi@email.com" },
  { id: 3, nome: "Luca", cognome: "Verdi", telefono: "3391112233", email: "luca.verdi@email.com" }
];

// contatore per generare id univoci per i nuovi contatti
let nextId = contatti.length + 1;

// ============================
// RIFERIMENTI AGLI ELEMENTI DOM
// ============================
const toggleBtn = document.getElementById("toggleBtn");
const addBtn = document.getElementById("addBtn");
const tableWrapper = document.getElementById("tableWrapper");
const contactsBody = document.getElementById("contactsBody");
const emptyMsg = document.getElementById("emptyMsg");

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const contactForm = document.getElementById("contactForm");
const contactIdInput = document.getElementById("contactId");
const nomeInput = document.getElementById("nome");
const cognomeInput = document.getElementById("cognome");
const telefonoInput = document.getElementById("telefono");
const emailInput = document.getElementById("email");
const cancelBtn = document.getElementById("cancelBtn");

// ============================
// 1. MOSTRA / NASCONDI LISTA CONTATTI
// ============================
toggleBtn.addEventListener("click", () => {
  const isHidden = tableWrapper.classList.toggle("hidden");
  toggleBtn.textContent = isHidden ? "Mostra rubrica" : "Nascondi rubrica";
});

// ============================
// 2. POPOLARE LA TABELLA
// ============================
function renderContatti() {
  // svuota il corpo della tabella
  contactsBody.innerHTML = "";

  if (contatti.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  contatti.forEach((contatto) => {
    const row = document.createElement("tr");
    row.dataset.id = contatto.id;

    row.innerHTML = `
      <td>${contatto.nome}</td>
      <td>${contatto.cognome}</td>
      <td>${contatto.telefono}</td>
      <td>${contatto.email}</td>
      <td class="actions-cell">
        <button class="btn btn-edit" data-action="edit" data-id="${contatto.id}">Modifica</button>
        <button class="btn btn-danger" data-action="delete" data-id="${contatto.id}">Elimina</button>
      </td>
    `;

    contactsBody.appendChild(row);
  });
}

// ============================
// GESTIONE MODALE (aggiunta/modifica)
// ============================
function apriModale(modalita, contatto = null) {
  contactForm.reset();

  if (modalita === "edit" && contatto) {
    modalTitle.textContent = "Modifica contatto";
    contactIdInput.value = contatto.id;
    nomeInput.value = contatto.nome;
    cognomeInput.value = contatto.cognome;
    telefonoInput.value = contatto.telefono;
    emailInput.value = contatto.email;
  } else {
    modalTitle.textContent = "Nuovo contatto";
    contactIdInput.value = "";
  }

  modalOverlay.classList.remove("hidden");
}

function chiudiModale() {
  modalOverlay.classList.add("hidden");
  contactForm.reset();
}

addBtn.addEventListener("click", () => apriModale("add"));
cancelBtn.addEventListener("click", chiudiModale);

// chiude la modale cliccando fuori dal box
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    chiudiModale();
  }
});

// ============================
// 3. AGGIUNGERE UN NUOVO CONTATTO
// 5. MODIFICARE UN CONTATTO ESISTENTE
// ============================
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = contactIdInput.value;
  const nuovoContatto = {
    nome: nomeInput.value.trim(),
    cognome: cognomeInput.value.trim(),
    telefono: telefonoInput.value.trim(),
    email: emailInput.value.trim()
  };

  if (id) {
    // modalita' modifica: trova il contatto e aggiorna i dati
    const index = contatti.findIndex((c) => c.id === Number(id));
    if (index !== -1) {
      contatti[index] = { id: Number(id), ...nuovoContatto };
    }
  } else {
    // modalita' aggiunta: crea un nuovo contatto con id univoco
    contatti.push({ id: nextId, ...nuovoContatto });
    nextId++;
  }

  renderContatti();
  chiudiModale();
});

// ============================
// 4. ELIMINARE UN CONTATTO (+ delega click per modifica)
// ============================
contactsBody.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const azione = btn.dataset.action;

  if (azione === "delete") {
    const contatto = contatti.find((c) => c.id === id);
    const conferma = confirm(
      `Sei sicuro di voler eliminare ${contatto.nome} ${contatto.cognome}?`
    );
    if (conferma) {
      contatti = contatti.filter((c) => c.id !== id);
      renderContatti();
    }
  }

  if (azione === "edit") {
    const contatto = contatti.find((c) => c.id === id);
    apriModale("edit", contatto);
  }
});

// ============================
// INIZIALIZZAZIONE
// ============================
renderContatti();
