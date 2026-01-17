import { ref } from 'vue';
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
	const user = ref({});
	const avatar = ref("/avatar.svg");
	return { user, avatar };
});