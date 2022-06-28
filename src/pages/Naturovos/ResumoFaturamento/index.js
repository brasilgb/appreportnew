import React, { useContext } from 'react';
import moment from 'moment';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const ResumoTab = createMaterialTopTabNavigator();

import { AuthContext } from '../../../contexts/auth';
import ResFaturamento from './ResFaturamento';
import GrafEvolucao from './GrafEvolucao';

export default function NResumoFaturamento() {
    const { nResTotal } = useContext(AuthContext);

    return (
        <BoxHome>
            <HeaderPage
                startColor="#fcbc32"
                endColor="#F5AB00"
                textColor="#333"
                bgStatus="#F5AB00"
                title="Naturovos"
                subTitle="ADM Resumo"
                dtatu={moment(nResTotal[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
            />
            <TabContainer>
                <ResumoTab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14 },
                        // tabBarItemStyle: { width: 125 },
                        tabBarStyle: { backgroundColor: '#f1f1f1' },
                        tabBarIndicatorStyle: { backgroundColor: '#F5AB00' },
                        tabBarPressColor: '#fcbc32'
                    }}
                >
                    <ResumoTab.Screen name="Resumo Faturamento" component={ResFaturamento} />
                    <ResumoTab.Screen name="Gráfico Evolução" component={GrafEvolucao} />
                </ResumoTab.Navigator>
            </TabContainer>
        </BoxHome>
    );
} 