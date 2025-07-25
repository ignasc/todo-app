# Todo list app

A basic todo list app. Build in progress.

## Personal thoughts

Initially I had classes of todo items and project lists include methods that generate an html element, which can be used in front-end UI. But quickly realised that it was not a great idea since classes for mostly related to backend. I separated UI methods from backend code and it had quite a few benefits:
* Cleaner, more organised code: I split larger methods into smaller ones that are responsible for a specific task.
* Object classes are not cluttered with large code.
* Much easier to implement new features.
* Object classes do not break UI display if missing.

## Webpack notes

Make sure to modify the command line of `"deploy"` script to refer to correct github branch used for production. Default set is `gh-pages`.

### npm scripts

Below are the scripts that have been added to `package.json` file

`"test"`: runs `eslint` check on all files in `src` folder

`"fix"`: runs `eslint` with `--fix` option.

`"prebuild"`: runs `eslint` check automatically before building production version app

`"build"`: builds production version app

`"start"`: starts a dev server with the developer version app

`"deploy"`: pushes `gh-pages` branch to github. Branch must have changes already commited to it.
