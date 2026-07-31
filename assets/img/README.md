# Images

Everything in this folder is a placeholder except where noted. Replace the
files, keep the filenames, and no HTML needs to change.

## Files the site expects

### logo-mcs-horizontal.svg  (placeholder present)
The header lockup. Must be WIDE - roughly 5:1 to 7:1. The header sizes it by
height (44px on desktop, 36px on mobile) and lets the width run, so a wide
lockup fits without any layout change. Supply SVG with text converted to
outlines. Do not supply a square version for this slot.

### favicon.svg  (placeholder present)
The square mark, used as the browser favicon. Square canvas, generous internal
padding, legible at 16 x 16 pixels.

### apple-touch-icon.png  (NOT YET SUPPLIED)
180 x 180 PNG, square mark on a solid background - transparency renders badly
on iOS home screens. Referenced from every page.

### og-image.png  (NOT YET SUPPLIED)
1200 x 630 PNG. This is the preview card shown when a page is shared on
LinkedIn, WhatsApp or X. Suggested composition: ivory ground, the horizontal
lockup left-aligned, a thin gold rule, and the line "Governance, legal reform
and development" beneath. Keep text well inside the edges.

### person-placeholder.svg  (placeholder present)
Stands in for each director portrait until the real photographs arrive.

### director-one / director-two / director-three  (NOT YET SUPPLIED)
Director portraits. Save as WebP if possible, JPEG otherwise:

    director-one.webp
    director-two.webp
    director-three.webp

Specification: 4:5 portrait ratio, at least 800 x 1000 pixels, plain or softly
blurred background, even light, waist-up, consistent treatment across all three.
No group shots. Then update the three img src and alt attributes in
/our-people/index.html.

## Weight budget

Many visitors will be on mobile data in West Africa. Keep each photograph under
80 KB after compression - a 4:5 WebP at quality 75 will normally land around
40-60 KB. Run any JPEG or PNG through an optimiser such as Squoosh before
committing. Do not commit files straight from a camera or phone.

## House rules on imagery

No stock photography of handshakes, globes, city skylines or people in meeting
rooms. The visual language is restrained: white and ivory grounds, thin gold
rules, sand blocks, and portraits of real people. If an image is not a portrait
or the logo, it probably should not be on the site.
