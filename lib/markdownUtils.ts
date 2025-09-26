import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

export default async function markdownToHtml(markdown: string, idPrefix?: string) {
  let processedMarkdown = markdown;

  // Remove the first H1 from markdown string
  processedMarkdown = processedMarkdown.replace(/^(#\s.*)/m, '');

  // Remove the first line containing "Written by" or "Published on" from markdown string
  processedMarkdown = processedMarkdown.replace(/^(\*.*(Written by|Published on).*)\*$/m, '');


  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedMarkdown);
  
  let htmlResult = result.toString();

  if (idPrefix) {
    const sanitizedPrefix = idPrefix.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
    htmlResult = htmlResult.replace(/<(h[2-4])([^>]*)id="([^"]+)"/g, `<$1$2id="${sanitizedPrefix}-$3"`);
  }

  return htmlResult;
}