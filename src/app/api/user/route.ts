import { prisma } from '@/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
 
export async function POST(
  req: Request,
  res: NextApiResponse
) {
  try {
    const { name, email } = await req.json();
    if (!name || !email) return NextResponse.json({ status: 400, body: "Something went wrong" })
    const isUserAlreadyCreated = await prisma.user.findFirst({
      where: { 
        OR: [
          { name: name },
          { email: email }
        ]
      }
    })
    
    if (!isUserAlreadyCreated) {
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email
        }
      })
      return NextResponse.json({"success": "user created", "user": user })
    } else {
      return NextResponse.json({"success": "user exists", "user": isUserAlreadyCreated })
    }    
  } catch (err) {
    return NextResponse.json({ status: 400, body: err})
  }
}
