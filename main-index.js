/* =========================
   DOM READY
========================= */
document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     HEADER MENU TOGGLE (Mobile)
  ========================= */
  const menuBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("appleNav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("active");
      console.log("hamburger clicked");
    });
  } else {
    console.warn("Mobile menu button ya nav nahi mila");
  }

  /* =========================
     DARK / LIGHT MODE
  ========================= */
  const themeToggleBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  // 🔹 SEO + mobile browser theme color
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  // Apply saved theme on load
  if (savedTheme === "dark") {
    document.body.classList.add("dark");

    if (themeToggleBtn) {
      themeToggleBtn.innerText = "☀️";
    }

    if (metaTheme) {
      metaTheme.setAttribute("content", "#0b1220");
    }
  } else {
    if (metaTheme) {
      metaTheme.setAttribute("content", "#ffffff");
    }
  }

  // Toggle theme on click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "dark");
        themeToggleBtn.innerText = "☀️";

        if (metaTheme) {
          metaTheme.setAttribute("content", "#0b1220");
        }

      } else {
        localStorage.setItem("theme", "light");
        themeToggleBtn.innerText = "🌙";

        if (metaTheme) {
          metaTheme.setAttribute("content", "#ffffff");
        }
      }
    });
  }

});
/* ===== Tools24 FAQ Accordion ===== */
(function () {
  "use strict";

  function initTools24FAQ() {
    var list = document.getElementById("tools24-faq-list");
    if (!list) return;

    var questions = list.querySelectorAll(".tools24-faq__question");

    questions.forEach(function (btn) {
      var item = btn.closest(".tools24-faq__item");
      var answerId = btn.getAttribute("aria-controls");
      var answer = answerId ? document.getElementById(answerId) : null;

      if (!item || !answer) return;

      btn.addEventListener("click", function () {
        var isOpen = btn.getAttribute("aria-expanded") === "true";

        // Close all other items first (accordion behavior)
        questions.forEach(function (otherBtn) {
          if (otherBtn !== btn) {
            var otherItem = otherBtn.closest(".tools24-faq__item");
            var otherAnswerId = otherBtn.getAttribute("aria-controls");
            var otherAnswer = otherAnswerId ? document.getElementById(otherAnswerId) : null;
            
            otherBtn.setAttribute("aria-expanded", "false");
            if (otherItem) otherItem.classList.remove("is-open");
            if (otherAnswer) otherAnswer.setAttribute("hidden", "");
          }
        });

        // Toggle the clicked item
        if (isOpen) {
          btn.setAttribute("aria-expanded", "false");
          item.classList.remove("is-open");
          answer.setAttribute("hidden", "");
        } else {
          btn.setAttribute("aria-expanded", "true");
          item.classList.add("is-open");
          answer.removeAttribute("hidden");
        }
      });

      // Keyboard accessibility (Arrow keys, Home, End)
      btn.addEventListener("keydown", function (e) {
        var current = Array.prototype.indexOf.call(questions, btn);
        var target = null;

        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          target = questions[(current + 1) % questions.length];
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          target = questions[(current - 1 + questions.length) % questions.length];
        } else if (e.key === "Home") {
          e.preventDefault();
          target = questions[0];
        } else if (e.key === "End") {
          e.preventDefault();
          target = questions[questions.length - 1];
        }

        if (target) target.focus();
      });
    });
  }

  // Run on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTools24FAQ);
  } else {
    initTools24FAQ();
  }
})();

(() => {
  const searchInput = document.getElementById("toolSearch");
  const clearButton = document.getElementById("clearToolSearch");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const toolButtons = document.querySelectorAll(".tool-name-btn");
  const noResults = document.getElementById("noToolsMessage");

  // Avoid running if the section is not present on this page.
  if (!searchInput || !clearButton || !noResults) return;

  let activeCategory = "all";

  function filterTools() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    toolButtons.forEach((tool) => {
      const category = tool.dataset.category || "other";
      const keywords = tool.dataset.keywords || "";
      const searchableText =
        `${tool.textContent} ${keywords}`.toLowerCase();

      const matchesCategory =
        activeCategory === "all" ||
        category === activeCategory;

      const matchesSearch = searchableText.includes(query);
      const visible = matchesCategory && matchesSearch;

      tool.hidden = !visible;

      if (visible) visibleCount++;
    });

    noResults.hidden = visibleCount > 0;
    clearButton.hidden = searchInput.value.length === 0;
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      categoryButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      filterTools();
    });
  });

  searchInput.addEventListener("input", filterTools);

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    filterTools();
    searchInput.focus();
  });

  categoryButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.category === "all")
    );
  });

  filterTools();
})();

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("toolSearch");
  const suggestions = document.getElementById("searchSuggestions");
  const clearButton = document.getElementById("clearSearch");

  if (!input || !suggestions || !clearButton) return;

  // Replace href values with your actual tool page paths.
  const tools = [
    {
      name: "Background Remover",
      description: "Remove image backgrounds instantly",
      href: "background-remover.html",
      icon: "✦"
    },
    {
      name: "Card & certificate Maker",
      description: "Add multiple files , arrange them in your preferred order",
      href: "background-remover.html",
      icon: "✦"
    },
    {
      name: "Convert Images & Files to PDF Online",
      description: "Combine images and files into a PDF",
      href: "image-to-pdf.html",
      icon: "PDF"
    },
    {
      name: "Astrology Report Generator",
      description: "Generate a personalized astrology report",
      href: "astro.html",
      icon: "☾"
    },
    {
      name: "Card & Certificate Maker",
      description: "Create cards and certificates",
      href: "certificate-maker.html",
      icon: "✧"
    },
    {
      name: "Photo Resizer",
      description: "Resize photos to your required dimensions",
      href: "photo-resizer.html",
      icon: "▧"
    },
    {
      name: "PDF Translate",
      description: "translate pdf document into multiple languages quickely and easily",
      href: "pdf-translate.html",
      icon: "W"
    },
    {
      name: "PDF to Excel Converter",
      description: "Convert PDF tables to Excel",
      href: "pdf-to-excel.html",
      icon: "X"
    },
    {
      name: "Resume Maker",
      description: "Create professional and ATS-friendly resumes",
      href: "resume.html",
      icon: "CV"
    },
    {
      name: "Medical Report Simplifier",
      description: "upload report and view important medical values",
      href: "medical.html",
      icon: "✦"
    },
    {
      name: "Meta Tag Generater",
      description: "generate seo friendly meta tags for your website quickly and easily",
      href: "meta-tag.html",
      icon: "✦"
    },
    {
      name: "PDF to PPT",
      description: "converts pdf into editable power points presentations quickly and easily",
      href: "pdf-to-ppt.html",
      icon: "✦"
    },
    {
      name: "PDF to Text",
      description: "pdf to converts tha text easily",
      href: "pdf-to-text.html",
      icon: "✦"
    },
    {
      name: "Youtube HasTag ",
      description: "generate relevant and trending youtube hastags to boost your viedo reach ",
      href: "youtube-hastag.html",
      icon: "✦"
    },
    {
      name: "Youtube Title Generated ",
      description: "generate catchy seo friendly youtube titles that attract more viewers ",
      href: "youtube-title.html",
      icon: "✦"
    },{
      name: "Pharma Order List Maker",
      description: "create and manage pharmaceutical order lists quickly and easily",
      href: "pharma-order-list-maker.html",
      icon: "✦"
    },
    {
      name: "Hospital bill generated",
      description: "create professional hospital bills quickly and easily with accurate billing details",
      href: "hospital-bill.html",
      icon: "✦"
    },
    {
      name: "Assignment Cover Page Maker",
      description: "create professional and personalized assignment cover pages",
      href: "assignment-cover.html",
      icon: "✦"
    },
    {
      name: "Charcter Counter",
      description: "Count character, letters, spaces, and more instantly",
      href: "character-counter.html",
      icon: "✦"
    },
    {
      name: "CSS Gradient Generator",
      description: "Create beautiful CSS gradients with customizable colors, directions , and styles",
      href: "css-gradient-generator.html",
      icon: "✦"
    },
    {
      name: "Hash Generator",
      description: "count charaters, letters, spaces, and more instantly",
      href: "hash-generator.html",
      icon: "✦"
    },
    {
      name: "Income Tax Calculator",
      description: "Calculate your income tax deductions and estimated tax",
      href: "income-tax-calculator.html",
      icon: "✦"
    },
    {
      name: "PDF Password Locker ",
      description: "Lock and PDF with password and protect your document securely ",
      href: "pdf-locker.html",
      icon: "✦"
    },
    {
      name: "Question Paper Generator",
      description: "Create professional question papers with custom section . marks , and formatting",
      href: "question-paper-generator.html",
      icon: "✦"
    },
    {
      name: "Password Strength Checker",
      description: "Check password strength security and potential weakness instantly",
      href: "password-strength-checker.html",
      icon: "✦"
    },
    {
      name: "Word Counter",
      description: "Count words, character, sentences, paragraphs and reading time instatnly",
      href: "word-counter.html",
      icon: "✦"
    },
    {
      name: "JPG to PDF",
      description: "Convert JPG images into a single PDF file easily",
      href: "jpg-to-pdf.html",
      icon: "✦"
    },
    {
      name: "JPG to PNG ",
      description: "Convert JPG images into high quality PNG files easily",
      href: "jpg-to-png.html",
      icon: "✦"
    },
    {
      name: "PDF to JPG ",
      description: "Convert pdf files into high quality jpg images",
      href: "pdf-to-jpg.html",
      icon: "✦"
    },
    {
      name: "PDF to PNG ",
      description: "Convert PDF into high quality PNG images",
      href: "pdf-to-png.html",
      icon: "✦"
    },
    {
      name: "Merge files",
      description: "Combine multiple files into one",
      href: "merge.html",
      icon: "✦"
    },
    {
      name: "Compress PDF",
      description: "Reduce PDF size without losing quality",
      href: "compress-pdf-or-photo.html",
      icon: "✦"
    },
    {
      name: "QR Generator",
      description: "Generate QR code Easily",
      href: "QR.html",
      icon: "✦"
    },
    {
      name: "Salary Slip Generator",
      description: "Create employee payslip in PDF ",
      href: "slip.html",
      icon: "✦"
    },
    {
      name: "PDF-editor",
      description: " Edit PDF text & images online",
      href: "pdf-editor.html",
      icon: "✦"
    },
    {
      name: "Sign PDF",
      description: "Sign PDF documents online easily",
      href: "sign.html",
      icon: "✦"
    },
    {
      name: "Split PDF",
      description: "Split PDF into separate pages easily ",
      href: "split.html",
      icon: "✦"
    },
    {
      name: "Watermark Images",
      description: " add text watermark to images easily",
      href: "watermark.html",
      icon: "✦"
    },
    {
      name: "File Rename Tool",
      description: "Rename any file easily without changing format",
      href: "rename.html",
      icon: "✦"
    },
    {
      name: "Scientific Calculator",
      description: "Advanced math calculations ",
      href: "calculator.html",
      icon: "✦"
    },
    {
      name: "Marriage Biodata Maker",
      description: " Make biodata easily and free",
      href: "biodata.html",
      icon: "✦"
    },
    {
      name: "BMI Calculator",
      description: " calculate BMI  easily and free ",
      href: "bmi-calulator.html",
      icon: "✦"
    },
    {
      name: "Typing Test",
      description: "test your typping speed",
      href: "typping.html",
      icon: "✦"
    },
    {
      name: "Passport Photo maker",
      description: " Create perfect passport photos instantly",
      href: "Passport-photo-maker.html",
      icon: "✦"
    },
    {
      name: "",
      description: "",
      href: ".html",
      icon: "✦"
    },
    {
      name: "GST Calculator",
      description: "Calculate GST and tax amounts",
      href: "gst.html",
      icon: "%"
    },
    {
      name: "Typing Test",
      description: "Improve your typing speed and accuracy",
      href: "typing.html",
      icon: "⌨"
    }
    
    
  ];

  function renderSuggestions() {
    const query = input.value.trim().toLowerCase();

    clearButton.hidden = !input.value;

    if (!query) {
      suggestions.hidden = true;
      suggestions.replaceChildren();
      input.setAttribute("aria-expanded", "false");
      return;
    }

    // Match the beginning of any word in a tool name first.
    const startsWithWord = tools.filter(tool =>
      tool.name.toLowerCase().split(/[\s&-]+/)
        .some(word => word.startsWith(query))
    );

    // Also allow matches inside a tool name or description.
    const remaining = tools.filter(tool =>
      !startsWithWord.includes(tool) &&
      (tool.name + " " + tool.description)
        .toLowerCase().includes(query)
    );

    const matches = [...startsWithWord, ...remaining].slice(0, 7);

    suggestions.replaceChildren();
    suggestions.hidden = false;
    input.setAttribute("aria-expanded", "true");

    if (!matches.length) {
      const empty = document.createElement("div");
      empty.className = "search-no-results";
      empty.textContent = "No matching tools found. Try another keyword.";
      suggestions.appendChild(empty);
      return;
    }

    matches.forEach(tool => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-suggestion";
      button.setAttribute("role", "option");

      const icon = document.createElement("span");
      icon.className = "suggestion-icon";
      icon.textContent = tool.icon;

      const content = document.createElement("span");
      content.className = "suggestion-content";

      const name = document.createElement("span");
      name.className = "suggestion-name";
      name.textContent = tool.name;

      const description = document.createElement("span");
      description.className = "suggestion-description";
      description.textContent = tool.description;

      const arrow = document.createElement("span");
      arrow.className = "suggestion-arrow";
      arrow.textContent = "↗";
      arrow.setAttribute("aria-hidden", "true");

      content.append(name, description);
      button.append(icon, content, arrow);

      button.addEventListener("click", () => {
        // Navigate to the selected tool.
        window.location.href = tool.href;
      });

      suggestions.appendChild(button);
    });
  }

  input.addEventListener("input", renderSuggestions);

  clearButton.addEventListener("click", () => {
    input.value = "";
    renderSuggestions();
    input.focus();
  });

  // Close suggestions when clicking outside the search section.
  document.addEventListener("click", event => {
    if (!event.target.closest(".tools-search-section")) {
      suggestions.hidden = true;
      input.setAttribute("aria-expanded", "false");
    }
  });

  // Close on Escape.
  input.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      suggestions.hidden = true;
      input.setAttribute("aria-expanded", "false");
    }

    // Enter opens the first suggestion.
    if (event.key === "Enter") {
      const first = suggestions.querySelector(".search-suggestion");
      if (!suggestions.hidden && first) {
        event.preventDefault();
        first.click();
      }
    }
  });
});

