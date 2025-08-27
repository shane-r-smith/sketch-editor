# Sketch editor

A lightweight, experimental sketch editor library. A playground for trying out creative coding, drawing tools, and editing ideas.

## Getting Started

If you want to try it locally:

```bash
git clone https://github.com/shane-r-smith/sketch-editor.git
cd sketch-editor
npm install
```

### Install & Run

This project is powered by [Vite](https://vite.dev) and is split into two parts:

- `/lib` the core sketch editor library
- `/src` a demo playground showcasing how to use the library

### Development Mode

Run a local demo environment with:

```bash
npm run dev
```

### Build the Library

Generate a production-ready, g-zipped library build (from `/lib`):

```bash
npm run build
```

### Usage

**Once published** on npm, developers can install and import the library into their projects:

TODO: Document this usage guide + further supporting documentation.

## Roadmap (aka “maybe someday”)

- [x] Freehand drawing with mouse/touch
- [ ] Write usage + support documentation
- [ ] Setup npm repository
- [ ] Setup CI/CD
- [ ] Layers support
- [ ] Pages support; to facilitate "flipbook" sketches as a GIF
- [ ] Customizable colors and brush sizes
- [ ] More brush types (spray, texture, calligraphy)
- [ ] Shapes (lines, rectangles, circles, etc.)
- [ ] Undo / Redo support
- [ ] Export sketches as an image
- [ ] Event API to facilitate persistence with any external api and database.
  - [ ] Update the EventsApi to support both all objects and partial objects when subscribing, to facilitate different save type operations. E.G. [POST], [PATCH] apis.
- [ ] Simple yet customisable sketch api to enable and configure setups
- [ ] Support custom and extensible theme overriding.
- [ ] Decouple MUI from the project to allow developers to fully remove or replace it with their preferred UI library. The current implementation is tightly coupled to MUI.

## Contributing

This is a personal project, but if you find it fun and want to hack around, feel free to fork and open a PR. I’ll be happy to check it out!

## License

MIT License – free to use, modify, and learn from.

## Disclaimer

This is a for-fun side project, so expect rough edges, odd bugs, and maybe a dinosaur doodle or two.
