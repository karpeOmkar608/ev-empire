import { NextRequest, NextResponse } from 'next/server'
import { enquirySchema } from '@/lib/validation'
import { sendEnquiryEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate with Zod
    const result = enquirySchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: result.error.flatten() },
        { status: 400 }
      )
    }

    const data = result.data

    // Honeypot check — if filled by a bot, silently succeed
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Enquiry received.' })
    }

    // Send email
    await sendEnquiryEmail(data)

    return NextResponse.json(
      { success: true, message: 'Enquiry sent successfully.' },
      { status: 200 }
    )
  } catch (error) {
    // Do NOT expose error details to client
    console.error('[Enquiry API] Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send enquiry.' },
      { status: 500 }
    )
  }
}
