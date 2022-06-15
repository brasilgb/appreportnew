import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend
} from "victory-native";

export default function ComprasChart({ datagrafico }) {

  const datagraf = datagrafico.map((gr) => {
    return (
      {
        diasemana: gr.DiaSemana,
        compras: parseFloat(gr.Compras)
      }
    );
  });

  const data = datagraf;
  return (
    <View>
      <DataTable.Row style={styles.titleTable}>
        <DataTable.Cell style={styles.titleText}>
          <Text style={styles.titleText}>Gráfico de evolução de compras</Text>
        </DataTable.Cell>
      </DataTable.Row>
      <VictoryChart
        horizontal
        // height={750}
        // width={380}
        theme={VictoryTheme.material}
        domainPadding={{x: [18, 18], y: 60}}
      >
        <VictoryLegend
          x={0} y={0}
          title=""
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ title: { fontSize: 20} }}
          data={[
            { name: "Vendas", symbol: { fill: "#025AA6", type: "square" } },
            { name: "Meta", symbol: { fill: "red", type: "minus" } }
          ]}
        />
        <VictoryAxis

          style={{
            axis: { stroke: "grey" },
            axisLabel: { fontSize: 10, padding: 0 },
            grid: { stroke: "none" },
            ticks: { stroke: "none", size: 5 },
            tickLabels: { fontSize: 10, padding: 5 }
          }}

        />
        <VictoryAxis
          dependentAxis
          orientation="top"
        />

        <VictoryBar
          data={data}
          labels={({ datum }) => `R$ ${datum.compras}`}
          labelComponent={<VictoryLabel angle={0} textAnchor="start" verticalAnchor="middle" />}
          barRatio={0.8}
          alignment="middle"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          style={{
            data: {
              fill: "#025AA6",
              // width: 20,
            }
          }}
          x="diasemana"
          y="compras"
        />
        
      </VictoryChart>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  legendaTitle: {
    paddingHorizontal: 8
  },
  titleTable: {
    backgroundColor: "#29ABE2",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});