const DAY_NUM = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };

function parseDayNum(name) {
  return DAY_NUM[name.toLowerCase().trim().slice(0, 3)];
}

function getDayRange(a, b) {
  const start = parseDayNum(a);
  const end = parseDayNum(b);
  if (start === undefined || end === undefined) return [];
  const days = [];
  let d = start;
  for (let i = 0; i < 7; i++) {
    days.push(d);
    if (d === end) break;
    d = (d + 1) % 7;
  }
  return days;
}

function parseTime(str) {
  const m = str.trim().match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!m) return null;
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  if (m[3].toUpperCase() === 'PM' && h !== 12) h += 12;
  if (m[3].toUpperCase() === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

function parseTimeRange(str) {
  const m = str.match(/^(.+?)\s*–\s*(.+)$/);
  if (!m) return null;
  const open = parseTime(m[1].trim());
  let close = parseTime(m[2].trim());
  if (close === null && /late/i.test(m[2])) close = 23 * 60;
  if (open === null || close === null) return null;
  return { open, close };
}

// Returns a day-keyed map (0–6) of { open, close } in total minutes, or null for closed
function parseSchedule(openHoursStr) {
  if (!openHoursStr) return null;
  const s = openHoursStr.trim();

  if (/open 24 hours/i.test(s)) {
    const always = { open: 0, close: 24 * 60 - 1 };
    return { 0: always, 1: always, 2: always, 3: always, 4: always, 5: always, 6: always };
  }
  if (/hours not listed|hours vary|call ahead/i.test(s)) return null;

  const schedule = {};

  for (const segment of s.split('|')) {
    const seg = segment.trim();
    const colonIdx = seg.indexOf(':');
    if (colonIdx === -1) continue;

    const dayPart = seg.slice(0, colonIdx).trim();
    const timePart = seg.slice(colonIdx + 1).trim();

    let days = [];
    if (/weekends/i.test(dayPart))      days = [0, 6];
    else if (/weekdays/i.test(dayPart)) days = [1, 2, 3, 4, 5];
    else if (/daily/i.test(dayPart))    days = [0, 1, 2, 3, 4, 5, 6];
    else if (/–/.test(dayPart)) {
      const [a, b] = dayPart.split('–');
      days = getDayRange(a, b);
    } else {
      const d = parseDayNum(dayPart);
      if (d !== undefined) days = [d];
    }
    if (days.length === 0) continue;

    if (/closed/i.test(timePart) || /by appointment/i.test(timePart)) {
      days.forEach(d => { schedule[d] = null; });
    } else {
      const range = parseTimeRange(timePart);
      if (range) days.forEach(d => { schedule[d] = range; });
    }
  }

  return Object.keys(schedule).length > 0 ? schedule : null;
}

function fmt12h(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

// Main export — returns { status: 'open'|'closed'|'unknown', label, closingSoon }
export function getOpenStatus(openHoursStr) {
  const schedule = parseSchedule(openHoursStr);
  if (!schedule) return { status: 'unknown', label: 'Hours vary', closingSoon: false };

  const now = new Date();
  const day = now.getDay();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const slot = schedule[day];

  if (slot === null || slot === undefined) {
    return { status: 'closed', label: 'Closed today', closingSoon: false };
  }

  const { open, close } = slot;

  if (nowMins >= open && nowMins < close) {
    const left = close - nowMins;
    const closingSoon = left <= 60;
    return {
      status: 'open',
      label: closingSoon ? `Closes in ${left}m` : `Open · closes ${fmt12h(close)}`,
      closingSoon,
    };
  }

  if (nowMins < open) {
    return { status: 'closed', label: `Opens ${fmt12h(open)}`, closingSoon: false };
  }

  return { status: 'closed', label: 'Closed now', closingSoon: false };
}

// For the "Open Now" filter — true only when status === 'open'
export function isOpenNow(openHoursStr) {
  return getOpenStatus(openHoursStr).status === 'open';
}
