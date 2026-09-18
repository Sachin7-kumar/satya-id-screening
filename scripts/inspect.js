import fs from 'fs';

function inspectSlide(n) {
  const filePath = `template_unzipped/ppt/slides/slide${n}.xml`;
  const xml = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=================== SLIDE ${n} ===================`);
  
  // Find all <p:sp>
  const spRegex = /<p:sp\b[\s\S]*?<\/p:sp>/g;
  let match;
  let count = 0;
  while ((match = spRegex.exec(xml)) !== null) {
    count++;
    const sp = match[0];
    const nameMatch = sp.match(/name="([^"]+)"/);
    const idMatch = sp.match(/id="([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : 'Unknown';
    const id = idMatch ? idMatch[1] : '?';
    
    // Find paragraphs and text
    const textMatches = sp.match(/<a:t>[\s\S]*?<\/a:t>/g) || [];
    const text = textMatches.map(t => t.replace(/<\/?a:t>/g, '')).join(' ');
    
    // Extract position if present
    const offMatch = sp.match(/<a:off\s+x="([^"]+)"\s+y="([^"]+)"/);
    const extMatch = sp.match(/<a:ext\s+cx="([^"]+)"\s+cy="([^"]+)"/);
    const pos = offMatch ? `pos=(${offMatch[1]}, ${offMatch[2]}) size=(${extMatch ? extMatch[1] : 0}, ${extMatch ? extMatch[2] : 0})` : 'no pos';
    
    console.log(`Shape #${count} [id=${id}, name="${name}"] ${pos}:`);
    if (text) {
      console.log(`   Text: "${text}"`);
    } else {
      console.log(`   (No direct text)`);
    }
  }
}

for (let i = 1; i <= 7; i++) {
  inspectSlide(i);
}
