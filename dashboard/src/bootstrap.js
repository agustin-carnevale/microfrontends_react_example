import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// Mount function
const mount = (el) => {
    const app = createApp(Dashboard);
    app.mount(el);
};

//if we are in development and isolation, then
//call mount immediately
if (process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector('#_dashboard-dev-root');
    if(devRoot){
        mount(devRoot);
    }
}

//we export the mount function for the host/container to use
export { mount };
