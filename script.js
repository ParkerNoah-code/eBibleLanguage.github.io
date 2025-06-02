document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // FORM MATCHING LOGIC
  // =====================
  const formData = Array.from(document.querySelectorAll("#formMatchingData div"));
  const formContainer = document.getElementById("formMatchingQuestions");
  const formFeedback = document.getElementById("formMatchingFeedback");
  const resetBtn = document.getElementById("resetFormMatching");

  function getRandomUnique(arr, n) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  function generateFormMatchingQuiz() {
    formContainer.innerHTML = "";
    formFeedback.innerHTML = "";
    formFeedback.style.display = "none";
    resetBtn.style.display = "none";

    const formQuestions = [];

    for (let i = 0; i < 5; i++) {
      const options = getRandomUnique(formData, 4);
      const formSet = [...new Set(options.map(opt => opt.dataset.form))];
      const targetForm = formSet[Math.floor(Math.random() * formSet.length)];
      formQuestions.push({ options, targetForm });
    }

    formQuestions.forEach((q, i) => {
      const div = document.createElement("div");
      div.classList.add("form-question");
      div.innerHTML = `<p><strong>Question ${i + 1}:</strong> Select <strong>${q.targetForm}</strong> forms.</p>`;

      q.options.forEach((opt, j) => {
        const id = `fm_${i}_${j}`;
        const isCorrect = opt.dataset.form === q.targetForm;

        div.innerHTML += `
          <input type="checkbox" id="${id}" name="q${i}" data-correct="${isCorrect}">
          <label for="${id}">${opt.textContent}</label><br>
        `;
      });

      formContainer.appendChild(div);
    });
  }

  document.getElementById("formMatchingQuiz").addEventListener("submit", (e) => {
  e.preventDefault();

  let totalCorrect = 0;
  let selectedCorrect = 0;
  let missedCorrect = 0;
  let incorrectSelected = 0;

  const questions = document.querySelectorAll(".form-question");
  const ambiguousForms = new Map();

  // Step 1: Build ambiguity map for all forms
  formData.forEach(entry => {
    const key = entry.textContent.trim();
    const formLabel = entry.dataset.form;
    if (!ambiguousForms.has(key)) {
      ambiguousForms.set(key, new Set());
    }
    ambiguousForms.get(key).add(formLabel);
  });

  // Step 2: Evaluate answers and collect ambiguity notices
  let ambiguityNotices = [];

  questions.forEach((question, qIndex) => {
    const checkboxes = question.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => {
      const label = question.querySelector(`label[for="${cb.id}"]`);
      const isCorrect = cb.dataset.correct === "true";
      const labelText = label.textContent.trim();
      const formLabels = ambiguousForms.get(labelText) || new Set();

      label.classList.remove("correct", "incorrect", "missed");

      if (isCorrect) totalCorrect++;

      if (cb.checked && isCorrect) {
        selectedCorrect++;
        label.classList.add("correct");

        if (formLabels.size > 1) {
          const formattedForms = Array.from(formLabels).map(f => f.toLowerCase());
          const readable = formattedForms.length === 2
            ? formattedForms.join(" or ")
            : formattedForms.slice(0, -1).join(", ") + ", or " + formattedForms.slice(-1);

          ambiguityNotices.push(`🔍 The form <em>${labelText}</em> can be ${readable}.`);
        }

      } else if (cb.checked && !isCorrect) {
        incorrectSelected++;
        label.classList.add("incorrect");
      } else if (!cb.checked && isCorrect) {
        missedCorrect++;
        label.classList.add("missed");
      }
    });
  });

  // Step 3: Display feedback with ambiguity notes
  formFeedback.innerHTML = `
    ✅ Correct: ${selectedCorrect} / ${totalCorrect} <br>
    ⚠️ Overlooked: ${missedCorrect}<br>
    ❌ Incorrect: ${incorrectSelected}
    ${ambiguityNotices.length > 0 ? "<hr><strong>Note:</strong><br>" + ambiguityNotices.join("<br>") : ""}
  `;
  formFeedback.style.display = "block";
  resetBtn.style.display = "inline";
});

  resetBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent unintended form action
    formContainer.innerHTML = "";
    formFeedback.innerHTML = "";
    formFeedback.style.display = "none";
    resetBtn.style.display = "none";
    generateFormMatchingQuiz();
  });

  generateFormMatchingQuiz();

  // =============================
// PARSING PRACTICE LOGIC
// =============================
const parsingEntries = Array.from(document.querySelectorAll("#parsingData div"));
const parseWordSpan = document.getElementById("parseWord");
const parseForm = document.getElementById("parseForm");
const feedbackDiv = document.getElementById("parseFeedback");
const nextButton = document.getElementById("nextParse");

let currentParseItem = null;

function getRandomParseEntry() {
  return parsingEntries[Math.floor(Math.random() * parsingEntries.length)];
}

function loadNewParseItem() {
  currentParseItem = getRandomParseEntry();
  parseWordSpan.textContent = currentParseItem.dataset.word;

  // Reset dropdowns and feedback
  parseForm.reset();
  feedbackDiv.textContent = "";
  nextButton.style.display = "none";
}

parseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedCase = document.getElementById("caseSelect").value;
  const selectedNumber = document.getElementById("numberSelect").value;
  const selectedGender = document.getElementById("genderSelect").value;

  const currentWord = currentParseItem.dataset.word;

  // Gather all entries matching the current word
  const allMatchingEntries = parsingEntries.filter(entry =>
    entry.dataset.word === currentWord
  );

  // Check if any matching entry validates the user's input
  const matchedValidEntry = allMatchingEntries.find(entry =>
    entry.dataset.case === selectedCase &&
    entry.dataset.number === selectedNumber &&
    entry.dataset.gender === selectedGender
  );

  if (matchedValidEntry) {
    if (allMatchingEntries.length > 1) {
      // Construct a detailed disambiguation note
      const forms = allMatchingEntries.map(entry =>
        `${entry.dataset.case.toLowerCase()} ${entry.dataset.number.toLowerCase()}`
      );

      const distinctForms = [...new Set(forms)];
      const joinedForms = distinctForms.length === 2
        ? distinctForms.join(" or ")
        : distinctForms.slice(0, -1).join(", ") + ", or " + distinctForms.slice(-1);

      feedbackDiv.innerHTML = `✅ Correct! This form is ambiguous and can match ${joinedForms}.`;
    } else {
      feedbackDiv.innerHTML = "✅ Correct!";
    }

    nextButton.style.display = "inline";
  } else {
    feedbackDiv.innerHTML = "❌ Try Again. Incorrect fields have been cleared.";
    if (!allMatchingEntries.some(entry => entry.dataset.case === selectedCase)) {
      document.getElementById("caseSelect").value = "";
    }
    if (!allMatchingEntries.some(entry => entry.dataset.number === selectedNumber)) {
      document.getElementById("numberSelect").value = "";
    }
    if (!allMatchingEntries.some(entry => entry.dataset.gender === selectedGender)) {
      document.getElementById("genderSelect").value = "";
    }
  }
});

nextButton.addEventListener("click", () => {
  loadNewParseItem();
});

// Initialize on page load
loadNewParseItem();

  // =============================
  // CASE FUNCTION TASK LOGIC
  // =============================
  document.querySelectorAll("#functionSentence .word").forEach(word => {
    word.addEventListener("click", () => {
      document.querySelectorAll("#functionSentence .word").forEach(w => w.style.background = "");
      word.style.background = "#d1e7dd";
      const correct = word.dataset.correct === "true";
      document.getElementById("functionFeedback").textContent = correct ? "✅ Correct!" : "❌ Incorrect.";
      document.getElementById("nextFunction").style.display = "inline";
    });
  });

  // =============================
  // PRODUCTION DRILL LOGIC
  // =============================
  document.querySelectorAll("#productionOptions button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#productionOptions button").forEach(b => b.disabled = true);
      const correct = btn.dataset.correct === "true";
      document.getElementById("productionFeedback").textContent = correct ? "✅ Correct!" : "❌ Incorrect.";
    });
  });
});
