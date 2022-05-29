<template>
    <hr size="">
    </hr>
</template>

<style scoped>
hr {
    margin: 20px 0px;
    border: none;
    border-top: 3px solid #333;
    color: #333;
    overflow: visible;
    text-align: center;
    align: center;
    height: 0px;

    &:after {
        --hr-icon-size: 40px;
        display: block;
        content: ' ';
        background: url('../images/Symbol_black.svg'), var(--grey-850);
        background-size: var(--hr-icon-size) var(--hr-icon-size);

        width: var(--hr-icon-size);
        height: var(--hr-icon-size);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: relative;
    }
}
</style>

<script>

export default {};
</script>
