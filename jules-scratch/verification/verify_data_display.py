from playwright.sync_api import Page, expect

def test_data_display(page: Page):
    """
    This test verifies that the data is displayed correctly in the
    Business and Category tabs.
    """
    # 1. Arrange: Go to the application homepage.
    page.goto("http://localhost:4200")

    # 2. Act: Click the "Admin" link.
    admin_link = page.get_by_role("link", name="Admin")
    admin_link.click()

    # 3. Assert: Check for the "Business" and "Category" tabs.
    expect(page).to_have_url("http://localhost:4200/admin")
    business_tab = page.get_by_role("link", name="Business")
    category_tab = page.get_by_role("link", name="Category")
    expect(business_tab).to_be_visible()
    expect(category_tab).to_be_visible()

    # 4. Screenshot: Capture the Admin page (Business tab by default).
    page.screenshot(path="jules-scratch/verification/01_business_tab.png")

    # 5. Act: Click the "Category" tab.
    category_tab.click()

    # 6. Assert: Check that the category component is loaded.
    expect(page).to_have_url("http://localhost:4200/admin/category")

    # 7. Screenshot: Capture the Category page.
    page.screenshot(path="jules-scratch/verification/02_category_tab.png")
