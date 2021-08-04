# Thoughts

## Documentation

Where would someone learn about the goals of the project, overall design, and technology used?

Most repositories have a README.md that explains the basics, and a `documentation` folder with additional project details.

## Tools

Generally most JavaScript projects use a linter to identify common isses. [ESLint](https://eslint.org/) is often used for JavaScript projects.

https://github.com/wandyezj/package has an example of how to set up ESLint.

## Structure

Typically it's convenient to have the project in the top level folder instead of a subdirectory. This makes it easy to open up Visual Studio Code in the project directory.

It's convneient to have all tool configurations under a single `config` directory, this declutters the main directory and makes it easy to find config files. See: https://github.com/wandyezj/package

## Code Style

It can be convenient to use enums in place of hard coded string values. This allows the type system to give you hints and allows linters to provide better warnings.

Use Strong Types were possible (avoid any and unknown) this allows Visual Studio Code to provide helpful IntelliSense and helps avoid errors.

Each file should contain a single concept when possible (single interface, single class, single enum, etc..). Name the file the same as the containing entity, this makes it easy to locate the contained entity.

Avoid exporing default. Instead use `export` next to the entity exported.

Use full words in variable names, avoid leaving out random characters. This makes it easy to understand for other people.

Avoid converting numbers to strings to do math operations for example use `Math.floor` to round to the nearest integer.

Annotate functions with their return values. This ensures strong interfaces.

Example

```typescript

// no return type on bad!!!
function bad() {
    return 5;
}

function good(): number {
    return 5;
}

```

When using Regex, place the expression in a separate variable and comment that regex to explain what it is doing. Regex are notoriously difficult for people to understand and are fragile, since it is easy to break then when making changes later.

Place data in a data appropriate files like `json` and then import those files. This makes it easy to tell which files are data and which are code.

In `simulationReducer` how come `return` instead of break and return? This would allow setting the entire state to local storage as one blob instead of as individual items.

In `MajorsGraph` usually better to declare interfaces such as `MajorsJSON` outside of functions they are used in.

Its usually better to iterate though arrays with `forEach` over indexing unless the index is needed for another purpose, this avoids off by one errors.

If using the same constant in multiple places it is convenient to pull it into a constant.

