# 🚚 Lou's Team PWA

Eine Progressive Web App (PWA) für das Team von Lou's Foodtruck. Die App ermöglicht es Team-Mitgliedern, Schichten zu verwalten, Reparaturen zu melden und Feedback zu geben.

## 📱 Features

### ✅ Schichten-Übersicht
- Übersichtliche Darstellung aller anstehenden Schichten
- Filterung nach Zeitraum (Standard: nächste 14 Tage)
- Direkte Kontaktmöglichkeiten:
  - **WhatsApp-Integration**: Direkter Chat mit Team-Mitgliedern
  - **E-Mail-Links**: Schneller Kontakt zu Standorten
  - **PDF-Details**: Event-Informationen direkt öffnen
- Anzeige von Datum, Uhrzeit, Standort, Event und Team-Zusammensetzung

### 🔧 Reparatur-Meldungen
- Einfaches Formular zum Melden von Defekten
- Optionaler Datei-Upload für Fotos
- Kategorisierung nach Typ (Truck, Ausstattung, Sonstiges)
- Automatische Benachrichtigung an Verantwortliche

### 💬 Feedback-System
- Anonyme oder personalisierte Rückmeldungen
- Optionale Kontaktangabe für Rückfragen
- Sensible Datenverarbeitung
- Direktes Feedback an Management

## 🚀 Installation & Setup

### Voraussetzungen
- **Node.js** 20.x oder höher
- **npm** (kommt mit Node.js)

### Entwicklungsumgebung einrichten

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd dispo_pwa_lous
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen konfigurieren** (optional)

   Erstelle eine `.env.local` Datei für lokale Entwicklung:
   ```bash
   # FileMaker Data API (optional - ohne diese werden Mock-Daten verwendet)
   FM_BASE_URL=https://your-filemaker-server.com/fmi/data/v1
   FM_USER=your-username
   FM_PASSWORD=your-password
   ```

4. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

   Die App ist nun unter [http://localhost:3000](http://localhost:3000) erreichbar.

## 📦 Produktion

### Build erstellen
```bash
npm run build
```

### Produktions-Server starten
```bash
npm start
```

### Deployment
Die App kann auf verschiedenen Plattformen deployed werden:
- **Vercel** (empfohlen für Next.js)
- **Netlify**
- **Docker Container**
- Jeder Node.js-fähige Hosting-Anbieter

## 🛠️ Technologie-Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI**: [React 18](https://react.dev/) mit TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **PWA**: Manifest, Service Worker-ready
- **Backend**: FileMaker Data API Integration (mit Fallback auf Mock-Daten)

## 📂 Projektstruktur

```
dispo_pwa_lous/
├── app/                          # Next.js App Router
│   ├── (app)/                   # Authentifizierte Routen
│   │   ├── feedback/           # Feedback-Seite
│   │   ├── repair/             # Reparatur-Meldung
│   │   └── shifts/             # Schichten-Übersicht
│   ├── (auth)/                 # Auth-Routen
│   │   └── login/              # Login (Placeholder)
│   ├── api/                    # API Routes
│   │   ├── feedback/          # Feedback API
│   │   ├── repair/            # Reparatur API
│   │   └── shifts/            # Schichten API
│   ├── layout.tsx             # Root Layout mit PWA Meta-Tags
│   └── globals.css            # Globale Styles
├── components/                 # React Komponenten
│   ├── layout/                # Layout-Komponenten
│   ├── repair/                # Reparatur-Komponenten
│   └── shifts/                # Schichten-Komponenten
├── lib/                       # Utility Functions
│   ├── filemakerClient.ts    # FileMaker API Client
│   ├── mailto.ts             # E-Mail Helper
│   ├── shiftMapper.ts        # Daten-Mapping
│   ├── shiftTypes.ts         # TypeScript Typen
│   └── whatsapp.ts           # WhatsApp Helper
├── public/                    # Statische Assets
│   ├── icon.svg              # App Icon
│   └── manifest.json         # PWA Manifest
├── next.config.mjs           # Next.js Konfiguration
├── tailwind.config.ts        # Tailwind Konfiguration
└── tsconfig.json             # TypeScript Konfiguration
```

## 📱 PWA Installation

Die App kann auf mobilen Geräten als PWA installiert werden:

### iOS (Safari)
1. Öffne die App in Safari
2. Tippe auf das "Teilen"-Symbol
3. Scrolle nach unten und wähle "Zum Home-Bildschirm"
4. Bestätige mit "Hinzufügen"

### Android (Chrome)
1. Öffne die App in Chrome
2. Tippe auf das Menü (drei Punkte)
3. Wähle "App installieren" oder "Zum Startbildschirm hinzufügen"
4. Bestätige die Installation

### Desktop (Chrome/Edge)
1. Öffne die App im Browser
2. Klicke auf das Install-Symbol in der Adressleiste (⊕)
3. Bestätige die Installation

## 🎨 Design & Theme

- **Primärfarbe**: Slate (#0f172a)
- **Hintergrund**: Slate-50 (#f8fafc)
- **Akzent**: Cyan (#22d3ee)
- **Sprache**: Deutsch
- **Responsive**: Mobile-First Design

## 🔒 Sicherheit & Datenschutz

- Sensible Daten (FileMaker Credentials) nur serverseitig
- HTTPS empfohlen für Produktion
- Keine sensiblen Daten im Client-Code
- Feedback kann anonym eingereicht werden

## 🧪 Entwicklung & Testing

### Linting
```bash
npm run lint
```

### Type-Checking
TypeScript wird automatisch beim Build überprüft.

## 📝 Roadmap / TODO

- [ ] Authentifizierung implementieren (aktuell: Placeholder)
- [ ] FileMaker Data API vollständig anbinden
- [ ] Service Worker für Offline-Funktionalität
- [ ] Push-Benachrichtigungen für neue Schichten
- [ ] Kalender-Export (iCal)
- [ ] Dark Mode
- [ ] E2E Tests

## 🐛 Bekannte Probleme

- Login ist aktuell nur ein Placeholder
- FileMaker Integration benötigt Credentials (nutzt Mock-Daten als Fallback)
- Service Worker für Offline-Nutzung noch nicht implementiert

## 🤝 Mitwirken

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe [LICENSE](LICENSE) Datei für Details.

## 👥 Team

Entwickelt für Lou's Foodtruck Team

---

**Hinweis**: Für Produktions-Deployment sollten die PWA-Icons (`icon-192.png`, `icon-512.png`) durch hochwertige PNG-Versionen ersetzt werden. Das aktuelle SVG-Icon ist ein Platzhalter.
