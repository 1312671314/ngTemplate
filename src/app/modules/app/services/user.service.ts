import { Injectable } from "@angular/core";
import { Global } from "./global.service";
import { HttpHandler } from "./httpHandler.service";
import { UserQueryInfo } from "./user-query-info";
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
	constructor(private httpHandler: HttpHandler, private global: Global) { }

	login(loginInfo: any): Promise<any> {
		return this.httpHandler.post(
			Global.getApiHost().api + "user/login",
			loginInfo,
		);
	}
}
