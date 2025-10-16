# Countries Explorer

A fully-configurable country explorer built with React, Vite, and TypeScript.  
All country, currency, user and overlay data sources are **generic, config-driven and environment-configurable**, loaded from JSON files.  
Supports user-defined overlays, flexible filters, and easy data extension for any dataset.

## Features

- **Interactive map:** Explore a cuztomizable world map
- **Country details:** View detailed country information
- **Configurable filters:** Filter by region, subregion, sovereignty and overlays
- **Config-driven data:** All sources loaded from JSON files via environment variables
- **Overlay import/export:** Backup, share, or migrate overlays directly from the UI
- **Export maps:** Export your maps as SVG or PNG images
- **Accessible design:** All major actions and navigation are keyboard-friendly
- **Modern UI:** Responsive design with Tailwind CSS and icons
- **Flag guessing game:** Test your knowledge with an interactive flag quiz

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the dev server**
   ```bash
   npm run dev
   ```

3. **Edit `.env` and `public/data/*.json` to customize your data**

## Data Sources

All main data sources are loaded from JSON files in the `public/data` folder.  
You can change their location or swap datasets by editing the `.env` file.

| Data Type        | Default Path                | Env Variable                    |
|------------------|---------------------------- |---------------------------------|
| Map GeoJSON      | `/data/countries.geojson`   | `VITE_MAP_GEO_URL`              |
| Countries        | `/data/countries.json`      | `VITE_COUNTRY_DATA_URL`         |
| Currencies       | `/data/currencies.json`     | `VITE_CURRENCY_DATA_URL`        |
| Overlays         | `/data/overlays.json`       | `VITE_OVERLAYS_CONFIG_URL`      |

**Sources:**
- Country boundaries: [datasets/geo-countries](https://github.com/datasets/geo-countries)
- Country data: [REST Countries](https://restcountries.com/)
- Currency data: [Open Exchange Rates](https://openexchangerates.org/api/currencies.json)

## Customizing Data & Overlays

1. **Edit JSON files in `public/data`**  
   - See [Overlay JSON Example](docs/overlay-example.html) for a full example.

2. **Update `.env` to point to your data files**  
   - No code changes needed—just edit the paths.

3. **Overlays are config-driven**  
   - Each overlay in `overlays.json` can have its own color, tooltip, and country list.

4. **Import/Export overlays via the UI**  
   - Use the overlay manager panel to backup, restore, or share overlays as JSON files.

## Keyboard Shortcuts

See [Keyboard Shortcuts](docs/keyboard-shortcuts.md) for a full list of keyboard shortcuts.

## Project Structure

```
countries/
|
├── public/              # Static assets (favicon, images, etc.) 
|   ├── data             # All JSON data sources 
|   └── images           # Images
|
├── scripts/             # Data-related scripts 
|
├── src/
│   ├── components/      # Reusable UI and layout components
|   │   ├── common
|   │   ├── country
|   │   ├── filters
|   │   ├── game
|   │   ├── map
|   │   ├── overlay
|   │   └── settings
│   |  
│   ├── config/          # Constants and configuration files
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── styles/          # Global and component styles
│   ├── types/           # Custom types
│   ├── utils/           # Utilities
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
```

## Tips & Customization

- Add or edit overlays and country lists in `public/data/overlays.json`
- Add new filters by editing `src/config/filtersConfig.ts`
- All data sources are generic—just swap JSON files and update `.env`
- Use the overlay manager panel to import/export overlays for backup or sharing
