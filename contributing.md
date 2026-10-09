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

## Team canvas 

<img width="1450" height="1019" alt="Group 3" src="https://github.com/user-attachments/assets/fbdbfa27-9e95-424e-813e-9d51a4bc802e" />

## Definitions of Ready

A Definition of Ready (DoR) is a set of criteria that a user story must meet before the team can start working on it in a sprint. It ensures that the story is clear, feasible, and valuable, so the team doesn’t waste time figuring things out mid-sprint.

Definitions of Ready - checklist

User story written clearly with format "As a.... I want to.... So that...." and approved by Product Owner.
Know the scope. Know what you will be working on in this user-story so you'l lalso know what NOT to work on.
Acceptance criteria defined (what “done” looks like).
Sources or research material available.
Give a weight/value to the user story. Use poker planning with the Modified Fibonacchi set of values.
Story estimated and added to sprint backlog.
Definitions of Done

A Definition of Done (DoD) is a shared checklist of criteria that a product increment must meet before it is considered complete, releasable, and ready for customers.

## Definitions of Done - checklist

When you create a pull request, perform the following tests and checks to ensure your code meets the FDND code conventions and works in all situations. Fix any merge conflicts before requesting a review, and make sure your own code won’t break the dev branch.

Testing

HTML validator
Browser testing (Browserstack)
Lighthouse Performance test
Device testing
User testing
Responsiveness checks
Lighthouse Accessibility test
Manual Accessibility testing (a11y checklist)
Code

FDND conventions are followed, Check for coventions relevent to your code
Remove commented-out code
We should be able to read and understand your code without detailed explanations, those belong in the /docs
Prevent repeated code (DRY principle)
These checks are meant for all situations, it is posible to skip 1 or more of the checks.
please provide valid reasons oth the reviewers might asks you to perform them or ask why the test is missing

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
