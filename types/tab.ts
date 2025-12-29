
import type { ComponentType } from 'react';

export interface ItabScreen {
  name: string;
  title?: string;
  Icon?: ComponentType<any>;
  label?: string;
  headerColor?: string;
}
