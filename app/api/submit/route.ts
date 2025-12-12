import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fileUrl = formData.get("video_url") as string;
    const driveId = fileUrl.match(/\/d\/([^/]+)/)?.[1];

    if (!driveId) {
      return new Response("Invalid Google Drive URL", { status: 400 });
    }

    formData.set("video_url", driveId);

    // Forward the form data directly to n8n webhook
    const response = await fetch(
      'https://socialbeacons.app.n8n.cloud/webhook/699326c2-6732-4663-8f82-df0d8773a198',
      {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - fetch will set multipart/form-data with boundary automatically
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Webhook error: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.text();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

