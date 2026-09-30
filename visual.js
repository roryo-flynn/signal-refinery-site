(() => {
  const seeded = (seed) => {
    let value = seed >>> 0;
    return () => {
      value = (value * 1664525 + 1013904223) >>> 0;
      return value / 4294967296;
    };
  };

  const addDot = (field, x, y, size, color, opacity = 1) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.style.left = `${x}%`;
    dot.style.top = `${y}%`;
    dot.style.setProperty('--size', `${size}px`);
    dot.style.setProperty('--dot-color', color);
    dot.style.setProperty('--opacity', opacity);
    field.appendChild(dot);
  };

  const data = document.querySelector('[data-stage="data"]');
  const dataRandom = seeded(27);
  for (let i = 0; i < 180; i += 1) {
    const angle = dataRandom() * Math.PI * 2;
    const radius = Math.sqrt(dataRandom()) * 43;
    const x = 50 + Math.cos(angle) * radius * 0.92;
    const y = 50 + Math.sin(angle) * radius * 0.68;
    const size = 2.1 + dataRandom() * 6.6;
    const shade = dataRandom() > 0.72 ? '#111310' : dataRandom() > 0.45 ? '#494a47' : '#85857f';
    addDot(data, x, y, size, shade, 0.72 + dataRandom() * 0.28);
  }

  const signal = document.querySelector('[data-stage="signal"]');
  const signalRandom = seeded(61);
  const rows = [1, 3, 5, 7, 9, 7, 5, 3, 1];
  rows.forEach((count, row) => {
    for (let column = 0; column < count; column += 1) {
      const baseX = 50 - ((count - 1) * 8.4) / 2 + column * 8.4;
      const x = baseX + (signalRandom() - 0.5) * 1.4;
      const y = 27 + row * 5.75 + (signalRandom() - 0.5) * 1.2;
      const blue = signalRandom() > 0.47;
      addDot(signal, x, y, 4.8 + signalRandom() * 4.2, blue ? '#155f98' : '#353735', 0.82 + signalRandom() * 0.18);
    }
  });

  const insight = document.querySelector('[data-stage="insight"]');
  const insightDots = [
    [50, 30, 7], [36, 40, 7], [50, 40, 11], [64, 40, 7],
    [29, 50, 5], [40, 50, 12], [50, 50, 14], [60, 50, 12], [71, 50, 5],
    [36, 60, 7], [50, 60, 10], [64, 60, 7], [50, 70, 7]
  ];
  insightDots.forEach(([x, y, size], index) => addDot(insight, x, y, size, index === 4 ? '#124f7d' : '#2476ad', 0.92));
})();
