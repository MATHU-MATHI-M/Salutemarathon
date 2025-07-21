
# 🏃‍♀️ Salute Marathon 2025 - Registration & Payment System

A complete marathon registration website with secure payment processing, built with Next.js, MongoDB, and Razorpay.

## ✨ Features

- **Comprehensive Registration Form**: Multi-step form with validation
- **Secure Payment Processing**: Razorpay integration with signature verification
- **Database Management**: MongoDB with proper schemas and indexing
- **Email Confirmations**: Automated confirmation emails with registration details
- **Security Measures**: Rate limiting, input sanitization, CORS protection
- **Admin Dashboard**: Basic registration management and statistics
- **Responsive Design**: Mobile-first UI with modern animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Payment**: Razorpay Payment Gateway
- **Email**: Nodemailer with SMTP
- **Security**: Rate limiting, input validation, CORS protection
- **UI Components**: Radix UI, Lucide Icons, Sonner (toasts)

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)
- Razorpay account (test/live keys)
- SMTP email service (Gmail, SendGrid, etc.)

## 🚀 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd Salute-Marathon-1
npm install --legacy-peer-deps
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

#### Required Environment Variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/salute-marathon

# Razorpay (Get from https://dashboard.razorpay.com/)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id

# Email SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@salutemarathon.com

# Security
NEXTAUTH_SECRET=your-random-secret-32-chars
ENCRYPTION_KEY=your-32-character-encryption-key
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
brew install mongodb/brew/mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Option B: MongoDB Atlas
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a cluster and get connection string
3. Update `MONGODB_URI` in `.env.local`

### 4. Razorpay Setup

1. Create account at [Razorpay](https://dashboard.razorpay.com/)
2. Get API Keys from Dashboard > Settings > API Keys
3. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/razorpay`
4. Configure webhook events: `payment.captured`, `payment.failed`, `order.paid`

### 5. Email Setup (Gmail Example)

1. Enable 2-factor authentication on Gmail
2. Generate App Password: Google Account > Security > App passwords
3. Use App Password in `SMTP_PASSWORD`

### 6. Run the Application

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema

### Collections:

#### Users
- Personal information (name, email, phone, age, etc.)
- Address and emergency contact details
- T-shirt size and race category
- Terms acceptance and waiver

#### Transactions
- Razorpay order and payment IDs
- Payment status and verification
- Amount and currency
- Metadata (IP, user agent, timestamps)

#### Registrations
- Links user and transaction
- Bib number assignment
- Registration status
- Email confirmation status

## 🔒 Security Features

- **Input Validation**: Server-side validation with sanitization
- **Rate Limiting**: Prevents spam and abuse
- **Payment Verification**: Razorpay signature verification
- **CORS Protection**: Secure API access
- **Security Headers**: XSS, CSRF, and content-type protection
- **Webhook Verification**: Secure payment status updates

## 🎯 API Endpoints

### Registration Flow
- `POST /api/register` - Create user registration
- `POST /api/payment/create` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment completion
- `POST /api/webhooks/razorpay` - Payment webhook handler

### Admin & Stats
- `GET /api/stats` - Registration statistics
- `GET /api/admin/registrations` - Admin dashboard data

## 📧 Email Templates

- **Registration Confirmation**: Detailed email with bib number, event info, and instructions
- **Payment Failure**: Notification for failed payments with retry instructions

## 🎨 UI Components

- **Multi-step Registration Form**: Category selection, personal info, address, terms
- **Payment Integration**: Seamless Razorpay checkout experience
- **Real-time Validation**: Instant feedback on form fields
- **Progress Indicators**: Visual step tracking and completion status

## 🧪 Testing

### Test Payment Flow:
1. Use Razorpay test keys
2. Test card numbers: `4111 1111 1111 1111`
3. Any valid expiry date and CVV
4. Monitor webhook events in Razorpay dashboard

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Environment Variables for Production:
- Update all URLs to production domains
- Use live Razorpay keys for production
- Configure production MongoDB URI
- Set up production SMTP service

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-optimized form controls
- Mobile payment experience
- Progressive web app features

## 🔧 Customization

### Modify Race Categories:
Update pricing in:
- `components/registration-modal.tsx`
- `models/Transaction.ts`
- API validation logic

### Email Templates:
Modify templates in `lib/email.ts`

### UI Styling:
Update theme in `tailwind.config.ts`

## 🐛 Troubleshooting

### Common Issues:

1. **Payment fails**: Check Razorpay keys and webhook URL
2. **Email not sending**: Verify SMTP credentials
3. **Database connection**: Check MongoDB URI and network access
4. **Build errors**: Ensure all environment variables are set

### Debug Mode:
Set `NODE_ENV=development` for detailed error logs

## 📞 Support

For technical support:
- Check console logs for error details
- Verify all environment variables
- Test with Razorpay test mode first
- Monitor webhook events in Razorpay dashboard

## 📝 License

This project is licensed under the MIT License.

---

**Built with ❤️ for Salute Marathon 2025 - Every step towards safety!**
