const DurationInput = {

    name: "DurationInput",

    data: function () {
        return {};
    },

    props: {
        duration: { type: Number, required: true },
        unitIndex: { type: Number, required: true },
        units: { type: Array, required: true },
        trackWidth: { type: String, default: '100%' },
    },

    methods: {
        prevUnit() {
            if (this.unitIndex > 0) {
                this.$emit('update:unit-index', this.unitIndex - 1);
                this.$emit('change');
            }
        },
        nextUnit() {
            if (this.unitIndex < this.units.length - 1) {
                this.$emit('update:unit-index', this.unitIndex + 1);
                this.$emit('change');
            }
        },
        onDurationChange(e) {
            this.$emit('update:duration', Number(e.target.value));
            this.$emit('change');
        },
    },

    template: `
        <div :class="['duration-input', { 'col-10': trackWidth === '100%' }]">
            <input
                type="number"
                min="1"
                class="duration-number"
                :value="duration"
                @change="onDurationChange"
            />
            <div class="unit-switcher">
                <button class="unit-arrow left" type="button" @click="prevUnit">
                    <i class="bi bi-caret-left-fill"></i>
                </button>
                <div class="unit-display">
                    <div class="unit-track"
                        :style="{ transform: 'translateX(calc(-' + unitIndex + ' * ' + trackWidth + '))' }">
                        <span
                            v-for="(unit, index) in units"
                            :key="unit"
                            :class="{ active: index === unitIndex }">
                            {{ unit }}
                        </span>
                    </div>
                </div>
                <button class="unit-arrow right" type="button" @click="nextUnit">
                    <i class="bi bi-caret-right-fill"></i>
                </button>
            </div>
        </div>
    `,
};

export default DurationInput;