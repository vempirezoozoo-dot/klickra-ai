import fs from 'fs';
import path from 'path';
import https from 'https';

const download = (url: string, dest: string) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects if any
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location as string, dest).then(resolve).catch(reject);
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const prompts = [
    { 
      file: 'testimonial-sarah.png', 
      prompt: 'Professional headshot of a confident female Chief Marketing Officer in her 30s wearing a stylish blazer modern office background realistic photography' 
    },
    { 
      file: 'testimonial-david.png', 
      prompt: 'Professional headshot of a visionary male tech founder in his 40s wearing a casual dark t-shirt minimalist startup office background realistic photography' 
    },
    { 
      file: 'testimonial-elena.png', 
      prompt: 'Professional headshot of a female VP of Marketing in her 30s wearing elegant corporate attire bright modern office background realistic photography' 
    }
  ];

  for (const p of prompts) {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(p.prompt)}?width=256&height=256&nologo=true`;
    console.log(`Downloading ${p.file}...`);
    try {
      await download(url, path.join(publicDir, p.file));
      console.log(`Saved ${p.file}`);
    } catch (e) {
      console.error(`Failed to download ${p.file}:`, e);
    }
  }
}

main();
