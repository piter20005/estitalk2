import { defineArrayMember, defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons';

export const episodeType = defineType({
  name: 'episode',
  title: 'Odcinek',
  type: 'document',
  icon: PlayIcon,
  fieldsets: [
    { name: 'meta', title: 'Źródło (RSS — synchronizowane automatycznie)', options: { collapsible: true, collapsed: false } },
    { name: 'links', title: 'Linki na platformy', options: { collapsible: true, collapsed: false } },
    { name: 'editorial', title: 'Treści redakcyjne (ręczne)', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: 'guid',
      title: 'GUID (z RSS)',
      type: 'string',
      fieldset: 'meta',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      fieldset: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      fieldset: 'meta',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 5,
      fieldset: 'meta',
    }),
    defineField({
      name: 'publishDate',
      title: 'Data publikacji',
      type: 'datetime',
      fieldset: 'meta',
    }),
    defineField({
      name: 'duration',
      title: 'Czas trwania (sekundy)',
      type: 'number',
      fieldset: 'meta',
    }),
    defineField({
      name: 'coverImage',
      title: 'Okładka (upload do Sanity)',
      type: 'image',
      options: { hotspot: true },
      description: 'Jeśli ustawione — ma pierwszeństwo przed URL z RSS',
    }),
    defineField({
      name: 'coverImageUrl',
      title: 'Okładka (URL z RSS, fallback)',
      type: 'url',
      fieldset: 'meta',
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      fieldset: 'links',
    }),
    defineField({
      name: 'appleUrl',
      title: 'Apple Podcasts URL',
      type: 'url',
      fieldset: 'links',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL (playlista — z RSS)',
      type: 'url',
      fieldset: 'links',
      description: 'Nadpisywane przez sync RSS — zwykle link do playlisty kanału.',
    }),
    defineField({
      name: 'youtubeEpisodeUrl',
      title: 'YouTube — link do odcinka (ręczny)',
      type: 'url',
      fieldset: 'links',
      description:
        'Pełny URL do konkretnego filmu na YouTube (np. https://youtu.be/... lub https://www.youtube.com/watch?v=...). Używany do 30-sekundowego podglądu w hero. Nie jest nadpisywany przez sync.',
    }),
    defineField({ name: 'season', title: 'Sezon', type: 'number', fieldset: 'meta' }),
    defineField({ name: 'episodeNumber', title: 'Numer odcinka', type: 'number', fieldset: 'meta' }),
    defineField({
      name: 'guests',
      title: 'Goście',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'guest' }] })],
      fieldset: 'editorial',
    }),
    defineField({
      name: 'topics',
      title: 'Tematy',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'topic' }] })],
      fieldset: 'editorial',
    }),
    defineField({
      name: 'resources',
      title: 'Linki i zasoby',
      type: 'array',
      fieldset: 'editorial',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Etykieta', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Notatki redakcyjne',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'editorial',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Wyróżniony',
      type: 'boolean',
      initialValue: false,
      fieldset: 'editorial',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishDate',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString('pl-PL') : '';
      return { title, subtitle: date, media };
    },
  },
  orderings: [
    {
      title: 'Data publikacji (najnowsze)',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
});
