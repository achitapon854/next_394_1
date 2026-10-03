export interface Member {
  id: number;
  name: string;
  nickname?: string;
  role: string; 
  
}

export interface Band {
  id: number;
  name: string;
  genre: string;
  foundedYear: number;
  image: string; 
  members: Member[];
}