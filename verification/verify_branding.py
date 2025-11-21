from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_branding(page: Page):
    # 1. Navigate to the home page
    page.goto("http://localhost:8080/")

    # 2. Verify the logo image is present and visible
    logo_img = page.locator("a.logo img")
    expect(logo_img).to_be_visible()

    # 3. Verify the logo source and dimensions
    src = logo_img.get_attribute("src")
    assert src == "/assets/img/Riffat Labs Transparent.svg"

    # Check css properties if needed (e.g. height) via evaluation
    height = logo_img.evaluate("el => window.getComputedStyle(el).height")
    print(f"Logo height: {height}")

    # 4. Verify favicon (head element)
    favicon = page.locator('link[rel="icon"]')
    expect(favicon).to_have_attribute("href", "/assets/img/Riffat Labs Favicon 180180 Transparent.svg")

    # 5. Take screenshot
    page.screenshot(path="verification/verification.png", full_page=False)

    # 6. Also check services page
    page.goto("http://localhost:8080/services.html")
    expect(page.locator("a.logo img")).to_be_visible()
    page.screenshot(path="verification/verification_services.png", full_page=False)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_branding(page)
        finally:
            browser.close()
