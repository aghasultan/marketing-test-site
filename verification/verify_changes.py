from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait for server to start
            page.goto("http://localhost:5173")
            page.wait_for_load_state("networkidle")

            # 1. Verify Home Page
            # Check for new sections
            page.locator("#services").scroll_into_view_if_needed()
            page.screenshot(path="verification/home_services.png")

            page.locator("#about").scroll_into_view_if_needed()
            page.screenshot(path="verification/home_about.png")

            # Check numbering
            # Expect "01 Performance Paid Media" in Hero (Actually now 01 is in Hero, 02 in Services)
            # Wait, my plan said:
            # Hero: 01
            # Services: 02 (with cards 01, 02, 03 inside? No, prompt said "Locate the 'Section Label' components... Ensure they increment correctly (01 -> 02 -> 03) down the page")
            # In my Home.tsx:
            # Hero: 01 Performance Paid Media
            # Services: 02 Services
            # Skills: 03 Systematic Authority
            # ROI: 04 Value Engineering
            # About: 05 About
            # This seems to follow the incrementing logic for SECTIONS.
            # But the prompt also mentioned "01 -> 02 -> 03" logic for section labels.

            # Let's take a screenshot of the whole page (scrolling)
            page.screenshot(path="verification/home_full.png", full_page=True)

            # 2. Verify Apply Page
            page.goto("http://localhost:5173/apply")
            page.wait_for_load_state("networkidle")
            page.screenshot(path="verification/apply_page.png")

            # Verify Wizard interaction
            page.fill("input[name='name']", "Test User")
            page.fill("input[name='email']", "test@example.com")
            page.fill("input[name='company']", "Test Co")
            page.click("button:has-text('Next')")
            page.screenshot(path="verification/apply_step2.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
