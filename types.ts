import React from 'react';

export interface EpisodeResource {
  label: string;
  url: string;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string; // Used for display (often date in RSS)
  publishDate: Date; // Used for sorting
  image: string;
  links: {
    spotify: string;
    apple: string;
    youtube: string;
  };
  guest?: string;
  season?: number;
  topics?: string[];
  resources?: EpisodeResource[];
  notes?: string;
}

export interface SocialLink {
  platform: 'Spotify' | 'Apple' | 'YouTube' | 'Instagram';
  url: string;
  icon?: React.ReactNode;
}