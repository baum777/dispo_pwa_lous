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

## 🔌 FileMaker Integration einrichten

Die App ist vorbereitet für die Anbindung an FileMaker. So richtest du die Verbindung ein:

### Schritt 1: Umgebungsvariablen konfigurieren

Erstelle eine `.env.local` Datei im Projektverzeichnis (wird nicht versioniert):

```bash
# FileMaker Data API Verbindung
FM_BASE_URL=https://dein-filemaker-server.com/fmi/data/v1/databases/DATENBANK_NAME
FM_USER=api_benutzer
FM_PASSWORD=sicheres_passwort
```

**Wichtig**:
- In Produktion (z.B. Vercel) diese Werte als Environment Variables in den Projekt-Einstellungen hinterlegen
- Niemals Credentials in Git committen

### Schritt 2: FileMaker Layout/Table vorbereiten

Deine FileMaker-Datenbank sollte folgende Felder haben:

**Schichten-Tabelle** (für `/api/shifts`):
```
recordId          (Primary Key)
date              (Text/Datum, Format: YYYY-MM-DD)
weekday           (Text, z.B. "Mo", "Di", etc.)
timeRange         (Text, z.B. "08:30 bis 13:30")
locationName      (Text)
locationContactEmail (Text)
eventName         (Text)
detailsPdfUrl     (Text, optional)
staff             (JSON Array, siehe unten)
```

**Staff-Format** (als JSON oder Portal):
```json
[
  {
    "name": "Julian G",
    "whatsappNumber": "+491701234567"
  },
  {
    "name": "Dana M",
    "whatsappNumber": "+4915112345678"
  }
]
```

### Schritt 3: FileMaker Client anpassen

Die Datei `lib/filemakerClient.ts` enthält die API-Logik. Passe diese an deine FileMaker-Struktur an:

**Aktuell** (Zeile 27):
```typescript
const queryUrl = `${FM_BASE_URL ?? ''}/shifts?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
```

**Anpassen an deine FileMaker Data API**:
```typescript
// Beispiel für FileMaker Data API
const queryUrl = `${FM_BASE_URL}/layouts/LAYOUT_NAME/records`;
const body = {
  query: [
    {
      date: `>=${from}`,
      date: `<=${to}`
    }
  ]
};

const response = await fetch(queryUrl, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${authHeader}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});
```

### Schritt 4: Feld-Mapping anpassen

In `lib/shiftMapper.ts` (Zeile 8-35) wird das FileMaker-Format in das App-Format übersetzt.

**Beispiel-Anpassung**, wenn deine FileMaker-Felder anders heißen:

```typescript
export function mapFileMakerRecordToShift(record: FileMakerRecord): Shift {
  const fields = record.fieldData;
  return {
    id: record.recordId,
    date: String(fields['Datum'] ?? ''),              // Dein FileMaker-Feldname
    weekday: String(fields['Wochentag'] ?? ''),       // Dein FileMaker-Feldname
    timeRange: String(fields['Uhrzeit'] ?? ''),       // Dein FileMaker-Feldname
    locationName: String(fields['Standort'] ?? ''),   // Dein FileMaker-Feldname
    // ... weitere Felder anpassen
  };
}
```

### Schritt 5: Testen

1. Starte die App: `npm run dev`
2. Öffne [http://localhost:3000/shifts](http://localhost:3000/shifts)
3. Prüfe die Browser-Konsole auf Fehler
4. Bei Erfolg: Echte FileMaker-Daten werden geladen
5. Bei Fehler: Mock-Daten als Fallback

### FileMaker Data API Referenz

- [FileMaker Data API Dokumentation](https://help.claris.com/en/data-api-guide/)
- Authentifizierung: Basic Auth (Base64-kodiert)
- Endpoint: `/fmi/data/v1/databases/{database}/layouts/{layout}/records`

## 🎨 UI-Anpassungen: Texte & Design ändern

### Texte ändern

#### 1. Seitentitel und Überschriften

**Schichten-Seite** (`app/(app)/shifts/page.tsx:42-43`):
```typescript
<PageHeader
  title="Schichten"                    // Hier Titel ändern
  description="Tippe auf Datum/Zeit..." // Hier Beschreibung ändern
/>
```

**Reparatur-Seite** (`app/(app)/repair/page.tsx`):
Suche nach `<PageHeader>` und ändere die Props

**Feedback-Seite** (`app/(app)/feedback/page.tsx`):
Suche nach `<PageHeader>` und ändere die Props

#### 2. App-Name und Metadaten

**Root Layout** (`app/layout.tsx:5-6`):
```typescript
export const metadata: Metadata = {
  title: "Lou's Team PWA",              // Browser-Tab Titel
  description: "Team-App für Lou's...", // Meta-Description
```

**PWA Manifest** (`public/manifest.json:2-3`):
```json
{
  "name": "Lou's Foodtruck Team PWA",   // Voller App-Name
  "short_name": "Lou's Team",           // Kurzer Name (Home-Screen)
  "description": "Team-App für..."      // App-Beschreibung
}
```

#### 3. Status-Meldungen

**Schichten Laden** (`app/(app)/shifts/page.tsx:46-50`):
```typescript
{status === 'loading' && <div>Schichten werden geladen…</div>}
{status === 'error' && (
  <div>
    Fehler beim Laden. <button>Erneut versuchen</button>
  </div>
)}
```

#### 4. Formular-Labels

**Reparatur-Formular** (`app/(app)/repair/page.tsx`):
Suche nach `<label>` Tags und ändere den Text

**Feedback-Formular** (`app/(app)/feedback/page.tsx`):
Suche nach `<label>` Tags und ändere den Text

### Farben ändern

#### 1. Theme-Farben (Global)

**Tailwind Config** (`tailwind.config.ts`):
```typescript
theme: {
  extend: {
    colors: {
      // Eigene Farben hinzufügen
      'lou-blue': '#1e40af',
      'lou-orange': '#f97316',
    }
  }
}
```

**Dann in Komponenten verwenden**:
```typescript
<div className="bg-lou-blue text-white">...</div>
```

#### 2. PWA Theme-Farbe

**Manifest** (`public/manifest.json:8`):
```json
{
  "theme_color": "#0f172a"  // Farbe der Browser-UI (Hex-Code)
}
```

**Viewport** (`app/layout.tsx:24`):
```typescript
export const viewport: Viewport = {
  themeColor: '#0f172a'  // Muss mit Manifest übereinstimmen
};
```

#### 3. Hintergrundfarben

**Root Layout** (`app/layout.tsx:33`):
```typescript
<body className="min-h-full bg-slate-50 text-slate-900">
//                          ^^^^^^^^^ Hintergrund
//                                    ^^^^^^^^^^^ Textfarbe
```

**Beispiele**:
- `bg-slate-50` → Hellgrau
- `bg-white` → Weiß
- `bg-blue-50` → Hellblau
- `bg-gray-100` → Grau

### Design-Komponenten anpassen

#### 1. Buttons

**Globale Button-Styles** (`components/...`):
Suche nach Buttons und ändere die `className`:

```typescript
// Aktueller Primary Button
<button className="rounded-md bg-slate-900 px-4 py-2 text-white">

// Beispiel: Orange Button
<button className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
```

#### 2. Tabellen-Design

**ShiftTable** (`components/shifts/ShiftTable.tsx`):
Suche nach `className` und ändere:
- Border: `border-slate-200` → `border-blue-200`
- Hover: `hover:bg-slate-50` → `hover:bg-blue-50`

#### 3. Karten/Cards

Suche in Komponenten nach:
```typescript
className="rounded-lg bg-white shadow-sm border"
```

Und ändere:
- Radius: `rounded-lg` → `rounded-xl` (stärker abgerundet)
- Schatten: `shadow-sm` → `shadow-md` (stärkerer Schatten)
- Border: `border` → `border-2` (dickerer Rand)

### Standard-Zeitraum ändern

**Schichten-Seite** (`app/(app)/shifts/page.tsx:17`):
```typescript
const [range, setRange] = useState(dateRange(14));
//                                           ^^ Tage voraus (14 = 2 Wochen)
```

Ändere die Zahl für einen anderen Standard-Zeitraum:
- `7` = 1 Woche
- `30` = 1 Monat
- `60` = 2 Monate

### Schnellreferenz: Häufige Tailwind-Klassen

```
Größen:         text-sm, text-base, text-lg, text-xl, text-2xl
Abstände:       p-4 (Padding), m-4 (Margin), space-y-4 (Vertikal)
Farben:         bg-{farbe}-{helligkeit}, text-{farbe}-{helligkeit}
Rahmen:         border, rounded-lg, shadow-md
Layout:         flex, grid, space-x-4
Responsive:     md:text-lg (ab Medium Screen größerer Text)
```

**Volle Tailwind-Dokumentation**: https://tailwindcss.com/docs

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
