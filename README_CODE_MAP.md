# Portfolio Code Map

This version includes the latest requested cleanup:

- Removed the starter/demo projects **Food for the Soul**, **Masquerade**, and **Potion Workshop** from the portfolio data.
- The active projects are now **To Boldly Escargot**, **ETERNIA**, **LilyPad**, **Dino Luzzi Website Redesign**, and **Wisp: Echoes of the Afterlight**.
- The hover card no longer has the redundant **Click to open project** button.
- The modal info cards now show **Year / Status / Role / Team Size**.
- The top placeholder logo/title tile above the modal title has been removed.
- Project subtitles have been removed from both cards and popups, so deleted/empty subtitles will not show `undefined`.
- Project trailers use local MP4 files in the gallery when available; the secondary action buttons can still link out to YouTube.
- Header navigation now includes **Portfolio**, **Resume**, **Skills**, and **Contact** tabs.
- A new glass-styled **Resume** section was added below the portfolio section.
- A **Skills** tab now links to the animated skill bubble cloud.
- A **Contact** tab now links to the existing contact section.
- The active nav highlight offset was adjusted so Resume highlights immediately after clicking the tab.

- Section headers were simplified: **PROJECTS**, **RESUME**, and **SKILLS** now use clean centered titles without glass title boxes or descriptive subtitles.
- The project intro paragraph and resume intro paragraph were removed for a cleaner layout.


## Header / Navigation tabs

The top navigation tabs are in:

```txt
index.html
```

Search for:

```html
MAIN HEADER / SITE NAVIGATION
```

Current live tabs:

```html
<a href="#showcase">Portfolio</a>
<a href="#resume">Resume</a>
<a href="#skills">Skills</a>
<a href="#contact">Contact</a>
```

Future About and Skills tabs are already left as comments in the desktop and mobile nav. When you build those sections later, uncomment/add matching links such as:

```html
<a href="#about">About</a>
<a href="#skills">Skills</a>
```

The active-highlight behavior still comes from `script.js`, which checks visible `section[id]` blocks while scrolling. The scroll offset is set to `window.pageYOffset + 110` so fixed-header anchor jumps highlight the correct tab immediately.

## Resume section

The Resume section is in:

```txt
index.html
```

Search for:

```html
RESUME SECTION
```

The resume is organized into two columns:

```txt
Left column: Summary + Education
Right column: Professional Experience
```

To edit resume text, update the HTML inside each:

```html
<div class="resume-item"> ... </div>
```

The visual styling for the resume is at the bottom of:

```txt
style.css
```

Search for:

```css
Resume Section + New Header Navigation
```

The layout uses a glass card style and timeline dots, inspired by the old portfolio resume section but restyled for this new website.



## Skills section

The Skills section is in:

```txt
index.html
```

Search for:

```html
SKILLS SECTION
```

The visible skill filter buttons are inside:

```html
<div class="skill-filter-bar" id="skillFilterBar">
```

Current skill filters:

```html
data-filter="all"
data-filter="production"
data-filter="tech"
data-filter="design"
```

The skill bubble list is controlled in:

```txt
script.js
```

Search for:

```js
const skillCloudItems = [
```

Each skill looks like this:

```js
{ name: 'Jira', categories: ['production'], tagLabel: 'Production', icon: 'jira' }
```

- `name` is the label inside the bubble.
- `categories` controls which sorter buttons show the skill.
- `tagLabel` controls the small text tag on the bubble.
- `icon` is optional and uses Simple Icons from CDN when available.
- If no icon is provided, the bubble uses initials as a fallback.

To add a skill under Tech, use:

```js
{ name: 'New Tool', categories: ['tech'], tagLabel: 'Tech', icon: 'optional-simpleicons-name' }
```

The bubble movement and hover behavior is styled in:

```txt
style.css
```

Search for:

```css
Skills Section: Animated Bubble Cloud
```

The JavaScript updates CSS variables named `--push-x` and `--push-y` when the mouse moves through the cloud. The hover enlargement is controlled by `.skill-bubble:hover`.

## Contact section

The Contact tab points to:

```html
<section class="contact" id="contact">
```

That section is near the bottom of `index.html`. Search for:

```html
CONTACT SECTION
```

Right now the contact form is front-end only. It looks like a form, but it will not send messages until you connect it to a service such as Formspree, Netlify Forms, EmailJS, or your own backend.

The Contact visual styling is at the bottom of `style.css`. Search for:

```css
Contact Section polish
```

## Where to edit project content

Open:

```txt
script.js
```

Search for:

```js
const portfolioProjects = [
```

Each project is one object inside that array.

Current active project objects:

```txt
To Boldly Escargot
ETERNIA
LilyPad
Dino Luzzi Website Redesign
Wisp: Echoes of the Afterlight
```

The removed demo projects are no longer in `portfolioProjects`, so they will not render on the site.

## Project tags / sorter

The visible filter buttons are in:

```txt
index.html
```

Search for:

```html
projectFilterBar
```

The tag/category assigned to each project is in each project object:

```js
categories: ['game', 'art'],
categoryLabel: 'Game / Art',
```

`categories` controls the filter logic. `categoryLabel` controls what displays on the card.

## Modal info cards

The four modal info cards are controlled by this function:

```js
renderStatGrid(project)
```

It currently displays:

```js
project.year
project.status
project.popupRole
project.teamSize
```

So inside each project, edit/add:

```js
year: '2024',
status: 'Published build',
popupRole: 'Game Designer / Developer',
teamSize: '5 people',
```

## Modal title box

The old separate logo/title box above the popup title has been removed from the HTML and JavaScript. The popup now only shows the small eyebrow label and the main project title.

## Card title

The card title comes from:

```js
title: 'Wisp: Echoes of the Afterlight',
```

Project subtitles are no longer rendered anywhere. You do not need to add a `subtitle` field.

## Latest project-card cleanup notes

### Subtitle removed everywhere
The project card and modal no longer render `subtitle`. You can leave old `subtitle` fields out of project objects entirely.

### Popup role vs. hover overlay roles
These are now intentionally separate:

```js
popupRole: 'Game Designer', // appears in the popup info card
cardRoles: ['Game Designer', 'Developer', 'Pixel Artist'], // appears under WORKED AS on hover
```

Changing `cardRoles` will not change the popup Role card. Changing `popupRole` will not change the hover overlay.

### Logo/title box removed from popup
The old `project-brand-logo-wrap` box above the modal title was removed from the HTML and is no longer generated in JavaScript. Do not use `logoImage`; it is no longer part of the modal layout.

## ETERNIA project notes

The ETERNIA project has been added inside `portfolioProjects` in `script.js`.

Search for:

```js
title: 'ETERNIA'
```

The project currently uses these local asset paths:

```txt
images/portfolio/eternia-cover.png
images/portfolio/eternia-gameplay-1.png
images/portfolio/eternia-gameplay-2.png
images/portfolio/eternia-gameplay-3.png
images/portfolio/eternia-gameplay-4.png
images/portfolio/eternia-gameplay-5.png
media/eternia-game-trailer.mp4
```

The first gallery item is a local MP4 video:

```js
{
    type: 'video',
    src: 'media/eternia-game-trailer.mp4',
    poster: 'images/portfolio/eternia-cover.png'
}
```

The YouTube trailer is kept as the secondary action button:

```js
secondaryLink: { label: 'Watch Trailer', url: 'https://www.youtube.com/watch?v=hZn7wAwDI4k' }
```

To change where ETERNIA appears in the sorter, edit:

```js
categories: ['game'],
categoryLabel: 'Game',
```

For example, to show it under both Game and Art:

```js
categories: ['game', 'art'],
categoryLabel: 'Game / Art',
```



## Wisp video fix

The Wisp gallery now uses the local MP4 file instead of a YouTube embed:

```js
{
    type: 'video',
    src: 'media/wisp-trailer.mp4',
    poster: 'images/portfolio/wisp-portfolio-3.png'
}
```

The popup button still links to YouTube through:

```js
secondaryLink: { label: 'Watch Trailer', url: 'https://www.youtube.com/watch?v=41WmCLFOm1s' }
```

Use `type: 'video'` for local MP4 files. Use `type: 'youtube'` only if you want a thumbnail that opens YouTube in a new tab.

## LilyPad project notes

The LilyPad project has been added inside `portfolioProjects` in `script.js`.

Search for:

```js
title: 'LilyPad'
```

The project currently appears under the **UX/UI** and **Web** sorter buttons:

```js
categories: ['uxui', 'web'],
categoryLabel: 'UX/UI / Web',
```

The visible sorter button for UX/UI was added in `index.html`:

```html
<button class="project-filter-button" type="button" data-filter="uxui">UX/UI</button>
```

Remember: the `data-filter` value must match the project `categories` value exactly.

The LilyPad project uses these local asset paths:

```txt
images/portfolio/lilypad-cover.png
images/portfolio/lilypad-wireframes.png
images/portfolio/lilypad-screens-1.png
images/portfolio/lilypad-screens-2.png
images/portfolio/lilypad-concept-art.png
```

The project website button is controlled by:

```js
externalLink: { label: 'Project Website', url: 'https://ancent0713.wixsite.com/lilypad' }
```

The Figma button is controlled by:

```js
secondaryLink: { label: 'View Figma', url: 'https://www.figma.com/design/9AnNzOGwrb9dRi3WsRy9t0/LilyPad-Wireframe?node-id=391-208&t=HFArEQq5WOarj0Wn-1' }
```


## Dino Luzzi project notes

The Dino Luzzi Website Redesign project has been added inside `portfolioProjects` in `script.js`.

Search for:

```js
title: 'Dino Luzzi Website Redesign'
```

The project currently appears under the **UX/UI** and **Web** sorter buttons:

```js
categories: ['uxui', 'web'],
categoryLabel: 'UX/UI / Web',
```

The project uses these local image paths:

```txt
images/portfolio/dino-luzzi-hero.png
images/portfolio/dino-luzzi-products.png
images/portfolio/dino-luzzi-energy.png
```

This project uses multiple external action buttons. The first two are:

```js
externalLink: { label: 'View Prototype', url: '...' },
secondaryLink: { label: 'View Figma', url: '...' },
```

Additional buttons are controlled by:

```js
extraLinks: [
    { label: 'View Code', url: 'https://github.com/lachyn21/dinoluzzi' },
    { label: 'Original Website', url: 'https://dinoluzzi.com/' }
]
```

The `extraLinks` array is optional. Use it when a project needs more than two buttons in the popup.


## Skills bubble cloud latest changes

The Skills section now uses a clustered bubble layout inspired by the reference image. The bubbles are no longer arranged like a loose grid.

To edit the skills, open:

```txt
script.js
```

Search for:

```js
const skillCloudItems = [
```

Skill category tags still control the filters:

```js
{ name: 'Jira', categories: ['production'], icon: 'jira' }
{ name: 'Unity', categories: ['tech'], icon: 'unity' }
{ name: 'Photoshop', categories: ['design'], icon: 'adobephotoshop' }
```

The category text is **not displayed inside the bubbles anymore**. It is only used for filtering and color styling.

Bubble colors are controlled in `style.css`:

```css
.skill-bubble-production /* purple */
.skill-bubble-tech       /* blue */
.skill-bubble-design     /* pink */
```

Bubble size is based on order within each category. The first skill in a category is largest, and later skills gradually get smaller. To make a skill bigger, move it higher inside its category list.

The cluster positions are controlled by this function:

```js
getSkillClusterPosition(skill, index, visibleSkills)
```

The preset percentage coordinates are inside `allPresetPositions` and `singleCategoryPositions`. You can adjust those numbers if you want a different cluster shape.

## Skills section latest polish

The Skills section header now only shows one title: `SKILLS`. The repeated eyebrow/subtitle and the descriptive paragraph were removed from `index.html`.

The bubbles are rendered from:

```js
const skillCloudItems = [
```

in `script.js`. The visible filters are still `All`, `Production`, `Tech`, and `Design`.

Bubble sizes are still based on each skill's order inside its category: earlier items are larger. The layout now runs through `layoutSkillBubbles()`, which places the largest bubbles close to the center and then places smaller bubbles outward while checking for overlap.

Bubble colors are based on primary category:

```txt
production = purple
tech = blue
design = pink
```

To adjust the no-overlap spacing, edit the `gap` value inside `layoutSkillBubbles()`. To adjust the whole cloud height, edit `.skill-bubble-cloud` in `style.css`.

## Skills bubble compact layout update

The Skills section bubble cloud was tightened so the whole box is smaller and bubbles sit closer together without overlapping.

Edit the sizing logic in:

```txt
script.js
```

Search for:

```js
function getSkillBubbleSize
function getSkillLabelFontSize
function layoutSkillBubbles
```

- `maxSize` / `minSize` control the largest and smallest bubbles.
- `gap` inside `layoutSkillBubbles()` controls how close bubbles can get without overlapping.
- `getSkillLabelFontSize()` shrinks long labels so names stay inside the bubble.

Edit the visual size of the whole section in:

```txt
style.css
```

Search for:

```css
.skill-bubble-cloud
```

- `min-height` controls the height of the bubble box.
- `.skills-shell` controls the overall section width.
- `.skill-bubble-label` controls wrapping and text overflow inside bubbles.


## Latest Skills bubble fixes

The Skills section now uses a responsive no-overlap bubble layout in `script.js`. Search for:

```js
function layoutSkillBubbles()
```

Important notes:

- Bubbles no longer have idle bobbing animation. They only move when the mouse moves through the cloud.
- Bubble sizes are still ranked by order inside each category: first skill is biggest, later skills are smaller.
- The layout now recalculates for desktop horizontal screens and mobile vertical screens without forcing all bubbles to the same size.
- Text wrapping only happens at spaces between words. Long single words shrink through `getSkillLabelFontSize()` instead of breaking mid-word.
- Section anchor spacing was tightened by reducing section `scroll-margin-top` in `style.css`, and the active nav offset was adjusted in `updateActiveMenuItem()`.

To make bubbles closer/farther apart, edit the `gap` value inside:

```js
function layoutSkillBubbles()
```

To make the whole cloud taller/shorter, edit:

```js
function getDesiredSkillCloudHeight()
```


## Latest anchor jump spacing update

The section anchor spacing has been tightened again so Portfolio/Resume/Skills/Contact land closer to the fixed navigation bar after clicking a top tab.

Current values:

```css
section[id], .skills-section, .contact {
    scroll-margin-top: 76px;
}
```

The active nav highlight offset in `script.js` now uses:

```js
const scrollPos = window.pageYOffset + 110;
```

If the section ever lands too close under the header, increase `76px` slightly. If there is still too much empty space, reduce it slightly.


## Latest skills sizing adjustment

The Skills bubble cloud was adjusted to make the bubbles slightly larger and the containing shell slightly wider.

Main edits:

```css
.skills-shell {
    width: min(1240px, calc(100vw - 32px));
}
```

Bubble size scaling is controlled in `script.js`:

```js
function getSkillSizeScale() { ... }
```

Increase those scale values a little to make all bubbles larger, or decrease them to make the whole cloud more compact. The no-overlap layout will recalculate after rendering and on resize.


## Latest clean section header update

The Projects, Resume, and Skills section headers are now simple centered titles instead of glass boxes.

Current visible section titles in `index.html`:

```html
<h2 class="section-title">PROJECTS</h2>
<h2 class="section-title resume-section-title">RESUME</h2>
<h2 class="section-title skills-section-title">SKILLS</h2>
```

The old descriptive text under Projects and Resume was removed. To add short descriptions back later, place a paragraph under the matching heading and style it in `style.css`.


## Skills icon folder

The Skills section now uses local uploaded icon artwork stored in:

```txt
images/icons/
```

The current icon files added are:

```txt
images/icons/blender-icon.png
images/icons/data-visualization-icon.png
images/icons/graphic-design-icon.png
images/icons/web-design-icon.png
images/icons/maya-icon.png
images/icons/3ds-max-icon.png
images/icons/illustrator-icon.png
images/icons/after-effects-icon.png
images/icons/premiere-pro-icon.png
images/icons/photoshop-icon.png
images/icons/powerpoint-icon.png
images/icons/python-icon.png
images/icons/javascript-icon.png
images/icons/wordpress-icon.png
images/icons/wix-icon.png
images/icons/html-icon.png
images/icons/unreal-engine-icon.png
images/icons/unity-icon.png
images/icons/css-icon.png
```

To assign an icon to a skill, open:

```txt
script.js
```

Search for:

```js
const skillCloudItems = [
```

Then add or edit `iconPath` on a skill:

```js
{ name: 'Blender', categories: ['design'], iconPath: 'images/icons/blender-icon.png' }
```

If a skill does not have `iconPath`, it will show the initials fallback until you add a matching icon later.

The old Simple Icons CDN setup was removed for the skills bubbles so the icon art is controlled locally from your project folder.


## Skills icon update

All uploaded skill icons are stored locally in:

```txt
images/icons/
```

Most skills now use `iconPath` inside `skillCloudItems` in:

```txt
script.js
```

Example:

```js
{ name: 'Jira', categories: ['production'], iconPath: 'images/icons/jira-icon.png' }
```

Current skills without uploaded icons still use initials as a fallback:

```txt
Task Prioritization
Audacity
```

For future icons, copy the icon file into `images/icons/`, then add or update the matching `iconPath` value in the skill object.


## Resume content and download button

The Resume section has been updated with the current education, experience, research, languages, and awards content.

The download button is in `index.html` inside the Resume section:

```html
<a class="resume-download-button" href="files/Dinara_Mukhtarova_Resume.pdf" download>
    Download Resume
</a>
```

The downloadable PDF lives here:

```txt
files/Dinara_Mukhtarova_Resume.pdf
```

The button styling is in `style.css`. Search for:

```css
Resume download button
```

## Resume bullet style update

All resume bullet lists now use the same star bullet style as the summary/contact list.

To edit the bullet style, open:

```txt
style.css
```

Search for:

```css
.resume-item ul li::before
```

The visible star comes from:

```css
content: '✦';
```


## To Boldly Escargot project notes

The To Boldly Escargot project has been added inside `portfolioProjects` in `script.js`.

Search for:

```js
title: 'To Boldly Escargot'
```

The project currently appears under the **Game** and **Art** sorter buttons:

```js
categories: ['game', 'art'],
categoryLabel: 'Game / Art',
```

The project uses these local asset paths:

```txt
images/portfolio/escargot-title.png
images/portfolio/escargot-gameplay-1.png
images/portfolio/escargot-gameplay-2.png
images/portfolio/escargot-game-over.png
images/portfolio/escargot-victory.png
images/portfolio/escargot-gameplay-3.png
images/portfolio/escargot-gameplay-4.png
media/escargot-trailer.mp4
```

The first gallery item is a local MP4 video:

```js
{
    type: 'video',
    src: 'media/escargot-trailer.mp4',
    poster: 'images/portfolio/escargot-title.png'
}
```

The project buttons are controlled by:

```js
externalLink: { label: 'Play on Itch.io', url: 'https://ruumien.itch.io/to-boldly-escargot' },
secondaryLink: { label: 'Read FIEA Article', url: 'https://fiea.ucf.edu/news/snail-math-and-squabble-win-third-annual-fiea-collegiate-game-jam/' }
```


Latest C# / icon refresh:
- To Boldly Escargot now includes C# in its madeWith chips.
- ETERNIA now lists Unity and C# in its madeWith chips.
- Skill icon files were refreshed for Wix, Unity, 3ds Max, Canva, Task Prioritization, and Scheduling.
- The skill formerly labeled 3D Max is now labeled 3ds Max.
