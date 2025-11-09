import { getPendingEmail, clearPendingEmail, setUser } from '../state/store.js';
import { navigate } from '../router.js';

export function VerifyPage() {
  const email = getPendingEmail(); // must exist from previous step
  const el = document.createElement('section');
  el.className = 'page login'; // reuse same white box styling
  el.innerHTML = `
    <div class="login-box" style="color:#ffffff;">
      <img src="/app/assets/logo_brino.png" alt="Brino Logo" class="login-logo" style="width: 200px;"/>
      <form id="verify-form" class="login-form" novalidate>
        <p style="text-align:center;margin:0">We sent a 6-digit code to</p>
        <p style="text-align:center;font-weight:600;margin:.25rem 0 1rem">${email || ''}</p>
        <label for="otp-code" class="sr-only">6-digit code</label>
        <input id="otp-code" name="code" inputmode="numeric" pattern="[0-9]*" maxlength="6"
               placeholder="Enter 6-digit code" required />
        <button type="submit">Verify</button>
      </form>
      <button id="change-email" style="background:transparent;border:0;color:#ffffff;cursor:pointer">Use a different email</button>
    </div>
  `;

  const form = el.querySelector('#verify-form');
  const codeInput = el.querySelector('#otp-code');
  const changeBtn = el.querySelector('#change-email');

  const API_BASE =
    (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      ? 'https://brino.mx'
      : '';

  if (!email) {
    // No email stored; go back to login
    navigate('/app/login');
  }

  changeBtn.addEventListener('click', () => {
    clearPendingEmail();
    navigate('/app/login');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = codeInput.value.trim();
    if (code.length !== 6) { codeInput.focus(); return; }
    try {
    /*  const res = await fetch(`${API_BASE}/app/api/verify-otp.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, code })
      });
*/
    const res = await   fetch(`${API_BASE}/app/api/verify-otp.php`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `identifier=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`
});
      const raw = await res.text();
      let data; try { data = JSON.parse(raw); } catch { alert('Invalid server response'); return; }

      if (data.ok && data.user) {
        clearPendingEmail();
        setUser(data.user);
        navigate('/app'); // your router will show dashboard for logged-in users
      } else {
        alert(data.error || 'Invalid or expired code');
      }
    } catch (err) {
      console.error(err);
      alert('Network error on Verify');
    }
  });

  return el;
}