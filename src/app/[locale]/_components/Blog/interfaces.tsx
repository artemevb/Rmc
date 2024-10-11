// interfaces.ts

export interface Photo {
    id: number;
    url: string;
}

export interface Title {
    uz: string;
    ru: string;
    en: string;
}

export interface Description {
    uz: string;
    ru: string;
    en: string;
}

export interface Option {
    id: number;
    title: Title;
    description: Description;
    orderNum: number;
    photo: Photo;
}

export interface TypeName {
    uz: string;
    ru: string;
    en: string;
}

export interface Type {
    id: number;
    name: TypeName;
}

export interface ApiNewsItem {
    id: number;
    slug: string;
    options: Option[];
    type: Type;
    createdDate: string;
    viewCounter: number;
    active: boolean;
    main: boolean;
}

export interface ApiResponse {
    data: ApiNewsItem[];
}

// Интерфейсы, используемые в компоненте
export interface NewsPhoto {
    url: string;
}

export interface NewsHead {
    heading: string;
    date: string;
    photo: NewsPhoto;
    views: string;
}

export interface NewsItem {
    slug: string;
    head: NewsHead;
}

export interface NewsCompProps {
    locale: string;
}
export interface BlogData {
    id: number;
    slug: string;
    options: Option[];
    type: Type;
    createdDate: string;
    viewCounter: number;
    active: boolean;
    main: boolean;
  }