export type OutputType =
  | "paragraphs"
  | "sentences"
  | "words"
  | "list_unordered"
  | "list_ordered"
  | "html_structure";

export type ParagraphLength = "short" | "medium" | "long" | "random";

export type ExportFormat = "plain" | "html" | "markdown" | "json";

export interface PresetTheme {
  id: string;
  name: string;
  subtitle: string;
  iconName: string;
  badge: string;
  description: string;
  prefixWords: string[];
  words: string[];
  sentences: string[];
}

export interface GeneratorOptions {
  themeId: string;
  type: OutputType;
  count: number;
  paragraphLength: ParagraphLength;
  startWithLorem: boolean;
  includeHtml: boolean;
  addDecoration: boolean;
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
