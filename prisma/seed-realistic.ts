import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    username: "sarahchen",
    email: "sarah.chen@techstudio.io",
  },
  {
    username: "marcusj",
    email: "marcus.johnson@designlab.co",
  },
  {
    username: "aishapatel",
    email: "aisha.patel@cloudventures.com",
  },
  {
    username: "davidkim",
    email: "david.kim@startupforge.dev",
  },
  {
    username: "elenarodriguez",
    email: "elena.rodriguez@contentcraft.io",
  },
];

const tickets = [
  // Sarah Chen's tickets
  {
    userId: 0,
    title: "Implement responsive navigation menu with mobile breakpoint",
    content:
      "Need a hamburger menu that collapses on screens < 768px. Should include smooth animations and touch-friendly tap targets. Menu should overlay content with a backdrop blur effect. Accessibility: keyboard navigation and ARIA labels required.",
    status: "OPEN" as const,
    deadline: "2026-01-15",
    bounty: 12500,
  },
  {
    userId: 0,
    title: "Fix form validation showing errors before user interaction",
    content:
      "The contact form shows validation errors immediately on page load instead of waiting for user input. Need to implement 'touched' state tracking so errors only appear after the user has interacted with a field. Currently using React Hook Form.",
    status: "IN_PROGRESS" as const,
    deadline: "2026-01-10",
    bounty: 8500,
  },
  {
    userId: 0,
    title: "Create reusable card component with multiple variants",
    content:
      "Build a flexible Card component with variants: default, bordered, elevated, and outline. Should support header, content, and footer slots. TypeScript props required. Include Storybook documentation with all variants and usage examples.",
    status: "DONE" as const,
    deadline: "2026-01-05",
    bounty: 15000,
  },
  {
    userId: 0,
    title: "Fix memory leak in useEffect hook causing performance degradation",
    content:
      "Users report the app getting slower after 10+ minutes of use. Found infinite re-renders in the NotificationBell component due to missing dependency array. Need to refactor the useEffect and add proper cleanup. React DevTools Profiler shows component rendering 1000+ times.",
    status: "IN_PROGRESS" as const,
    deadline: "2026-01-11",
    bounty: 9500,
  },
  {
    userId: 0,
    title: "Implement keyboard shortcuts for common actions",
    content:
      "Add keyboard shortcuts: Cmd/Ctrl+K for search, Cmd/Ctrl+N for new item, Esc to close modals, arrow keys for navigation. Display shortcut hints on hover. Create ShortcutsHelp modal (trigger with ?). Must work on Mac and Windows.",
    status: "OPEN" as const,
    deadline: "2026-01-24",
    bounty: 13000,
  },

  // Aisha Patel's tickets
  {
    userId: 2,
    title: "Optimize database query causing N+1 problem in user dashboard",
    content:
      "The dashboard loads user data with related posts and comments, but it's making 100+ queries for 50 users. Need to implement proper eager loading or use a DataLoader pattern. Currently using Prisma ORM. Target: reduce queries to under 5.",
    status: "OPEN" as const,
    deadline: "2026-01-20",
    bounty: 20000,
  },
  {
    userId: 2,
    title: "Add rate limiting to authentication endpoints",
    content:
      "Implement rate limiting (10 requests per 15 minutes) on /api/auth/login and /api/auth/register to prevent brute force attacks. Use Redis or in-memory store. Return 429 status with Retry-After header. Log attempts for monitoring.",
    status: "OPEN" as const,
    deadline: "2026-01-18",
    bounty: 17500,
  },
  {
    userId: 2,
    title: "Create webhook endpoint for Stripe payment confirmations",
    content:
      "Need to handle Stripe webhook events (payment_intent.succeeded, payment_intent.failed). Verify webhook signature, process payment, update order status in database, and send confirmation email. Must be idempotent and handle retries gracefully.",
    status: "IN_PROGRESS" as const,
    deadline: "2026-01-25",
    bounty: 25000,
  },
  {
    userId: 2,
    title: "Implement cursor-based pagination for large datasets",
    content:
      "Replace offset pagination with cursor-based pagination for the products API endpoint. Currently timing out with 50k+ records. Return cursor in response metadata, accept cursor in query params. Update API documentation.",
    status: "DONE" as const,
    deadline: "2026-01-08",
    bounty: 14000,
  },
  {
    userId: 2,
    title: "Resolve CORS errors on API routes for subdomain requests",
    content:
      "API requests from app.example.com to api.example.com are being blocked by CORS policy. Need to configure CORS headers properly in Next.js middleware. Should allow credentials and specific origins only (no wildcards in production).",
    status: "OPEN" as const,
    deadline: "2026-01-14",
    bounty: 7500,
  },
  {
    userId: 2,
    title: "Add email verification for new user registrations",
    content:
      "Send verification email on signup with unique token (expires in 24h). User can't access full features until verified. Implement resend verification email option. Use SendGrid or AWS SES. Include email templates (HTML + plain text).",
    status: "OPEN" as const,
    deadline: "2026-02-03",
    bounty: 21000,
  },

  // Marcus Johnson's tickets
  {
    userId: 1,
    title: "Design dark mode color palette with accessibility compliance",
    content:
      "Create a dark mode theme that meets WCAG AA standards (4.5:1 contrast ratio for text). Include colors for: primary, secondary, background, surface, error, warning, success. Provide Figma file with color tokens and usage guidelines.",
    status: "OPEN" as const,
    deadline: "2026-01-22",
    bounty: 18000,
  },
  {
    userId: 1,
    title: "Create loading skeleton screens for 5 main pages",
    content:
      "Design and implement skeleton loaders for: Dashboard, Profile, Product List, Product Detail, and Checkout pages. Should match final layout dimensions. Use subtle pulse animation. Provide React components ready to integrate.",
    status: "IN_PROGRESS" as const,
    deadline: "2026-01-16",
    bounty: 11000,
  },
  {
    userId: 1,
    title: "Design onboarding flow with 4-step wizard",
    content:
      "Create high-fidelity mockups for a 4-step user onboarding wizard: (1) Welcome, (2) Profile setup, (3) Preferences, (4) Integration. Include progress indicator, skip option, and completion celebration. Mobile and desktop views required.",
    status: "OPEN" as const,
    deadline: "2026-02-01",
    bounty: 22000,
  },
  {
    userId: 1,
    title: "Add image upload with preview and crop functionality",
    content:
      "Implement image upload for user avatars with client-side preview and crop tool. Max 5MB, accept JPG/PNG only. Compress images before upload. Use react-image-crop or similar. Store in Cloudinary or S3. Show upload progress.",
    status: "OPEN" as const,
    deadline: "2026-01-26",
    bounty: 18500,
  },

  // David Kim's tickets
  {
    userId: 3,
    title: "Build CSV export functionality for admin reports",
    content:
      "Add 'Export to CSV' button on admin dashboard. Should export filtered/sorted data (up to 10k rows) with proper headers. Generate file server-side, return as download. Include progress indicator for large exports. Support date range filters.",
    status: "OPEN" as const,
    deadline: "2026-01-19",
    bounty: 16000,
  },
  {
    userId: 3,
    title: "Implement real-time notifications using WebSockets",
    content:
      "Set up WebSocket connection for real-time notifications (new messages, mentions, status updates). Use Socket.io or native WebSockets. Handle reconnection logic, display toast notifications, update notification bell counter. Must work with Next.js App Router.",
    status: "OPEN" as const,
    deadline: "2026-02-05",
    bounty: 30000,
  },
  {
    userId: 3,
    title: "Add infinite scroll to blog post list with SEO consideration",
    content:
      "Replace pagination with infinite scroll, but keep it SEO-friendly. First page should render server-side with full HTML. Subsequent pages load via API. Implement intersection observer for loading trigger. Maintain URL state for direct linking.",
    status: "IN_PROGRESS" as const,
    deadline: "2026-01-17",
    bounty: 19000,
  },
  {
    userId: 3,
    title: "Create admin dashboard with analytics charts",
    content:
      "Build admin dashboard showing: user growth (line chart), revenue by category (pie chart), top products (bar chart), and recent activity (table). Use Recharts or Chart.js. Data should refresh every 30 seconds. Include date range picker.",
    status: "DONE" as const,
    deadline: "2026-01-12",
    bounty: 27500,
  },
  {
    userId: 3,
    title: "Fix TypeScript type errors after upgrading to Next.js 15",
    content:
      "After upgrading from Next.js 14 to 15, getting 23 TypeScript errors related to route params and searchParams being promises. Need to update all page components to await these props. Affects 15 route files.",
    status: "DONE" as const,
    deadline: "2026-01-09",
    bounty: 10000,
  },
  {
    userId: 3,
    title: "Create automated backup system for production database",
    content:
      "Set up daily automated backups of PostgreSQL database to S3. Keep last 30 days of backups, then weekly for 3 months, then monthly for 1 year. Implement backup verification. Create restore documentation and test restore process.",
    status: "IN_PROGRESS" as const,
    deadline: "2026-01-29",
    bounty: 24000,
  },

  // Elena Rodriguez's tickets
  {
    userId: 4,
    title: "Write API documentation for all public endpoints",
    content:
      "Document all 15 public API endpoints using OpenAPI 3.0 spec. Include: request/response examples, authentication requirements, rate limits, error codes, and status codes. Generate interactive docs with Swagger UI or Redoc.",
    status: "OPEN" as const,
    deadline: "2026-01-28",
    bounty: 20000,
  },
  {
    userId: 4,
    title: "Create getting started guide for new developers",
    content:
      "Write comprehensive onboarding guide covering: environment setup, running locally, database migrations, testing strategy, code style guide, and PR process. Include troubleshooting section. Format as markdown with screenshots.",
    status: "IN_PROGRESS" as const,
    deadline: "2026-01-21",
    bounty: 15000,
  },
  {
    userId: 4,
    title: "Document deployment process and CI/CD pipeline",
    content:
      "Write step-by-step deployment guide including: Vercel setup, environment variables, database migrations in production, rollback procedures, and monitoring setup. Include GitHub Actions workflow explanation.",
    status: "OPEN" as const,
    deadline: "2026-01-30",
    bounty: 12000,
  },
  {
    userId: 4,
    title: "Write content for marketing landing page",
    content:
      "Write copy for homepage including: hero section (headline + subheadline), features section (4 key features), benefits section, testimonials placeholder, and CTA. Should be SEO-optimized with target keywords. Include meta description and title suggestions.",
    status: "OPEN" as const,
    deadline: "2026-01-27",
    bounty: 16500,
  },
];

const comments = [
  {
    ticketIndex: 0,
    userIndex: 1,
    content:
      "Do you have a preferred animation library, or should I use CSS transitions?",
  },
  {
    ticketIndex: 1,
    userIndex: 0,
    content:
      "I've found the issue - it's in the form config. Should have a fix ready tomorrow.",
  },
  {
    ticketIndex: 5,
    userIndex: 3,
    content:
      "Have you considered using Prisma's include with nested relations?",
  },
  {
    ticketIndex: 5,
    userIndex: 3,
    content:
      "I've dealt with this before. You'll probably want to use `include` with `select` to be more specific about what you're fetching.",
  },
  {
    ticketIndex: 7,
    userIndex: 2,
    content:
      "Signature verification is complete. Working on the event handlers now.",
  },
  {
    ticketIndex: 12,
    userIndex: 0,
    content:
      "Should these use the same animation timing as our existing spinners?",
  },
  {
    ticketIndex: 12,
    userIndex: 1,
    content: "Yes, keep it at 1.5s pulse for consistency.",
  },
  {
    ticketIndex: 16,
    userIndex: 3,
    content:
      "Looking into Pusher vs self-hosted Socket.io. Open to suggestions.",
  },
  {
    ticketIndex: 16,
    userIndex: 2,
    content:
      "Self-hosted might be better for scalability. We can use Redis for pub/sub.",
  },
  {
    ticketIndex: 16,
    userIndex: 0,
    content:
      "Make sure to handle tab visibility API so we don't keep polling when user switches tabs.",
  },
  {
    ticketIndex: 3,
    userIndex: 0,
    content: "Root cause identified. Will implement proper memoization.",
  },
  {
    ticketIndex: 20,
    userIndex: 3,
    content:
      "Can we auto-generate this from TypeScript types? Would save a lot of manual work.",
  },
  {
    ticketIndex: 20,
    userIndex: 4,
    content: "Great idea! Let me look into ts-to-openapi or similar tools.",
  },
  {
    ticketIndex: 21,
    userIndex: 4,
    content:
      "First draft is ready. Need someone to review the technical accuracy.",
  },
  {
    ticketIndex: 13,
    userIndex: 1,
    content:
      "For the crop tool, make sure it maintains aspect ratio. Profile pics should be square.",
  },
  {
    ticketIndex: 4,
    userIndex: 3,
    content: "Should we use a library like react-hotkeys or build custom?",
  },
  {
    ticketIndex: 11,
    userIndex: 3,
    content:
      "Should we allow social login users to skip this, or verify their email from the OAuth provider?",
  },
  {
    ticketIndex: 11,
    userIndex: 2,
    content:
      "Good point. OAuth users should be auto-verified since the provider already confirmed their email.",
  },
  {
    ticketIndex: 15,
    userIndex: 0,
    content:
      "Just a heads up - make sure to sanitize the data to prevent CSV injection attacks.",
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("🌱 DB Seed: Starting realistic data generation...");

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("password");

  // Create users
  console.log("👥 Creating users...");
  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  // Create tickets
  console.log("🎫 Creating tickets...");
  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[ticket.userId].id,
    })),
  });

  // Create comments
  console.log("💬 Creating comments...");
  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      content: comment.content,
      userId: dbUsers[comment.userIndex].id,
      ticketId: dbTickets[comment.ticketIndex].id,
    })),
  });

  const t1 = performance.now();
  console.log(`\n✅ DB Seed: Completed in ${(t1 - t0).toFixed(2)}ms`);
  console.log(`   - Created ${dbUsers.length} users`);
  console.log(`   - Created ${dbTickets.length} tickets`);
  console.log(`   - Created ${comments.length} comments`);
  console.log(
    `   - Total bounty pool: $${(tickets.reduce((sum, t) => sum + t.bounty, 0) / 100).toFixed(2)}`,
  );
  console.log("\n🔐 Test credentials (all users):");
  console.log("   Password: password");
  console.log("\n📧 User emails:");
  dbUsers.forEach((user) => {
    console.log(`   - ${user.username}: ${user.email}`);
  });
};

seed()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
