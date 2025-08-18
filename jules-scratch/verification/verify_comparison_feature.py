from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the admin page
        page.goto("http://localhost:4200/admin")

        # 2. Click on the "Comparison" tab
        comparison_tab = page.get_by_role("tab", name="Comparison")
        comparison_tab.click()

        # 3. Select a business from the dropdown
        business_select = page.get_by_label("Select a Business")
        business_select.click()
        page.get_by_role("option").first.click()

        # 4. Wait for the comparison data to load and take a screenshot
        expect(page.get_by_text("Included Categories")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/business_to_category.png")

        # 5. Select a category from the dropdown
        category_select = page.get_by_label("Select a Category")
        category_select.click()
        page.get_by_role("option").first.click()

        # 6. Wait for the comparison data to load and take a screenshot
        expect(page.get_by_text("Included Businesses")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/category_to_business.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
