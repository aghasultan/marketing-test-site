from playwright.sync_api import sync_playwright

def verify_services_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the services page
        page.goto("http://localhost:4173/services.html")

        # Verify title
        title = page.title()
        print(f"Page title: {title}")
        assert "Services | Agha Sultan Naseer" in title

        # Take a screenshot of the top section (Hero + Meta Ads)
        page.screenshot(path="verification/services_top.png")
        print("Screenshot saved to verification/services_top.png")

        # Scroll down and capture another section (Client Wins)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.screenshot(path="verification/services_bottom.png")
        print("Screenshot saved to verification/services_bottom.png")

        browser.close()

if __name__ == "__main__":
    verify_services_page()
