import nodemailer from 'nodemailer'
import type { EnquiryFormData } from '@/types/enquiry'

// Create reusable SMTP transporter from environment variables
function createTransporter() {
  const host   = process.env.SMTP_HOST
  const port   = parseInt(process.env.SMTP_PORT || '587', 10)
  const user   = process.env.SMTP_USER
  const pass   = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error(
      'SMTP configuration is incomplete. Set SMTP_HOST, SMTP_USER and SMTP_PASS in your .env.local'
    )
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465, false for 587 (STARTTLS)
    auth: { user, pass },
  })
}

export async function sendEnquiryEmail(data: EnquiryFormData): Promise<void> {
  const ownerEmail = process.env.OWNER_EMAIL

  if (!ownerEmail) {
    throw new Error('OWNER_EMAIL environment variable is not configured.')
  }

  const transporter = createTransporter()

  const now = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const replyTo = data.email && data.email.length > 0 ? data.email : undefined

  await transporter.sendMail({
    from: `"EV Empire Website" <${process.env.SMTP_USER}>`,
    to: ownerEmail,
    replyTo,
    subject: `New Enquiry — ${data.selectedScooter} | EV Empire Website`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); padding: 30px 40px; text-align: center; }
          .header h1 { color: #fff; margin: 0; font-size: 28px; letter-spacing: 2px; }
          .header p { color: #38bdf8; margin: 6px 0 0; font-size: 13px; letter-spacing: 1px; }
          .body { padding: 36px 40px; }
          .body h2 { color: #0f172a; font-size: 20px; margin-bottom: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
          .field { display: flex; margin-bottom: 16px; }
          .field-label { min-width: 160px; font-weight: 700; color: #475569; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
          .field-value { color: #0f172a; font-size: 15px; }
          .highlight { background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 16px 20px; border-radius: 0 6px 6px 0; margin: 24px 0; }
          .highlight .field-value { font-size: 22px; font-weight: 700; color: #0ea5e9; }
          .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-top: 8px; color: #334155; font-size: 14px; line-height: 1.6; }
          .footer { background: #f8fafc; padding: 20px 40px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; }
          .badge { display: inline-block; background: #0ea5e9; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 1px; margin-left: 8px; vertical-align: middle; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>EV EMPIRE</h1>
            <p>DRIVE A CLEANER TOMORROW</p>
          </div>
          <div class="body">
            <h2>New Customer Enquiry <span class="badge">WEBSITE LEAD</span></h2>

            <div class="highlight">
              <div class="field">
                <div class="field-label">Selected Model</div>
                <div class="field-value">${data.selectedScooter}</div>
              </div>
            </div>

            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${data.fullName}</div>
            </div>
            <div class="field">
              <div class="field-label">Mobile</div>
              <div class="field-value">${data.mobileNumber}</div>
            </div>
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${data.email || '—'}</div>
            </div>
            <div class="field">
              <div class="field-label">City</div>
              <div class="field-value">${data.city || '—'}</div>
            </div>
            <div class="field">
              <div class="field-label">Preferred Contact</div>
              <div class="field-value" style="text-transform: capitalize;">${data.preferredContact}</div>
            </div>

            ${data.message ? `
            <div style="margin-top: 24px;">
              <div class="field-label" style="margin-bottom: 8px;">Message</div>
              <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}

            <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <div class="field">
                <div class="field-label">Date &amp; Time</div>
                <div class="field-value">${now} (IST)</div>
              </div>
            </div>

            ${replyTo ? `<p style="margin-top: 20px; font-size: 13px; color: #64748b;">💡 You can reply to this email directly to reach the customer at <strong>${replyTo}</strong>.</p>` : ''}
          </div>
          <div class="footer">
            <p>This enquiry was submitted through the EV Empire website.</p>
            <p>© ${new Date().getFullYear()} EV Empire. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}
