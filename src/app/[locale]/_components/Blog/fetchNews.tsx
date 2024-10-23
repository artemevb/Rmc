import { client } from '../../../../sanity/lib/client';

// Получаем список всех новостей
export async function fetchNews() {
    const query = `*[_type == "news"] | order(date desc) {
      title,
      date,
      viewCounter,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      slug {
        current
      }
    }`;
  
    const newsData = await client.fetch(query);
    return newsData;
  }
  
