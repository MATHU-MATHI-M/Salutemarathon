import nodemailer from 'nodemailer'
import type { IUser } from '@/models/User'
import type { IRegistration } from '@/models/Registration'
import type { ITransaction } from '@/models/Transaction'

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

// Registration confirmation email template
const getConfirmationEmailTemplate = (
  user: IUser, 
  registration: IRegistration, 
  transaction: ITransaction
) => {
  const eventDate = 'August 9, 2025'
  const eventTime = '5:00 AM (5K) / 5:30 AM (10K)'
  const venue = 'Island Grounds, Chennai'

  return {
    subject: `🏃‍♀️ Registration Confirmed - Salute Marathon 2025 | Bib #${registration.bibNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmation - Salute Marathon 2025</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background: white;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #8B5CF6;
          }
          .logo {
            color: #8B5CF6;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .subtitle {
            color: #6B7280;
            font-size: 16px;
          }
          .confirmation-badge {
            background: linear-gradient(135deg, #8B5CF6, #EC4899);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            text-align: center;
            margin: 20px 0;
            font-weight: bold;
            font-size: 18px;
          }
          .details-section {
            background: #F8FAFC;
            padding: 25px;
            border-radius: 10px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #E5E7EB;
          }
          .detail-label {
            font-weight: 600;
            color: #374151;
          }
          .detail-value {
            color: #6B7280;
            text-align: right;
          }
          .bib-number {
            font-size: 36px;
            font-weight: bold;
            color: #8B5CF6;
            text-align: center;
            margin: 20px 0;
          }
          .important-info {
            background: #FEF3C7;
            border-left: 4px solid #F59E0B;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
          }
          .checklist {
            background: #F0FDF4;
            border-left: 4px solid #10B981;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
          }
          .checklist ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #E5E7EB;
            color: #6B7280;
            font-size: 14px;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #8B5CF6;
            text-decoration: none;
          }
          @media (max-width: 600px) {
            .container {
              padding: 20px;
            }
            .detail-row {
              flex-direction: column;
              align-items: flex-start;
            }
            .detail-value {
              text-align: left;
              margin-top: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🏃‍♀️ SALUTE MARATHON 2025</div>
            <div class="subtitle">Women Safety & Drug Awareness Campaign</div>
          </div>

          <div class="confirmation-badge">
            🎉 Registration Confirmed!
          </div>

          <p>Dear ${user.firstName} ${user.lastName},</p>
          
          <p>Congratulations! Your registration for the Salute Marathon 2025 has been confirmed. You're now part of our mission to promote women safety and drug awareness.</p>

          <div class="bib-number">
            BIB #${registration.bibNumber}
          </div>

          <div class="details-section">
            <h3 style="margin-top: 0; color: #374151;">📋 Registration Details</h3>
            <div class="detail-row">
              <span class="detail-label">Registration ID:</span>
              <span class="detail-value">${registration.registrationId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Race Category:</span>
              <span class="detail-value">${registration.raceCategory} Challenge</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount Paid:</span>
              <span class="detail-value">₹${registration.amount}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment ID:</span>
              <span class="detail-value">${transaction.razorpayPaymentId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">T-Shirt Size:</span>
              <span class="detail-value">${user.tshirtSize}</span>
            </div>
          </div>

          <div class="details-section">
            <h3 style="margin-top: 0; color: #374151;">📅 Event Information</h3>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${eventDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${eventTime}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Venue:</span>
              <span class="detail-value">${venue}</span>
            </div>
          </div>

          <div class="important-info">
            <h4 style="margin-top: 0;">⚠️ Important Instructions</h4>
            <ul>
              <li>Report at the venue by 4:30 AM for 5K or 5:00 AM for 10K</li>
              <li>Bring a valid government-issued photo ID</li>
              <li>Kit collection will be available on race day from 4:00 AM</li>
              <li>No separate kit collection event - collect on race day only</li>
            </ul>
          </div>

          <div class="checklist">
            <h4 style="margin-top: 0;">✅ Race Day Checklist</h4>
            <ul>
              <li>Government-issued photo ID (mandatory)</li>
              <li>This confirmation email (print or mobile)</li>
              <li>Comfortable running shoes and attire</li>
              <li>Water bottle (hydration stations available)</li>
              <li>Positive attitude and enthusiasm!</li>
            </ul>
          </div>

          <div class="details-section">
            <h3 style="margin-top: 0; color: #374151;">📞 Contact Information</h3>
            <p><strong>Event Organizers:</strong></p>
            <p>MJF Lion Manoj Seeralan: <a href="tel:+919444055552">+91 94440 55552</a></p>
            <p>Leo Lion Paul Jeevanesan A: <a href="tel:+919940484199">+91 99404 84199</a></p>
            <p>Email: <a href="mailto:info@salutemarathon.com">info@salutemarathon.com</a></p>
          </div>

          <p>Thank you for joining our cause. Every step you take contributes to building a safer and drug-free society.</p>

          <p>See you at the starting line!</p>
          
          <p style="font-weight: bold; color: #8B5CF6;">Team Salute Marathon 2025</p>

          <div class="social-links">
            <a href="#">📘 Facebook</a>
            <a href="#">📷 Instagram</a>
            <a href="#">🐦 Twitter</a>
          </div>

          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
            <p>For any queries, contact us at the numbers provided above.</p>
            <p>&copy; 2025 Salute Marathon. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      SALUTE MARATHON 2025 - Registration Confirmed
      
      Dear ${user.firstName} ${user.lastName},
      
      Congratulations! Your registration for the Salute Marathon 2025 has been confirmed.
      
      Registration Details:
      - Registration ID: ${registration.registrationId}
      - Bib Number: ${registration.bibNumber}
      - Race Category: ${registration.raceCategory} Challenge
      - Amount Paid: ₹${registration.amount}
      - Payment ID: ${transaction.razorpayPaymentId}
      
      Event Information:
      - Date: ${eventDate}
      - Time: ${eventTime}
      - Venue: ${venue}
      
      Important Instructions:
      - Report at the venue by 4:30 AM for 5K or 5:00 AM for 10K
      - Bring a valid government-issued photo ID
      - Kit collection on race day from 4:00 AM
      
      Contact Information:
      MJF Lion Manoj Seeralan: +91 94440 55552
      Leo Lion Paul Jeevanesan A: +91 99404 84199
      Email: info@salutemarathon.com
      
      Thank you for joining our cause!
      
      Team Salute Marathon 2025
    `
  }
}

// Send confirmation email
export async function sendConfirmationEmail(
  user: IUser, 
  registration: IRegistration, 
  transaction: ITransaction
): Promise<boolean> {
  try {
    const transporter = createTransporter()
    const emailTemplate = getConfirmationEmailTemplate(user, registration, transaction)

    const mailOptions = {
      from: {
        name: 'Salute Marathon 2025',
        address: process.env.SMTP_FROM_EMAIL || 'noreply@salutemarathon.com'
      },
      to: user.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text
    }

    await transporter.sendMail(mailOptions)
    console.log(`Confirmation email sent to: ${user.email}`)
    return true

  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

// Send payment failure email
export async function sendPaymentFailureEmail(
  user: IUser, 
  registration: IRegistration,
  failureReason: string
): Promise<boolean> {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: {
        name: 'Salute Marathon 2025',
        address: process.env.SMTP_FROM_EMAIL || 'noreply@salutemarathon.com'
      },
      to: user.email,
      subject: '❌ Payment Failed - Salute Marathon 2025 Registration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #dc2626;">Payment Failed</h2>
          <p>Dear ${user.firstName} ${user.lastName},</p>
          <p>Unfortunately, your payment for the Salute Marathon 2025 registration could not be processed.</p>
          <p><strong>Registration ID:</strong> ${registration.registrationId}</p>
          <p><strong>Race Category:</strong> ${registration.raceCategory} Challenge</p>
          <p><strong>Failure Reason:</strong> ${failureReason}</p>
          <p>Please try registering again or contact our support team for assistance.</p>
          <p><strong>Contact:</strong></p>
          <p>MJF Lion Manoj Seeralan: +91 94440 55552</p>
          <p>Leo Lion Paul Jeevanesan A: +91 99404 84199</p>
          <p>Best regards,<br>Team Salute Marathon 2025</p>
        </div>
      `,
      text: `
        Payment Failed - Salute Marathon 2025
        
        Dear ${user.firstName} ${user.lastName},
        
        Unfortunately, your payment for the Salute Marathon 2025 registration could not be processed.
        
        Registration ID: ${registration.registrationId}
        Race Category: ${registration.raceCategory} Challenge
        Failure Reason: ${failureReason}
        
        Please try registering again or contact our support team.
        
        Contact:
        MJF Lion Manoj Seeralan: +91 94440 55552
        Leo Lion Paul Jeevanesan A: +91 99404 84199
        
        Team Salute Marathon 2025
      `
    }

    await transporter.sendMail(mailOptions)
    console.log(`Payment failure email sent to: ${user.email}`)
    return true

  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}