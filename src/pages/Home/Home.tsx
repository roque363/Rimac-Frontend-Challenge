import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuote } from '@root/hooks/useQuote';
import { useUser } from '@root/hooks/useUser';
import { homeSchema } from '@root/schemas/homeForm.schema';
import { getFirstZodMessage } from '@root/utils/zod';

const Home = () => {
  const navigate = useNavigate();
  const { state, setForm, setUser } = useQuote();
  const { loading, submitUserForm } = useUser();

  const onChange =
    (k: 'documentNumber' | 'phone' | 'privacy' | 'comms') =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const onSelect = (k: 'documentType') => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm({ [k]: e.target.value as any });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = homeSchema.safeParse(state.form);
    if (!parsed.success) {
      alert(getFirstZodMessage(parsed.error));
      return;
    }

    const fullUser = await submitUserForm(state.form);
    setUser(fullUser);
    navigate('/planes');
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* Tipo de documento */}
        <label>
          Tipo de documento
          <select value={state.form.documentType} onChange={onSelect('documentType')}>
            <option value="DNI">DNI</option>
            <option value="CE">Carné de Extranjería</option>
            <option value="RUC">RUC</option>
          </select>
        </label>

        {/* Número de documento */}
        <label>
          Número de documento
          <input
            value={state.form.documentNumber}
            onChange={onChange('documentNumber')}
            inputMode="text"
            autoComplete="off"
            required
          />
        </label>

        {/* Teléfono */}
        <label>
          Celular
          <input
            value={state.form.phone}
            onChange={onChange('phone')}
            inputMode="numeric"
            maxLength={9}
            required
          />
        </label>

        {/* Checks */}
        <label>
          <input type="checkbox" checked={state.form.privacy} onChange={onChange('privacy')} />
          Acepto la Política de Privacidad
        </label>

        <label>
          <input type="checkbox" checked={!!state.form.comms} onChange={onChange('comms')} />
          Acepto Comunicaciones Comerciales
        </label>

        <button type="submit" disabled={loading}>
          Cotiza aquí
        </button>
      </form>
    </div>
  );
};

export default Home;
