import { NextResponse } from 'next/server';
import { db } from '../utils/db';

export async function GET() {
  try {
    const collection = db.collection('brand_info');
    const docs = await collection.find({}).toArray();
    return NextResponse.json({ data: docs });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching brands' }, { status: 500 });
  }
}