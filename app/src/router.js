import Admin from "@/pages/Admin.vue";
import Index from "@/pages/Index.vue";
import Issue from "@/pages/Issue.vue";
import IssueEditor from "@/pages/IssueEditor.vue";
import IssueMaker from "@/pages/IssueMaker.vue";
import Issues from "@/pages/Issues.vue";
import Login from "@/pages/Login.vue";
import Members from "@/pages/Members.vue";
import NotFound from "@/pages/NotFound.vue";
import Seminars from "@/pages/Seminars.vue";
import Status from "@/pages/Status.vue";

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { name: 'Index', path: '/', component: Index },
        { name: 'Login', path: '/login', component: Login },
        { name: 'Admin', path: '/admin', component: Admin },
        { name: 'Members', path: '/members', component: Members },
        { name: 'Seminars', path: '/seminars', component: Seminars },
        { name: 'Status', path: '/status', component: Status },
        { name: 'Issues', path: '/issues', component: Issues },
        { name: 'IssueMaker', path: '/issues/make', component: IssueMaker },
        { name: 'Issue', path: '/issue/:id', component: Issue },
        { name: 'IssueEditor', path: '/issue/:id/edit', component: IssueEditor },
        { name: 'NotFound', path: '*', component: NotFound },
    ],

    mode: 'history',

    async scrollBehavior(to, from, savedPosition) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (to.hash) {
            return {
                selector: to.hash,
                offset: { y: 50 }
            };
        }

        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});
