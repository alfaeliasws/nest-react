export class HeadlinerResponse {
    id: number;
    topic: string;
    headliner: string;
  }
  
  export class CreateHeadlinerRequest {
    topic: string;
    headliner: string;
  }
  
  export class UpdateHeadlinerRequest {
    id: number;
    topic: string;
    headliner: string;
  }
  
  export class SearchHeadlinerRequest {
    highlight?: string;
    page: number;
    size: number;
  }
  