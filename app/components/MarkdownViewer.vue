<template>
    <div v-html="mdToHTML" class="Editor"></div>
</template>

<style scoped>
* {
    font-family: var(--theme-font);
}

.Editor {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0 10px;
    /* overflow: scroll; */
    /* background-color: gray; */
}
</style>

<script>
import { marked } from "marked";
export default {
    props: ['content'],
    computed: {
        mdToHTML() {
            return marked(this.content || "");
        }
    }
};
</script>
