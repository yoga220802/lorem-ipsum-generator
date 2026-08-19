import { ImagePlaceholderOptions, ImagePreset } from "@/types/image";

export const IMAGE_PRESETS: ImagePreset[] = [
  { name: "OG Banner (1200x630)", width: 1200, height: 630 },
  { name: "HD 16:9 (800x450)", width: 800, height: 450 },
  { name: "Card (600x400)", width: 600, height: 400 },
  { name: "Avatar (400x400)", width: 400, height: 400 },
  { name: "Mobile (375x812)", width: 375, height: 812 }
];

export function buildImageUrl(options: ImagePlaceholderOptions): string {
  const { provider, width, height, bgColor, textColor, customText } = options;
  const cleanBg = bgColor.replace("#", "");
  const cleanTextCol = textColor.replace("#", "");

  if (provider === "placehold") {
    const textParam = customText ? `?text=${encodeURIComponent(customText)}` : "";
    return `https://placehold.co/${width}x${height}/${cleanBg}/${cleanTextCol}${textParam}`;
  }

  if (provider === "picsum") {
    return `https://picsum.photos/${width}/${height}`;
  }

  return `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

export function buildHtmlImageSnippet(url: string, alt: string, width: number, height: number): string {
  return `<img src="${url}" alt="${alt || "Placeholder Image"}" width="${width}" height="${height}" />`;
}

export function buildMarkdownImageSnippet(url: string, alt: string): string {
  return `![${alt || "Placeholder Image"}](${url})`;
}
