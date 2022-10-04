import Auth from '../lib/standalone';
import '../lib/tay-auth.min.css';

Auth.mount(document.getElementById('app'), {
  google: true,
  github: true,
  facebook: true,
});
