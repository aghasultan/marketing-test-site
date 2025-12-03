from playwright.sync_api import Page, expect, sync_playwright

def verify_skeleton(page: Page):
    page.on("console", lambda msg: print(f"Console: {msg.text}"))
    page.on("pageerror", lambda exc: print(f"PageError: {exc}"))

    try:
        page.goto("http://localhost:5173")
        page.wait_for_timeout(2000)

        expect(page.get_by_role("heading", name="Marketing Platform Migration")).to_be_visible()

        page.screenshot(path="verification/skeleton_verification.png")
    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error_screenshot.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_skeleton(page)
        except Exception as e:
            print(f"Outer Error: {e}")
        finally:
            browser.close()
