import { PRESET_THEMES, PresetTheme, DUMMY_NAMES_INDO } from "./generator-data";

export type OutputType = "paragraphs" | "sentences" | "words" | "list_unordered" | "list_ordered" | "html_structure";
export type ParagraphLength = "short" | "medium" | "long" | "random";

export interface GeneratorOptions {
  themeId: string;
  type: OutputType;
  count: number;
  paragraphLength: ParagraphLength;
  startWithLorem: boolean;
  includeHtml: boolean;
  addDecoration: boolean; // Random bold, italic
  addCodeTags: boolean;
}

export interface TextStats {
  paragraphs: number;
  sentences: number;
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  readingTimeMinutes: number;
  readingTimeFormatted: string;
}

// Helper to pick random item from array
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to capitalize first letter
function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate a random sentence from theme words or predefined sentences
export function generateSentence(theme: PresetTheme, targetWordsCount?: number): string {
  if (!targetWordsCount) {
    targetWordsCount = Math.floor(Math.random() * 10) + 8; // 8 to 17 words
  }

  const selectedWords: string[] = [];
  for (let i = 0; i < targetWordsCount; i++) {
    selectedWords.push(getRandomItem(theme.words));
  }

  let sentence = selectedWords.join(" ");
  sentence = capitalize(sentence) + ".";
  return sentence;
}

// Add optional inline decorations (<strong>, <em>, <code>)
function decorateSentence(sentence: string, addDecoration: boolean, addCodeTags: boolean): string {
  if (!addDecoration && !addCodeTags) return sentence;

  const words = sentence.split(" ");
  if (words.length < 5) return sentence;

  const decoratedWords = [...words];
  
  if (addDecoration && Math.random() > 0.4) {
    const idx = Math.floor(Math.random() * (words.length - 2)) + 1;
    const cleanWord = words[idx].replace(/[^a-zA-Z0-9]/g, "");
    if (cleanWord.length > 3) {
      if (Math.random() > 0.5) {
        decoratedWords[idx] = words[idx].replace(cleanWord, `<strong>${cleanWord}</strong>`);
      } else {
        decoratedWords[idx] = words[idx].replace(cleanWord, `<em>${cleanWord}</em>`);
      }
    }
  }

  if (addCodeTags && Math.random() > 0.6) {
    const idx = Math.floor(Math.random() * (words.length - 2)) + 1;
    const cleanWord = words[idx].replace(/[^a-zA-Z0-9]/g, "");
    if (cleanWord.length > 2) {
      decoratedWords[idx] = words[idx].replace(cleanWord, `<code>${cleanWord}</code>`);
    }
  }

  return decoratedWords.join(" ");
}

export function generateParagraph(
  theme: PresetTheme,
  length: ParagraphLength,
  isFirst: boolean,
  options: GeneratorOptions
): string {
  let sentenceCount = 5;
  if (length === "short") sentenceCount = Math.floor(Math.random() * 2) + 3; // 3-4
  else if (length === "medium") sentenceCount = Math.floor(Math.random() * 3) + 5; // 5-7
  else if (length === "long") sentenceCount = Math.floor(Math.random() * 4) + 8; // 8-11
  else if (length === "random") sentenceCount = Math.floor(Math.random() * 7) + 3; // 3-9

  const sentences: string[] = [];

  for (let i = 0; i < sentenceCount; i++) {
    let s = "";
    if (isFirst && i === 0 && options.startWithLorem) {
      if (theme.id === "latin") {
        s = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
      } else {
        const prefix = theme.prefixWords.join(" ");
        s = capitalize(prefix) + " " + getRandomItem(theme.sentences || [theme.words.slice(0, 5).join(" ")]);
      }
    } else {
      if (theme.sentences && theme.sentences.length > 0 && Math.random() > 0.4) {
        s = getRandomItem(theme.sentences);
      } else {
        s = generateSentence(theme);
      }
    }

    if (options.addDecoration || options.addCodeTags) {
      s = decorateSentence(s, options.addDecoration, options.addCodeTags);
    }

    sentences.push(s);
  }

  const pContent = sentences.join(" ");
  if (options.includeHtml) {
    return `<p>${pContent}</p>`;
  }
  return pContent;
}

export function generateLoremText(options: GeneratorOptions): string[] {
  const theme = PRESET_THEMES[options.themeId] || PRESET_THEMES.latin;
  const results: string[] = [];

  switch (options.type) {
    case "paragraphs": {
      for (let i = 0; i < options.count; i++) {
        results.push(generateParagraph(theme, options.paragraphLength, i === 0, options));
      }
      break;
    }
    case "sentences": {
      for (let i = 0; i < options.count; i++) {
        let s = "";
        if (i === 0 && options.startWithLorem) {
          s = theme.id === "latin"
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            : capitalize(theme.prefixWords.join(" ")) + ".";
        } else {
          s = generateSentence(theme);
        }

        if (options.addDecoration || options.addCodeTags) {
          s = decorateSentence(s, options.addDecoration, options.addCodeTags);
        }

        if (options.includeHtml) {
          results.push(`<p>${s}</p>`);
        } else {
          results.push(s);
        }
      }
      break;
    }
    case "words": {
      const wordsList: string[] = [];
      if (options.startWithLorem) {
        wordsList.push(...theme.prefixWords.slice(0, Math.min(options.count, theme.prefixWords.length)));
      }

      while (wordsList.length < options.count) {
        wordsList.push(getRandomItem(theme.words));
      }

      const wordsStr = wordsList.join(" ");
      const capitalizedStr = capitalize(wordsStr) + ".";

      if (options.includeHtml) {
        results.push(`<p>${capitalizedStr}</p>`);
      } else {
        results.push(capitalizedStr);
      }
      break;
    }
    case "list_unordered":
    case "list_ordered": {
      const tag = options.type === "list_unordered" ? "ul" : "ol";
      const items: string[] = [];

      for (let i = 0; i < options.count; i++) {
        let itemText = generateSentence(theme, Math.floor(Math.random() * 6) + 4);
        if (options.addDecoration || options.addCodeTags) {
          itemText = decorateSentence(itemText, options.addDecoration, options.addCodeTags);
        }
        items.push(options.includeHtml ? `  <li>${itemText}</li>` : `• ${itemText}`);
      }

      if (options.includeHtml) {
        results.push(`<${tag}>\n${items.join("\n")}\n</${tag}>`);
      } else {
        results.push(items.join("\n"));
      }
      break;
    }
    case "html_structure": {
      for (let i = 0; i < options.count; i++) {
        const titleWords = [getRandomItem(theme.words), getRandomItem(theme.words), getRandomItem(theme.words)];
        const hTitle = capitalize(titleWords.join(" "));
        const p1 = generateParagraph(theme, "medium", i === 0, options);
        const p2 = generateParagraph(theme, "short", false, options);
        const quoteText = generateSentence(theme, 10);

        if (options.includeHtml) {
          results.push(
            `<section>\n` +
            `  <h2>${hTitle}</h2>\n` +
            `  <p>${p1.replace(/^<p>|<\/p>$/g, "")}</p>\n` +
            `  <blockquote>"${quoteText}"</blockquote>\n` +
            `  <p>${p2.replace(/^<p>|<\/p>$/g, "")}</p>\n` +
            `</section>`
          );
        } else {
          results.push(
            `## ${hTitle}\n\n` +
            `${p1.replace(/^<p>|<\/p>$/g, "")}\n\n` +
            `> "${quoteText}"\n\n` +
            `${p2.replace(/^<p>|<\/p>$/g, "")}`
          );
        }
      }
      break;
    }
  }

  return results;
}

// Compute Statistics
export function calculateTextStats(outputLines: string[]): TextStats {
  const fullText = outputLines.join("\n\n");
  const cleanText = fullText.replace(/<[^>]*>/g, ""); // strip HTML tags for stats

  const paragraphs = outputLines.length > 0 ? outputLines.length : 0;
  
  const sentences = (cleanText.match(/[.!?]+/g) || []).length;
  
  const wordsArr = cleanText.trim().split(/\s+/).filter(w => w.length > 0);
  const words = wordsArr.length;

  const charactersWithSpaces = cleanText.length;
  const charactersWithoutSpaces = cleanText.replace(/\s+/g, "").length;

  // Average reading speed: 200 words per minute
  const readingTimeMinutes = Math.max(0.1, +(words / 200).toFixed(1));
  const seconds = Math.round(readingTimeMinutes * 60);

  let readingTimeFormatted = "";
  if (seconds < 60) {
    readingTimeFormatted = `${seconds} dtk`;
  } else {
    const mins = Math.floor(seconds / 60);
    const remSecs = seconds % 60;
    readingTimeFormatted = `${mins} mnt ${remSecs > 0 ? `${remSecs} dtk` : ""}`;
  }

  return {
    paragraphs,
    sentences,
    words,
    charactersWithSpaces,
    charactersWithoutSpaces,
    readingTimeMinutes,
    readingTimeFormatted
  };
}

// Format Converter for Output
export function formatOutput(lines: string[], format: "plain" | "html" | "markdown" | "json"): string {
  if (lines.length === 0) return "";

  if (format === "plain") {
    return lines.map(line => line.replace(/<[^>]*>/g, "")).join("\n\n");
  }

  if (format === "html") {
    return lines.map(line => {
      if (line.startsWith("<")) return line;
      return `<p>${line}</p>`;
    }).join("\n\n");
  }

  if (format === "markdown") {
    return lines.map((line, idx) => {
      let clean = line.replace(/<p>/g, "").replace(/<\/p>/g, "");
      clean = clean.replace(/<strong>(.*?)<\/strong>/g, "**$1**");
      clean = clean.replace(/<em>(.*?)<\/em>/g, "*$1*");
      clean = clean.replace(/<code>(.*?)<\/code>/g, "`$1`");
      return clean;
    }).join("\n\n");
  }

  if (format === "json") {
    return JSON.stringify(lines, null, 2);
  }

  return lines.join("\n\n");
}

// Dummy User Generator
export interface DummyUser {
  id: string;
  name: string;
  gender: "Laki-laki" | "Perempuan";
  nik: string;
  email: string;
  phone: string;
  city: string;
  profession: string;
  company: string;
  avatarUrl: string;
}

export function generateDummyUsers(count: number): DummyUser[] {
  const users: DummyUser[] = [];
  const domains = ["gmail.com", "yahoo.co.id", "outlook.com", "company.id", "tech.co.id"];

  for (let i = 0; i < count; i++) {
    const isMale = Math.random() > 0.5;
    const firstName = getRandomItem(isMale ? DUMMY_NAMES_INDO.firstNamesMale : DUMMY_NAMES_INDO.firstNamesFemale);
    const lastName = getRandomItem(DUMMY_NAMES_INDO.lastNames);
    const name = `${firstName} ${lastName}`;
    const cleanName = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`.replace(/[^a-z0-9.]/g, "");
    
    // NIK generator mock
    const provinceCode = "3174"; // Jakarta
    const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
    const nik = `${provinceCode}${randomDigits}`;

    const email = `${cleanName}${Math.floor(Math.random() * 90 + 10)}@${getRandomItem(domains)}`;
    const phone = `08${Math.floor(10 + Math.random() * 89)}${Math.floor(1000000 + Math.random() * 8999999)}`;
    const city = getRandomItem(DUMMY_NAMES_INDO.cities);
    const profession = getRandomItem(DUMMY_NAMES_INDO.professions);
    const company = getRandomItem(DUMMY_NAMES_INDO.companies);
    
    // DiceBear / UI Avatars
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

    users.push({
      id: `USR-${1000 + i}`,
      name,
      gender: isMale ? "Laki-laki" : "Perempuan",
      nik,
      email,
      phone,
      city,
      profession,
      company,
      avatarUrl
    });
  }

  return users;
}
