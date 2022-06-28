import React, { useContext } from 'react';
import HeaderPage from '../../../components/Header/Page';
import { AuthContext } from '../../../contexts/auth';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';

const CompraTab = createMaterialTopTabNavigator();

import CCompDiario from './CompDiario';
import CPerformance from './Performance';
import CPerformanceAss from './PerformanceAss';
import CPerformanceMes from './PerformanceMes';
import { BoxHome, TabContainer } from '../../style';

export default function SCompras() {

  const { comTotais } = useContext(AuthContext);

  return (
    <BoxHome>
      <HeaderPage
        startColor="#FF710F"
        endColor="#f26000"
        textColor="#FFF"
        bgStatus="#f26000"
        title="Supermercados"
        subTitle="Compras"
        dtatu={moment(comTotais[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
      />

      <TabContainer>
        <CompraTab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            // tabBarItemStyle: { width: 125 },
            tabBarStyle: { backgroundColor: '#fdfdfd' },
            tabBarIndicatorStyle: {backgroundColor: '#0A3B7E'},
            tabBarPressColor: '#014D9B'
          }}
        >
          <CompraTab.Screen name="Compar. Diário" component={CCompDiario} />
          <CompraTab.Screen name="Perform." component={CPerformance} />
          <CompraTab.Screen name="Perform. Ass." component={CPerformanceAss} />
          <CompraTab.Screen name="Perform. Mês" component={CPerformanceMes} />
        </CompraTab.Navigator>
      </TabContainer>

    </BoxHome>
  );
}