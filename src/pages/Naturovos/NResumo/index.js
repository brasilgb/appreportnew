import React, { useContext } from 'react';
import { BoxHome, TabContainer } from '../../style';
import HeaderPage from '../../../components/Header/Page';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const ResumoTab = createMaterialTopTabNavigator();

import Filial from './Filial';
import Grupo from './Grupo';
import Exportacao from './Exportacao';
import moment from 'moment';
import { AuthContext } from '../../../contexts/auth';

export default function NResumo() {
    const { totais } = useContext(AuthContext);
    const vtotal = totais.filter((dep) => (dep.Departamento === 5)).map(tot => tot);
    return (
        <BoxHome>
            <HeaderPage
                startColor="#fcbc32"
                endColor="#F5AB00"
                textColor="#333"
                bgStatus="#F5AB00"
                title="Naturovos"
                subTitle="Resumo de Faturamento"
                dtatu={moment(vtotal[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
            />
            <TabContainer>
                <ResumoTab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14 },
                        // tabBarItemStyle: { width: 125 },
                        tabBarStyle: { backgroundColor: '#f1f1f1' },
                        tabBarIndicatorStyle: {backgroundColor: '#F5AB00'},
                        tabBarPressColor: '#fcbc32'
                    }}
                >
                    <ResumoTab.Screen name="Exportação" component={Exportacao} />
                    <ResumoTab.Screen name="Filial" component={Filial} />
                    <ResumoTab.Screen name="Grupo" component={Grupo} />
                </ResumoTab.Navigator>
            </TabContainer>

        </BoxHome>
    );
}