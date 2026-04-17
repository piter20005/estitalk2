import { defineQuery } from 'next-sanity';

/* ---------- Episodes ---------- */

const EPISODE_CORE_FIELDS = /* groq */ `
  _id,
  guid,
  title,
  "slug": slug.current,
  description,
  publishDate,
  duration,
  coverImage,
  coverImageUrl,
  spotifyUrl,
  appleUrl,
  youtubeUrl,
  youtubeEpisodeUrl,
  season,
  episodeNumber,
  isFeatured,
  resources,
  notes,
  "guests": guests[]->{
    _id, name, "slug": slug.current, profession, photo
  },
  "topics": topics[]->{
    _id, name, "slug": slug.current
  }
`;

export const ALL_EPISODES_QUERY = defineQuery(`
  *[_type == "episode" && defined(slug.current)]
    | order(publishDate desc) {
      ${EPISODE_CORE_FIELDS}
    }
`);

export const FEATURED_EPISODES_QUERY = defineQuery(`
  *[_type == "episode" && defined(slug.current)]
    | order(publishDate desc)[0...6] {
      ${EPISODE_CORE_FIELDS}
    }
`);

export const EPISODE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "episode" && slug.current == $slug][0] {
    ${EPISODE_CORE_FIELDS}
  }
`);

export const EPISODE_SLUGS_QUERY = defineQuery(`
  *[_type == "episode" && defined(slug.current)].slug.current
`);

/* ---------- Guests ---------- */

const GUEST_CORE_FIELDS = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  profession,
  shortBio,
  photo,
  socials
`;

export const ALL_GUESTS_QUERY = defineQuery(`
  *[_type == "guest" && defined(slug.current)]
    | order(name asc) {
      ${GUEST_CORE_FIELDS},
      "episodeCount": count(*[_type == "episode" && references(^._id)])
    }
`);

export const GUEST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "guest" && slug.current == $slug][0] {
    ${GUEST_CORE_FIELDS},
    bio,
    "episodes": *[_type == "episode" && references(^._id)]
      | order(publishDate desc) {
        ${EPISODE_CORE_FIELDS}
      }
  }
`);

export const GUEST_SLUGS_QUERY = defineQuery(`
  *[_type == "guest" && defined(slug.current)].slug.current
`);

/* ---------- Topics ---------- */

export const ALL_TOPICS_QUERY = defineQuery(`
  *[_type == "topic" && defined(slug.current)]
    | order(name asc) {
      _id, name, "slug": slug.current, description,
      "episodeCount": count(*[_type == "episode" && references(^._id)])
    }
`);

export const TOPIC_BY_SLUG_QUERY = defineQuery(`
  *[_type == "topic" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, description,
    "episodes": *[_type == "episode" && references(^._id)]
      | order(publishDate desc) {
        ${EPISODE_CORE_FIELDS}
      }
  }
`);

export const TOPIC_SLUGS_QUERY = defineQuery(`
  *[_type == "topic" && defined(slug.current)].slug.current
`);
