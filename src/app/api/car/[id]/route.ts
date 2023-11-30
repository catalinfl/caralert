import { prisma } from "@/prisma";
import { NextApiRequest } from "next";
import { getSession, useSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string }}) => {

    try {
        if (params.id) {
            const car = await prisma.car.findUnique({
                where: {
                    id: params.id
                }
            })
            if (car) {
                return NextResponse.json({ car }, { status: 200 })            
            }
            return NextResponse.json({ "error": "Car not found"}, { status: 404 })
        }
    } catch (err) {
        return NextResponse.json({"error": err}, {status: 404})
    } 
};

export const POST = async (req: NextApiRequest) => {
    const session  = await getSession({ req })
    try {
        if (!session) {
            return NextResponse.json({ "error": "You must be logged in to add a car" },  { status: 401 })} 
            
        return NextResponse.json({ "message": "You are logged in" }, { status: 200 })
    }
    catch(err) {
        return NextResponse.json({ "error": err })
    }
}


export const PUT = async (req: NextApiRequest & Request, { params }: { params: { id: string }}) => {

    try {
        const { carDetails } = await req.json();
        const updatedData: any = { };
        
        if (carDetails.model) {
            updatedData.model = carDetails.model;
        }
        if (carDetails.colour) {
            updatedData.colour = carDetails.colour;
        }
        if (carDetails.carplate) {
            updatedData.carplate = carDetails.carplate;
        }
        if (carDetails.insurance) {
            updatedData.insurance = carDetails.insurance;
        }
        if (carDetails.itp) {
            updatedData.itp = carDetails.itp;
        }
        if (carDetails.vignette) {
            updatedData.vignette = carDetails.vignette;
        }
        
        const cars = await prisma.car.update({
            where: {
                id: params.id
            },
            data: updatedData
        })
        
        return NextResponse.json(cars)
    
    }
    catch(err) {
        return NextResponse.json({ err })
    }
}

export const DELETE = async (req: NextApiRequest & Request, { params }: { params: { id: string }}) => {
    try {
        const car = await prisma.car.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({"success": "car was deleted"}, { status: 200 });
    }
    catch(err) {
        return NextResponse.json(err);
    }
}