import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName, challenge } = await req.json();

    if (!email || !firstName || !challenge) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: { name: `${firstName} ${lastName || ''}`.trim() },
      create: {
        email,
        name: `${firstName} ${lastName || ''}`.trim(),
      },
    });

    const registration = await prisma.challengeRegistration.create({
      data: {
        userId: user.id,
        challenge,
      },
    });

    

    // Subscribe user to WordPress
    try {
      const wordpressSubscribeApiUrl = process.env.WORDPRESS_SUBSCRIBE_API_URL;
      const wordpressUsername = process.env.WORDPRESS_USERNAME;
      const wordpressApplicationPassword = process.env.WORDPRESS_APPLICATION_PASSWORD;

      if (wordpressSubscribeApiUrl && wordpressUsername && wordpressApplicationPassword) {
        const response = await fetch(wordpressSubscribeApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${wordpressUsername}:${wordpressApplicationPassword}`).toString('base64')}`,
          },
          body: JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName,
            challenge,
          }),
        });

        if (!response.ok) {
          console.error('Failed to subscribe user to WordPress:', await response.json());
        }
      }
    } catch (error) {
      console.error('Error subscribing user to WordPress:', error);
    }

    return NextResponse.json({ message: 'Registration successful', registration }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'An error occurred during registration.' }, { status: 500 });
  }
}
