<template>
    <div class="Editor">
        <div class="Editor__view">
            <p class="Editor__view__label">Markdown</p>
            <textarea v-bind:value="content" @input="updateContent"
                class="Editor__view__content Editor__view__md"></textarea>
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
    props: {
        content: {
            type: String,
            required: true
        },
    },

    data: function () {
        return {
            debounce: null,
            force: 0,
        };
    },

    computed: {
        compiledMarkdown: function () {
            return marked(this.content);
        },
    },

    methods: {
        updateContent(e) {
            if (this.debounce !== null) { clearTimeout(this.debounce); }
            this.debounce = setTimeout(function () {
                this.debounce = null;
                this.$emit('updateContent', e.target.value);
            }.bind(this), 300);
        },
    },
};
</script>
