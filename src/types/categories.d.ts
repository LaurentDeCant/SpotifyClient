interface Icon {
  height: number;
  url: string;
  width: number;
}

interface Category {
  href: string;
  icons: Icon[];
  id: string;
  name: string;
}

export default interface Categories {
  href: string;
  items: Category[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
