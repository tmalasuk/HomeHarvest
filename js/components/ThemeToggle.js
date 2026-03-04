const ThemeToggle = {

    name: "ThemeToggle",

    data: function () {
        return {
            isDark: document.documentElement.getAttribute('data-theme') === 'dark',
        };
    },

    methods: {
        toggle() {
            this.isDark = !this.isDark;
            $('html').attr('data-theme', this.isDark ? 'dark' : 'light');
        },
    },

    template: `
        <div id="vue-toggle" class="toggle">
            <div class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="!isDark"
                @click="toggle"
                @keydown.enter.prevent="toggle"
                @keydown.space.prevent="toggle">

                <span class="track-star s1"></span>
                <span class="track-star s2"></span>
                <span class="track-star s3"></span>
                <span class="track-cloud c1"></span>
                <span class="track-cloud c2"></span>

                <div class="toggle-thumb" :class="isDark ? 'dark-mode' : 'light-mode'">
                    <span class="icon-wrap icon-moon">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    </span>
                    <span class="icon-wrap icon-sun">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" width="16" height="16">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    `,
};

export default ThemeToggle;