function BrowserBar({ dark = false }) {
  return (
    <g>
      <rect x="0" y="0" width="1200" height="32" fill={dark ? '#111827' : '#eceef2'} />
      <circle cx="22" cy="16" r="5" fill="#f87171" />
      <circle cx="40" cy="16" r="5" fill="#fbbf24" />
      <circle cx="58" cy="16" r="5" fill="#34d399" />
      <rect
        x="410"
        y="9"
        width="380"
        height="14"
        rx="7"
        fill={dark ? '#1f2937' : '#ffffff'}
        opacity="0.9"
      />
      <text
        x="600"
        y="20"
        textAnchor="middle"
        fontSize="9"
        fill={dark ? '#94a3b8' : '#9ca3af'}
        fontFamily="Hanken Grotesk, sans-serif"
      >
        app.local
      </text>
    </g>
  )
}

function PulseOps() {
  return (
    <svg viewBox="0 0 1200 600" width="100%" height="100%" preserveAspectRatio="xMinYMid slice" xmlns="http://www.w3.org/2000/svg">
      <title>PulseOps dashboard interface concept</title>
      <rect width="1200" height="600" fill="#f6f7f9" />
      <rect x="0" y="32" width="212" height="568" fill="#101828" />
      <circle cx="42" cy="72" r="14" fill="#5b6cfa" />
      <path d="M36 72h12M42 66v12" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <text
        x="66"
        y="79"
        fill="#ffffff"
        fontSize="20"
        fontWeight="700"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        PulseOps
      </text>
      {['Overview', 'Services', 'Deployments', 'Incidents', 'Settings'].map((item, i) => (
        <g key={item}>
          <rect
            x="22"
            y={122 + i * 46}
            width="168"
            height="34"
            rx="7"
            fill={i === 0 ? '#1d2939' : 'transparent'}
          />
          <circle cx="40" cy={139 + i * 46} r="4" fill={i === 0 ? '#8ea2ff' : '#667085'} />
          <text
            x="52"
            y={144 + i * 46}
            fill={i === 0 ? '#f2f4f7' : '#98a2b3'}
            fontSize="12"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {item}
          </text>
        </g>
      ))}
      <rect x="22" y="502" width="168" height="64" rx="8" fill="#1d2939" />
      <text
        x="38"
        y="526"
        fill="#98a2b3"
        fontSize="9"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        ALL SYSTEMS
      </text>
      <circle cx="40" cy="543" r="4" fill="#4ade80" />
      <text
        x="50"
        y="547"
        fill="#d1fae5"
        fontSize="10"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Operational
      </text>

      <text
        x="246"
        y="88"
        fill="#101828"
        fontSize="26"
        fontWeight="700"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Service overview
      </text>
      <text
        x="246"
        y="108"
        fill="#667085"
        fontSize="11"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Production environment · last updated 12 seconds ago
      </text>
      <rect x="984" y="66" width="168" height="32" rx="8" fill="#ffffff" stroke="#e4e7ec" />
      <text
        x="1000"
        y="86"
        fill="#98a2b3"
        fontSize="10"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Search services…
      </text>
      <circle cx="1140" cy="82" r="13" fill="#dbe4ff" />
      <text
        x="1134"
        y="87"
        fill="#3f51d6"
        fontSize="10"
        fontWeight="700"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        VK
      </text>

      {[
        { x: 246, label: 'UPTIME', value: '99.98%', delta: '+0.03%', tone: '#12b76a' },
        { x: 552, label: 'DEPLOYMENTS', value: '12', delta: 'this week', tone: '#5b6cfa' },
        { x: 858, label: 'OPEN INCIDENTS', value: '02', delta: '2 investigating', tone: '#f79009' },
      ].map((card) => (
        <g key={card.label}>
          <rect x={card.x} y="128" width="290" height="108" rx="10" fill="#fff" stroke="#e4e7ec" />
          <text
            x={card.x + 20}
            y="156"
            fill="#98a2b3"
            fontSize="9"
            letterSpacing="1.3"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {card.label}
          </text>
          <text
            x={card.x + 20}
            y="196"
            fill="#101828"
            fontSize="30"
            fontWeight="700"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {card.value}
          </text>
          <text
            x={card.x + 20}
            y="218"
            fill={card.tone}
            fontSize="10"
            fontWeight="600"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {card.delta}
          </text>
        </g>
      ))}

      <rect x="246" y="262" width="580" height="278" rx="10" fill="#fff" stroke="#e4e7ec" />
      <text
        x="268"
        y="292"
        fill="#101828"
        fontSize="13"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Request throughput
      </text>
      <text
        x="268"
        y="312"
        fill="#98a2b3"
        fontSize="9"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Requests per minute · last 24 hours
      </text>
      <text
        x="786"
        y="298"
        textAnchor="end"
        fill="#12b76a"
        fontSize="11"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        +18.4%
      </text>
      {[346, 386, 426, 466].map((y) => (
        <line key={y} x1="268" y1={y} x2="800" y2={y} stroke="#eef0f3" strokeWidth="1" />
      ))}
      <path
        d="M268 456 L310 430 L348 440 L388 394 L426 410 L470 372 L510 384 L552 348 L592 366 L634 330 L674 345 L718 312 L760 326 L800 292 L800 500 L268 500 Z"
        fill="#5b6cfa"
        opacity="0.08"
      />
      <path
        d="M268 456 L310 430 L348 440 L388 394 L426 410 L470 372 L510 384 L552 348 L592 366 L634 330 L674 345 L718 312 L760 326 L800 292"
        fill="none"
        stroke="#5b6cfa"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="718" cy="312" r="4" fill="#5b6cfa" stroke="#fff" strokeWidth="2" />

      <rect x="850" y="262" width="326" height="278" rx="10" fill="#fff" stroke="#e4e7ec" />
      <text
        x="872"
        y="292"
        fill="#101828"
        fontSize="13"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Service health
      </text>
      {[
        ['API gateway', 'Healthy', '#12b76a'],
        ['Auth service', 'Healthy', '#12b76a'],
        ['Worker queue', 'Degraded', '#f79009'],
        ['PostgreSQL', 'Healthy', '#12b76a'],
        ['Frontend', 'Healthy', '#12b76a'],
      ].map(([name, state, color], i) => (
        <g key={name}>
          <circle cx="878" cy={334 + i * 38} r="4" fill={color} />
          <text
            x="894"
            y={338 + i * 38}
            fill="#344054"
            fontSize="11"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {name}
          </text>
          <text
            x="1152"
            y={338 + i * 38}
            textAnchor="end"
            fill={color}
            fontSize="9"
            fontWeight="600"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {state}
          </text>
          {i < 4 ? (
            <line
              x1="872"
              y1={354 + i * 38}
              x2="1154"
              y2={354 + i * 38}
              stroke="#f2f4f7"
              strokeWidth="1"
            />
          ) : null}
        </g>
      ))}
      <BrowserBar />
    </svg>
  )
}

function Office() {
  return (
    <svg viewBox="0 0 1200 600" width="100%" height="100%" preserveAspectRatio="xMinYMid slice" xmlns="http://www.w3.org/2000/svg">
      <title>Office Management System interface concept</title>
      <rect width="1200" height="600" fill="#f4f5f8" />
      <rect x="0" y="32" width="212" height="568" fill="#ffffff" />
      <line x1="212" y1="32" x2="212" y2="600" stroke="#e6e8ee" />
      <rect x="24" y="58" width="28" height="28" rx="8" fill="#5b6cff" />
      <path d="M33 72h10M38 67v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <text
        x="62"
        y="78"
        fill="#1d2333"
        fontSize="18"
        fontWeight="700"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Office
      </text>
      {['Dashboard', 'Employees', 'Attendance', 'Tasks', 'Reports'].map((item, i) => (
        <g key={item}>
          <rect
            x="18"
            y={120 + i * 44}
            width="176"
            height="34"
            rx="7"
            fill={i === 0 ? '#eef0ff' : 'transparent'}
          />
          <rect
            x="34"
            y={132 + i * 44}
            width="9"
            height="9"
            rx="2"
            fill={i === 0 ? '#5b6cff' : '#b9bfcc'}
          />
          <text
            x="52"
            y={142 + i * 44}
            fill={i === 0 ? '#4552d4' : '#5f6778'}
            fontSize="12"
            fontWeight={i === 0 ? '600' : '400'}
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {item}
          </text>
        </g>
      ))}
      <rect x="18" y="506" width="176" height="62" rx="8" fill="#f7f8fa" />
      <circle cx="42" cy="530" r="12" fill="#dfe4ff" />
      <text
        x="38"
        y="534"
        fill="#4552d4"
        fontSize="9"
        fontWeight="700"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        VK
      </text>
      <text
        x="62"
        y="528"
        fill="#1d2333"
        fontSize="10"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Workspace admin
      </text>
      <text
        x="62"
        y="542"
        fill="#98a0b3"
        fontSize="8"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Operations
      </text>

      <text
        x="246"
        y="88"
        fill="#1d2333"
        fontSize="26"
        fontWeight="700"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Office overview
      </text>
      <text
        x="246"
        y="108"
        fill="#7b8496"
        fontSize="11"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Monday, 19 October · People and operations at a glance
      </text>
      <rect x="1002" y="66" width="150" height="34" rx="8" fill="#5b6cff" />
      <text
        x="1077"
        y="87"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="10"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        + Add employee
      </text>

      {[
        { x: 246, label: 'EMPLOYEES', value: '48', note: '+3 this month', color: '#5b6cff' },
        { x: 552, label: 'PRESENT TODAY', value: '42', note: '87.5% attendance', color: '#12b76a' },
        { x: 858, label: 'OPEN TASKS', value: '17', note: '5 due this week', color: '#f79009' },
      ].map((card) => (
        <g key={card.label}>
          <rect x={card.x} y="128" width="290" height="106" rx="10" fill="#fff" stroke="#e6e8ee" />
          <text
            x={card.x + 20}
            y="155"
            fill="#98a0b3"
            fontSize="9"
            letterSpacing="1.2"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {card.label}
          </text>
          <text
            x={card.x + 20}
            y="194"
            fill="#1d2333"
            fontSize="29"
            fontWeight="700"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {card.value}
          </text>
          <text
            x={card.x + 20}
            y="215"
            fill={card.color}
            fontSize="9"
            fontWeight="600"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {card.note}
          </text>
          <circle cx={card.x + 258} cy="156" r="18" fill={card.color} opacity="0.1" />
        </g>
      ))}

      <rect x="246" y="260" width="430" height="280" rx="10" fill="#fff" stroke="#e6e8ee" />
      <text
        x="268"
        y="290"
        fill="#1d2333"
        fontSize="13"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Attendance this week
      </text>
      <text
        x="268"
        y="308"
        fill="#98a0b3"
        fontSize="9"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Present vs remote
      </text>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
        <g key={day}>
          <rect
            x={278 + i * 54}
            y={402 - (30 + (i % 4) * 9)}
            width="20"
            height={30 + (i % 4) * 9}
            rx="4"
            fill="#5b6cff"
            opacity={i === 5 || i === 6 ? 0.25 : 0.85}
          />
          <rect
            x={302 + i * 54}
            y={428 - (16 + (i % 3) * 6)}
            width="20"
            height={16 + (i % 3) * 6}
            rx="4"
            fill="#c7cdff"
          />
          <text
            x={288 + i * 54}
            y="492"
            textAnchor="middle"
            fill="#98a0b3"
            fontSize="9"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {day}
          </text>
        </g>
      ))}
      <line x1="268" y1="438" x2="654" y2="438" stroke="#eef0f4" />
      <circle cx="286" cy="516" r="4" fill="#5b6cff" />
      <text
        x="296"
        y="520"
        fill="#7b8496"
        fontSize="9"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        In office
      </text>
      <circle cx="366" cy="516" r="4" fill="#c7cdff" />
      <text
        x="376"
        y="520"
        fill="#7b8496"
        fontSize="9"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Remote
      </text>

      <rect x="700" y="260" width="476" height="280" rx="10" fill="#fff" stroke="#e6e8ee" />
      <text
        x="722"
        y="290"
        fill="#1d2333"
        fontSize="13"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Today&apos;s schedule
      </text>
      <text
        x="722"
        y="308"
        fill="#98a0b3"
        fontSize="9"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Shared team calendar
      </text>
      {[
        ['09:30', 'Daily stand-up', 'Operations'],
        ['11:00', 'Onboarding review', 'People'],
        ['14:30', 'Quarterly planning', 'All teams'],
        ['16:00', 'Vendor follow-up', 'Admin'],
      ].map(([time, title, team], i) => (
        <g key={title}>
          <text
            x="722"
            y={342 + i * 46}
            fill="#5b6cff"
            fontSize="10"
            fontWeight="600"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {time}
          </text>
          <rect x="770" y={326 + i * 46} width="3" height="28" rx="1.5" fill="#dfe3ff" />
          <text
            x="786"
            y={341 + i * 46}
            fill="#2b3242"
            fontSize="10"
            fontWeight="600"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {title}
          </text>
          <text
            x="786"
            y={355 + i * 46}
            fill="#98a0b3"
            fontSize="8"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {team}
          </text>
        </g>
      ))}
      <BrowserBar />
    </svg>
  )
}

function CyberArena() {
  return (
    <svg viewBox="0 0 1200 600" width="100%" height="100%" preserveAspectRatio="xMinYMid slice" xmlns="http://www.w3.org/2000/svg">
      <title>CyberArena training lab interface concept</title>
      <defs>
        <pattern id="cyber-grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M42 0H0V42" fill="none" stroke="#15203a" strokeWidth="1" />
        </pattern>
        <linearGradient id="cyber-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1200" height="600" fill="#070d19" />
      <rect x="0" y="32" width="1200" height="568" fill="url(#cyber-grid)" />
      <rect x="0" y="32" width="218" height="568" fill="#0b1424" opacity="0.96" />
      <line x1="218" y1="32" x2="218" y2="600" stroke="#1a2742" />
      <path d="M42 62l14 8v18l-14 8-14-8V70z" fill="#4ade80" opacity="0.18" />
      <path d="M42 68l9 5v12l-9 5-9-5V73z" fill="none" stroke="#4ade80" strokeWidth="1.6" />
      <text
        x="68"
        y="79"
        fill="#ecfdf5"
        fontSize="18"
        fontWeight="700"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        CyberArena
      </text>
      <text
        x="68"
        y="94"
        fill="#4ade80"
        fontSize="8"
        letterSpacing="1.4"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        TRAINING LAB
      </text>
      {['Overview', 'Scenarios', 'Progress', 'Leaderboard'].map((item, i) => (
        <g key={item}>
          <rect
            x="20"
            y={132 + i * 44}
            width="178"
            height="34"
            rx="7"
            fill={i === 0 ? '#13233d' : 'transparent'}
          />
          <rect
            x="36"
            y={144 + i * 44}
            width="9"
            height="9"
            rx="2"
            fill={i === 0 ? '#4ade80' : '#3f5476'}
          />
          <text
            x="54"
            y={154 + i * 44}
            fill={i === 0 ? '#d1fae5' : '#7f92b2'}
            fontSize="11"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {item}
          </text>
        </g>
      ))}
      <rect x="20" y="492" width="178" height="80" rx="8" fill="#0f1d33" />
      <text
        x="36"
        y="516"
        fill="#7f92b2"
        fontSize="8"
        letterSpacing="1"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        LAB STATUS
      </text>
      <circle cx="38" cy="538" r="4" fill="#4ade80" />
      <text
        x="50"
        y="542"
        fill="#d1fae5"
        fontSize="10"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Environment ready
      </text>
      <text
        x="36"
        y="560"
        fill="#5f7394"
        fontSize="8"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        3 scenarios available
      </text>

      <text
        x="252"
        y="90"
        fill="#f8fafc"
        fontSize="26"
        fontWeight="700"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Training lab
      </text>
      <text
        x="252"
        y="110"
        fill="#7f92b2"
        fontSize="11"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Practise defensive security scenarios in an isolated environment
      </text>
      <rect x="992" y="66" width="160" height="32" rx="7" fill="#0f1d33" stroke="#223552" />
      <circle cx="1012" cy="82" r="4" fill="#4ade80" />
      <text
        x="1024"
        y="86"
        fill="#a7f3d0"
        fontSize="9"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Lab connected
      </text>

      <rect x="252" y="132" width="530" height="190" rx="10" fill="url(#cyber-glow)" stroke="#1c3450" />
      <rect x="252" y="132" width="530" height="190" rx="10" fill="#0a1526" opacity="0.65" />
      <path d="M292 178l20 11v26l-20 11-20-11v-26z" fill="none" stroke="#4ade80" strokeWidth="2" />
      <path d="M292 190l10 5v10l-10 5-10-5v-10z" fill="#4ade80" opacity="0.5" />
      <text
        x="330"
        y="178"
        fill="#4ade80"
        fontSize="9"
        letterSpacing="1.4"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        SCENARIO 03 · INTERMEDIATE
      </text>
      <text
        x="330"
        y="204"
        fill="#f8fafc"
        fontSize="19"
        fontWeight="700"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Phishing investigation
      </text>
      <text
        x="330"
        y="224"
        fill="#7f92b2"
        fontSize="10"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Analyse headers, identify indicators and document the response.
      </text>
      <rect x="330" y="246" width="414" height="6" rx="3" fill="#1b2b46" />
      <rect x="330" y="246" width="282" height="6" rx="3" fill="#4ade80" />
      <text
        x="330"
        y="278"
        fill="#7f92b2"
        fontSize="9"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        4 of 6 objectives complete
      </text>
      <rect x="644" y="266" width="100" height="28" rx="6" fill="#4ade80" />
      <text
        x="694"
        y="284"
        textAnchor="middle"
        fill="#06210f"
        fontSize="9"
        fontWeight="700"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Continue lab
      </text>

      <rect x="802" y="132" width="350" height="190" rx="10" fill="#0a1526" stroke="#1c3450" />
      <text
        x="824"
        y="162"
        fill="#f8fafc"
        fontSize="12"
        fontWeight="600"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        Skill progress
      </text>
      {[
        ['Network analysis', 78, '#22d3ee'],
        ['Incident response', 64, '#4ade80'],
        ['Log investigation', 71, '#818cf8'],
      ].map(([label, value, color], i) => (
        <g key={label}>
          <text
            x="824"
            y={192 + i * 38}
            fill="#94a7c4"
            fontSize="9"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {label}
          </text>
          <text
            x="1130"
            y={192 + i * 38}
            textAnchor="end"
            fill="#dbeafe"
            fontSize="9"
            fontWeight="600"
            fontFamily="Hanken Grotesk, sans-serif"
          >
            {value}%
          </text>
          <rect x="824" y={200 + i * 38} width="306" height="5" rx="2.5" fill="#17253d" />
          <rect x="824" y={200 + i * 38} width={(306 * value) / 100} height="5" rx="2.5" fill={color} />
        </g>
      ))}

      <rect x="252" y="342" width="900" height="198" rx="10" fill="#060c17" stroke="#1c3450" />
      <rect x="252" y="342" width="900" height="30" rx="10" fill="#0b1424" />
      <text
        x="272"
        y="362"
        fill="#7f92b2"
        fontSize="9"
        letterSpacing="1"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        TERMINAL
      </text>
      <circle cx="1118" cy="357" r="3.5" fill="#334155" />
      <circle cx="1130" cy="357" r="3.5" fill="#334155" />
      <text x="272" y="398" fill="#4ade80" fontSize="11" fontFamily="monospace">
        $ arena scan --target lab.local
      </text>
      <text x="272" y="420" fill="#64748b" fontSize="10" fontFamily="monospace">
        resolving scope ........................ ok
      </text>
      <text x="272" y="440" fill="#64748b" fontSize="10" fontFamily="monospace">
        collecting evidence ................... 14 artefacts
      </text>
      <text x="272" y="460" fill="#22d3ee" fontSize="10" fontFamily="monospace">
        found: suspicious redirect chain → inspect headers
      </text>
      <text x="272" y="480" fill="#64748b" fontSize="10" fontFamily="monospace">
        next step: document indicators and containment plan
      </text>
      <text x="272" y="512" fill="#4ade80" fontSize="11" fontFamily="monospace">
        $ _
      </text>
      <BrowserBar dark />
    </svg>
  )
}

const PREVIEWS = {
  pulseops: PulseOps,
  office: Office,
  cyberarena: CyberArena,
}

export default function ProjectPreview({ variant }) {
  const Component = PREVIEWS[variant] ?? PulseOps
  return <Component />
}
