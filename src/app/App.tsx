import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import { WizardProvider } from '@/features/wizard/context/WizardContext';

function App() {
  return (
    <WizardProvider>
      <RouterProvider router={router} />
    </WizardProvider>
  );
}

export default App;
