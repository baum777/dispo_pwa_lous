# ⚡ Quick Start - Lou's Team PWA

## 🚀 In 3 Minuten deployed!

### Option 1: Vercel (empfohlen)

```bash
# 1. Vercel CLI installieren
npm i -g vercel

# 2. Deployen
vercel

# 3. Production Deploy
vercel --prod
```

**Fertig!** 🎉 Deine App ist live.

---

### Option 2: Lokaler Test

```bash
# 1. Dependencies installieren
npm install

# 2. Development Server
npm run dev

# 3. Browser öffnen
open http://localhost:3000
```

**Keine FileMaker-Verbindung nötig!** Die App läuft mit Mock-Daten.

---

## 📱 Features testen

Nach dem Start verfügbar:

- **`/shifts`** - Schichten-Übersicht (mit Demo-Daten)
- **`/repair`** - Reparatur melden
- **`/feedback`** - Feedback geben
- **`/login`** - Login (Placeholder)

---

## 🔧 FileMaker Optional aktivieren

Nur wenn du echte Daten brauchst:

### Lokal (.env.local erstellen)
```bash
FM_BASE_URL=https://your-server.com/fmi/data/v1
FM_USER=username
FM_PASSWORD=password
```

### Auf Vercel
```bash
vercel env add FM_BASE_URL
vercel env add FM_USER
vercel env add FM_PASSWORD
```

---

## 📊 Build Status

```
✅ Build:        Erfolgreich
✅ Linting:      Keine Errors
✅ TypeScript:   Keine Errors
✅ Bundle Size:  87.1 kB (First Load)
✅ PWA:          Ready
✅ Security:     Headers gesetzt
```

---

## 📚 Mehr Infos

- 📖 Vollständige Anleitung: [DEPLOYMENT.md](DEPLOYMENT.md)
- 📝 Änderungen: [CHANGELOG.md](CHANGELOG.md)
- 📘 Projekt-Details: [README.md](README.md)

---

**Viel Erfolg!** 🚀
