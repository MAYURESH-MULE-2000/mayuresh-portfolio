/**
 * Minimal inline markdown for the case study content blocks:
 * **bold**, *italic* and `code`. Everything else is left as authored.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function parseRichText(text?: string): string {
  if (!text) return ''

  // Escape first: the result is injected with v-html, so `<script>` in a
  // content file has to stay text rather than becoming an element.
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(?!\s)([^*]+?)\*/g, '<em>$1</em>')
    .replace(
      /`([^`]+?)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[0.9em]">$1</code>'
    )
}
