# Design by PIP

Industrial product design portfolio. Built with [Eleventy](https://www.11ty.dev/), deployed via GitHub Pages.

## Adding a New Project

1. Copy the template folder:
   ```
   cp -r src/projects/_template src/projects/my-project-name
   ```

2. Edit `src/projects/my-project-name/index.md`:
   - Set the `title`, `date`, `tags`, and `description`
   - List your images in the `images` array with `src`, `caption`, and `type` (process or final)
   - Set `hero` to the image shown on the homepage grid

3. Drop your images into `src/projects/my-project-name/images/`

4. Push to `main` — GitHub Actions builds and deploys automatically.

### Project Frontmatter Reference

```yaml
---
title: "Project Title"
date: 2024-03-15
tags: ["category", "another-tag"]
hero: images/hero.jpg
images:
  - src: images/process-01.jpg
    caption: "Sketch phase"
    type: process
  - src: images/final-01.jpg
    caption: "Finished piece"
    type: final
description: "One-line summary for the homepage card."
---
```

## Local Development

```bash
npm install
npm start
```

Opens at `http://localhost:8080`. Hot-reloads on file changes.

## Build

```bash
npm run build
```

Output goes to `_site/`.

## Structure

```
src/
├── projects/          ← Your content goes here
│   ├── _template/     ← Copy this for new projects
│   └── my-project/
│       ├── index.md
│       └── images/
├── css/style.css
├── js/main.js
├── _includes/         ← Templates (don't need to edit)
├── _data/site.json    ← Site name, links, socials
└── index.njk          ← Homepage
```
