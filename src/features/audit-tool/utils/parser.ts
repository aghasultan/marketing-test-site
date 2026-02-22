export interface AuditParseResults {
    pixelFound: boolean;
    seoTitleFound: boolean;
    seoDescriptionFound: boolean;
}

export function parseAuditHtml(htmlString: string): AuditParseResults {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // 1. Detect Meta Pixel
    let pixelFound = false;
    const scripts = Array.from(doc.querySelectorAll('script'));
    for (const script of scripts) {
        if (script.textContent && (script.textContent.includes('fbq(') || script.textContent.includes('connect.facebook.net'))) {
            pixelFound = true;
            break;
        }
        if (script.src && script.src.includes('connect.facebook.net')) {
            pixelFound = true;
            break;
        }
    }

    // Check noscript if script check failed
    if (!pixelFound) {
        if (htmlString.includes('facebook.com/tr')) {
            pixelFound = true;
        }
    }

    // 2. Detect SEO Tags
    const title = doc.querySelector('title');
    const seoTitleFound = !!title && title.textContent !== '';

    const metaDesc = doc.querySelector('meta[name="description"]');
    const seoDescriptionFound = !!metaDesc && !!metaDesc.getAttribute('content');

    return {
        pixelFound,
        seoTitleFound,
        seoDescriptionFound,
    };
}
