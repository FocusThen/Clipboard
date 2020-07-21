// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const Vue = require('vue/dist/vue');
const { clipboard } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: "#app",
        data: {
            title: "Crows Never Forget",
            history: [],
            colors: ["is-dark", "is-primary", "is-link", "is-info", "is-success", "is-warning", "is-danger", "is-orange"]
        },
        mounted() {
            this.history.push({
                text: clipboard.readText(),
                clipped: new Date()
            });
            setInterval(this.checkClipboard, 500);
        },
        computed: {
            historyReversed() {
                return this.history.slice().reverse()
            }
        },
        methods: {
            colorful(i) {
                const calcColor = i % 10 >= 8 ? i % 10 == 9 ? 2 : 1 : i % 10
                return this.colors[calcColor]
            },
            checkClipboard() {
                const text = clipboard.readText();
                if (this.history[this.history.length - 1].text !== text) {
                    this.history.push({
                        text,
                        clipped: new Date()
                    });
                }
            },
            copyItem(item) {
                const index = this.history.indexOf(item)
                this.history.slice(index, 1);
                clipboard.writeText(item.text)
            }
        }
    })
})
