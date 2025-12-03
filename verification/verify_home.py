
from playwright.sync_api import sync_playwright

def verify_home_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the built production site (assuming we serve dist or dev)
        # Since I just built it, I can serve it. But wait, serving static files?
        # Better to run dev server in background and check localhost.
        page.goto('http://localhost:5173/')

        # Wait for content to load
        page.wait_for_selector('h1#hero-title')

        # Check if images are loaded (naturalWidth > 0)
        # Specifically check one of the client logos
        # Note: SVG might behave differently, but let's check visibility
        img = page.locator('img[alt="Epic Resource Group"]').first
        if img.is_visible():
            print('Client logo is visible')
        else:
            print('Client logo is NOT visible')

        # Take a screenshot
        page.screenshot(path='verification/home_page.png', full_page=True)
        browser.close()

if __name__ == '__main__':
    verify_home_page()
