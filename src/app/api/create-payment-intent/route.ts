// app/api/create-payment-intent/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

interface PaymentRequest {
    amount: number
    paymentMethodId: string
    customerId?: string
    email?: string
    metadata?: {
        orderId: string
        items: string
    }
}

const stripe = new Stripe('kluc', {
    apiVersion: '2025-02-24.acacia', // Updated API version
    typescript: true
})

export async function POST(req: Request) {
    try {
        const { amount, paymentMethodId, customerId, email, metadata } = await req.json() as PaymentRequest

        // Validate required fields
        if (!amount || typeof amount !== 'number') {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            )
        }
        if (!paymentMethodId) {
            return NextResponse.json(
                { error: 'Missing payment method ID' },
                { status: 400 }
            )
        }

        // Customer management
        let customer: Stripe.Customer | null = null
        if (customerId) {
            customer = await stripe.customers.retrieve(customerId) as Stripe.Customer
        } else if (email) {
            const customers = await stripe.customers.list({ email })
            customer = customers.data[0] ?? await stripe.customers.create({ email })
        }

        // Create and confirm PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'eur',
            payment_method: paymentMethodId,
            customer: customer?.id,
            metadata: metadata ?? {},
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never', // Disable redirect-based payment methods
            },
        })

        // Handle confirmation status
        if (paymentIntent.status !== 'succeeded') {
            return NextResponse.json(
                {
                    error: 'Payment requires additional authentication',
                    clientSecret: paymentIntent.client_secret,
                    requiresAction: true
                },
                { status: 200 }
            )
        }

        return NextResponse.json({
            success: true,
            transactionId: paymentIntent.id,
            customerId: customer?.id,
            amount: amount,
            status: paymentIntent.status
        })

    } catch (error) {
        console.error('Error in create-payment-intent:', error) // Log the error for debugging
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json(
            { error: `Payment failed: ${errorMessage}` },
            { status: 500 }
        )
    }
}