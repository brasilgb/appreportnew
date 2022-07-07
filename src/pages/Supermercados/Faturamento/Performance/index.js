import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import MoneyPTBR from '../../../../components/MoneyPTBR';

export default function Performance() {

  const { fatuTotLojas, sFatTotais } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <ScrollView>
        <DataTable.Row style={styles.titleTable}>
          <DataTable.Cell><Text style={styles.titleText}>Performance do Mês</Text></DataTable.Cell>
        </DataTable.Row>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

          <DataTable style={{ marginBottom: 10 }}>
            <DataTable.Header style={{ backgroundColor: '#eee' }}>
              <DataTable.Title style={styles.colmedia}>Meta</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Venda</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Falta Vender</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Meta Parcial</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Atingido</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Perf.Atual</DataTable.Title>
            </DataTable.Header>
            {sFatTotais.map((fatmes, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatmes.PerfMesMeta) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatmes.PerfMesVenda) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>
                  <Text
                    style={((fatmes.PerfMesFaltVender) * 1) > 0 ? { color: 'green' } : { color: 'red' }}
                  >
                    {<MoneyPTBR number={((fatmes.PerfMesFaltVender) * 1)} />}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((fatmes.PerfMesMetaParcial) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((fatmes.PerfMesAtingido) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>
                  <Text
                    style={((fatmes.PerfMesPerf) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
                  >
                    {((fatmes.PerfMesPerf) * 100).toFixed(2)}%
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>

        <DataTable.Row style={styles.titleTable}>
          <DataTable.Cell style={styles.titleText}><Text style={styles.titleText}>Performance do Dia {fatuTotLojas[0].DiaAtual}</Text></DataTable.Cell>
        </DataTable.Row>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <DataTable style={{ marginBottom: 20 }}>

            <DataTable.Header style={{ backgroundColor: '#eee' }}>
              <DataTable.Title style={styles.colmedia}>Meta Dia</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Venda Dia</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Falta Vender</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Perf. Dia</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Média Dia</DataTable.Title>
            </DataTable.Header>
            {sFatTotais.map((fatdia, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatdia.PerfDiaMeta) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatdia.PerfDiaVenda) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>
                  <Text
                    style={((fatdia.PerfDiaFaltaVender) * 1) > 0 ? { color: 'green' } : { color: 'red' }}
                  >
                    {<MoneyPTBR number={((fatdia.PerfDiaFaltaVender) * 1)} />}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>
                  <Text
                    style={((fatdia.PerfDiaPerf) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
                  >
                    {((fatdia.PerfDiaPerf) * 100).toFixed(2)}%
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={[styles.colmedia, {backgroundColor: 'red'}]}>{<MoneyPTBR number={((fatdia.MediaDia) * 1)} />}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>

        {/* Gráfico */}

      </ScrollView>



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