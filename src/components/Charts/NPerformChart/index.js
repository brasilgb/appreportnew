import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import {
  VictoryChart,
  VictoryGroup,
  VictoryTheme,
  VictoryBar,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend,
  VictoryVoronoiContainer
} from "victory-native";

export default function PerformChart({ datagrafico }) {

  const filtGrafico = datagrafico.filter((f) => f.Vendas > 0);

  const datagraf = filtGrafico.map((gr) => {
    return (
      {
        diasemana: gr.DiaSemana,
        vendas: parseFloat(gr.Vendas)
      }
    );
  });

  const datameta = filtGrafico.map((gr) => {
    return (
      {
        x: gr.DiaSemana,
        y: ((gr.Margem)*100).toFixed()     }
    );
  });

  const data = datagraf;
  const datamet = datameta;

  return (
    <View>
      <DataTable.Row style={styles.titleTable}>
        <DataTable.Cell style={styles.titleText}>
          <Text style={styles.titleText}>Gráfico de evolução de Vendas</Text>
        </DataTable.Cell>
      </DataTable.Row>
       
      <VictoryChart
        horizontal
        // height={750}
        // width={350}
        theme={VictoryTheme.material}
        domainPadding={{ x: [18, 18], y: 60 }}
        height={500}
      >

        <VictoryLegend
          x={0} y={0}
          title=""
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ title: { fontSize: 10 } }}
          data={[
            { name: "Vendas", symbol: { fill: "#009FE3", type: "square" } },
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
          labels={({ datum }) => `R$ ${datum.vendas}`}
          labelComponent={<VictoryLabel angle={0} textAnchor="start" verticalAnchor="middle" />}
          barRatio={0.5}
          alignment="middle"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          style={{
            data: {
              fill: "#009FE3",
              // width: 5,
            }
          }}
          x="diasemana"
          y="vendas"
        />

        {/* <VictoryLine
          style={{ data: { stroke: "red", strokeWidth: 1 } }}
          data={datamet}
        /> */}

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