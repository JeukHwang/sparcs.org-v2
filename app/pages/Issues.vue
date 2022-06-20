<template>
    <div class="issues App__page">
        <router-link class="App__back" to="/">
            <IconArrow class="App__back__icon" />
            {{ $t('go-back') }}
        </router-link>

        <h1 class="Tab"><a class="Tab__unselected" href="./status">Status</a> | Issues</h1>

        <p class="Info__desc"> {{ $t('desc') }} </p>

        <div class="issues__criteria">
            <div class="issues__query">
                <AppInput v-model="query" bind :placeholder="$t('search')" />
                <div class="issues__sorting">
                    <label class="issues__sorting-button">
                        <input class="issues__sorting-input" type="radio" value="date" v-model="sortMode">
                        <IconSortDate class="issues__sorting-icon" />
                    </label>
                    <label class="issues__sorting-button">
                        <input class="issues__sorting-input" type="radio" value="title" v-model="sortMode">
                        <IconSortTitle class="issues__sorting-icon" />
                    </label>
                    <AppCheckbox class="issues__sorting-reverse" v-model="sortReverse" bind>
                        {{ $t('reverse') }}
                    </AppCheckbox>
                </div>
            </div>

            <div class="issues__items">
                <button class="issues__item" :class="{ 'issues__item--active': year === n }" @click="year = n"
                    v-for="n in years" v-if="!query">
                    {{ n }}
                </button>
            </div>
            <div class="issues__items">
                <button class="issues__item" :class="{ 'issues__item--active': service === s }" @click="service = s"
                    v-for="s in services" v-if="!query">
                    {{ s }}
                </button>
            </div>
        </div>

        <div class="issues__issues">
            <div class="issue" v-for="issue in issuesFiltered" :key="issue.id">
                <a :href="getIssueURL(issue)">
                    <h2 class="issue__title"> {{ issue.title }} </h2>
                    <div class="issue__metadata">
                        <span> {{ issue.service }} 작성 </span> /
                        <span> {{ stringifyDate(issue.createdAt) }} 입력 </span> /
                        <span> {{ stringifyDate(issue.updatedAt) }} 수정 </span>
                        <template v-if="admin">
                            / <span> {{ issue.id }} 번호 </span>
                        </template>
                    </div>
                </a>
            </div>
        </div>

        <AppLink to="/issues/make">
            {{ $t('make-issue') }}
        </AppLink>
    </div>
</template>

<i18n>
    ko:
        search: '검색'
        go-back: '돌아가기'
        desc: '스팍스에서 운영하는 서비스에 대한 정보를 제공하고 있어요'
        reverse: '역순'
        make-issue: '게시글 생성'
</i18n>

<style scoped>
* {
    font-family: var(--theme-font);
}

a {
    text-decoration: none;
}

.Info {
    &__desc {
        color: var(--grey-200);
    }

    &__titles {
        display: block;
    }

    &__title {
        display: inline-block;
    }
}

.issues {
    &__desc {
        font-family: var(--theme-font);
        color: var(--grey-200);
    }

    &__items {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
    }

    &__item {
        cursor: pointer;
        /* background: var(--grey-800); */
        background: transparent;
        border: none;
        border-radius: 5px;
        font-size: 1.05rem;
        font-family: var(--theme-font);
        font-weight: 400;
        outline: none;
        padding: 5px 9px;
        margin: 5px;
        transition: all .4s ease;

        &:hover {
            background: var(--grey-780);
        }

        &--active {
            color: var(--grey-900);
            background: var(--theme-500);

            &:hover {
                background: var(--theme-400);
            }
        }
    }

    &__query {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    &__sorting {
        display: flex;
        margin: 10px;
        align-items: center;
    }

    &__sorting-button {
        cursor: pointer;
    }

    &__sorting-icon {
        width: 2rem;
        height: 2rem;
        padding: .25rem;
        margin: 0 5px;
        background: var(--grey-800);
        fill: var(--grey-200);
        border-radius: 5px;
        transition: all .4s ease;

        &:hover {
            background: var(--grey-780);
        }
    }

    &__sorting-input {
        display: none;
    }

    &__sorting-input:checked+&__sorting-icon {
        background: var(--theme-500);
        fill: var(--theme-foreground-900);

        &:hover {
            background: var(--theme-500);
        }
    }

    &__sorting-reverse {
        margin-left: 10px;
    }
}

.issue {
    border-left: 1px solid var(--grey-600);
    padding: 10px 0;
    padding-left: 20px;
    margin: 30px 0;

    &__title {
        color: var(--grey-200);
        font-family: var(--title-font);
        font-size: 1.1rem;
        margin: 0;
    }

    &__metadata {
        color: var(--grey-200);
        margin-top: 5px;
        font-family: var(--theme-font);

        &>* {
            padding: 0 7px;
        }

        &>*:first-child {
            padding-left: 0;
        }
    }
}

.Tab {
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    margin: 5px 5px;
    border: none;
    outline: none;
    color: var(--grey-200);
    border-radius: 5px;

    &__unselected {
        text-decoration: none;
        color: grey;
        font-size: 0.8em;
    }
}
</style>

<script>
import AppCheckbox from "@/components/AppCheckbox";
import AppInput from "@/components/AppInput";
import AppLink from "@/components/AppLink";
import TheSeminarUpload from "@/components/TheSeminarUpload";
import IconArrow from "@/images/IconArrow?inline";
import IconSortDate from "@/images/IconSortDate?inline";
import IconSortTitle from "@/images/IconSortTitle?inline";
import api from "@/src/api";
import formatDate from "../src/formatDate";

export default {
    data() {
        return {
            issues: [],
            sortMode: 'date',
            sortReverse: true,
            query: '',
            year: (new Date()).getFullYear(),
            service: "All"
        };
    },

    computed: {
        // authState() {
        //     return localStorage.getItem("isLogin");
        // },
        
        admin() {
            if (!this.$store.state.auth.user) { return false; }
            return this.$store.state.auth.user.admin;
        },

        issuesSorted() {
            let sorted;
            switch (this.sortMode) {
                case 'date':
                    sorted = this.issues.sort((v1, v2) => v1.date.getTime() - v2.date.getTime());
                    break;
                case 'title':
                    sorted = this.issues.sort((v1, v2) => v2.title.localeCompare(v1.title));
                    break;
                default:
                    sorted = this.issues;
            }
            if (this.sortReverse) { sorted = sorted.reverse(); }
            return sorted;
        },

        issuesFiltered() {
            return this.issuesSorted.filter(issue => {
                return (issue.date.getFullYear() === this.year) &&
                    (issue.service === this.service || this.service === "All") &&
                    (this.query === "" || (issue.title || '').toLowerCase().includes(this.query.toLowerCase()));
            });
        },

        years() {
            const yearList = this.issues.map(issue => issue.date.getFullYear());
            const yearStart = Math.min(this.year, ...yearList);
            const yearEnd = Math.max(this.year, ...yearList);
            return [...Array(yearEnd - yearStart + 1)].map((_, i) => i + yearStart).reverse();
        },

        services() {
            return ["All", ...new Set(this.issues.map(issue => issue.service))].sort();
        },
    },

    methods: {
        notify(name, result) {
            this.$store.dispatch('toast/addToastFromApi', { name, result });
        },

        stringifyDate(date) {
            return formatDate(date);
        },

        getIssueURL(issue) {
            return `/issue/${issue.id}`;
        }
    },

    async beforeRouteEnter(to, from, next) {
        try {
            const issues = await api('/post');
            issues.forEach(issue => {
                issue.createdAt = new Date(issue.createdAt);
                issue.updatedAt = new Date(issue.updatedAt);
                issue.date = issue.updatedAt;
            });
            next(vm => { vm.issues = issues; });
        } catch (error) {
            console.error(error);
        }
    },

    async mounted() {
        try {
            const issues = await api('/post');
            issues.forEach(issue => {
                issue.createdAt = new Date(issue.createdAt);
                issue.updatedAt = new Date(issue.updatedAt);
                issue.date = issue.updatedAt;
            });
            this.issues = issues;
            this.year = this.years[0];
        } catch (error) {
            console.error(error);
        }
    },

    components: {
        AppCheckbox,
        AppInput,
        IconArrow,
        IconSortDate,
        IconSortTitle,
        TheSeminarUpload,
        AppLink
    }
};
</script>