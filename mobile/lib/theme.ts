export const colors = {
  seaAbyss: '#061527',
  seaDeep: '#0a2342',
  seaMid: '#0c3d87',
  seaFoam: '#4aa3ff',
  seaWave: '#1e7ef0',
  seaWaveSoft: '#8ec6ff',
  straw: '#f5c518',
  strawDeep: '#e8a317',
  strawBright: '#ffd84d',
  wanted: '#c41e3a',
  wantedDeep: '#9e1530',
  parchment: '#fff8e4',
  parchmentMid: '#f6e7bc',
  parchmentDark: '#edd59a',
  cardStrong: '#fff6dc',
  paper: '#fffdf6',
  paperWarm: '#fff3d4',
  ink: '#1a1008',
  muted: '#5a4630',
  white: '#fffdf6',
  edge: '#1a1008',
  success: '#1f7a4c',
  rootBg: '#071a33',
  // Main column (matches website .main-column)
  deckTop: '#fff6dc',
  deckMid: '#ecf3fa',
  deckBottom: '#dceaf8',
  headerTop: '#fff8e8',
  headerBottom: '#f3e2b8',
};

export const radii = {
  card: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 15,
  },
  input: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 12,
  },
  chip: 8,
  button: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 12,
  },
};

export const theme = {
  colors,
  radii,
  fonts: {
    pirate: 'PirataOne_400Regular',
    body: 'Nunito_700Bold',
    bodyExtra: 'Nunito_800ExtraBold',
  },
  cardShadow: {
    shadowColor: '#1a1008',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
};
