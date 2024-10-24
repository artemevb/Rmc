// types.ts
export interface ImageAsset {
  _id: string;
  url: string;
}

export interface LocalizedString {
  ru: string;
  uz: string;
  en: string;
}

export interface ResidentialComplex {
  _id: string;
  mainImage: {
    asset: {
      _id: string;
      url: string;
    };
    alt: {
      ru: string;
      uz: string;
      en: string;
    };
  };
  alt: {
    ru: string;
    uz: string;
    en: string;
  };
  subtitle: {
    ru: string;
    uz: string;
    en: string;
  };
  price: string;
  priceValue: number;
  district: {
    _id: string;
    name_ru: string;
    name_uz: string;
    name_en: string;
  };
  type: {
    _id: string;
    name_ru: string;
    name_uz: string;
    name_en: string;
  };
  rooms: {
    _id: string;
    number_ru: string;
    number_uz: string;
    number_en: string;
  };
  completionTime: {
    _id: string;
    term_ru: string;
    term_uz: string;
    term_en: string;
  };
}

export interface District {
  _id: string;
  name_ru: string;
  name_uz: string;
  name_en: string;
}

export interface HousingType {
  _id: string;
  name_ru: string;
  name_uz: string;
  name_en: string;
}

export interface Room {
  _id: string;
  number_ru: string;
  number_uz: string;
  number_en: string;
}

export interface CompletionTime {
  _id: string;
  term_ru: string;
  term_uz: string;
  term_en: string;
}
