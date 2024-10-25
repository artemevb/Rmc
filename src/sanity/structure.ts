import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Новостройки')
    .items([
      S.documentTypeListItem('rooms').title('Количество Комнат'),
      S.documentTypeListItem('district').title('Район'),
      S.documentTypeListItem('completionTime').title('Срок Завершения'),
      S.documentTypeListItem('housingType').title('Тип Жилья'),
      S.documentTypeListItem('residentialComplex').title('Жилой Комплекс'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['rooms', 'district', 'completionTime', 'housingType', 'residentialComplex'].includes(item.getId()!),
      ),
    ])