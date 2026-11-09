import { useState } from 'react';
import { Plus, Printer, Trash2 } from 'lucide-react';

const money = (value) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Number.isFinite(value) ? value : 0);
const number = (value) => Number(value || 0);

function AmountField({ label, name, value, onChange, required = true, hint, min = 0 }) {
  return (
    <label className="field">
      <span>{label}{required && <span className="required-mark"> *</span>}</span>
      <span className="input-with-suffix">
        <input name={name} type="number" min={min} step="any" value={value} onChange={(event) => onChange(event.target.value)} required={required} />
        <span>€</span>
      </span>
      {hint && <small>{hint}</small>}
    </label>
  );
}

function RateField({ label = 'Tipo aplicable', value, onChange, hint, required = true }) {
  return (
    <label className="field">
      <span>{label}{required && <span className="required-mark"> *</span>}</span>
      <span className="input-with-suffix">
        <input type="number" min="0" max="100" step="any" value={value} onChange={(event) => onChange(event.target.value)} required={required} />
        <span>%</span>
      </span>
      {hint && <small>{hint}</small>}
    </label>
  );
}

function CalculatorForm({ children, onSubmit, result }) {
  return (
    <div className="calculator-grid">
      <form className="calculator-panel" onSubmit={onSubmit}>
        <h2>Introduce tus datos</h2>
        <p className="form-note">Los campos son obligatorios salvo que se indique lo contrario.</p>
        <div className="field-stack">{children}</div>
        <button className="button button-primary button-wide" type="submit">Calcular resultado</button>
      </form>
      <section className="result-panel" aria-live="polite">
        {result || <div className="result-empty"><span className="result-orb">€</span><h2>Tu resultado aparecerá aquí</h2><p>Completa los campos para obtener un cálculo basado en los datos que has proporcionado.</p></div>}
      </section>
    </div>
  );
}

function Result({ eyebrow = 'Resultado orientativo', title, items, note }) {
  return (
    <div className="result-content">
      <span className="result-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <div className="result-items">
        {items.map(([label, amount, strong], index) => (
          <div className={`result-row ${strong ? 'result-total' : ''}`} key={`${label}-${index}`}>
            <span>{label}</span><strong>{money(amount)}</strong>
          </div>
        ))}
      </div>
      {note && <p className="result-note">{note}</p>}
    </div>
  );
}

export function QuotaCalculator() {
  const [monthly, setMonthly] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <CalculatorForm onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} result={submitted && <Result title={money(number(monthly)) + ' al mes'} items={[['Cuota mensual introducida', number(monthly)], ['Equivalente anual (12 meses)', number(monthly) * 12, true]]} note="Es una anualización aritmética de la cifra indicada; no estima ni verifica la cuota que te corresponde." />}>
      <AmountField label="Cuota mensual que quieres evaluar" name="monthly" value={monthly} onChange={setMonthly} hint="Introduce el importe mensual que deseas tener en cuenta." />
    </CalculatorForm>
  );
}

export function VatCalculator() {
  const [base, setBase] = useState('');
  const [rate, setRate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const vat = number(base) * number(rate) / 100;
  return (
    <CalculatorForm onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} result={submitted && <Result title={money(number(base) + vat)} items={[['Base imponible', number(base)], [`IVA (${number(rate)} %)`, vat], ['Total de la operación', number(base) + vat, true]]} note="El tipo se introduce manualmente. Comprueba qué tipo resulta aplicable a tu operación." />}>
      <AmountField label="Base imponible" name="base" value={base} onChange={setBase} />
      <RateField label="Tipo de IVA" value={rate} onChange={setRate} hint="Indica el porcentaje aplicable a tu operación." />
    </CalculatorForm>
  );
}

export function IrpfCalculator() {
  const [base, setBase] = useState('');
  const [rate, setRate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const withheld = number(base) * number(rate) / 100;
  return (
    <CalculatorForm onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} result={submitted && <Result title={money(withheld)} items={[['Base indicada', number(base)], [`Retención (${number(rate)} %)`, withheld, true], ['Importe tras la retención', number(base) - withheld]]} note="Cálculo aritmético con el porcentaje indicado. No determina el tipo de retención correspondiente a tu situación." />}>
      <AmountField label="Base de cálculo" name="base" value={base} onChange={setBase} />
      <RateField label="Porcentaje de retención" value={rate} onChange={setRate} hint="Introduce el porcentaje que quieres aplicar al cálculo." />
    </CalculatorForm>
  );
}

export function NetProfitCalculator() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [quota, setQuota] = useState('');
  const [other, setOther] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const total = number(income) - number(expenses) - number(quota) - number(other);
  return (
    <CalculatorForm onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} result={submitted && <Result title={money(total)} items={[['Ingresos', number(income)], ['Gastos introducidos', -number(expenses)], ['Cuota introducida', -number(quota)], ['Otros costes introducidos', -number(other)], ['Resultado tras los importes indicados', total, true]]} note="Este resultado no calcula impuestos ni determina qué gastos son deducibles. Introduce los costes que quieras considerar." />}>
      <AmountField label="Ingresos" name="income" value={income} onChange={setIncome} />
      <AmountField label="Gastos" name="expenses" value={expenses} onChange={setExpenses} />
      <AmountField label="Cuota de autónomos" name="quota" value={quota} onChange={setQuota} />
      <AmountField label="Otros costes" name="other" value={other} onChange={setOther} required={false} />
    </CalculatorForm>
  );
}

export function QuarterlyCalculator() {
  const [vatCharged, setVatCharged] = useState('');
  const [vatPaid, setVatPaid] = useState('');
  const [payments, setPayments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const balance = number(vatCharged) - number(vatPaid) + number(payments);
  return (
    <CalculatorForm onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} result={submitted && <Result title={money(balance)} items={[['IVA repercutido indicado', number(vatCharged)], ['IVA soportado indicado', -number(vatPaid)], ['Pagos a cuenta indicados', number(payments)], ['Suma orientativa', balance, true]]} note="Suma aritmética de las cifras introducidas. No es una liquidación, no aplica reglas fiscales y puede no representar el importe a ingresar o compensar." />}>
      <AmountField label="IVA repercutido" name="vatCharged" value={vatCharged} onChange={setVatCharged} hint="Importe total que quieras considerar." />
      <AmountField label="IVA soportado" name="vatPaid" value={vatPaid} onChange={setVatPaid} hint="Importe que quieras considerar como soportado." />
      <AmountField label="Pagos a cuenta de IRPF u otros importes" name="payments" value={payments} onChange={setPayments} required={false} />
    </CalculatorForm>
  );
}

const emptyLine = () => ({ description: '', quantity: '1', price: '', vat: '' });

export function InvoiceGenerator() {
  const [details, setDetails] = useState({ number: '', date: '', issuer: '', issuerId: '', issuerAddress: '', client: '', clientId: '', clientAddress: '' });
  const [lines, setLines] = useState([emptyLine()]);
  const [withholding, setWithholding] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const updateDetails = (event) => setDetails({ ...details, [event.target.name]: event.target.value });
  const updateLine = (index, key, value) => setLines(lines.map((line, i) => i === index ? { ...line, [key]: value } : line));
  const base = lines.reduce((sum, line) => sum + number(line.quantity) * number(line.price), 0);
  const vatTotal = lines.reduce((sum, line) => sum + number(line.quantity) * number(line.price) * number(line.vat) / 100, 0);
  const withheld = base * number(withholding) / 100;
  const total = base + vatTotal - withheld;
  const setField = (name, value) => setDetails((old) => ({ ...old, [name]: value }));

  return (
    <div className="invoice-layout">
      <form className="calculator-panel invoice-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <h2>Datos de la factura</h2>
        <div className="invoice-fields">
          <label className="field"><span>Número de factura *</span><input name="number" value={details.number} onChange={updateDetails} required /></label>
          <label className="field"><span>Fecha *</span><input name="date" type="date" value={details.date} onChange={updateDetails} required /></label>
        </div>
        <h3>Emisor</h3>
        <div className="invoice-fields">
          <label className="field"><span>Nombre o razón social *</span><input name="issuer" value={details.issuer} onChange={updateDetails} required /></label>
          <label className="field"><span>NIF/CIF</span><input name="issuerId" value={details.issuerId} onChange={updateDetails} /></label>
          <label className="field field-span"><span>Domicilio</span><input name="issuerAddress" value={details.issuerAddress} onChange={updateDetails} /></label>
        </div>
        <h3>Cliente</h3>
        <div className="invoice-fields">
          <label className="field"><span>Nombre o razón social *</span><input name="client" value={details.client} onChange={updateDetails} required /></label>
          <label className="field"><span>NIF/CIF</span><input name="clientId" value={details.clientId} onChange={updateDetails} /></label>
          <label className="field field-span"><span>Domicilio</span><input name="clientAddress" value={details.clientAddress} onChange={updateDetails} /></label>
        </div>
        <div className="line-heading"><h3>Conceptos</h3><button className="button button-small button-outline" type="button" onClick={() => setLines([...lines, emptyLine()])}><Plus size={15} /> Añadir línea</button></div>
        {lines.map((line, index) => (
          <div className="invoice-line" key={index}>
            <label className="field line-description"><span>Descripción *</span><input value={line.description} onChange={(event) => updateLine(index, 'description', event.target.value)} required /></label>
            <label className="field"><span>Unidades</span><input type="number" min="0" step="any" value={line.quantity} onChange={(event) => updateLine(index, 'quantity', event.target.value)} required /></label>
            <label className="field"><span>Precio/unidad (€)</span><input type="number" min="0" step="any" value={line.price} onChange={(event) => updateLine(index, 'price', event.target.value)} required /></label>
            <label className="field"><span>IVA (%)</span><input type="number" min="0" max="100" step="any" value={line.vat} onChange={(event) => updateLine(index, 'vat', event.target.value)} required /></label>
            <button type="button" className="icon-button remove-line" aria-label={`Eliminar línea ${index + 1}`} disabled={lines.length === 1} onClick={() => setLines(lines.filter((_, i) => i !== index))}><Trash2 size={17} /></button>
          </div>
        ))}
        <div className="invoice-fields withholding-field">
          <RateField label="Retención opcional (%)" value={withholding} onChange={setWithholding} required={false} hint="Deja el campo vacío si no quieres incluir una retención." />
        </div>
        {submitted && <p className="success-message" role="status">Vista previa actualizada. Revisa los datos antes de imprimir.</p>}
        <button className="button button-primary" type="submit">Actualizar vista previa</button>
      </form>
      <section className="invoice-preview" aria-label="Vista previa de factura">
        <div className="invoice-preview-toolbar">
          <span>Vista previa</span>
          <button type="button" className="button button-small button-outline" onClick={() => window.print()}><Printer size={15} /> Imprimir / guardar PDF</button>
        </div>
        <article className="invoice-paper">
          <div className="invoice-paper-head"><div><span className="eyebrow">FACTURA</span><h2>{details.number || 'N.º —'}</h2></div><div className="invoice-date">{details.date || 'Fecha pendiente'}</div></div>
          <div className="invoice-parties">
            <div><small>EMISOR</small><strong>{details.issuer || 'Nombre del emisor'}</strong><span>{details.issuerId}</span><span>{details.issuerAddress}</span></div>
            <div><small>CLIENTE</small><strong>{details.client || 'Nombre del cliente'}</strong><span>{details.clientId}</span><span>{details.clientAddress}</span></div>
          </div>
          <table className="invoice-table"><thead><tr><th>Concepto</th><th>Unid.</th><th>Precio</th><th>IVA</th><th>Importe</th></tr></thead>
            <tbody>{lines.map((line, index) => <tr key={index}><td>{line.description || 'Concepto'}</td><td>{number(line.quantity)}</td><td>{money(number(line.price))}</td><td>{number(line.vat)}%</td><td>{money(number(line.quantity) * number(line.price) * (1 + number(line.vat) / 100))}</td></tr>)}</tbody>
          </table>
          <div className="invoice-totals"><div><span>Base imponible</span><strong>{money(base)}</strong></div><div><span>IVA</span><strong>{money(vatTotal)}</strong></div>{withholding && <div><span>Retención indicada</span><strong>− {money(withheld)}</strong></div>}<div className="invoice-grand-total"><span>Total</span><strong>{money(total)}</strong></div></div>
          <p className="invoice-disclaimer">Documento de apoyo. Comprueba que incluye los datos y requisitos aplicables antes de emitirlo.</p>
        </article>
      </section>
    </div>
  );
}
