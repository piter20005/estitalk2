# Przedsprzedaż odcinka z prof. Maciejem Sochą

Podstrona jest dostępna pod adresem `/premiera`.

## Płatności

Formularz wysyła żądanie do `/api/socha-presale/checkout`. Endpoint tworzy jednorazową sesję Stripe Checkout za
79 zł brutto i przekierowuje kupującą osobę do Stripe. Opłacone zamówienia można odnaleźć w Stripe po metadanych:

- `product_id=socha-menopauza-presale`
- `presale=true`

W Netlify musi pozostać ustawiona zmienna `STRIPE_SECRET_KEY`, używana już przez integrację For Doctors. Dla tego
endpointu nie jest potrzebny osobny Payment Link ani Price ID — produkt i cena są tworzone w sesji Checkout.

## Zmiana ceny lub celu

Cena, identyfikator produktu i cel przedsprzedaży znajdują się w `lib/sochaPresale.ts`. Kwota `unitAmount` jest
podana w groszach i musi odpowiadać `priceGrossPln` widocznemu na stronie.

## Po płatności

Stripe wraca na `/premiera?status=success&session_id={CHECKOUT_SESSION_ID}`. Ten ekran potwierdza złożenie
zamówienia, ale nie odblokowuje jeszcze filmu. Dostarczenie materiału po premierze trzeba obsłużyć osobno, np. przez
dedykowaną stronę dostępu lub wysyłkę linku do osób wyszukanych w Stripe po powyższych metadanych.

## Przed uruchomieniem kampanii

1. Potwierdź publiczny termin premiery i ewentualnie dodaj go do tekstu strony.
2. Potwierdź zasady zwrotu, jeśli nie zostanie osiągnięty cel 70 zamówień.
3. Wykonaj płatność testową na kluczu testowym Stripe.
4. Sprawdź dokument sprzedaży i ustawienia metod płatności na koncie Stripe.
5. Podmień `/images/studio.png` na kadr z rozmowy, gdy gotowy materiał będzie dostępny.

