<script>
  let email = '';
  let password = '';
</script>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .login-form {
        width: 80%;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        text-align: center;
    }

    .login-form h2 {
        margin-bottom: 20px;
    }

    .login-form input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .login-form button {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        background-color: #000;
        color: #fff;
        cursor: pointer;
    }

    .login-form a {
        display: block;
        margin-top: 10px;
        text-decoration: none;
        color: #000;
    }

    .login-form .divider {
        margin: 20px 0;
        display: flex;
        align-items: center;
    }

    .login-form .divider::before,
    .login-form .divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: #ccc;
    }

    .login-form .divider span {
        margin: 0 10px;
    }

    .login-form .github-login {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border: 1px solid #000;
        border-radius: 4px;
        cursor: pointer;
    }

    .login-form .github-login img {
        margin-right: 10px;
    }

    .terms {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
    }
</style>

<div class="container">
  <div class="login-form">
    <h2>Connection</h2>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <a href="#">Forgot your password?</a>
    <button>Sign In with Email</button>
    <div class="divider">
      <span>OR CONTINUE WITH</span>
    </div>
    <div class="github-login">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Github" width="20" />
      Github
    </div>
    <div class="terms">
      By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
    </div>
  </div>
</div>
