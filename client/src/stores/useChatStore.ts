import { axiosInstance } from "@/lib/axios";
import { User } from "@/types";
import { create } from "zustand";

interface ChatStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
	isLoading: false,
	error: null,
	
	fetchUsers: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/users");
			set({ users: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	}
}));
