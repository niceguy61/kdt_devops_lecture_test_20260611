const places = [
  {
    title: "Gyeongbokgung Palace",
    area: "Jongno",
    mood: "Culture",
    budget: "Low",
    rating: "4.9",
    price: "Free to low cost",
    tip: "Rent hanbok nearby and check prayer-friendly quiet corners around the museum area.",
    scene: "linear-gradient(160deg, #25344f 0 28%, #f2d2a9 29% 52%, #8db596 53% 100%)",
  },
  {
    title: "Myeongdong Street",
    area: "Jung",
    mood: "Shopping",
    budget: "Medium",
    rating: "4.7",
    price: "Snacks from KRW 5k",
    tip: "Good first-night stop for cosmetics, money exchange, and easy street food browsing.",
    scene: "linear-gradient(140deg, #fb6f92 0 30%, #ffd166 31% 46%, #26547c 47% 100%)",
  },
  {
    title: "Hongdae Weekend Walk",
    area: "Mapo",
    mood: "Night",
    budget: "Medium",
    rating: "4.8",
    price: "Cafes from KRW 7k",
    tip: "Best for music, photo booths, late cafes, and younger groups after dinner.",
    scene: "linear-gradient(145deg, #2d1e2f 0 34%, #f26419 35% 56%, #86bbd8 57% 100%)",
  },
  {
    title: "Banpo Hangang Park",
    area: "Seocho",
    mood: "Relax",
    budget: "Low",
    rating: "4.8",
    price: "Picnic from KRW 10k",
    tip: "Pack convenience-store food and watch the bridge lights when the weather is clear.",
    scene: "linear-gradient(160deg, #0f4c5c 0 36%, #e9c46a 37% 45%, #90be6d 46% 100%)",
  },
  {
    title: "Ikseon-dong Hanok Alleys",
    area: "Jongno",
    mood: "Cafe",
    budget: "Medium",
    rating: "4.6",
    price: "Desserts from KRW 8k",
    tip: "Small lanes get crowded, so visit before lunch for easier photos and seating.",
    scene: "linear-gradient(135deg, #6f4e37 0 31%, #f7ede2 32% 58%, #84a59d 59% 100%)",
  },
  {
    title: "Namsan Seoul Tower",
    area: "Yongsan",
    mood: "View",
    budget: "Medium",
    rating: "4.7",
    price: "Cable car optional",
    tip: "Go near sunset for skyline photos without committing to a full hiking route.",
    scene: "linear-gradient(150deg, #14213d 0 42%, #fca311 43% 52%, #e5e5e5 53% 100%)",
  },
];

const filters = {
  area: document.querySelector("#area-filter"),
  mood: document.querySelector("#mood-filter"),
  budget: document.querySelector("#budget-filter"),
};

const grid = document.querySelector("#place-grid");
const resultCount = document.querySelector("#result-count");
const form = document.querySelector("#trip-search");
const clearButton = document.querySelector("#clear-filters");

function uniqueOptions(key) {
  return [...new Set(places.map((place) => place[key]))].sort();
}

function fillFilter(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function matchesFilters(place) {
  return Object.entries(filters).every(([key, select]) => select.value === "all" || place[key] === select.value);
}

function renderPlaces() {
  const visiblePlaces = places.filter(matchesFilters);
  resultCount.textContent = `${visiblePlaces.length} Seoul ${visiblePlaces.length === 1 ? "pick" : "picks"}`;

  grid.innerHTML = visiblePlaces
    .map(
      (place) => `
        <article class="place-card">
          <div class="photo" style="--scene: ${place.scene}">
            <span class="badge">${place.mood}</span>
            <button class="save-button" type="button" aria-label="Save ${place.title}">♡</button>
          </div>
          <div class="card-body">
            <div class="card-title">
              <span>${place.title}</span>
              <span class="rating">★ ${place.rating}</span>
            </div>
            <div class="meta">${place.area} · ${place.budget} budget</div>
            <div class="tip">${place.tip}</div>
            <div class="price">${place.price}</div>
          </div>
        </article>
      `
    )
    .join("");
}

Object.entries(filters).forEach(([key, select]) => {
  fillFilter(select, uniqueOptions(key));
  select.addEventListener("change", renderPlaces);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPlaces();
});

clearButton.addEventListener("click", () => {
  Object.values(filters).forEach((select) => {
    select.value = "all";
  });
  renderPlaces();
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".save-button");
  if (!button) return;

  button.classList.toggle("is-saved");
  button.textContent = button.classList.contains("is-saved") ? "♥" : "♡";
});

renderPlaces();
