# Todo list app

A basic todo list app. Build in progress.

## Personal thoughts

As I am building the app, I am starting to realise that putting all buttons and their functions in projects or todo items class is not a great idea as that functionality is part of the UI. Now I am making that functionality embeded in the class item, which is stored in a database. Therefore I might refactor the code at later stage to make sure class only has methods that modify its own properties, rather than providing an html element to the UI.

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
