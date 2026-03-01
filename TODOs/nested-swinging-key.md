# Név és ikon csere: Bruno → Oreo

## Context

A fork saját identitást kap: a "Bruno" nevet "Oreo"-ra cseréljük, a golden retriever ikont pedig border collie fejre.

## Terv

### 1. Logo SVG csere — border collie fej

- **Fájl:** `packages/bruno-app/src/components/Bruno/index.js`
- A meglévő golden retriever SVG-t lecseréljük egy border collie fejet ábrázoló SVG-re
- Fekete-fehér szín, jellegzetes border collie mintázat (fehér csík az arcon, fekete fülek)
- Megtartjuk a komponens struktúrát (width prop, viewBox 72x72)

### 2. Szöveg csere a title bar-ban

- **Fájl:** `packages/bruno-app/src/components/AppTitleBar/index.js` (sor ~276)
- `<span className="bruno-text">Bruno</span>` → `<span className="bruno-text">Oreo</span>`

### 3. Electron ablak cím

- **Fájl:** `packages/bruno-electron/src/index.js` (sor ~224)
- `title: 'Bruno'` → `title: 'Oreo'`

### 4. About oldal

- **Fájl:** `packages/bruno-electron/src/app/about-bruno.js`
- `About Bruno` → `About Oreo`
- `Bruno ${version}` → `Oreo ${version}`

### 5. Menü

- **Fájl:** `packages/bruno-electron/src/app/menu-template.js` (sor ~98)
- `'About Bruno'` → `'About Oreo'`

### 6. Electron builder config

- **Fájl:** `packages/bruno-electron/electron-builder-config.js`
- `productName: 'Bruno'` → `productName: 'Oreo'`
- Protocol name-ek: `'Bruno'` → `'Oreo'`

## Nem módosítjuk (most)

- Electron icon fájlok (.icns, .ico, .png a resources/icons/ alatt) — ezek build-time ikonok, dev módban nem látszanak
- Protocol scheme (`bruno://`) — funkcionális változás, nem kosmetikai
- Package name-ek és appId — nem szükséges a vizuális rebrandinghez

## Verifikáció

- `./restart.sh` futtatása
- Title bar-ban "Oreo" szöveg + border collie ikon jelenik meg
- About menüpont "About Oreo"-t mutat
- Ablak cím "Oreo"
