import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const SaveInterviewQuestion = mutation({
  args: {
    questions: v.any(),
    uid: v.id("UserTable"),
    resumeUrl: v.string(), // This will store the ImageKit file URL
  },
  handler: async (ctx, args) => {
    // Insert into InterviewSessionTable
    const result = await ctx.db.insert("InterviewSessionTable", {
      interviewQuestions: args.questions,
      resumeUrl: args.resumeUrl, // URL coming from ImageKit after upload
      userId: args.uid,
      status: "draft"
    });

    return {
      success: true,
      sessionId: result,
    };
  },
});
