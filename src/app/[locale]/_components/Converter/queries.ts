export const GET_RESIDENTIAL_COMPLEXES = `*[_type == "residentialComplex"]{
    _id,
    mainImage {
      asset->{
        url
      }
    },
    alt {
      ru,
      uz,
      en
    },
    seller,
    subtitle {
      ru,
      uz,
      en
    },
    price,
    priceValue,
    district->{
      name_ru,
      name_uz,
      name_en
    },
    type->{
      name_ru,
      name_uz,
      name_en
    },
    rooms->{
      number_ru,
      number_uz,
      number_en
    },
    slug {
      current
    }
  }`;
  
  export const GET_LAYOUTS = `*[_type == "layouts"]{
    _id,
    title {
      ru,
      uz,
      en
    },
    area,
    price,
    rooms->{
      rooms // или нужное вам поле с количеством комнат
    },
    residentialComplex->{
      _id
    }
  }`;
  