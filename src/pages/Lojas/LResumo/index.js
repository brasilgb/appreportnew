import React, { useContext } from 'react';
import moment from 'moment';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const ResumoTab = createMaterialTopTabNavigator();
import Filial from './Filial';
import Associacao from './Associacao';
import { AuthContext } from '../../../contexts/auth';

export default function LResumo() {
    const { totais } = useContext(AuthContext);

    const vtotal = totais.filter((dep) => dep.Departamento === 1).map((dt) => (dt));

    return (
        <BoxHome>
            <HeaderPage 
            startColor="#014D9B"
            endColor="#0A3B7E"
            textColor="#FFF"
            title="Lojas Solar"
            subTitle="Resumo de Faturamento"
            dtatu={ moment(vtotal[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
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
                    <ResumoTab.Screen name="Filial" component={Filial} />
                    <ResumoTab.Screen name="Associacao" component={Associacao} />
                </ResumoTab.Navigator>
            </TabContainer>

        </BoxHome>
    );
} 