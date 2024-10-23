// queries.ts

export const GET_RESIDENTIAL_COMPLEXES = `
  *[_type == "residentialComplex"]{
    _id,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    alt,
    subtitle,
    price,
    priceValue,
    district->{
      _id,
      name_ru,
      name_uz,
      name_en
    },
    type->{
      _id,
      name_ru,
      name_uz,
      name_en
    },
    rooms->{
      _id,
      number_ru,
      number_uz,
      number_en
    },
    completionTime->{
      _id,
      term_ru,
      term_uz,
      term_en
    }
  }
`;

export const GET_DISTRICTS = `
  *[_type == "district"]{
    _id,
    name_ru,
    name_uz,
    name_en
  }
`;

export const GET_HOUSING_TYPES = `
  *[_type == "housingType"]{
    _id,
    name_ru,
    name_uz,
    name_en
  }
`;

export const GET_ROOMS = `
  *[_type == "rooms"]{
    _id,
    number_ru,
    number_uz,
    number_en
  }
`;

export const GET_COMPLETION_TIMES = `
  *[_type == "completionTime"]{
    _id,
    term_ru,
    term_uz,
    term_en
  }
`;
