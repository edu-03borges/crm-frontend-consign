import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LicenseInfo } from '@mui/x-license';
import { useSelector } from "react-redux";

import Routes from 'routes';

import themes from 'themes';

import NavigationScroll from 'layout/NavigationScroll';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  LicenseInfo.setLicenseKey('3a606f3b91b5cf1775c14b184cacd867Tz03NTMyNCxFPTE3MjcxMDQzOTEwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
          <ToastContainer 
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
