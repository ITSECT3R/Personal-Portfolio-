import type { ReactElement } from 'react';
import type { CertificationIssuer } from '../types/certification';
import { EpamSystems, FreeCodeCamp, AWS } from '../components/common/icons/brands';

type IssuerIconComponent = (props: { width?: number; height?: number }) => ReactElement;

/**
 * Single source of truth mapping CertificationIssuer values → brand icon components.
 * Used by both CV page (via groupCertificationsByIssuer) and Skills page (CertificationCard).
 */
export const ISSUER_ICON_MAP: Record<CertificationIssuer, IssuerIconComponent> = {
  epam: EpamSystems,
  freecodecamp: FreeCodeCamp,
  aws: AWS,
};
