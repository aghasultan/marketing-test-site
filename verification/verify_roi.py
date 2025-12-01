from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to index.html
            page.goto("http://localhost:4173")

            # Wait for form
            page.wait_for_selector("#roi-form")

            # Fill inputs
            page.fill("#monthly-spend", "10000")
            page.fill("#hours-week", "10")
            page.fill("#hourly-rate", "100")

            # Check results
            # Annual Labor Savings = 10 * 100 * 52 = 52000
            # Ad Waste Savings = 10000 * 0.20 * 12 = 24000
            # Total Upside = 52000 + 24000 = 76000
            # ROI = (76000 / (10000 * 12)) * 100 = (76000 / 120000) * 100 = 63.33 -> 63%

            # Wait for update
            page.wait_for_timeout(1000)

            savings_text = page.inner_text("#projected-savings")
            roi_text = page.inner_text("#annual-roi")

            print(f"Savings: {savings_text}")
            print(f"ROI: {roi_text}")

            # Take screenshot of ROI section
            roi_section = page.locator("#roi-calculator")
            roi_section.scroll_into_view_if_needed()
            page.screenshot(path="verification/roi_verification.png")

            if "6,000" in savings_text and "63%" in roi_text:
                print("Verification Passed")
            else:
                print("Verification Failed")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
