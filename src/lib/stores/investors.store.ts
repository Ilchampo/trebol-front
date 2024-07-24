import type { IInvestorDTO } from "$lib/interfaces/investor.interface";
import { writable } from "svelte/store";

export const investors = writable<IInvestorDTO[]>([]);