interface EventData {
  title: string;
  start_at: string;
  end_at: string;
  status: "draft" | "publish" | "archive";
  speakers?: string[];
  tags?: string[];
  slug: string;
  image_url?: string;
  description?: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
}

interface EventResponse {
  data: EventData[];
  links?: {
    first: string;
    last: string;
    prev?: string;
    next?: string;
  };
  meta?: EventMeta;
}

type EventMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links?: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};
