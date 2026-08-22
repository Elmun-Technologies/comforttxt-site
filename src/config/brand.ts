/**
 * Approved Comfort Textile identity tokens.
 *
 * Source: supplied brand guidebook, “Asosiy korporativ ranglar”. The tint
 * steps are the 100 / 80 / 60 / 40 / 20% corporate swatches shown there.
 * Keep customer-facing code on semantic Tailwind tokens; this object is for
 * metadata and non-CSS consumers that need the canonical values.
 */
export const brandIdentity = {
  name: 'Comfort Textile',
  colors: {
    primary: '#283593',
    primaryTints: {
      100: '#283593',
      80: '#535DA9',
      60: '#7E86BE',
      40: '#A9AED3',
      20: '#D4D7E9',
    },
    cream: '#F9F5EC',
    creamTints: {
      100: '#F9F5EC',
      80: '#FAF7F0',
      60: '#FBF9F4',
      40: '#FCFBF7',
      20: '#FEFDFC',
    },
  },
} as const;
