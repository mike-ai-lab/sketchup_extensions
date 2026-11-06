import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";

/* ─── Animated toggle switch (ported from toggle_switch_with_legs_component.html) ─── */

function SwitchDirt() {
  return (
    <svg className="tsw-dirt" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <g transform="translate(0,21)">
        {[12, 15, 18, 21].map((x, i) => (
          <g key={i} transform={`translate(${x},0)`}>
            <g className={`tsw-dirt-move tsw-dirt-move--${i + 1}`}>
              <circle className="tsw-dirt-particle" r="3" transform="translate(0,6)" />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

function SwitchHandle() {
  return (
    <svg className="tsw-handle" viewBox="0 0 24 36" width="24" height="36" aria-hidden="true">
      <clipPath id="tsw-head-clip"><circle r="12" cx="12" cy="12" /></clipPath>
      <clipPath id="tsw-legs-clip"><rect y="18" width="24" height="18" /></clipPath>
      <g clipPath="url(#tsw-legs-clip)">
        <g className="tsw-handle-legs" transform="translate(0,13)">
          <g stroke="currentColor" strokeLinecap="round" strokeWidth="1" transform="translate(9,35.5)">
            <g>
              <g className="tsw-handle-right-foot"><polyline points="0 0, 3 0" /></g>
              <g className="tsw-handle-right-leg-lower">
                <polyline points="0 0, 0 -6" />
                <g transform="translate(0,-6)">
                  <g className="tsw-handle-right-leg-upper"><polyline points="0 0, 0 -6" /></g>
                </g>
              </g>
            </g>
            <g transform="translate(6,0)">
              <g className="tsw-handle-left-foot"><polyline points="0 0, 3 0" /></g>
              <g className="tsw-handle-left-leg-lower">
                <polyline points="0 0, 0 -6" />
                <g transform="translate(0,-6)">
                  <g className="tsw-handle-left-leg-upper"><polyline points="0 0, 0 -6" /></g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <g className="tsw-handle-body" transform="translate(0,12)">
        <g clipPath="url(#tsw-head-clip)">
          <circle className="tsw-handle-head" r="12" cx="12" cy="12" />
          <g className="tsw-handle-face">
            <circle r="1" cx="-5" cy="1" />
            <circle r="1" cx="5" cy="1" />
            <path d="M -2 2.5 H 2 A 2 2 0 0 1 -2 2.5" />
          </g>
        </g>
      </g>
    </svg>
  );
}

function ThemeToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  const [hasToggled, setHasToggled] = useState(false);

  function handleChange() {
    setHasToggled(true);
    onChange();
  }

  const inputClass = ["tsw-input", hasToggled ? "tsw-input--animated" : ""].filter(Boolean).join(" ");

  return (
    <>
      <style>{SWITCH_CSS}</style>
      <label className="tsw pointer-events-auto" aria-label={checked ? "Switch to dark mode" : "Switch to light mode"}>
        <input
          className={inputClass}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={handleChange}
        />
        <SwitchDirt />
        <SwitchHandle />
      </label>
    </>
  );
}

/* ─── Scoped CSS — all selectors prefixed tsw- so they never leak ─── */
const SWITCH_CSS = `
  .tsw {
    --tsw-dur: 2.5s;
    --tsw-hue: 223;
    display: flex;
    position: relative;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .tsw-dirt, .tsw-handle { position: absolute; }
  .tsw-dirt { inset: auto auto 0.0625em 0.8125em; width: 1.375em; height: 1.375em; }
  .tsw-dirt-move, .tsw-dirt-particle {
    animation-duration: calc(var(--tsw-dur) * 0.1);
    animation-timing-function: linear;
  }
  .tsw-dirt-particle { fill: rgba(255,255,255,0.3); }
  .tsw-handle {
    margin: 0.0625em;
    width: 1.375em; height: 2.0625em;
    overflow: visible;
    inset: auto auto 0 0;
  }
  .tsw-handle, .tsw-handle-body, .tsw-handle-face,
  .tsw-handle-head, .tsw-handle-right-leg-upper, .tsw-handle-right-leg-lower,
  .tsw-handle-left-leg-upper, .tsw-handle-left-leg-lower,
  .tsw-handle-legs, .tsw-handle-right-foot, .tsw-handle-left-foot {
    animation-duration: var(--tsw-dur);
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
    animation-fill-mode: forwards;
  }
  .tsw-handle-body { transform-origin: 12px 20px; }
  .tsw-handle-face { fill: #050505; }
  .tsw-handle-head { fill: hsl(var(--tsw-hue) 90% 60%); transition: fill 0.3s; }

  /* Legs are hidden at rest, visible during animation */
  .tsw-handle-legs {
    opacity: 0;
    transition: opacity 0.4s ease 0s;
  }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-legs {
    opacity: 1;
    transition: opacity 0s;
  }

  .tsw-input {
    border-radius: 0.75em;
    box-shadow: 0 0 0 max(1px,0.0625rem) rgba(255,255,255,0.25) inset;
    display: block;
    position: relative;
    width: 3em; height: 1.5em;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    background: transparent;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  .tsw-input:checked { background-color: rgba(255,255,255,0.08); }
  .tsw-input:checked ~ .tsw-handle { transform: translateX(1.5em); }
  .tsw-input:checked ~ .tsw-handle .tsw-handle-head { fill: currentColor; }
  .tsw-input:checked ~ .tsw-handle .tsw-handle-face { fill: #f5f5f5; }

  /* OFF animated */
  .tsw-input--animated ~ .tsw-dirt .tsw-dirt-particle { animation-name: tsw-off-dirt-jump; }
  .tsw-input--animated ~ .tsw-dirt .tsw-dirt-move      { animation-name: tsw-off-dirt-move; }
  .tsw-input--animated ~ .tsw-dirt .tsw-dirt-move--1,
  .tsw-input--animated ~ .tsw-dirt .tsw-dirt-move--1 .tsw-dirt-particle { animation-delay: calc(var(--tsw-dur)*0.5); }
  .tsw-input--animated ~ .tsw-dirt .tsw-dirt-move--2,
  .tsw-input--animated ~ .tsw-dirt .tsw-dirt-move--2 .tsw-dirt-particle { animation-delay: calc(var(--tsw-dur)*0.48); }
  .tsw-input--animated ~ .tsw-dirt .tsw-dirt-move--3,
  .tsw-input--animated ~ .tsw-dirt .tsw-dirt-move--3 .tsw-dirt-particle { animation-delay: calc(var(--tsw-dur)*0.46); }
  .tsw-input--animated ~ .tsw-dirt .tsw-dirt-move--4,
  .tsw-input--animated ~ .tsw-dirt .tsw-dirt-move--4 .tsw-dirt-particle { animation-delay: calc(var(--tsw-dur)*0.44); }
  .tsw-input--animated ~ .tsw-handle                         { animation-name: tsw-off-handle-move-left; }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-body        { animation-name: tsw-off-handle-body; }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-face        { animation-name: tsw-off-handle-face; }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-head        { animation-name: tsw-off-handle-head; }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-right-leg-upper { animation-name: tsw-off-handle-right-leg-upper; }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-right-leg-lower { animation-name: tsw-off-handle-right-leg-lower; }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-left-leg-upper  { animation-name: tsw-off-handle-left-leg-upper; }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-left-leg-lower  { animation-name: tsw-off-handle-left-leg-lower; }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-legs        { animation-name: tsw-off-handle-legs; }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-right-foot  { animation-name: tsw-off-handle-right-foot; }
  .tsw-input--animated ~ .tsw-handle .tsw-handle-left-foot   { animation-name: tsw-off-handle-left-foot; }

  /* ON animated */
  .tsw-input--animated:checked ~ .tsw-dirt .tsw-dirt-particle { animation-name: tsw-on-dirt-jump; }
  .tsw-input--animated:checked ~ .tsw-dirt .tsw-dirt-move      { animation-name: tsw-on-dirt-move; }
  .tsw-input--animated:checked ~ .tsw-dirt .tsw-dirt-move--1,
  .tsw-input--animated:checked ~ .tsw-dirt .tsw-dirt-move--1 .tsw-dirt-particle { animation-delay: calc(var(--tsw-dur)*0.44); }
  .tsw-input--animated:checked ~ .tsw-dirt .tsw-dirt-move--2,
  .tsw-input--animated:checked ~ .tsw-dirt .tsw-dirt-move--2 .tsw-dirt-particle { animation-delay: calc(var(--tsw-dur)*0.46); }
  .tsw-input--animated:checked ~ .tsw-dirt .tsw-dirt-move--3,
  .tsw-input--animated:checked ~ .tsw-dirt .tsw-dirt-move--3 .tsw-dirt-particle { animation-delay: calc(var(--tsw-dur)*0.48); }
  .tsw-input--animated:checked ~ .tsw-dirt .tsw-dirt-move--4,
  .tsw-input--animated:checked ~ .tsw-dirt .tsw-dirt-move--4 .tsw-dirt-particle { animation-delay: calc(var(--tsw-dur)*0.5); }
  .tsw-input--animated:checked ~ .tsw-handle                         { animation-name: tsw-on-handle-move-right; }
  .tsw-input--animated:checked ~ .tsw-handle .tsw-handle-body        { animation-name: tsw-on-handle-body; }
  .tsw-input--animated:checked ~ .tsw-handle .tsw-handle-face        { animation-name: tsw-on-handle-face; }
  .tsw-input--animated:checked ~ .tsw-handle .tsw-handle-head        { animation-name: tsw-on-handle-head; }
  .tsw-input--animated:checked ~ .tsw-handle .tsw-handle-right-leg-upper { animation-name: tsw-on-handle-right-leg-upper; }
  .tsw-input--animated:checked ~ .tsw-handle .tsw-handle-right-leg-lower { animation-name: tsw-on-handle-right-leg-lower; }
  .tsw-input--animated:checked ~ .tsw-handle .tsw-handle-left-leg-upper  { animation-name: tsw-on-handle-left-leg-upper; }
  .tsw-input--animated:checked ~ .tsw-handle .tsw-handle-left-leg-lower  { animation-name: tsw-on-handle-left-leg-lower; }
  .tsw-input--animated:checked ~ .tsw-handle .tsw-handle-legs        { animation-name: tsw-on-handle-legs; }
  .tsw-input--animated:checked ~ .tsw-handle .tsw-handle-right-foot  { animation-name: tsw-on-handle-right-foot; }
  .tsw-input--animated:checked ~ .tsw-handle .tsw-handle-left-foot   { animation-name: tsw-on-handle-left-foot; }

  /* Keyframes */
  @keyframes tsw-on-dirt-jump {
    0%,100% { transform: translate(0,6px); } 50% { transform: translate(0,3px); }
  }
  @keyframes tsw-on-dirt-move {
    0% { transform: translate(0,0); } 100% { transform: translate(-11px,0); }
  }
  @keyframes tsw-off-dirt-jump {
    0%,100% { transform: translate(0,6px); } 50% { transform: translate(0,3px); }
  }
  @keyframes tsw-off-dirt-move {
    0% { transform: translate(-9px,0); } 100% { transform: translate(2px,0); }
  }
  @keyframes tsw-on-handle-body {
    0%   { transform: translate(0,12px) rotate(0); }
    11%  { transform: translate(0,0) rotate(0); }
    22%  { transform: translate(0,2px) rotate(0); }
    33%  { transform: translate(0,1px) rotate(0); }
    42%,50% { animation-timing-function: linear; transform: translate(0,1px) rotate(-7.5deg); }
    56%  { animation-timing-function: cubic-bezier(0.33,1,0.68,1); transform: translate(0,1px) rotate(7.5deg); }
    63%  { animation-timing-function: cubic-bezier(0.65,0,0.35,1); transform: translate(0,1px) rotate(0); }
    75%  { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translate(0,0) rotate(0); }
    88%  { animation-timing-function: cubic-bezier(0.33,1,0.68,1); transform: translate(0,12px) rotate(0); }
    91%  { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translate(0,8px) rotate(0); }
    94%  { animation-timing-function: cubic-bezier(0.33,1,0.68,1); transform: translate(0,12px) rotate(0); }
    97%  { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translate(0,11.5px) rotate(0); }
    100% { transform: translate(0,12px) rotate(0); }
  }
  @keyframes tsw-on-handle-face {
    0%   { transform: translate(24px,24px) rotate(20deg); }
    11%  { transform: translate(16px,12px) rotate(0); }
    22%  { transform: translate(16px,13px) rotate(0); }
    33%,50% { animation-timing-function: cubic-bezier(0.33,1,0.68,1); transform: translate(16px,12px) rotate(0); }
    56%  { animation-timing-function: cubic-bezier(0.65,0,0.35,1); transform: translate(17px,12.5px) rotate(0); }
    75%  { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translate(12px,12px) rotate(0); }
    85%,100% { transform: translate(12px,24px) rotate(0); }
  }
  @keyframes tsw-on-handle-head {
    0%,75% { fill: hsl(223 90% 60%); } 100% { fill: currentColor; }
  }
  @keyframes tsw-on-handle-legs {
    0%  { transform: translate(0,1px); }
    11% { transform: translate(0,-1px); }
    22%,75% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translate(0,0); }
    88%,100% { transform: translate(0,1px); }
  }
  @keyframes tsw-on-handle-right-leg-upper {
    0%  { transform: rotate(-180deg); } 11% { transform: rotate(0); }
    22% { transform: rotate(-40deg); }  33% { transform: rotate(-30deg); }
    42%,63% { transform: rotate(0); }
    75% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: rotate(30deg); }
    88%,100% { transform: rotate(180deg); }
  }
  @keyframes tsw-on-handle-right-leg-lower {
    0%  { transform: rotate(90deg); }  11% { transform: rotate(0); }
    22% { transform: rotate(20deg); }  33% { transform: rotate(15deg); }
    42% { transform: translate(3px,0) rotate(-15deg); }
    56%,63% { transform: rotate(0); }
    75% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: rotate(-15deg); }
    88%,100% { transform: rotate(-90deg); }
  }
  @keyframes tsw-on-handle-right-foot {
    0%  { transform: scale(1,1); }
    11% { transform: scale(1,1) rotate(7.5deg); }
    22%,33% { transform: scale(1,1); }
    42% { transform: translate(3px,0) scale(1,1) rotate(-15deg); }
    56% { transform: translate(0,0) scale(1,1); }
    63%,100% { transform: translate(0,0) scale(-1,1); }
  }
  @keyframes tsw-on-handle-left-leg-upper {
    0%  { transform: rotate(-180deg); } 11% { transform: rotate(0); }
    22% { transform: rotate(-40deg); }  33% { transform: rotate(-30deg); }
    42%,63% { transform: rotate(0); }
    75% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: rotate(-30deg); }
    88%,100% { transform: rotate(-180deg); }
  }
  @keyframes tsw-on-handle-left-leg-lower {
    0%  { transform: rotate(90deg); }  11% { transform: rotate(0); }
    22% { transform: rotate(20deg); }  33% { transform: rotate(15deg); }
    42% { transform: translate(3px,0) rotate(-15deg); }
    56%,63% { transform: rotate(0); }
    75% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: rotate(15deg); }
    88%,100% { transform: rotate(90deg); }
  }
  @keyframes tsw-on-handle-left-foot {
    0%  { transform: scale(1,1); }
    11% { transform: scale(1,1) rotate(7.5deg); }
    22%,33% { transform: scale(1,1); }
    42% { transform: translate(3px,0) scale(1,1) rotate(-15deg); }
    56%,100% { transform: translate(0,0) scale(1,1); }
  }
  @keyframes tsw-on-handle-move-right {
    0%,33% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translateX(0); }
    50%,100% { transform: translateX(1.5em); }
  }
  @keyframes tsw-off-handle-body {
    0%   { transform: translate(0,12px) rotate(0); }
    11%  { transform: translate(0,0) rotate(0); }
    22%  { transform: translate(0,2px) rotate(0); }
    33%  { transform: translate(0,1px) rotate(0); }
    42%,50% { animation-timing-function: linear; transform: translate(0,1px) rotate(7.5deg); }
    56%  { animation-timing-function: cubic-bezier(0.33,1,0.68,1); transform: translate(0,1px) rotate(-7.5deg); }
    63%  { animation-timing-function: cubic-bezier(0.65,0,0.35,1); transform: translate(0,1px) rotate(0); }
    75%  { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translate(0,0) rotate(0); }
    88%  { animation-timing-function: cubic-bezier(0.33,1,0.68,1); transform: translate(0,12px) rotate(0); }
    91%  { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translate(0,8px) rotate(0); }
    94%  { animation-timing-function: cubic-bezier(0.33,1,0.68,1); transform: translate(0,12px) rotate(0); }
    97%  { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translate(0,11.5px) rotate(0); }
    100% { transform: translate(0,12px) rotate(0); }
  }
  @keyframes tsw-off-handle-face {
    0%   { transform: translate(-6px,24px) rotate(-20deg); }
    11%  { transform: translate(8px,12px) rotate(0); }
    22%  { transform: translate(8px,13px) rotate(0); }
    33%,50% { animation-timing-function: cubic-bezier(0.33,1,0.68,1); transform: translate(8px,12px) rotate(0); }
    56%  { animation-timing-function: cubic-bezier(0.65,0,0.35,1); transform: translate(7px,12.5px) rotate(0); }
    75%  { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translate(12px,12px) rotate(0); }
    85%,100% { transform: translate(12px,24px) rotate(0); }
  }
  @keyframes tsw-off-handle-head {
    0%,75% { fill: currentColor; } 100% { fill: hsl(223 90% 60%); }
  }
  @keyframes tsw-off-handle-legs {
    0%  { transform: translate(0,1px); }
    11% { transform: translate(0,-1px); }
    22%,75% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translate(0,0); }
    88%,100% { transform: translate(0,1px); }
  }
  @keyframes tsw-off-handle-right-leg-upper {
    0%  { transform: rotate(180deg); }  11% { transform: rotate(0); }
    22% { transform: rotate(40deg); }   33% { transform: rotate(30deg); }
    42%,63% { transform: rotate(0); }
    75% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: rotate(30deg); }
    88%,100% { transform: rotate(180deg); }
  }
  @keyframes tsw-off-handle-right-leg-lower {
    0%  { transform: rotate(-90deg); } 11% { transform: rotate(0); }
    22% { transform: rotate(-20deg); } 33% { transform: rotate(-15deg); }
    42% { transform: translate(-3px,0) rotate(15deg); }
    56%,63% { transform: rotate(0); }
    75% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: rotate(-15deg); }
    88%,100% { transform: rotate(-90deg); }
  }
  @keyframes tsw-off-handle-right-foot {
    0%  { transform: scale(-1,1); }
    11% { transform: scale(-1,1) rotate(7.5deg); }
    22%,33% { transform: scale(-1,1); }
    42% { transform: translate(-3px,0) scale(-1,1) rotate(-15deg); }
    56%,100% { transform: scale(-1,1) rotate(0); }
  }
  @keyframes tsw-off-handle-left-leg-upper {
    0%  { transform: rotate(180deg); }  11% { transform: rotate(0); }
    22% { transform: rotate(40deg); }   33% { transform: rotate(30deg); }
    42%,63% { transform: rotate(0); }
    75% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: rotate(-30deg); }
    88%,100% { transform: rotate(-180deg); }
  }
  @keyframes tsw-off-handle-left-leg-lower {
    0%  { transform: rotate(-90deg); } 11% { transform: rotate(0); }
    22% { transform: rotate(-20deg); } 33% { transform: rotate(-15deg); }
    42% { transform: translate(-3px,0) rotate(15deg); }
    56%,63% { transform: rotate(0); }
    75% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: rotate(15deg); }
    88%,100% { transform: rotate(90deg); }
  }
  @keyframes tsw-off-handle-left-foot {
    0%  { transform: scale(-1,1) rotate(0); }
    11% { transform: scale(-1,1) rotate(7.5deg); }
    22%,33% { transform: scale(-1,1) rotate(0); }
    42% { transform: translate(-3px,0) scale(-1,1) rotate(-15deg); }
    56% { transform: translate(0,0) scale(-1,1); }
    63%,100% { transform: scale(1,1) rotate(0); }
  }
  @keyframes tsw-off-handle-move-left {
    0%,33% { animation-timing-function: cubic-bezier(0.32,0,0.67,0); transform: translateX(1.5em); }
    50%,100% { transform: translateX(0); }
  }
`;

/* ─── Header ─── */

interface HeaderProps {
  currentPage: "home" | "tools" | "pricing" | "contact";
  hideLogo?: boolean;
}

export default function Header({ currentPage, hideLogo = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, switchable } = useTheme();
  const { t } = useTranslation();

  const navItems: Array<{ href: string; key: HeaderProps["currentPage"]; label: string }> = [
    { href: "/",        key: "home",    label: t('nav.home') },
    { href: "/tools",   key: "tools",   label: t('nav.tools') },
    { href: "/pricing", key: "pricing", label: t('nav.pricing') },
    { href: "/contact", key: "contact", label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-3 sm:px-6 lg:px-12 pt-8 lg:pt-10 flex items-center pointer-events-none">
      <Link href="/" className={`text-lg sm:text-2xl font-black tracking-[0.2em] sm:tracking-[0.3em] italic uppercase pointer-events-auto transition-opacity duration-300 ${hideLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        Studiø
      </Link>

      <div className="pointer-events-auto hidden md:flex gap-8 text-[9px] font-black uppercase tracking-[0.4em] ml-auto mr-6 lg:mr-20">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={currentPage === item.key ? "text-white" : "text-white/40 hover:text-white transition-colors"}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Animated toggle — desktop */}
      {switchable && toggleTheme && (
        <div className="hidden md:flex items-end mr-3" style={{ fontSize: "18px" }}>
          <ThemeToggleSwitch
            checked={theme === "light"}
            onChange={toggleTheme}
          />
        </div>
      )}

      {/* Language switcher — desktop */}
      <div className="hidden md:flex items-center mr-2">
        <LanguageSwitcher />
      </div>

      {/* Animated toggle — mobile */}
      {switchable && toggleTheme && (
        <div className="md:hidden ml-auto flex items-end mr-2" style={{ fontSize: "18px" }}>
          <ThemeToggleSwitch
            checked={theme === "light"}
            onChange={toggleTheme}
          />
        </div>
      )}

      {/* Language switcher — mobile */}
      <div className="md:hidden flex items-center mr-1">
        <LanguageSwitcher />
      </div>

      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="pointer-events-auto md:hidden w-10 h-10 rounded-xl border border-white/20 bg-black/40 flex items-center justify-center"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {menuOpen && (
        <div className="pointer-events-auto absolute top-14 left-4 right-4 md:hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur p-3 space-y-1 shadow-2xl">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-xs uppercase tracking-[0.35em] font-black ${
                currentPage === item.key ? "text-white bg-white/10" : "text-white/70"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
