import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { getUserMeLoader } from "@/data/services/getusermeloader";
import { getAuthToken } from "@/data/services/get-token";

// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { TEMPLATE } from "@/lib/constants";

async function generateSummary(content : string, template : string){

  const prompt = PromptTemplate.fromTemplate(template)

  const model = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama2"
    // apiKey : process.env.GENAI_API_KEY!,
    // modelName: "gemini-pro",
    // temperature : process.env.GENAI_TEMPERATURE? parseFloat(process.env.GENAI_TEMPERATURE) : 0.7,
    // maxOutputTokens: process.env.GENAI_MAX_TOKENS ? parseInt(process.env.GENAI_MAX_TOKENS) : 2048,
  });
  
  const outputParser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);

  try {
    const response = await chain.invoke({text : content});
    // for await (const chunk of response) {
    //   console.log(chunk);
    // }
    console.log("Generated Summary: ", response);
    return response;
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message });
    return NextResponse.json({ error: "Failed to generate summary." });
  } 

}

export async function POST(req: NextRequest) {  

  try {

    const user = await getUserMeLoader();
    const token = await getAuthToken();

    if (!user.ok || !token) {
      return NextResponse.json({ data: null, error: "Not authenticated" },
        { status: 200 })
    }

    if (user.data.credits < 1) {
      return NextResponse.json({
          data: null,
          error: "Insufficient credits",
        },
        { status: 200 }
      );
    }

    const reqbody = await req.json();;
    console.log("FROM OUR ROUTE HANDLER using await req.json():", reqbody);
    const videoIdorURL = reqbody.videoId;
    let summary: Awaited<ReturnType<typeof generateSummary>>;

    // const url = `https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/${videoIdorURL}`;

    try {
        // const transcript = await fetch(url);
        // console.log("Transcript fetched successfully from url :", transcript);
        // transcriptData = await transcript.text();
        // console.log("Transcript data:", transcriptData);

        const loader = YoutubeLoader.createFromUrl(videoIdorURL, {
          language: "en",
          addVideoInfo: true,
        });

        const transcriptData = await loader.load();
        console.log("Transcript fetched successfully from langchain : ", transcriptData[0].pageContent);  //this is also working
        const transcript = transcriptData[0].pageContent;

        //passing the transcript to the generateSummary function
        summary = await generateSummary(transcript, TEMPLATE);
        console.log("Generated summary from ollama in POST function:", summary);  

    } catch (error) {
        console.error("Error processing request:", error);
        if (error instanceof Error)
        return NextResponse.json({ error: error.message });
        return NextResponse.json({ error: "Unknown error" });
    }

    return NextResponse.json({data : summary, error: null}, {status : 200});

  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return NextResponse.json({ error: error });
    return NextResponse.json({error : "Unknown error" });
  }
}