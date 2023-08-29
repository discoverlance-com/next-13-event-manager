interface EventData {
  title: string;
  start_at: string;
  end_at: string;
  status: "draft" | "publish" | "archive";
  speakers?: string[];
  tags?: string[];
  slug: string;
  image_path?: string;
  description?: string;
  user_id: string;
}
