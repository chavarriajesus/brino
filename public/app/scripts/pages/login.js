import { setPendingEmail } from "../state/store.js";
import { navigate } from "../router.js";
import { API_BASE } from '../config/config.js';

export function LoginPage() {
  const el = document.createElement('section');
  el.className = 'page login';
  el.innerHTML = `
  <div class ="login-box">
    <img src="/app/assets/logo_brino.png" alt="Brino Logo" class="login-logo" style="width: 200px;"/>
    <form id="login-form" class="login-form" novalidate>
      <label for="login-identifier" class="sr-only">Email or username</label>
      <input id="login-identifier" name="identifier" type="text"
             placeholder="Email or username" autocomplete="username" required />
      <button type="submit">Continue</button>
    </form>
    </div>
  `;


  const form = el.querySelector('#login-form');
  const input = el.querySelector('#login-identifier');



  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) {
      input.focus();
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/app/api/request-otp.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email }),
      });

      const data = await res.json();
      console.log('request-otp response:', data);

      if (!data || data.ok !== true) {
        alert(data?.error || 'could not send code');
        return;
      }

      try {
        console.log('A: before setPendingEmail');
        setPendingEmail(email);
        console.log('B: after setPEndingEmail');
        if (data.testing_code) console.log('OTP (dev only):', data.testing_code);

        console.log('C:before navigate');
        navigate('/app/verify');
        console.log('D:after navigate');
      } catch (err) {
      console.error('Network error:', err);
      alert('Network error');
    }
    

     
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error');
    }
  });

  return el;
}
  
/*

 if (data.ok) {
        // keep email for the verify step
        setPendingEmail(email);
        // console.log the testing code if returned by server
        if (data.testing_code) console.log('OTP (dev only):', data.testing_code);
        NavigationHistoryEntry('/app/verify');
       
      } else {
        alert(data.error || 'Login failed');
      }

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = input.value.trim();
    if (!id) {
      input.focus();
      return;
    }

try {
      const res = await fetch(`${API_BASE}/app/api/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: id }),
      });

if (data.ok) {
        // keep email for the verify step
        setPendingEmail(email);
        // console.log the testing code if returned by server
        if (data.testing_code) console.log('OTP (dev only):', data.testing_code);
        NavigationHistoryEntry('/app/verify');
        //setUser(data.user); navigate('/app/dashboard');
        const user = data.user;
        alert('User found: ' + (user.mail) + ' ' +
         (user.nombre));
      }

fetch('https://brino.mx/app/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'laura@livitsi.mx' })
    }).then(r=>r.json()).then(console.log);

fetch('https://brino.mx/app/api/request-otp.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'laura@livitsi.mx' })
    }).then(r=>r.json()).then(console.log);


    fetch('https://brino.mx/app/api/verify-otp.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'chavarriajesus@gmail.com', code: '201664' })
    }).then(r=>r.json()).then(console.log);
    */