# Fonts

The site self-hosts its fonts. Nothing is requested from Google Fonts or any
other third party, which is faster on slow mobile connections and avoids a
third-party privacy dependency.

## What goes in this folder

Four WOFF2 files, with exactly these names:

    playfair-display-600.woff2
    playfair-display-700.woff2
    inter-400.woff2
    inter-600.woff2

These names are already referenced in the @font-face rules at the top of
/assets/css/site.css. Match the names and nothing else needs changing.

## Why the folder is empty right now

Font binaries are not committed here yet. Until they are added, the site falls
back to Georgia (headings) and the system UI sans-serif (body). The design still
reads correctly; it simply is not yet in the brand faces.

## How to get the files

Both families are open source and free to self-host.

1. Playfair Display and Inter are both released under the SIL Open Font
   License 1.1. Download the static WOFF2 builds from the official project
   pages or from any tool that produces self-hosting bundles.
2. Take only the weights listed above. Do not add more: each extra weight is
   another 20-40 KB that mobile users in the region have to download.
3. Use the Latin subset. The site is in English and does not need Cyrillic,
   Greek or Vietnamese ranges.
4. Rename the files exactly as listed above.
5. Drop them into this folder and commit. Cloudflare Pages will deploy them
   within about a minute.

Expected total weight for all four files, Latin subset only: roughly 90-130 KB,
cached for a year by the rules in /_headers.

## Substituting different faces

If the brand guidelines specify Libre Baskerville instead of Playfair Display,
or Poppins instead of Inter, replace the files and update two things in
/assets/css/site.css: the four @font-face blocks in section 1, and the --serif
and --sans variables in section 2. Nothing else in the stylesheet refers to a
font by name.
