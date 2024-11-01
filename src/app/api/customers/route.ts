import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import * as Yup from 'yup';
import { createCustomer, customerValidationSchema } from '@/types/customerTypes';

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const Customer = await createCustomer();

    const customers = await Customer.find();
    return NextResponse.json({ message: 'Customers retrieved', customers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const Customer = await createCustomer();
    
    const customerData = await request.json(); // Parse JSON body

    // Validate customer data
    await customerValidationSchema.validate(customerData, { abortEarly: false });

    // Check if the customer already exists
    const existingCustomer = await Customer.findOne({ customerNumber: customerData.customerNumber });
    if (existingCustomer) {
      return NextResponse.json({ message: 'Customer already exists' }, { status: 409 });
    }

    // Create customer document
    const customer = await Customer.create(customerData);

    return NextResponse.json({ message: 'Customer created', customer }, { status: 201 });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}



// import connectMongoDB from '@/lib/mongodb';
// import { NextApiRequest, NextApiResponse } from 'next';
// import * as Yup from 'yup';
// import { createCustomer, customerValidationSchema } from '@/types/customerTypes';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const Customer = await createCustomer();
  
//   console.log("Came to the handler")

//   await connectMongoDB();
  
//   if (req.method === 'POST') {
//     try {
//       const customerData = req.body;

//       console.log("In the index api", customerData)

//       // Validate customer data
//       await customerValidationSchema.validate(customerData, { abortEarly: false });

//       // Check if the customer already exists
//       const existingCustomer = await Customer.findOne({ customerNumber: customerData.customerNumber });
//       if (existingCustomer) {
//         return res.status(409).json({ message: 'Customer already exists' });
//       }

//       // Create customer document
//       const customer = await Customer.create(customerData);

//       return res.status(201).json({ message: 'Customer created', customer });
//     } catch (error) {
//       if (error instanceof Yup.ValidationError) {
//         return res.status(400).json({ message: 'Validation error', errors: error.errors });
//       }
//       console.error(error);
//       return res.status(500).json({ message: 'Server error', error });
//     }
//   } else if (req.method === 'GET') {
//     try {
//       const customers = await Customer.find();
//       return res.status(200).json({ message: 'Customers retrieved', customers });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Server error', error });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// }
