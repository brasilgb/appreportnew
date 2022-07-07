import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import moment from 'moment';

export default function GrafEvolucao() {

  const { nResGrafico, nResTotal } = useContext(AuthContext);
  return (
    <View style={styles.container}>

      <ScrollView>

        {nResTotal.map((fatmes, index) => (
          <DataTable key={index} style={{ marginBottom: 10 }}>

            <DataTable.Header style={styles.titleTable}>
              <DataTable.Title><Text style={styles.titleText}>{fatmes.TituloProjecao}</Text></DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>{<MoneyPTBR number={((fatmes.ProjecaoFaturamento) * 1)} />}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Header style={styles.titleTable}>
              <DataTable.Title><Text style={styles.titleText}>{fatmes.TituloDif}</Text></DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>{((fatmes.DifMesAntAtual) * 100).toFixed()}%</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Header style={styles.titleTable}>
              <DataTable.Title><Text style={styles.titleText}>{fatmes.TituloGrafico}</Text></DataTable.Title>
            </DataTable.Header>
          </DataTable>
        ))}

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
    color: "#FFF",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});