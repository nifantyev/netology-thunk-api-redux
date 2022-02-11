export interface Service {
  id: number;
  name: string;
  price: number;
}

export interface ServiceFull extends Service {
  content: string;
}
