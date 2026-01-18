import { ThemeType } from 'grommet';
import { DeepPartial } from 'utility-types';


const theme: DeepPartial<ThemeType> = {
  global: {
    colors: {
      icon: {
        dark: 'text'
      },
      brand: '#0040ff',
      control: 'brand',
      text: '#aaa',
      background: '#000'
    },
    font: {
      family: 'Arial'
    }
  }
};


export default theme;
