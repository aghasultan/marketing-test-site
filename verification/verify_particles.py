from playwright.sync_api import Page, expect, sync_playwright

def verify_particles(page: Page):
    page.on("console", lambda msg: print(f"Console: {msg.text}"))
    page.on("pageerror", lambda exc: print(f"PageError: {exc}"))

    try:
        page.goto("http://localhost:5173")
        page.wait_for_timeout(3000) # Wait for particles to init

        # Check for canvas
        canvas = page.locator("#interactive-bg")
        expect(canvas).to_be_visible()

        # Check title still there
        expect(page.get_by_role("heading", name="Marketing Platform Migration")).to_be_visible()

        # Take screenshot
        page.screenshot(path="verification/particles_verification.png")
        print("Screenshot saved to verification/particles_verification.png")
    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error_particles.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_particles(page)
        except Exception as e:
            print(f"Outer Error: {e}")
        finally:
            browser.close()
