import markdownToHtml from './markdownUtils';

describe('markdownToHtml', () => {
  it('converts markdown to HTML correctly', async () => {
    const markdown = '# Hello World\n\nThis is **bold** text.';
    const html = await markdownToHtml(markdown);
    expect(html).toContain('<h1>Hello World</h1>');
    expect(html).toContain('<p>This is <strong>bold</strong> text.</p>');
  });

  it('handles empty markdown', async () => {
    const markdown = '';
    const html = await markdownToHtml(markdown);
    expect(html).toBe('');
  });
});
