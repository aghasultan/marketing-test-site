from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Verify index.html
    page.goto("http://127.0.0.1:4173/index.html")

    # Check if logo text is gone
    logo_text = page.locator(".logo-text")
    count = logo_text.count()
    print(f"Found {count} .logo-text elements on index.html (should be 0)")

    # Check logo size
    logo_wrapper = page.locator(".logo-icon-wrapper").first
    box = logo_wrapper.bounding_box()
    print(f"Logo wrapper size: {box['width']}x{box['height']}")

    page.screenshot(path="verification/verification_index.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
