# vue3-notifications

### Installation

```
npm i @progglund/vue3-notifications
```

### Usage

```javascript
import Notifications from '@progglund/vue3-notifications';

this.$notify('Hello World');
```

##### Composition API

```javascript
import { Notifications, useNotifications } from '@progglund/vue3-notifications';

export default {
    components: { Notifications },

    setup() {
        const notifications = useNotifications();

        function addNotification() {
            notifications.notify('Hello World')
        }

        return { addNotification }
    }
}
```

### Markup / Styling

We dont include any styling / transitions, you have to make them yourself.

Example with [Animate](https://animate.style/) and [Tailwind](https://tailwindcss.com/).

```html
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">

<style>
    .notification-item {
        transition: all .5s;
    }
    .notification-enter-active {
        animation: fadeInDown;
        animation-duration: .6s;
    }
    .notification-leave-active {
        animation: fadeOut;
        animation-duration: .6s;
    }
</style>

<notifications :new-on-top="true" v-slot="{ notifications }">
    <div class="fixed inset-0 flex pointer-events-none justify-start">
        <div class="max-w-sm w-full">
            <transition-group name="notification">
                <div v-for="notification in notifications" :key="notification.id" class="notification-item bg-green-500 text-white rounded py-2 px-4 m-6 text-sm">
                    {{ notification.text }}
                </div>
            </transition-group>
        </div>
    </div>
</notifications>
```
