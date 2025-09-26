# Nirapotta (নিরাপত্তা) 🇧🇩

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)

**A community-driven safety and crime reporting platform specifically for Bangladesh**

## 🌟 Vision

To create a safer Bangladesh through technology-enabled community participation, transparent crime reporting, and data-driven safety insights.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Security](#-security)
- [License](#-license)

## ✨ Features

### 🔐 **User Management**
- SMS-based OTP verification with local providers (SSL Wireless, Robi Axiata, Grameenphone)
- National ID (NID) verification integration
- Multi-language support (Bengali, English, Regional dialects)
- Reputation scoring system based on community contributions

### 📢 **Crime Reporting**
- Comprehensive crime reporting with mandatory image upload
- Emergency reporting with 999 integration
- Anonymous reporting option
- Bangladesh-specific crime categorization (Street crimes, Harassment, Traffic violations, etc.)
- Automatic location detection with Bangladesh administrative hierarchy

### 👥 **Community Verification**
- Community-based upvote/downvote system
- Collaborative fact-checking workflow
- Comment system with mandatory proof attachments
- Verification badge system

### 📊 **Analytics & Insights**
- Interactive crime heatmap
- District-wise crime statistics
- Seasonal crime pattern analysis
- Trend analysis and statistical reports
- Export functionality for authorities

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **State Management**: Built-in Next.js state management
- **Maps**: Google Maps API / Mapbox

### **Backend & Database**
- **API**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + Custom OTP
- **Storage**: Supabase Storage + Firebase Storage
- **Real-time**: Firebase Realtime Database

### **Integrations**
- **SMS**: SSL Wireless, Robi Axiata, Grameenphone APIs
- **AI/ML**: Azure Computer Vision API
- **Emergency**: 999 Service Integration
- **Verification**: National ID verification API

### **Deployment & CDN**
- **Hosting**: Vercel
- **CDN**: CloudFlare with Dhaka edge locations
- **Monitoring**: Vercel Analytics, Sentry

## 📁 Project Structure

```
JUSTICELENS/
├── .firebase/              # Firebase configuration
├── .next/                  # Next.js build files
├── api/                    # API routes and utilities
├── app/                    # Next.js 13+ app directory
│   ├── auth/              # Authentication pages
│   ├── crime/             # Crime reporting features
│   ├── profile/           # User profiles
│   ├── analytics/         # Analytics dashboard
│   ├── community/         # Community features
│   ├── admin/             # Admin panel
│   └── help/              # Help and support
├── components/             # Reusable UI components
│   ├── layout/            # Layout components
│   ├── crime/             # Crime-related components
│   ├── user/              # User components
│   ├── analytics/         # Analytics components
│   ├── community/         # Community components
│   ├── admin/             # Admin components
│   ├── common/            # Common UI components
│   └── forms/             # Form components
├── data/                   # Static data and constants
├── docs/                   # Project documentation
├── interfaces/             # TypeScript interfaces
├── layout/                 # Layout configurations
├── public/                 # Static assets
├── store/                  # State management
├── styles/                 # CSS and styling files
├── utils/                  # Utility functions
├── .firebaserc            # Firebase project config
├── firebase.json          # Firebase hosting config
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS config
├── eslint.config.mjs      # ESLint configuration
├── pnpm-lock.yaml         # Package lock file
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (preferred) or npm >= 8.0.0
- Git >= 2.30.0

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/justicelens.git
cd justicelens
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. **Start development server**
```bash
pnpm dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# SMS Gateways (Bangladesh)
SSL_WIRELESS_API_KEY=your_ssl_wireless_key
ROBI_AXIATA_API_KEY=your_robi_axiata_key
GRAMEENPHONE_API_KEY=your_grameenphone_key

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Azure Computer Vision
AZURE_COMPUTER_VISION_ENDPOINT=your_azure_endpoint
AZURE_COMPUTER_VISION_KEY=your_azure_key

# NID Verification (if available)
NID_VERIFICATION_API_KEY=your_nid_api_key

# Emergency Services
EMERGENCY_999_API_KEY=your_emergency_api_key
```

## 📖 Usage

### **For Citizens**
1. **Register**: Sign up with phone number and complete NID verification
2. **Report Crime**: Submit incident reports with photos/videos and location
3. **Verify Reports**: Help verify community reports through voting and comments
4. **Stay Safe**: Access crime heatmaps and safety insights for your area

### **For Authorities**
1. **Access Dashboard**: Monitor crime reports and community activities
2. **Verify Reports**: Review and act on verified crime reports
3. **Analytics**: Access detailed crime statistics and trend analysis
4. **Export Data**: Download reports for official use

### **For Administrators**
1. **Content Moderation**: Review and moderate user-submitted content
2. **User Management**: Manage user accounts and verification status
3. **System Monitoring**: Monitor platform health and performance
4. **Configuration**: Manage platform settings and integrations

## 🔗 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/refresh-token` - Refresh JWT token

### Crime Report Endpoints
- `GET /api/crime/feed` - Get paginated crime reports
- `POST /api/crime/report` - Submit new crime report
- `GET /api/crime/[id]` - Get specific crime report
- `POST /api/crime/[id]/vote` - Vote on crime report

### Analytics Endpoints
- `GET /api/analytics/heatmap` - Crime heatmap data
- `GET /api/analytics/trends` - Crime trend analysis
- `GET /api/analytics/statistics` - Platform statistics

## 🎯 Bangladesh-Specific Features

### **Cultural & Linguistic Adaptations**
- **Primary Languages**: Bengali (বাংলা) and English
- **Regional Dialects**: Chittagonian, Sylheti support (planned)
- **Voice-to-Text**: Bengali speech recognition
- **SMS Integration**: Basic feature phones support

### **Administrative Hierarchy**
```
Division (বিভাগ) → District (জেলা) → Upazila (উপজেলা) → Union (ইউনিয়ন) → Ward (ওয়ার্ড)
```

### **Crime Categories**
- **Street Crimes**: Snatching (ছিনতাই), Pickpocketing, Mugging
- **Harassment**: Eve-teasing (ইভ টিজিং), Stalking, Workplace harassment
- **Traffic Violations**: Reckless driving, Traffic rule violations
- **Fraud**: Mobile banking fraud (bKash/Nagad), Online scams
- **Domestic Issues**: Domestic violence, Child abuse
- **Public Safety**: Road accidents, Building collapse risks
- **Corruption**: Bribery incidents, Service delays
- **Environmental**: Illegal dumping, Noise pollution

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run e2e tests
pnpm test:e2e

# Generate coverage report
pnpm test:coverage
```

## 🚀 Deployment

### **Development**
```bash
pnpm dev
```

### **Production Build**
```bash
pnpm build
pnpm start
```

### **Firebase Deployment**
```bash
pnpm build
firebase deploy
```

### **Vercel Deployment**
```bash
vercel --prod
```

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards

- **Language**: TypeScript for type safety
- **Style**: ESLint + Prettier configuration
- **Testing**: Jest + React Testing Library (80% coverage required)
- **Documentation**: JSDoc comments for all functions

## 🛡️ Security

### Security Measures
- End-to-end encryption for sensitive data
- Regular security audits and penetration testing
- GDPR and Bangladesh data protection compliance
- Role-based access control (RBAC)

### Reporting Security Issues

If you discover a security vulnerability, please send an email to security@nirapotta.bd. Please do **not** create a public GitHub issue.

## 📱 Mobile Support

Nirapotta is built as a Progressive Web App (PWA) with:
- Offline functionality for core features
- Push notifications for real-time alerts
- GPS integration for accurate location reporting
- Camera integration for direct photo/video capture
- Bengali voice input support

## 📈 Performance

- Page load time < 3 seconds on 3G networks
- 99.9% uptime target
- Support for 10,000+ concurrent users
- Mobile-first responsive design

## 📊 Project Status

- **Phase 1**: Foundation ✅ (Completed)
- **Phase 2**: Core Features 🚧 (In Progress)
- **Phase 3**: Bangladesh Integration 📅 (Planned)
- **Phase 4**: Advanced Features 📅 (Planned)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Government of Bangladesh ICT Division
- Local police departments and authorities
- Community volunteers and beta testers
- Open source community contributors

## 📞 Support

- **Website**: [app.banani.com](https://app.banani.com)
- **Email**: support@nirapotta.bd
- **Community Forum**: [community.nirapotta.bd](https://community.nirapotta.bd)
- **Emergency**: Always call 999 for immediate emergencies

## 🔗 Related Projects

- [Nirapotta Mobile App](https://github.com/your-org/nirapotta-mobile)
- [Nirapotta Admin Dashboard](https://github.com/your-org/nirapotta-admin)
- [Nirapotta API Documentation](https://github.com/your-org/nirapotta-docs)

**Made with ❤️ for a safer Bangladesh**

*This platform is developed to enhance community safety and should complement, not replace, official emergency services. Always contact local authorities (999) for immediate emergencies.*