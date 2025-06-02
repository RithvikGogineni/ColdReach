import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, recipient, url, tone, followUp, plan } = body;

    let scrapedData = '';

    // If Pro + URL provided, fetch data using ScrapingBee + Proxycurl
    if (plan === 'pro' && url) {
      try {
        const beeRes = await axios.get('https://app.scrapingbee.com/api/v1', {
          params: {
            api_key: process.env.SCRAPINGBEE_API_KEY,
            url: url,
            render_js: false,
          },
        });

        const proxycurlRes = await axios.get('https://nubela.co/proxycurl/api/v2/linkedin', {
          headers: { Authorization: `Bearer ${process.env.PROXYCURL_API_KEY}` },
          params: { url: url },
        });

        scrapedData = `${beeRes.data?.text?.slice(0, 1000) || ''}\n${JSON.stringify(proxycurlRes.data).slice(0, 1000)}`;
      } catch (err) {
        console.error('Scraping failed:', err);
      }
    }

    const prompt = `
You are a cold email assistant.

Write 3 personalized email drafts based on the following:
- Product/Service: ${product}
- Target Recipient: ${recipient}
- Tone: ${tone}
- ${followUp ? 'Include a follow-up idea.' : ''}
${scrapedData ? `\nUse the following context data:\n${scrapedData}` : ''}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const output = response.choices[0].message?.content || '';
    const emails = output.split(/\n\n+/).filter((e: string) => e.trim().length > 0);
    return NextResponse.json({ emails });
  } catch (err) {
    console.error('OpenAI Error:', err);
    return NextResponse.json({ error: 'Failed to generate emails.' }, { status: 500 });
  }
}
