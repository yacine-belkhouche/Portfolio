import sharp from "sharp";

// Measured from the 1800x4000 original:
//   hair top ~407, chin ~793, shoulders ~879, knees ~2529, shoes end ~3557
//   figure spans x 506 -> 1371 (centre 938)
const CROP = { left: 242, top: 217, width: 1393, height: 2533 }; // aspect 0.550

await sharp("assets/me1-original.jpeg")
  .rotate()
  .extract(CROP)
  .resize({ width: 1200 })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("public/profile.jpg");

// small copy for me to eyeball
await sharp("public/profile.jpg").resize({ width: 400 }).toFile("preview.jpg");

const m = await sharp("public/profile.jpg").metadata();
const { size } = await sharp("public/profile.jpg").toBuffer({ resolveWithObject: true }).then(r => r.info);
console.log(`profile.jpg ${m.width}x${m.height} aspect ${(m.width / m.height).toFixed(3)} ~${Math.round(size / 1024)}KB`);
