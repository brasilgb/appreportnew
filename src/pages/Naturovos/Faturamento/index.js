import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Performance from './Performance';
import PerformanceAssociacao from './PerformanceAssociacao/index.js';
import PerformanceMes from './PerformanceMes';
import ResumoDiario from './NResumo';
import api from '../../../services/api';
const ResumoTab = createMaterialTopTabNavigator();

import { AuthContext } from '../../../contexts/auth';

export default function NFaturamento() {

    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [nfatuTotais, setNfatuTotais] = useState([]);
  
    // Extração de dados resumos totais
    useEffect(() => {
            async function getNfatuTotais() {
                await api.get(`nfatutotais/${dtFormatada(dataFiltro)}`)
                    .then(nfatutotais => {
                        setNfatuTotais(nfatutotais.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            getNfatuTotais();
        }, [dataFiltro]);

    return (
        <BoxHome>
            <HeaderPage
                startColor="#fcbc32"
                endColor="#F5AB00"
                textColor="#333"
                bgStatus="#F5AB00"
                title="Naturovos"
                subTitle="Faturamento"
                dtatu={moment(nfatuTotais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
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
                    <ResumoTab.Screen name="Gráfico Perform." component={Performance} />
                    <ResumoTab.Screen name="Perform. Assoc." component={PerformanceAssociacao} />
                    <ResumoTab.Screen name="Perform. Mês" component={PerformanceMes} />
                </ResumoTab.Navigator>
            </TabContainer>
        </BoxHome>
    );
} 