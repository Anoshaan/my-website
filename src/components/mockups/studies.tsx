"use client";

import {
  Avatar,
  Bar,
  BarChart,
  Card,
  Chip,
  Counter,
  Cursor,
  Eyebrow,
  HeroTitle,
  ListRow,
  MidFiShell,
  Ring,
  Row,
  Section,
  Sparkline,
  Stack,
  StatTile,
  Thumb,
  Touch,
} from "./MidFi";

/* =========================================================
   Per-case-study mid-fi mockups.

   Each composition is sized to fit the card with no pan and
   no scene fade. Motion comes from looping inner-element
   animations (bars pulse, sparklines redraw, rings refill,
   counters tick) plus a signature interactivity layer:
     - web mockups: a cursor traveling between two points
       with a click ripple
     - mobile mockups: a touch ripple that taps a UI element
   A few mockups add a domain-specific signature (heart burst
   on the social feed, breathing pulse on mindfulness, etc.).

   Naming convention: <SlugPascalCaseMockup>.
   Registry: CaseStudyMedia.tsx — maps slug → component.
   ========================================================= */

/* 02 — Predictive Analytics Intelligence Platform */
export function PredictiveAnalyticsMockup() {
  return (
    <MidFiShell
      orientation="web"
      accent="#4dc9c9"
      title="aether.analytics"
      meta="Predictive AI"
    >
      <Section pad="sm">
        <Row justify="between" align="center">
          <Row gap={12} align="center">
            <span
              style={{
                fontSize: 11,
                color: "var(--ink)",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              AETHER
            </span>
            <span
              style={{
                fontSize: 8.5,
                color: "var(--ink-faint)",
                letterSpacing: "0.14em",
              }}
            >
              LIVE STATUS
            </span>
          </Row>
          <Row gap={6} align="center">
            <Chip size="xs">Share</Chip>
            <Chip size="xs" accent>
              Automate
            </Chip>
            <Avatar initials="AS" size={20} tone="accent" />
          </Row>
        </Row>
      </Section>

      <Section>
        <Row gap={10} align="stretch">
          <StatTile
            label="Active Streams"
            value={<Counter to={24} />}
            trend="↑ +3"
            accent
          />
          <StatTile label="Data Volume" value="4.2 TB" trend="Last 24h" />
          <StatTile
            label="System Health"
            value={<Counter to={99} variant="pct" />}
            trend="42ms latency"
          />
        </Row>
      </Section>

      <Section>
        <Row justify="between" align="center">
          <Eyebrow>INTEGRATION HUB</Eyebrow>
          <Chip size="xs" accent>
            + Add Source
          </Chip>
        </Row>
        <Row gap={10} align="stretch">
          {[
            { name: "Google Analytics", sub: "GA4 · Stream #09", state: "Active", tone: "accent" as const },
            { name: "Salesforce CRM", sub: "Enterprise · SF-882", state: "Verified", tone: "cool" as const },
            { name: "AWS S3 Bucket", sub: "Raw Data · us-east-1", state: "Alert", tone: "warm" as const },
          ].map((s) => (
            <Card key={s.name} pad={10}>
              <Stack gap={6}>
                <Row justify="between" align="center">
                  <Thumb aspect="1 / 1" tone={s.tone} />
                  <Chip
                    size="xs"
                    accent={s.state === "Active"}
                  >
                    {s.state}
                  </Chip>
                </Row>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: "var(--ink)" }}>
                  {s.name}
                </span>
                <span style={{ fontSize: 9, color: "var(--ink-faint)" }}>{s.sub}</span>
              </Stack>
            </Card>
          ))}
        </Row>
      </Section>

      <Section pad="sm">
        <Card pad={10}>
          <Stack gap={6}>
            <Row justify="between" align="center">
              <Eyebrow>DATA INSIGHTS</Eyebrow>
              <Chip size="xs">Live events log</Chip>
            </Row>
            <Stack gap={4}>
              <ListRow
                icon="✓"
                primary="GA4_STREAM · batch 8829 ingested"
                secondary="12,402 records processed"
                trailing="14:32"
              />
              <ListRow
                icon="◐"
                primary="REDSHIFT_PULL · handshake established"
                secondary="node internal-cluster-01"
                trailing="14:31"
              />
            </Stack>
          </Stack>
        </Card>
      </Section>

      <Cursor from={[16, 30]} to={[80, 8]} />
    </MidFiShell>
  );
}

/* 03 — Enterprise Software Company Website & Lead Experience */
export function EnterpriseSiteMockup() {
  return (
    <MidFiShell
      orientation="web"
      accent="#8aa6ff"
      title="northwind.io"
      meta="Enterprise software"
    >
      <Section pad="sm">
        <Row justify="between" align="center">
          <Row gap={14}>
            <span
              className="midfi-eyebrow"
              style={{ letterSpacing: "0.18em", color: "var(--ink)" }}
            >
              NORTHWIND
            </span>
            <Row gap={10}>
              <Chip size="xs">Platform</Chip>
              <Chip size="xs">Solutions</Chip>
              <Chip size="xs">Pricing</Chip>
            </Row>
          </Row>
          <Chip size="sm" accent>
            Book demo
          </Chip>
        </Row>
      </Section>

      <Section pad="lg">
        <Stack gap={10}>
          <Eyebrow>ENTERPRISE OS · v4.2</Eyebrow>
          <HeroTitle>Operations infrastructure for modern teams.</HeroTitle>
          <Row gap={10}>
            <Chip accent>Start free trial</Chip>
            <Chip>Watch product tour</Chip>
          </Row>
        </Stack>
      </Section>

      <Section>
        <Row gap={10} align="stretch">
          <StatTile
            label="Revenue"
            value={
              <>
                $<Counter to={48} />
                .8M
              </>
            }
            trend="↑ 18%"
            accent
          />
          <StatTile label="NRR" value={<><Counter to={124} variant="pct" /></>} trend="↑ 6%" />
          <StatTile label="Churn" value="0.6%" trend="↓ 0.2" />
        </Row>
      </Section>

      <Section>
        <Eyebrow>SOLUTIONS</Eyebrow>
        <Row gap={10} align="stretch">
          {[
            ["Workforce", "Time & resources"],
            ["Analytics", "BI dashboards"],
            ["Pipeline", "Lead routing"],
          ].map(([t, s]) => (
            <Card key={t} pad={10}>
              <Stack gap={6}>
                <Thumb aspect="1.6 / 1" tone="accent" />
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)" }}>{t}</span>
                <span style={{ fontSize: 9.5, color: "var(--ink-faint)" }}>{s}</span>
              </Stack>
            </Card>
          ))}
        </Row>
      </Section>

      <Cursor from={[85, 7]} to={[24, 50]} />
    </MidFiShell>
  );
}

/* 05 — Cannabis Commerce & Wellness Platform */
export function CannabisCommerceMockup() {
  return (
    <MidFiShell orientation="mobile" accent="#5dc287">
      <Section pad="sm">
        <Row justify="between" align="center">
          <Stack gap={2}>
            <span style={{ fontSize: 8.5, color: "var(--ink-faint)" }}>Deliver to</span>
            <span style={{ fontSize: 11, color: "var(--ink)", fontWeight: 600 }}>
              San Jose · 95128
            </span>
          </Stack>
          <Avatar initials="JM" size={22} tone="accent" />
        </Row>
      </Section>

      <Section>
        <Card pad={10}>
          <Stack gap={6}>
            <Thumb aspect="2 / 1" tone="accent" />
            <Eyebrow>FEATURED · LIVE RESIN</Eyebrow>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Sour Diesel</span>
            <Row gap={6}>
              <Chip size="xs">THC 22%</Chip>
              <Chip size="xs">Hybrid</Chip>
            </Row>
            <Row justify="between" align="center">
              <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 700 }}>$48.00</span>
              <Chip accent size="sm">
                Add to cart
              </Chip>
            </Row>
          </Stack>
        </Card>
      </Section>

      <Section pad="sm">
        <Row gap={6} wrap>
          {["Flower", "Edibles", "Vape", "Pre-roll", "Tincture"].map((c) => (
            <Chip key={c} size="xs">
              {c}
            </Chip>
          ))}
        </Row>
      </Section>

      <Section pad="sm">
        <Card pad={10}>
          <Row justify="between" align="center">
            <Stack gap={2}>
              <span style={{ fontSize: 9, color: "var(--ink-faint)" }}>3 items</span>
              <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 700 }}>
                $<Counter to={108} />.40
              </span>
            </Stack>
            <Chip accent size="sm">
              Checkout
            </Chip>
          </Row>
        </Card>
      </Section>

      <Touch at={[78, 51]} />
    </MidFiShell>
  );
}

/* 06 — Defence Operations Documentation Platform */
export function DefenceOpsMockup() {
  return (
    <MidFiShell
      orientation="web"
      accent="#6fa9d6"
      title="ops.sentinel · classified"
      meta="ALPHA-3"
    >
      <Section pad="sm">
        <Row justify="between" align="center">
          <Row gap={10}>
            <span
              style={{
                fontSize: 10.5,
                color: "var(--ink)",
                fontWeight: 700,
                letterSpacing: "0.16em",
              }}
            >
              SENTINEL OPS
            </span>
            <Chip size="xs" accent>
              SECURE
            </Chip>
          </Row>
          <Row gap={6}>
            <Chip size="xs">Search</Chip>
            <Avatar initials="CR" size={20} tone="cool" />
          </Row>
        </Row>
      </Section>

      <Section>
        <Card pad={14}>
          <Stack gap={10}>
            <Row justify="between" align="center">
              <Stack gap={4}>
                <Eyebrow>OPERATION CHARLIE · 17</Eyebrow>
                <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>
                  Pre-flight checklist · F-35A
                </span>
              </Stack>
              <Chip size="xs" accent>
                Signed
              </Chip>
            </Row>
            <Stack gap={5}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Row key={i} gap={8} align="center">
                  <span
                    className="midfi-check"
                    style={{ "--check-i": i } as React.CSSProperties}
                  />
                  <Bar
                    width={i < 3 ? "72%" : "56%"}
                    height={5}
                    dim={i < 3 ? 0.45 : 0.22}
                  />
                </Row>
              ))}
            </Stack>
          </Stack>
        </Card>
      </Section>

      <Section>
        <Row gap={10} align="stretch">
          <StatTile label="Active Ops" value={<Counter to={47} />} accent />
          <StatTile label="Personnel" value="1,284" />
          <StatTile label="Clearance" value="ALPHA-3" />
        </Row>
      </Section>

      <Cursor from={[15, 50]} to={[42, 32]} />
    </MidFiShell>
  );
}

/* 07 — Pet-Centric Social Media Platform */
export function PetSocialMockup() {
  return (
    <MidFiShell orientation="mobile" accent="#ff8a65">
      <Section pad="sm">
        <Row justify="between" align="center">
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>pawsly</span>
          <Row gap={8}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: "var(--ink-ghost)",
              }}
            />
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                background: "var(--ink-ghost)",
              }}
            />
          </Row>
        </Row>
      </Section>

      <Section pad="sm">
        <Row gap={8}>
          {["Luna", "Bo", "Ash", "Pip", "Zee"].map((n) => (
            <Stack key={n} gap={3}>
              <Avatar initials={n.slice(0, 1)} size={32} tone="warm" />
              <span
                style={{
                  fontSize: 8.5,
                  color: "var(--ink-faint)",
                  textAlign: "center",
                  display: "block",
                }}
              >
                {n}
              </span>
            </Stack>
          ))}
        </Row>
      </Section>

      <Section pad="sm">
        <Card pad={0}>
          <Stack gap={0}>
            <div style={{ padding: 10, display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar initials="LM" size={26} tone="warm" />
              <Stack gap={2}>
                <span style={{ fontSize: 11, color: "var(--ink)", fontWeight: 600 }}>
                  luna.adventures
                </span>
                <span style={{ fontSize: 8.5, color: "var(--ink-faint)" }}>
                  Goldendoodle · Brooklyn
                </span>
              </Stack>
            </div>
            <Thumb aspect="1 / 1" tone="warm" glyph={<span style={{ fontSize: 28 }}>🐾</span>} />
            <div style={{ padding: 10 }}>
              <Row gap={12} align="center">
                <span className="midfi-burst" style={{ fontSize: 16 }}>
                  ♥
                </span>
                <span style={{ fontSize: 14, color: "var(--ink-faint)" }}>💬</span>
                <span style={{ fontSize: 14, color: "var(--ink-faint)" }}>↗</span>
              </Row>
              <Bar width="40%" height={4} dim={0.3} />
            </div>
          </Stack>
        </Card>
      </Section>

      <Touch at={[18, 52]} />
    </MidFiShell>
  );
}

/* 08 — Equestrian Fitness & Wellness Platform */
export function EquestrianFitnessMockup() {
  return (
    <MidFiShell orientation="mobile" accent="#d4a755">
      <Section pad="sm">
        <Row justify="between" align="center">
          <Stack gap={2}>
            <span style={{ fontSize: 8.5, color: "var(--ink-faint)" }}>Good morning,</span>
            <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 700 }}>Charlotte</span>
          </Stack>
          <Ring pct={68} label="68%" size={44} />
        </Row>
      </Section>

      <Section>
        <Card pad={12}>
          <Stack gap={6}>
            <Eyebrow>TODAY · WEEK 3</Eyebrow>
            <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>
              Core stability for riders
            </span>
            <Row gap={6}>
              <Chip size="xs">28 min</Chip>
              <Chip size="xs">Intermediate</Chip>
            </Row>
            <Chip accent size="sm">
              Continue session
            </Chip>
          </Stack>
        </Card>
      </Section>

      <Section pad="sm">
        <Card pad={10}>
          <Stack gap={6}>
            <Row justify="between" align="center">
              <Eyebrow>THIS WEEK</Eyebrow>
              <Chip size="xs" accent>
                <Counter to={14} />d streak
              </Chip>
            </Row>
            <BarChart values={[40, 65, 30, 80, 55, 70, 20]} height={44} />
            <Row gap={3} justify="between">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} style={{ fontSize: 8, color: "var(--ink-faint)" }}>
                  {d}
                </span>
              ))}
            </Row>
          </Stack>
        </Card>
      </Section>

      <Touch at={[50, 40]} />
    </MidFiShell>
  );
}

/* 09 — Workplace Safety & Retail Engagement Platform */
export function WorkplaceSafetyMockup() {
  return (
    <MidFiShell orientation="mobile" accent="#ff7458">
      <Section pad="sm">
        <Row justify="between" align="center">
          <Stack gap={2}>
            <Eyebrow>STORE · #4218</Eyebrow>
            <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 700 }}>
              Hayward Plaza
            </span>
          </Stack>
          <Chip accent size="sm">
            Active
          </Chip>
        </Row>
      </Section>

      <Section>
        <Card pad={12} className="midfi-alert">
          <Stack gap={6}>
            <Row justify="between" align="center">
              <Eyebrow>SAFETY · NOW</Eyebrow>
              <span className="midfi-chip is-pulse midfi-chip--sm is-accent" style={{ padding: "0 8px", borderRadius: 999, fontSize: 9.5 }}>
                2 alerts
              </span>
            </Row>
            <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>
              Spill in Aisle 7
            </span>
            <Bar width="60%" height={4} dim={0.4} />
            <Row gap={6}>
              <Chip size="xs">Acknowledge</Chip>
              <Chip size="xs" accent>
                Dispatch
              </Chip>
            </Row>
          </Stack>
        </Card>
      </Section>

      <Section pad="sm">
        <Row gap={10} align="stretch">
          <StatTile label="Audits" value={<Counter to={98} variant="pct" />} accent />
          <StatTile label="Incidents" value={<Counter to={0} />} trend="30 days" />
        </Row>
      </Section>

      <Touch at={[72, 41]} />
    </MidFiShell>
  );
}

/* 10 — Peer-to-Peer Lending & Financial Services Platform */
export function P2PLendingMockup() {
  return (
    <MidFiShell orientation="mobile" accent="#3ec78c">
      <Section pad="sm">
        <Row justify="between" align="center">
          <Stack gap={2}>
            <span style={{ fontSize: 8.5, color: "var(--ink-faint)" }}>Balance</span>
            <span
              style={{
                fontSize: 18,
                color: "var(--ink)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              $<Counter to={12480} />
              .32
            </span>
          </Stack>
          <Avatar initials="DK" size={26} tone="accent" />
        </Row>
      </Section>

      <Section pad="sm">
        <Row gap={6}>
          <Chip size="sm" accent>
            Send
          </Chip>
          <Chip size="sm">Request</Chip>
          <Chip size="sm">Lend</Chip>
          <Chip size="sm">Top-up</Chip>
        </Row>
      </Section>

      <Section>
        <Card pad={12}>
          <Stack gap={6}>
            <Row justify="between" align="center">
              <Eyebrow>ACTIVE LOAN · 4 OF 12</Eyebrow>
              <Chip size="xs" accent>
                On track
              </Chip>
            </Row>
            <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>
              $8,400 · 9.4% APR
            </span>
            <Sparkline points={[8400, 7700, 7000, 6300]} height={36} />
            <Row justify="between">
              <span style={{ fontSize: 9, color: "var(--ink-faint)" }}>Next: $720 · Jun 14</span>
              <span style={{ fontSize: 9, color: "var(--ink)", fontWeight: 600 }}>
                Pay early →
              </span>
            </Row>
          </Stack>
        </Card>
      </Section>

      <Touch at={[20, 28]} />
    </MidFiShell>
  );
}

/* 11 — Educational Learning & Revision Platform */
export function EducationRevisionMockup() {
  return (
    <MidFiShell orientation="mobile" accent="#a89aff">
      <Section pad="sm">
        <Row justify="between" align="center">
          <Stack gap={2}>
            <span style={{ fontSize: 8.5, color: "var(--ink-faint)" }}>Hi, Sam</span>
            <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: 700 }}>
              Let&apos;s revise.
            </span>
          </Stack>
          <Ring pct={72} label="72%" size={44} />
        </Row>
      </Section>

      <Section>
        <Card pad={14}>
          <Stack gap={8}>
            <Eyebrow>FLASHCARD · 14 OF 30</Eyebrow>
            <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600, lineHeight: 1.3 }}>
              What process converts light to chemical energy in plants?
            </span>
            <Row gap={6}>
              <Chip size="xs">Hard</Chip>
              <Chip size="xs">Medium</Chip>
              <Chip size="xs" accent>
                Easy
              </Chip>
            </Row>
          </Stack>
        </Card>
      </Section>

      <Section pad="sm">
        <Card pad={10}>
          <Stack gap={6}>
            <Eyebrow>DAILY GOAL</Eyebrow>
            <BarChart values={[60, 80, 40, 90, 70, 30, 50]} height={42} />
            <Row gap={3} justify="between">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} style={{ fontSize: 8, color: "var(--ink-faint)" }}>
                  {d}
                </span>
              ))}
            </Row>
          </Stack>
        </Card>
      </Section>

      <Touch at={[75, 42]} />
    </MidFiShell>
  );
}

/* 12 — Mental Wellness & Lifestyle Tracking Platform */
export function MentalWellnessMockup() {
  return (
    <MidFiShell orientation="mobile" accent="#aba1ff">
      <Section pad="sm">
        <Stack gap={6}>
          <span style={{ fontSize: 9.5, color: "var(--ink-faint)" }}>How are you feeling today?</span>
          <Row gap={4} justify="between">
            {[
              ["😞", "low", false],
              ["😐", "meh", false],
              ["🙂", "ok", false],
              ["😊", "good", true],
              ["✨", "great", false],
            ].map(([e, l, sel]) => (
              <Stack key={l as string} gap={3}>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    display: "grid",
                    placeItems: "center",
                    background: sel
                      ? "color-mix(in oklab, var(--accent) 32%, transparent)"
                      : "rgba(255,255,255,0.04)",
                    border: sel
                      ? "1px solid color-mix(in oklab, var(--accent) 50%, transparent)"
                      : "1px solid var(--hair)",
                    fontSize: 15,
                  }}
                >
                  {e as string}
                </span>
                <span
                  style={{
                    fontSize: 8,
                    color: "var(--ink-faint)",
                    textAlign: "center",
                  }}
                >
                  {l as string}
                </span>
              </Stack>
            ))}
          </Row>
        </Stack>
      </Section>

      <Section>
        <Card pad={12}>
          <Stack gap={6}>
            <Row justify="between" align="center">
              <Eyebrow>MOOD · 30 DAYS</Eyebrow>
              <Chip size="xs" accent>
                ↑ Trending up
              </Chip>
            </Row>
            <Sparkline points={[2, 3, 2, 4, 3, 4, 3, 5, 4, 5, 4, 4]} height={48} />
          </Stack>
        </Card>
      </Section>

      <Section pad="sm">
        <Row gap={10} align="stretch">
          <StatTile label="Streak" value={<><Counter to={22} />d</>} accent />
          <StatTile label="Sleep" value="7.4h" />
          <StatTile label="Stress" value="Low" />
        </Row>
      </Section>

      <Touch at={[68, 20]} />
    </MidFiShell>
  );
}

/* 13 — Mindfulness & Personal Growth Platform */
export function MindfulnessMockup() {
  return (
    <MidFiShell orientation="mobile" accent="#7fc4d4">
      <Section pad="sm">
        <Stack gap={4}>
          <Eyebrow>GOOD EVENING, MAYA</Eyebrow>
          <HeroTitle>Let your mind soften.</HeroTitle>
        </Stack>
      </Section>

      <Section>
        <Card pad={14}>
          <Stack gap={10}>
            <Eyebrow>DAILY PRACTICE</Eyebrow>
            <Row justify="between" align="center">
              <div className="midfi-breathe">
                <Ring pct={62} label="12m" size={68} />
              </div>
              <Stack gap={4}>
                <span style={{ fontSize: 12, color: "var(--ink)", fontWeight: 600 }}>
                  Letting go of the day
                </span>
                <span style={{ fontSize: 9, color: "var(--ink-faint)" }}>
                  Guided · 18 minutes
                </span>
                <Chip size="sm" accent>
                  Resume
                </Chip>
              </Stack>
            </Row>
          </Stack>
        </Card>
      </Section>

      <Section pad="sm">
        <Eyebrow>QUICK PRACTICES</Eyebrow>
        <Stack gap={5}>
          <ListRow icon="◐" primary="Box breathing" secondary="3 min · anywhere" trailing="▶" />
          <ListRow icon="◑" primary="Loving-kindness" secondary="6 min · seated" trailing="▶" />
        </Stack>
      </Section>

      <Touch at={[68, 41]} />
    </MidFiShell>
  );
}

/* 14 — Brand Advocacy & Referral Engagement Platform */
export function BrandAdvocacyMockup() {
  return (
    <MidFiShell orientation="web" accent="#ff7eb6" title="advocate.hub" meta="Campaigns">
      <Section pad="sm">
        <Row justify="between" align="center">
          <Row gap={12}>
            <span
              style={{
                fontSize: 11,
                color: "var(--ink)",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              AdvocateHub
            </span>
            <Chip size="xs">Campaigns</Chip>
            <Chip size="xs">Rewards</Chip>
            <Chip size="xs">Ambassadors</Chip>
          </Row>
          <Avatar initials="LR" size={22} tone="accent" />
        </Row>
      </Section>

      <Section>
        <Row gap={10} align="stretch">
          <StatTile label="Active" value={<Counter to={14} />} accent />
          <StatTile label="Ambassadors" value="2,148" trend="↑ 122" />
          <StatTile label="Conversion" value={<Counter to={6} variant="pct" />} trend="↑ 1.4 pp" />
          <StatTile label="Reward $" value="$42k" />
        </Row>
      </Section>

      <Section pad="sm">
        <Card pad={12}>
          <Stack gap={8}>
            <Row justify="between" align="center">
              <Stack gap={4}>
                <Eyebrow>CAMPAIGN · LIVE</Eyebrow>
                <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>
                  Summer Launch · refer a friend
                </span>
              </Stack>
              <Chip size="sm" accent>
                Boost
              </Chip>
            </Row>
            <BarChart values={[35, 50, 42, 68, 60, 78, 70, 90, 82, 95]} height={50} />
          </Stack>
        </Card>
      </Section>

      <Cursor from={[14, 28]} to={[88, 70]} />
    </MidFiShell>
  );
}

/* 15 — Digital Publishing & Content Experience Platform */
export function DigitalPublishingMockup() {
  return (
    <MidFiShell orientation="web" accent="#e0b88a" title="atlas.editorial" meta="Issue 042">
      <Section pad="sm">
        <Row justify="between" align="center">
          <Row gap={12}>
            <span
              style={{
                fontSize: 11,
                color: "var(--ink)",
                fontWeight: 700,
                letterSpacing: "0.16em",
              }}
            >
              ATLAS
            </span>
            <Chip size="xs">Culture</Chip>
            <Chip size="xs">Design</Chip>
            <Chip size="xs">Cities</Chip>
          </Row>
          <Chip size="sm" accent>
            Subscribe
          </Chip>
        </Row>
      </Section>

      <Section pad="lg">
        <Row gap={14} align="stretch">
          <Stack gap={6}>
            <Eyebrow>FEATURED · CITIES</Eyebrow>
            <span
              style={{
                fontSize: 18,
                color: "var(--ink)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              The quiet revolution rewriting public space.
            </span>
            <Row gap={8} align="center">
              <Avatar initials="EW" size={20} tone="warm" />
              <span style={{ fontSize: 9.5, color: "var(--ink-faint)" }}>
                Eve Walker · 12 min read
              </span>
            </Row>
          </Stack>
          <Thumb aspect="1.3 / 1" tone="warm" />
        </Row>
      </Section>

      <Section>
        <Eyebrow>THIS WEEK</Eyebrow>
        <Row gap={10} align="stretch">
          {[
            ["Patterns beneath the algorithm", "Design", "neutral"],
            ["Listening rooms of Tokyo", "Culture", "cool"],
            ["What the harbour remembers", "Cities", "warm"],
          ].map(([t, c, tone]) => (
            <Card key={t as string} pad={10}>
              <Stack gap={6}>
                <Thumb
                  aspect="1.4 / 1"
                  tone={tone as "accent" | "warm" | "cool" | "neutral"}
                />
                <Eyebrow>{c}</Eyebrow>
                <span
                  style={{
                    fontSize: 10.5,
                    color: "var(--ink)",
                    fontWeight: 600,
                    lineHeight: 1.25,
                  }}
                >
                  {t}
                </span>
              </Stack>
            </Card>
          ))}
        </Row>
      </Section>

      <Cursor from={[26, 35]} to={[74, 76]} />
    </MidFiShell>
  );
}

/* 16 — Endless Runner Mobile Game */
export function EndlessRunnerMockup() {
  return (
    <MidFiShell orientation="mobile" accent="#ff4dd2">
      <Section pad="sm">
        <Row justify="between" align="center">
          <Stack gap={2}>
            <Eyebrow>RUN · 042</Eyebrow>
            <span
              style={{
                fontSize: 18,
                color: "var(--ink)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              <Counter to={184250} />
            </span>
          </Stack>
          <Stack gap={2}>
            <span
              style={{
                fontSize: 8.5,
                color: "var(--ink-faint)",
                textAlign: "right",
                display: "block",
              }}
            >
              COINS
            </span>
            <span
              style={{
                fontSize: 13,
                color: "var(--ink)",
                fontWeight: 700,
                textAlign: "right",
                display: "block",
              }}
            >
              <Counter to={2840} />
            </span>
          </Stack>
        </Row>
      </Section>

      <Section>
        <Card pad={0}>
          <Thumb
            aspect="1.2 / 1"
            tone="accent"
            glyph={<span style={{ fontSize: 48 }}>🏃‍♀️</span>}
          />
        </Card>
      </Section>

      <Section pad="sm">
        <Row gap={6} justify="between">
          <Chip size="sm" accent>
            PLAY
          </Chip>
          <Chip size="sm">Store</Chip>
          <Chip size="sm">Quests</Chip>
          <Chip size="sm">Leaders</Chip>
        </Row>
      </Section>

      <Section>
        <Eyebrow>DAILY QUESTS</Eyebrow>
        <Stack gap={5}>
          <ListRow icon="◇" primary="Collect 500 coins" secondary="Run 3 levels" trailing="320/500" />
          <ListRow icon="◆" primary="Dodge 25 obstacles" secondary="In a single run" trailing="22/25" />
        </Stack>
      </Section>

      <Touch at={[18, 60]} />
    </MidFiShell>
  );
}
