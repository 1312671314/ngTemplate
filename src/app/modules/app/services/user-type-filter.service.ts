import { Injectable } from "@angular/core";
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from "@angular/router";
import { Global } from "./global.service";

@Injectable()
export class UserTypeFilterService implements CanActivate {
	constructor(private global: Global, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): boolean {
		return this.checkUserType(state.url);
	}

	checkUserType(url: string): boolean {
		if (!this.global.getUserInfo()) {
			if (url == "/login") {
				return true;
			} else {
				this.router.navigate(["/login"]);
				return false;
			}
		} else {
			if (url == "/login") {
				// switch (this.global.getUserInfo().userType) {
				// 	case 'display':
				// 		this.router.navigate(['/display'])
				// 		break;
				// 	case 'admin':
				this.router.navigate(["/admin"]);
				// 	break;
				// case 'customer':
				// 	if (this.global.getUserInfo().type["name"] == "客户监控员") {
				// 		this.router.navigate(['/user'])
				// 	} else {
				// 		this.router.navigate(['/manager'])
				// 	}
				// 	break;
				// default:
				// 		this.router.navigate([''])
				// }
				return false;
			} else {
				// 	switch (this.global.getUserInfo().userType) {
				// 		case 'display':
				// 			if (url.indexOf('/display') != 0) {
				// 				this.router.navigate(['/display']);
				// 				return false;
				// 			}
				// 			break;
				// 		case 'admin':
				if (url.indexOf("/admin") != 0) {
					this.router.navigate(["/admin"]);
					return false;
				}
				// 			break;
				// 		case 'customer':
				// 			if (this.global.getUserInfo().type["name"] == "客户监控员") {
				// 				if (url.indexOf('/user') != 0) {
				// 					this.router.navigate(['/user'])
				// 					return false;
				// 				}
				// 			} else {
				// 				if (url.indexOf('/manager') != 0) {
				// 					this.router.navigate(['/manager']);
				// 					return false;
				// 				}
				// 			}
				// 			break;
				// 	}
				return true;
			}
		}
	}
}
