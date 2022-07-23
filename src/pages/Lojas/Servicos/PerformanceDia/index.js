import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import Dia from './Dia';
import GEDia from './GE';
import PPDia from './PP';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend
} from "victory-native";
import SVG, { G } from 'react-native-svg';

export default function SPerformanceDia() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [serGrafico, setSerGrafico] = useState([]);
  const [serTotais, setSerTotais] = useState([]);

  // Extração de dados serviços lojas
  useEffect(() => {
      async function getSerGrafico() {
        setLoading(true);
        await api.get(`sergrafico/${dtFormatada(dataFiltro)}`)
          .then(sergrafico => {
            setSerGrafico(sergrafico.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getSerGrafico();

      async function getSerTotais() {
        setLoading(true);
        await api.get(`sertotais/${dtFormatada(dataFiltro)}`)
          .then(sertotais => {
            setSerTotais(sertotais.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getSerTotais();

    }, [dataFiltro]);

    const datavendas = serGrafico.map((gr) => {
      return {
        x: gr.DiaSemana,
        y: parseFloat(gr.Vendas ? gr.Vendas : 0),
      };
    });
    
    const metaUnique = serGrafico.filter((item, pos, self) => self.findIndex(v => v.Meta === item.Meta) === pos).map((m) => m.Meta);
    const maxval = (((Math.ceil(metaUnique,-1)).toString().substring(0,2) * 1000) + 1000);
    console.log(maxval)
  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading color="#0A3B7E"/>
        :
        <Fragment>
          <DataTable.Row style={styles.titleTable}>
            <DataTable.Cell style={styles.titleText}>
              <Text style={styles.titleText}>Performance do Dia {'diaatual'}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Dia data={serTotais} />
            </View>
            <View>
              <GEDia data={serTotais} />
            </View>
            <View>
              <PPDia data={serTotais} />
            </View>
            <VictoryChart
            height={550}
            // width={350}
            horizontal
            responsive={false}
            animate={{
              duration: 500,
              onLoad: { duration: 200 }
            }}
            domainPadding={{ x: [5, 15], y: 60 }}
            theme={VictoryTheme.material}
          >
            <VictoryLegend
              x={0}
              y={0}
              title=""
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{ title: { fontSize: 10 } }}
              data={[
                { name: "Vendas", symbol: { fill: "#025AA6", type: "square" } },
                { name: "Meta", symbol: { fill: "#FF0000", type: "minus" } }
              ]}
            />
            <VictoryAxis
              style={{
                axis: { stroke: "gray" },
                axisLabel: { fontSize: 10, padding: 0 },
                grid: { stroke: "none" },
                ticks: { stroke: "black", size: 2 },
                tickLabels: { fontSize: 10, padding: 5, angle: -45 }
              }}
            />
            <VictoryAxis
              dependentAxis
              orientation="top"
              style={{
                width: '100%'
              }}
            />

            <VictoryBar
              data={datavendas}
              labels={({ datum }) => `R$ ${datum.y}`}
              // labelComponent={
              //   <VictoryLabel
              //     angle={0}
              //     textAnchor="start"
              //     verticalAnchor="middle"
              //     style={{ fontSize: 10 }}
              //   />
              // }
              barRatio={1}
              cornerRadius={6}
              alignment="middle"
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
              style={{
                data: {
                  fill: "#025AA6",
                  stroke: '#025AA6'
                  // width: 20,
                }
              }}
            />
            <VictoryLine
              style={{ data: { stroke: "#FF0000", strokeWidth: 2 } }}
              y={() => metaUnique ? metaUnique : 0}
            />

          </VictoryChart>

          </ScrollView>
        </Fragment>
      }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 5,
    paddingTop: 10
  },
  colgrande: {
    width: 180,
    paddingHorizontal: 2
  },
  colmedia: {
    width: 120,
    paddingHorizontal: 2
  },
  colpequena: {
    width: 80,
    paddingHorizontal: 2
  },
  colmin: {
    width: 50,
    paddingHorizontal: 2
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