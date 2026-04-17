'use client';

import { openCookieSettings } from './CookieBanner';

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="hover:text-white transition-colors text-left"
    >
      Ustawienia cookies
    </button>
  );
}
