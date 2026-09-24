
## Issues

Issues worden ingericht via het Issue Template.
In de index van een issue plaats je een link naar de verschillende onderdelen/comments binnen het issue, zodat deze makkelijk te navigeren zijn.
Neem in ieder geval de volgende onderdelen op in je issue:

Beschrijving
User story
Ontwerp
Assignee
Label
Bronnen

Wanneer er meerdere versies van een component worden gemaakt, vermeld je het versienummer in de issue-naam.

## Branches

Voor ieder component wordt een aparte branch aangemaakt.
Gebruik één branch per component.
De branch naam is het issue nummer de naam van het component en eventueel versienummer.

## Commit messages

Commit messages worden opgebouwd volgens:
[type]: [change] [issue number]

Commit types
- docs: — Changes to documentation, e.g. README.md, Handover.md, Figma files or design rationale in the Wiki.
- feat: — Implementing a new feature.
- fix: — Fixing a bug, style or layout issue.
- perf: — A code change that improves performance.
- refactor: — A code change that neither fixes a bug nor adds a feature, but improves structure or readability.
- style: — Changes that affect readability but not the functionality of the code, such as source formatting, tabs or newlines.
- test: — Adding missing or correcting existing tests.
- Pull Requests

Een Pull Request (PR) wordt aangemaakt wanneer een volledig component klaar en getest is.

Er is minimaal één review nodig voordat de PR gemerged wordt.
De eigenaar van de branch is verantwoordelijk voor het mergen van de PR.
Merge pas wanneer de review is goedgekeurd en het component getest is.

## Code & documentatie

De volgende onderdelen schrijven we altijd in het Engels:

README
Issues
Code comments
Commit messages
Gebruik 4 spaties / 1 tab voor indentation.
Gebruik waar mogelijk semantische HTML. Vermijd het onnodig gebruiken van `<div>`'jes

alle mappen en files svelte met hoofdletter !

GEEN AI-GENERATED CODE PUSHEN.
