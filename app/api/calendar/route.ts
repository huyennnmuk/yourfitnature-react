import { NextRequest, NextResponse } from 'next/server';

const sessionData: any = {
    follicular: {
      phase: 'Follicular',
      date: 'September 15, 2025',
      time: '10:00 AM PST',
    },
    ovulatory: {
      phase: 'Ovulatory',
      date: 'September 22, 2025',
      time: '10:00 AM PST',
    },
    luteal: {
      phase: 'Luteal',
      date: 'September 29, 2025',
      time: '10:00 AM PST',
    },
    menstrual: {
      phase: 'Menstrual',
      date: 'October 6, 2025',
      time: '10:00 AM PST',
    },
    'all-sessions': {
      phase: 'All Sessions',
      date: 'Multiple Dates',
      time: 'See Emails for Details',
    }
  };

const toICSDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d{3}/g, '');
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const session = searchParams.get('session') || 'follicular';
    const workshop = sessionData[session as keyof typeof sessionData] || sessionData.follicular;

    if (workshop.date === 'Multiple Dates') {
        return new NextResponse('Cannot generate calendar for all sessions.', { status: 400 });
    }

    const eventDate = new Date(`${workshop.date} ${workshop.time}`);
    const startDate = toICSDate(eventDate);
    const endDate = toICSDate(new Date(eventDate.getTime() + 60 * 60 * 1000));

    const title = `Bloating & Hormones Workshop: ${workshop.phase} Phase`;
    const description = `Join us for the FitNature Bloating & Hormones Workshop! This session focuses on the ${workshop.phase} phase.`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourFitNature//EN
BEGIN:VEVENT
UID:${Date.now()}@yourfitnature.com
DTSTAMP:${startDate}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

    return new NextResponse(icsContent, {
        status: 200,
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Content-Disposition': `attachment; filename="workshop-${session}.ics"`,
        }
    });
}
