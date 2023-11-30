
// get cars

import { prisma } from "@/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"


export const GET = async (req: NextApiRequest, { params }: { params: { id: string }}, res: NextApiResponse) => {
    try {
        
        const t = await prisma.user.findFirst({
            where: {
                name: params.id
            }
        })       
        
        if (t === null || t === undefined) {
            return NextResponse.json({ "error": "Something went wrong"}, { status: 404 })
        }
            
        if (t) {
            const cars = await prisma.car.findMany({
                where: { 
                    ownerId: t.id
                }
            })
            return NextResponse.json({ cars })
        }
        
        return NextResponse.json({ "cars": "You don't have any cars available" }, { status: 200 })
    
    }
    catch(err) {
        return NextResponse.json({ err })    
    }
}