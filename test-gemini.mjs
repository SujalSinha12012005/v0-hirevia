import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const apiKey = process.env.GEMINI_API_KEY;

async function run() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await res.json();
  if (data.models) {
    console.log("SUPPORTED MODELS:");
    for (const m of data.models) {
      console.log(m.name);
    }
  } else {
    console.log(data);
  }
}

run();
