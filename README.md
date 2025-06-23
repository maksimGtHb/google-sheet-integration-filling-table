

Script automatically fills a Google Sheets table with issue data parsed from JSON.

## How it works

- Receives JSON data with issue details
- Stores the issues in script properties
- Every 15 minutes, writes all stored issues into the sheet
- Clears stored issues after writing

## Setup

1. Open the script editor in your Google Sheet (`Extensions > Apps Script`).
2. Copy the script files here.
3. Run the `createRewriteSheetTrigger` function once to set up the 15-minute auto-update trigger.
4. Send JSON data to the `doPost` endpoint (if published as a web app).

## Usage

- Add JSON issue data via POST requests.
- The sheet updates automatically every 15 minutes.

