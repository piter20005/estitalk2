import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('EstiTalk CMS')
    .items([
      S.listItem()
        .title('Odcinki')
        .child(
          S.documentTypeList('episode')
            .title('Odcinki')
            .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
        ),
      S.listItem()
        .title('Wyróżnione')
        .child(
          S.documentList()
            .title('Wyróżnione odcinki')
            .filter('_type == "episode" && isFeatured == true')
            .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
        ),
      S.divider(),
      S.documentTypeListItem('guest').title('Goście'),
      S.documentTypeListItem('topic').title('Tematy'),
    ]);
