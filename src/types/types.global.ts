export type AppContextType = {
  year: number | null;
  setYear: (year: number) => void;
  user: string | null;
  theme: string;
  setTheme: (theme: string) => void;
};
