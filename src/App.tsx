import { useEffect, useState, type FormEvent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Reading } from './pages/Reading';
import { Encyclopedia } from './pages/Encyclopedia';

const SPELL = 'ABRAKADABRA';
const SPELL_STORAGE_KEY = 'tarrot-spell-unlocked';

function App() {
  const [spell, setSpell] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(SPELL_STORAGE_KEY) === 'true';
  });
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = isUnlocked ? '' : 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isUnlocked]);

  const handleSpellSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (spell === SPELL) {
      window.sessionStorage.setItem(SPELL_STORAGE_KEY, 'true');
      setIsUnlocked(true);
      setError('');
      return;
    }

    setSpell('');
    setError('Zaklínadlo není správné.');
  };

  const handleSpellChange = (value: string) => {
    const normalized = value.toUpperCase().replace(/[^A-Z]/g, '');
    setSpell(normalized);

    if (error) {
      setError('');
    }
  };

  if (!isUnlocked) {
    return (
      <div
        className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#3f2d03_0%,#111827_32%,#0f172a_78%)] px-4 py-8"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        <div className="w-full max-w-xl rounded-[2rem] border border-gold-500/25 bg-mystic-900/95 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-md">
          <div className="text-center">
            <div className="text-sm uppercase tracking-[0.35em] text-gold-400/70">
              Vstupní pečeť
            </div>
            <h1 className="mt-3 font-serif text-3xl text-gold-400 sm:text-4xl">
              Zadejte zaklínadlo
            </h1>
            <p className="spell-hint mt-4 text-lg font-serif">
              "stvořím, jak mluvím"
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Bez správného zaklínadla zůstane Thothova brána uzavřena.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSpellSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm uppercase tracking-[0.28em] text-gold-400/70">
                Zaklínadlo
              </span>
              <input
                autoCapitalize="characters"
                autoComplete="off"
                autoCorrect="off"
                autoFocus
                className="w-full rounded-xl border border-gold-500/35 bg-mystic-800 px-4 py-4 text-center font-semibold uppercase tracking-[0.32em] text-gold-100 outline-none transition-colors placeholder:text-gold-400/25 focus:border-gold-400 focus:ring-2 focus:ring-gold-500/30"
                inputMode="text"
                maxLength={SPELL.length}
                onChange={(event) => handleSpellChange(event.target.value)}
                spellCheck={false}
                type="text"
                value={spell}
              />
            </label>

            {error ? (
              <p className="text-center text-sm text-amber-300">
                {error}
              </p>
            ) : null}

            <button
              className="w-full rounded-xl bg-gold-500 px-6 py-4 font-bold tracking-[0.22em] text-mystic-900 transition-colors hover:bg-gold-400"
              type="submit"
            >
              ODEMKNOUT BRÁNU
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Router basename="/tarrot/">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
