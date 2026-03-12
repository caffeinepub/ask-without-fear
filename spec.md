# Ask Without Fear

## Current State
- Knowledge base has subjects: Math, Science, English, History
- 'Type Your Doubt' section lets students type and get keyword-matched explanations
- Backend stores anonymous doubts with category/message
- Teacher support section shows tips for teachers (no directory or contact form)
- Anonymous doubt submission form backed by Motoko

## Requested Changes (Diff)

### Add
- Computer Science entries in the knowledge base (variables, loops, algorithms, internet, binary, debugging, functions, HTML, databases, AI)
- Search bar at the top of the 'Type Your Doubt / Explain' section for keyword-based search across all subjects
- Teacher directory section listing teachers with name, subject, and contact option
- 'Send Doubt to Teacher' form: student name, doubt message, teacher selection -- stored in backend
- Backend: `sendTeacherMessage(teacherName, studentName, message)` and `getTeacherMessages()` functions
- CS added to SUBJECTS dropdown for doubt submission

### Modify
- Existing knowledge base array to include ~10 CS entries
- Explain section to use the shared search bar logic
- Nav to include link to new Teacher Directory section

### Remove
- Nothing removed

## Implementation Plan
1. Add backend function `sendTeacherMessage` and `getTeacherMessages` to main.mo
2. Add ~10 CS knowledge base entries to KNOWLEDGE_BASE array
3. Add search bar to the Explain/Type Your Doubt section
4. Add TEACHERS constant with name, subject, bio
5. Add TeacherDirectory section with cards and 'Ask This Teacher' form
6. Wire form to backend sendTeacherMessage
7. Add nav link for teacher directory
