import { daysToPercent } from "../utils.js";

const ExpirationBadge = {

    name: "ExpirationBadge",

    props: {
        batch:   { type: Array,  default: null },  // product-level: use the worst item
        item:    { type: Object, default: null },  // item-level: single batch entry
        variant: { type: String, default: 'row' }, // 'row' (Bootstrap) | 'card' (custom CSS)
    },

    computed: {
        percent() {
            if (this.batch) {
                if (!this.batch.length) return 0;
                return Math.max(...this.batch.map(i => daysToPercent(i.expiration)));
            }
            if (this.item) return daysToPercent(this.item.expiration);
            return 0;
        },
        barClass() {
            if (this.percent <= 40) return 'bg-success';
            if (this.percent <= 70) return 'bg-warning';
            return 'bg-danger';
        },
    },

    template: `
        <div v-if="variant === 'row'" class="progress-wrapper">
            <div class="progress">
                <div class="progress-bar" :class="barClass"
                     role="progressbar"
                     :style="{ width: percent + '%' }">
                </div>
            </div>
            <div class="expired-icon" v-if="percent === 100">
                <i class="bi bi-x-circle-fill"></i>
            </div>
        </div>
        <div v-else class="exp-track">
            <div class="exp-fill" :class="barClass"
                 :style="{ width: percent + '%' }">
            </div>
        </div>
    `,
};

export default ExpirationBadge;
