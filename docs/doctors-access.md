# Dostęp do EstiTalk for Doctors — jak to działa i jak skonfigurować

## Problem, który to rozwiązuje

Wcześniej dostęp do pełnego odcinka był zapisywany wyłącznie w `localStorage`
przeglądarki (po powrocie ze Stripe z parametrem `?dkey=...`). Wyczyszczenie
przeglądarki, tryb incognito albo otwarcie strony na telefonie oznaczało utratę
dostępu — bez możliwości odzyskania.

## Jak działa teraz

Źródłem prawdy o zakupie jest **Stripe**:

1. **Po zakupie** — Stripe przekierowuje na
   `/for-doctors?session_id={CHECKOUT_SESSION_ID}`. Strona wysyła `session_id`
   do `/api/doctors-access/session`, serwer sprawdza w Stripe, że sesja jest
   opłacona, i wystawia podpisany token dostępu powiązany z e-mailem kupującego.
   Token trafia do `localStorage`.
2. **Na nowym urządzeniu / po wyczyszczeniu przeglądarki** — kupujący wpisuje
   w sekcji „Masz już dostęp?” adres e-mail podany przy płatności. Serwer
   (`/api/doctors-access/recover`) wyszukuje w Stripe opłaconą sesję checkout
   dla tego e-maila i wystawia nowy token.
3. **Stare zakupy** — dotychczasowa flaga `doctors_access` w `localStorage`
   oraz link z `?dkey=` nadal działają (nikt nie traci dostępu). Ci kupujący
   mogą też w każdej chwili odzyskać dostęp e-mailem, bo ich płatność jest
   w Stripe.

## Konfiguracja (wymagane przed wdrożeniem)

W Netlify → Site settings → Environment variables dodaj:

| Zmienna | Wartość |
|---|---|
| `STRIPE_SECRET_KEY` | Klucz z [Stripe → Developers → API keys](https://dashboard.stripe.com/apikeys). Najbezpieczniej utworzyć **restricted key** z uprawnieniem *Checkout Sessions: Read*. |
| `DOCTORS_ACCESS_SECRET` | Dowolny długi losowy ciąg (np. wynik `openssl rand -hex 32`). Służy do podpisywania tokenów dostępu. |
| `DOCTORS_PAYMENT_LINK_ID` | *(opcjonalnie, zalecane)* ID linku płatności `plink_...` — znajdziesz je w Stripe → Payment Links → szczegóły linku. Gdy ustawione, honorowane są tylko zakupy przez ten link. |

Następnie w **Stripe → Payment Links → link do odcinka → After payment**:

- ustaw przekierowanie na
  `https://TWOJA-DOMENA/for-doctors?session_id={CHECKOUT_SESSION_ID}`
  (placeholder `{CHECKOUT_SESSION_ID}` wpisz dosłownie — Stripe podmieni go sam).

Po zmianie przekierowania parametr `?dkey=` przestaje być potrzebny — obsługę
legacy w `components/DoctorsVideoPage.tsx` można po jakimś czasie usunąć.

## Zalecane dodatkowo (bez zmian w kodzie)

- **Vimeo → ustawienia filmu → Privacy → „Where can this be embedded?”** —
  ogranicz osadzanie do własnej domeny. Wtedy nawet jeśli ktoś pozna adres
  playera, film nie odtworzy się poza stroną EstiTalk.

## Ograniczenia / możliwe rozszerzenia

- Odzyskanie dostępu wymaga tylko znajomości e-maila kupującego (bez
  potwierdzenia skrzynki). Przy cenie 199 zł to rozsądny kompromis; w razie
  potrzeby można dodać wysyłkę linku aktywacyjnego na e-mail (np. przez
  Resend/MailerLite) zamiast natychmiastowego odblokowania.
- Kolejne odcinki: wystarczy nowy Payment Link i analogiczna walidacja
  po `payment_link` / `price`.
