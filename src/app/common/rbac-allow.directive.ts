import { Directive, TemplateRef, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[rbacAllow]'
})
export class RbacAllowDirective implements OnDestroy {

    private allowedRoles: string[];
    private user: User;
    private sub: Subscription;

    // templateRef: for which template is directive applied
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService
    ) {

        this.sub = authService.user$
            .subscribe(user => {
                this.user = user;
                this.showIfUserAllowed();
            });
    }

    @Input()
    set rbacAllow(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;
        this.showIfUserAllowed();
    }

    private showIfUserAllowed() {

        if (!this.allowedRoles || this.allowedRoles.length === 0 || !this.user) {
            this.viewContainer.clear();
            return;
        }

        const isUserAllowed: boolean = _.intersection(this.allowedRoles, this.user.roles).length > 0;

        if (isUserAllowed) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }

    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
