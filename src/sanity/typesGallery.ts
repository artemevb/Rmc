// src/types.ts
import { SanityImageAssetDocument } from '@sanity/client';

export interface YouTubeVideo {
  _type: 'youtubeVideo';
  url: string;
}

export interface GalleryImage {
  _type: 'image';
  asset: SanityImageAssetDocument | null; // asset может быть null
}

export type GalleryItem = GalleryImage | YouTubeVideo;

export interface GalleryData {
  gallery_3: GalleryItem[];
}
