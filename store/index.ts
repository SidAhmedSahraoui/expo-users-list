import { create } from "zustand";
import { getUsers, getUserById } from "@/api";
import { User } from "@/types";

type State = {
    user: User | null;
    users: User[];
    fetchUsers: () => Promise<void>;
    fetchUserById: (id: number) => Promise<void>;
};

export const useStore = create<State>((set) => ({
    user: null,
    users: [],
    fetchUsers: async () => {
        const users = await getUsers();
        set({ users });
    },
    fetchUserById: async (id: number) => {
        const user = await getUserById(id);
        set({ user });
    },
}));

