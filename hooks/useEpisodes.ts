import { useState, useEffect } from 'react';
import { Episode } from '../types';

const LINKS = {
  spotify: 'https://open.spotify.com/show/4AV3JfVxwT8KfqeVHUYoU0',
  apple: 'https://podcasts.apple.com/pl/podcast/estitalk-rozmowy-o-pi%C4%99knie-z-dr-tatian%C4%85-jasi%C5%84sk%C4%85/id1757956398?l=pl',
  youtube: 'https://www.youtube.com/playlist?list=PLs36Pjn2gU5a9qx-5F8HgyqujnfOlC4Pt'
};

const FALLBACK_EPISODES: Episode[] = [
  {
    id: '05',
    title: 'Hormony a skóra - co warto wiedzieć?',
    description: 'Jak hormony wpływają na stan naszej cery? Dr Tatiana Jasińska wyjaśnia zależności między układem endokrynnym a zdrowiem skóry, trądzikiem dorosłych i menopauzą.',
    duration: '13.12.2023',
    publishDate: new Date('2023-12-13'),
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    links: LINKS,
    season: 1
  },
  {
    id: '04',
    title: 'Rutyna pielęgnacyjna minimalistki',
    description: 'Mniej znaczy więcej. Jak zbudować skuteczną pielęgnację z zaledwie trzech produktów o wysokiej jakości składnikach. Przewodnik dla zabieganych.',
    duration: '06.12.2023',
    publishDate: new Date('2023-12-06'),
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    links: LINKS,
    season: 1
  },
  {
    id: '03',
    title: 'Psychologia piękna i samoocena',
    description: 'Dlaczego chcemy wyglądać młodziej? Głęboka rozmowa o tym, jak wygląd wpływa na nasze samopoczucie i pewność siebie w codziennym życiu.',
    duration: '29.11.2023',
    publishDate: new Date('2023-11-29'),
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    links: LINKS,
    season: 1
  },
  {
    id: '02',
    title: 'Medycyna estetyczna: Fakty i Mity',
    description: 'Botoks, kwas hialuronowy, nici. Co jest bezpieczne, a czego unikać? Rozprawiamy się z najczęstszymi stereotypami krążącymi w internecie.',
    duration: '22.11.2023',
    publishDate: new Date('2023-11-22'),
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    links: LINKS,
    season: 1
  },
  {
    id: '01',
    title: 'Sekrety zdrowej skóry zimą',
    description: 'Jak dbać o barierę hydrolipidową, gdy temperatura spada? Dr Jasińska wyjaśnia kluczowe zasady pielęgnacji w trudnych warunkach atmosferycznych.',
    duration: '15.11.2023',
    publishDate: new Date('2023-11-15'),
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    links: LINKS,
    season: 1
  }
];

export const useEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const RSS_URL = 'https://anchor.fm/s/f8d844f8/podcast/rss';
        // Use allorigins.win to bypass CORS and get full raw XML (no item limit like rss2json)
        const PROXY_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`;

        const response = await fetch(PROXY_URL);
        if (!response.ok) {
           throw new Error('Network response was not ok');
        }
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        const items = xmlDoc.querySelectorAll("item");
        
        // Try to get channel image
        let channelImage = "";
        const imgTags = xmlDoc.getElementsByTagName("image");
        if (imgTags.length > 0) {
            const urlTag = imgTags[0].getElementsByTagName("url")[0];
            if (urlTag) channelImage = urlTag.textContent || "";
        }
        
        // Fallback channel image from itunes:image at channel level
        if (!channelImage) {
           const itunesImage = xmlDoc.getElementsByTagName("itunes:image")[0];
           if (itunesImage) channelImage = itunesImage.getAttribute("href") || "";
        }

        const mappedEpisodes: Episode[] = Array.from(items).map((item) => {
           const title = item.querySelector("title")?.textContent || "";
           const descriptionHtml = item.querySelector("description")?.textContent || "";
           const pubDateText = item.querySelector("pubDate")?.textContent || "";
           const link = item.querySelector("link")?.textContent || "";
           const guid = item.querySelector("guid")?.textContent || "";
           
           // Extract Itunes Metadata
           const itunesImageNode = item.getElementsByTagName("itunes:image")[0];
           const itunesImage = itunesImageNode ? itunesImageNode.getAttribute("href") : null;
           
           const itunesSeasonNode = item.getElementsByTagName("itunes:season")[0];
           const season = itunesSeasonNode ? itunesSeasonNode.textContent : "1";

           // Cleanup description HTML
           const tempDiv = document.createElement("div");
           tempDiv.innerHTML = descriptionHtml;
           const cleanDescription = tempDiv.textContent || tempDiv.innerText || "";

           const pubDate = new Date(pubDateText);

           return {
              id: guid,
              title: title,
              description: cleanDescription.trim(),
              duration: pubDate.toLocaleDateString('pl-PL'),
              publishDate: pubDate,
              image: itunesImage || channelImage || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              links: {
                youtube: LINKS.youtube,
                spotify: link || LINKS.spotify, // Often RSS link points to public episode page
                apple: LINKS.apple,
              },
              season: season ? parseInt(season) : 1
           };
        });

        if (mappedEpisodes.length > 0) {
           setEpisodes(mappedEpisodes);
        } else {
           setEpisodes(FALLBACK_EPISODES);
        }
      } catch (err) {
        console.error('Failed to fetch Anchor episodes:', err);
        setError(true);
        setEpisodes(FALLBACK_EPISODES);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  return { episodes, loading, error };
};
