// =========================
//  HTML SYNTAX HIGHLIGHTER
// =========================

// Inject CSS automatically
(function addHighlightCSS() {
  const css = `
.tok-tag-bracket { color: #999; }
.tok-tag-name    { color: #e06c75; font-weight: bold; }
.tok-attr-name   { color: #d19a66; }
.tok-attr-eq     { color: #abb2bf; }
.tok-attr-value  { color: #98c379; }
.tok-comment     { color: #5c6370; font-style: italic; }
.tok-entity      { color: #56b6c2; }
code { font-family: Consolas, monospace; white-space: pre; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();

// Escape HTML safely
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const HTML_COMMENT = /<!--[\s\S]*?-->/g;
const HTML_TAG = /<\/?[a-zA-Z][\\w:-]*(\\s[^<>]*?)?>/g;
const HTML_ENTITY = /&[a-zA-Z0-9#]+;/g;

function highlightTag(tag) {
  let result = tag;

  // Tag name
  const tagNameMatch = /^<\/?([a-zA-Z][\\w:-]*)/.exec(tag);
  if (tagNameMatch) {
    const name = tagNameMatch[1];
    result = result.replace(
      /^<\/?([a-zA-Z][\\w:-]*)/,
      (m, n) =>
        `<span class="tok-tag-bracket">&lt;${tag[1] === "/" ? "/" : ""}</span>` +
        `<span class="tok-tag-name">${n}</span>`
    );
  }

  // Attributes
  result = result.replace(
    /(\\s+)([a-zA-Z_:][\\w:.-]*)(\\s*=\\s*)(".*?"|'.*?')/g,
    (m, space, attr, eq, value) =>
      `${space}<span class="tok-attr-name">${attr}</span>` +
      `<span class="tok-attr-eq">${eq}</span>` +
      `<span class="tok-attr-value">${value}</span>`
  );

  // Closing bracket
  result = result.replace(/\/?>$/, m =>
    `<span class="tok-tag-bracket">${m}</span>`
  );

  return result;
}

function highlightHTML(code) {
  let result = "";
  let lastIndex = 0;

  const pattern = new RegExp(
    `${HTML_COMMENT.source}|${HTML_TAG.source}|${HTML_ENTITY.source}`,
    "g"
  );

  code.replace(pattern, (match, index) => {
    if (index > lastIndex) {
      result += escapeHTML(code.slice(lastIndex, index));
    }

    if (HTML_COMMENT.test(match)) {
      result += `<span class="tok-comment">${escapeHTML(match)}</span>`;
    } else if (HTML_TAG.test(match)) {
      result += highlightTag(match);
    } else if (HTML_ENTITY.test(match)) {
      result += `<span class="tok-entity">${match}</span>`;
    }

    HTML_COMMENT.lastIndex = 0;
    HTML_TAG.lastIndex = 0;
    HTML_ENTITY.lastIndex = 0;

    lastIndex = index + match.length;
  });

  if (lastIndex < code.length) {
    result += escapeHTML(code.slice(lastIndex));
  }

  return result;
}

// Auto-highlight all <pre><code> blocks
function highlightAllHTML() {
  document.querySelectorAll("pre code").forEach(block => {
    block.innerHTML = highlightHTML(block.textContent);
  });
}

// Run when page loads
document.addEventListener("DOMContentLoaded", highlightAllHTML);
