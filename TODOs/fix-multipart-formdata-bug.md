# Fix: Multipart form-data createFormData soha nem hívódik meg

## Kontextus

A `b0d0e4aa` commit ("Feat: Support multipart/mixed") egy regressziót vezetett be, ami miatt **minden multipart form-data request hibásan működik**. A felhasználó egy POST multipart form-data request-et küld, ami Postman-ben sikeresen fut, de Oreo-ban 400 Bad Request-et ad.

### Gyökérok

A `contentTypeHeader` változó a header **neve** (pl. `"content-type"`), NEM az értéke (pl. `"multipart/form-data"`). A commit ezt cserélte:

```javascript
// ELŐTTE (helyes):
request.headers[contentTypeHeader] === 'multipart/form-data'

// UTÁNA (hibás):
contentTypeHeader.startsWith('multipart/')
```

`"content-type".startsWith('multipart/')` mindig `false` → a `createFormData()` **soha nem hívódik meg** → az Axios a nyers params tömböt szerializálja rosszul (`0[name]=instance`, `0[value]={"url":"..."}` ahelyett, hogy `instance={"url":"..."}`).

## Fix

### 1. Electron - `packages/bruno-electron/src/ipc/network/index.js`

**597. sor** - feltétel javítása:
```javascript
// ELŐTTE:
if (contentTypeHeader && contentTypeHeader.startsWith('multipart/')) {

// UTÁNA:
if (contentTypeHeader && request.headers[contentTypeHeader].startsWith('multipart/')) {
```

**603. sor** - belső feltétel javítása:
```javascript
// ELŐTTE:
if (contentTypeHeader !== 'multipart/form-data') {

// UTÁNA:
if (request.headers[contentTypeHeader] !== 'multipart/form-data') {
```

### 2. CLI - `packages/bruno-cli/src/runner/run-single-request.js`

**543. sor** - ugyanaz a fix:
```javascript
// ELŐTTE:
if (contentTypeHeader && contentTypeHeader.startsWith('multipart/')) {

// UTÁNA:
if (contentTypeHeader && request.headers[contentTypeHeader].startsWith('multipart/')) {
```

(Az 550. sor a CLI-ben már helyes: `request?.headers?.['content-type'] !== 'multipart/form-data'`)

## Verifikáció

1. Oreo-ban nyisd meg a multipart form-data POST request-et
2. Küld el a request-et
3. Ellenőrizd, hogy a szerver helyes választ ad (nem 400 Bad Request)
4. Ellenőrizd a Timeline tab-on, hogy a request body helyes (a `instance` mező értéke a JSON string, nem `0[name]=instance`)
