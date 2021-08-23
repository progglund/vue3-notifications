import { App, reactive } from 'vue';
import Notifications from './Notifications.vue';

let count = 0;

const generateId = () => {
    count = count + 1;
    return count;
};

export const state = reactive({
    notifications: [],
});

export const removeNotification = (notificationId) => {
    state.notifications.splice(state.notifications.findIndex(n => n.id === notificationId), 1)
};

export function useNotifications(instanceOptions = {}) {
    let notification = reactive({
        instanceOptions: instanceOptions,
        notify(text, options = {}) {
            const id = generateId();
            options = (typeof text === 'object') ? text : options;

            const _options = {
                id: id,
                group: null,
                title: null,
                text: (typeof text === 'object') ? text.text : text,
                timeout: 2000,
            };

            const notification = {..._options, ...options};

            state.notifications.push(notification);

            setTimeout(() => {
                removeNotification(id);
            }, notification.timeout);
        }
    });

    return notification;
};

const install = (App) => {
    App.component('notifications', Notifications);
    App.config.globalProperties.$notify = (text, options = {}) => {
        const notifications = useNotifications({});
        notifications.notify(text, options);
    };
};

Notifications.install = install;

export { Notifications };

export default Notifications;
