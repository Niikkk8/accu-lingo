import { db } from '../utils/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const collection = db.collection('brand_info');
    const result = await collection.insertOne(body);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating brand' }, { status: 500 });
  }
}