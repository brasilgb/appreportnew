import React, { useContext } from 'react';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { AuthContext } from '../../../contexts/auth';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';

const ServicoTab = createMaterialTopTabNavigator();

import SCompDiario from './CompDiario';
import SPerformance from './Performance';
import SPerformanceDia from './PerformanceDia';
import SPerformanceMes from './PerformanceMes';

export default function LServicos() {
    const { serTotais } = useContext(AuthContext);

    return (
        <BoxHome>
            <HeaderPage
                startColor="#014D9B"
                endColor="#0A3B7E"
                textColor="#FFF"
                title="Lojas Solar"
                subTitle="Serviços"
                dtatu={moment(serTotais[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
            />
            <TabContainer>
                <ServicoTab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 12 },
                        // tabBarItemStyle: { width: 125 },
                        tabBarStyle: { backgroundColor: '#fdfdfd' },
                        tabBarIndicatorStyle: {backgroundColor: '#0A3B7E'},
                        tabBarPressColor: '#014D9B'
                    }}
                >
                    <ServicoTab.Screen name="Compar. Diário" component={SCompDiario} />
                    <ServicoTab.Screen name="Perform. Mês" component={SPerformanceMes} />
                    <ServicoTab.Screen name="Perform. Dia." component={SPerformanceDia} />
                    <ServicoTab.Screen name="Perform. 12 Meses" component={SPerformance} />
                </ServicoTab.Navigator>
            </TabContainer>

        </BoxHome>
    );
}