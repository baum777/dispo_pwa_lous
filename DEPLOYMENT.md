# 🚀 Deployment Guide - Lou's Team PWA

## ✅ Vercel Deployment (Empfohlen)

### Methode 1: GitHub Integration (Automatisch)

1. **Repository zu GitHub pushen**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Vercel Projekt erstellen**
   - Gehe zu [vercel.com/new](https://vercel.com/new)
   - Melde dich mit GitHub an
   - Klicke auf "Import Project"
   - Wähle dein Repository aus

3. **Projekt konfigurieren**
   - **Framework Preset**: Next.js (wird automatisch erkannt)
   - **Build Command**: `npm run build` (Standard)
   - **Output Directory**: `.next` (Standard)
   - **Install Command**: `npm install` (Standard)

4. **Environment Variables setzen (Optional)**
   
   Nur wenn FileMaker-Integration gewünscht:
   - Klicke auf "Environment Variables"
   - Füge hinzu:
     ```
     FM_BASE_URL=https://your-filemaker-server.com/fmi/data/v1
     FM_USER=your-username
     FM_PASSWORD=your-password
     ```
   - Wähle: Production, Preview, Development

5. **Deploy!**
   - Klicke auf "Deploy"
   - Vercel buildet und deployed automatisch
   - Du erhältst eine URL: `https://your-project.vercel.app`

### Methode 2: Vercel CLI

```bash
# Vercel CLI installieren (einmalig)
npm i -g vercel

# Login
vercel login

# Deployment
vercel

# Production Deployment
vercel --prod
```

---

## 🔧 Konfiguration

### Ohne FileMaker (Mock-Daten)
**Keine Konfiguration nötig!** Die App läuft out-of-the-box mit Demo-Daten.

### Mit FileMaker Integration
Setze diese Environment Variables auf Vercel:

| Variable | Beschreibung | Beispiel |
|----------|--------------|----------|
| `FM_BASE_URL` | FileMaker Data API Base URL | `https://fm.example.com/fmi/data/v1` |
| `FM_USER` | FileMaker Username | `webapi_user` |
| `FM_PASSWORD` | FileMaker Password | `secure_password_123` |

---

## 🌍 Regionale Deployment

Die App ist für **Frankfurt (fra1)** optimiert (siehe `vercel.json`).

Für andere Regionen, bearbeite `vercel.json`:
```json
{
  "regions": ["iad1"]  // US East
}
```

Verfügbare Regionen:
- `fra1` - Frankfurt (Europa) ⭐
- `iad1` - Washington DC (US East)
- `sfo1` - San Francisco (US West)
- `hnd1` - Tokyo (Asien)

---

## 📱 PWA Features nach Deployment

Nach dem Deployment ist die App eine vollwertige PWA:

### iOS Installation
1. Safari öffnen → App-URL aufrufen
2. Share-Button → "Zum Home-Bildschirm"
3. App ist nun installierbar

### Android Installation
1. Chrome öffnen → App-URL aufrufen
2. "App installieren" Banner erscheint
3. Oder: Menü → "Zum Startbildschirm hinzufügen"

---

## 🔒 Sicherheit

✅ Aktiviert:
- Security Headers (X-Frame-Options, CSP, etc.)
- HTTPS by default (via Vercel)
- No `X-Powered-By` header
- FileMaker Credentials nur serverseitig

---

## 📊 Monitoring

### Vercel Analytics (Optional)
Aktiviere Analytics in den Vercel Project Settings:
- Performance Monitoring
- Web Vitals
- User Analytics

---

## 🔄 Continuous Deployment

Nach dem initialen Setup:

1. **Automatisches Deployment**
   - Jeder Push zu `main` → Production Deployment
   - Jeder Pull Request → Preview Deployment

2. **Preview URLs**
   - Jeder PR erhält eine unique URL
   - Perfekt zum Testen vor dem Merge

3. **Rollbacks**
   - Im Vercel Dashboard: Deployments → "Promote to Production"
   - Instant Rollback zu jedem vorherigen Deployment

---

## 🧪 Pre-Deployment Checklist

Vor dem Production-Deployment prüfen:

- [ ] `npm run build` läuft ohne Fehler
- [ ] `npm run lint` zeigt keine Errors
- [ ] PWA Icons sind hochwertig (ersetze Placeholder-SVG)
- [ ] Environment Variables sind gesetzt (falls FileMaker benötigt)
- [ ] README.md ist aktuell
- [ ] .gitignore enthält `.env*` (keine Secrets committen!)

---

## 🆘 Troubleshooting

### Build Fehler auf Vercel

**Problem**: Build schlägt fehl
```bash
# Lokal testen
npm run build
```

**Häufige Ursachen**:
- TypeScript Fehler → `npm run lint` lokal prüfen
- Missing Dependencies → `package.json` prüfen
- Environment Variables fehlen → Vercel Settings prüfen

### FileMaker Verbindung schlägt fehl

**Problem**: App zeigt nur Mock-Daten
- [ ] Environment Variables korrekt gesetzt?
- [ ] FileMaker Server erreichbar? (Firewall/CORS)
- [ ] Credentials korrekt?

**Debug**: Console Logs in Vercel anschauen
```
Settings → Functions → View Logs
```

---

## 💡 Best Practices

1. **Branch Strategy**
   - `main` → Production
   - `develop` → Staging
   - Feature Branches → Preview Deployments

2. **Environment Variables**
   - NIEMALS in Git committen
   - Nutze Vercel Environment Variables
   - Unterschiedliche Werte für Production/Preview

3. **Monitoring**
   - Aktiviere Vercel Analytics
   - Überwache Core Web Vitals
   - Setze Error Monitoring auf (z.B. Sentry)

---

## 📞 Support

Bei Fragen oder Problemen:
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Project Issues: [GitHub Issues]

---

**Status**: ✅ Production Ready
**Build Status**: ✅ Passing
**Linting**: ✅ No Errors
**Framework**: Next.js 14.2.8
