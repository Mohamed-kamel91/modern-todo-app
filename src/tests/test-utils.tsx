import {
  render as rtlRender,
  RenderOptions,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppProvider } from '../app/AppProvider';

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: AppProvider, ...options });

export * from '@testing-library/react';
export { userEvent, customRender as render };
