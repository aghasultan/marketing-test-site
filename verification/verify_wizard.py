from playwright.sync_api import Page, expect, sync_playwright
import os

def verify_wizard(page: Page):
    print("Navigating to apply.html...")
    # Navigate to apply.html served by http-server
    page.goto("http://localhost:4173/apply.html")

    print("Taking initial screenshot...")
    # Take a screenshot of the initial state
    page.screenshot(path="verification/wizard_initial.png")

    # Try to interact if possible (might fail if JS is broken due to liquid tags)
    try:
        print("Attempting to fill form...")
        page.fill("#name", "Test User")
        page.screenshot(path="verification/wizard_filled.png")
        print("Form filled.")
    except Exception as e:
        print(f"Interaction failed: {e}")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_wizard(page)
        finally:
            browser.close()
