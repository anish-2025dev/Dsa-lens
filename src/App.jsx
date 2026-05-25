import { useState, useEffect } from "react";

const SCENARIOS = [
  {
    id: 1,
    title: "The Hospital Emergency Room",
    story: `At a busy city hospital, patients arrive at different times throughout the day. Each patient is assigned a severity score from 1 (minor) to 10 (critical) when they check in. Doctors are always busy, but whenever a doctor becomes free, they must attend to the patient with the highest severity score currently waiting — regardless of who arrived first. New critical patients can arrive at any time and must be seen before less critical ones, even if those patients have been waiting longer.`,
    hints: ["Think about which patient gets picked next", "Arrival order doesn't matter — priority does", "You need fast insert AND fast extract-max"],
    answer: "Priority Queue / Max-Heap",
    explanation: "Each patient is a node with a priority (severity). When a doctor is free, we always extract the max-priority patient. New arrivals are inserted dynamically. This is exactly Max-Heap behavior — O(log n) insert, O(log n) extract-max.",
    pattern: "Heap / Priority Queue",
    leetcodeLinks: ["LC 23 - Merge K Sorted Lists", "LC 1046 - Last Stone Weight", "LC 347 - Top K Frequent Elements"],
    difficulty: "Medium"
  },
  {
    id: 2,
    title: "The Undo Button",
    story: `A text editor allows users to type characters, delete them, and also press an "Undo" button. The Undo button reverses the most recent action — if you typed 'A', undo removes 'A'. If you deleted a word, undo brings it back. Each undo undoes exactly one action, and you can keep pressing undo to go back further and further in history. There is no redo for now.`,
    hints: ["What's special about 'most recent action'?", "You always access the last thing that happened", "Think LIFO — Last In, First Out"],
    answer: "Stack",
    explanation: "Every action (type/delete) is pushed onto a Stack. Pressing Undo simply pops the top of the stack. LIFO perfectly models 'reverse most recent action'. This is why browsers, editors, and IDEs all use stacks for undo history.",
    pattern: "Stack",
    leetcodeLinks: ["LC 20 - Valid Parentheses", "LC 155 - Min Stack", "LC 739 - Daily Temperatures"],
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "The Subway Turnstile Queue",
    story: `A subway station has a single turnstile at the entrance. Commuters line up to enter. The first person in line goes through first, then the second, and so on. If someone cuts in line it causes chaos — so the system is strictly first-come, first-served. A new commuter joins at the back; the next one to enter is always from the front.`,
    hints: ["First person in = first person out", "You add to one end, remove from another", "Think FIFO — First In, First Out"],
    answer: "Queue / BFS",
    explanation: "Commuters are enqueued at the rear and dequeued at the front — classic Queue / FIFO. This appears in BFS traversal, task scheduling, print spoolers, and network packet handling.",
    pattern: "Queue / BFS",
    leetcodeLinks: ["LC 102 - Binary Tree Level Order Traversal", "LC 933 - Number of Recent Calls", "LC 1091 - Shortest Path in Binary Matrix"],
    difficulty: "Easy"
  },
  {
    id: 4,
    title: "The City Road Network",
    story: `A city has many intersections connected by roads. Each road has a travel time in minutes. A taxi driver wants to get from intersection A to intersection B in the minimum possible time. Some roads are one-way. The driver can take any combination of roads, but wants to avoid backtracking and find the absolute fastest route even if it means going through many intersections.`,
    hints: ["Intersections = nodes, roads = edges", "Roads have weights (travel time)", "You want the shortest total path weight"],
    answer: "Dijkstra / Shortest Path",
    explanation: "This is Dijkstra's shortest path on a weighted directed graph. Intersections are vertices, roads are directed weighted edges. Dijkstra greedily picks the unvisited vertex with the smallest tentative distance — giving optimal O((V+E) log V) time.",
    pattern: "Dijkstra / Shortest Path",
    leetcodeLinks: ["LC 743 - Network Delay Time", "LC 1631 - Path With Minimum Effort", "LC 787 - Cheapest Flights Within K Stops"],
    difficulty: "Hard"
  },
  {
    id: 5,
    title: "The Friend Circle",
    story: `In a college, students form friend groups. If A is friends with B, and B is friends with C, then A, B, and C are all in the same friend circle — even if A and C never directly met. When two friend circles merge (one member of each circle becomes friends), both circles become one. The administration wants to quickly answer: "Are these two students in the same friend circle?" and "Merge these two circles." Both operations must be as fast as possible.`,
    hints: ["Groups that merge and need fast 'same group?' queries", "Think of each group as a set", "Union and Find are the key operations"],
    answer: "Union-Find (DSU)",
    explanation: "Each friend circle is a disjoint set. 'Find' checks if two students share the same root (same circle). 'Union' merges two circles. With path compression + union by rank, both ops are nearly O(1) — O(α(n)) amortized.",
    pattern: "Union-Find (DSU)",
    leetcodeLinks: ["LC 547 - Number of Provinces", "LC 684 - Redundant Connection", "LC 1319 - Number of Operations to Make Network Connected"],
    difficulty: "Medium"
  },
  {
    id: 6,
    title: "The Dictionary Autocomplete",
    story: `A search engine offers autocomplete suggestions as users type. When a user types "app", it should instantly suggest "apple", "application", "appetite", etc. The system stores millions of words and must retrieve all words starting with a given prefix in milliseconds. Adding new words to the dictionary should also be fast. Simple arrays or hash maps won't efficiently support prefix-based lookup.`,
    hints: ["You need prefix-based retrieval", "Words share common starting characters", "Think of a tree where each node is a character"],
    answer: "Trie",
    explanation: "A Trie stores characters node-by-node. Each path from root to a leaf represents a word. Prefix search is O(L) where L is the prefix length — independent of total words stored. This is how autocomplete, spell checkers, and IP routing tables work.",
    pattern: "Trie",
    leetcodeLinks: ["LC 208 - Implement Trie", "LC 212 - Word Search II", "LC 648 - Replace Words"],
    difficulty: "Medium"
  },
  {
    id: 7,
    title: "The Staircase Problem",
    story: `A child is climbing a staircase with N steps. At each step, they can either climb 1 step or 2 steps at a time. You want to count the total number of distinct ways the child can reach the top. For example, for 3 steps: (1+1+1), (1+2), (2+1) = 3 ways. Notice that the number of ways to reach step N depends only on the ways to reach step N-1 and step N-2.`,
    hints: ["The answer for N depends on smaller subproblems", "You're counting combinations, not finding a path", "Overlapping subproblems — same values computed repeatedly"],
    answer: "Dynamic Programming",
    explanation: "dp[n] = dp[n-1] + dp[n-2] — the child either came from step n-1 (1 step) or n-2 (2 steps). This is Fibonacci DP. The key insight: overlapping subproblems + optimal substructure = DP. Memoization avoids recomputation, giving O(n) time.",
    pattern: "Dynamic Programming",
    leetcodeLinks: ["LC 70 - Climbing Stairs", "LC 198 - House Robber", "LC 322 - Coin Change"],
    difficulty: "Easy"
  },
  {
    id: 8,
    title: "The Warehouse Inventory",
    story: `A warehouse stores products sorted by their product ID in ascending order. A manager needs to quickly check if a specific product ID exists in the warehouse, and if so, where it's stored. The warehouse has millions of products and checking each one sequentially would take too long. The manager knows the list is always kept sorted after every update.`,
    hints: ["The data is SORTED", "You don't need to check every item", "Divide the search space in half each time"],
    answer: "Binary Search",
    explanation: "On sorted data, Binary Search eliminates half the candidates each step — O(log n) instead of O(n). Check the middle element: if it matches, done. If target is smaller, search left half; if larger, search right half. Repeat until found or exhausted.",
    pattern: "Binary Search",
    leetcodeLinks: ["LC 704 - Binary Search", "LC 33 - Search in Rotated Sorted Array", "LC 875 - Koko Eating Bananas"],
    difficulty: "Easy"
  }
];

const DIFFICULTY_COLORS = {
  Easy: { bg: "#d4edda22", text: "#00ff88", border: "#00ff8844" },
  Medium: { bg: "#fff3cd22", text: "#ffcc00", border: "#ffcc0044" },
  Hard: { bg: "#f8d7da22", text: "#ff6666", border: "#ff666644" }
};

const DSA_PATTERNS = [
  "Stack", "Queue / BFS", "Priority Queue / Max-Heap", "Dijkstra / Shortest Path",
  "Union-Find (DSU)", "Trie", "Dynamic Programming", "Binary Search",
  "Two Pointers", "Sliding Window", "DFS / Backtracking", "HashMap / HashSet",
  "Linked List", "Greedy"
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(0);
  const [customScenario, setCustomScenario] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [sessionScenarios, setSessionScenarios] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [timerActive, setTimerActive] = useState(false);
  const [timerWarning, setTimerWarning] = useState(false);

  const current = sessionScenarios[currentIdx];
  const isCorrect = submitted && selected === current?.answer;

  useEffect(() => {
    setSessionScenarios([...SCENARIOS].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 31) setTimerWarning(true);
          return t - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      setSubmitted(true);
      setScore(s => ({ ...s, total: s.total + 1 }));
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startPractice = () => {
    setSessionScenarios([...SCENARIOS].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setSelected("");
    setSubmitted(false);
    setShowHint(0);
    setTimeLeft(120);
    setTimerWarning(false);
    setTimerActive(true);
    setScore({ correct: 0, total: 0 });
    setScreen("practice");
  };

  const handleSubmit = () => {
    if (!selected) return;
    setTimerActive(false);
    setSubmitted(true);
    setScore(s => ({
      correct: s.correct + (selected === current.answer ? 1 : 0),
      total: s.total + 1
    }));
  };

  const handleNext = () => {
    if (currentIdx < sessionScenarios.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected("");
      setSubmitted(false);
      setShowHint(0);
      setTimeLeft(120);
      setTimerWarning(false);
      setTimerActive(true);
    } else {
      setScreen("result");
      setTimerActive(false);
    }
  };

  const analyzeCustom = async () => {
    if (!customScenario.trim()) return;
    setAiLoading(true);
    setAiResponse("");
    setAiError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: customScenario })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setAiResponse(data.result);
    } catch (err) {
      setAiError(err.message || "Something went wrong. Please try again.");
    }
    setAiLoading(false);
  };

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const s = {
    app: { minHeight: "100vh", background: "linear-gradient(135deg, #0a0a1a 0%, #0f1629 50%, #0a1020 100%)", fontFamily: "'Courier New', monospace", color: "#e0e0e0" },
    header: { background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(0,255,255,0.12)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 10 },
    logo: { fontSize: "16px", fontWeight: "bold", color: "#00ffff", letterSpacing: "3px" },
    badge: { background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.25)", color: "#00ffff", padding: "4px 12px", borderRadius: "20px", fontSize: "11px" },
    container: { maxWidth: "780px", margin: "0 auto", padding: "28px 20px" },
    card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "24px", marginBottom: "18px" },
    title: { fontSize: "22px", fontWeight: "bold", color: "#fff", marginBottom: "6px", margin: "0 0 6px 0" },
    sub: { fontSize: "13px", color: "#666", marginBottom: "22px" },
    storyBox: { background: "rgba(0,0,0,0.35)", border: "1px solid rgba(0,255,255,0.12)", borderLeft: "4px solid #00ffff", borderRadius: "8px", padding: "18px", fontSize: "14px", lineHeight: "1.8", color: "#ccc", marginBottom: "22px" },
    label: { fontSize: "11px", color: "#555", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1.5px" },
    optionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px", marginBottom: "18px" },
    option: (sel, ans, sub, opt) => ({ padding: "11px 14px", borderRadius: "9px", border: `1.5px solid ${sub ? (opt === ans ? "#00ff88" : opt === sel ? "#ff4444" : "rgba(255,255,255,0.07)") : (opt === sel ? "#00ffff" : "rgba(255,255,255,0.08)")}`, background: sub ? (opt === ans ? "rgba(0,255,136,0.08)" : opt === sel ? "rgba(255,68,68,0.08)" : "rgba(255,255,255,0.02)") : (opt === sel ? "rgba(0,255,255,0.08)" : "rgba(255,255,255,0.02)"), color: sub ? (opt === ans ? "#00ff88" : opt === sel ? "#ff6666" : "#555") : (opt === sel ? "#00ffff" : "#999"), cursor: sub ? "default" : "pointer", fontSize: "12px", fontFamily: "'Courier New', monospace", textAlign: "left", transition: "all 0.15s" }),
    btn: (color = "#00ffff", bg = "transparent", disabled = false) => ({ padding: "11px 24px", borderRadius: "8px", border: `1.5px solid ${disabled ? "#333" : color}`, background: disabled ? "transparent" : bg, color: disabled ? "#444" : color, cursor: disabled ? "not-allowed" : "pointer", fontSize: "13px", fontWeight: "bold", fontFamily: "'Courier New', monospace", letterSpacing: "1px", transition: "all 0.15s" }),
    timer: (warn) => ({ fontSize: "26px", fontWeight: "bold", color: warn ? "#ff4444" : "#00ffff", fontFamily: "'Courier New', monospace" }),
    hintTag: { display: "inline-block", background: "rgba(255,200,0,0.07)", border: "1px solid rgba(255,200,0,0.25)", color: "#ffcc00", padding: "5px 11px", borderRadius: "6px", fontSize: "12px", marginRight: "7px", marginBottom: "7px" },
    correctBox: { background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.25)", borderRadius: "12px", padding: "20px", marginTop: "18px" },
    wrongBox: { background: "rgba(255,68,68,0.06)", border: "1px solid rgba(255,68,68,0.25)", borderRadius: "12px", padding: "20px", marginTop: "18px" },
    progressBar: { height: "3px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", marginBottom: "22px", overflow: "hidden" },
    textarea: { width: "100%", minHeight: "130px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,255,255,0.15)", borderRadius: "9px", color: "#ddd", padding: "14px", fontSize: "13px", fontFamily: "'Courier New', monospace", resize: "vertical", outline: "none", lineHeight: "1.65", boxSizing: "border-box" },
    aiBox: { background: "rgba(0,0,0,0.35)", border: "1px solid rgba(0,255,255,0.15)", borderRadius: "9px", padding: "18px", whiteSpace: "pre-wrap", fontSize: "13px", lineHeight: "1.75", color: "#bbb" },
    scoreCircle: { width: "110px", height: "110px", borderRadius: "50%", border: "3px solid #00ffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", background: "rgba(0,255,255,0.04)" },
  };

  if (screen === "home") return (
    <div style={s.app}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} * { box-sizing: border-box; }`}</style>
      <header style={s.header}>
        <div style={s.logo}>⚡ DSA LENS</div>
        <div style={s.badge}>v1.0 — by Anish @ DTU</div>
      </header>
      <div style={s.container}>
        <div style={{ textAlign: "center", padding: "40px 0 28px", animation: "fadeUp 0.5s ease" }}>
          <div style={{ fontSize: "52px", marginBottom: "14px" }}>🧠</div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#fff", margin: "0 0 10px", letterSpacing: "2px" }}>DSA PATTERN TRAINER</h1>
          <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 28px" }}>
            Stop memorizing solutions. Start <span style={{ color: "#00ffff" }}>seeing patterns</span>.<br />
            Read a real-world story → identify the hidden DSA structure.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={s.btn("#00ffff", "rgba(0,255,255,0.08)")} onClick={startPractice}>▶ START PRACTICE</button>
            <button style={s.btn("#ffcc00", "rgba(255,204,0,0.08)")} onClick={() => setScreen("custom")}>🔍 AI ANALYZER</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "18px" }}>
          {[
            { icon: "⏱️", t: "Timed Challenges", d: "2 min per scenario — real interview pressure" },
            { icon: "🎯", t: "Pattern Recognition", d: "Map real-world scenarios to DS/Algo" },
            { icon: "🤖", t: "AI Analyzer", d: "Paste any problem, get instant DSA breakdown" }
          ].map(f => (
            <div key={f.t} style={s.card}>
              <div style={{ fontSize: "26px", marginBottom: "8px" }}>{f.icon}</div>
              <div style={{ color: "#ddd", fontWeight: "bold", marginBottom: "5px", fontSize: "12px" }}>{f.t}</div>
              <div style={{ color: "#555", fontSize: "11px", lineHeight: "1.5" }}>{f.d}</div>
            </div>
          ))}
        </div>

        <div style={s.card}>
          <div style={s.label}>Patterns You'll Train On</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "6px" }}>
            {DSA_PATTERNS.map(p => <span key={p} style={s.hintTag}>{p}</span>)}
          </div>
        </div>

        <div style={s.card}>
          <div style={s.label}>💡 Quick Pattern Triggers</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
            {[
              ['"most recent" / "last action"', "→ Stack"],
              ['"first-come first-served"', "→ Queue / BFS"],
              ['"highest priority" / "most urgent"', "→ Heap / PQ"],
              ['"shortest path" / "minimum cost"', "→ Dijkstra"],
              ['"groups merging" / "same group?"', "→ Union-Find"],
              ['"prefix search" / "autocomplete"', "→ Trie"],
              ['"overlapping subproblems"', "→ Dynamic Programming"],
              ['"sorted data" / "find position"', "→ Binary Search"],
            ].map(([trigger, pattern]) => (
              <div key={trigger} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "7px", padding: "10px" }}>
                <div style={{ color: "#ffcc00", fontSize: "10px", marginBottom: "3px", fontStyle: "italic" }}>"{trigger}"</div>
                <div style={{ color: "#00ffff", fontSize: "12px", fontWeight: "bold" }}>{pattern}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (screen === "practice" && current) {
    const diff = DIFFICULTY_COLORS[current.difficulty];
    const timesUp = timeLeft === 0 && submitted;
    return (
      <div style={s.app}>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} *{box-sizing:border-box}`}</style>
        <header style={s.header}>
          <div style={s.logo}>⚡ DSA LENS</div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ color: "#444", fontSize: "12px" }}>{currentIdx + 1}/{sessionScenarios.length}</div>
            <div style={{ ...s.timer(timerWarning), animation: timerWarning ? "pulse 1s infinite" : "none" }}>{fmt(timeLeft)}</div>
          </div>
        </header>
        <div style={s.container}>
          <div style={s.progressBar}>
            <div style={{ height: "100%", background: "linear-gradient(90deg, #00ffff, #00ff88)", width: `${(currentIdx / sessionScenarios.length) * 100}%`, transition: "width 0.5s" }} />
          </div>
          <div style={s.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
              <div>
                <h2 style={s.title}>{current.title}</h2>
                <span style={{ background: diff.bg, color: diff.text, border: `1px solid ${diff.border}`, padding: "2px 10px", borderRadius: "12px", fontSize: "10px" }}>{current.difficulty}</span>
              </div>
              <div style={{ color: "#333", fontSize: "11px" }}>#{current.id}</div>
            </div>
            <div style={s.storyBox}>{current.story}</div>

            {showHint > 0 && (
              <div style={{ marginBottom: "14px" }}>
                <div style={s.label}>💡 Hints ({showHint}/{current.hints.length})</div>
                {current.hints.slice(0, showHint).map((h, i) => <span key={i} style={s.hintTag}>#{i + 1} {h}</span>)}
              </div>
            )}
            {!submitted && showHint < current.hints.length && (
              <button style={{ ...s.btn("#ffcc00"), marginBottom: "14px", fontSize: "11px", padding: "7px 14px" }}
                onClick={() => setShowHint(h => Math.min(h + 1, current.hints.length))}>
                💡 Hint ({current.hints.length - showHint} left)
              </button>
            )}

            <div style={s.label}>Which DSA pattern does this represent?</div>
            <div style={s.optionGrid}>
              {DSA_PATTERNS.map(opt => (
                <button key={opt} style={s.option(selected, current.answer, submitted, opt)}
                  onClick={() => !submitted && setSelected(opt)}>
                  {submitted && opt === current.answer ? "✅ " : ""}
                  {submitted && opt === selected && opt !== current.answer ? "❌ " : ""}
                  {opt}
                </button>
              ))}
            </div>

            {!submitted ? (
              <button style={s.btn("#00ffff", "rgba(0,255,255,0.08)", !selected)} onClick={handleSubmit} disabled={!selected}>
                SUBMIT →
              </button>
            ) : (
              <div style={isCorrect ? s.correctBox : s.wrongBox}>
                <div style={{ fontWeight: "bold", color: isCorrect ? "#00ff88" : "#ff6666", marginBottom: "10px", fontSize: "15px" }}>
                  {timesUp ? "⏰ Time's up! " : isCorrect ? "✅ Correct! " : "❌ Not quite. "}
                  {!isCorrect && `Answer: ${current.answer}`}
                </div>
                <div style={{ color: "#aaa", fontSize: "13px", lineHeight: "1.7", marginBottom: "14px" }}>
                  <span style={{ color: "#ddd", fontWeight: "bold" }}>Why {current.answer}?</span><br />{current.explanation}
                </div>
                <div style={s.label}>Practice on LeetCode</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "16px" }}>
                  {current.leetcodeLinks.map(l => <span key={l} style={{ ...s.hintTag, color: "#00ffff", borderColor: "rgba(0,255,255,0.25)", background: "rgba(0,255,255,0.06)" }}>→ {l}</span>)}
                </div>
                <button style={s.btn("#00ffff", "rgba(0,255,255,0.08)")} onClick={handleNext}>
                  {currentIdx < sessionScenarios.length - 1 ? "NEXT →" : "SEE RESULTS →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "result") {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    const msg = pct === 100 ? "Perfect pattern eye! 🔥" : pct >= 70 ? "Solid! Keep training." : "Patterns take time — keep going!";
    return (
      <div style={s.app}>
        <style>{`*{box-sizing:border-box}`}</style>
        <header style={s.header}>
          <div style={s.logo}>⚡ DSA LENS</div>
          <div style={s.badge}>Session Complete</div>
        </header>
        <div style={s.container}>
          <div style={{ ...s.card, textAlign: "center", padding: "40px 24px" }}>
            <div style={s.scoreCircle}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#00ffff" }}>{pct}%</div>
              <div style={{ fontSize: "10px", color: "#555" }}>accuracy</div>
            </div>
            <h2 style={{ ...s.title, textAlign: "center", marginBottom: "8px" }}>{msg}</h2>
            <p style={{ color: "#555", marginBottom: "6px", fontSize: "13px" }}>{score.correct} / {score.total} correct</p>
            <p style={{ color: "#444", fontSize: "12px", marginBottom: "28px", lineHeight: "1.6" }}>
              Pattern recognition is a muscle — every scenario you read builds speed.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button style={s.btn("#00ffff", "rgba(0,255,255,0.08)")} onClick={startPractice}>🔄 PRACTICE AGAIN</button>
              <button style={s.btn("#ffcc00", "rgba(255,204,0,0.08)")} onClick={() => setScreen("custom")}>🔍 AI ANALYZER</button>
              <button style={s.btn("#555")} onClick={() => setScreen("home")}>← HOME</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "custom") return (
    <div style={s.app}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} *{box-sizing:border-box}`}</style>
      <header style={s.header}>
        <div style={s.logo}>⚡ DSA LENS</div>
        <button style={{ ...s.btn("#555"), padding: "5px 14px", fontSize: "11px" }} onClick={() => setScreen("home")}>← HOME</button>
      </header>
      <div style={s.container}>
        <div style={s.card}>
          <h2 style={s.title}>🔍 AI Scenario Analyzer</h2>
          <p style={s.sub}>Paste any real-world problem statement — interview question, college assignment, anything long. AI will extract the DSA pattern in seconds.</p>
          <div style={s.label}>Your Scenario</div>
          <textarea style={s.textarea} placeholder="Paste a long problem description here..." value={customScenario} onChange={e => setCustomScenario(e.target.value)} />
          <button style={{ ...s.btn("#00ffff", "rgba(0,255,255,0.08)", aiLoading || !customScenario.trim()), marginTop: "14px" }}
            onClick={analyzeCustom} disabled={aiLoading || !customScenario.trim()}>
            {aiLoading ? "⏳ ANALYZING..." : "🤖 ANALYZE PATTERN →"}
          </button>
        </div>

        {aiError && (
          <div style={{ ...s.card, borderColor: "rgba(255,68,68,0.3)", background: "rgba(255,68,68,0.05)" }}>
            <div style={{ color: "#ff6666", fontSize: "13px" }}>⚠️ {aiError}</div>
          </div>
        )}

        {(aiResponse || aiLoading) && !aiError && (
          <div style={s.card}>
            <div style={s.label}>AI Analysis</div>
            {aiLoading
              ? <div style={{ color: "#00ffff", animation: "pulse 1s infinite", fontSize: "13px" }}>Reading scenario... identifying patterns...</div>
              : <div style={s.aiBox}>{aiResponse}</div>
            }
          </div>
        )}
      </div>
    </div>
  );

  return null;
}
