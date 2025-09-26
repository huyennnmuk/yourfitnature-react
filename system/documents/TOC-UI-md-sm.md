For the best UI, how a table of contents (ToC) displays on medium and small screens should prioritize usability, accessibility, and visual clarity. Here are key patterns and best practices for both screen sizes, backed by recent UI/UX guidance:

***

## Medium Screen (Tablet, Small Desktop)

- **Expandable/Collapsible TOC at Top:** On medium screens, the ToC often transforms into an expandable component docked at the top of the content area. It can float above the main text with a slight shadow to provide visual separation and hierarchy, helping it stand out without being obtrusive.
- **Sticky Positioning:** Make the ToC sticky so it remains visible as users scroll, ideally at the top of the viewport. This allows for constant navigation while not taking up excessive width.[1][2]
- **Show Hierarchy Clearly:** Maintain indentation or visual cues for sub-sections, but avoid excessive depth to preserve compactness.
- **Truncated Links:** Use `text-overflow: ellipsis;` or similar CSS for long headings, ensuring single-line items for brevity and readability.
- **Active Indicator:** Indicate the current section actively (e.g., colored dot or highlight) as the user scrolls, offering feedback on page progress.[2]
- **Touch Targets:** Ensure all ToC links are touch-friendly and not too small.

***

## Small Screen (Mobile)

- **Collapsible Drawer/Pop-up:** On mobile, the best pattern is a collapsible ToC, accessible via a button (often labeled “Contents” or an icon). The ToC opens as a bottom sheet, full-screen overlay, or a modal list, minimizing interference with the main content.[3][4][2]
- **Full Utilization of Width:** When expanded, the ToC should use the full width of the screen for easy tap targets.
- **Scrollability:** Allow vertical scrolling for longer ToCs, so every section remains reachable.
- **Minimal Hierarchy:** Avoid deep indenting—show main headings and 1–2 sub-levels at most; use font size, weight, or color to suggest hierarchy without crowding.
- **Active Heading Preview:** When collapsed, show the currently active section’s title or icon.
- **Big Touch Targets:** Touch targets must be large enough for easy tapping. Increase font size and padding.
- **Accessible and Screen Reader Friendly:** Use proper semantic elements (``, ``, ARIA roles) and clear labels (“Table of Contents”) so the ToC works well for assistive technologies.[1][2]

***

## Additional UI Tips

- **Consistent Labeling:** Always use a clear, visible label for the ToC section (“Contents”, “In this article”, etc.).[1]
- **Visual Boundaries:** Separate ToC from body content with dividers or color blocks to prevent confusion with inline links.
- **Smooth Scrolling:** Enable smooth scrolling to anchor points for a polished navigation feel.[1]
- **Avoid Global Navigation Confusion:** On mobile, don’t let the ToC bar or modal resemble site/global navigation—use distinct styling.

***

## Example UI Behaviors

| Screen Size   | ToC Placement           | Expanded State      | Collapsed State                   | Hierarchy   | Active Indicator | Accessibility   |
|---------------|------------------------|--------------------|-----------------------------------|-------------|------------------|-----------------|
| Medium        | Top, sticky/floating   | Expand/collapse    | Mini-menu or icon/button          | 1–2 levels  | Highlight/dot    | Yes             |
| Small         | Drawer/overlay/modal   | Full-width, scroll | Title of active section or button | Flat/1 level| Highlight/dot    | Yes             |

***

### References:
- NN/g’s table-of-contents design guide and mobile video[3][1]
- Modern examples (collapsible, sticky, touch-friendly ToC)[4][2]
- Good design principles from Avada, CSS Tricks, and others[5][6]

Using these patterns ensures your table of contents delivers the best possible user experience on all device sizes.

[1] https://www.nngroup.com/articles/table-of-contents/
[2] https://arun.is/blog/table-of-contents/
[3] https://www.nngroup.com/videos/mobile-table-of-contents/
[4] https://paul.kinlan.me/another-experiment-in-creating-a-mobile-friendly-table-of-contents/
[5] https://css-tricks.com/a-perfect-table-of-contents-with-html-css/
[6] https://avada.com/documentation/table-of-contents-element/
[7] https://www.pinterest.com/jennifers7777/table-of-contents-design/
[8] https://www.canva.com/learn/table-of-contents-design/
[9] https://www.justinmind.com/ui-design/data-table
[10] https://www.tenscope.com/post/table-ui-design-tips-common-issues
[11] https://www.postermywall.com/index.php/posters/search?s=table+of+contents+design
[12] https://www.reddit.com/r/web_design/comments/1b4nzud/best_way_to_design_tables_on_mobile/
[13] https://www.eleken.co/blog-posts/tabs-ux
[14] https://helpx.adobe.com/indesign/using/creating-table-contents.html
[15] https://uxdesign.cc/how-to-make-tables-fit-on-small-screens-spoiler-you-probably-cant-and-maybe-you-shouldn-t-9582111cdb1d
[16] https://www.dronahq.com/table-ui-design/
[17] https://www.youtube.com/watch?v=s7nvF1PuAWY
[18] https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables
[19] https://stackoverflow.com/questions/25764551/how-to-properly-display-wide-tables-on-small-screens
[20] https://blog.urlaunched.com/mobile-ui-design-10-best-practices/