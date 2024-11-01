import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import { createUser } from '@/types/userTypes';

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const User = await createUser();

    // Define fields to retrieve
    const fields = 'name company email workTelephone dutiesSkills';

    const users = await User.find({}, fields);

    return NextResponse.json({ message: "Users with specific keys retrieved", users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Server error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Implement POST handler if needed
  return new NextResponse('Method not allowed', { status: 405 });
}


// import connectMongoDB from '@/lib/mongodb';
// import { createUser } from '@/types/userTypes';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const User = await createUser();

//   if (req.method === 'GET') {
//     try {
//       await connectMongoDB();

//       // Get only specific fields
//       const users = await User.find({}, 'name company email workTelephone dutiesSkills');
//       return res.status(200).json({ message: "Users with specific keys retrieved", users });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Server error", error });
//     }
//   } else {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
// }
