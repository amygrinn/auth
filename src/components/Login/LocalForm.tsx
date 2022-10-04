import useSwitch from '@taylorgrinn/switch';
import React, { FormEvent, useContext, useEffect } from 'react';
import useInput from '../../hooks/use-input';
import { actions, AuthContext } from '../../store';
import invalidMessage from '../../util/invalid-message';
import * as Spinners from '../Spinners';

interface LocalFormProps {
  LOGIN: boolean;
  REGISTER: boolean;
  RESET: boolean;
}

export default function LocalForm(props: LocalFormProps) {
  const { LOGIN, REGISTER, RESET } = props;

  const [{ reset }, , dispatch] = useContext(AuthContext);

  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();
  const [code, onCodeChange] = useInput();

  const [resetContainer, setResetState, INITIAL, VERIFY, PASSWORD] = useSwitch(
    { name: 'reset' },
    'initial',
    'verify',
    'password',
    'success'
  );
  useEffect(setResetState(reset.state), [reset.state]);

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (LOGIN) dispatch(actions.login(email, password));
    if (REGISTER) return dispatch(actions.register(email, password));
    if (RESET) {
      if (INITIAL) return dispatch(actions.reset.sendCode(email));
      if (VERIFY) return dispatch(actions.reset.verify(email, code));
      if (PASSWORD)
        return dispatch(actions.reset.password(email, code, password));
    }
  };

  return (
    <form {...resetContainer} onSubmit={onSubmit} className="tay-local">
      <label data-prov="local" htmlFor="email" data-reset="!success">
        Email Address
      </label>
      <input
        data-prov="local"
        data-reset="!success"
        placeholder="Enter your email"
        required
        id="email"
        onChange={onEmailChange}
        type="email"
        disabled={RESET && !INITIAL}
      />

      <p data-prov="local" data-auth="reset" data-reset="verify">
        Check your email for a one time code and enter it here:
      </p>
      <label
        htmlFor="code"
        data-prov="local"
        data-auth="reset"
        data-reset="verify password"
      >
        One-time Code
      </label>
      <input
        data-prov="local"
        data-auth="reset"
        data-reset="verify password"
        placeholder="Enter one-time code"
        required={RESET && VERIFY}
        id="code"
        type="password"
        onChange={onCodeChange}
        disabled={!VERIFY}
      />

      <label htmlFor="password" data-prov="local" data-reset="password">
        {RESET && 'New '} Password
      </label>
      <input
        data-prov="local"
        placeholder="Enter password"
        required={LOGIN || REGISTER || PASSWORD}
        id="password"
        data-reset="password"
        onChange={onPasswordChange}
        minLength={6}
        type="password"
      />

      <label
        data-prov="local"
        htmlFor="confirm-password"
        data-auth="!login"
        data-reset="password"
      >
        Confirm Password
      </label>
      <input
        data-prov="local"
        placeholder="Confirm password"
        required={REGISTER}
        id="confirm-password"
        data-auth="!login"
        data-reset="password"
        type="password"
        pattern={password}
        {...invalidMessage('Passwords do not match')}
      />

      <input data-prov="local" data-auth="login" type="submit" value="Login" />
      <input
        data-prov="local"
        type="submit"
        value="Register"
        data-auth="register"
      />

      {reset.loading && <Spinners.Small />}
      {!reset.loading && (
        <input
          data-prov="local"
          type="submit"
          value="Reset Password"
          data-auth="reset"
          data-reset="initial"
        />
      )}
      {!reset.loading && (
        <input
          data-prov="local"
          type="submit"
          value="Verify Code"
          data-auth="reset"
          data-reset="verify"
        />
      )}
      {!reset.loading && (
        <input
          data-prov="local"
          type="submit"
          value="Change Password"
          data-auth="reset"
          data-reset="password"
        />
      )}

      <h3 data-auth="reset" data-reset="success">
        Success!
      </h3>
      <p data-auth="reset" data-reset="success">
        Your password has been changed
      </p>
    </form>
  );
}
