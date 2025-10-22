export default function TransactionList({ transactions }) {
  if (!transactions.length) return <p>No hay transacciones</p>;

  return (
    <ul>
      {transactions.map(tx => (
        <li key={tx.id}>
          {tx.fecha} — {tx.titulo} — {tx.tipo} — {tx.cantidad}€
        </li>
      ))}
    </ul>
  );
}
