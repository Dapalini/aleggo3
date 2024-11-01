import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import { createCustomer } from '@/types/customerTypes';

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const Customer = await createCustomer();

    // Get fields from query parameter and construct a string for MongoDB projection
    const url = new URL(request.url);
    const fields = url.searchParams.getAll('fields');
    let projection = '';
    if (fields) {
      projection = fields.join(' ');
    }

    const customers = await Customer.find({}, projection);

    return NextResponse.json({ message: "Customers with specific keys retrieved", customers });
  } catch (error) {
    console.error(error);
    return new NextResponse('Server error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Implement POST handler if needed
  return new NextResponse('Method not allowed', { status: 405 });
}