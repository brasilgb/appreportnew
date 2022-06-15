import React, { useContext } from 'react';
import moment from 'moment';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Performance from './Performance';
import PerformanceAssociacao from './PerformanceAssociacao';
import PerformanceMes from './PerformanceMes';
import ResumoDiario from './NResumo';
const ResumoTab = createMaterialTopTabNavigator();

import { AuthContext } from '../../../contexts/auth';

export default function NFaturamento() {
    const { nfatuTotais } = useContext(AuthContext);

    return (
        <BoxHome>
            <HeaderPage
                startColor="#fcbc32"
                endColor="#F5AB00"
                textColor="#333"
                bgStatus="#F5AB00"
                title="Naturovos"
                subTitle="Faturamento"
                dtatu={moment(nfatuTotais[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
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
                    <ResumoTab.Screen name="Resumo Diario" component={ResumoDiario} />
                    <ResumoTab.Screen name="Perform." component={Performance} />
                    <ResumoTab.Screen name="Perform. Assoc." component={PerformanceAssociacao} />
                    <ResumoTab.Screen name="Perform. Mês" component={PerformanceMes} />
                </ResumoTab.Navigator>
            </TabContainer>
        </BoxHome>
    );
} 