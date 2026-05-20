/* Tweaks panel app */
(() => {
  const { useEffect } = React;
  const defaults = window.__TWEAK_DEFAULTS || {};

  function App() {
    const [t, setTweak] = window.useTweaks(defaults);

    useEffect(() => {
      const a = window.__anoshaanApply;
      if (!a) return;
      a.applyAccent(t.accent);
      a.applyMotion(t.motionIntensity);
      a.applyCursor(t.cursorMode);
      a.applyHeroReveal(t.heroReveal);
    }, [t.accent, t.motionIntensity, t.cursorMode, t.heroReveal]);

    return (
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Accent">
          <window.TweakColor
            value={t.accent}
            onChange={(v) => setTweak('accent', v)}
            options={['#cfd9ff', '#a78bfa', '#7dd3fc', '#f5d28a', '#ecebe6']}
          />
        </window.TweakSection>

        <window.TweakSection title="Motion">
          <window.TweakRadio
            value={t.motionIntensity}
            onChange={(v) => setTweak('motionIntensity', v)}
            options={[
              { label: 'Full', value: 'full' },
              { label: 'Reduced', value: 'reduced' },
              { label: 'Off', value: 'off' },
            ]}
          />
        </window.TweakSection>

        <window.TweakSection title="Cursor">
          <window.TweakRadio
            value={t.cursorMode}
            onChange={(v) => setTweak('cursorMode', v)}
            options={[
              { label: 'Custom', value: 'custom' },
              { label: 'System', value: 'system' },
            ]}
          />
        </window.TweakSection>

        <window.TweakSection title="Hero reveal">
          <window.TweakRadio
            value={t.heroReveal}
            onChange={(v) => setTweak('heroReveal', v)}
            options={[
              { label: 'Blur', value: 'blur' },
              { label: 'Mask', value: 'mask' },
            ]}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    );
  }

  const mount = document.createElement('div');
  document.body.appendChild(mount);
  ReactDOM.createRoot(mount).render(<App />);
})();
