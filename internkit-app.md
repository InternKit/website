# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
InternKit is a full-stack internship matching platform using a monorepo structure with backend (Node.js/Express) and frontend (React) applications. The system manages internship applications, interviews, and real-time notifications between interns and businesses.

## Commands

### Backend Development
```bash
cd backend
yarn dev              # Start development server with hot reload
yarn build            # Compile TypeScript to dist/
yarn start            # Run compiled production build
yarn lint             # Run ESLint with auto-fix
yarn format           # Format with Prettier
yarn test             # Run Jest tests
yarn build_types      # Regenerate database.types.ts from Supabase schema
```

### Frontend Development
```bash
cd client
yarn dev              # Start Vite dev server (default: http://localhost:5173)
yarn build            # Build production bundle (TypeScript check + Vite build)
yarn lint             # Run ESLint
yarn format:check     # Check Prettier formatting
yarn cypress:run      # Run E2E tests headless
yarn cypress:open     # Open Cypress interactive test runner
yarn test:component   # Run component tests
yarn build_types      # Regenerate database.types.ts from Supabase schema
```

### Docker Development
```bash
docker-compose up     # Start all services (backend, client, database)
docker-compose down   # Stop all services
```

### Type Generation
When the Supabase database schema changes, regenerate types in **both** backend and client:
```bash
cd backend && yarn build_types
cd client && yarn build_types
```

---

## Architecture

### Monorepo Structure
```
internkit/
├── backend/          # Express.js API + Socket.IO WebSocket server
│   ├── src/
│   │   ├── index.ts          # Entry point: Express + Socket.IO on same port
│   │   ├── modules/
│   │   │   ├── http/         # REST API (controllers, routes, middleware)
│   │   │   └── websockets/   # Real-time handlers + emitters
│   │   ├── models/           # Data access layer (Supabase queries)
│   │   ├── services/         # Business logic (Google Calendar, OAuth, interviews)
│   │   ├── helpers/          # Utilities (notification content generation)
│   │   ├── validators/       # Input validation schemas
│   │   └── types/            # TypeScript types from Supabase
│
├── client/           # React + Vite frontend
│   ├── src/
│   │   ├── App.tsx           # Root component with routing
│   │   ├── auth/             # Authentication routes & forms
│   │   ├── business/         # Business user pages
│   │   ├── intern/           # Intern user pages
│   │   ├── common/
│   │   │   ├── components/   # Shared UI components
│   │   │   ├── context/      # React Context (auth, socket, notifications, theme)
│   │   │   └── store/        # Zustand stores (resume, notifications)
│   │   ├── services/         # API call wrappers
│   │   └── utils/            # Axios instance, Socket.IO client, Supabase
```

### Backend Architecture

**Entry Point** (`backend/src/index.ts`):
- Express app with Socket.IO server on same HTTP port
- Auth middleware validates JWT tokens from Supabase on all HTTP + WebSocket connections
- Mounts REST routes at `/`
- Registers WebSocket handlers for conversations, messages, notifications
- Stores `NotificationEmitter` in `app.locals` for controllers to broadcast real-time events
- In production: serves static React frontend from `../frontend`

**Route & Controller Pattern**:
- Routes defined in `modules/http/routes/*.ts`, mounted dynamically
- Controllers handle business logic, call models, return responses
- Auth middleware populates `req.user` and `req.auth` with validated session data
- Organized by domain: users, students, businesses, applications, internships, notifications

**Data Access** (Models):
- Direct Supabase PostgreSQL queries via `@supabase/supabase-js`
- Example: `Application.getApplicationsByInternshipId(id, limit, offset)`
- Models imported from `/models` (e.g., `Application`, `Notification`, `Intern`)

**Services Layer**:
- `booking.service.ts`: Interview slot scheduling
- `googleCalendar.service.ts`: Google Calendar API integration
- `interview.service.ts`: Interview business logic
- `oauth.service.ts`: OAuth flow management

**WebSocket Integration** (Socket.IO):
- Authentication: JWT token validated from `handshake.auth.token`, user data attached to `socket.data.user`
- Handler groups: conversations, messages, notifications
- `NotificationEmitter` broadcasts to specific users via `notifications:${userId}` events

**Database**: Supabase PostgreSQL with TypeScript type generation

**Testing**: Jest with ts-jest, `node-mocks-http` for mocking

### Frontend Architecture

**Routing & Code Splitting**:
- React Router v6 with lazy loading via `lazyLoad()`
- Three route sections:
  - `AuthRoutes`: Login, register (unauthenticated)
  - `UserRoutes`: Intern pages
  - `BusinessRoutes`: Business pages
- Role-based redirect after login based on `user_type`

**State Management**:

*React Context (global state)*:
1. **AuthContext**: User auth state, Supabase session, database user data
   - Provides: `userData`, `userLoggedIn`, `isEmailUser`, `isGoogleUser`, `refreshUserData()`
   - Caches user data in localStorage with `userData_${userId}` key
   - Listens to Supabase auth state changes

2. **SocketContext**: Socket.IO client connection lifecycle
   - Provides: `socket` instance, `isConnected`, `connectionError`
   - Initializes via `socketService.connect()` with JWT from Supabase

3. **NotificationsContext**: WebSocket listener + Zustand store
   - Real-time notification handling via `notifications:${userId}` Socket.IO event
   - Toast notifications on new events

4. **ThemeContext**: Dark mode toggling

*Zustand Stores (local domain state)*:
- `resumeStore.ts`: Resume URL/thumbnail with 5-min cache
- `notificationsStore.ts`: Notification list, unread count, API interactions

**API Integration**:
- **Axios instance** (`utils/axiosInstance.ts`): Auto-injects JWT from Supabase session into `Authorization` header
- **NotificationService**: Socket.IO wrapper for listening to notifications
- **API Client** (`utils/api.ts`): Centralized API calls

**Socket.IO Client**:
- **SocketService** (`utils/socketService.ts`): Singleton managing Socket.IO client
- Fetches JWT from Supabase, handles reconnection (5 attempts, 1s delay)

**UI Framework**:
- React 18 with Vite bundler (SWC transpiler)
- TailwindCSS for styling
- Lucide React for icons
- React Hot Toast for notifications
- Three.js for 3D graphics
- Monaco Editor for code editing

**Testing**: Cypress for E2E and component testing

### Backend ↔ Frontend Integration

**Authentication Flow**:
1. User logs in via Supabase (email/OAuth)
2. Frontend stores JWT in Supabase session storage
3. Axios interceptor auto-adds JWT to HTTP requests
4. Socket.IO connection passes JWT in auth config
5. Backend validates JWT on HTTP requests & Socket connections
6. Backend attaches user data to `req.user` (HTTP) or `socket.data.user` (WebSocket)

**Real-Time Notifications**:
1. Backend creates notification in database
2. Backend broadcasts via `app.locals.notificationEmitter.emit(userId, data)`
3. NotificationEmitter sends Socket.IO event: `notifications:${userId}`
4. Frontend NotificationService listens on socket event
5. Frontend updates Zustand store, displays toast, updates UI

**Data Fetching**:
- HTTP REST for data-heavy/CRUD operations (paginated lists, bulk updates)
- WebSocket for real-time events (notifications, messages, presence)
- LocalStorage caching in auth context to reduce API calls

---

## Key Patterns & Conventions

1. **Middleware Stack**: CORS → JSON body parser → Auth middleware → Request logging
2. **Error Handling**: Try-catch in controllers, HTTP status codes for errors
3. **Async/Await**: Used throughout backend and frontend
4. **TypeScript Strict Mode**: Type safety enforced across codebase
5. **Environment-Based Config**: Different Socket.IO URLs for dev vs prod
6. **Dynamic Route Loading**: Routes imported on-demand in `backend/src/modules/http/index.ts`
7. **Supabase as Backend**: No custom ORM; direct SQL queries via Supabase JS client
8. **Notification Helpers**: `generateNotificationContent()` & `generateNotificationUrl()` centralize notification message/link generation
9. **Read-Write-Reread**: When modifying files, read before and after to verify changes (from Cursor rules)
10. **Zero-Assumption Discipline**: Verify assumptions against live system; prefer empiricism over conjecture

---

## Development Principles (from .cursor/rules)

These principles guide autonomous development work:

### Reconnaissance Before Action
- **Never modify code without understanding current state, patterns, and system-wide implications**
- Read existing code to understand idiomatic patterns
- Analyze dependency topology
- Review configuration files
- The code is the ultimate source of truth

### System-Wide Ownership
- When modifying a component, **identify and update ALL consumers**
- Leave the system in a better, more consistent state
- Responsibility extends beyond immediate task

### Verification Protocol
- Execute quality gates (tests, linters) after changes
- Reread altered artifacts to verify changes were applied correctly
- Perform end-to-end verification of affected workflows
- If tests fail, autonomously diagnose and fix

### Communication
- Keep analysis, plans, and logs in conversation (not in files)
- Use clear status markers: ✅ success, ⚠️ self-corrected, 🚧 blockers
- No unsolicited documentation files

### Clarification Threshold
Consult user only when:
1. Authoritative sources present irreconcilable contradictions
2. Critical resources are genuinely inaccessible
3. Action entails non-rollbackable data loss or unacceptable risk
4. Material ambiguity persists after exhausting investigative avenues

Otherwise, proceed autonomously with verifiable evidence.

---

## Tech Stack

**Backend**:
- Node.js 22+, TypeScript 5.9
- Express 5.x
- Socket.IO 4.x
- Supabase JS client (PostgreSQL + Auth)
- Jest (testing)
- Google APIs (Calendar, Auth Library)

**Frontend**:
- React 18, TypeScript 5.9
- Vite 5.x
- TailwindCSS 3.x
- Zustand 5.x (state management)
- Socket.IO client 4.x
- Supabase JS client
- Cypress 15.x (E2E & component testing)
- Three.js, Monaco Editor

---

## Quick Reference for Common Tasks

**Add new API endpoint**:
1. Create controller in `backend/src/modules/http/controllers/`
2. Define route in `backend/src/modules/http/routes/*.ts`
3. Add route to `modules/http/index.ts`
4. Update all consumers if modifying shared functionality

**Add real-time event**:
1. Register Socket handler in `backend/src/modules/websockets/handlers/`
2. Frontend listens via `useSocket()` + callback
3. Test bidirectional communication

**Add new page**:
1. Create in `client/src/{auth|intern|business}/`
2. Add route to respective `Routes.tsx`
3. Use `useAuth()` + `useNotifications()` for state
4. Follow existing lazy loading pattern

**Update Supabase schema**:
1. Modify database
2. Run `yarn build_types` in **both** backend and client
3. Update affected models and components
4. Test data access layer changes

**Run tests**:
- Backend: `cd backend && yarn test`
- Frontend E2E: `cd client && yarn cypress:run`
- Frontend component: `cd client && yarn test:component`
