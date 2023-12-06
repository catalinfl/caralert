import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export const POST = async (req: NextApiRequest & Request) => {
    const { name, carDetails } = await req.json();
    
    try {
        const user = await prisma.user.findFirst({
            where: {
                name: name 
            }
        })
        
        const carCount = await prisma.car.count()
        
        if (carCount >= 12) {
            return NextResponse.json({ "error": "You can't add more than 12 cars", carCount }, { status: 400})
        }
        
        if (user) {
            const newCar = await prisma.car.create({
                data: {
                    model: carDetails.model,
                    colour: carDetails.colour,
                    carplate: carDetails.carplate,
                    insurance: carDetails.insurance,
                    itp: carDetails.itp,
                    vignette: carDetails.vignette,
                    description: "",
                    owner: {
                        connect: {
                            id: user.id
                        }
                    }
                }})
            return NextResponse.json({
                newCar
            })
        } else {
            return NextResponse.json({
                "error": "User not found"
            }, {status: 404})
        }
    }
    catch(err) {
        return NextResponse.json({
            err
        })
    }
}

