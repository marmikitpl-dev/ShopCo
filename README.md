# 🛍️ ShopCo - E-commerce Platform

A modern, full-stack e-commerce platform built with React, TypeScript, Node.js, and Express.

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **ESLint** for code quality

### Backend
- **Node.js** with Express.js
- **ES6 Modules** support
- **CORS** enabled
- **Environment variables** with dotenv

## 📁 Project Structure

```
ShopCo/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── ui/        # Basic UI components
│   │   │   ├── layout/    # Layout components
│   │   │   ├── product/   # Product-related components
│   │   │   ├── cart/      # Shopping cart components
│   │   │   └── auth/      # Authentication components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   ├── types/         # TypeScript definitions
│   │   ├── services/      # API services
│   │   ├── context/       # React context providers
│   │   └── assets/        # Static assets
│   └── package.json
└── server/                # Express backend
    ├── index.js           # Main server file
    ├── .env               # Environment variables
    └── package.json
```

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18 or higher)
- yarn

### Installation


1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ShopCo
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   yarn
   
   # Install client dependencies
   cd ../client
   yarn
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cd server
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   yarn dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   yarn dev
   ```
   Client will run on `http://localhost:5173`

#### Production Mode

1. **Build the client**
   ```bash
   cd client
   yarn build
   ```

2. **Start the server**
   ```bash
   cd server
   yarn start
   ```

## 📝 Available Scripts

### Client (Frontend)
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

### Server (Backend)
- `yarn start` - Start production server
- `yarn dev` - Start development server with nodemon

## 🌐 API Endpoints

### Base URL: `http://localhost:5000`

- `GET /` - Welcome message
- `GET /api` - API information
- `GET /api/health` - Health check

## 🚀 Deployment

### Frontend (Netlify/Vercel)
The client is configured for easy deployment to Netlify or Vercel:
- Build command: `yarn build`
- Publish directory: `dist`

### Backend (Railway/Render/Heroku)
The server is ready for deployment to any Node.js hosting platform:
- Start command: `yarn start`
- Port: Uses `process.env.PORT` or defaults to 5000

## 🔧 Environment Variables

### Server (.env)
```env
PORT=5000
NODE_ENV=development
# Add your database URL, JWT secret, etc.
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or need help, please open an issue in the repository.

---

**Happy Shopping! 🛒**
