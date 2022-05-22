import Admin from "@/pages/Admin.vue";
import Index from "@/pages/Index.vue";
import Members from "@/pages/Members.vue";
import NotFound from "@/pages/NotFound.vue";
import Seminars from "@/pages/Seminars.vue";
import Status from "@/pages/Status.vue";
import Issues from "@/pages/Issues.vue";
import Issue from "@/pages/Issue.vue";
import IssueMake from "@/pages/IssueMake.vue";

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { name: 'Index', path: '/', component: Index },
        { name: 'Admin', path: '/admin', component: Admin },
        { name: 'Members', path: '/members', component: Members },
        { name: 'Seminars', path: '/seminars', component: Seminars },
        { name: 'Status', path: '/status', component: Status },
        { name: 'Issues', path: '/issues', component: Issues },
        { name: 'Issue', path: '/issue/:id/:slug', component: Issue },
        { name: 'IssueMake', path: '/issues/make', component: IssueMake },
        { name: 'NotFound', path: '*', component: NotFound },

    ],

    mode: 'history',

    async scrollBehavior (to, from, savedPosition) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if(to.hash) {
            return {
                selector: to.hash,
                offset: { y: 50 }
            };
        }

        if(savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});
