import { NextResponse } from 'next/server';
import axios from 'axios';

const GOOGLE_SCRIPT_URL =
  `https://script.google.com/macros/s/${process.env.GOOGLE_SCRIPT_URL}/exec`;

// GET → ambil daftar sheet
export async function GET() {
  try {
    const r = await axios.get(GOOGLE_SCRIPT_URL);
    return NextResponse.json(r.data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// POST → ambil data dari sheet tertentu
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const r = await axios.post(GOOGLE_SCRIPT_URL, body);
    return NextResponse.json(r.data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
