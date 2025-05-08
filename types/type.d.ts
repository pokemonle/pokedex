interface PaginationResource<T> {
  data: T[];
  total_pages: number;
  total_items: number;
  page: number;
  per_page: number;
}

interface Resource {
  id: number;
  identifier: string;
}

interface Ability extends Resource {
  generation_id: number;
  is_main_series: boolean;
}

interface Item extends Resource {
  cost: number;
  fling_power: number;
  // fling_effect: string;
  // natural_gift_power: number;
  // natural_gift_type: string;
}
