export type ImageProvider = "placehold" | "picsum" | "unsplash";

export interface ImagePreset {
  name: string;
  width: number;
  height: number;
}

export interface ImagePlaceholderOptions {
  provider: ImageProvider;
  width: number;
  height: number;
  bgColor: string;
  textColor: string;
  customText: string;
}
