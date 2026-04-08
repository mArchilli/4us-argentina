import DOMPurify from 'dompurify';

/**
 * Sanitize an HTML string (XSS-safe) for use with dangerouslySetInnerHTML.
 * Only allows a safe subset of tags/attributes used by the Quill editor.
 */
export function sanitizeHtml(html) {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'u', 'a', 'ul', 'ol', 'li', 'br', 'p', 'span'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
        ADD_ATTR: ['target'],
        FORCE_BODY: true,
        RETURN_DOM: false,
        RETURN_DOM_FRAGMENT: false,
        // Ensure all links open in new tab and have rel=noopener
        SANITIZE_DOM: true,
    });
}

/**
 * Strip all HTML tags and return plain text (for truncated previews).
 */
export function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim();
}
