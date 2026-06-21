(function () {
  function normalize(value) {
    return String(value || "").toLowerCase();
  }

  document.querySelectorAll("pre").forEach((pre) => {
    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.textContent = "Copy";
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(pre.innerText);
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1200);
    });
    pre.append(button);
  });

  document.querySelectorAll("[data-filter-table]").forEach((panel) => {
    const table = document.getElementById(panel.dataset.filterTable);
    const controls = Array.from(panel.querySelectorAll("[data-filter], [data-search]"));
    function applyFilters() {
      const query = normalize(panel.querySelector("[data-search]")?.value);
      table.querySelectorAll("tbody tr").forEach((row) => {
        const matchesQuery = !query || normalize(row.dataset.search).includes(query);
        const matchesControls = controls.every((control) => {
          if (!control.dataset.filter || !control.value) return true;
          return row.dataset[control.dataset.filter] === control.value;
        });
        row.hidden = !(matchesQuery && matchesControls);
      });
    }
    controls.forEach((control) => control.addEventListener("input", applyFilters));
  });

  document.querySelectorAll("[data-filter-cards]").forEach((panel) => {
    const grid = document.getElementById(panel.dataset.filterCards);
    const controls = Array.from(panel.querySelectorAll("[data-filter], [data-search]"));
    function applyFilters() {
      const query = normalize(panel.querySelector("[data-search]")?.value);
      grid.querySelectorAll("[data-search]").forEach((card) => {
        const matchesQuery = !query || normalize(card.dataset.search).includes(query);
        const matchesControls = controls.every((control) => {
          if (!control.dataset.filter || !control.value) return true;
          return card.dataset[control.dataset.filter] === control.value;
        });
        card.hidden = !(matchesQuery && matchesControls);
      });
    }
    controls.forEach((control) => control.addEventListener("input", applyFilters));
  });

  const globalSearch = document.getElementById("global-search");
  if (globalSearch) {
    const data = JSON.parse(document.getElementById("search-data").textContent);
    const results = document.createElement("div");
    results.className = "search-results";
    results.hidden = true;
    globalSearch.parentElement.append(results);

    globalSearch.addEventListener("input", () => {
      const query = normalize(globalSearch.value).trim();
      if (!query) {
        results.hidden = true;
        results.innerHTML = "";
        return;
      }
      const matches = data
        .filter((item) => normalize(`${item.title} ${item.text}`).includes(query))
        .slice(0, 8);
      results.innerHTML = matches.length
        ? matches.map((item) => `<a href="${item.href}"><strong>${item.title}</strong><em>${item.type || "page"}</em><span>${item.text.slice(0, 110)}</span></a>`).join("")
        : "<p>No matches</p>";
      results.hidden = false;
    });
  }

  const pageSearch = document.getElementById("page-search");
  const pageSearchResults = document.getElementById("page-search-results");
  if (pageSearch && pageSearchResults) {
    const data = JSON.parse(document.getElementById("search-data").textContent);
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") || "";
    pageSearch.value = initialQuery;

    function excerpt(text, query) {
      const clean = String(text || "").replace(/\s+/g, " ").trim();
      const index = normalize(clean).indexOf(normalize(query));
      const start = Math.max(0, index - 70);
      return clean.slice(start, start + 240);
    }

    function renderResults() {
      const query = normalize(pageSearch.value).trim();
      if (!query) {
        pageSearchResults.innerHTML = "<p class=\"muted\">Type a command, filename, backend, patch, source, or phrase to search the full recovered pack.</p>";
        return;
      }
      const terms = query.split(/\s+/).filter(Boolean);
      const matches = data
        .map((item) => {
          const haystack = normalize(`${item.title} ${item.text}`);
          const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
          return { item, score };
        })
        .filter((row) => row.score > 0)
        .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
        .slice(0, 50);
      pageSearchResults.innerHTML = matches.length
        ? matches.map(({ item }) => `<a class="result-card" href="${item.href}">
            <span class="badge">${item.type || "page"}</span>
            <strong>${item.title}</strong>
            <span>${excerpt(item.text, query)}</span>
          </a>`).join("")
        : "<p class=\"muted\">No matches. Try a broader term or inspect the local archive.</p>";
    }

    pageSearch.addEventListener("input", () => {
      const nextUrl = pageSearch.value ? `?q=${encodeURIComponent(pageSearch.value)}` : window.location.pathname;
      window.history.replaceState(null, "", nextUrl);
      renderResults();
    });
    renderResults();
    pageSearch.focus();
  }
})();
