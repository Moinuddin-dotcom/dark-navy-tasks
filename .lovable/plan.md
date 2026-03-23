

## TODO App with Kanban Board

### Pages & Flow
1. **Login/Register Page** — Simulated auth with localStorage (no backend). Dark navy blue background with a centered card for login/register toggle. Users enter a name/email to "sign in."
2. **Kanban Dashboard** — Three-column board: **ToDo**, **OnGoing**, **Completed**. Header with user greeting and logout button.

### Task Features
- **Title + Description** — Required title, optional description
- **Due Date** — Date picker for deadlines
- **Priority** — High (red), Medium (yellow), Low (green)
- **Labels/Tags** — Color-coded tags users can assign (e.g., Work, Personal, Urgent)

### Interactions
- **Drag & Drop** — Drag tasks between the three columns using @hello-pangea/dnd
- **Add Task** — Dialog/modal to create a task with all fields
- **Edit/Delete** — Click a task card to edit or delete it
- **Persistence** — All tasks and auth state saved in localStorage

### Design
- **Dark navy blue** theme (#0a1929 / #1a2744 range) across the app
- Light text on dark backgrounds, accent color for buttons and highlights
- Task cards with subtle borders, priority indicator strips
- Responsive: columns stack vertically on mobile

