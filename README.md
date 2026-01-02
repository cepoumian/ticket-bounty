# TicketBounty

A modern full-stack ticket management system with a bounty/reward mechanism built with Next.js 15. Users can create tickets for tasks/issues, assign monetary bounties, track status through a kanban-style workflow, and collaborate via comments.

**Portfolio Project** - Demonstrates modern full-stack development with Next.js App Router, server actions, and production-ready patterns.

## 🎯 Core Concept

- **Create Tickets**: Users post tasks/issues with title, description, deadline, and bounty amount
- **Bounty System**: Each ticket has a monetary reward (stored as cents for precision)
- **Status Workflow**: Tickets move through OPEN → IN_PROGRESS → DONE
- **Collaboration**: Comment threads on tickets with infinite scroll
- **Discovery**: Search, filter, and sort through all tickets or just your own

## 🛠 Technical Stack

### Core

- **Framework**: Next.js 15.3.8 (App Router, React Server Components)
- **Language**: TypeScript 5+ (strict mode)
- **Runtime**: React 19.0.0
- **Database**: PostgreSQL via Prisma ORM 6.9.0
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York variant)

### Authentication & Security

- **Custom session-based auth** (no NextAuth/Lucia dependency)
- **Password Hashing**: Argon2 via @node-rs/argon2
- **Session Tokens**: 32-char base32 tokens (cookie-safe)
- **Token Hashing**: SHA256 via @oslojs/crypto for database storage
- **Session Duration**: 30 days with 15-day soft refresh

### State Management

- **Server State**: TanStack Query (React Query) v5
- **URL State**: nuqs v2 (type-safe search params)
- **Form State**: React 19 `useActionState` + Server Actions

### Key Libraries

- **Forms**: Server Actions, Zod validation
- **UI Components**: Radix UI primitives via shadcn/ui
- **Date Handling**: date-fns
- **Currency**: Big.js (prevents floating-point errors)
- **Notifications**: sonner (toasts)
- **Debouncing**: use-debounce
- **Infinite Scroll**: react-intersection-observer

## 📁 Project Architecture

### Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (authenticated)/          # Protected routes (requires auth)
│   │   ├── account/             # User settings
│   │   ├── tickets/             # User's tickets + detail/edit
│   │   └── layout.tsx           # Auth boundary
│   ├── _navigation/             # Header, sidebar, dropdowns
│   ├── _providers/              # React Query provider
│   ├── api/                     # API routes
│   ├── sign-in/                 # Authentication pages
│   ├── sign-up/
│   ├── page.tsx                 # Home (all tickets feed)
│   ├── layout.tsx               # Root layout
│   └── template.tsx             # Toast handler
├── features/                     # Domain-driven modules
│   ├── auth/                    # Custom authentication system
│   │   ├── actions/             # sign-in, sign-up, sign-out
│   │   ├── components/          # Login/register forms
│   │   ├── queries/             # getAuth, getAuthOrRedirect
│   │   ├── hooks/               # useAuth
│   │   └── utils/               # session cookies, ownership checks
│   ├── ticket/                  # Ticket domain
│   │   ├── actions/             # CRUD, status updates
│   │   ├── components/          # List, item, forms, pagination
│   │   ├── queries/             # Database queries
│   │   ├── search-params.ts     # URL state definitions
│   │   └── types.ts             # TypeScript types
│   ├── comment/                 # Comment domain
│   │   ├── actions/             # Create, delete
│   │   ├── components/          # List, item, form
│   │   ├── queries/             # Infinite scroll queries
│   │   └── types.ts
│   └── password/                # Password utilities
├── components/                   # Shared UI components
│   ├── form/                    # Form system (see patterns below)
│   ├── ui/                      # shadcn/ui components
│   └── [reusable components]
├── lib/                         # Core utilities
│   ├── prisma.ts                # Prisma client (singleton)
│   ├── lucia.ts                 # Session management
│   └── big.ts                   # Big.js config
├── utils/                       # Helper functions
│   ├── currency.ts              # toCent, fromCent, toCurrencyFromCent
│   ├── crypto.ts                # Token generation, hashing
│   └── get-active-path.ts       # Sidebar active state
├── types/                       # Global TypeScript types
└── paths.ts                     # Centralized route definitions
```

## 🗄 Database Schema

### Entity Relationship Diagram

```
User
├── id: cuid (PK)
├── username: unique
├── email: unique
├── passwordHash: argon2
├── sessions: Session[]
├── tickets: Ticket[]
└── comments: Comment[]

Session
├── id: sha256(token) (PK)
├── expiresAt: DateTime
└── userId: FK → User

Ticket
├── id: cuid (PK)
├── title: string
├── content: string (max 1024)
├── status: enum (OPEN | IN_PROGRESS | DONE)
├── deadline: string (YYYY-MM-DD)
├── bounty: int (cents)
├── userId: FK → User
├── comments: Comment[]
├── createdAt: DateTime
└── updatedAt: DateTime

Comment
├── id: cuid (PK)
├── content: string (max 1024)
├── ticketId: FK → Ticket (cascade delete)
├── userId: FK → User (nullable, set null on delete)
└── createdAt: DateTime
```

### Key Design Decisions

- **Currency as Cents**: Bounty stored as integer cents to prevent floating-point errors
- **Soft Delete Comments**: User deletion sets `userId` to null, preserving comment history
- **Cascade Deletes**: Deleting ticket removes all comments; deleting user removes their tickets
- **String Deadline**: Stored as YYYY-MM-DD for simplicity (no timezone issues)

## 🔐 Authentication System

### Custom Implementation (No NextAuth)

```typescript
// Token Flow
1. User registers/logs in
2. Generate 32-char base32 token → cookie
3. Hash token with SHA256 → store in DB
4. Validate: hash cookie token, lookup in DB
5. Soft refresh at 15d, hard expiry at 30d
```

### Key Files

- `src/lib/lucia.ts` - Session CRUD (create, validate, invalidate)
- `src/features/auth/utils/session-cookie.ts` - Cookie management
- `src/features/auth/queries/get-auth.ts` - Cached auth check (React cache)
- `src/features/auth/queries/get-auth-or-redirect.ts` - Protected route helper
- `src/features/auth/utils/is-owner.ts` - Authorization utility

### Protected Routes

Use layout-based protection:

```typescript
// src/app/(authenticated)/layout.tsx
export default async function AuthenticatedLayout({ children }) {
  await getAuthOrRedirect(); // Redirects to /sign-in if not authenticated
  return <>{children}</>;
}
```

## 🎨 Key Technical Patterns

### 1. Server Actions with Standardized Response

All mutations return `ActionState`:

```typescript
type ActionState<T = any> = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[]>;
  timestamp: number; // For change detection in useEffect
  data?: T; // Optional response payload
};

// Helper functions
fromErrorToActionState(error, formData); // Zod or generic errors
toActionState(status, message, formData, data); // Success responses
```

### 2. Custom Form Component

Wraps server actions with automatic feedback:

```typescript
<Form
  action={serverAction}
  actionState={actionState}
  onSuccess={({ actionState }) => {
    // Custom success logic
  }}
  onError={({ actionState }) => {
    // Custom error logic
  }}
>
  <Input name="title" />
  <FieldError actionState={actionState} name="title" />
  <SubmitButton label="Submit" />
</Form>
```

Features:

- Automatic toast notifications
- Field-level error display
- Loading states via `useFormStatus`
- Timestamp-based change detection

### 3. URL State Management (nuqs)

Type-safe search params with automatic parsing:

```typescript
// src/features/ticket/search-params.ts
export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(""),
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(5),
});

// In component
const [search, setSearch] = useQueryState("search", searchParser);
const [pagination, setPagination] = useQueryStates(paginationParser);
```

Benefits:

- Shareable URLs
- Browser back/forward works
- Resets pagination on search change

### 4. Currency Handling (Big.js)

Prevents floating-point errors:

```typescript
// Store: Convert dollars to cents (integers)
const bounty = toCent(4.99); // 499

// Display: Convert cents to formatted currency
toCurrencyFromCent(499); // "$4.99"

// Operations: Use Big.js internally
toCent(amount); // MyBig(amount).mul(100).round(2)
fromCent(amount); // MyBig(amount).div(100).round(2)
```

### 5. Ownership Authorization

Reusable check before mutations:

```typescript
// src/features/auth/utils/is-owner.ts
export const isOwner = (
  authUser: User | null | undefined,
  entity: { userId: string | null } | null | undefined,
) => {
  if (!authUser || !entity || !entity.userId) return false;
  return entity.userId === authUser.id;
};

// Usage in actions
const ticket = await prisma.ticket.findUnique({ where: { id } });
if (!ticket || !isOwner(user, ticket)) {
  return toActionState("ERROR", "Not authorized");
}
```

### 6. Post-Redirect Toasts

Cookie-based message passing for redirects:

```typescript
// In server action
await setCookieByKey("toast", "Ticket deleted");
redirect(ticketsPath());

// RedirectToast component (in template.tsx)
// Consumes cookie on mount, shows toast, deletes cookie
```

### 7. Confirm Dialog Hook

Reusable confirmation pattern:

```typescript
const [deleteButton, deleteDialog] = useConfirmDialog({
  action: deleteTicket.bind(null, ticketId),
  trigger: <Button variant="destructive">Delete</Button>,
  title: "Are you sure?",
  description: "This action cannot be undone.",
  onSuccess: () => router.refresh(),
});

return (
  <>
    {deleteButton}
    {deleteDialog}
  </>
);
```

### 8. Infinite Scroll (Comments)

Cursor-based pagination with React Query:

```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ["comments", ticketId],
  queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
  getNextPageParam: (lastPage) => lastPage.metadata.cursor,
  initialData: { pages: [serverData], pageParams: [undefined] },
});

// Trigger on scroll
const { ref, inView } = useInView();
useEffect(() => {
  if (inView && hasNextPage) fetchNextPage();
}, [inView, hasNextPage]);
```

Cursor structure:

```typescript
cursor: { id: string, createdAt: number } // Unique ordering
```

## 🗺 Route Map

### Public Routes

| Route              | Description              |
| ------------------ | ------------------------ |
| `/sign-up`         | User registration        |
| `/sign-in`         | Login page               |
| `/password-forgot` | Password recovery (stub) |

### Protected Routes (requires authentication)

| Route                | Description         | Features                 |
| -------------------- | ------------------- | ------------------------ |
| `/`                  | All tickets feed    | Search, sort, paginate   |
| `/tickets`           | User's tickets only | CRUD operations          |
| `/tickets/[id]`      | Ticket detail       | Comments, status updates |
| `/tickets/[id]/edit` | Edit ticket         | Owner only               |
| `/account/profile`   | Profile settings    | Stub (incomplete)        |
| `/account/password`  | Change password     | Stub (incomplete)        |

### API Routes

| Endpoint            | Method | Description             |
| ------------------- | ------ | ----------------------- |
| `/api/tickets`      | GET    | List tickets (filtered) |
| `/api/tickets/[id]` | GET    | Single ticket           |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm/yarn/pnpm

### Environment Variables

Create `.env`:

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/ticketbounty"
DIRECT_URL="postgresql://user:pass@localhost:5432/ticketbounty" # For migrations
NODE_ENV="development"
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (creates test users & tickets)
npm run prisma-seed
```

**Seed Users:**

- Admin: `admin@admin.com` / `password`
- User: `cpoumian@gmail.com` / `password`

### Development

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run lint-fix     # Fix linting issues
npm run type         # TypeScript check
```

## 📝 Development Notes

### Adding New Features

1. **New Feature Module**

   ```
   src/features/my-feature/
   ├── actions/       # Server actions
   ├── components/    # UI components
   ├── queries/       # Database queries
   ├── types.ts       # TypeScript types
   └── utils/         # Feature-specific utilities
   ```

2. **New Route**

   - Add to `src/app/` or `src/app/(authenticated)/`
   - Add path helper to `src/paths.ts`
   - Update navigation in `src/app/_navigation/sidebar/constants.tsx`

3. **New Server Action**

   - Always return `ActionState`
   - Validate with Zod
   - Use `fromErrorToActionState` for error handling
   - Call `revalidatePath()` or `redirect()` after mutations

4. **New Database Model**
   - Update `prisma/schema.prisma`
   - Run `npx prisma migrate dev --name your_migration_name`
   - Update seed script if needed

### Code Style

- **Imports**: Auto-sorted with `eslint-plugin-simple-import-sort`
  - External packages → Internal packages → Relative imports
- **Formatting**: Prettier with Tailwind plugin
- **Components**: React Server Components by default (use `"use client"` only when needed)
- **File naming**: kebab-case for files, PascalCase for components

### Performance Patterns

- **Server Components**: Fetch data directly in RSC
- **Streaming**: Use `<Suspense>` with loading states
- **Caching**: React Query for client-side, React `cache()` for server
- **Pagination**: Offset-based for tickets, cursor-based for comments
- **Debouncing**: 250ms for search inputs

## 🎯 Feature Status

### ✅ Complete

- [x] User authentication (sign up, sign in, sign out)
- [x] Session management (30-day expiry)
- [x] Ticket CRUD operations
- [x] Ticket status management
- [x] Bounty system with currency handling
- [x] Comment system with infinite scroll
- [x] Search and filtering
- [x] Multi-criteria sorting
- [x] Pagination (offset and cursor-based)
- [x] Dark/light theme
- [x] Responsive design
- [x] Toast notifications

### 🚧 Incomplete (Stubs)

- [ ] Password reset flow
- [ ] Account profile editing
- [ ] Comment editing (only create/delete implemented)
- [ ] Real-time updates (no WebSockets)
- [ ] Email notifications
- [ ] Admin dashboard

## 🔧 Troubleshooting

### Common Issues

**Database Connection Errors**

```bash
# Reset database
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

**TypeScript Errors After Prisma Changes**

```bash
rm -rf .next
npm run type
```

**Session Issues**

- Check cookie settings in DevTools
- Verify `NODE_ENV` matches secure cookie requirements
- Clear cookies and re-login

## 📚 Key Dependencies Reference

| Package               | Purpose          | Version |
| --------------------- | ---------------- | ------- |
| next                  | Framework        | 15.3.8  |
| react                 | UI library       | 19.0.0  |
| @prisma/client        | ORM              | 6.9.0   |
| @tanstack/react-query | Server state     | 5.90.2  |
| nuqs                  | URL state        | 2.5.2   |
| zod                   | Validation       | 3.25.67 |
| @node-rs/argon2       | Password hashing | 2.0.2   |
| big.js                | Precise math     | 7.0.1   |
| date-fns              | Date utilities   | 4.1.0   |
| sonner                | Toasts           | 2.0.5   |

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome! Key areas for improvement:

- Complete password reset flow
- Add comment editing
- Implement real-time updates
- Add email notifications
- Create admin dashboard

## 📄 License

This project is part of a portfolio and is available for reference and learning purposes.

---

**Project Status**: Portfolio Project (Production-Ready Patterns)  
**Last Updated**: January 2026
