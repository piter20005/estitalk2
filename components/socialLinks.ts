import { Instagram, Facebook, Mail } from 'lucide-react';
import TikTokIcon from './icons/TikTokIcon';

export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/esti.talk/',
    Icon: Instagram,
    external: true,
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@estitalk',
    Icon: TikTokIcon,
    external: true,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61578986545628',
    Icon: Facebook,
    external: true,
  },
  {
    name: 'Email',
    href: 'mailto:kontakt@estitalk.pl',
    Icon: Mail,
    external: false,
  },
] as const;
