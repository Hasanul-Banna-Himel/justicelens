# JusticeLens 🇧🇩

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)

**A community-driven safety and crime reporting platform specifically for Bangladesh**

## 🎯 Mission & Vision

### Mission

Our mission is to empower the citizens of Bangladesh to voice out against injustices, build a safe and transparent community, and ensure that their voices are heard by the right authorities. We aim to create a platform that is not only a crime reporting tool but also a symbol of hope and trust for the people.

### Vision

We envision a future where every citizen of Bangladesh feels safe and secure in their community. We see a Bangladesh where technology and community collaboration have eradicated the barriers to justice, and where every individual has the power to make a difference.

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

- E-mail verification
- (Coming Soon) SMS-based OTP verification with local providers (SSL Wireless, Robi Axiata, Grameenphone)
- (Coming Soon) National ID (NID) verification integration
- (Coming Soon) Multi-language support (Bengali, English, Regional dialects)
- (Coming Soon) Reputation scoring system based on community contributions

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

- **Framework**: React-Native with Expo & TypeScript
- **Styling**: React-Native Style
- **UI Components**: Custom component library
- **State Management**: Built-in useState & Context state management
- **Maps**: (Coming Soon) Google Maps API / Mapbox

### **Backend & Database**

- **API**: Python
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage + CLOUDINARY
<!-- - **Real-time**: Firebase Realtime Database -->

### **Integrations**

<!-- - **SMS**: SSL Wireless, Robi Axiata, Grameenphone APIs -->

- **AI/ML**: Azure Computer Vision API
- **Emergency**: 999 Service Integration
- **Verification**: (Coming Soon) National ID verification API

### **Deployment & CDN**

- **Hosting**: Play Store (Android), App Store (IOS) (Coming Soon)
- **Hosting**: netlify (Web)

## 📁 Project Structure

```
justicelens/
├── app/                    # Expo Router file-based routing directory
│   ├── (auth)/             # Authentication screens (sign-in, sign-up)
│   ├── (public)/           # Publicly accessible screens (about, privacy)
│   ├── (tabs)/             # Main application tabs after login
│   ├── _layout.tsx         # Root layout for the app
│   └── +not-found.tsx      # Not found screen
├── assets/                 # Static assets (images, fonts)
├── components/             # Reusable React components
│   ├── custom/             # Custom complex components
│   └── ui/                 # Basic UI elements
├── constants/              # Constant values (e.g., colors, styles)
├── contexts/               # React contexts for state management
├── data/                   # Static data files (e.g., JSON)
├── docs/                   # Project documentation
├── hooks/                  # Custom React hooks
├── layout/                 # Layout components and configurations
├── scripts/                # Utility scripts for the project
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions and helpers
├── app.json                # Expo configuration file
├── metro.config.js         # Metro bundler configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.19.0
- npm >= 11.4.2 (preferred) or pnpm >= 8.0.0
- Git >= 2.30.0

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Hasanul-Banna-Himel/justicelens
cd justicelens
```

2. **Install dependencies**

1. Install dependencies

   ```bash
   npm install
   ```

1. Start the app

   ```bash
   npx expo start --clear
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## 🔧 Environment Setup

update the `.env.local` file in the root directory with your own credentials

## 📖 Usage

### **For Citizens**

1. **Register**: Sign up
2. **Report Crime**: Submit incident reports with photos/videos and location
3. **Verify Reports**: Help verify community reports through voting and comments
4. **Stay Safe**: (Coming Soon) Access crime heatmaps and safety insights for your area

### **For Authorities**

1. **Access Dashboard**: (Coming Soon) Monitor crime reports and community activities
2. **Verify Reports**: (Coming Soon) Review and act on verified crime reports
3. **Analytics**: (Coming Soon) Access detailed crime statistics and trend analysis
4. **Export Data**: (Coming Soon) Download reports for official use

### **For Administrators**

1. **Content Moderation**: (Coming Soon) Review and moderate user-submitted content
2. **User Management**: (Coming Soon) Manage user accounts and verification status
3. **System Monitoring**: (Coming Soon) Monitor platform health and performance
4. **Configuration**: (Coming Soon) Manage platform settings and integrations

## 🔗 API Documentation

## 🎯 Bangladesh-Specific Features

### **Cultural & Linguistic Adaptations**

- **Primary Languages**: Bengali (বাংলা) (Coming Soon) and English
- **Regional Dialects**: Chittagonian, Sylheti support (planned)
- **Voice-to-Text**: Bengali speech recognition
- **SMS Integration**: Basic feature phones support

### **Administrative Hierarchy**

```
Division (বিভাগ) → District (জেলা) → Thana
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

## 🧪 Testing (Coming Soon)

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
eas build -p android --profile preview
```

### **Production Build**

```bash
eas build -p android --profile production
# or
eas build -p android --profile development
```

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Standards

- **Language**: TypeScript for type safety
- **Style**: ESLint + Prettier configuration
- **Testing**: (Coming Soon) Jest + React Testing Library (80% coverage required)
- **Documentation**: JSDoc comments for all functions

## 🛡️ Security

### Security Measures

- End-to-end encryption for sensitive data
- Regular security audits and penetration testing
- GDPR and Bangladesh data protection compliance
- Role-based access control (RBAC)

### Reporting Security Issues

If you discover a security vulnerability, please send an email to <justicelens.dev@gmail.com>. Please do **not** create a public GitHub issue.

## 📱 Mobile Support

JusticeLens is built as a Native App with:

- Offline functionality for core features
- Push notifications for real-time alerts (Coming Soon)
- GPS integration for accurate location reporting (Coming Soon)
- Camera integration for direct photo/video capture
- Bengali voice input support (Coming Soon)

## 📈 Performance

- Page load time < 3 seconds on 3G networks
- 99.9% uptime target
- Support for 10,000+ concurrent users
- Mobile-first responsive design

## 📊 Project Status

- **Phase 1**: Foundation ✅ (Completed)
- **Phase 2**: Core Features 🚧 (Completed)
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

- **Website**: [justicelens.akhlak.dev](https://justicelens.akhlak.dev)
- **Email**: <justicelens.dev@gmail.com>
- **Community Forum**: [community.justicelens.akhlak.dev](https://community.justicelens.akhlak.dev) (Coming Soon)
- **Emergency**: Always call 999 for immediate emergencies

## 🔗 Related Links

- [Join JusticeLens Play Store Beta Testing](https://forms.gle/GyrNBmGvH8snD1RN9)
- [JusticeLens Mobile App](https://play.google.com/store/apps/details?id=dev.akhlak.justicelens)
<!-- - [justicelens Admin Dashboard](https://github.com/your-org/justicelens-admin)
- [justicelens API Documentation](https://github.com/your-org/justicelens-docs) -->

**Made with ❤️ for a safer Bangladesh**

_This platform is developed to enhance community safety and should complement, not replace, official emergency services. Always contact local authorities (999) for immediate emergencies._
