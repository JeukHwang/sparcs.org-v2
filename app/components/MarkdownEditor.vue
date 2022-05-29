<template>
    <div class="Editor">
        <div class="Editor__view">
            <p class="Editor__view__label">Markdown</p>
            <textarea :value="input" @input="update" class="Editor__view__content Editor__view__md"></textarea>
        </div>
        <div class="Editor__view">
            <p class="Editor__view__label">Render</p>
            <div v-html="compiledMarkdown" class="Editor__view__content Editor__view__render"></div>
        </div>
    </div>
</template>

<style scoped>
* {
    font-family: var(--theme-font);
}

.Editor {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0px;
    /* background-color: white; */

    &__view {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: calc(1.5em + 70vh);

        &__content {
            width: 100%;
            height: 70vh;
            max-height: 70vh;
            box-sizing: border-box;
            padding: 20px;
            /* overflow: hidden; */
            overflow: auto;
        }

        &__label {
            margin: 10px;
            padding: 0;
            height: 1.5em;
            line-height: 1.5em;
            text-align: center;
        }

        &__md {
            box-sizing: border-box;
            background-color: #F4F4F4;
            border: none;
            outline: none;
            resize: none;
        }

        &__render {
            margin: 0;
            padding: 0 10px;
            vertical-align: top;
            /* overflow: scroll; */
            resize: none;
            background-color: #F4F4F4;
        }
    }
}

::selection {
    background: #fff9c4;
}


@media (max-width: 700px) {
    .Editor {
        flex-direction: column;
    }
}
</style>

<script>
import { marked } from "marked";

export default {
    data() {
        return {
            input: `\
# Post title
## Issue
- Type : Unexpected issue, Scheduled maintenance, ...
- When : 2022.05.16 03:50
- What : Login form does not work

## Update
- When : 2022.05.16 04:00
- What : Hotfix for network frontend bug

## Update
- When : 2022.05.16 05:50
- What : Refactoring hotfix update

## Monitoring
- When : 2022.05.17 12:30
- What : back to normal, currently monitoring

## Resolved
- When : 2022.05.18 14:00
- What : Login form works

## Reflection
- When : 2022.05.18 15:00

### Why issue happen?
- Poor unit test
- miscommunication during code review

### How to prevent?
- Force unit test by blocking commit without it
- Automate unit test
- Make documentation for code reviewers
- Write the result of code review in Github
- Make slack notifier that shows reviewer's comment 
    - [Related slack official docs](https://slack.com/intl/ko-kr/help/articles/115005265703)\
`,
            debounce: null,
        };
    },

    computed: {
        compiledMarkdown: function () {
            return marked(this.input);
        },
    },

    methods: {
        update: function (e) {
            if (this.debounce !== null) { clearTimeout(this.debounce); }
            this.debounce = setTimeout(function () {
                this.input = e.target.value;
                this.debounce = null;
            }.bind(this), 1000);
        }
    }
};
</script>
