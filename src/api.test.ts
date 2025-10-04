import { fetch } from 'undici';

// Simple API test: POST an array of songs to /songs and print result.
// NOTE: The server must be running (npm run start) for this test to succeed.
async function run() {
  const url = process.env.API_URL ?? 'http://localhost:4000/songs';
  const sample = [
    { title: `Test Song ${Date.now()}`, artist: 'Test Artist' },
    { title: `Another Test ${Date.now()}`, artist: 'Test Artist 2' },
  ];

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(sample),
    });

    const body = await res.json().catch(() => null);
    console.log('Status:', res.status);
    console.log('Response:', body);

    if (!res.ok) process.exit(2);
    process.exit(0);
  } catch (err) {
    console.error('API test failed:', err);
    process.exit(1);
  }
}

run();
