import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || "{}"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
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

    const pendingCheckouts = data
      .map((row, index) => ({
        id: index + 2,
        name: row[0],
        ageGroup: row[1],
        gender: row[2],
        purpose: row[3],
        checkinTime: row[4],
        checkoutTime: row[5],
      }))
      .filter((row) => !row.checkoutTime);

    return NextResponse.json(pendingCheckouts, { status: 200 });
  } catch (error) {
    console.error("Error fetching pending checkouts:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rowId, values } = body;

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = `checkin_data!A${rowId}:H${rowId}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [values],
      },
    });

    return NextResponse.json(
      { message: "Checkout completed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error completing checkout:", error);
    return NextResponse.json(
      { error: "Failed to complete checkout" },
      { status: 500 },
    );
  }
}
