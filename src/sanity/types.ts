// types/sanity.ts

export interface SanityImageAssetDocument {
    _id: string;
    _ref: string;
    _type: 'image';
    // Добавьте другие поля по необходимости
}

export interface SanityFileAssetDocument {
    _id: string;
    _ref: string;
    _type: 'file';
    mimeType?: string;
    // Добавьте другие поля по необходимости
}

export type SanityAsset = SanityImageAssetDocument | SanityFileAssetDocument;
