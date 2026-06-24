export const stars = Array.from({ length: 50 }, (_, i) => ({
  top:      `${(i * 37.3) % 100}%`,
  left:     `${(i * 61.8) % 100}%`,
  size:     (i % 3) + 1,
  duration: `${3 + (i % 5)}s`,
  delay:    `${(i * 0.37) % 5}s`,
}));