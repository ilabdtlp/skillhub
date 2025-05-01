import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || "{}"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { range, values } = body;

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    return NextResponse.json(
      { message: "Data appended successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error appending data to Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to append data" },
      { status: 500 },
    );
  }
}
