export class UserQueryInfo {
	private name: string;
	private email: string;
	private phone: string;
	private address: string;
	private districtId: number;
	private id: any;
	private statusList: any;
	private page: number;
	private type: any;
	private status: any;
	private productType: any;
	private userName: any;
	private withdrawStatus: any;
	private alipayAccount: any;
	private vipType: any;
	private creatorType;
	private pageSize;
	private onlyBad;

	constructor() {
		this.name = "";
		this.email = "";
		this.phone = "";
		this.address = "";
		this.districtId = -1;
		this.id = "";
		// this.statusList = [];
		this.page = 0;
		this.type = "";
		this.status = "";
		this.productType = 0;
		this.userName = "";
		this.withdrawStatus = "";
		this.alipayAccount = "";
		this.vipType = "";
		this.creatorType = 0;
		this.pageSize = 10;
		this.onlyBad = false;
	}

	reset() {
		this.name = "";
		this.phone = "";
		this.address = "";
		this.districtId = -1;
		this.id = "";
		this.statusList = [];
		this.page = 0;
		this.productType = 0;
		this.type = "";
		this.userName = "";
		this.status = "";
		this.withdrawStatus = "";
		this.alipayAccount = "";
		this.vipType = "";
		this.creatorType = 0;
		this.pageSize = 10;
		this.onlyBad = false;
	}

	setAlipayAccount(text: string): UserQueryInfo {
		// this.statusList = [];
		this.alipayAccount = text;
		return this;
	}

	setOnlyBad(text: any): UserQueryInfo {
		// this.statusList = [];
		this.onlyBad = text;
		return this;
	}

	setCreatorType(text: any): UserQueryInfo {
		// this.statusList = [];
		this.creatorType = text;
		return this;
	}

	setVipType(type: string): UserQueryInfo {
		// this.statusList = [];
		this.vipType = type;
		return this;
	}

	setStatus(status: string): UserQueryInfo {
		// this.statusList = [];
		this.status = status;
		return this;
	}

	setWithdrawStatus(status: string): UserQueryInfo {
		// this.statusList = [];
		this.withdrawStatus = status;
		return this;
	}

	setProductTypeValue(vaule: any): UserQueryInfo {
		// this.statusList = [];
		this.productType = vaule;
		return this;
	}

	setTypeValue(vaule: string): UserQueryInfo {
		// this.statusList = [];
		this.type = vaule;
		return this;
	}

	setName(name: string): UserQueryInfo {
		this.name = name;
		return this;
	}
	setUserName(name: string): UserQueryInfo {
		this.userName = name;
		return this;
	}

	setId(id: string): UserQueryInfo {
		this.id = id;
		return this;
	}

	setPage(page: number): UserQueryInfo {
		this.page = page;
		return this;
	}

	setEmail(email: string): UserQueryInfo {
		this.email = email;
		return this;
	}

	setPhone(phone: string): UserQueryInfo {
		this.phone = phone;
		return this;
	}

	setAddress(address: string): UserQueryInfo {
		this.address = address;
		return this;
	}

	setDistrictId(id: number): UserQueryInfo {
		this.districtId = id;
		return this;
	}

	getQueryString(): string {
		let queryList: Array<string> = [];
		if (this.name) {
			queryList.push("userName=" + this.name);
		}
		if (this.email) {
			queryList.push("email=" + this.email);
		}
		if (this.phone) {
			queryList.push("phone=" + this.phone);
		}
		if (this.id) {
			queryList.push("id=" + this.id);
		}
		if (this.statusList) {
			queryList.push("status=" + this.statusList);
		}
		if (this.address) {
			queryList.push("address=" + this.address);
		}

		if (this.districtId != -1) {
			queryList.push("districtId=" + this.districtId);
		}

		queryList.push("creatorType=" + this.creatorType);

		if (queryList.length == 0) {
			return "";
		}

		if (this.setVipType) {
			queryList.push("setVipType=" + this.setVipType);
		}
		return queryList.join("&");
	}

	getQueryInfo(): any {
		let queryInfo: any = {};
		if (this.name) {
			queryInfo["userName"] = this.name;
		}
		if (this.userName) {
			queryInfo["keyWord"] = this.userName;
		}
		if (this.email) {
			queryInfo["email"] = this.email;
		}
		if (this.phone) {
			queryInfo["phone"] = this.phone;
		}
		if (this.id) {
			queryInfo["id"] = this.id;
		}
		if (this.page) {
			queryInfo["page"] = this.page;
		}
		if (this.withdrawStatus) {
			queryInfo["withdrawStatus"] = this.withdrawStatus;
		}
		if (this.alipayAccount) {
			queryInfo["alipayAccount"] = this.alipayAccount;
		}
		if (this.vipType) {
			queryInfo["vipType"] = this.vipType;
		}

		queryInfo["creatorType"] = this.creatorType;
		queryInfo["setOnlyBad"] = this.setOnlyBad;

		return queryInfo;
	}
}
