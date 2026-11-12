const QUESTIONS = [
  {
    id: "neutral-or", category: "Foundations", expression: "x + 0",
    options: ["x", "0", "1", "x̄"], answer: "x", rule: "Neutral element",
    explanation: "OR with 0 leaves the value unchanged. Whether x is 0 or 1, x + 0 has the same value as x.",
  },
  {
    id: "neutral-and", category: "Foundations", expression: "x · 1",
    options: ["1", "x", "0", "x̄"], answer: "x", rule: "Neutral element",
    explanation: "AND with 1 leaves the value unchanged. Both sides have the same value as x.",
  },
  {
    id: "domination-or", category: "Foundations", expression: "x + 1",
    options: ["x", "0", "1", "x̄"], answer: "1", rule: "Domination",
    explanation: "OR only needs one true input. Since 1 is always true, the whole expression is always 1.",
  },
  {
    id: "domination-and", category: "Foundations", expression: "x · 0",
    options: ["x", "1", "0", "x̄"], answer: "0", rule: "Domination",
    explanation: "AND needs both inputs to be true. One input is 0, so the whole expression is always 0.",
  },
  {
    id: "complement-or", category: "Foundations", expression: "x + x̄",
    options: ["x", "0", "1", "x̄"], answer: "1", rule: "Complementarity",
    explanation: "A value and its complement cover both possibilities. One is always 1, so their OR is 1.",
  },
  {
    id: "complement-and", category: "Foundations", expression: "x · x̄",
    options: ["x", "0", "1", "x̄"], answer: "0", rule: "Complementarity",
    explanation: "A value and its complement can never both be 1. Their AND is therefore always 0.",
  },
  {
    id: "idempotent-or", category: "Foundations", expression: "x + x",
    options: ["2x", "x", "0", "1"], answer: "x", rule: "Idempotence",
    explanation: "Repeating the same input changes nothing. Here + means Boolean OR, so x + x simplifies to x.",
  },
  {
    id: "idempotent-and", category: "Foundations", expression: "x · x",
    options: ["x²", "x", "0", "1"], answer: "x", rule: "Idempotence",
    explanation: "AND-ing x with itself leaves x. Writing x² still repeats the factor; x is the simplest Boolean form.",
  },
  {
    id: "distributive-and", category: "Advanced", expression: "x(y + z)",
    title: "Expand this expression.", hint: "Choose the expanded sum of products.",
    options: ["xy + xz", "(x + y)(x + z)", "x + yz", "xyz"], answer: "xy + xz", rule: "Distributivity",
    explanation: "Distribute x to each term inside the parentheses. This gives xy + xz.",
  },
  {
    id: "distributive-or", category: "Advanced", expression: "x + yz",
    title: "Rewrite this as a product.", hint: "Choose the equivalent product of sums.",
    options: ["(x + y)(x + z)", "xy + xz", "x(y + z)", "xyz"], answer: "(x + y)(x + z)", rule: "Distributivity",
    explanation: "In Boolean algebra, OR also distributes over AND: x + yz = (x + y)(x + z).",
  },
  {
    id: "absorption-or", category: "Advanced", expression: "x + xy",
    options: ["x", "xy", "y", "x + y"], answer: "x", rule: "Absorption",
    explanation: "When x is 1, the expression is already 1. When x is 0, xy is also 0. The extra term adds nothing.",
  },
  {
    id: "absorption-and", category: "Advanced", expression: "x(x + y)",
    options: ["x", "xy", "y", "x + y"], answer: "x", rule: "Absorption",
    explanation: "If x is 0, the whole product is 0. If x is 1, the sum inside is 1. The expression always equals x.",
  },
  {
    id: "de-morgan-or", category: "Advanced", expression: { value: "x + y", complement: true },
    title: "Apply De Morgan’s law.", hint: "The bar covers the whole sum. Find its equivalent form.",
    options: ["x̄ȳ", "x̄ + ȳ", "xy", "x + y"], answer: "x̄ȳ", rule: "De Morgan",
    explanation: "Complement each input and switch OR to AND. NOT (x OR y) equals (NOT x) AND (NOT y).",
  },
  {
    id: "de-morgan-and", category: "Advanced", expression: { value: "xy", complement: true },
    title: "Apply De Morgan’s law.", hint: "The bar covers the whole product. Find its equivalent form.",
    options: ["x̄ + ȳ", "x̄ȳ", "x + y", "xy"], answer: "x̄ + ȳ", rule: "De Morgan",
    explanation: "Complement each input and switch AND to OR. NOT (x AND y) equals (NOT x) OR (NOT y).",
  },
];

const formulaLabels = {
  "0": "zero", "1": "one", "x": "x", "y": "y", "x̄": "NOT x",
  "x + 0": "x OR zero", "x · 1": "x AND one", "x + 1": "x OR one",
  "x · 0": "x AND zero", "x + x̄": "x OR NOT x", "x · x̄": "x AND NOT x",
  "x + x": "x OR x", "x · x": "x AND x", "2x": "two x", "x²": "x squared",
  "x(y + z)": "x AND (y OR z)", "xy + xz": "(x AND y) OR (x AND z)",
  "(x + y)(x + z)": "(x OR y) AND (x OR z)", "x + yz": "x OR (y AND z)",
  "xyz": "x AND y AND z", "x + xy": "x OR (x AND y)", "xy": "x AND y",
  "x + y": "x OR y", "x(x + y)": "x AND (x OR y)",
  "x̄ȳ": "(NOT x) AND (NOT y)", "x̄ + ȳ": "(NOT x) OR (NOT y)",
};

const elements = Object.fromEntries([
  "restart-button", "question-count", "score-count", "progress", "progress-fill", "question-view",
  "category-tag", "question-title", "question-hint", "question-expression", "quiz-form", "answers",
  "feedback", "action-hint", "submit-button", "submit-label", "results-view",
].map((id) => [id, document.getElementById(id)]));

const checkIcon = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4 10-10" /></svg>';
const crossIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>';
const arrowIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>';

let round = [];
let currentIndex = 0;
let selectedAnswer = null;
let submitted = false;
let responses = [];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
}

function formulaHTML(expression) {
  const value = typeof expression === "string" ? expression : expression.value;
  const complemented = typeof expression === "object" && expression.complement;
  let display = escapeHTML(value).replace(/([xyz])\u0304/g, '<span class="overbar">$1</span>');
  let description = formulaLabels[value] || value;
  if (complemented) {
    display = `<span class="overbar">${display}</span>`;
    description = `NOT (${description})`;
  }
  return `<span class="math" role="math" aria-label="${escapeHTML(description)}"><span aria-hidden="true">${display}</span></span>`;
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const otherIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[otherIndex]] = [result[otherIndex], result[index]];
  }
  return result;
}

function updateProgress() {
  const correct = responses.filter((response) => response.correct).length;
  const completed = responses.length;
  elements["score-count"].textContent = `${correct} correct`;
  elements.progress.setAttribute("aria-valuenow", String(completed));
  elements.progress.setAttribute("aria-valuetext", `${completed} of ${QUESTIONS.length} questions answered`);
  elements["progress-fill"].style.width = `${(completed / QUESTIONS.length) * 100}%`;
}

function renderQuestion(moveFocus = false) {
  const question = round[currentIndex];
  selectedAnswer = null;
  submitted = false;
  elements["question-view"].hidden = false;
  elements["results-view"].hidden = true;
  elements["question-count"].innerHTML = `Question ${currentIndex + 1} <span class="muted">of ${round.length}</span>`;
  elements["category-tag"].textContent = question.category;
  elements["category-tag"].classList.toggle("is-advanced", question.category === "Advanced");
  elements["question-title"].textContent = question.title || "Simplify this expression.";
  elements["question-hint"].textContent = question.hint || "Select its simplest Boolean form.";
  elements["question-expression"].innerHTML = `${formulaHTML(question.expression)}<span class="expression-equals" aria-hidden="true">=</span><span class="math" aria-label="what">?</span>`;
  elements.answers.innerHTML = question.choices.map((answer, index) => `
    <label class="answer-choice">
      <input class="answer-input" type="radio" name="answer" value="${escapeHTML(answer)}" required />
      <span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span>
      ${formulaHTML(answer)}
      <span class="answer-result" aria-hidden="true"></span>
    </label>
  `).join("");
  elements.feedback.hidden = true;
  elements.feedback.innerHTML = "";
  elements.feedback.classList.remove("is-incorrect");
  elements["action-hint"].textContent = "Choose one answer above.";
  elements["submit-label"].textContent = "Check answer";
  elements["submit-button"].disabled = true;
  updateProgress();
  if (moveFocus) elements["question-title"].focus({ preventScroll: true });
}

function startRound(moveFocus = false) {
  round = shuffle(QUESTIONS).map((question) => ({ ...question, choices: shuffle(question.options) }));
  currentIndex = 0;
  responses = [];
  renderQuestion(moveFocus);
}

function submitAnswer() {
  if (selectedAnswer === null) return;
  const question = round[currentIndex];
  const correct = selectedAnswer === question.answer;
  submitted = true;
  responses.push({ id: question.id, category: question.category, correct });

  for (const input of elements.answers.querySelectorAll("input")) {
    input.disabled = true;
    const choice = input.closest(".answer-choice");
    const result = choice.querySelector(".answer-result");
    if (input.value === question.answer) {
      choice.classList.add("is-correct");
      result.innerHTML = checkIcon;
      choice.insertAdjacentHTML("beforeend", '<span class="sr-only">Correct answer</span>');
    } else if (input.checked) {
      choice.classList.add("is-wrong");
      result.innerHTML = crossIcon;
      choice.insertAdjacentHTML("beforeend", '<span class="sr-only">Incorrect answer</span>');
    }
  }

  elements.feedback.classList.toggle("is-incorrect", !correct);
  elements.feedback.innerHTML = `
    <p class="feedback-heading">${correct ? checkIcon : crossIcon}${correct ? "Correct. Nicely simplified!" : "Not quite. Here’s the idea."}</p>
    <p class="feedback-answer">Correct answer: ${formulaHTML(question.answer)}</p>
    <p class="feedback-explanation"><strong>${escapeHTML(question.rule)}.</strong> ${escapeHTML(question.explanation)}</p>
  `;
  elements.feedback.hidden = false;
  elements["action-hint"].textContent = correct ? "One more connection made." : "Every attempt is practice.";
  elements["submit-label"].textContent = currentIndex === round.length - 1 ? "See results" : "Next question";
  updateProgress();
  elements.feedback.focus({ preventScroll: true });
}

function showResults() {
  const score = responses.filter((response) => response.correct).length;
  const percent = Math.round((score / round.length) * 100);
  const foundations = responses.filter((response) => response.category === "Foundations" && response.correct).length;
  const advanced = responses.filter((response) => response.category === "Advanced" && response.correct).length;
  const title = score === round.length ? "Perfectly logical." : score >= 10 ? "Your logic is looking good." : score >= 7 ? "The connections are forming." : "A good place to grow.";
  const message = score === round.length
    ? "All 14 identities, all correct. You’ve got a clear grasp of the rules behind simpler expressions."
    : "You’re building a feel for the rules. Give it another go to help those identities become second nature.";

  elements["question-view"].hidden = true;
  elements["results-view"].hidden = false;
  elements["question-count"].textContent = "Session complete";
  elements["results-view"].innerHTML = `
    <div class="result-ring" style="--result-progress: ${(score / round.length) * 360}deg" role="img" aria-label="${score} correct out of ${round.length}, ${percent} percent">
      <div class="result-ring-inner" aria-hidden="true"><span class="result-score">${score}</span><span class="result-total">/ ${round.length}</span></div>
    </div>
    <p class="eyebrow">${percent}% CORRECT · SESSION COMPLETE</p>
    <h2 id="results-title" tabindex="-1">${title}</h2>
    <p class="results-copy">${message}</p>
    <div class="result-breakdown">
      <div><strong>${foundations} / 8</strong><span>Foundation rules</span></div>
      <div><strong>${advanced} / 6</strong><span>Advanced rules</span></div>
    </div>
    <button class="primary-button" id="play-again" type="button">Try again ${arrowIcon}</button>
    <p class="result-footnote">A fresh shuffle. Another little step toward clarity.</p>
  `;
  document.getElementById("play-again").addEventListener("click", () => startRound(true));
  document.getElementById("results-title").focus({ preventScroll: true });
}

elements.answers.addEventListener("change", (event) => {
  if (submitted || !(event.target instanceof HTMLInputElement)) return;
  selectedAnswer = event.target.value;
  for (const input of elements.answers.querySelectorAll("input")) {
    input.closest(".answer-choice").classList.toggle("is-selected", input.checked);
  }
  elements["submit-button"].disabled = false;
  elements["action-hint"].textContent = "Ready when you are.";
});

elements["quiz-form"].addEventListener("submit", (event) => {
  event.preventDefault();
  if (!submitted) {
    submitAnswer();
  } else if (currentIndex < round.length - 1) {
    currentIndex += 1;
    renderQuestion(true);
  } else {
    showResults();
  }
});

elements["restart-button"].addEventListener("click", () => startRound(true));
startRound();
