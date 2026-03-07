# macOS build: Code signing kikapcsolása

## Context

Az `electron-builder-config.js` jelenleg az eredeti Bruno fejlesztő (Anoop MD) signing identity-jét és afterSign notarize hookját tartalmazza. Lokális fejlesztésnél ez hibát okoz, mert a certificate nem elérhető. A cél: alapértelmezetten ne próbáljon signing-olni, hogy bármely fejlesztő gépen buildelhető legyen az app.

## Módosítandó fájl

- [packages/bruno-electron/electron-builder-config.js](packages/bruno-electron/electron-builder-config.js)

## Változtatások

1. **`identity` mező törlése** (34. sor) — `identity: 'Anoop MD (W7LPPWA48L)'` eltávolítása
2. **`identity: null` beállítása** — Ez explicit módon kikapcsolja a code signing-ot
3. **`afterSign` hook eltávolítása** (18. sor) — `afterSign: 'notarize.js'` törlése, mivel notarize úgysem fog futni signing nélkül, és a `notarize.js` hiányzó env varokat próbálna olvasni
4. **`hardenedRuntime` törlése** (33. sor) — Signing nélkül nincs értelme

### Eredmény a mac szekcióban:

```javascript
mac: {
  artifactName: '${name}_${version}_${arch}_${os}.${ext}',
  category: 'public.app-category.developer-tools',
  target: [
    { target: 'dmg', arch: ['x64', 'arm64'] },
    { target: 'zip', arch: ['x64', 'arm64'] }
  ],
  icon: 'resources/icons/mac/icon.icns',
  identity: null,
  entitlements: 'resources/entitlements.mac.plist',
  entitlementsInherit: 'resources/entitlements.mac.plist',
  notarize: false,
  protocols: [
    { name: 'Oreo', schemes: ['bruno'] }
  ]
}
```

> Megjegyzés: Az `entitlements` fájlokat megtartjuk, mert ha valaki később újra bekapcsolja a signing-ot, szüksége lesz rájuk. A `notarize.js` fájlt sem töröljük, csak a hook-ot szüntetjük meg.

## Verifikáció

```bash
npm run build:electron:mac
```

A buildnek sikeresen le kell futnia signing hiba nélkül, és az `out/` mappában meg kell jelennie a DMG/ZIP fájloknak.
