import type { ActiveTab } from "./ActiveTab";
import type { IUser } from "./user";

export interface IBook {
  _id: string;
  title: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  image:  File | null;
  userId: string;
}


export interface IBookForm {
  title: string;
  description: string;
  price: string;   
  stock: string;   
  category: string;
  image: File | null;
}

export interface IBookCardProps {
  book: IBook;
}


export interface SidebarProps {
  activeTab:  ActiveTab, 
  setActiveTab: (tab: any) => void;
  openModal: () => void
  setSidebarOpen: (tab: any) => void;
}

export interface HeaderProps {
  dropdownOpen: boolean;
  user: IUser | null;
  setSidebarOpen: (open: boolean) => void;
  setDropdownOpen: (open: boolean) => void;
  handleLogout: () => void;
}

export interface HomeTableProps {
  activeTab: ActiveTab;
  userBooks: IBook[];
  allBooks: IBook[];
  openModal: (book?: IBook) => void;
  handleDelete: (bookId: string) => void;
}

export interface FormModalProps {
  editingBook: IBook | null;
  formData: IBookForm;
  setFormData: React.Dispatch<React.SetStateAction<IBookForm>>;
  setModalOpen: (open: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
