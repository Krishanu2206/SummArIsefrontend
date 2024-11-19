import Link from "next/link";
import { getSummaries } from "@/data/loaders";
import { LinkCardProps, SearchParamsProps } from "@/types/summary";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown'

import { Search } from "@/components/custom/search";

function LinkCard({ documentId, title, summary }: Readonly<LinkCardProps>) {
  return (
    <Link href={`/dashboard/summaries/${documentId}`}>
      <Card className="relative">
        <CardHeader>
          <CardTitle className="leading-8 text-pink-500 text-xl">
            {title || "Video Summary"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReactMarkdown
            className="card-markdown prose prose-sm max-w-none
                      prose-headings:text-gray-900 prose-headings:font-semibold
                      prose-p:text-gray-600 prose-p:leading-relaxed
                      prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-ul:list-disc prose-ul:pl-4
                      prose-ol:list-decimal prose-ol:pl-4"
          >
            {summary.slice(0, 164) + " [read more]"}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function SummariesRoute({searchParams} : SearchParamsProps) {

  const search = await searchParams;
  const query = search?.query ?? "";

  console.log(query);
  const { data } = await getSummaries(query);
  if (!data || data.length === 0) return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search/>
      <h1 className="text-4xl text-red-700 font-bold text-center mt-7">
        No Summaries found! No Search Results found!!
      </h1>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item: LinkCardProps) => (
          <LinkCard key={item.documentId} documentId={item.documentId} title={item.title} summary={item.summary} />
        ))}
      </div>
    </div>
  );
}