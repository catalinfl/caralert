import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(req.query)
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error:', err);

        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
        // Adjust the status code (here, using 500 for an internal error)
    }
};