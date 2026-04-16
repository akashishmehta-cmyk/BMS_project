import { useMemo, useState } from "react";

const defaultInputs = {
  itemWeight: 12.4,
  itemVisibility: 0.06,
  itemMrp: 156.3,
  itemType: "Dairy",
  itemFat: "Low Fat",
  outletSize: "Medium",
  outletLocation: "Tier 2",
  outletType: "Supermarket Type1",
  outletAge: 14,
};

const itemTypeImpact: Record<string, number> = {
  Dairy: 120,
  "Snack Foods": 80,
  "Household": 60,
  "Frozen Foods": 40,
  "Fruits and Vegetables": 70,
  "Health and Hygiene": 90,
  "Soft Drinks": 50,
};

const outletTypeImpact: Record<string, number> = {
  "Supermarket Type1": 200,
  "Supermarket Type2": 260,
  "Supermarket Type3": 320,
  "Grocery Store": 120,
};

const outletSizeImpact: Record<string, number> = {
  Small: 80,
  Medium: 140,
  High: 210,
};

const outletLocationImpact: Record<string, number> = {
  "Tier 1": 180,
  "Tier 2": 140,
  "Tier 3": 110,
};

export function App() {
  const [inputs, setInputs] = useState(defaultInputs);
  const [submitted, setSubmitted] = useState(false);

  const prediction = useMemo(() => {
    const base = 350 + inputs.itemMrp * 3.2;
    const weightBoost = inputs.itemWeight * 5.4;
    const visibilityPenalty = inputs.itemVisibility * 400;
    const fatBoost = inputs.itemFat === "Low Fat" ? 60 : 20;
    const typeBoost = itemTypeImpact[inputs.itemType] ?? 55;
    const outletBoost = outletTypeImpact[inputs.outletType] ?? 150;
    const sizeBoost = outletSizeImpact[inputs.outletSize] ?? 100;
    const locationBoost = outletLocationImpact[inputs.outletLocation] ?? 120;
    const agePenalty = inputs.outletAge * 8.5;
    const total =
      base +
      weightBoost +
      fatBoost +
      typeBoost +
      outletBoost +
      sizeBoost +
      locationBoost -
      visibilityPenalty -
      agePenalty;
    return Math.max(total, 0);
  }, [inputs]);

  const handleChange = (field: keyof typeof defaultInputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]:
        field === "itemWeight" ||
        field === "itemVisibility" ||
        field === "itemMrp" ||
        field === "outletAge"
          ? Number.parseFloat(value)
          : value,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3h18v18H3z" />
                <path d="M7 16V8" />
                <path d="M12 16V4" />
                <path d="M17 16v-5" />
              </svg>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/80">
                Big Mart
              </p>
              <h1 className="text-xl font-semibold text-white">
                Sales Prediction Lab
              </h1>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-sm text-slate-300 md:flex">
            <span className="rounded-full border border-white/10 px-3 py-1">ML Demo</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Analytics</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Forecasting</span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Demand intelligence powered by predictive modeling
            </div>
            <h2 className="text-4xl font-semibold leading-tight text-white">
              Predict Big Mart item sales with high-impact retail signals.
            </h2>
            <p className="text-slate-300">
              Explore a full pipeline experience: dataset profiling, model monitoring, and a
              live prediction sandbox that mimics the Big Mart sales prediction challenge.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Items Tracked", value: "8,523" },
                { label: "Outlets Modeled", value: "10" },
                { label: "Model Accuracy", value: "87.4%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6">
              <div>
                <p className="text-sm text-emerald-200">Latest Model Run</p>
                <h3 className="text-2xl font-semibold">Gradient Boosted Regression</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "MAE", value: "764" },
                  { label: "RMSE", value: "1,128" },
                  { label: "R² Score", value: "0.87" },
                ].map((metric) => (
                  <div key={metric.label}>
                    <p className="text-xs uppercase tracking-widest text-slate-500">
                      {metric.label}
                    </p>
                    <p className="text-lg font-semibold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400">
                Feature engineering includes outlet age, visibility normalization, and item
                category clustering.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-200">Live Prediction</p>
                <h3 className="text-2xl font-semibold">Sales Forecast</h3>
              </div>
              <div className="rounded-2xl bg-emerald-500/15 px-4 py-2 text-lg font-semibold text-emerald-200">
                ₹ {prediction.toFixed(0)}
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Adjust inputs and run a simulated forecast for the expected item sales.
            </p>
            <form
              className="mt-6 grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-slate-300">
                  Item Weight (kg)
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.itemWeight}
                    onChange={(event) => handleChange("itemWeight", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white"
                  />
                </label>
                <label className="text-sm text-slate-300">
                  Item MRP (₹)
                  <input
                    type="number"
                    step="1"
                    value={inputs.itemMrp}
                    onChange={(event) => handleChange("itemMrp", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white"
                  />
                </label>
                <label className="text-sm text-slate-300">
                  Item Visibility
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.itemVisibility}
                    onChange={(event) => handleChange("itemVisibility", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white"
                  />
                </label>
                <label className="text-sm text-slate-300">
                  Outlet Age (yrs)
                  <input
                    type="number"
                    step="1"
                    value={inputs.outletAge}
                    onChange={(event) => handleChange("outletAge", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-slate-300">
                  Item Type
                  <select
                    value={inputs.itemType}
                    onChange={(event) => handleChange("itemType", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white"
                  >
                    {Object.keys(itemTypeImpact).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  Fat Content
                  <select
                    value={inputs.itemFat}
                    onChange={(event) => handleChange("itemFat", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white"
                  >
                    <option value="Low Fat">Low Fat</option>
                    <option value="Regular">Regular</option>
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  Outlet Size
                  <select
                    value={inputs.outletSize}
                    onChange={(event) => handleChange("outletSize", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white"
                  >
                    {Object.keys(outletSizeImpact).map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-slate-300">
                  Outlet Location
                  <select
                    value={inputs.outletLocation}
                    onChange={(event) => handleChange("outletLocation", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white"
                  >
                    {Object.keys(outletLocationImpact).map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-slate-300 sm:col-span-2">
                  Outlet Type
                  <select
                    value={inputs.outletType}
                    onChange={(event) => handleChange("outletType", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white"
                  >
                    {Object.keys(outletTypeImpact).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950"
                >
                  Run Prediction
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/10 px-5 py-2 text-sm text-slate-200"
                  onClick={() => {
                    setInputs(defaultInputs);
                    setSubmitted(false);
                  }}
                >
                  Reset Defaults
                </button>
                {submitted && (
                  <span className="text-sm text-emerald-200">
                    Prediction updated just now.
                  </span>
                )}
              </div>
            </form>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-200">Feature Importance</p>
                <h3 className="text-2xl font-semibold">Top Drivers of Sales</h3>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                Model v2.3
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { label: "Item MRP", value: 92 },
                { label: "Outlet Type", value: 78 },
                { label: "Outlet Size", value: 64 },
                { label: "Item Visibility", value: 58 },
                { label: "Outlet Location", value: 45 },
              ].map((feature) => (
                <div key={feature.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{feature.label}</span>
                    <span className="text-emerald-200">{feature.value}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-200"
                      style={{ width: `${feature.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-sm text-emerald-200">Outlet Performance</p>
            <h3 className="text-2xl font-semibold">Revenue Mix Snapshot</h3>
            <p className="mt-2 text-sm text-slate-400">
              Real-time comparison across outlet categories based on average item sales.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { label: "Supermarket Type3", value: 62, color: "bg-emerald-400" },
                { label: "Supermarket Type2", value: 52, color: "bg-sky-400" },
                { label: "Supermarket Type1", value: 45, color: "bg-indigo-400" },
                { label: "Grocery Store", value: 28, color: "bg-rose-400" },
              ].map((outlet) => (
                <div key={outlet.label} className="flex items-center gap-3">
                  <div className="w-32 text-sm text-slate-300">{outlet.label}</div>
                  <div className="h-2 flex-1 rounded-full bg-slate-800">
                    <div
                      className={`h-2 rounded-full ${outlet.color}`}
                      style={{ width: `${outlet.value}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm text-slate-400">
                    {outlet.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Data Preparation",
              description:
                "Missing values imputed using median strategy. Visibility treated with log transform.",
              items: ["Normalize MRP", "Encode outlet type", "One-hot item type"],
            },
            {
              title: "Model Monitoring",
              description:
                "Daily drift monitoring against baseline distribution with automated alerts.",
              items: ["Drift score: 0.12", "Alert threshold: 0.3", "Pipeline uptime: 99.2%"],
            },
            {
              title: "Business Actions",
              description:
                "Forecast output guides inventory planning and store-level promotions.",
              items: ["Auto-replenish fast movers", "Bundle slow movers", "Price elasticity"],
            },
          ].map((card) => (
            <div key={card.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h4 className="text-lg font-semibold text-white">{card.title}</h4>
              <p className="mt-3 text-sm text-slate-400">{card.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/15 via-slate-900 to-emerald-500/10 p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/80">
                Ready for deployment
              </p>
              <h3 className="mt-3 text-3xl font-semibold">Operationalize the forecast</h3>
              <p className="mt-2 text-sm text-slate-300">
                Connect POS data streams, automate inventory alerts, and surface sales
                predictions inside your supply chain dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Prediction API latency</span>
                <span className="text-emerald-200">120 ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Confidence interval</span>
                <span className="text-emerald-200">± 8.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Weekly retrain cadence</span>
                <span className="text-emerald-200">7 days</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>Big Mart Sales Prediction • Analytics Workspace</span>
          <span>Built with React, Vite, Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}
