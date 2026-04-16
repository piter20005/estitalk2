interface TikTokIconProps {
  size?: number;
  className?: string;
}

export default function TikTokIcon({ size = 20, className }: TikTokIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.321 5.562a5.122 5.122 0 0 1-3.414-1.267 5.122 5.122 0 0 1-1.533-2.937V1h-3.226v13.27a2.905 2.905 0 0 1-2.906 2.857 2.905 2.905 0 0 1-2.905-2.906 2.905 2.905 0 0 1 2.905-2.905c.284 0 .559.041.818.119V7.95a6.163 6.163 0 0 0-.818-.056A6.16 6.16 0 0 0 2 14.053a6.16 6.16 0 0 0 6.161 6.161 6.16 6.16 0 0 0 6.16-6.161V8.543a8.326 8.326 0 0 0 4.881 1.567v-3.23a5.06 5.06 0 0 1-.881-.136z" />
    </svg>
  );
}
