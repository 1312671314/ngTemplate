import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorage {
	static setData(key: string, value: any): void {
		if (typeof value === "object") {
			value = JSON.stringify(value);
		}
		window.localStorage.setItem(key, value);
	}

	static getData(key: string): any {
		let value: any = window.localStorage.getItem(key);
		if (!value) {
			return value;
		}
		if (typeof value === "string") {
			try {
				value = JSON.parse(value);
				return value;
			} catch (e) {
				return value;
			}
		} else {
			return value;
		}
	}

	static clearData(key: string): void {
		window.localStorage.removeItem(key);
	}
}
