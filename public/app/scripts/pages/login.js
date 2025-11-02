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
/*
  el.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = el.querySelector('#login-identifier').value.trim();
    if (!id) { el.querySelector('#login-identifier').focus(); return; }
    // TODO: call auth service; for now just log
    console.log('Login identifier:', id);
  });
  */


  const form = el.querySelector('#login-form');
  const input = el.querySelector('#login-identifier');

  // 👇 This automatically points to the correct backend
  const API_BASE =
    (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      ? 'https://brino.mx' // when running locally
      : '';                      // same-origin in production

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

      const data = await res.json();
      console.log('login response:', data);

      if (data.ok) {
        // later: setUser(data.user); navigate('/app/dashboard');
        const user = data.user;
        alert('User found: ' + (user.mail) + ' ' +
         (user.nombre));
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error');
    }
  });

  return el;
}
/*
fetch('https://brino.mx/app/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'laura@livitsi.mx' })
    }).then(r=>r.json()).then(console.log);
    */