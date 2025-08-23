from playwright.sync_api import sync_playwright, Page, expect

def verify_fixes(page: Page):
    """
    This script verifies the two fixes:
    1. Pie chart click shows transactions.
    2. Category monthly summary chart is sorted by date.
    """
    page.goto("http://localhost:4300/")

    # ########## Verify pie chart click ##########
    # Enter year and month
    page.get_by_role("spinbutton", name="Year").fill("2023")
    page.get_by_role("spinbutton", name="Month").fill("1")
    page.get_by_role("button", name="Load").click()

    # Wait for the pie chart to be visible
    try:
        pie_chart = page.locator("canvas").first
        expect(pie_chart).to_be_visible(timeout=30000)
    except Exception as e:
        print(page.content())
        raise e

    # Click on the pie chart
    pie_chart.click(position={"x": 100, "y": 100})

    # Wait for the transactions table to be populated
    try:
        transactions_section = page.locator('h6:has-text("Transactions for")')
        transactions_table = transactions_section.locator("+div").locator("table")
        expect(transactions_table).to_be_visible(timeout=30000)
    except Exception as e:
        print(page.content())
        raise e

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/pie_chart_fix.png")

    ########## Verify chart sorting ##########
    # Navigate to the "Category Month Report" tab
    page.get_by_role("tab", name="Category Month Report").click()

    # Select a category
    page.get_by_label("Select a category").click()
    page.get_by_role("option", name="Groceries").click()

    # Wait for the chart to be visible
    line_chart = page.locator("canvas").first
    expect(line_chart).to_be_visible()

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/chart_sorting_fix.png")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    verify_fixes(page)
    browser.close()
