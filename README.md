next-dashboard/
├── public/                     # Static assets (images, icons, etc.)
│   └── images/                 # Category and product images
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── (auth)/             # Authentication-related routes (optional)
│   │   ├── (dashboard)/        # Protected dashboard routes
│   │   │   ├── categories/     # Categories page and components
│   │   │   │   ├── page.tsx    # Categories page
│   │   │   │   ├── CategoryCard.tsx  # Category card component
│   │   │   │   └── CategoryForm.tsx  # Form for adding/editing categories
│   │   │   ├── products/       # Products page and components
│   │   │   │   ├── page.tsx    # Products page
│   │   │   │   ├── ProductTable.tsx  # Product table component
│   │   │   │   └── ProductForm.tsx   # Form for adding/editing products
│   │   │   └── layout.tsx      # Dashboard layout (with sidebar/nav)
│   │   ├── api/                # API routes (if needed)
│   │   ├── lib/                # Shared utilities and libraries
│   │   │   ├── db/             # Database connection and queries
│   │   │   ├── auth/           # Authentication utilities
│   │   │   └── utils/          # Helper functions
│   │   ├── actions/            # Server Actions for CRUD operations
│   │   │   ├── category.ts     # Category-related actions
│   │   │   └── product.ts      # Product-related actions
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/             # ShadCN UI components
│   │   │   ├── Navbar.tsx      # Navigation bar
│   │   │   ├── Sidebar.tsx     # Sidebar for dashboard
│   │   │   └── Toast.tsx       # Toast notifications
│   │   ├── styles/             # Global styles
│   │   │   └── globals.css     # Tailwind CSS and custom styles
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # React context (if needed)
│   │   └── page.tsx            # Home page (redirect to dashboard)
│   ├── types/                  # TypeScript types/interfaces
│   └── config/                 # Configuration files
│       └── constants.ts        # Constants (e.g., API endpoints)
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── drizzle.config.ts           # Drizzle ORM configuration
├── next.config.js              # Next.js configuration
└── package.json                # Project dependencies