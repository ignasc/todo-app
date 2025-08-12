# Todo list app

A basic todo list app.

[Live Preview](https://ignasc.github.io/todo-app/)

## Features

* Create/modify/delete todo items.
* Create/modify/delete todo lists/groups.
* Group items into projects/lists.

## Learning experience

Things I learned more about:
* How to use localStorage to preserve data during browsing session.
* Using JS modules to organise and separate code into smaller pieces.
* Practice "SOLID" principles of coding.
* Managing project using npm packages and webpack.
* Managing code using git and github. New features used: unstage files, revert older commits, branching and merging.
* Using Eslint to keep good coding practices.

## Webpack notes

Make sure to modify the command line of `"deploy"` script to refer to correct github branch used for production. Default set is `gh-pages`.

### npm scripts

Below are the scripts that have been added to `package.json` file

`"test"`: runs `eslint` check on all files in `src` folder

`"fix"`: runs `eslint` with `--fix` option.

`"prebuild"`: runs `eslint` check automatically before building production version app

`"build"`: builds production version app

`"start"`: starts a dev server with the developer version app

`"deploy"`: this script does the following steps in order:
* checks out `gh-pages` branch,
* merges `main` branch into `gh-pages` branch,
* runs `build` script (see above of what it does),
* adds `dist` folder contents to be committed,
* commits `dist` folder contents,
* pushes the commit to remote repository,
* switches back to `main` branch.
