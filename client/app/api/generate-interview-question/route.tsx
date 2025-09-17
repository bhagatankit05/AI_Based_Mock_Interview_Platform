import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import axios from "axios";
import { aj } from "@/utils/arcjet";
import { currentUser } from "@clerk/nextjs/server";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_URL_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_URL_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const jobTitle = formData.get("jobTitle") as string | null;
        const jobDescription = formData.get("jobDescription") as string | null;

        const decision = await aj.protect(req, {userId:user?.primaryEmailAddress?.emailAddress??'', requested: 5 }); // Deduct 5 tokens from the bucket
          console.log("Arcjet decision", decision);
        
          //@ts-ignore
          if (decision?.reason?.remaining==0 ) {
            return NextResponse.json(
              { 
                status:429,
                result:'No free credit remaining, try again after 24hrs',
               },
            );
          }

        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResponse = await imagekit.upload({
                file: buffer,
                fileName: Date.now().toString() + ".pdf",
                isPrivateFile: false,
                useUniqueFileName: true,
            });

            const result = await axios.post(
                "https://bhagatankit05.app.n8n.cloud/webhook/generate-interview-question",
                { resumeUrl: uploadResponse?.url }
            );

            return NextResponse.json({
                questions: result.data?.message?.content?.questions,
                resumeUrl: uploadResponse?.url,
            });
        } else {
            if (!jobTitle || !jobDescription) {
                return NextResponse.json(
                    { error: "jobTitle and jobDescription are required when no file is provided" },
                    { status: 400 }
                );
            }

            const result = await axios.post(
                "https://bhagatankit05.app.n8n.cloud/webhook/generate-interview-question",
                { resumeUrl: null, jobTitle, jobDescription }
            );

            return NextResponse.json({
                questions: result.data?.message?.content?.questions,
                resumeUrl: null,
            });
        }
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
