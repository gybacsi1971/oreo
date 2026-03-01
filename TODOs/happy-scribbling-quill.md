# Body Editor Modal + Runner Request Inspector

## Context

A request body szerkesztő (multipart form, form-urlencoded) UX-e használhatatlan: a value oszlop túl keskeny nagy JSON értékek szerkesztéséhez. Emellett a Runner futtatásnál nincs közvetlen mód a ténylegesen elküldött request megtekintésére (interpolált változókkal) — csak a Timeline tab rejtett accordion-jában látható.

## Feature 1: Value Editor Modal

### Cél
Egy "expand" gombbal nyitható modal, ahol teljes méretű CodeEditor-ban lehet szerkeszteni a body paraméterek értékét (variable highlighting + autocomplete-tel).

### Új fájlok

1. **`packages/bruno-app/src/components/ValueEditorModal/index.js`**
   - Modal (`size="lg"`) + CodeEditor kombináció
   - Props: `value`, `title`, `collection`, `item`, `onSave`, `onClose`
   - Lokális state a szerkesztett értékhez, csak "Save"-re propagál
   - CodeEditor mode: `application/ld+json` (variable highlighting automatikus a `collection`/`item` props-ból)

2. **`packages/bruno-app/src/components/ValueEditorModal/StyledWrapper.js`**
   - `.editor-container` - 400px magas, border a theme-ből

### Módosított fájlok

3. **`packages/bruno-app/src/components/RequestPane/MultipartFormParams/index.js`**
   - Import: `ValueEditorModal`, `IconMaximize` (tabler icons), `useState`
   - Új state: `expandedRow` — melyik sor modalja nyitva
   - Value column `render` függvényben: expand gomb hozzáadása a `MultiLineEditor` mellé (nem file típusú, nem üres sor esetén)
   - Modal renderelése a komponens alján, ha `expandedRow !== null`
   - `onSave`: meglévő `handleValueChange` hívása az expandedRow-ra

4. **`packages/bruno-app/src/components/RequestPane/MultipartFormParams/StyledWrapper.js`**
   - `.expand-btn` stílus hozzáadása (azonos pattern mint `.upload-btn`)

5. **`packages/bruno-app/src/components/RequestPane/FormUrlEncodedParams/index.js`**
   - Ugyanaz a pattern mint MultipartFormParams:
   - Import `ValueEditorModal`, `IconMaximize`, `useState`
   - `expandedRow` state
   - Value column `render` átírása: `MultiLineEditor` + expand gomb wrapper div-ben
   - Modal renderelése alul

6. **`packages/bruno-app/src/components/RequestPane/FormUrlEncodedParams/StyledWrapper.js`**
   - `.expand-btn` + `.value-cell` stílus

---

## Feature 2: Request Tab a Runner ResponsePane-ben

### Cél
Új "Request" tab a Runner eredmények jobb panelján, ami strukturáltan mutatja az elküldött request-et: Method + URL, Headers, Body — mindezt interpolált értékekkel.

### Adatforrás
A `requestSent` objektum **már elérhető** minden runner result item-ben:
```js
{ url, method, headers (object), data, dataBuffer, timestamp }
```

### Új fájlok

7. **`packages/bruno-app/src/components/RunnerResults/ResponsePane/RequestTab/index.js`**
   - Props: `requestSent`, `item`, `collection`
   - Megjelenítés:
     - Method badge + URL (kiemelt)
     - `HeadersBlock` komponens újrafelhasználása (`components/ResponsePane/Timeline/TimelineItem/Common/Headers`)
     - `BodyBlock` komponens újrafelhasználása (`components/ResponsePane/Timeline/TimelineItem/Common/Body`)
   - Ha nincs `requestSent`: "No request data available" üzenet

8. **`packages/bruno-app/src/components/RunnerResults/ResponsePane/RequestTab/StyledWrapper.js`**
   - `.method-url-bar` flex layout
   - `.method-badge` styling (bold, link color)
   - `.url-text` word-break

### Módosított fájlok

9. **`packages/bruno-app/src/components/RunnerResults/ResponsePane/index.js`**
   - Import `RequestTab`
   - Új tab hozzáadása a "Response" és "Headers" közé: `{requestSent && <div className="tab request">Request</div>}`
   - `getTabPanel` switch-ben új `case 'request'`: `<RequestTab requestSent={requestSent} item={item} collection={collection} />`

---

## Összesítés

| Típus | Fájl | Változás |
|-------|------|----------|
| Új | `components/ValueEditorModal/index.js` | Modal + CodeEditor |
| Új | `components/ValueEditorModal/StyledWrapper.js` | Editor container stílus |
| Módosítás | `components/RequestPane/MultipartFormParams/index.js` | Expand gomb + modal |
| Módosítás | `components/RequestPane/MultipartFormParams/StyledWrapper.js` | `.expand-btn` stílus |
| Módosítás | `components/RequestPane/FormUrlEncodedParams/index.js` | Expand gomb + modal |
| Módosítás | `components/RequestPane/FormUrlEncodedParams/StyledWrapper.js` | `.expand-btn` + `.value-cell` |
| Új | `components/RunnerResults/ResponsePane/RequestTab/index.js` | Request részletek tab |
| Új | `components/RunnerResults/ResponsePane/RequestTab/StyledWrapper.js` | Tab stílus |
| Módosítás | `components/RunnerResults/ResponsePane/index.js` | Új "Request" tab |

## Verifikáció

1. `npm run dev` — indítsd el a dev servert
2. **Feature 1 teszt:**
   - Nyiss meg egy multipart form body-val rendelkező request-et
   - Kattints az expand ikonra egy value cellán → modal megnyílik CodeEditor-ral
   - Szerkeszd az értéket, mentsd → value frissül a táblázatban
   - Teszteld form-urlencoded body-val is
   - Ellenőrizd, hogy a variable autocomplete működik a modalban
3. **Feature 2 teszt:**
   - Futtass egy collection-t a Runner-rel
   - Kattints egy eredményre (status code)
   - Ellenőrizd, hogy a "Request" tab megjelenik
   - Kattints rá → Method + URL, Headers, Body megjelenik interpolált értékekkel
