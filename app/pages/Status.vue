<template>
    <div class="issues App__page">
        <router-link class="App__back" to="/">
            <IconArrow class="App__back__icon" />
            {{ $t('go-back') }}
        </router-link>

        <h1 class="App__title">Status</h1>

        <p class="issues__desc">
            {{ $t('desc') }}
        </p>

        <div class="ColumnWrapper">
            <div class="ColumnWrapper__column" v-for="column in columns">
                <div class="Card" v-for="service in column" :key="service.name">
                    <div class="Service">
                        <div class="Service__status">
                            <img class="Service__logo" :src="service.image">

                        </div>

                        <!-- <div class="Service__about">
                            <div class="Service__links">
                                <div v-if="service.tags">
                                    <span class="Service__tag" :class="{
                                        'Service__tag__operational': tag === 'Operational',
                                        'Service__tag__inoperational': tag === 'Inoperational',
                                        'Service__tag__development': tag === 'Development',
                                    }" v-for="tag in service.tags" :key="tag">● {{ $t(tag) }}</span>
                                </div>
                                <AppLink class="Service__link" :to="service.link" v-if="service.link">
                                    {{ $t('visit') }}
                                </AppLink>
                                <AppLink class="Service__link" :to="service.link" v-if="service.link">
                                    {{ $t('issue') }}
                                </AppLink>
                            </div>
                        </div> -->
                        <div class="Service__about" v-if="service.tags">
                            <span class="Service__tag" :class="{
                                'Service__tag__operational': tag === 'Operational',
                                'Service__tag__inoperational': tag === 'Inoperational',
                                'Service__tag__development': tag === 'Development',
                            }" v-for="tag in service.tags" :key="tag">● {{ $t(tag) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<i18n>
    ko:
        search: '검색'
        go-back: '뒤로가기'
        desc: '스팍스에서 제공하는 서비스의 상태를 실시간으로 확인할 수 있습니다.'
        reverse: '역순'
        delete-issue: '세미나 삭제'
</i18n>

<style scoped>
.issues {
    font-family: var(--theme-font);
}

.ColumnWrapper {
    display: flex;

    &__column {
        flex: 1;
        width: 0;
        margin: 0 10px;

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
        }
    }
}

.Card {
    color: var(--theme-foreground-900);
    /* background: var(--theme-400); */
    font-family: var(--theme-font);
    margin: 20px 0px;
    padding: 20px 20px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: var(--shadow-500);

    &:first-child {
        margin-top: 0;
    }

    &:last-child {
        margin-bottom: 0;
    }
}

.Service {
    display: flex;
    color: var(--grey-200);

    &__logo {
        width: 100%;
        max-width: 200px;
        height: 8.5vw;
        max-height: 50px;
        object-fit: contain;
        object-position: center left;
        padding: 0px auto;
    }

    &__status {
        flex: 1;
        width: 0;
        padding: 0 0;
        /* width: 0;
        display: flex;
        flex-direction: column;
        vertical-align: middle; */
    }

    &__about {
        flex: 1;
        width: 0;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    &__desc {
        margin: 0;
        font-family: var(--theme-font);
    }

    &__links {
        width: min-content;
        margin-top: 10px;
    }

    &__link {
        height: 1.4rem;
        vertical-align: middle;

        &__icon {
            stroke: none !important;
        }
    }

    &__tags {
        display: flex;
        flex-direction: column;
    }

    &__tag {
        max-width: 100%;
        display: flex;
        align-items: center;

        font-family: var(--theme-font);
        color: var(--grey-650);

        &__operational {
            color: green;
        }

        &__inoperational {
            color: red;
        }

        &__development {
            color: orange;
        }
    }
}

@media (max-width: 360px) {
    .Service {
        flex-direction: column;

        &__logo {
            width: 30vw;
            height: 10vw;
            margin-right: 0;
        }

        &__status {
            /* margin-bottom: 20px; */
        }

        &__about {
            width: 100%;
        }
    }
}
</style>

<script>
import AppCheckbox from "@/components/AppCheckbox";
import AppInput from "@/components/AppInput";
import AppLink from "@/components/AppLink";
import TheSeminarUpload from "@/components/TheSeminarUpload";
import IconArrow from "@/images/IconArrow?inline";
import IconGithub from "@/images/IconGithub?inline";
import IconSortDate from "@/images/IconSortDate?inline";
import IconSortTitle from "@/images/IconSortTitle?inline";
import ServiceAra from "@/images/ServiceAra";
import ServiceGeoul from "@/images/ServiceGeoul";
import ServiceHome from "@/images/ServiceHome";
import ServiceKono from "@/images/ServiceKono";
import ServiceNewAra from "@/images/ServiceNewAra";
import ServiceOTL from "@/images/ServiceOTL";
import ServiceSSO from "@/images/ServiceSSO";
import ServiceZabo from "@/images/ServiceZabo";
import api from "@/src/api";
import formatDate from "@/src/formatDate";



export default {
    data() {
        return {
            issues: [],
            sortMode: 'date',
            sortReverse: true,
            query: '',
            year: (new Date()).getFullYear(),
            service: "All",
            services: [
                {
                    name: 'Ara',
                    desc: 'service-ara',
                    image: ServiceAra,
                    link: 'https://ara.kaist.ac.kr',
                    github: ['arara']
                },

                {
                    name: 'Geoul',
                    desc: 'service-geoul',
                    image: ServiceGeoul,
                    link: 'http://ftp.kaist.ac.kr',
                    github: ['ftp.kaist.ac.kr']
                },

                {
                    name: 'Home',
                    desc: 'service-home',
                    image: ServiceHome,
                    link: 'https://sparcs.org',
                    github: ['sparcs.org-v2']
                },

                {
                    name: 'Kono',
                    desc: 'service-kono',
                    image: ServiceKono,
                    link: 'https://kono.sparcs.org',
                    github: ['kono'],
                    tags: ['Development', "Bug??"]
                },

                {
                    name: 'NewAra',
                    desc: 'service-newara',
                    image: ServiceNewAra,
                    link: 'https://newara.sparcs.org',
                    github: ['new-ara-api', 'new-ara-web']
                },

                {
                    name: 'OTL',
                    desc: 'service-otl',
                    image: ServiceOTL,
                    link: 'https://otl.kaist.ac.kr',
                    github: ['otlplus'],
                    tags: ["Operational", "Woowang!"]
                },

                {
                    name: 'SSO',
                    desc: 'service-sso',
                    image: ServiceSSO,
                    link: 'https://sparcssso.kaist.ac.kr',
                    github: ['sparcssso']
                },

                // {
                //     name: 'status',
                //     desc: 'service-status',
                //     image: ServiceStatus,
                //     link: 'https://status.sparcs.org',
                //     github: ['status-page']
                // },

                {
                    name: 'Zabo',
                    desc: 'service-zabo',
                    image: ServiceZabo,
                    link: 'https://zabo.sparcs.org',
                    github: ['zabo-front-reactjs', 'zabo-server-nodejs']
                }
            ].map(service => {
                if (!service.tags) {
                    service.tags = ["Inoperational"];
                }
                return service;
            })
        };
    },

    computed: {
        columns() {
            // TODO : is the order written in the code hard-coding priority? otherwise let's sort by service name
            // this.services.sort((a, b) => (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
            const cols = 2;
            let columns = [];
            let mid = Math.ceil(this.services.length / cols);
            for (let col = 0; col < cols; col++) {
                columns.push(this.services.slice(col * mid, col * mid + mid));
            }
            return columns;
        }
    },

    methods: {
        notify(name, result) {
            this.$store.dispatch('toast/addToastFromApi', { name, result });
        },
        stringifyDate(date) {
            return formatDate(date);
        },
        async deleteissue(issue) {
            if (!confirm(`정말 '${issue.title}'를 삭제하시겠어요?`)) {
                return;
            }
            const result = await api(`/issues/${issue._id}`, 'delete');
            await this.notify(this.$t('delete-issue'), result);
        },

        getGithubLink(repository) {
            return `https://github.com/sparcs-kaist/${repository}`;
        }
    },

    components: {
        AppLink,
        IconGithub,

        AppCheckbox,
        AppInput,
        IconArrow,
        IconSortDate,
        IconSortTitle,
        TheSeminarUpload
    },

    async beforeRouteEnter(to, from, next) {
        const { issues } = await api('/issues');
        issues.forEach(issue => {
            issue.date = new Date(issue.date);
            return issue;
        });

        next(vm => {
            vm.issues = issues;
        });
    },

    async mounted() {
        const { issues } = await api('/issues');
        issues.forEach(issue => {
            issue.date = new Date(issue.date);
            return issue;
        });

        this.issues = issues;
        this.year = this.years[0];
    },
};
</script>