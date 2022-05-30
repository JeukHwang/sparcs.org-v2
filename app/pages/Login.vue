<template>
    <div class="App__page">
        <router-link class="App__back" to="/">
            <IconArrow class="App__back__icon" />
            {{ $t('go-back') }}
        </router-link>
        <h1 class="App__title">{{ $t('login-page') }}</h1>
        <div class="LabeledInput__flex">
            <p class="LabeledInput__label"> {{ $t('id') }} </p>
            <input class="LabeledInput__box LabeledInput__textbox" type="text" required
                v-bind:placeholder="$t('write-id')" v-model="id">
        </div>
        <div class="LabeledInput__flex">
            <p class="LabeledInput__label"> {{ $t('pw') }} </p>
            <input class="LabeledInput__box LabeledInput__textbox" type="password" required
                v-bind:placeholder="$t('write-pw')" v-model="pw">
        </div>
        <AppLink button @click="login">
            {{ $t('sign-in') }}
        </AppLink>
    </div>
</template>

<i18n>
    ko:
        go-back: '돌아가기'
        login-page: '들어가기'
        id: '사용자명'
        pw: '비밀번호'
        write-id: '사용자명을 입력해주세요'
        write-pw: '비밀번호를 입력해주세요'
        sign-in: '눌러서 들어가기'
</i18n>

<style scoped>
* {
    font-family: var(--title-font);
}

.LabeledInput {
    &__flex {
        display: flex;
        width: 100%;
    }

    &__label {
        /* display: inline-block; */
        width: 60px;
    }

    &__box {
        align-items: center;
        justify-content: center;
        padding: 10px 15px;
        margin: 5px 5px;

        border: none;
        outline: none;
        color: var(--grey-200);
        font-family: var(--title-font);
        font-size: 1.05rem;
        text-decoration: none;

        border-radius: 5px;
        cursor: pointer;
        background: var(--grey-780);
    }

    &__textbox {
        flex: 1;
    }

    &__selectbox {
        width: 10%;
        box-sizing: content-box;
    }

    &__hidden {
        visibility: hidden;
    }
}
</style>

<script>
import AppLink from "@/components/AppLink";
import MarkdownEditor from "@/components/MarkdownEditor";
import IconArrow from "@/images/IconArrow.svg?inline";
import api from '@/src/api';

export default {
    data() {
        return {
            id: "",
            pw: "",
        };
    },

    methods: {
        login: async function () {
            try {
                const loginData = { username: this.id, password: this.pw };
                console.log({ loginData });
                const response = await api("auth/login", "post", loginData);
                console.log(response);
                // window.location.href = `/`;
            } catch (error) {
                console.error("Error"); // server or client
                alert(error); // TODO toast msg
            }
        }
    },

    components: {
        IconArrow,
        MarkdownEditor,
        AppLink
    }
};
</script>
