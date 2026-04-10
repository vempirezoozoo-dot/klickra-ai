import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImage(prompt: string, filename: string) {
  try {
    console.log(`Generating image for: ${prompt}`);
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      }
    });
    
    const base64Data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Data) {
      const buffer = Buffer.from(base64Data, 'base64');
      const filepath = path.join(process.cwd(), 'public', filename);
      fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true });
      fs.writeFileSync(filepath, buffer);
      console.log(`Saved ${filename}`);
    } else {
      console.error(`Failed to generate image for ${filename}`);
    }
  } catch (error) {
    console.error(`Error generating ${filename}:`, error);
  }
}

async function main() {
  await generateImage("Professional headshot of a confident female Chief Marketing Officer, Sarah Jenkins, in her 30s, wearing a stylish blazer, modern office background, realistic photography, 8k resolution, highly detailed", "testimonial-sarah.png");
  await generateImage("Professional headshot of a visionary male tech founder, David Chen, in his 40s, wearing a casual dark t-shirt, minimalist startup office background, realistic photography, 8k resolution, highly detailed", "testimonial-david.png");
  await generateImage("Professional headshot of a female VP of Marketing, Elena Rodriguez, in her 30s, wearing elegant corporate attire, bright modern office background, realistic photography, 8k resolution, highly detailed", "testimonial-elena.png");
}

main();
