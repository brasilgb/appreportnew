import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import Dia from './Dia';
import GEDia from './GE';
import PPDia from './PP';
export default function SPerformanceDia() {

  const { serTotais, serGrafico } = useContext(AuthContext);
  const sertotlojas = serTotais.map((tot) => (tot));
  const diaatual = sertotlojas.map((dia) => (dia.Atualizacao));
  return (
    <View style={styles.container}>
      <DataTable.Row style={styles.titleTable}>
        <DataTable.Cell style={styles.titleText}>
          <Text style={styles.titleText}>Performance do Dia {moment(diaatual.toString()).format('DD/MM/YYYY')}</Text>
        </DataTable.Cell>
      </DataTable.Row>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Dia data={sertotlojas} />
        </View>
        <View>
          <GEDia data={sertotlojas} />
        </View>
        <View>
          <PPDia data={sertotlojas} />
        </View>
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