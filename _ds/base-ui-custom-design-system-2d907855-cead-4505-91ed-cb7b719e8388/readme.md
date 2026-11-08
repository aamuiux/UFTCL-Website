# Base UI Custom — design system

Base UI Custom packages the visual language of **Base UI** (`@base-ui/react`): its documentation site, and the house style it uses for every component demo. Base UI itself is an *unstyled*, accessible React component library "from the creators of Radix, Floating UI, and Material UI" (maintained by the MUI team). The library ships no visuals, so the look described here comes from two places in the repo:

1. **Demo style.** The CSS Modules hero demos on every component page (`docs/src/app/(docs)/react/components/*/demos/hero/css-modules/index.module.css`). It's monochrome and square-cornered, with 1px ink borders and a hard 4px offset shadow. **Every component in this system uses it.**
2. **Docs chrome.** The documentation website (`docs/src/css/index.css`, `docs/src/components/*.css`): soft greys, 12px-radius demo cards, Die Grotesk type and Paper Mono code. The UI kit uses it.

## Sources
- GitHub: **https://github.com/mui/base-ui** (branch `master`), mainly `docs/`. Explore the repo for deeper fidelity: `docs/src/app/(docs)/react/components/<name>/demos/` has hero, Tailwind and extra demos for every component, and `packages/react/src/` holds the behaviour.
- Live site: https://base-ui.com/react/overview/quick-start
- Sync record: `github.md`.

## Index
- `styles.css`: entry point, made only of `@import` lines (tokens + component CSS).
- `tokens/`: `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`.
- `components/`: React primitives plus one `@dsCard` card per folder.
  - `core/`: `Icons.jsx`, `hooks.js`, `menu.js`, `core.css` (shared button/input/popup/item rules).
  - `actions/`, `forms/`, `overlays/`, `disclosure/`, `display/`.
- `guidelines/`: foundation specimen cards (Colors, Type, Spacing, Effects, Brand).
- `ui_kits/docs/`: interactive recreation of the docs site (see its README).
- `assets/`: `logo.svg`, `favicon.svg`, `apple-touch-icon.png`, `fonts/`.
- `SKILL.md`, `thumbnail.html`, `github.md`.

## Components
The Base UI component inventory, one family per docs page:

- **actions/**: Button, Toggle, ToggleGroup, Toolbar (+ ToolbarGroup, ToolbarButton, ToolbarSeparator, ToolbarLink)
- **forms/**: Input, Field, Fieldset, Form, Checkbox, CheckboxGroup, RadioGroup (the docs "Radio" page), Switch, Slider, NumberField, OTPField, Select, Combobox, Autocomplete
- **overlays/**: Dialog, AlertDialog, Drawer, Popover, Tooltip, PreviewCard, Menu, ContextMenu, Menubar, NavigationMenu, Toast (+ ToastProvider, useToastManager)
- **disclosure/**: Accordion, Collapsible, Tabs
- **display/**: Avatar, Meter, Progress, Separator, ScrollArea
- **core/**: Icons (CheckIcon, CaretDownIcon, CaretUpIcon, CaretRightIcon, CaretUpDownIcon, PlusIcon, MinusIcon, XIcon, AlignLeft/Center/RightIcon, MagnifyingGlassIcon, CopyIcon, ExternalLinkIcon, ArrowRightIcon, GitHubIcon, NpmIcon, BaseUILogo)

The APIs are simplified, props-driven wrappers (e.g. `<Select items={…} />`), not Base UI's compound parts (`Select.Root/Trigger/Popup…`). The styling copies the source exactly, and the behaviour is a lightweight approximation.

**Intentional additions:** `Icons` collects the inline SVG glyphs that the demos and docs define locally into one export set. `ToastProvider`/`useToastManager` stand in for Base UI's `Toast.Provider`/`Toast.useToastManager`.

---

## CONTENT FUNDAMENTALS
- **Voice:** plain, technical, calm. Most sentences are short declaratives. The docs say "you" to the reader and "we" for the team ("Learn how we build accessible components").
- **Page subtitles** are one sentence that starts with an article and defines the thing: "A control that indicates whether a setting is on or off." "A popup that opens on top of the entire page." "A set of collapsible panels with headings."
- **Casing:** sentence case for headings and nav ("Quick start", "Usage guidelines", "API reference", "Labeling a switch"). Component names keep their spaced title case ("Alert Dialog", "Number Field"). The nav badge is the only ALL CAPS text (10px poppy "NEW").
- **Demo copy** is homely and concrete: "Enable notifications", "You are all caught up. Good job!", "Song → Add to Library / Play Next", apples (Gala, Fuji, Honeycrisp, Granny Smith, Pink Lady), fruits, "Recovery keys: alien-bean-pasta, wild-irish-burrito, horse-battery-staple", "Edited 51m ago", "Discard draft?".
- **Buttons** are short verb phrases with no trailing punctuation: "Submit", "Close", "Dismiss", "Create toast", "View notifications".
- **Guidance** is bold-lead bullets: "**Form controls must have an accessible name**: It can be created using a `<label>` element…".
- **Typography details:** curly quotes and apostrophes (“Quick start”, you’ll), the ⌘K shortcut drawn as `<kbd>`, and inline code in blue on a pale blue highlight. *Emphasis* switches to Georgia.
- **No emoji, no exclamation-heavy marketing tone.** The one cheerful line ("Good job!") sits inside a demo.

## VISUAL FOUNDATIONS
- **Overall vibe:** a neutral blueprint. The components look like wireframes on purpose: black and white, square, 1px lines. The docs around them are quiet and greyscale with generous whitespace. Base UI is unstyled, so the demos avoid looking like any product's brand.
- **Color:** the components are almost entirely ink `oklch(14.5% 0 0)` on white. Neutral-100 is hover, neutral-200 is press, track and avatar background, neutral-500 is placeholder/disabled, and neutral-600 is muted description text. The only chroma is red-700 for errors and destructive actions and blue-700 for link hover in the toolbar. The docs chrome uses an hsl gray scale (s1/s2 surfaces, c1–c3 component fills, p placeholders, t text), alpha blacks for borders (`blackA-2` = 8%), and accent t1 hues used sparingly (poppy for badges).
- **Type:** *Die Grotesk A* is the body and UI face (400/700), with OpenType `zero` and the ss02 alternate R in the docs. *Die Grotesk B* is the wider heading cut (H1 34/43, H2 21/26, H3 18/28, all 700). *Paper Mono* is for code, at wght 415 with a 13.5/14 size-adjust. Demos turn off the Die Grotesk features. Component text is always 14px, with 20px leading for labels and controls and 16px for menu items. Titles are 16/24 bold.
- **Spacing:** rem-based `--space-4…48`, named by px. Controls are 32px tall (button padding-x 12px, input 8px). Indicators are 16px. Label-to-control gap is 4px, form fields are spaced 16px apart, and popup lists have 4px top and bottom padding.
- **Corner radii:** components use **0**. The only round shapes are Radio and Avatar (circles). The docs chrome uses 6px for nav pills, 8px for ghost buttons, 12px for demo cards, code blocks and tables, and pill shapes for the "Show code" button.
- **Borders:** 1px solid ink on every control and popup. Separators inside menus are 1px ink rules inset 4px. Standalone separators are neutral-300. Docs borders are an 8% black alpha.
- **Shadows:** the signature is the hard offset `0.25rem 0.25rem 0 rgb(0 0 0 / 12%)` on every popup, dialog, drawer and toast, with no blur. It is removed in dark mode. The docs keep a soft 5-step `--shadow-1…5` stack, but it's rarely visible.
- **Cards:** in the docs, a demo card is a 1px alpha border with 12px radius, a white playground (2rem × 1.5rem padding, 8rem minimum height, content centred), a mono tab strip and a grey code panel. In components, "cards" are plain ink-outlined boxes.
- **Hover:** fills with neutral-100. Text links drop their underline (docs) or darken the underline colour (demos). Side-nav links gain an underline.
- **Press:** fills with neutral-200. Nothing scales on press. Pressed toggles and highlighted menu items **invert** to an ink fill with white text. That inversion is the only "selected" treatment.
- **Focus:** a 2px ink outline, inset `-1px` on controls and offset `2px` on checkboxes and switches.
- **Disabled:** text and border change to neutral-500, and the fill stays white.
- **Animation:** short and functional. Popups fade and scale from 0.98 over 100ms ease-out from their transform origin. Panel heights, the switch thumb, the tab indicator and the backdrop take 150ms. The drawer slides over 450ms `cubic-bezier(0.32,0.72,0,1)`. Toast and navigation-menu resizes use 350–500ms `cubic-bezier(0.22,1,0.36,1)`. Icons rotate: + to × at 45° in the accordion, caret 90° in the collapsible, 180° in the nav menu. Nothing bounces.
- **Backdrops:** solid black at 20% opacity (50% in dark mode). There are no blurs, gradients or glass effects anywhere, apart from the subtle gradient on the docs "Show code" pill and the code fade-out.
- **Imagery:** almost none. The demos use a few Unsplash photos (an avatar portrait, Rotterdam station signage), shown full colour, square, with object-fit cover.
- **Layout:** the docs use a fixed 64px header (transparent at 1344px and wider), a sticky 280px sidebar, a 48rem content column and a 280px quick nav. The maximum layout width is 89rem, with 3rem page gutters.
- **Dark mode:** the demos flip ink and paper and drop the shadow. In this system, opt in with `data-theme="dark"` on any ancestor; the components read semantic aliases (`--ink`, `--paper`, `--surface-hover`…).

## ICONOGRAPHY
- There is **no icon font and no icon package**. Every glyph is an inline SVG defined in the demo or docs file that uses it, mostly 16×16 with `stroke="currentColor"`, a 1px stroke and square caps and joins, or small solid triangle carets (`M12 6H4l4 4.5z`).
- Recurring glyphs: check, carets (down, up, right, up-down), plus, minus, x, align left/center/right, magnifying glass, copy, external link, arrow right, plus the GitHub and npm marks in the side nav. These are copied verbatim into `components/core/Icons.jsx`. Use them rather than Lucide or Heroicons. If you need a new glyph, match the style: 16px box, 1px currentColor stroke, square caps.
- Icons always inherit the text colour, with no coloured icons. They sit 6–8px from their label.
- **No emoji. No unicode-as-icon**, except `⌘` / `K` in `<kbd>` keycaps and the `$` / `%` toolbar labels.
- **Logo:** the Base UI mark (two lobes, 17×24) is in `assets/logo.svg` and as the `BaseUILogo` component, always rendered in currentColor. The docs header shows the mark only, with no wordmark.

## Fonts
Real font files were copied from `docs/public/fonts/`: Die Grotesk A (regular and bold), Die Grotesk B (regular and bold) and Paper Mono (variable, one file). Check the licensing before you ship them outside the Base UI project. `--font-serif` is Georgia (system); `'Noto Serif'` and `'DejaVu Serif'` were dropped from the stack.
