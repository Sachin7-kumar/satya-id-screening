import fs from 'fs';
import path from 'path';

// Helper to escape XML special characters
function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate paragraph XML for Section Heading
export function makeHeadingParagraph(text) {
  return `
    <a:p>
      <a:pPr marL="342900" indent="-342900">
        <a:spcBef><a:spcPts val="1200"/></a:spcBef>
        <a:spcAft><a:spcPts val="400"/></a:spcAft>
        <a:buFont typeface="Arial" pitchFamily="34" charset="0"/>
        <a:buChar char="▶"/>
      </a:pPr>
      <a:r>
        <a:rPr lang="en-US" sz="2600" b="1" dirty="0">
          <a:solidFill><a:schemeClr val="accent1"/></a:solidFill>
          <a:latin typeface="Arial" pitchFamily="34" charset="0"/>
          <a:cs typeface="Arial" pitchFamily="34" charset="0"/>
        </a:rPr>
        <a:t>${escapeXml(text)}</a:t>
      </a:r>
    </a:p>`;
}

// Generate paragraph XML for Bullet Item
export function makeBulletParagraph(boldPrefix, text) {
  return `
    <a:p>
      <a:pPr marL="450000" indent="-250000" algn="just">
        <a:spcBef><a:spcPts val="300"/></a:spcBef>
        <a:spcAft><a:spcPts val="200"/></a:spcAft>
        <a:buFont typeface="Arial" pitchFamily="34" charset="0"/>
        <a:buChar char="•"/>
      </a:pPr>
      ${boldPrefix ? `
      <a:r>
        <a:rPr lang="en-US" sz="2000" b="1" dirty="0">
          <a:solidFill><a:schemeClr val="tx1"/></a:solidFill>
          <a:latin typeface="Arial" pitchFamily="34" charset="0"/>
          <a:cs typeface="Arial" pitchFamily="34" charset="0"/>
        </a:rPr>
        <a:t>${escapeXml(boldPrefix)} </a:t>
      </a:r>` : ''}
      <a:r>
        <a:rPr lang="en-US" sz="2000" dirty="0">
          <a:solidFill><a:schemeClr val="tx1"/></a:solidFill>
          <a:latin typeface="Arial" pitchFamily="34" charset="0"/>
          <a:cs typeface="Arial" pitchFamily="34" charset="0"/>
        </a:rPr>
        <a:t>${escapeXml(text)}</a:t>
      </a:r>
    </a:p>`;
}

// Generate paragraph XML for Sub-Bullet Item
export function makeSubBulletParagraph(boldPrefix, text) {
  return `
    <a:p>
      <a:pPr marL="750000" indent="-250000" algn="just">
        <a:spcBef><a:spcPts val="150"/></a:spcBef>
        <a:spcAft><a:spcPts val="150"/></a:spcAft>
        <a:buFont typeface="Arial" pitchFamily="34" charset="0"/>
        <a:buChar char="–"/>
      </a:pPr>
      ${boldPrefix ? `
      <a:r>
        <a:rPr lang="en-US" sz="1800" b="1" dirty="0">
          <a:solidFill><a:schemeClr val="tx2"/></a:solidFill>
          <a:latin typeface="Arial" pitchFamily="34" charset="0"/>
          <a:cs typeface="Arial" pitchFamily="34" charset="0"/>
        </a:rPr>
        <a:t>${escapeXml(boldPrefix)} </a:t>
      </a:r>` : ''}
      <a:r>
        <a:rPr lang="en-US" sz="1800" dirty="0">
          <a:solidFill><a:schemeClr val="tx2"/></a:solidFill>
          <a:latin typeface="Arial" pitchFamily="34" charset="0"/>
          <a:cs typeface="Arial" pitchFamily="34" charset="0"/>
        </a:rPr>
        <a:t>${escapeXml(text)}</a:t>
      </a:r>
    </a:p>`;
}

console.log('Helper functions created successfully');
