import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {
    VictoryChart,
    VictoryGroup,
    VictoryTheme,
    VictoryBar,
    VictoryLine,
    VictoryAxis,
    VictoryLabel,
    VictoryLegend,
    VictoryVoronoiContainer,
    VictoryTooltip,
    VictoryScatter
} from "victory-native";

export default function NEvolucao({ nResGrafico }) {

    const MesAtual = nResGrafico.map((gr) => {
        return (
            {
                dia: parseInt(gr.Dia),
                vendas: parseFloat(gr.MesAtual).toFixed()
            }
        );
    });
    const MesAnterior = nResGrafico.map((gr) => {
        return (
            {
                dia: parseInt(gr.Dia),
                vendas: parseFloat(gr.MesAnterior).toFixed()
            }
        );
    });
    const AnoMesatual = nResGrafico.map((gr) => {
        return (
            {
                dia: parseInt(gr.Dia),
                vendas: parseFloat(gr.AnoMesAtual).toFixed()
            }
        );
    });

    return (
        <View>
            <Text>Gráfico de linhas</Text>
        </View>
    );
}