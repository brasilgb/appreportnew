import React, { useContext } from 'react';
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

export default function LFaturamento() {
    const { totais } = useContext(AuthContext);

    return (
        <BoxHome>
            <HeaderPage 
            startColor="#014D9B"
            endColor="#0A3B7E"
            bgStatus="#0A3B7E"
            textColor="#FFF"
            title="Lojas Solar"
            subTitle="Faturamento"
            dtatu={ moment(totais[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
            />
            <TabContainer>
                <ResumoTab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14 },
                        // tabBarItemStyle: { width: 125 },
                        tabBarStyle: { backgroundColor: '#fdfdfd' },
                        tabBarIndicatorStyle: {backgroundColor: '#0A3B7E'},
                        tabBarPressColor: '#014D9B'
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