export interface SummaryPayload{
    data : {
        title? : string;
        videoId : string;
        summary : string
    }
}

export interface LinkCardProps {
  documentId: string|null;
  title: string;
  summary: string;
}