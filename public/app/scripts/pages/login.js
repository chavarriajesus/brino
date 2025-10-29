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

  el.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = el.querySelector('#login-identifier').value.trim();
    if (!id) { el.querySelector('#login-identifier').focus(); return; }
    // TODO: call auth service; for now just log
    console.log('Login identifier:', id);
  });

  return el;

}