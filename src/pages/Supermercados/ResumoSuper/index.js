import React, { useContext } from 'react';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const ResumoTab = createMaterialTopTabNavigator();

import Filial from './Filial';
import Segmento from './Segmento';
import { AuthContext } from '../../../contexts/auth';
import moment from 'moment';

export default function ResumoSuper() {
  const { totais } = useContext(AuthContext);
  const vtotal = totais.filter((dep) => (dep.Departamento === 1)).map(tot => tot);
  return (
    <BoxHome>
      <HeaderPage
        startColor="#FF710F"
        endColor="#f26000"
        textColor="#FFF"
        bgStatus="#f26000"
        title="Supermercados"
        subTitle="Resumo de Faturamento"
        dtatu={moment(vtotal[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
      />
      <TabContainer>
        <ResumoTab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14 },
            // tabBarItemStyle: { width: 125 },
            tabBarStyle: { backgroundColor: '#f1f1f1' },
            tabBarIndicatorStyle: {backgroundColor: '#f26000'},
            tabBarPressColor: '#FF710F'
          }}
        >
          <ResumoTab.Screen name="Filial" component={Filial} />
          <ResumoTab.Screen name="Segmento" component={Segmento} />
        </ResumoTab.Navigator>
      </TabContainer>

    </BoxHome>
  );
}