import { NextResponse } from "next/server";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || "{}"),
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = "checkin_data!A:H";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    const data = rows.slice(1);

    const occupants = data
      .map((row, index) => ({
        id: index + 2, // Row index (1-based, skipping headers)
        name: row[0], // Column A: Name
        ageGroup: row[1], // Column B: Age Group
        gender: row[2], // Column C: Gender
        purpose: row[3], // Column D: Purpose
        checkinTime: row[4], // Column E: Check-In Time
        checkoutTime: row[5], // Column F: Check-Out Time
      }))
      .filter((row) => !row.checkoutTime); // Only include rows with empty "Check-Out Time"

    return NextResponse.json(occupants, { status: 200 });
  } catch (error) {
    console.error("Error fetching occupants:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
