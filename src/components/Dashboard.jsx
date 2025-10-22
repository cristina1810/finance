import { useState, useEffect } from "react";
import ButtonsPanel from "./ButtonsPanel.jsx";
import AccountsList from "./AccountsList.jsx";
import TagsList from "./TagsList.jsx";
import FixedExpensesList from "./FixedExpensesList.jsx";
import { useUser } from "../context/UserContext";
import TransactionForm from "./TransactionForm.jsx";
import {
  Menu,
  X,
  Eye,
  Tag,
  Receipt,
  Settings,
  LogOut,
  EyeOff,
  PiggyBank,
  Wallet,
  ShoppingCart,
  CreditCard,
  Baby,
  Smile,
  Tickets,
  RefreshCw,
  Notebook,
  Wrench,
  Heart,
  Star,
  Folder,
  Sofa,
  Apple,
  TrainFront,
  IdCard,
} from "lucide-react";

export default function Dashboard() {
  const { user, loading, logout } = useUser();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [tags, setTags] = useState([]);
  const [showNextMonthExpenses, setShowNextMonthExpenses] = useState(false);

  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionType, setTransactionType] = useState("income");
  const [toggle, setToggle] = useState(false);

  // Estados de visibilidad por elemento
  const [visibleAccounts, setVisibleAccounts] = useState({});
  const [visibleTags, setVisibleTags] = useState({});
  const [visibleFixedExpenses, setVisibleFixedExpenses] = useState({});

  // Inicializar desde localStorage al montar (solo cliente)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAccounts = localStorage.getItem("visibleAccounts");
      if (savedAccounts) setVisibleAccounts(JSON.parse(savedAccounts));

      const savedTags = localStorage.getItem("visibleTags");
      if (savedTags) setVisibleTags(JSON.parse(savedTags));

      const savedFE = localStorage.getItem("visibleFixedExpenses");
      if (savedFE) setVisibleFixedExpenses(JSON.parse(savedFE));
    }
  }, []);

  // Guardar cambios automáticamente
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("visibleAccounts", JSON.stringify(visibleAccounts));
      localStorage.setItem("visibleTags", JSON.stringify(visibleTags));
      localStorage.setItem(
        "visibleFixedExpenses",
        JSON.stringify(visibleFixedExpenses)
      );
    }
  }, [visibleAccounts, visibleTags, visibleFixedExpenses]);

  // Actualizar visibilidad al cargar datos nuevos
  useEffect(() => {
    setVisibleAccounts((prev) => {
      const updated = { ...prev };
      accounts.forEach((acc) => {
        if (updated[acc.id] === undefined) updated[acc.id] = true;
      });
      return updated;
    });

    setVisibleTags((prev) => {
      const updated = { ...prev };
      tags.forEach((tag) => {
        if (updated[tag.id] === undefined) updated[tag.id] = true;
      });
      return updated;
    });

    setVisibleFixedExpenses((prev) => {
      const updated = { ...prev };
      fixedExpenses.forEach((fe) => {
        if (updated[fe.id] === undefined) updated[fe.id] = true;
      });
      return updated;
    });
  }, [accounts, tags, fixedExpenses]);

  // Obtener datos del mes actual
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const nextMonth = currentMonth + 1;
  const nextMonthYear = nextMonth === 12 ? currentYear + 1 : currentYear;
  const nextMonthFixedExpenses = fixedExpenses.filter((fe) => {
    const date = new Date(fe.date);
    return (
      date.getMonth() === nextMonth % 12 && date.getFullYear() === nextMonthYear
    );
  });
  const thisMonthFixedExpenses = fixedExpenses.filter((fe) => {
    const date = new Date(fe.date);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });
  const iconsMap = {
    PiggyBank: PiggyBank,
    Wallet: Wallet,
    ShoppingCart: ShoppingCart,
    CreditCard: CreditCard,
    Baby: Baby,
    Smile: Smile,
    Tickets: Tickets,
    RefreshCw: RefreshCw,
    Notebook: Notebook,
    Wrench: Wrench,
    Heart: Heart,
    Star: Star,
    Folder: Folder,
    Sofa: Sofa,
    Apple: Apple,
    TrainFront: TrainFront,
    IdCard: IdCard,
  };
  const toggleNextMonthExpenses = () => {
    setShowNextMonthExpenses((prevState) => !prevState);
  };

  // Ordenar elementos por nombre
  const sortedAccounts = [...accounts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedTags = [...tags].sort((a, b) => a.name.localeCompare(b.name));
  const sortedFixedExpenses = [...thisMonthFixedExpenses].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedNextMonthFixedExpenses = [...nextMonthFixedExpenses].sort(
    (a, b) => a.name.localeCompare(b.name)
  );

  // Cargar datos desde la API
  useEffect(() => {
    if (!user?.id) return;

    const fetchAll = async () => {
      try {
        const [accRes, transRes, feRes, tagsRes] = await Promise.all([
          fetch(`/api/accounts?userId=${user.id}`),
          fetch(`/api/transactions?userId=${user.id}`),
          fetch(`/api/fixed-expenses?userId=${user.id}`),
          fetch(`/api/tags?userId=${user.id}`),
        ]);

        const [accJson, transJson, feJson, tagsJson] = await Promise.all([
          accRes.json(),
          transRes.json(),
          feRes.json(),
          tagsRes.json(),
        ]);

        setAccounts(accJson.data || []);
        setTransactions(transJson.data || []);
        setFixedExpenses(feJson.data || []);
        setTags(tagsJson.data || []);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    fetchAll();
  }, [user]);

  if (loading) return <p>Cargando usuario...</p>;
  if (!user) return <p>No estás logueado.</p>;

  return (
    <div className="flex-1 flex flex-col py-6">
      {/* Header */}
      <div className="flex items-center bg-background-light p-4 pb-2 justify-between sticky top-0 z-10">
        <button onClick={() => setToggle(true)}>
          <Menu />
        </button>
        <h1 className="text-text-light text-lg font-bold flex-1 text-center">
          Bienvenid@{user?.name ? `, ${user.name}` : ""}
        </h1>
      </div>

      {/* Botones para crear transacciones */}
      <ButtonsPanel
        setShowTransactionForm={setShowTransactionForm}
        setTransactionType={setTransactionType}
      />

      {showTransactionForm && (
        <TransactionForm
          accounts={accounts}
          type={transactionType}
          addTransaction={(tx) => setTransactions((prev) => [...prev, tx])}
          closeForm={() => setShowTransactionForm(false)}
        />
      )}

      {/* Contenido principal */}
      <section>
        <AccountsList
          accounts={sortedAccounts.filter((acc) => visibleAccounts[acc.id])}
          setAccounts={setAccounts}
          transactions={transactions}
        />
      </section>

      <section>
        <TagsList
          tags={sortedTags.filter((tag) => visibleTags[tag.id])}
          setTags={setTags}
          transactions={transactions}
        />
      </section>

      <section className="my-4">
        <FixedExpensesList
          fixedExpenses={sortedFixedExpenses.filter(
            (fe) => visibleFixedExpenses[fe.id]
          )}
          setFixedExpenses={setFixedExpenses}
          accounts={accounts}
        />
        <section className="my-4">
          <section
            className="text-[var(--dark-gray)] flex gap-6 p-4 uppercase font-bold flex justify-between"
            onClick={toggleNextMonthExpenses}
          >
            <p>Mes siguiente</p>
            <>{!showNextMonthExpenses && <EyeOff className="w-5 h-5 mr-5" />}</>
          </section>

          {showNextMonthExpenses && (
            <FixedExpensesList
              fixedExpenses={sortedNextMonthFixedExpenses.filter(
                (fe) => visibleFixedExpenses[fe.id]
              )}
              setFixedExpenses={setFixedExpenses}
              accounts={accounts}
              showHeader={false}
            />
          )}
        </section>
      </section>

      {/* Barra lateral */}
      {toggle && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setToggle(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 p-4 overflow-y-auto">
            {/* Usuario */}
            <div className="flex flex-col justify-between mb-8 space-y-4">
              <button
                onClick={() => setToggle(false)}
                className="p-2 ms-auto m-0"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col items-center ">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Secciones con visibilidad */}
            <nav className="flex-grow space-y-6">
              {/* Cuentas */}
              {/* Cuentas */}
              <div>
                <h3 className="text-[var(--dark-gray)] text-sm font-semibold uppercase tracking-wider mb-3 px-4">
                  Cuentas
                </h3>
                <ul className="pl-4 space-y-1">
                  {sortedAccounts.map((acc) => {
                    const Icon = iconsMap[acc.icon_name] || Wallet;
                    const isVisible = visibleAccounts[acc.id];

                    return (
                      <li key={acc.id}>
                        <button
                          onClick={() =>
                            setVisibleAccounts((prev) => ({
                              ...prev,
                              [acc.id]: !prev[acc.id],
                            }))
                          }
                          className={`font-medium flex items-center py-3 px-4 ${
                            isVisible ? "font-bold" : "text-gray-400"
                          }`}
                        >
                          {isVisible ? (
                            <Icon
                              className="w-5 h-5 mr-4 shrink-0"
                              style={{ color: acc.color }}
                            />
                          ) : (
                            <EyeOff className="w-5 h-5 text-gray-400 mr-4 shrink-0" />
                          )}
                          {acc.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Etiquetas */}
              <div>
                <h3 className="text-[var(--dark-gray)] text-sm font-semibold uppercase tracking-wider mb-3 px-4">
                  Etiquetas
                </h3>
                <ul className="pl-4 space-y-1">
                  {sortedTags.map((tag) => {
                    const Icon = iconsMap[tag.icon_name] || Tag;
                    const isVisible = visibleTags[tag.id];

                    return (
                      <li key={tag.id}>
                        <button
                          onClick={() =>
                            setVisibleTags((prev) => ({
                              ...prev,
                              [tag.id]: !prev[tag.id],
                            }))
                          }
                          className={`font-medium flex items-center py-3 px-4 ${
                            isVisible ? "font-bold" : "text-gray-400"
                          }`}
                        >
                          {isVisible ? (
                            <Icon
                              className="w-5 h-5 mr-4 shrink-0"
                              style={{ color: tag.color }}
                            />
                          ) : (
                            <EyeOff className="text-gray-400 mr-4 shrink-0" />
                          )}
                          {tag.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* Gastos Fijos */}
              <div>
                <h3 className="text-[var(--dark-gray)] text-sm font-semibold uppercase tracking-wider mb-3 px-4">
                  Gastos Fijos
                </h3>
                <ul className="pl-4 space-y-1">
                  {sortedFixedExpenses.map((fe) => {
                    const Icon = iconsMap[fe.icon_name] || Receipt;
                    const isVisible = visibleFixedExpenses[fe.id];

                    return (
                      <li key={fe.id}>
                        <button
                          onClick={() =>
                            setVisibleFixedExpenses((prev) => ({
                              ...prev,
                              [fe.id]: !prev[fe.id],
                            }))
                          }
                          className={`font-medium flex items-center py-3 px-4 ${
                            isVisible ? "font-bold" : "text-gray-400"
                          }`}
                        >
                          {isVisible ? (
                            <Icon
                              className="w-5 h-5 mr-4 shrink-0"
                              style={{ color: fe.color }}
                            />
                          ) : (
                            <EyeOff className="text-gray-400 mr-4 shrink-0" />
                          )}
                          {fe.name} - {fe.amount}€
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="border-t border-gray-200 my-4" />

              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" /> Configuración
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
                <LogOut className="w-5 h-5" /> Cerrar Sesión
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
