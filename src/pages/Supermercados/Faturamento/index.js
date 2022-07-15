import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Performance from './Performance';
import PerformanceAssociacao from './PerformanceAssociacao';
import PerformanceMes from './PerformanceMes';
import ResumoDiario from './ResumoDiario';
const ResumoTab = createMaterialTopTabNavigator();

import { AuthContext } from '../../../contexts/auth';
import api from '../../../services/api';

export default function SFaturamento() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [sFatTotais, setSFatTotais] = useState([]);

  useEffect(() => {
          async function getSFatTotais() {
              await api.get(`sfattotais/${dtFormatada(dataFiltro)}`)
                  .then(sfattotais => {
                    setSFatTotais(sfattotais.data);
                  })
                  .catch(err => {
                      console.log(err);
                  })
          }
          getSFatTotais();
      }, [dataFiltro]);

    return (
        <BoxHome>
            <HeaderPage
                startColor="#FF710F"
                endColor="#f26000"
                textColor="#FFF"
                bgStatus="#f26000"
                title="Supermercados"
                subTitle="Faturamento"
                dtatu={moment(sFatTotais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
            />
            <TabContainer>
                <ResumoTab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14 },
                        // tabBarItemStyle: { width: 125 },
                        tabBarStyle: { backgroundColor: '#fdfdfd' },
                        tabBarIndicatorStyle: { backgroundColor: '#0A3B7E' },
                        tabBarPressColor: '#014D9B'
                    }}
                >
                    <ResumoTab.Screen name="Comp. Diario" component={ResumoDiario} />
                    <ResumoTab.Screen name="Perform." component={Performance} />
                    <ResumoTab.Screen name="Perform. Assoc." component={PerformanceAssociacao} />
                    <ResumoTab.Screen name="Perform. Mês" component={PerformanceMes} />
                </ResumoTab.Navigator>
            </TabContainer>

        </BoxHome>
    );
} 