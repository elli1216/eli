Core Principles

1. Logic and UI Separation
   Keep all state management and calculations out of the UI components. Place UI elements in their own files. Pass data to UI components through props or designated hooks.

2. File Organization
   Create a dedicated directory for components and a separate one for logic. Limit each file to one primary export. Use descriptive names like AuthLogic.js and AuthView.js.

3. Single Responsibility Principle
   Every function must have exactly one responsibility. A function should do one thing, do it well, and do it only. If a function contains the word and in its description, it is likely doing too much. Break complex functions into smaller, atomic units to improve readability and testing.

4. Modularity
   Write functions that perform only one task. Export reusable utility functions into a global utils folder. Avoid large files by splitting logic into smaller sub-modules.
