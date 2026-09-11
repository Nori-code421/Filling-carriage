const entries = [
  {
    id: "eggs-benedict",
    number: "01",
    title: "班尼迪克蛋",
    english: "EGGS BENEDICT",
    category: "鹹食 · 經典",
    summary: "半熟水波蛋、酸香荷蘭醬與鬆脆底座，靠溫度把三種口感接在一起。",
    tags: ["水波蛋", "荷蘭醬", "酸香"],
    mediaPosition: "75% 8%",
    blocks: [
      {
        type: "text",
        label: "TASTE NOTE",
        title: "真正的主角，是流動感",
        body: "切開水波蛋的瞬間，蛋黃成為整盤的第二層醬汁；荷蘭醬帶來奶油厚度與檸檬酸度，烤麵包則留住最後一點酥脆。理想的一口，應同時有柔、滑、酥三種節奏。",
        facts: [{ value: "3", label: "核心口感" }, { value: "63°C", label: "蛋黃開始凝結" }, { value: "酸 × 脂", label: "風味平衡" }]
      },
      { type: "video", label: "VIDEO", title: "90 秒看懂荷蘭醬", note: "影片區塊已支援 HTML5 或嵌入式影片網址；此示例保留為內容封面。" }
    ]
  },
  {
    id: "avocado-toast",
    number: "02",
    title: "酪梨酸種吐司",
    english: "AVOCADO TOAST",
    category: "植感 · 清爽",
    summary: "以酸種麵包的發酵香氣，托住酪梨的綿密與香草的清亮。",
    tags: ["酸種", "酪梨", "互動作品"],
    mediaPosition: "22% 78%",
    blocks: [
      {
        type: "text",
        label: "FIELD NOTE",
        title: "柔軟，也需要骨架",
        body: "酪梨提供圓潤脂香，酸種吐司則以酸度和嚼感拉出輪廓。最後加上一撮海鹽與檸檬汁，不是調味的句點，而是讓綠色風味更清楚的冒號。"
      },
      { type: "html", label: "HTML LAB", title: "酪梨熟度小測驗" }
    ]
  },
  {
    id: "yogurt-bowl",
    number: "03",
    title: "優格水果碗",
    english: "YOGURT BOWL",
    category: "甜食 · 清新",
    summary: "用酸、甜、脆三條線，讓看似簡單的一碗保有起伏與層次。",
    tags: ["優格", "當季水果", "簡報"],
    mediaPosition: "67% 80%",
    blocks: [
      {
        type: "text",
        label: "COMPOSITION",
        title: "一碗，就是一張構圖",
        body: "先放入優格，再以水果建立色塊，最後撒上穀物與種子。入口順序不必固定：讓酸甜水果打開味蕾，讓堅果與燕麥延長咀嚼，最後由優格把味道收束。"
      },
      {
        type: "slides",
        label: "MINI DECK",
        title: "三步組成理想水果碗",
        slides: [
          { kicker: "STEP 01 / BASE", title: "先決定酸度", body: "希臘優格濃稠、一般原味優格輕盈；選擇無糖基底，讓水果自然接手甜味。" },
          { kicker: "STEP 02 / COLOR", title: "用季節配色", body: "挑選 2–3 種當季水果，兼顧柔軟與多汁，畫面與味覺都會更有層次。" },
          { kicker: "STEP 03 / CRUNCH", title: "最後補上聲音", body: "烤燕麥、南瓜籽或堅果碎帶來脆度，也讓一碗輕食擁有更完整的飽足感。" }
        ]
      }
    ]
  }
];

const grid = document.querySelector("#entryGrid");
const dialog = document.querySelector("#entryDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeButton = dialog.querySelector(".dialog-close");

function renderCards() {
  grid.innerHTML = entries.map((entry) => `
    <article class="entry-card">
      <div class="card-media">
        <img src="assets/brunch-hero.png" alt="" style="object-position:${entry.mediaPosition}" loading="lazy" />
        <span class="card-index" aria-hidden="true">${entry.number}</span>
      </div>
      <div class="card-body">
        <div class="card-meta"><span>${entry.category}</span><span>${entry.english}</span></div>
        <h3>${entry.title}</h3>
        <p>${entry.summary}</p>
        <ul class="tag-list" aria-label="內容標籤">${entry.tags.map((tag) => `<li>${tag}</li>`).join("")}</ul>
      </div>
      <button class="card-button" type="button" data-entry="${entry.id}" aria-label="閱讀${entry.title}完整條目">
        <span>展開條目</span><span aria-hidden="true">↗</span>
      </button>
    </article>
  `).join("");
}

function renderTextBlock(block, index) {
  const facts = block.facts ? `<div class="fact-grid">${block.facts.map((fact) => `<div><strong>${fact.value}</strong><span>${fact.label}</span></div>`).join("")}</div>` : "";
  return `<section class="content-block" aria-labelledby="block-${index}"><p class="block-label">${block.label}</p><h3 id="block-${index}">${block.title}</h3><p>${block.body}</p>${facts}</section>`;
}

function renderVideoBlock(block, index) {
  if (block.url) {
    return `<section class="content-block" aria-labelledby="block-${index}"><p class="block-label">${block.label}</p><h3 id="block-${index}">${block.title}</h3><video controls preload="metadata" poster="assets/brunch-hero.png"><source src="${block.url}" />您的瀏覽器不支援影片播放。</video></section>`;
  }
  return `<section class="content-block" aria-labelledby="block-${index}"><p class="block-label">${block.label}</p><h3 id="block-${index}">${block.title}</h3><div class="video-placeholder"><img src="assets/brunch-hero.png" alt="" /><div><span class="play-glyph" aria-hidden="true">▶</span><strong>影片內容位置</strong><small>${block.note}</small></div></div></section>`;
}

function avocadoLab() {
  const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;padding:30px;font:16px/1.55 system-ui,sans-serif;background:#e8f2d4;color:#173423}h2{margin:0 0 6px;font-size:28px}p{margin:0 0 22px}.choices{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}button{padding:14px 8px;border:1px solid #173423;background:#fffdf5;color:#173423;font:700 15px system-ui;cursor:pointer}button:hover,button:focus{background:#ffca58}#result{margin-top:18px;padding:16px;border-left:5px solid #ef5a29;background:#fffdf5;font-weight:700}@media(max-width:450px){body{padding:20px}.choices{grid-template-columns:1fr}}</style></head><body><h2>今天的酪梨，熟了嗎？</h2><p>輕按蒂頭周圍，選擇最接近的觸感。</p><div class="choices"><button data-answer="還要等 2–3 天：放在室溫，和香蕉或蘋果一起收進紙袋可加速熟成。">硬實不動</button><button data-answer="今天正好：切開後拌入檸檬汁，立刻鋪上烤好的酸種麵包。">微微回彈</button><button data-answer="已經很熟：適合壓成醬或拌入蛋沙拉，記得先確認果肉沒有異味。">明顯柔軟</button></div><div id="result" aria-live="polite">點一個觸感，看看今天適合怎麼吃。</div><script>document.querySelectorAll('button').forEach(b=>b.onclick=()=>document.querySelector('#result').textContent=b.dataset.answer);<\/script></body></html>`;
  return html.replaceAll('"', '&quot;');
}

function renderHtmlBlock(block, index) {
  return `<section class="content-block" aria-labelledby="block-${index}"><p class="block-label">${block.label}</p><h3 id="block-${index}">${block.title}</h3><iframe class="html-frame" title="${block.title}" sandbox="allow-scripts" srcdoc="${avocadoLab()}"></iframe></section>`;
}

function renderSlidesBlock(block, index) {
  const slides = block.slides.map((slide, slideIndex) => `<article class="slide-page" data-slide="${slideIndex}" ${slideIndex ? "hidden" : ""}><span>${slide.kicker}</span><h4>${slide.title}</h4><p>${slide.body}</p></article>`).join("");
  return `<section class="content-block" aria-labelledby="block-${index}"><p class="block-label">${block.label}</p><h3 id="block-${index}">${block.title}</h3><div class="slide-shell" data-slideshow><div>${slides}</div><div class="slide-controls"><button type="button" data-prev aria-label="上一頁">←</button><span class="slide-count" aria-live="polite">01 / ${String(block.slides.length).padStart(2, "0")}</span><button type="button" data-next aria-label="下一頁">→</button></div></div></section>`;
}

function openEntry(entry) {
  const renderers = { text: renderTextBlock, video: renderVideoBlock, html: renderHtmlBlock, slides: renderSlidesBlock };
  dialogContent.innerHTML = `
    <header class="dialog-hero">
      <img src="assets/brunch-hero.png" alt="" style="object-position:${entry.mediaPosition}" />
      <p class="eyebrow"><span>${entry.number}</span> ${entry.category}</p>
      <h2 id="dialogTitle">${entry.title}</h2>
    </header>
    <div class="dialog-body">${entry.blocks.map((block, index) => renderers[block.type](block, index)).join("")}</div>`;
  dialog.showModal();
  initializeSlides();
  closeButton.focus();
}

function initializeSlides() {
  dialog.querySelectorAll("[data-slideshow]").forEach((shell) => {
    const slides = [...shell.querySelectorAll("[data-slide]")];
    const count = shell.querySelector(".slide-count");
    let current = 0;
    const show = (next) => {
      current = (next + slides.length) % slides.length;
      slides.forEach((slide, index) => { slide.hidden = index !== current; });
      count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    };
    shell.querySelector("[data-prev]").addEventListener("click", () => show(current - 1));
    shell.querySelector("[data-next]").addEventListener("click", () => show(current + 1));
  });
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-entry]");
  if (!button) return;
  const entry = entries.find((item) => item.id === button.dataset.entry);
  if (entry) openEntry(entry);
});
closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

renderCards();
