<script>
import { defineComponent } from 'vue';
import { state } from './index';

export default defineComponent({
    name: 'notifications',
    props: {
        group: {
            type: String|null,
            default: null,
        },
        newOnTop: {
            type: Boolean,
            default: false,
        },
    },
    setup (props, { slots }) {
        return () => slots.default({
            notifications: props.newOnTop ?
                Array.from(state.notifications).filter(n => n.group === props.group).reverse() :
                Array.from(state.notifications).filter(n => n.group === props.group),
        })
    }
});
</script>
