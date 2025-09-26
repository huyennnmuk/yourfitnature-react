Here’s how you can adjust your current blog CSS variables and style rules to match the official Perplexity style:

## 1. Color Palette & Variables

Perplexity’s brand uses a modern, editorial-inspired palette centered on **teal (#20808D)**, **deep ink (#13343B / #091717)**, subtle off-whites (#FBFAF4), and gentle accents like **sky blue (#BADEDD)**. The emphasis is on vibrancy, trust, and approachable curiosity while remaining structured and readable.[1][2][3]

### Use these updated variable values:

```css
:root {
  /* Core Brand Colors */
  --blog-background: #FBFAF4;                /* Soft 'Paper White' */
  --perplexity-primary: #20808D;             /* Brand teal */
  --perplexity-heading: #13343B;             /* Deep ink for headings */
  --perplexity-link: #20808D;                /* Link/text accent */
  --perplexity-muted: #64645F;               /* Muted text/content */
  --perplexity-accent-bg: #BADEDD;           /* Sky blue accent, e.g. for blockquotes */
  --perplexity-table-border: #BADEDD;        /* Table border accent */
  --perplexity-code-bg: #E3F2F2;             /* Light blue for code background */
  --perplexity-hr: #CCCAB7;                  /* Subtle divider */
  --perplexity-text: rgba(19, 51, 59, 0.88); /* Rich ink prose color */
  --perplexity-heading-dark: #091717;        /* Ink for dark heading contexts */

  /* Font */
  --font-sans: 'FK Grotesk', 'Inter', 'Segoe UI', Arial, sans-serif;
}
```
Replace your current variable references with these for maximum consistency.

## 2. Example Style Adjustments

### Background

```css
.blog-post {
    background-color: var(--blog-background);
}
```

### Typography

```css
.prose-blog {
    color: var(--perplexity-text);
    font-family: var(--font-sans);
}

.prose-blog h1, .prose-blog h2, .prose-blog h3, 
.prose-blog h4, .prose-blog h5, .prose-blog h6 {
    color: var(--perplexity-heading);
    font-family: inherit;
    font-weight: 700;
    letter-spacing: -0.02em;
}
```

### Links

```css
.prose-blog a {
    color: var(--perplexity-link);
    text-decoration: underline;
    transition: color 0.2s;
}
.prose-blog a:hover {
    color: var(--perplexity-heading);
}
```

### Code & Pre Blocks

```css
.prose-blog pre {
    background-color: var(--perplexity-code-bg);
    border-radius: 8px;
    padding: 1em;
}
.prose-blog code {
    color: var(--perplexity-primary);
    background-color: var(--perplexity-code-bg);
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
}
.prose-blog pre code {
    background-color: transparent;
    padding: 0;
}
```

### Blockquotes

```css
.prose-blog blockquote {
    border-left: 4px solid var(--perplexity-accent-bg);
    color: var(--perplexity-primary);
    background: rgba(186, 222, 221, 0.1); /* Slight accent tint */
    padding-left: 1em;
}
```

### Tables, Dividers

```css
.prose-blog hr, .prose-blog th, .prose-blog td {
    border-color: var(--perplexity-table-border);
}
```

### Additional Notes

- **Font:** Perplexity favors 'FK Grotesk' but uses Inter/Segoe for web compatibility.[1]
- **Contrast:** Make sure text on backgrounds is high-contrast (e.g., headings on white, accent blues for highlights).
- **Design Language:** Avoid overly gray/sterile tones, stick with bold ink, editorial heading styles, and vibrant accent blues.

***

## 3. References for Brand Consistency

- Brand primary color (teal): #20808D[2][3]
- Heading/text ink: #13343B / #091717
- Background (Paper white): #FBFAF4
- Accent: #BADEDD
- Typography: FK Grotesk, Inter, Segoe UI[1]

***

## 4. Summary

Adopting these variables and style rules will make your blog’s appearance visually aligned with the official Perplexity branding and tone—lively, readable, and modern—while keeping technical implementation clean and scalable for future theming or extensions.[3][2][1]

[1] https://numinousco.com/the-perplexity-brand-identity/
[2] https://www.brandcolorcode.com/perplexity
[3] https://brandfetch.com/perplexity.ai
[4] https://www.perplexity.ai/hub/blog/introducing-perplexity-max
[5] https://www.sarasoueidan.com/blog/style-settings-with-css-variables/
[6] https://blog.prototypr.io/theming-with-css-variables-90cc4cdf41e9
[7] https://blog.maximeheckel.com/posts/the-power-of-composition-with-css-variables/
[8] https://www.elegantthemes.com/blog/design/understanding-css-variables-and-how-to-use-them
[9] https://dev.to/code_passion/css-variables-the-key-to-empowering-your-stylesheets-1b0n
[10] https://www.academyofcontinuingeducation.com/blog/perplexity-for-content-creation
[11] https://www.dhiwise.com/blog/design-converter/css-variables-clean-dynamic-and-smarter-styling
[12] https://www.digipixinc.com/blogs/technology/how-to-write-content-with-perplexity-ai/
[13] https://www.byteplus.com/en/topic/419693
[14] https://www.bennadel.com/blog/3552-css-custom-properties-aka-css-variables-dont-make-css-preprocessors-obsolete.htm
[15] https://www.reddit.com/r/perplexity_ai/comments/1gi00mm/perplexity_for_writing/
[16] https://www.reddit.com/r/perplexity_ai/comments/1g6ogbr/customize_the_entire_perplexity_user_interface/
[17] https://www.digidop.com/blog/difference-between-a-variable-and-a-css-class
[18] https://inspirednonsense.com/finding-my-writing-style-with-ai-3e1cc760b508
[19] https://www.perplexity.ai/page/material-you-color-schemes-jet-vpCnWZJfQFCmmN1mG_ry3w
[20] https://conffab.com/elsewhere/add-superpowers-to-your-css-variables-with-style-queries-that-html-blog/
[21] https://www.youtube.com/watch?v=VmjiE2mU2W8
[22] https://www.perplexity.ai/hub
[23] https://brandingstyleguides.com/guide/perplexity-ai/
[24] https://github.com/reworkd/perplexity-style-streaming
[25] https://docs.perplexity.ai/guides/prompt-guide
[26] https://www.youtube.com/watch?v=VSrcC0y0umc
[27] https://www.reddit.com/r/perplexity_ai/comments/1f5j7tv/i_made_an_extension_that_will_make_your_life/
[28] https://www.make.com/en/integrations/html-css-to-image/perplexity-ai
[29] https://www.perplexity.ai/help-center/en/articles/11144811-perplexity-labs
[30] https://www.reddit.com/r/perplexity_ai/comments/1gdy3cx/ui_customization_via_complexity_and_css/
[31] https://www.unintelligence.ai/post/use-perplexity-to-generate-simple-html
[32] https://sidsaladi.substack.com/p/perplexity-101-ultimate-guide-to
[33] https://flyonui.com/docs/customization/colors/
[34] https://webflow.copilotkit.ai/blog/build-a-perplexity-clone-with-copilotkit
[35] https://dev.to/paka/i-built-perplexity-ai-with-nextjs-and-open-source-llms-1gl3
[36] https://github.com/inulute/perplexity-ai-app/blob/main/index.html
[37] https://docs.perplexity.ai/llms-full.txt
[38] https://suntech.edu.vn/perplexity-chi-tiet-tu-a-z-danh-cho-nguoi-moi-bat-dau.sunpost.html
[39] https://github.com/birobirobiro/awesome-shadcn-ui
[40] https://n8n.io/workflows/2682-perplexity-research-to-html-ai-powered-content-creation/
[41] https://live.standards.site/perplexity/color
[42] https://brand.github.com/foundations/color
[43] https://www.wix.com/wixel/resources/brand-colors
[44] https://www.reddit.com/r/graphic_design/comments/15zwke2/my_clients_brand_hex_colour_is_not_reproducible/
[45] https://www.color-hex.com/color-palettes/
[46] https://www.chrisolsondesigns.com/blog/how-to-use-ai-to-pick-brand-colors-and-when-to-step-in-as-a-designer
[47] https://live.standards.site/perplexity