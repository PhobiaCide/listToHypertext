const fs = require("fs");

// Read the input text file (assuming 'input.txt').
const inputText = fs.readFileSync("test-input.txt", "utf8");

// Split the input text into lines.
const lines = inputText.split("\n");

// Initialize an empty array to store the transformed lines.
const transformedLines = [];

// Variable to determine the list type.
const list = {
  type: null
};

// Helper function to extract text within square brackets.
function extractTextWithinSquareBrackets(text) {
  const match = text.match(/\[(.*?)\]/);
  return match ? match[1] : text;
}

// Helper function to determine the list type.
function determineListType(text) {
  if (text.trim().match(/^\d+\.\s+/)) {
    return "ol";
  } // if (text.trim().match(/^\*\s+/)) {
  else return "ul";
  //  } else {
  //    return "p";
  //  }
}

// Function to wrap abbreviations with <abbr></abbr> tags.
function wrapAbbreviations(text) {
  return text.replace(/\b([A-Z]+)\(([^)]+)\)/g, '<abbr title="$2">$1</abbr>');
}

// Loop through each line of the input.
for (const line of lines) {
  // Trim the line and check if it's empty.
  const trimmedLine = line.trim();
  if (trimmedLine === "") {
    // Skip empty lines.
    continue;
  }

  // Determine the list type for the current line.
  const currentListType = determineListType(trimmedLine);

  // If the list type changes, close the previous list.
  if (list.type && list.type !== currentListType) {
    transformedLines.push(`</${list.type}>`);
    list.type = null;
  }

  // If not already in a list, open one.
  if (!list.type) {
    list.type = currentListType;
    transformedLines.push(`<${list.type}>`);
  }

  // Check if the line starts with a number, a period, and has a colon.
  const match = trimmedLine.match(/^(\d+\.\s+)(.*):\s(.*)$/);
  if (match) {
    // Found a line that matches the pattern.
    const term = extractTextWithinSquareBrackets(match[2].trim());
    const definition = extractTextWithinSquareBrackets(match[3].trim());

    // Wrap the term and definition in HTML tags, removing any asterisks, and wrap abbreviations.
    transformedLines.push(
      `<li><dt>${wrapAbbreviations(
        term.replace(/\*+/g, "")
      )}:</dt><dd>${wrapAbbreviations(
        definition.replace(/\*+/g, "")
      )}</dd></li>`
    );
  } else {
    // If it's not a term-definition line, add the line as a simple list item.
    transformedLines.push(`<li>${wrapAbbreviations(trimmedLine)}</li>`);
  }
}

// If we were in a list, close it.
if (list.type) {
  transformedLines.push(`</${list.type}>`);
}

// Wrap the entire output in <ul></ul> tags.
const transformedText = `<ul>${transformedLines.join("\n")}</ul>`;

// Write the transformed text to an output file (assuming 'output.html').
fs.writeFileSync("test-output.html", transformedText, "utf8");

console.log("Transformation complete. Check test-output.html for the result.");
