# AXIOM Robotics — Enhanced Edition

A complete premium React landing page for a fictional robotics company. Original procedural Three.js models, graphite / acid-lime art direction, interactive product exploration, and a responsive editorial layout.

## What’s new in Edition 02

- Complete dark and light themes, with device-local preference saving
- Sticky frosted navigation, gradient headline, orbital glow, technical HUD panels
- Pointer-following card spotlights, subtle 3D card tilt, button light sweeps, glowing hover states
- Reading-progress indicator and back-to-top control
- Ambient motion toggle plus reduced-motion support
- Robotics lab with three platforms, titanium/graphite/ceramic finishes, adjustable rotation speed, wireframe, and reset
- Interactive Perception / Reasoning / Control architecture explorer with signal-flow diagrams
- Refined platform cards, intelligence panels, application cards, process cards, and contact section
- Theme-aware scene exposure; all fonts and runtime assets bundled locally

## Start the project

Install Node.js 22 LTS or newer. Open a terminal in the `axiom-robotics` folder:

```sh
npm install
npm run dev
```

Open the local address printed in your terminal. **Run `npm install` before `npm run dev`** so Vite and the other dependencies are available. On Windows, run the same commands in PowerShell; do not type the `>` prompt itself.

## Production build

```sh
npm run build
npm run preview
```

The ZIP includes a ready-made `dist/` folder. Upload its contents to any static web host. The production build uses esbuild; Vite provides the local development server and preview. No backend, secrets, or API keys are needed.

Do not double-click `index.html`: JavaScript modules require an HTTP server. To view the included build without installing Node dependencies, if Python is installed:

```sh
python -m http.server 8080 --directory dist
```

Then open http://localhost:8080.

### Vercel / Netlify

- Framework preset: Other
- Install command: `npm install` (or `npm ci`)
- Build command: `npm run build`
- Output directory: `dist`
- No environment variables required

## Included experiences

- Full-screen hero with an animated metallic humanoid and orbit controls
- Three procedural 3D models: humanoid, collaborative arm, autonomous rover
- Product tabs, pause/resume, wireframe toggle, and camera reset
- Real-time 3D motion-study dialog
- Animated intelligence-system section
- Interactive manufacturing, logistics, and research panels
- Development process and expandable FAQ
- Responsive mobile navigation
- Project inquiry dialog with validation and downloadable text brief
- Privacy dialog, keyboard-friendly native dialogs, focus return, skip link, accessible controls
- Reduced-motion support, offscreen render suspension, capped pixel density
- WebGL-unavailable explanatory fallback
- Production output and full editable source

## Customize

- `src/main.jsx`: brand copy, product specifications, sections, industry content, form
- `src/RobotScene.jsx`: geometry, materials, lighting, camera, animation
- `src/styles.css`: base typography and layouts
- `src/enhancements.css`: Edition 02 theme tokens, surfaces, responsive layouts, glow and hover effects
- `src/Experience.jsx`: theme/motion preferences, ambient effects, architecture explorer, robotics lab
- `public/favicon.svg`: site icon
- `index.html`: browser title and metadata
- `scripts/build.mjs`: standalone static production builder

The 3D robots are original procedural concept models, so no external model downloads are required. Change material colors in `RobotScene.jsx` to restyle the robots.

## Demo boundaries

AXIOM is fictional. Specifications are illustrative concept targets, not validated commercial claims. No inquiry is sent, no appointment is booked, and no data is stored on a server. The form stores information only in React memory until the page is refreshed; downloading creates a local text file. Theme and motion preferences are the only values saved to localStorage. Connect a backend before using it for real lead generation. Do not deploy invented specifications as real product claims.

## Verification

The production bundle was successfully compiled and its local asset references and ZIP structure were checked. Automated DOM interaction checks passed for theme persistence, global motion propagation, product tabs, architecture selection, lab model/finish/wireframe/reset, mobile menu state, dialog flow, and anchor targets. These checks used a scene stub; they do not validate WebGL rendering. Full browser-based visual QA was unavailable in the creation environment. Test on your target desktop/mobile browsers before a public client deployment. WebGL and hardware acceleration are recommended for the 3D scenes.

## File structure

```
axiom-robotics/
  src/
    main.jsx
    RobotScene.jsx
    styles.css
    enhancements.css
    Experience.jsx
    fonts/                 # Bundled local fonts
  public/favicon.svg
  scripts/build.mjs
  licenses/
  dist/                    # Ready-to-host production site
  index.html
  package.json
  package-lock.json
  vite.config.js
  README.md
```

## Credits and licensing

Built with React, Three.js, Vite, and esbuild. Third-party dependencies retain their respective licenses. Font credits: DM Sans and Space Grotesk, distributed under the SIL Open Font License license text is in `licenses/`. Original demo source and procedural models can be edited and used in your portfolio or adapted for a project.
