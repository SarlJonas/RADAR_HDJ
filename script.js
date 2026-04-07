/* ============================================
   ABRICAR – Script Principal
   Fonctionnalités: IA simulée, carte, offres, 
   réservation, paiement, filtres
   Concept protégé INPI – Hayet Gautier / Jonas Browser High-Tech
   ============================================ */

'use strict';

// ========== DONNÉES SIMULÉES ==========
const offresData = [
  {
    id: 1,
    title: "Garage Fermé Premium – Voltaire",
    address: "15 Rue Voltaire, 75011 Paris",
    lat: 48.8548, lng: 2.3812,
    priceHour: 3.5, priceDay: 22,
    type: ["garage", "recharge"],
    availability: "now",
    rating: 4.9,
    reviews: 47,
    description: "Garage privé entièrement fermé avec borne de recharge Type 2 (22 kW). Caméra de surveillance, éclairage LED, accès code. Idéal pour voiture électrique ou hybride rechargeable.",
    equipment: ["🔌 Borne de recharge 22 kW", "📷 Vidéosurveillance", "💡 Éclairage LED", "🔒 Fermeture sécurisée", "📱 Accès par code"],
    color: "#8B5CF6",
    icon: "🏠",
    gradient: "linear-gradient(135deg, #1a0538 0%, #3b0764 100%)"
  },
  {
    id: 2,
    title: "Recharge Rapide – Bastille ⚡",
    address: "8 Rue de la Roquette, 75011 Paris",
    lat: 48.8534, lng: 2.3701,
    priceHour: 2.0, priceDay: 15,
    type: ["recharge"],
    availability: "now",
    rating: 4.7,
    reviews: 31,
    description: "Place extérieure couverte avec accès à une prise renforcée 7,4 kW. Parfaite pour une recharge nocturne ou journée complète. Quartier calme et sécurisé.",
    equipment: ["🔌 Prise renforcée 7.4 kW", "🌧️ Couverture anti-pluie", "📍 GPS précis"],
    color: "#F5C842",
    icon: "⚡",
    gradient: "linear-gradient(135deg, #1a1000 0%, #3d2d00 100%)"
  },
  {
    id: 3,
    title: "Abri Voiture Couvert – Nation",
    address: "3 Av. du Trône, 75012 Paris",
    lat: 48.8490, lng: 2.3953,
    priceHour: 1.5, priceDay: 10,
    type: ["abri"],
    availability: "today",
    rating: 4.5,
    reviews: 18,
    description: "Abri voiture couvert chez un particulier. Simple, propre, sans recharge mais très bien protégé. Idéal pour stationnement longue durée à petit prix.",
    equipment: ["🌧️ Couverture totale", "🔓 Accès libre", "📞 Propriétaire disponible"],
    color: "#00D4FF",
    icon: "🏠",
    gradient: "linear-gradient(135deg, #001520 0%, #003048 100%)"
  },
  {
    id: 4,
    title: "Mini Station Privée – Oberkampf",
    address: "42 Rue Oberkampf, 75011 Paris",
    lat: 48.8643, lng: 2.3739,
    priceHour: 4.0, priceDay: 28,
    type: ["garage", "recharge", "installation"],
    availability: "now",
    rating: 5.0,
    reviews: 62,
    description: "Le top des offres AbriCar ! Garage fermé 2 places avec 2 bornes de recharge 22 kW, borne rapide 50 kW disponible à la demande, vidéosurveillance HD 24h/24, accès app mobile.",
    equipment: ["⚡ Borne 22 kW × 2", "🚀 Borne rapide 50 kW", "📷 Vidéo HD 24h/24", "🔒 Accès app", "🅿️ 2 places", "🛠️ Installation possible"],
    color: "#00D68F",
    icon: "⚡",
    gradient: "linear-gradient(135deg, #001a10 0%, #003d25 100%)"
  },
  {
    id: 5,
    title: "Demande d'Installation – Vincennes",
    address: "7 Rue de Fontenay, 94300 Vincennes",
    lat: 48.8480, lng: 2.4342,
    priceHour: null, priceDay: null,
    type: ["installation"],
    availability: "week",
    rating: 4.8,
    reviews: 9,
    description: "Espace particulier en cours d'installation d'une borne Wallbox 22 kW. Disponible à la location dès la semaine prochaine via la plateforme AbriCar.",
    equipment: ["🔌 Borne 22 kW (en cours)", "🏠 Garage individuel", "✅ Certifié IRVE"],
    color: "#00D68F",
    icon: "🔌",
    gradient: "linear-gradient(135deg, #001800 0%, #003800 100%)"
  },
  {
    id: 6,
    title: "Place Sécurisée – République",
    address: "22 Rue Béranger, 75003 Paris",
    lat: 48.8666, lng: 2.3617,
    priceHour: 2.5, priceDay: 18,
    type: ["garage", "abri"],
    availability: "now",
    rating: 4.6,
    reviews: 25,
    description: "Box privé en sous-sol sécurisé, proche République. Idéal pour gabarits compacts à citadines. Surveillance 24h/24, badge d'accès fourni.",
    equipment: ["🔒 Badge sécurisé", "📷 Surveillance 24h", "🌡️ Température contrôlée"],
    color: "#0A84FF",
    icon: "🅿️",
    gradient: "linear-gradient(135deg, #000d20 0%, #001a40 100%)"
  },
  {
    id: 7,
    title: "Recharge Nuit – Charonne",
    address: "56 Rue de Charonne, 75011 Paris",
    lat: 48.8529, lng: 2.3785,
    priceHour: 1.8, priceDay: 12,
    type: ["recharge", "abri"],
    availability: "today",
    rating: 4.4,
    reviews: 14,
    description: "Place avec prise renforcée 7,4 kW, parfaite pour recharge nocturne. Abri couvert, accès facile, propriétaire réactif.",
    equipment: ["🔌 Prise 7.4 kW", "🌙 Recharge nocturne", "☔ Abri couvert"],
    color: "#F5C842",
    icon: "🔌",
    gradient: "linear-gradient(135deg, #1a0f00 0%, #3d2400 100%)"
  },
  {
    id: 8,
    title: "Garage XL – Boulogne",
    address: "18 Av. Jean-Baptiste Clément, 92100 Boulogne",
    lat: 48.8349, lng: 2.2359,
    priceHour: 3.0, priceDay: 20,
    type: ["garage"],
    availability: "week",
    rating: 4.3,
    reviews: 11,
    description: "Grand garage double pour SUV ou camionnette. Entrée motorisée, sécurité renforcée. Idéal pour véhicules de grande taille.",
    equipment: ["🚗 Grande taille", "🔒 Porte motorisée", "💡 Éclairage auto"],
    color: "#8B5CF6",
    icon: "🏠",
    gradient: "linear-gradient(135deg, #0f0020 0%, #200040 100%)"
  }
];

// ========== RÉPONSES IA SIMULÉES ==========
const aiResponses = {
  recharge: {
    keywords: ["recharge", "électrique", "charger", "borne", "prise", "kw", "kwh"],
    response: "⚡ J'ai trouvé <strong>5 offres avec recharge électrique</strong> près de vous. Je vous recommande particulièrement la <em>\"Mini Station Privée – Oberkampf\"</em> avec sa borne 22 kW à seulement 4€/h, ou la <em>\"Recharge Rapide – Bastille\"</em> à 2€/h. Souhaitez-vous que je filtre par puissance de recharge ?",
    action: () => filterByType('recharge')
  },
  garage: {
    keywords: ["garage", "sécurisé", "fermé", "box", "abri"],
    response: "🏠 Je trouve <strong>4 garages sécurisés disponibles</strong> dans votre secteur. Le <em>\"Garage Fermé Premium – Voltaire\"</em> est très bien noté (4.9⭐) avec vidéosurveillance et borne de recharge incluse. À partir de 3,50€/h. Voulez-vous voir les détails ?",
    action: () => filterByType('garage')
  },
  installation: {
    keywords: ["installer", "installation", "borne", "irve", "maison", "particulier", "chez moi"],
    response: "🔌 Excellente décision ! AbriCar vous met en relation avec des installateurs certifiés IRVE. Vous pouvez bénéficier de <strong>jusqu'à 1 500€ d'aides</strong>. Je vous redirige vers notre formulaire d'étude gratuite. Voulez-vous que je vous explique les étapes ?",
    action: () => scrollToSection('installation')
  },
  prix: {
    keywords: ["moins cher", "pas cher", "prix", "budget", "économique", "tarif", "coût"],
    response: "💰 L'offre la moins chère disponible est <em>\"Abri Voiture Couvert – Nation\"</em> à <strong>1,50€/h ou 10€/jour</strong>. Pour la recharge incluse, la meilleure option budget est la <em>\"Recharge Nuit – Charonne\"</em> à 1,80€/h. Voulez-vous trier toutes les offres par prix ?",
    action: () => { document.getElementById('filterPrice').value = 30; updatePriceDisplay(30); applyFilters(); }
  },
  disponible: {
    keywords: ["disponible", "maintenant", "ce soir", "urgent", "tout de suite", "aujourd'hui"],
    response: "🕐 <strong>6 espaces sont disponibles immédiatement</strong> près de vous. Les plus proches : <em>Bastille (0.3 km)</em>, <em>Voltaire (0.5 km)</em> et <em>Oberkampf (0.8 km)</em>. Je filtre les offres pour vous montrer uniquement les disponibilités immédiates.",
    action: () => { document.getElementById('filterAvail').value = 'now'; applyFilters(); }
  },
  default: {
    response: "Je comprends votre demande. Voici ce que je peux faire pour vous : <br>• 🏠 <strong>Trouver un abri ou garage</strong> sécurisé<br>• ⚡ <strong>Localiser une recharge électrique</strong> à proximité<br>• 🔌 <strong>Vous mettre en relation</strong> pour une installation<br>• 💰 <strong>Comparer les prix</strong> et disponibilités<br><br>Pouvez-vous préciser votre besoin ?",
    action: null
  }
};

// ========== ÉTAT GLOBAL ==========
let currentOffer = null;
let chatOpen = true;

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderOfferCards(offresData);
  initLeafletMap();
  initSearchSuggestions();
  animateCounters();
  // Set today's date as default for booking
  const today = new Date().toISOString().split('T')[0];
  const bookingDate = document.getElementById('bookingDate');
  if (bookingDate) bookingDate.value = today;
});

// ========== NAVBAR ==========
function initNavbar() {
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

function toggleMobileMenu() {
  const links = document.querySelector('.nav-links');
  const actions = document.querySelector('.nav-actions');
  links.classList.toggle('open');
}

// ========== OFFER CARDS ==========
function renderOfferCards(offers) {
  const grid = document.getElementById('offresGrid');
  const countEl = document.getElementById('offresCount');
  
  if (offers.length === 0) {
    grid.innerHTML = `
      <div class="no-offers">
        <span>🔍</span>
        Aucune offre ne correspond à vos filtres.
        <br><br>
        <button class="btn-reset" onclick="resetFilters()">Voir toutes les offres</button>
      </div>`;
    countEl.textContent = 'Aucune offre trouvée';
    return;
  }

  countEl.textContent = `${offers.length} offre${offers.length > 1 ? 's' : ''} trouvée${offers.length > 1 ? 's' : ''} près de vous`;

  grid.innerHTML = offers.map(offer => {
    const badges = getBadges(offer.type);
    const availBadge = getAvailBadge(offer.availability);
    const priceDisplay = offer.priceHour 
      ? `<span class="offer-price">${offer.priceHour}€</span><span class="offer-price-unit">/h</span><span class="offer-price-day">${offer.priceDay}€/jour</span>`
      : `<span class="offer-price" style="font-size:1rem;color:var(--green)">Étude gratuite</span>`;

    return `
    <div class="offer-card" onclick="openOfferDetail(${offer.id})">
      <div class="offer-img-placeholder" style="background:${offer.gradient}">
        ${offer.icon}
        <div style="position:absolute;top:0.75rem;right:0.75rem">
          ${availBadge}
        </div>
      </div>
      <div class="offer-body">
        <div class="offer-badges">
          ${badges}
        </div>
        <div class="offer-title">${offer.title}</div>
        <div class="offer-location">📍 ${offer.address}</div>
        <div class="offer-pricing">${priceDisplay}</div>
        <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:1rem;font-size:0.8rem;color:var(--text-secondary)">
          <span style="color:var(--gold)">★ ${offer.rating}</span>
          <span>(${offer.reviews} avis)</span>
        </div>
        <div class="offer-actions">
          <button class="btn-reserve" onclick="event.stopPropagation(); openBooking(${offer.id})">
            ${offer.priceHour ? '📅 Réserver' : '🔌 Contacter'}
          </button>
          <button class="btn-details" onclick="event.stopPropagation(); openOfferDetail(${offer.id})">
            Détails ▸
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function getBadges(types) {
  const badgeMap = {
    recharge: '<span class="badge badge-recharge">⚡ Recharge</span>',
    abri: '<span class="badge badge-abri">🏠 Abri</span>',
    garage: '<span class="badge badge-garage">🔒 Garage</span>',
    installation: '<span class="badge badge-installation">🔌 Installation</span>'
  };
  return types.map(t => badgeMap[t] || '').join('');
}

function getAvailBadge(avail) {
  const map = {
    now: '<span class="badge badge-dispo">● Disponible</span>',
    today: '<span class="badge badge-dispo">◐ Aujourd\'hui</span>',
    week: '<span class="badge badge-unavailable">◯ Cette semaine</span>'
  };
  return map[avail] || '';
}

// ========== OFFER DETAIL MODAL ==========
function openOfferDetail(id) {
  const offer = offresData.find(o => o.id === id);
  if (!offer) return;
  currentOffer = offer;

  const equipList = offer.equipment.map(eq => `<li><span class="eq-icon"></span> ${eq}</li>`).join('');
  const priceHtml = offer.priceHour
    ? `<div class="detail-price-big">${offer.priceHour}€</div><div class="detail-price-unit">par heure · ${offer.priceDay}€/jour</div>`
    : `<div class="detail-price-big" style="font-size:1.5rem;color:var(--green)">Étude gratuite</div>`;

  document.getElementById('offerModalContent').innerHTML = `
    <div class="offer-detail-header" style="background:${offer.gradient}">
      <div class="offer-detail-img-placeholder" style="font-size:6rem">${offer.icon}</div>
    </div>
    <h2>${offer.title}</h2>
    <div style="margin-bottom:1.5rem">${getBadges(offer.type)} ${getAvailBadge(offer.availability)}</div>
    <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:1.5rem;font-size:0.9rem">
      <span style="color:var(--gold);font-size:1.1rem">★ ${offer.rating}</span>
      <span style="color:var(--text-secondary)">(${offer.reviews} avis vérifiés)</span>
    </div>
    <div class="offer-detail-grid">
      <div class="detail-block">
        <h4>📍 Adresse</h4>
        <p>${offer.address}</p>
      </div>
      <div class="detail-block">
        <h4>💶 Tarif</h4>
        ${priceHtml}
      </div>
      <div class="detail-block" style="grid-column:1/-1">
        <h4>📋 Description</h4>
        <p style="color:var(--text-secondary);line-height:1.8">${offer.description}</p>
      </div>
      <div class="detail-block" style="grid-column:1/-1">
        <h4>🛠️ Équipements</h4>
        <ul class="equipment-list">${equipList}</ul>
      </div>
    </div>
    ${offer.priceHour ? `
    <button class="btn-submit" onclick="closeModal('offerModal'); openBooking(${offer.id})">
      📅 Réserver maintenant
    </button>` : `
    <button class="btn-submit" onclick="closeModal('offerModal'); scrollToSection('installation')">
      🔌 Demander une étude gratuite
    </button>`}
  `;
  openModal('offerModal');
}

// ========== BOOKING ==========
function openBooking(id) {
  const offer = offresData.find(o => o.id === id);
  if (!offer || !offer.priceHour) { scrollToSection('installation'); return; }
  currentOffer = offer;

  document.getElementById('bookingOfferInfo').innerHTML = `
    <strong style="color:var(--white)">${offer.title}</strong><br>
    📍 ${offer.address} · ⚡ à partir de ${offer.priceHour}€/h
  `;
  calculateTotal();
  openModal('bookingModal');
}

function calculateTotal() {
  if (!currentOffer || !currentOffer.priceHour) return;
  const duration = document.getElementById('bookingDuration').value;
  const durationMap = { '1h': 1, '2h': 2, '4h': 4, '1j': 24, '2j': 48, '1s': 168 };
  const labelMap = { '1h': '1h', '2h': '2h', '4h': '4h', '1j': '1 jour', '2j': '2 jours', '1s': '1 semaine' };
  const hours = durationMap[duration] || 1;
  let total;
  if (hours >= 24) {
    const days = hours / 24;
    total = (days * currentOffer.priceDay).toFixed(0);
  } else {
    total = (hours * currentOffer.priceHour).toFixed(2);
  }
  const display = `${total}€`;
  document.getElementById('totalPrice').textContent = display;
  document.getElementById('payTotal').textContent = display;
}

function goToPayment(e) {
  e.preventDefault();
  closeModal('bookingModal');
  openModal('paymentModal');
}

function confirmPayment(e) {
  e.preventDefault();
  if (!currentOffer) return;
  const duration = document.getElementById('bookingDuration').value;
  const date = document.getElementById('bookingDate').value;
  const labelMap = { '1h': '1 heure', '2h': '2 heures', '4h': '4 heures', '1j': '1 jour', '2j': '2 jours', '1s': '1 semaine' };
  
  document.getElementById('confirmDetails').innerHTML = `
    <div><strong>Espace :</strong> ${currentOffer.title}</div>
    <div><strong>Adresse :</strong> ${currentOffer.address}</div>
    <div><strong>Date :</strong> ${formatDate(date)}</div>
    <div><strong>Durée :</strong> ${labelMap[duration]}</div>
    <div><strong>Total payé :</strong> <span style="color:var(--gold)">${document.getElementById('totalPrice').textContent}</span></div>
    <div><strong>N° de réservation :</strong> #ABC-${Math.floor(10000 + Math.random() * 90000)}</div>
  `;
  closeModal('paymentModal');
  openModal('confirmationModal');
}

// ========== FILTERS ==========
function applyFilters() {
  const type = document.getElementById('filterType').value;
  const maxPrice = parseInt(document.getElementById('filterPrice').value);
  const avail = document.getElementById('filterAvail').value;
  const rechargeOnly = document.getElementById('filterRecharge').checked;

  let filtered = offresData.filter(offer => {
    if (type !== 'all' && !offer.type.includes(type)) return false;
    if (offer.priceDay && offer.priceDay > maxPrice) return false;
    if (avail !== 'all' && offer.availability !== avail) {
      if (avail === 'now' && offer.availability !== 'now') return false;
      if (avail === 'today' && offer.availability === 'week') return false;
    }
    if (rechargeOnly && !offer.type.includes('recharge')) return false;
    return true;
  });

  renderOfferCards(filtered);
}

function filterByType(type) {
  document.getElementById('filterType').value = type;
  applyFilters();
  scrollToSection('offres');
}

function resetFilters() {
  document.getElementById('filterType').value = 'all';
  document.getElementById('filterPrice').value = 100;
  document.getElementById('filterAvail').value = 'all';
  document.getElementById('filterRecharge').checked = false;
  updatePriceDisplay(100);
  renderOfferCards(offresData);
}

function updatePriceDisplay(val) {
  document.getElementById('priceDisplay').textContent = val + '€';
}

// ========== SEARCH SUGGESTIONS ==========
const suggestions = [
  { icon: '⚡', text: 'Recharge électrique près de moi' },
  { icon: '🏠', text: 'Garage sécurisé pour ce soir' },
  { icon: '💰', text: 'Option la moins chère disponible' },
  { icon: '🔌', text: 'Installer une borne chez moi' },
  { icon: '🕐', text: 'Disponible maintenant dans Paris 11' },
  { icon: '🚗', text: 'Abri pour grand véhicule SUV' },
  { icon: '🌙', text: 'Recharge nocturne longue durée' }
];

function initSearchSuggestions() {
  const input = document.getElementById('heroSearch');
  const dropdown = document.getElementById('searchSuggestions');

  input.addEventListener('focus', () => showSuggestions(dropdown, suggestions));
  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    if (!val) { showSuggestions(dropdown, suggestions); return; }
    const filtered = suggestions.filter(s => s.text.toLowerCase().includes(val));
    showSuggestions(dropdown, filtered.length ? filtered : suggestions.slice(0, 3));
  });
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
}

function showSuggestions(dropdown, items) {
  dropdown.style.display = 'block';
  dropdown.innerHTML = items.map(s => `
    <div class="suggestion-item" onclick="selectSuggestion('${s.text}')">
      <span>${s.icon}</span>
      <span>${s.text}</span>
    </div>
  `).join('');
}

function selectSuggestion(text) {
  document.getElementById('heroSearch').value = text;
  document.getElementById('searchSuggestions').style.display = 'none';
  triggerSearch();
}

function triggerSearch() {
  const val = document.getElementById('heroSearch').value.toLowerCase();
  if (!val) { scrollToSection('offres'); return; }
  // Match against AI keywords to apply intelligent filter
  for (const [key, data] of Object.entries(aiResponses)) {
    if (key !== 'default' && data.keywords && data.keywords.some(kw => val.includes(kw))) {
      if (data.action) data.action();
      break;
    }
  }
  scrollToSection('offres');
}

// ========== AI CHAT ==========
function toggleChat() {
  const body = document.getElementById('chatBody');
  const btn = document.getElementById('chatToggleBtn');
  chatOpen = !chatOpen;
  body.classList.toggle('collapsed', !chatOpen);
  btn.textContent = chatOpen ? '▲' : '▼';
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  
  addChatMessage(text, 'user');
  input.value = '';
  
  // Show typing
  const typingId = addTypingIndicator();
  
  setTimeout(() => {
    removeTypingIndicator(typingId);
    const response = getAIResponse(text);
    addChatMessage(response.message, 'bot');
    if (response.action) response.action();
    // Hide suggestion buttons after first interaction
    document.getElementById('chatSuggestions').style.display = 'none';
  }, 1200 + Math.random() * 800);
}

function sendSuggestion(btn) {
  const text = btn.textContent.trim();
  document.getElementById('chatInput').value = text;
  sendMessage();
}

function addChatMessage(text, type) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.innerHTML = `
    <div class="msg-avatar">${type === 'bot' ? '⚡' : '👤'}</div>
    <div class="msg-content">${text}</div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  
  // Animation
  div.style.opacity = '0';
  div.style.transform = 'translateY(10px)';
  requestAnimationFrame(() => {
    div.style.transition = 'all 0.3s ease';
    div.style.opacity = '1';
    div.style.transform = 'translateY(0)';
  });
}

function addTypingIndicator() {
  const messages = document.getElementById('chatMessages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = id;
  div.innerHTML = `
    <div class="msg-avatar">⚡</div>
    <div class="msg-content">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function getAIResponse(text) {
  const lower = text.toLowerCase();
  for (const [key, data] of Object.entries(aiResponses)) {
    if (key !== 'default' && data.keywords && data.keywords.some(kw => lower.includes(kw))) {
      return { message: data.response, action: data.action };
    }
  }
  return { message: aiResponses.default.response, action: null };
}

// ========== LEAFLET MAP ==========
function initLeafletMap() {
  if (typeof L === 'undefined') return;

  const map = L.map('leafletMap', {
    center: [48.8570, 2.3700],
    zoom: 13,
    zoomControl: true
  });

  // Dark tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap © CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  const colorMap = {
    garage: '#8B5CF6',
    recharge: '#F5C842',
    abri: '#0A84FF',
    installation: '#00D68F'
  };

  offresData.forEach(offer => {
    const color = offer.type.includes('recharge') && offer.type.includes('garage') ? '#00D68F'
      : offer.type.includes('recharge') ? '#F5C842'
      : offer.type.includes('installation') ? '#00D68F'
      : offer.type.includes('garage') ? '#8B5CF6'
      : '#0A84FF';

    const markerHtml = `
      <div class="custom-marker" style="background:${color}22;border-color:${color};box-shadow:0 0 15px ${color}66">
        ${offer.icon}
      </div>`;

    const icon = L.divIcon({
      className: '',
      html: markerHtml,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20]
    });

    const badgesHtml = offer.type.map(t => `<span class="popup-badge">${t}</span>`).join('');
    const priceHtml = offer.priceHour ? `${offer.priceHour}€/h · ${offer.priceDay}€/j` : 'Étude gratuite';

    const popup = L.popup({ closeButton: false, className: 'abricar-popup' }).setContent(`
      <div style="min-width:220px">
        <div class="popup-title">${offer.title}</div>
        <div class="popup-addr">📍 ${offer.address}</div>
        <div class="popup-price">💶 ${priceHtml}</div>
        <div class="popup-badges">${badgesHtml}</div>
        <div style="font-size:0.75rem;color:#8BB5D9;margin-bottom:0.6rem">★ ${offer.rating} (${offer.reviews} avis)</div>
        <button class="popup-btn" onclick="openOfferDetail(${offer.id})">Voir l'offre ▸</button>
      </div>
    `);

    L.marker([offer.lat, offer.lng], { icon })
      .addTo(map)
      .bindPopup(popup);
  });

  // Pulse animation on map load
  setTimeout(() => map.invalidateSize(), 300);
}

// ========== MODALS ==========
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}
function closeModalOutside(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

// ========== FORMS ==========
function submitInstallation(e) {
  e.preventDefault();
  addChatMessage('✅ Votre demande d\'étude a bien été envoyée ! Un expert AbriCar vous contactera dans les 24h.', 'bot');
  if (!chatOpen) toggleChat();
  e.target.reset();
  showToast('✅ Demande envoyée ! Notre équipe vous contacte sous 24h.');
}

function submitProprietary(e) {
  e.preventDefault();
  e.target.reset();
  showToast('🚀 Votre offre a été publiée sur AbriCar !');
}

function fakeLogin(e) {
  e.preventDefault();
  closeModal('loginModal');
  showToast('👋 Connexion réussie ! Bienvenue sur AbriCar.');
}

// ========== TOAST ============
function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);
    background:var(--blue-mid);border:1px solid var(--border);
    color:var(--text-primary);padding:1rem 2rem;border-radius:50px;
    font-family:'Exo 2',sans-serif;font-size:0.95rem;
    box-shadow:0 10px 40px rgba(0,0,0,0.5);
    z-index:9999;animation:fadeInUp 0.4s ease;
    backdrop-filter:blur(20px);
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.transition = 'opacity 0.4s'; toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3500);
}

// ========== UTILS ==========
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatCard(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

// ========== COUNTER ANIMATION ==========
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current).toLocaleString('fr-FR');
          if (current >= target) clearInterval(timer);
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});
