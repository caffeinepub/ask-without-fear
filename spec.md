# AskFreely

## Current State
The app has: Home, Ask a Doubt (anonymous submission form), Doubt Library (answered questions), Teacher Dashboard, and About sections. The Ask a Doubt section has a textarea + subject selector + "Ask Anonymously" button. There is no instant search/knowledge engine feature.

## Requested Changes (Diff)

### Add
- A new "Search Topics" search bar (separate from the anonymous ask form) that allows students to instantly search a topic and get a detailed explanation card.
- Detailed explanation cards with these structured sections:
  1. Clear Definition
  2. Step-by-step Explanation
  3. Key Points (bullet list)
  4. Examples
  5. Additional Learning Resources (links or references)
- A comprehensive knowledge base (frontend data) covering: Math (addition, subtraction, multiplication, division, BODMAS, algebra, ratios, square roots, fractions, geometry), Science (photosynthesis, Newton's laws, periodic table, cells, ecosystems), Computer Science (variables, loops, functions, arrays, OOP, recursion, sorting, binary, HTML, CSS, JavaScript, Python basics, C basics, Java basics, DBMS, OS, data structures, networks), English (grammar, parts of speech, essay writing, tenses), History (world wars, ancient civilizations).
- The search bar should be prominently placed in the Ask a Doubt section (above the anonymous form), or as a new dedicated section between Home and Ask a Doubt.
- Show a "no results" state when the search term doesn't match any topic.
- The search is frontend-only (no backend changes needed).

### Modify
- Ask a Doubt section: add the topic search bar above the anonymous question form with a clear visual separator.

### Remove
- Nothing removed.

## Implementation Plan
1. Create a large KNOWLEDGE_BASE constant in App.tsx with 30+ topics, each having: title, definition, steps (array), keyPoints (array), examples (array), resources (array of {label, url}).
2. Add a TopicSearchSection component rendered between HeroSection and AskSection (or within AskSection as a top block).
3. The component has a search input, filters KNOWLEDGE_BASE by keyword match on title/definition/keyPoints, and shows detailed result cards.
4. Each result card shows all 5 structured sections with clear headings and visual hierarchy.
5. Add deterministic data-ocid markers to all interactive elements.
