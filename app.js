// js/app.js

// ---- Estado ----
const state = {
  order: [],
  i: 0,
  answers: [],
  finished: false,
  shuffled: true,
  showExp: false,
  _lastGrade: null
};

// ---- Elementos ----
const elQuiz = document.getElementById('quiz');
const elPrev = document.getElementById('prev');
const elNext = document.getElementById('next');
const elJump = document.getElementById('jump');
const elBar = document.getElementById('bar');
const elProgressText = document.getElementById('progressText');

const elResult = document.getElementById('result');
const elScore = document.getElementById('score');
const elLevel = document.getElementById('level');
const elReview = document.getElementById('review');
const elRestart = document.getElementById('restart');
const elExport = document.getElementById('export');
const elKpiGrid = document.getElementById('kpiGrid');
const elPillCount = document.getElementById('pillCount');

const elShuffle = document.getElementById('shuffle');
const elShowExp = document.getElementById('showExp');

// ---- Utils ----
function deepClone(obj){ return JSON.parse(JSON.stringify(obj)); }

function shuffleArray(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildOrder(){
  // BANK viene desde questions.js
  let items = BANK.map((q, idx) => ({...deepClone(q), id: idx}));

  if(state.shuffled) items = shuffleArray(items);

  if(state.shuffled){
    items = items.map(item => {
      const pairs = item.opts.map((t, idx) => ({t, idx}));
      shuffleArray(pairs);
      const newOpts = pairs.map(p => p.t);
      const newA = pairs.findIndex(p => p.idx === item.a);
      return {...item, opts: newOpts, a: newA};
    });
  }

  state.order = items;
  state.answers = Array(items.length).fill(null);
  state.i = 0;
  state.finished = false;

  elPillCount.textContent = `${items.length} preguntas • ${items.length} pts • 1 correcta`;
}

function render(){
  const total = state.order.length;
  const q = state.order[state.i];
  const answeredCount = state.answers.filter(v => v !== null).length;

  elProgressText.textContent = `${answeredCount}/${total}`;
  elBar.style.width = `${Math.round((answeredCount/total)*100)}%`;

  elPrev.disabled = state.i === 0;
  const isLast = state.i === total - 1;
  elNext.textContent = isLast ? 'Finalizar ✓' : 'Siguiente ⟶';

  elQuiz.innerHTML = `
    <div class="qhead">
      <div>
        <div class="qnum">Pregunta ${state.i + 1} de ${total}</div>
        <div class="tag">Selección múltiple </div>
      </div>
      <div class="meta">
        <div class="cat">${q.cat}</div>
        <div class="tag"></div>
      </div>
    </div>

    <p class="question">${q.q}</p>

    <div class="options">
      ${q.opts.map((opt, idx) => {
        const checked = state.answers[state.i] === idx ? 'checked' : '';
        const id = `q${state.i}_o${idx}`;
        return `
          <label class="opt" for="${id}">
            <input type="radio" name="q${state.i}" id="${id}" value="${idx}" ${checked} />
            <div class="txt"><b>${String.fromCharCode(65+idx)}.</b> ${opt}</div>
          </label>
        `;
      }).join('')}
    </div>

    <div class="mini" style="margin-top:10px">
      Categoría: <b>${q.cat}</b>. 
    </div>
  `;

  elQuiz.querySelectorAll('input[type="radio"]').forEach(r => {
    r.addEventListener('change', (e) => {
      state.answers[state.i] = Number(e.target.value);

      const answered = state.answers.filter(v => v !== null).length;
      elProgressText.textContent = `${answered}/${total}`;
      elBar.style.width = `${Math.round((answered/total)*100)}%`;
    });
  });

  if(state.finished) elResult.classList.add('show');
  else elResult.classList.remove('show');
}

function computeLevel(correct, total){
  if(correct >= Math.ceil(total*0.92)) return {label:'Excelente — Senior/Lead (Avanzado)', cls:'good'};
  if(correct >= Math.ceil(total*0.76)) return {label:'Muy bueno — Senior (Fuerte)', cls:'mid'};
  if(correct >= Math.ceil(total*0.56)) return {label:'Intermedio — Buen camino', cls:'mid'};
  return {label:'Necesita refuerzo — Enfoque en bases y estabilidad', cls:'bad'};
}

function grade(){
  const total = state.order.length;
  let correct = 0;
  const byCat = {};

  const details = state.order.map((q, idx) => {
    const user = state.answers[idx];
    const ok = user === q.a;
    if(ok) correct++;

    if(!byCat[q.cat]) byCat[q.cat] = {correct:0, total:0};
    byCat[q.cat].total++;
    if(ok) byCat[q.cat].correct++;

    return {
      idx, cat: q.cat, ok, user, correct: q.a,
      text: q.q,
      userText: user === null ? "(Sin responder)" : q.opts[user],
      correctText: q.opts[q.a],
      exp: q.exp || ""
    };
  });

  elScore.textContent = `${correct}/${total}`;
  const lvl = computeLevel(correct, total);
  elLevel.textContent = lvl.label;
  elLevel.className = `badge ${lvl.cls}`;

  const catKeys = Object.keys(byCat).sort((a,b)=>a.localeCompare(b));
  elKpiGrid.innerHTML = catKeys.map(k => {
    const c = byCat[k];
    const pct = Math.round((c.correct/c.total)*100);
    return `
      <div class="kpi">
        <div class="h"><b>${k}</b><span>${c.correct}/${c.total} • ${pct}%</span></div>
        <div class="progress p"><div class="bar" style="width:${pct}%"></div></div>
      </div>
    `;
  }).join('');

  const showExp = state.showExp;
  elReview.innerHTML = details.map(d => {
    const status = d.ok
      ? `<span class="status ok">✔ Correcta</span>`
      : `<span class="status ko">✖ Incorrecta</span>`;

    const expBlock = (showExp && d.exp)
      ? `<details><summary>Ver explicación</summary><p>${d.exp}</p></details>`
      : '';

    return `
      <div class="item">
        <div class="top">
          <div>
            <b>${d.idx+1}. ${d.text}</b>
            <div class="tag" style="margin-top:4px">${d.cat}</div>
          </div>
          ${status}
        </div>
        <div class="ans">Tu respuesta: <b>${d.userText}</b><br/>Correcta: <b>${d.correctText}</b></div>
        ${expBlock}
      </div>
    `;
  }).join('');

  elResult.classList.add('show');
  return {correct, total, details, byCat, level: lvl};
}

function finalize(){
  const total = state.order.length;
  const missing = state.answers
    .map((v, idx) => v === null ? idx+1 : null)
    .filter(v => v !== null);

  if(missing.length){
    alert(`Te faltan respuestas: ${missing.join(', ')}. Completa todas antes de finalizar.`);
    return;
  }

  state.finished = true;
  state._lastGrade = grade();
  render();

  document.getElementById('result').scrollIntoView({behavior:'smooth', block:'start'});
}

// ---- Eventos ----
elPrev.addEventListener('click', () => { state.i = Math.max(0, state.i-1); render(); });

elNext.addEventListener('click', () => {
  const isLast = state.i === state.order.length-1;
  if(!isLast){ state.i++; render(); return; }
  finalize();
});

elJump.addEventListener('click', () => {
  const total = state.order.length;
  const n = prompt(`Ir a pregunta (1-${total}):`);
  if(!n) return;
  const idx = Number(n) - 1;
  if(Number.isFinite(idx) && idx >= 0 && idx < total){ state.i = idx; render(); }
  else alert('Número inválido.');
});

elRestart.addEventListener('click', () => { buildOrder(); render(); });

elShuffle.addEventListener('change', (e) => { state.shuffled = e.target.checked; buildOrder(); render(); });

elShowExp.addEventListener('change', (e) => {
  state.showExp = e.target.checked;
  if(state.finished) state._lastGrade = grade();
});

elExport.addEventListener('click', () => {
  if(!state.finished || !state._lastGrade){
    alert('Primero finaliza el cuestionario para exportar resultados.');
    return;
  }
  const payload = {
    generatedAt: new Date().toISOString(),
    total: state._lastGrade.total,
    correct: state._lastGrade.correct,
    level: state._lastGrade.level.label,
    byCategory: state._lastGrade.byCat,
    answers: state._lastGrade.details.map(d => ({
      number: d.idx+1,
      category: d.cat,
      question: d.text,
      yourAnswer: d.userText,
      correctAnswer: d.correctText,
      ok: d.ok,
      explanation: d.exp
    }))
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resultado_cuestionario_json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// ---- Init ----
buildOrder();
render();