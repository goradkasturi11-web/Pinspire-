import { MaxHeap } from "./data-structures/max-heap.js";
import { LinkedList } from "./data-structures/linked-list.js";
import { Trie } from "./data-structures/trie.js";
import { FollowGraph } from "./data-structures/follow-graph.js";

(() => {
  "use strict";

  const categories = [
    { name: "All ideas", icon: "✳" }, { name: "Interiors", icon: "⌂" },
    { name: "Food", icon: "◉" }, { name: "Style", icon: "✦" },
    { name: "Outfits", icon: "♧" }, { name: "Nature", icon: "❋" },
    { name: "Travel", icon: "↗" }, { name: "Art", icon: "◒" },
    { name: "Crafts", icon: "✂" }, { name: "DIY", icon: "⌘" },
    { name: "Wallpapers", icon: "▧" }, { name: "Memes", icon: "☺" },
    { name: "Stickers", icon: "✿" }
  ];

  const seedPins = [
    ["p01", "Sunlit still life", "Interiors", "Mia Chen", "A quiet corner, a little morning light, and nowhere else to be.", "photo-1494438639946-1ebd1d20bf85", 246, 366],
    ["p02", "The long way home", "Travel", "Oliver Reed", "A winding road through the mountains of northern Italy.", "photo-1464822759023-fed622ff2c3b", 182, 0],
    ["p03", "Sunday table", "Food", "Nora James", "A simple table set for a slow Sunday lunch.", "photo-1547592180-85f173990554", 391, 0],
    ["p04", "Soft lines", "Interiors", "Studio Form", "Natural materials and sculptural shapes in a calm living space.", "photo-1616486338812-3dadae4b4ace", 159, 0],
    ["p05", "Coastal notes", "Nature", "Aya Flores", "Blue on blue, somewhere along the Mediterranean.", "photo-1519046904884-53103b34b206", 308, 0],
    ["p06", "A little color theory", "Art", "Theo Park", "Layers of warm color, cut and arranged by hand.", "photo-1549490349-8643362247b5", 133, 0],
    ["p07", "Market morning", "Food", "Mina Patel", "Fresh finds from a neighborhood farmers market.", "photo-1488459716781-31db52582fe9", 214, 0],
    ["p08", "Quiet architecture", "Interiors", "Mia Chen", "A study in warm plaster, shadow, and simple geometry.", "photo-1600210492486-724fe5c67fb0", 273, 0],
    ["p09", "Wildflower field", "Nature", "Luca Moretti", "A late afternoon walk through a field in bloom.", "photo-1490750967868-88aa4486c946", 432, 0],
    ["p10", "Weekend uniform", "Style", "Amara Okafor", "An easy combination in linen and soft neutrals.", "photo-1483985988355-763728e1935b", 167, 0],
    ["p11", "A cabin in the trees", "Travel", "Oliver Reed", "A tiny place to pause in the middle of the forest.", "photo-1449158743715-0a90ebb6d2d8", 299, 0],
    ["p12", "Ceramic experiments", "DIY", "Nora James", "Handmade forms, earthy glazes, and happy imperfections.", "photo-1578749556568-bc2c40e68b61", 124, 0],
    ["p13", "The little details", "Style", "Aya Flores", "Found textures and thoughtful details from an old city.", "photo-1515886657613-9f3515b0c78f", 205, 0],
    ["p14", "Green kitchen", "Interiors", "Studio Form", "A small kitchen with a big appetite for color.", "photo-1600607687939-ce8a6c25118c", 187, 0],
    ["p15", "After the rain", "Nature", "Luca Moretti", "A familiar path transformed by a passing shower.", "photo-1441974231531-c6227db76b6e", 344, 0],
    ["p16", "Berry season", "Food", "Mina Patel", "The best kind of dessert starts with the market.", "photo-1464965911861-746a04b4bca6", 93, 0],
    ["p17", "Colorful corners", "Art", "Theo Park", "A bright collection of details from a creative studio.", "photo-1494438639946-1ebd1d20bf85", 156, 0],
    ["p18", "A room to read", "Interiors", "Amara Okafor", "An inviting chair, a good book, and soft afternoon light.", "photo-1616486029423-aaa4789e8c9a", 220, 0],
    ["p19", "Color study: blue hour", "Art", "Theo Park", "Loose brushstrokes and a palette inspired by the last light of day.", "photo-1541961017774-22349e4a1262", 118, 0],
    ["p20", "Shapes in the sun", "Art", "Mia Chen", "A bright abstract canvas for a little color inspiration.", "photo-1549490349-8643362247b5", 142, 0],
    ["p21", "A very crafty afternoon", "Crafts", "Nora James", "Paper, fabric, paint, and a table full of weekend projects.", "photo-1452860606245-08befc0ff44b", 96, 0],
    ["p22", "Color on the cutting mat", "Crafts", "Mina Patel", "A cheerful workspace for making something by hand.", "photo-1513364776144-60967b0f800f", 104, 0],
    ["p23", "Botanical wallpaper study", "Wallpapers", "Studio Form", "A calming, original botanical repeat for your phone or desktop.", "assets/wallpaper-botanical.svg", 173, 0],
    ["p24", "A little daydream, on repeat", "Wallpapers", "Luca Moretti", "Save this soft landscape for your next screen refresh.", "photo-1500530855697-b586d89ba3ee", 127, 0],
    ["p25", "Out-the-door layers", "Outfits", "Amara Okafor", "Easy layers and a relaxed silhouette for everyday inspiration.", "photo-1529139574466-a303027c1d8b", 188, 0],
    ["p26", "The soft-neutral edit", "Outfits", "Aya Flores", "A wearable palette of warm neutrals, denim, and texture.", "photo-1523381210434-271e8be1f52b", 151, 0],
    ["p27", "Just one more pin", "Memes", "Theo Park", "Me: one last idea. Also me: making a whole new board.", "assets/meme-saver.svg", 205, 0],
    ["p28", "When the plan says ‘quick browse’", "Memes", "Nora James", "A tiny, relatable reminder that inspiration has no closing time.", "photo-1533738363-b7f9aef128ce", 142, 0],
    ["p29", "Cute little sticker sheet", "Stickers", "Mina Patel", "Original doodle stickers for journals, laptops, and happy mail.", "assets/sticker-sheet.svg", 231, 0],
    ["p30", "Planner day sticker collection", "Stickers", "Aya Flores", "A playful mix of tabs, checkmarks, flowers, and tiny reminders.", "assets/planner-stickers.svg", 164, 0]
  ].map(([id, title, category, _sampleAuthor, description, photo, likes, _unused]) => ({
    id, title, category, author: "Pinspire Picks", description,
    image: photo.startsWith("assets/")
      ? photo
      : `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=800&q=82`,
    likes, liked: false, comments: [], createdAt: Date.now() - Math.floor(Math.random() * 12 * 86400000),
    userCreated: false
  }));
  const storage = {
    read(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch (error) {
        console.error(`Could not read ${key} from browser storage.`, error);
        return fallback;
      }
    },
    write(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error(`Could not save ${key} to browser storage.`, error);
        showToast("Could not save changes in this browser.");
        return false;
      }
    }
  };

  function getRegisteredUsers() {
    const storedUsers = storage.read("pinspace_users", []);
    if (!Array.isArray(storedUsers)) return [];
    return storedUsers.filter(user =>
      user && typeof user.id === "string" && user.id.trim() &&
      typeof user.name === "string" && user.name.trim()
    );
  }

  let session = storage.read("pinspace_session", null);
  let pins = [...seedPins, ...storage.read("pinspace_user_pins", [])];
  const ownPinList = new LinkedList(storage.read("pinspace_my_pins", []));
  const boards = storage.read("pinspace_boards", ["Inspiration", "Places to go"]);
  const savedLists = new Map(boards.map(board => [board, new LinkedList(storage.read(`pinspace_saves_${board}`, []))]));
  const registeredIds = new Set(getRegisteredUsers().map(user => user.id));
  const storedGraph = storage.read("pinspace_graph", {});
  const realUserGraph = Object.fromEntries(
    Object.entries(storedGraph)
      .filter(([userId]) => registeredIds.has(userId))
      .map(([userId, edges]) => [
        userId,
        Array.isArray(edges) ? edges.filter(followedId => registeredIds.has(followedId)) : []
      ])
  );
  const graph = new FollowGraph(realUserGraph);
  const commentsByPin = storage.read("pinspace_comments", {});
  const ALL_SAVES = "__all_saves__";
  const userInterests = new Set(storage.read("pinspace_interests", []));
  let trie = new Trie();
  let selectedCategory = "All ideas";
  let currentView = "home";
  let currentBoard = "";
  let query = "";
  let sortMode = "For you";
  let modalPinId = null;
  let toastTimer;

  const $ = selector => document.querySelector(selector);
  const pinGrid = $("#pin-grid");
  const modal = $("#modal");
  const modalBackdrop = $("#modal-backdrop");

  function userKey() { return session && session.id ? session.id : "guest"; }
  function currentUserName() { return session ? session.name : "Guest explorer"; }
  function safeText(value) { return String(value == null ? "" : value); }
  function initials(name) { return safeText(name).split(/\s+/).slice(0, 2).map(part => part[0] || "").join("").toUpperCase() || "?"; }
  function personColor(name) {
    let hash = 0;
    for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) | 0;
    return `hsl(${Math.abs(hash) % 360} 24% 51%)`;
  }
  function imageUrl(pin) {
    return pin.image || "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=82";
  }
  function activeSavedList() {
    const name = currentBoard && currentBoard !== ALL_SAVES ? currentBoard : boards[0];
    if (!savedLists.has(name)) savedLists.set(name, new LinkedList());
    return savedLists.get(name);
  }
  function isPinSaved(pinId) {
    if (currentView === "boards" && currentBoard === ALL_SAVES) {
      return boards.some(board => savedLists.get(board).has(pinId));
    }
    return activeSavedList().has(pinId);
  }
  function persistUserData() {
    storage.write("pinspace_my_pins", ownPinList.toArray());
    storage.write("pinspace_graph", graph.toJSON());
    boards.forEach(board => storage.write(`pinspace_saves_${board}`, (savedLists.get(board) || new LinkedList()).toArray()));
    storage.write("pinspace_boards", boards);
  }
  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }
  function updateProfile() {
    $("#profile-name").textContent = currentUserName();
    $("#profile-label").textContent = session ? "Your creative space" : "Sign in to save ideas";
    $("#profile-avatar").textContent = initials(currentUserName());
    $("#profile-avatar").style.background = personColor(currentUserName());
  }
  function userLiked(pin) {
    return pin.likedBy ? pin.likedBy.includes(userKey()) : Boolean(pin.liked);
  }
  function setLiked(pin, liked) {
    pin.likedBy = pin.likedBy || [];
    pin.likedBy = pin.likedBy.filter(id => id !== userKey());
    if (liked) pin.likedBy.push(userKey());
    pin.liked = pin.likedBy.includes(userKey());
  }
  function likeCount(pin) {
    return Math.max(0, (Number(pin.likes) || 0) + (pin.likedBy || []).length);
  }

  function getScore(pin) {
    const ageDays = Math.max(0, (Date.now() - pin.createdAt) / 86400000);
    const freshness = Math.max(0, 30 - ageDays) / 30;
    const followed = pin.authorId && graph.breadthFirst(userKey()).includes(pin.authorId) ? 1 : 0;
    const interest = userInterests.has(pin.category) ? 3 : 0;
    return likeCount(pin) * 0.1 + freshness * 2 + followed * 4 + interest * 3 + (pin.userCreated ? 1 : 0);
  }
  function buildHeapFeed(list) {
    const heap = new MaxHeap();
    list.forEach(pin => heap.push({ pin, score: getScore(pin) }));
    const ordered = [];
    let item;
    while ((item = heap.pop())) ordered.push(item.pin);
    return { ordered, heapSize: heap.items.length, total: list.length };
  }
  function filterPins() {
    let list = pins.filter(pin => {
      const matchesCategory = selectedCategory === "All ideas" || pin.category === selectedCategory;
      const text = `${pin.title} ${pin.description} ${pin.author} ${pin.category}`.toLowerCase();
      const matchesQuery = !query || text.includes(query.toLowerCase());
      if (currentView === "following" && (!pin.authorId || !graph.breadthFirst(userKey()).includes(pin.authorId))) return false;
      if (currentView === "boards" && !(currentBoard === ALL_SAVES
        ? boards.some(board => savedLists.get(board).has(pin.id))
        : activeSavedList().has(pin.id))) return false;
      if (currentView === "my-pins" && !ownPinList.has(pin.id)) return false;
      return matchesCategory && matchesQuery;
    });
    if (currentView === "trending" || sortMode === "Popular") list.sort((a, b) => likeCount(b) - likeCount(a));
    else if (currentView === "recent" || sortMode === "Newest") list.sort((a, b) => b.createdAt - a.createdAt);
    else list = buildHeapFeed(list).ordered;
    return list;
  }

  function renderPin(pin) {
    const card = document.createElement("article");
    card.className = "pin-card";
    const imageWrap = document.createElement("div");
    imageWrap.className = "pin-image-wrap";
    imageWrap.tabIndex = 0;
    imageWrap.setAttribute("role", "button");
    imageWrap.setAttribute("aria-label", `Open pin: ${pin.title}`);
    const image = document.createElement("img");
    image.className = "pin-image";
    image.src = imageUrl(pin);
    image.alt = pin.title;
    image.loading = "lazy";
    image.addEventListener("error", () => { image.src = "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=82"; }, { once: true });
    imageWrap.append(image);
    const overlay = document.createElement("div");
    overlay.className = "pin-overlay";
    const saveButton = document.createElement("button");
    saveButton.className = `save-pin${isPinSaved(pin.id) ? " is-saved" : ""}`;
    saveButton.textContent = isPinSaved(pin.id) ? "Saved ✓" : "Save";
    saveButton.setAttribute("aria-label", isPinSaved(pin.id) ? "Remove saved pin" : "Save pin");
    saveButton.addEventListener("click", event => { event.stopPropagation(); toggleSave(pin); });
    const actions = document.createElement("div");
    actions.className = "pin-overlay-actions";
    const likeButton = document.createElement("button");
    likeButton.className = `round-action${userLiked(pin) ? " liked" : ""}`;
    likeButton.textContent = "♥";
    likeButton.title = userLiked(pin) ? "Unlike pin" : "Like pin";
    likeButton.setAttribute("aria-label", likeButton.title);
    likeButton.addEventListener("click", event => { event.stopPropagation(); toggleLike(pin); });
    const commentButton = document.createElement("button");
    commentButton.className = "round-action";
    commentButton.textContent = "···";
    commentButton.title = "View pin and comments";
    commentButton.setAttribute("aria-label", commentButton.title);
    commentButton.addEventListener("click", event => { event.stopPropagation(); openPin(pin.id); });
    actions.append(likeButton, commentButton);
    overlay.append(saveButton, actions);
    imageWrap.append(overlay);
    imageWrap.addEventListener("click", () => openPin(pin.id));
    imageWrap.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openPin(pin.id); }
    });
    const meta = document.createElement("div");
    meta.className = "pin-meta";
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = initials(pin.author);
    avatar.style.background = personColor(pin.author);
    const copy = document.createElement("div");
    copy.className = "pin-meta-copy";
    const author = document.createElement("strong");
    author.textContent = pin.author;
    const title = document.createElement("small");
    title.textContent = pin.title;
    copy.append(author, title);
    const count = document.createElement("span");
    count.className = "like-count";
    count.textContent = `♥ ${likeCount(pin)}`;
    meta.append(avatar, copy, count);
    card.append(imageWrap, meta);
    return card;
  }

  function renderFeed() {
    const filtered = filterPins();
    pinGrid.replaceChildren(...filtered.map(renderPin));
    $("#result-count").textContent = `${filtered.length} ${filtered.length === 1 ? "idea" : "ideas"}`;
    $("#empty-state").hidden = filtered.length !== 0;
    pinGrid.hidden = filtered.length === 0;
    updateDsaPanel();
  }

  function rebuildTrie() {
    const nextTrie = new Trie();
    categories.forEach(category => nextTrie.insert(category.name));
    pins.forEach(pin => {
      [pin.title, pin.author, pin.category].forEach(value => nextTrie.insert(value));
      pin.description.split(/\s+/).forEach(word => nextTrie.insert(word.replace(/[^\p{L}\p{N}-]/gu, "")));
    });
    trie = nextTrie;
  }

  function renderTopics() {
    const row = $("#topic-row");
    row.replaceChildren();
    categories.forEach(category => {
      const button = document.createElement("button");
      button.className = `topic-chip${selectedCategory === category.name ? " active" : ""}`;
      const icon = document.createElement("span");
      icon.textContent = category.icon;
      button.append(icon, document.createTextNode(category.name));
      button.addEventListener("click", () => {
        selectedCategory = category.name;
        if (category.name !== "All ideas") {
          userInterests.add(category.name);
          storage.write("pinspace_interests", Array.from(userInterests));
        }
        if (currentView === "home") currentView = "explore";
        updateNavigation();
        renderTopics();
        renderFeed();
      });
      row.append(button);
    });
  }

  function renderBoards() {
    const nav = $("#board-nav");
    nav.replaceChildren();
    const allButton = document.createElement("button");
    allButton.className = `board-item${currentView === "boards" && currentBoard === ALL_SAVES ? " active" : ""}`;
    allButton.textContent = "▧  All saves";
    const allCount = document.createElement("span");
    allCount.className = "board-count";
    allCount.textContent = String(boards.reduce((count, board) => count + savedLists.get(board).length, 0));
    allButton.append(allCount);
    allButton.addEventListener("click", () => selectBoard(ALL_SAVES));
    nav.append(allButton);
    boards.forEach((board, index) => {
      const button = document.createElement("button");
      button.className = `board-item${currentView === "boards" && currentBoard === board ? " active" : ""}`;
      const thumb = document.createElement("img");
      thumb.className = "board-thumb";
      const saved = savedLists.get(board).toArray();
      const firstPin = pins.find(pin => pin.id === saved[0]);
      thumb.src = firstPin ? imageUrl(firstPin) : `https://images.unsplash.com/photo-${index % 2 ? "1513519245088-0e12902e5a38" : "1494438639946-1ebd1d20bf85"}?auto=format&fit=crop&w=100&q=60`;
      thumb.alt = "";
      const label = document.createElement("span");
      label.textContent = board;
      const count = document.createElement("span");
      count.className = "board-count";
      count.textContent = String(savedLists.get(board).length);
      button.append(thumb, label, count);
      button.addEventListener("click", () => selectBoard(board));
      nav.append(button);
    });
  }

  function updateNavigation() {
    document.querySelectorAll(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === currentView));
    const headers = {
      home: ["YOUR DAILY DOSE OF INSPIRATION", "Find your next", "Picked for you", "A personal mix shaped by the topics you explore, pins you like, and people you follow."],
      explore: ["A WORLD OF GOOD IDEAS", "Explore what moves you", "Explore ideas", "Follow a thread and see where it takes you."],
      following: ["YOUR CREATIVE CIRCLE", "Ideas from your people", "Following", "Fresh inspiration from the creators in your network."],
      trending: ["WHAT’S CATCHING ON", "The ideas in motion", "Trending now", "Popular pins, ranked by the community’s likes."],
      boards: ["YOUR SAVED INSPIRATION", "Keep good ideas close", currentBoard === ALL_SAVES ? "All saves" : currentBoard || "All saves", "Everything you save, collected in one place."],
      "my-pins": ["MADE BY YOU", "Your ideas, shared", "My pins", "A little corner of the internet for what you create."],
      recent: ["JUST ADDED", "Fresh off the board", "Newest pins", "The latest ideas added to Pinspire."]
    };
    const [eyebrow, title, feedTitle, subtitle] = headers[currentView] || headers.home;
    $("#eyebrow-text").textContent = eyebrow;
    $("#page-title").textContent = "";
    $("#page-title").append(document.createTextNode(title + " "));
    const em = document.createElement("em");
    em.textContent = currentView === "home" ? "big idea." : currentView === "trending" ? "right now." : "your way.";
    $("#page-title").append(em);
    $("#feed-title").textContent = feedTitle;
    $("#page-subtitle").textContent = subtitle;
    renderBoards();
  }

  function updateDsaPanel() {
    const heap = new MaxHeap();
    const eligible = pins.filter(pin => !query || `${pin.title} ${pin.description} ${pin.category} ${pin.author}`.toLowerCase().includes(query.toLowerCase()));
    eligible.forEach(pin => heap.push({ pin, score: getScore(pin) }));
    $("#heap-count").textContent = String(heap.items.length);
    const bars = $("#heap-bars");
    bars.replaceChildren();
    heap.items.slice(0, 9).forEach(item => {
      const bar = document.createElement("i");
      bar.style.height = `${Math.max(15, Math.min(100, 25 + item.score * 8))}%`;
      bars.append(bar);
    });
    $("#trie-count").textContent = String(trie.size);
    $("#my-pins-count").textContent = String(ownPinList.length);
    $("#saved-count").textContent = String(boards.reduce((sum, board) => sum + (savedLists.get(board) || new LinkedList()).length, 0));
    $("#following-count").textContent = String(graph.neighbors(userKey()).length);
  }

  function selectBoard(board) {
    currentBoard = board;
    currentView = "boards";
    selectedCategory = "All ideas";
    query = "";
    $("#search-input").value = "";
    updateNavigation();
    renderTopics();
    renderFeed();
  }

  function savePin(pin, boardName = currentBoard || boards[0]) {
    if (!savedLists.has(boardName)) savedLists.set(boardName, new LinkedList());
    const list = savedLists.get(boardName);
    if (list.has(pin.id)) return false;
    list.append(pin.id);
    persistUserData();
    renderBoards();
    return true;
  }
  function toggleSave(pin) {
    let list = activeSavedList();
    if (currentView === "boards" && currentBoard === ALL_SAVES) {
      list = boards.map(board => savedLists.get(board)).find(boardList => boardList.has(pin.id)) || list;
    }
    const boardLabel = boards.find(board => savedLists.get(board) === list) || boards[0];
    if (list.has(pin.id)) {
      list.remove(pin.id);
      persistUserData();
      showToast(`Removed from ${boardLabel}.`);
    } else {
      list.append(pin.id);
      persistUserData();
      showToast(`Saved to ${boardLabel}.`);
      userInterests.add(pin.category);
      storage.write("pinspace_interests", Array.from(userInterests));
    }
    renderBoards();
    renderFeed();
    if (modalPinId === pin.id && !modalBackdrop.hidden) openPin(pin.id);
  }
  function toggleLike(pin) {
    setLiked(pin, !userLiked(pin));
    if (userLiked(pin)) {
      userInterests.add(pin.category);
      storage.write("pinspace_interests", Array.from(userInterests));
    }
    if (pin.userCreated) storage.write("pinspace_user_pins", pins.filter(item => item.userCreated));
    renderFeed();
    if (modalPinId === pin.id && !modalBackdrop.hidden) openPin(pin.id);
  }

  function openModal(markup) {
    modal.innerHTML = markup;
    modalBackdrop.hidden = false;
    const close = modal.querySelector(".modal-close");
    if (close) close.addEventListener("click", closeModal);
    modalBackdrop.onclick = event => { if (event.target === modalBackdrop) closeModal(); };
    const firstInput = modal.querySelector("input, textarea, select, button");
    if (firstInput) firstInput.focus();
  }
  function closeModal() {
    modalBackdrop.hidden = true;
    modalPinId = null;
    modal.replaceChildren();
  }

  function showAccountNotice(title, message) {
    openModal(`<button class="modal-close" aria-label="Close">×</button><div class="modal-body">
      <div class="modal-kicker">ACCOUNT UPDATE</div><h2 id="modal-title">${escapeHtml(title)}</h2>
      <p class="modal-subtitle">${escapeHtml(message)}</p>
      <button class="primary-button" id="account-notice-dismiss">Continue</button>
    </div>`);
    $("#account-notice-dismiss").addEventListener("click", closeModal);
  }

  function confirmAccountDeletion() {
    openModal(`<button class="modal-close" aria-label="Close">×</button><div class="modal-body">
      <div class="modal-kicker">ACCOUNT SETTINGS</div><h2 id="modal-title">Delete your account?</h2>
      <p class="modal-subtitle">This removes your local account, uploaded pins, likes, comments, and follow links from this browser. Boards and saves remain because this demo stores them separately from accounts.</p>
      <button class="danger-button" id="confirm-delete-account">Delete account</button>
      <button class="secondary-button" id="cancel-delete-account" style="width:100%;margin-top:9px">Keep my account</button>
    </div>`);
    $("#confirm-delete-account").addEventListener("click", deleteCurrentAccount);
    $("#cancel-delete-account").addEventListener("click", closeModal);
  }

  function deleteCurrentAccount() {
    if (!session) return;
    const deletedUser = session;
    const accounts = getRegisteredUsers().filter(user => user.id !== deletedUser.id);
    if (!storage.write("pinspace_users", accounts)) return;

    const removedPinIds = new Set(pins
      .filter(pin => pin.userCreated && (
        pin.authorId === deletedUser.id ||
        (!pin.authorId && pin.author === deletedUser.name)
      ))
      .map(pin => pin.id));
    pins = pins.filter(pin => !removedPinIds.has(pin.id));
    removedPinIds.forEach(pinId => ownPinList.remove(pinId));
    pins.forEach(pin => {
      if (pin.likedBy) pin.likedBy = pin.likedBy.filter(userId => userId !== deletedUser.id);
    });

    graph.neighbors(deletedUser.id).forEach(followedId => graph.removeEdge(deletedUser.id, followedId));
    getRegisteredUsers().forEach(user => graph.removeEdge(user.id, deletedUser.id));
    graph.adjacency.delete(deletedUser.id);
    Object.keys(commentsByPin).forEach(pinId => {
      if (Array.isArray(commentsByPin[pinId])) {
        commentsByPin[pinId] = commentsByPin[pinId].filter(comment => comment.authorId !== deletedUser.id);
      }
    });
    boards.forEach(board => {
      const savedPins = savedLists.get(board);
      removedPinIds.forEach(pinId => savedPins.remove(pinId));
    });

    session = null;
    storage.write("pinspace_session", null);
    storage.write("pinspace_user_pins", pins.filter(pin => pin.userCreated));
    storage.write("pinspace_comments", commentsByPin);
    persistUserData();
    currentView = "home";
    currentBoard = "";
    selectedCategory = "All ideas";
    query = "";
    $("#search-input").value = "";
    updateProfile();
    updateNavigation();
    renderTopics();
    renderFeed();
    showAccountNotice("Account deleted", "Your account and account-linked content were removed from this browser.");
  }

  function openAuth(mode = "signup") {
    const isSignup = mode === "signup";
    openModal(`<button class="modal-close" aria-label="Close">×</button><div class="modal-body">
      <div class="modal-kicker">MAKE SPACE FOR INSPIRATION</div><h2 id="modal-title">${isSignup ? "Create your account" : "Welcome back"}</h2>
      <p class="modal-subtitle">A personal space to collect and share the ideas you love.</p>
      <form id="auth-form">
        ${isSignup ? '<div class="form-field"><label for="auth-name">Your name</label><input id="auth-name" name="name" required maxlength="40" autocomplete="name" placeholder="How should we call you?"></div>' : ""}
        <div class="form-field"><label for="auth-email">Email address</label><input id="auth-email" name="email" type="email" required autocomplete="email" placeholder="you@example.com"></div>
        <div class="form-field"><label for="auth-password">Password</label><input id="auth-password" name="password" type="password" required minlength="8" autocomplete="${isSignup ? "new-password" : "current-password"}" placeholder="At least 8 characters"></div>
        <button class="primary-button" type="submit">${isSignup ? "Create account" : "Sign in"}</button>
      </form>
      <p class="auth-switch">${isSignup ? "Already have an account?" : "New to Pinspire?"} <button type="button" id="auth-switch">${isSignup ? "Sign in" : "Create account"}</button></p>
      <p class="auth-switch">Demo note: accounts are stored only in this browser.</p>
    </div>`);
    $("#auth-switch").addEventListener("click", () => openAuth(isSignup ? "login" : "signup"));
    $("#auth-form").addEventListener("submit", async event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const email = safeText(form.get("email")).trim().toLowerCase();
      const password = safeText(form.get("password"));
      try {
        const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
        const passwordHash = Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
        const accounts = storage.read("pinspace_users", []);
        if (isSignup) {
          const name = safeText(form.get("name")).trim();
          if (accounts.some(account => account.email === email)) { showToast("An account already uses that email."); return; }
          const account = { id: `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`, name, email, passwordHash };
          accounts.push(account);
          if (!storage.write("pinspace_users", accounts)) return;
          session = { id: account.id, name: account.name, email };
        } else {
          const account = accounts.find(item => item.email === email && item.passwordHash === passwordHash);
          if (!account) { showToast("That email and password didn’t match."); return; }
          session = { id: account.id, name: account.name, email };
        }
        storage.write("pinspace_session", session);
        updateProfile();
        closeModal();
        renderFeed();
        showAccountNotice(
          isSignup ? "Welcome to Pinspire!" : `Welcome back, ${session.name}!`,
          isSignup ? "Your creative space is ready. Start collecting ideas you love." : "You’re signed in and ready to explore your ideas."
        );
      } catch (error) {
        console.error("Could not complete local account sign-in.", error);
        showToast("Account sign-in isn’t available in this browser.");
      }
    });
  }

  function openUpload() {
    openModal(`<button class="modal-close" aria-label="Close">×</button><div class="modal-body">
      <div class="modal-kicker">ADD TO THE INSPIRATION</div><h2 id="modal-title">Create a pin</h2>
      <p class="modal-subtitle">Share something you made, found, or can’t stop thinking about.</p>
      <form id="upload-form">
        <div class="form-field"><label for="pin-title">Pin title</label><input id="pin-title" name="title" maxlength="70" required placeholder="Give your idea a name"></div>
        <div class="form-field"><label for="pin-image">Image URL</label><input id="pin-image" name="image" type="url" required placeholder="https://…"></div>
        <div class="form-field"><label for="pin-category">Category</label><select id="pin-category" name="category">${categories.filter(item => item.name !== "All ideas").map(item => `<option>${item.name}</option>`).join("")}</select></div>
        <div class="form-field"><label for="pin-description">A few words (optional)</label><textarea id="pin-description" name="description" maxlength="240" placeholder="What caught your eye?"></textarea></div>
        <button class="primary-button" type="submit">Publish pin</button>
      </form>
    </div>`);
    $("#upload-form").addEventListener("submit", event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const image = safeText(form.get("image")).trim();
      if (!/^https?:\/\//i.test(image)) { showToast("Please use an image URL that starts with http or https."); return; }
      const pin = {
        id: `user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        title: safeText(form.get("title")).trim(), category: safeText(form.get("category")),
        author: currentUserName(), authorId: session ? userKey() : null,
        description: safeText(form.get("description")).trim(),
        image, likes: 0, likedBy: [], comments: [], createdAt: Date.now(), userCreated: true
      };
      pins.unshift(pin);
      ownPinList.append(pin.id);
      storage.write("pinspace_user_pins", pins.filter(item => item.userCreated));
      persistUserData();
      rebuildTrie();
      currentView = "my-pins";
      currentBoard = "";
      selectedCategory = "All ideas";
      updateNavigation();
      renderTopics();
      renderFeed();
      closeModal();
      showToast("Your pin is live.");
    });
  }

  function openPin(id) {
    const pin = pins.find(item => item.id === id);
    if (!pin) return;
    modalPinId = id;
    const comments = [...(pin.comments || []), ...(commentsByPin[id] || [])];
    const commentItems = comments.map(comment => `<div class="comment-item"><strong>${escapeHtml(comment.author)}</strong>${escapeHtml(comment.text)}</div>`).join("");
    openModal(`<button class="modal-close" aria-label="Close">×</button><div class="pin-detail">
      <img class="pin-detail-image" src="${escapeHtml(imageUrl(pin))}" alt="${escapeHtml(pin.title)}">
      <div class="pin-detail-copy">
        <div class="modal-kicker">${escapeHtml(pin.category.toUpperCase())}</div><h2 id="modal-title">${escapeHtml(pin.title)}</h2>
        <div class="detail-author"><span class="avatar" style="background:${personColor(pin.author)}">${escapeHtml(initials(pin.author))}</span>${escapeHtml(pin.author)}</div>
        <p class="detail-description">${escapeHtml(pin.description || "A little inspiration, saved for later.")}</p>
        <div class="detail-actions"><button class="primary-button" id="detail-save">${isPinSaved(pin.id) ? "Saved ✓" : "Save pin"}</button><button class="secondary-button" id="detail-like">${userLiked(pin) ? "♥ Liked" : "♡ Like"} · ${likeCount(pin)}</button></div>
        <div class="comments"><h3>Conversation <span style="color:#999;font-weight:400">(${comments.length})</span></h3>
          <div class="comment-list">${commentItems || '<div class="comment-item">No comments yet. Start the conversation.</div>'}</div>
          <form class="comment-form" id="comment-form"><input name="comment" maxlength="220" required placeholder="Add a thoughtful comment…"><button type="submit">Post</button></form>
        </div>
      </div>
    </div>`);
    modal.querySelector("#detail-save").addEventListener("click", () => toggleSave(pin));
    modal.querySelector("#detail-like").addEventListener("click", () => toggleLike(pin));
    modal.querySelector("#comment-form").addEventListener("submit", event => {
      event.preventDefault();
      const text = safeText(new FormData(event.currentTarget).get("comment")).trim();
      if (!text) return;
      if (!commentsByPin[id]) commentsByPin[id] = [];
      commentsByPin[id].push({
        author: currentUserName(),
        authorId: session ? userKey() : null,
        text,
        createdAt: Date.now()
      });
      storage.write("pinspace_comments", commentsByPin);
      openPin(id);
      showToast("Comment added.");
    });
  }

  function escapeHtml(value) {
    return safeText(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  function openAbout() {
    openModal(`<button class="modal-close" aria-label="Close">×</button><div class="modal-body">
      <div class="modal-kicker">PINSPACE · DSA PROJECT</div><h2 id="modal-title">A visual discovery playground</h2>
      <p class="modal-subtitle">Pinspire is an interactive Pinterest-inspired demo where the data structures are part of the product—not just a diagram.</p>
      <div class="structure-metric"><span>Home feed</span><b>Max heap · priority ranking</b></div>
      <div class="structure-metric"><span>Pins &amp; board saves</span><b>Linked lists</b></div>
      <div class="structure-metric"><span>Search suggestions</span><b>Prefix trie</b></div>
      <div class="structure-metric"><span>Following &amp; discovery</span><b>Graph · BFS</b></div>
      <p class="modal-subtitle" style="margin-top:16px">This is a front-end demonstration. Accounts, boards, follows, pins, and comments stay in this browser’s local storage; there is no server or shared community data. The visible sample pins are content fixtures, not user reviews or testimonials.</p>
    </div>`);
  }

  function renderSuggestions() {
    const box = $("#suggestions");
    const normalized = query.trim().toLowerCase();
    if (!normalized) { box.hidden = true; box.replaceChildren(); return; }
    const matches = trie.search(normalized, 6);
    box.replaceChildren();
    const label = document.createElement("div");
    label.className = "suggestion-label";
    label.textContent = "Suggestions · prefix trie";
    box.append(label);
    matches.forEach(word => {
      const button = document.createElement("button");
      button.className = "suggestion-item";
      button.setAttribute("role", "option");
      button.textContent = word;
      const suffix = document.createElement("span");
      suffix.textContent = "· search";
      button.append(suffix);
      button.addEventListener("click", () => applySearch(word));
      box.append(button);
    });
    const searchButton = document.createElement("button");
    searchButton.className = "suggestion-item";
    searchButton.textContent = `Search pins for “${normalized}”`;
    searchButton.addEventListener("click", () => applySearch(normalized));
    box.append(searchButton);
    box.hidden = false;
  }
  function applySearch(value) {
    query = value.trim();
    $("#search-input").value = query;
    $("#suggestions").hidden = true;
    if (currentView !== "boards" && currentView !== "my-pins") currentView = "explore";
    updateNavigation();
    renderFeed();
  }

  function renderFollowSuggestions() {
    const followed = new Set(graph.neighbors(userKey()));
    const suggestions = getRegisteredUsers()
      .filter(user => user.id !== userKey() && !followed.has(user.id))
      .slice(0, 8);
    if (!session || suggestions.length === 0) {
      const title = session ? "No other users yet" : "Sign in to follow people";
      const message = session
        ? "There are no other registered accounts in this browser yet. Demo pins are curated examples, not followable users. Shared people will appear here when a backend is connected."
        : "Sign in to discover other registered accounts. This local demo has no shared user directory yet.";
      const action = session ? "" : '<button class="primary-button" id="follow-signin">Sign in or create an account</button>';
      openModal(`<button class="modal-close" aria-label="Close">×</button><div class="modal-body"><div class="modal-kicker">YOUR CREATIVE CIRCLE</div><h2 id="modal-title">${title}</h2><p class="modal-subtitle">${message}</p>${action}</div>`);
      const signInButton = modal.querySelector("#follow-signin");
      if (signInButton) signInButton.addEventListener("click", () => openAuth(getRegisteredUsers().length ? "login" : "signup"));
      return;
    }
    const rows = suggestions.map(user => `<div class="structure-metric"><span>${escapeHtml(user.name)}</span><button class="secondary-button follow-action" data-user-id="${escapeHtml(user.id)}">＋ Follow</button></div>`).join("");
    openModal(`<button class="modal-close" aria-label="Close">×</button><div class="modal-body"><div class="modal-kicker">YOUR CREATIVE CIRCLE</div><h2 id="modal-title">Find your people</h2><p class="modal-subtitle">Only accounts registered in this app are listed. The local demo shows accounts from this browser; a backend is needed to discover people across devices.</p><div>${rows}</div></div>`);
    modal.querySelectorAll(".follow-action").forEach(button => button.addEventListener("click", () => {
      graph.addEdge(userKey(), button.dataset.userId);
      persistUserData();
      const user = suggestions.find(candidate => candidate.id === button.dataset.userId);
      button.textContent = "Following ✓";
      button.disabled = true;
      updateDsaPanel();
      renderFeed();
      showToast(`You’re now following ${user.name}.`);
    }));
  }

  function createBoard() {
    const name = window.prompt("Name your new board");
    if (name === null) return;
    const cleaned = name.trim().slice(0, 32);
    if (!cleaned) { showToast("Board name can’t be empty."); return; }
    if (boards.some(board => board.toLowerCase() === cleaned.toLowerCase())) { showToast("You already have a board with that name."); return; }
    boards.push(cleaned);
    savedLists.set(cleaned, new LinkedList());
    currentBoard = cleaned;
    currentView = "boards";
    persistUserData();
    updateNavigation();
    renderTopics();
    renderFeed();
    showToast(`Created “${cleaned}”.`);
  }

  function cycleSort() {
    const modes = ["For you", "Popular", "Newest"];
    sortMode = modes[(modes.indexOf(sortMode) + 1) % modes.length];
    $("#sort-button").innerHTML = `✧ <span>${sortMode}</span><span class="chevron">⌄</span>`;
    renderFeed();
  }

  function openDsa() {
    const panel = $("#dsa-panel");
    panel.hidden = false;
    $("#panel-backdrop").hidden = false;
    updateDsaPanel();
  }
  function closeDsa() {
    $("#dsa-panel").hidden = true;
    $("#panel-backdrop").hidden = true;
  }

  document.querySelectorAll(".nav-item").forEach(button => button.addEventListener("click", () => {
    currentView = button.dataset.view;
    currentBoard = "";
    selectedCategory = "All ideas";
    query = "";
    $("#search-input").value = "";
    updateNavigation();
    renderTopics();
    renderFeed();
    if (currentView === "following" && graph.neighbors(userKey()).length === 0) renderFollowSuggestions();
  }));
  $("#search-input").addEventListener("input", event => {
    query = event.target.value.trim();
    renderSuggestions();
    renderFeed();
  });
  $("#search-input").addEventListener("keydown", event => {
    if (event.key === "Enter") applySearch($("#search-input").value);
    if (event.key === "Escape") $("#suggestions").hidden = true;
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".search-wrap")) $("#suggestions").hidden = true;
  });
  document.addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); $("#search-input").focus(); }
    if (event.key === "Escape") { closeModal(); closeDsa(); }
  });
  $("#upload-button").addEventListener("click", openUpload);
  $("#profile-switch").addEventListener("click", () => session ? openModal(`<button class="modal-close" aria-label="Close">×</button><div class="modal-body"><div class="modal-kicker">YOUR CREATIVE SPACE</div><h2 id="modal-title">Hello, ${escapeHtml(session.name)}.</h2><p class="modal-subtitle">Your pins, saves, and follows are stored in this browser.</p><button class="primary-button" id="my-pins-button">View my pins</button><button class="secondary-button" id="signout-button" style="width:100%;margin-top:9px">Sign out</button><button class="danger-button" id="delete-account-button">Delete account</button></div>`) : openAuth(storage.read("pinspace_users", []).length ? "login" : "signup"));
  $("#profile-switch").addEventListener("click", () => {
    const myPins = modal.querySelector("#my-pins-button");
    const signOut = modal.querySelector("#signout-button");
    const deleteAccount = modal.querySelector("#delete-account-button");
    if (myPins) myPins.addEventListener("click", () => { currentView = "my-pins"; updateNavigation(); renderFeed(); closeModal(); });
    if (deleteAccount) deleteAccount.addEventListener("click", confirmAccountDeletion);
    if (signOut) signOut.addEventListener("click", () => {
      session = null;
      storage.write("pinspace_session", null);
      updateProfile();
      closeModal();
      renderFeed();
      showAccountNotice("You’ve signed out.", "Your saved ideas are still here when you come back.");
    });
  });
  $("#add-board").addEventListener("click", createBoard);
  $("#sort-button").addEventListener("click", cycleSort);
  $("#clear-filters").addEventListener("click", () => {
    query = "";
    selectedCategory = "All ideas";
    $("#search-input").value = "";
    renderTopics();
    renderFeed();
  });
  $("#dsa-toggle").addEventListener("click", openDsa);
  $("#close-dsa").addEventListener("click", closeDsa);
  $("#panel-backdrop").addEventListener("click", closeDsa);
  $("#about-button").addEventListener("click", openAbout);

  rebuildTrie();
  updateProfile();
  updateNavigation();
  renderTopics();
  renderFeed();
})();
