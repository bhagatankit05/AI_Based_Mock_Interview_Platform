import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import { error } from "console";

var imagekit = new ImageKit({
    publicKey : "your_public_api_key",
    privateKey : "your_private_api_key",
    urlEndpoint : "https://ik.imagekit.io/your_imagekit_id/"
});
export async function POST(req:NextRequest) {
    try{
    const formData=await req.formData();
    const file=formData.get('file') as File;

    if (!file) {
        return NextResponse.json({error:"No file found"})
    }
    console.log("file",formData)

    const arrayBuffer=await file.arrayBuffer();
    const buffer=Buffer.from(arrayBuffer);

    const uploadResponse = await imagekit.upload({
            file:buffer,
            fileName:Date.now().toString()+".pdf",
            isPrivateFile:false,
            useUniqueFileName:true,
        });
        
        return NextResponse.json({url:uploadResponse.url},{status:200})
    }
    catch(error: any){
        console.error("Upload error:",error);
        return NextResponse.json({error:error.message},{status:300})
    }
}