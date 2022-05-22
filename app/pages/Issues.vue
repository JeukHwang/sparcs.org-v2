<template>
    <div class="issues App__page">
        <router-link class="App__back" to="/">
            <IconArrow class="App__back__icon" />
            {{ $t('go-back') }}
        </router-link>

        <h1 class="App__title">Issues</h1>

        <p class="issues__desc">
            {{ $t('desc') }}
        </p>

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
                <button class="issues__item" :class="{ 'issues__item--active': service === n }" @click="service = n"
                    v-for="n in services" v-if="!query">
                    {{ n }}
                </button>
            </div>
        </div>

        <div class="issues__issues">
            <div class="issue" v-for="issue in issuesFiltered" :key="issue._id">
                <h2 class="issue__title"> {{ issue.title }} </h2>
                <div class="issue__metadata">
                    <span class="issue__speaker"> by {{ issue.speaker }} </span>
                    /
                    <span class="issue__date"> at {{ stringifyDate(issue.date) }} </span>
                    <template v-if="admin">
                        /
                        <span class="issue__id">
                            {{ issue._id }}
                        </span>
                    </template>
                </div>
                <template v-if="issue.canEdit">
                    <div class="issue__edit">
                        <a @click="deleteissue(issue)" class="issue__delete"> {{ $t('delete-issue') }} </a>
                    </div>
                </template>
            </div>
        </div>

        <div class="NewPost">
            <AppLink button @click="upload">
                {{ $t('Make new issue') }}
            </AppLink>
        </div>

        <TheSeminarUpload v-if="authState" />
    </div>
</template>

<i18n>
    ko:
        search: '검색'
        go-back: '뒤로가기'
        desc: '스팍스에서 제공하는 서비스에 대한 정보를 확인할 수 있습니다.'
        reverse: '역순'
        delete-issue: '글 삭제'
</i18n>

<style scoped>
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

    &__files {
        margin-top: 15px;
    }

    &__file {
        cursor: pointer;
        display: inline-block;
        padding: 5px 12px;
        margin: 5px 10px;
        border-radius: 5px;
        background: var(--grey-800);
        color: var(--grey-400);
        font-family: var(--theme-font);
        text-decoration: none;
        transition: background .4s ease;

        &:hover {
            background: var(--grey-780);
        }
    }

    &__edit {
        cursor: pointer;
        display: inline-block;
        padding: 5px 12px;
        margin: 5px 10px;
        border-radius: 5px;
        background: var(--alert-level-1);
        color: var(--alert-foreground-900);
        font-family: var(--theme-font);
        text-decoration: none;
        transition: background .4s ease;

        &:hover {
            background: var(--alert-level-2);
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
import IconSortDate from "@/images/IconSortDate?inline";
import IconSortTitle from "@/images/IconSortTitle?inline";
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
            service: "All"
        };
    },

    computed: {
        admin() {
            if (!this.$store.state.auth.user)
                return false;

            return this.$store.state.auth.user.admin;
        },

        issuesSorted() {
            let sorted;

            switch (this.sortMode) {
                case 'date':
                    sorted = this.issues.sort(
                        (v1, v2) => v1.date.getTime() - v2.date.getTime()
                    );
                    break;

                case 'title':
                    sorted = this.issues.sort(
                        (v1, v2) => v2.title.localeCompare(v1.title)
                    );
                    break;

                default:
                    sorted = this.issues;
            }

            if (this.sortReverse)
                sorted = sorted.reverse();

            return sorted;
        },

        issuesFiltered() {
            if (!this.query) {
                return this.issuesSorted.filter(issue => issue.date.getFullYear() === this.year);
            }

            const lowerCaseQuery = this.query.toLowerCase();
            return this.issuesSorted.filter(issue => {
                return (
                    (issue.title || '').toLowerCase().includes(lowerCaseQuery) ||
                    (issue.speaker || '').toLowerCase().includes(lowerCaseQuery) ||
                    issue.sources.some(source => {
                        return source.name.toLowerCase().includes(lowerCaseQuery);
                    })
                );
            });
        },

        yearStart() {
            const maxYear = (new Date()).getFullYear();
            const yearStart = this.issues.reduce((prev, curr) => {
                const currYear = curr.date.getFullYear();
                if (currYear < prev)
                    return currYear;

                return prev;
            }, maxYear);
            return yearStart;
        },

        yearEnd() {
            return this.issues.reduce((prev, curr) => {
                const currYear = curr.date.getFullYear();
                if (currYear > prev)
                    return currYear;

                return prev;
            }, this.yearStart);
        },

        years() {
            return [...Array(this.yearEnd - this.yearStart + 1)]
                .map((_, i) => i + this.yearStart)
                .reverse();
        },

        services() {
            return ["All", ...new Set(this.issues.map(issue => issue.service))]
                .sort();
        },

        authState() {
            return this.$store.getters['auth/authState'];
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
        }
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
