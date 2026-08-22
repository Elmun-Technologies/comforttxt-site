export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
  referrer?: string;
}

export function sanitizeUtmValue(val?: string | null, maxLength = 255): string | undefined {
  if (!val || typeof val !== 'string') return undefined;
  const trimmed = val.trim();
  return trimmed ? trimmed.slice(0, maxLength) : undefined;
}

export function extractUtmParams(data: Record<string, any>): UtmParams {
  return {
    utmSource: sanitizeUtmValue(data.utmSource || data.utm_source),
    utmMedium: sanitizeUtmValue(data.utmMedium || data.utm_medium),
    utmCampaign: sanitizeUtmValue(data.utmCampaign || data.utm_campaign),
    utmContent: sanitizeUtmValue(data.utmContent || data.utm_content),
    utmTerm: sanitizeUtmValue(data.utmTerm || data.utm_term),
    landingPage: sanitizeUtmValue(data.landingPage || data.landing_page),
    referrer: sanitizeUtmValue(data.referrer),
  };
}
