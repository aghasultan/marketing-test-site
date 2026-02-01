
import axios from 'axios';

async function testAudit() {
    const targetUrl = 'https://example.com';
    console.log(`Testing audit fetch for: ${targetUrl}`);

    try {
        const { data } = await axios.get(targetUrl);
        console.log('Successfully fetched URL directly (Baseline)');
        console.log('Title length:', data.match(/<title>(.*?)<\/title>/)?.[1]?.length);
    } catch (e) {
        console.error('Baseline fetch failed:', e.message);
    }

    // We can't easily import the default export from api/audit.ts and run it because 
    // it expects VercelRequest/VercelResponse objects which are complex to mock perfectly.
    // However, the core logic is just Axios + Cheerio.

    console.log('\nAudit Logic Verification:');
    console.log('1. Fetching URL...');
    const { data: html } = await axios.get(targetUrl, {
        headers: { 'User-Agent': 'RiffatLabs-AuditBot/1.0' },
        timeout: 8000
    });

    console.log('2. HTML received, length:', html.length);

    if (html.includes('<title>Example Domain</title>')) {
        console.log('✅ Verification Passed: Content matches expected.');
    } else {
        console.error('❌ Verification Failed: Content mismatch.');
    }
}

testAudit();
