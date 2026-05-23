# Pipeline Partner

![TypeScript](https://img.shields.io/badge/TypeScript-97.3%25-3178c6?style=flat-square)
![CSS](https://img.shields.io/badge/CSS-2.2%25-563d7c?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-0.5%25-f7df1e?style=flat-square)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Pipeline Partner** is a modern, enterprise-grade CRM (Customer Relationship Management) application designed for sales teams and businesses managing complex sales pipelines. Built with React 19, TypeScript, and modern web technologies, it provides a comprehensive platform for lead management, deal tracking, communications, and sales analytics.

## ✨ Features

### 📊 Sales Pipeline Management
- Track deals across multiple stages (New, Contacted, Negotiation, Closed)
- Visualize sales growth trends and revenue forecasting
- Manage and prioritize leads efficiently
- Real-time deal status updates

### 💬 Communications Hub
- Centralized communication platform for team collaboration
- Activity tracking and audit logs
- Team messaging and notifications
- Follow-up scheduling and reminders

### 👥 Team Collaboration
- Team performance tracking and leaderboards
- User activity monitoring
- Role-based access control
- Notification system for team events

### 📈 Advanced Analytics
- Sales charts and revenue visualizations with Recharts
- Lead status distribution analytics
- Performance metrics and KPI tracking
- Historical data analysis

### 🎨 Professional UI/UX
- Responsive design with Tailwind CSS
- Dark mode support
- Accessible component library (Radix UI)
- Smooth animations and transitions

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.8.3
- **Router**: TanStack React Router 1.168.25
- **State Management**: TanStack React Query 5.83.0
- **Build Tool**: Vite 7.3.1 with Cloudflare support

### UI & Styling
- **Component Library**: Radix UI (accordion, dialog, dropdown, popover, select, etc.)
- **CSS Framework**: Tailwind CSS 4.2.1
- **Icon Library**: Lucide React 0.575.0
- **Charts**: Recharts 2.15.4

### Forms & Validation
- **Form Library**: React Hook Form 7.71.2
- **Schema Validation**: Zod 3.24.2
- **Resolver**: @hookform/resolvers 5.2.2

### Utilities
- **Date Handling**: date-fns 4.1.0
- **Notifications**: Sonner 2.0.7
- **Class Merging**: clsx 2.1.1, tailwind-merge 3.5.0
- **Command Palette**: cmdk 1.1.1
- **Carousel**: Embla Carousel 8.6.0
- **Resizable Layouts**: react-resizable-panels 4.6.5
- **OTP Input**: input-otp 1.4.2

### Development Tools
- **Linting**: ESLint 9.32.0
- **Formatting**: Prettier 3.7.3
- **Type Checking**: TypeScript 5.8.3

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Layout components (AppShell, Navigation)
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and helpers
│   ├── error-capture.ts    # Error handling utilities
│   ├── error-page.ts       # Error page rendering
│   ├── mock-data.ts        # Mock data for development
│   └── utils.ts            # General utilities
├── routes/             # Page components and route definitions
├── router.tsx          # Router configuration
├── server.ts           # Server-side entry point
├── start.ts            # Application startup
├── routeTree.gen.ts    # Generated route tree (auto-generated)
└── styles.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sujanprasad/pipeline-partner.git
   cd pipeline-partner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run build:dev` | Build with development configuration |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code with Prettier |

## 🗂️ Key Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Dashboard with sales overview and analytics |
| `/leads` | Lead management and tracking |
| `/followups` | Follow-up scheduling and management |
| `/deals` | Deal pipeline and tracking |
| `/team` | Team performance and collaboration |
| `/communications` | Team messaging and communications |

## 🎨 UI Components

The application leverages **Radix UI** for accessible, unstyled components:

- **Navigation**: Menubar, Navigation Menu, Command Palette
- **Dialogs**: Alert Dialog, Dialog, Dropdown Menu, Popover
- **Forms**: Select, Checkbox, Radio Group, Toggle, Switch
- **Data Display**: Tabs, Accordion, Separator, Progress, Slider
- **Feedback**: Tooltip, Hover Card, Context Menu
- **Lists**: Scroll Area
- **Layout**: Aspect Ratio, Slot

All components are styled with **Tailwind CSS** for a cohesive, modern design system.

## 🌐 Deployment

This application is configured for **Cloudflare** deployment:

- Uses `@cloudflare/vite-plugin` for seamless Cloudflare integration
- Server-side rendering support via TanStack React Start
- Automatic error handling and recovery
- Environment variable support

### Deploy to Cloudflare
```bash
npm run build
# Deploy the dist/ folder to Cloudflare
```

## 📊 Data & Mock Data

The application includes comprehensive mock data in `src/lib/mock-data.ts`:

- **Sales Growth Data**: Monthly revenue and deal tracking
- **Lead Status Distribution**: Breakdown of lead stages
- **Recent Activities**: User action history
- **Notifications**: System and activity notifications
- **Team Data**: User profiles and performance metrics

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

### Code Standards
- Use TypeScript for all new code
- Follow the existing code style (enforced by ESLint & Prettier)
- Write clear, descriptive commit messages
- Test your changes before submitting

## 🔧 Configuration

### Environment Setup
- Create a `.env` file in the root directory if needed
- Cloudflare environment variables are automatically available in server context

### Styling
- Global styles: `src/styles.css`
- Tailwind configuration: `tailwind.config.js`
- CSS variables for theming in styles.css
- Dark mode support with `dark:` prefix

### TypeScript
- Configuration: `tsconfig.json`
- Strict mode enabled
- Path aliases configured in `tsconfig.json`

## 🐛 Error Handling

The application includes robust error handling:
- Server-side error capture and logging (`src/lib/error-capture.ts`)
- Branded error pages (`src/lib/error-page.ts`)
- Graceful error recovery
- Console error logging for debugging

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Responsive design for desktop and tablet
- Mobile-optimized UI with Tailwind CSS

## 🎯 Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Authentication & authorization system
- [ ] Email notifications
- [ ] Advanced filtering and search
- [ ] Custom reporting and exports
- [ ] Mobile app (React Native)
- [ ] API documentation
- [ ] Integration with third-party tools

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Sujanprasad**
- GitHub: [@Sujanprasad](https://github.com/Sujanprasad)

## 🙏 Acknowledgments

- [React](https://react.dev) - UI library
- [TanStack](https://tanstack.com) - Router and Query libraries
- [Radix UI](https://radix-ui.com) - Accessible components
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Vite](https://vitejs.dev) - Build tool
- [Recharts](https://recharts.org) - Charting library

---

**Made with ❤️ by Pipeline Partner Team**
 this is the reamde file so now  help me to deploy the site and  giv ea short about description
